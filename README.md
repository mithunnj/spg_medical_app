# CareFlow - Professional Medical Care Coordination Platform

A secure, HIPAA-compliant web application for coordinating patient discharge from the Pediatric ICU (PICU) to outbound family clinics at Montreal Children's Hospital.

## 🏥 Platform Overview

**CareFlow** facilitates seamless medical care transitions between:
- **Hospital Doctors (PICU)**: Coordinate patient discharge and select appropriate outbound clinics
- **Clinic Doctors**: Review and approve patient requests based on specialization and availability  
- **Patient Families**: Receive updates and communication throughout the care transition process
- **Healthcare Administrators**: Oversee system operations and manage institutional workflows

## ✨ Key Features

### 🔐 **Security & Compliance**
- **HIPAA-Compliant**: End-to-end encryption for all patient data
- **Role-Based Access**: Secure authentication with medical license verification
- **Data Protection**: AES-256-GCM encryption for sensitive patient information
- **Session Security**: 8-hour timeout with secure session management
- **Privacy Controls**: No indexing of medical data with strict access controls

### 🏥 **Medical Workflow Features**
- **Patient Discharge Coordination**: Streamlined PICU to outbound clinic transitions
- **Secure File Management**: HIPAA-compliant medical document storage and sharing
- **Real-Time Communication**: Instant updates between healthcare providers and families
- **Clinic Availability Tracking**: Live capacity and specialization management
- **Care Continuity**: Comprehensive patient handoff documentation

### 📊 **Professional Analytics**
- **Usage Monitoring**: Track portal adoption across medical staff
- **Performance Metrics**: Monitor discharge coordination efficiency
- **Compliance Reporting**: HIPAA audit trails and security monitoring

## 🛠️ Technology Stack

### **Frontend & Backend**
- **Framework**: Next.js 14 with App Router & TypeScript
- **UI/UX**: Tailwind CSS + shadcn/ui components with professional medical design
- **Authentication**: NextAuth.js with role-based access control

### **Database & Security**
- **Database**: PostgreSQL with Prisma ORM (Vercel Postgres for production)
- **File Storage**: Vercel Blob for secure medical document storage
- **Encryption**: AES-256-GCM for patient data protection
- **Deployment**: Vercel with automatic CI/CD

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- PostgreSQL database
- Vercel account (for deployment)

### **Environment Setup**
Create a `.env.local` file:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/careflow_medical"
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""

# Authentication
NEXTAUTH_SECRET="your-secure-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# File Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Security
ENCRYPTION_KEY="your-256-bit-encryption-key"

# Application Settings
APP_NAME="CareFlow"
HOSPITAL_NAME="Montreal Children's Hospital - PICU"
```

### **Installation & Development**

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Set up database
npx prisma db push

# Seed with test data
npm run seed

# Start development server
npm run dev
```

## 🏥 **User Access & Testing**

### **Live Application**
**Production URL**: https://spg-medical-app.vercel.app/

### **Test Credentials**
Use these credentials to test different user roles:

| **Role** | **Email** | **License Number** | **Password** |
|----------|-----------|-------------------|--------------|
| **Hospital Doctor** | `dr.smith@thechildren.com` | `QC-12345` | *(dev mode)* |
| **Clinic Doctor** | `dr.johnson@familymed-downtown.ca` | `QC-67890` | *(dev mode)* |
| **Patient Family** | `parent@example.com` | *(not required)* | *(dev mode)* |
| **Administrator** | `admin@thechildren.com` | *(not required)* | *(dev mode)* |

## 🏗️ **Development Workflow**

### **Feature Branch Strategy**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Develop and test
npm run build && npm run lint && npm run type-check

# Commit changes
git commit -m "feat: your feature description"

# Push and create PR
git push origin feature/your-feature-name
```

### **Quality Assurance**
```bash
npm run test          # Run test suite
npm run lint          # Code quality checks  
npm run type-check    # TypeScript validation
npm run build         # Production build verification
```

## 📊 **Database Schema**

### **Core Entities**
- **Users**: Healthcare professionals and patient families
- **Hospitals**: PICU and other hospital facilities  
- **Clinics**: Outbound family doctor practices
- **Patients**: Encrypted patient records with medical information
- **DischargeRequests**: Care coordination between hospitals and clinics
- **PatientFiles**: Secure medical document storage

### **Security Model**
- All patient personal data is encrypted before database storage
- Role-based permissions control data access
- Audit trails track all medical data interactions
- HIPAA-compliant data retention policies

## 🚀 **Deployment**

### **Vercel Deployment**
1. **Connect Repository**: Link GitHub repo to Vercel project
2. **Configure Environment**: Add production environment variables
3. **Database Setup**: Configure Vercel Postgres
4. **File Storage**: Set up Vercel Blob for medical documents
5. **Deploy**: Automatic deployment on main branch updates

### **Production Configuration**
- **SSL/TLS**: Automatic HTTPS with security headers
- **Performance**: Optimized builds with edge caching
- **Monitoring**: Real-time analytics and error tracking
- **Compliance**: HIPAA-ready infrastructure

## 📈 **Monitoring & Analytics**

### **Vercel Analytics Integration**
- **User Engagement**: Track healthcare professional adoption
- **Performance Metrics**: Monitor page load times and user flows  
- **Usage Patterns**: Analyze peak usage times and feature adoption
- **Security Monitoring**: Track authentication patterns and access

## 🔒 **Security & Compliance**

### **HIPAA Compliance Features**
- ✅ **Data Encryption**: Patient data encrypted at rest and in transit
- ✅ **Access Controls**: Role-based permissions with audit logging
- ✅ **Session Management**: Secure authentication with timeout controls
- ✅ **Privacy Protection**: No patient data in analytics or logs
- ✅ **Audit Trails**: Comprehensive logging of all data access

### **Security Best Practices**
- Regular security audits and penetration testing
- Dependency vulnerability scanning and updates
- Secure coding practices with TypeScript
- OWASP compliance for web application security

## 📞 **Support & Documentation**

### **Getting Help**
- **Technical Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Medical Workflow**: Contact PICU administration
- **HIPAA Compliance**: Contact system administrator
- **Feature Requests**: Submit via GitHub Issues

### **Documentation**
- **API Documentation**: Available in `/docs` directory
- **User Guides**: Role-specific guides for each user type
- **Developer Docs**: Setup and contribution guidelines
- **Compliance Docs**: HIPAA and security documentation

---

## 📋 **Project Status**

### **✅ Production Ready**
- Complete authentication and authorization system
- HIPAA-compliant data encryption and storage
- Professional medical portal UI/UX
- Secure file upload and management
- Real-time analytics and monitoring
- Comprehensive testing and quality assurance

### **🚧 Active Development**
- Advanced patient workflow automation
- Enhanced clinical decision support
- Mobile application for healthcare providers
- Integration with hospital information systems

---

**CareFlow** - Streamlining Medical Care Transitions with Professional Excellence

*© 2024 CareFlow Platform - Secure Medical Care Coordination*

> ⚠️ **Important**: This application handles sensitive medical information. All development, deployment, and usage must follow HIPAA compliance guidelines and institutional security policies.
