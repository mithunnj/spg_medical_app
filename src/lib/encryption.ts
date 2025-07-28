import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production'
const ALGORITHM = 'aes-256-gcm'

interface EncryptedData {
  encryptedData: string
  iv: string
  authTag: string
}

/**
 * Encrypts sensitive patient data for HIPAA compliance
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher(ALGORITHM, ENCRYPTION_KEY)
  cipher.setAAD(Buffer.from('patient-data', 'utf8'))
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  const result: EncryptedData = {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  }
  
  return JSON.stringify(result)
}

/**
 * Decrypts sensitive patient data
 */
export function decrypt(encryptedText: string): string {
  try {
    const data: EncryptedData = JSON.parse(encryptedText)
    const decipher = crypto.createDecipher(ALGORITHM, ENCRYPTION_KEY)
    decipher.setAAD(Buffer.from('patient-data', 'utf8'))
    decipher.setAuthTag(Buffer.from(data.authTag, 'hex'))
    
    let decrypted = decipher.update(data.encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Failed to decrypt patient data')
  }
}

/**
 * Encrypts patient personal information before storing in database
 */
export function encryptPatientData(data: {
  firstName: string
  lastName: string
  dateOfBirth: string
  healthCardNumber: string
  address: string
  phone?: string
  emergencyContact: string
}) {
  return {
    firstNameEnc: encrypt(data.firstName),
    lastNameEnc: encrypt(data.lastName),
    dobEnc: encrypt(data.dateOfBirth),
    healthCardEnc: encrypt(data.healthCardNumber),
    addressEnc: encrypt(data.address),
    phoneEnc: data.phone ? encrypt(data.phone) : null,
    emergencyContactEnc: encrypt(data.emergencyContact),
  }
}

/**
 * Decrypts patient personal information for authorized access
 */
export function decryptPatientData(encryptedData: {
  firstNameEnc: string
  lastNameEnc: string
  dobEnc: string
  healthCardEnc: string
  addressEnc: string
  phoneEnc?: string | null
  emergencyContactEnc: string
}) {
  return {
    firstName: decrypt(encryptedData.firstNameEnc),
    lastName: decrypt(encryptedData.lastNameEnc),
    dateOfBirth: decrypt(encryptedData.dobEnc),
    healthCardNumber: decrypt(encryptedData.healthCardEnc),
    address: decrypt(encryptedData.addressEnc),
    phone: encryptedData.phoneEnc ? decrypt(encryptedData.phoneEnc) : undefined,
    emergencyContact: decrypt(encryptedData.emergencyContactEnc),
  }
} 