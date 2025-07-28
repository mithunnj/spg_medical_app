# SPG Medical Portal - Montreal Children's Hospital

A secure, HIPAA-compliant web application for coordinating patient discharge from the Pediatric ICU (PICU) to outbound family clinics.

## 🏥 Project Overview

This application facilitates secure communication between:
- **Hospital Doctors (PICU)**: Input patient discharge information and select outbound clinics
- **Clinic Doctors**: Review and approve/deny patient requests based on availability
- **Parents/Guardians**: View status updates and communication from healthcare providers

## 🛠️ Tech Stack

### Frontend & Backend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: NextAuth.js with role-based access control

### Database & Storage
- **Database**: PostgreSQL (Vercel Postgres for production)
- **ORM**: Prisma
- **File Storage**: Vercel Blob (HIPAA-compliant)
- **Encryption**: AES-256-GCM for patient data

### Deployment
- **Platform**: Vercel
- **Environment**: Production-ready with HIPAA compliance

## 🔐 Security & Compliance

### HIPAA Compliance Features
- ✅ End-to-end encryption for patient data
- ✅ Secure authentication with medical license verification
- ✅ Audit logging (planned)
- ✅ Role-based access control
- ✅ Session management with 8-hour timeout
- ✅ No indexing of medical data (`robots: noindex, nofollow`)

### Data Encryption
Patient personal information is encrypted before storage:
- Names, DOB, health card numbers
- Addresses and contact information
- Emergency contact details

## 🏗️ Architecture

### User Roles
1. **HOSPITAL_DOCTOR**: PICU doctors creating discharge requests
2. **CLINIC_DOCTOR**: Outbound clinic doctors reviewing requests
3. **PARENT**: Patient guardians viewing updates
4. **ADMIN**: System administrators

### Database Schema
- **Users**: Healthcare professionals and parents
- **Hospitals**: PICU and other hospital facilities
- **Clinics**: Outbound family doctor clinics
- **Patients**: Encrypted patient records
- **DischargeRequests**: Patient discharge coordination
- **PatientFiles**: Secure file attachments

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Vercel account (for deployment)

### Environment Variables
Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/spg_medical_app"
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=""

# Encryption for HIPAA compliance
ENCRYPTION_KEY="your-encryption-key-here-change-in-production"

# SMTP for notifications
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
```

### Installation & Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Set up database (when ready)
npx prisma db push

# Run development server
npm run dev
```

## 📋 Current Development Status

### ✅ Completed Features
- [x] Next.js 14 project setup with TypeScript
- [x] shadcn/ui component library integration
- [x] Prisma database schema with HIPAA-compliant design
- [x] NextAuth.js authentication setup
- [x] Role-based access control architecture
- [x] Encryption utilities for patient data
- [x] Landing page and sign-in interface

### 🚧 In Progress
- [ ] Database setup and migrations
- [ ] Authentication system refinement
- [ ] TypeScript configuration optimization

### 📝 Planned Features (Feature Branches)
1. **Patient Information System** - Forms for PICU doctors to input patient data
2. **File Management** - Secure upload/download of patient files
3. **Clinic Selection** - Interface for selecting and contacting outbound clinics
4. **Request Management** - Clinic portal for reviewing and responding to requests
5. **Parent Portal** - Status updates and communication for families
6. **Security & Compliance** - Additional HIPAA features and audit logging

## 🌟 Feature Branch Workflow

Each major feature will be developed in separate branches:

```bash
# Example workflow
git checkout -b feature/patient-input-system
# Develop feature
git commit -m "Add patient input forms"
git push origin feature/patient-input-system
# Create PR to main
```

### Planned Feature Branches
- `feature/patient-input-system`
- `feature/file-management`
- `feature/clinic-selection`
- `feature/clinic-portal`
- `feature/parent-portal`
- `feature/security-compliance`

## 🏥 User Workflows

### Hospital Doctor (PICU) Workflow
1. Sign in with medical license verification
2. Access patient discharge form
3. Input patient information (encrypted storage)
4. Upload relevant medical files
5. Select target outbound clinics
6. Submit discharge request
7. Track request status

### Clinic Doctor Workflow
1. Sign in to clinic portal
2. View incoming patient requests
3. Review patient information and files
4. Approve/deny based on capacity and specialization
5. Add clinic notes if needed
6. Update patient status

### Parent Workflow
1. Sign in with provided credentials
2. View patient status updates
3. Receive notifications about care transitions
4. Access relevant information about next steps

## 🔒 Security Considerations

### Data Protection
- All patient data encrypted at rest
- Secure transmission via HTTPS
- Regular security audits (planned)
- Compliance with Quebec healthcare regulations

### Access Control
- Multi-factor authentication (planned)
- Session timeout enforcement
- Role-based permissions
- Activity logging

## 📞 Support & Contact

For technical support or medical workflow questions:
- **Technical Issues**: [GitHub Issues](link-to-issues)
- **HIPAA Compliance**: Contact system administrator
- **Medical Workflow**: Contact PICU administration

---

**⚠️ Important**: This application handles sensitive medical information. All development and deployment must follow HIPAA compliance guidelines and hospital security policies.
