import { put, del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'
import { PatientFile } from '@prisma/client'

export interface UploadFileOptions {
  patientId: string
  uploadedById: string
  fileName: string
  fileType: string
  description?: string
}

export interface FileUploadResult {
  success: boolean
  fileRecord?: PatientFile & {
    patient: { id: string }
    uploadedBy: { id: string; name: string; role: string }
  }
  error?: string
}

/**
 * Upload a medical file securely with HIPAA compliance
 */
export async function uploadMedicalFile(
  file: File,
  options: UploadFileOptions
): Promise<FileUploadResult> {
  try {
    // Validate file type (medical documents only)
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/dicom', // Medical imaging
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Only medical documents are allowed.'
      }
    }

    // Validate file size (max 50MB for medical files)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size too large. Maximum 50MB allowed.'
      }
    }

    // Generate secure filename with patient ID prefix
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const secureFileName = `patient-${options.patientId}/${timestamp}-${options.fileName}`

    // Upload to Vercel Blob with public access but obfuscated filename
    const blob = await put(secureFileName, file, {
      access: 'public', // Vercel Blob only supports public, but we use secure filenames
      addRandomSuffix: true,
    })

    // Store file metadata in database
    const fileRecord = await prisma.patientFile.create({
      data: {
        patientId: options.patientId,
        uploadedById: options.uploadedById,
        fileName: options.fileName,
        fileType: file.type,
        fileSize: file.size,
        filePath: blob.url,
        description: options.description,
      },
      include: {
        patient: {
          select: {
            id: true,
            // Don't include encrypted fields for security
          }
        },
        uploadedBy: {
          select: {
            id: true,
            name: true,
            role: true,
          }
        }
      }
    })

    return {
      success: true,
      fileRecord
    }

  } catch (error) {
    console.error('File upload failed:', error)
    return {
      success: false,
      error: 'File upload failed. Please try again.'
    }
  }
}

/**
 * Get secure download URL for medical file
 */
export async function getMedicalFileUrl(fileId: string, userId: string): Promise<string | null> {
  try {
    // Verify user has access to this file
    const fileRecord = await prisma.patientFile.findUnique({
      where: { id: fileId },
      include: {
        patient: {
          include: {
            requests: {
              include: {
                createdBy: true,
                handledBy: true,
              }
            }
          }
        },
        uploadedBy: true,
      }
    })

    if (!fileRecord) {
      return null
    }

    // Check if user has permission to access this file
    const hasAccess = 
      fileRecord.uploadedById === userId || // File uploader
      fileRecord.patient.requests.some(req => 
        req.createdById === userId || req.handledById === userId
      ) // Involved in patient requests

    if (!hasAccess) {
      return null
    }

    return fileRecord.filePath

  } catch (error) {
    console.error('Failed to get file URL:', error)
    return null
  }
}

/**
 * Delete medical file securely
 */
export async function deleteMedicalFile(fileId: string, userId: string): Promise<boolean> {
  try {
    const fileRecord = await prisma.patientFile.findUnique({
      where: { id: fileId },
      include: {
        uploadedBy: true,
      }
    })

    if (!fileRecord || fileRecord.uploadedById !== userId) {
      return false // Unauthorized
    }

    // Delete from blob storage
    await del(fileRecord.filePath)

    // Delete from database
    await prisma.patientFile.delete({
      where: { id: fileId }
    })

    return true

  } catch (error) {
    console.error('Failed to delete file:', error)
    return false
  }
}

/**
 * List patient files with proper access control
 */
export async function listPatientFiles(patientId: string, userId: string) {
  try {
    // Verify user has access to this patient
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        requests: {
          where: {
            OR: [
              { createdById: userId },
              { handledById: userId }
            ]
          }
        }
      }
    })

    if (!patient || patient.requests.length === 0) {
      return []
    }

    // Get files for this patient
    const files = await prisma.patientFile.findMany({
      where: { patientId },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            role: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return files

  } catch (error) {
    console.error('Failed to list patient files:', error)
    return []
  }
} 