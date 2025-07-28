# Development Guide - SPG Medical Portal

## 🎯 Current Status

### Project Foundation ✅
- Next.js 14 with TypeScript and Tailwind CSS
- shadcn/ui component library integrated
- Prisma ORM with PostgreSQL schema
- NextAuth.js authentication framework
- HIPAA-compliant encryption utilities

### Known Issues 🔧
1. **TypeScript Configuration**: Some import paths need resolution
2. **NextAuth Adapter**: Version compatibility between next-auth and @auth/prisma-adapter
3. **Database**: Not yet connected - needs setup

## 🚀 Immediate Next Steps

### 1. Fix TypeScript Issues
```bash
# Update TypeScript configuration
npm install --save-dev @types/node@latest

# Fix import path mapping
# Update tsconfig.json baseUrl and paths
```

### 2. Database Setup
```bash
# Set up local PostgreSQL or use Vercel Postgres
# Update .env.local with DATABASE_URL
npx prisma db push
npx prisma generate
```

### 3. NextAuth Configuration
```bash
# Update to compatible versions
npm install next-auth@latest @auth/prisma-adapter@latest
```

## 🌟 Feature Development Plan

### Phase 1: Core Authentication (Week 1)
- [ ] Fix TypeScript configuration
- [ ] Set up database connection
- [ ] Complete authentication system
- [ ] Create role-based dashboards

### Phase 2: Patient Input System (Week 2)
Branch: `feature/patient-input-system`
- [ ] Patient information forms
- [ ] Data validation and encryption
- [ ] File upload interface
- [ ] Form submission workflow

### Phase 3: Clinic Management (Week 3)
Branch: `feature/clinic-selection`
- [ ] Clinic directory
- [ ] Request routing system
- [ ] Notification system
- [ ] Status tracking

### Phase 4: Clinic Portal (Week 4)
Branch: `feature/clinic-portal`
- [ ] Request review interface
- [ ] Approval/denial workflow
- [ ] Clinic notes system
- [ ] Capacity management

### Phase 5: Parent Portal (Week 5)
Branch: `feature/parent-portal`
- [ ] Status viewing interface
- [ ] Secure messaging
- [ ] Document access
- [ ] Progress tracking

### Phase 6: Security & Deployment (Week 6)
Branch: `feature/security-compliance`
- [ ] Audit logging
- [ ] Enhanced security measures
- [ ] Performance optimization
- [ ] Production deployment

## 🔧 Development Commands

### Setup
```bash
npm install
npx prisma generate
cp .env.example .env.local
# Edit .env.local with your values
```

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma database browser
```

### Database
```bash
npx prisma db push       # Push schema changes
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Create and apply migrations
npx prisma studio        # Database GUI
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── hospital/       # Hospital doctor portal
│   ├── clinic/         # Clinic doctor portal
│   ├── parent/         # Parent portal
│   └── admin/          # Admin portal
├── components/         # React components
│   ├── ui/             # shadcn/ui components
│   └── forms/          # Custom form components
├── lib/                # Utility libraries
│   ├── auth.ts         # NextAuth configuration
│   ├── prisma.ts       # Database client
│   └── encryption.ts   # HIPAA encryption
└── types/              # TypeScript definitions
```

## 🎨 UI/UX Guidelines

### Design Principles
1. **Medical Professional Focus**: Clean, efficient interfaces
2. **Security First**: Clear security indicators
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Mobile Responsive**: Works on all devices

### Color Scheme
- Primary: Medical blue (#1e40af)
- Secondary: Hospital green (#059669)
- Warning: Medical red (#dc2626)
- Background: Clean whites and light grays

### Component Standards
- Use shadcn/ui components consistently
- Follow medical form design patterns
- Include proper error handling
- Ensure keyboard navigation

## 🧪 Testing Strategy

### Unit Testing
```bash
npm install --save-dev jest @testing-library/react
```

### E2E Testing
```bash
npm install --save-dev @playwright/test
```

### Security Testing
- Regular dependency audits
- Penetration testing (external)
- HIPAA compliance reviews

## 📝 Code Standards

### TypeScript
- Strict mode enabled
- No `any` types allowed
- Proper error handling
- Interface definitions for all props

### React
- Functional components with hooks
- Proper error boundaries
- Loading states for all async operations
- Form validation with Zod

### Database
- All queries through Prisma
- Proper error handling
- Transaction support for critical operations
- Encrypted storage for sensitive data

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository
2. Configure environment variables
3. Set up Vercel Postgres
4. Deploy with automatic previews

### Environment Configuration
- Development: Local PostgreSQL
- Staging: Vercel Postgres (preview)
- Production: Vercel Postgres (production)

## 📊 Monitoring & Analytics

### Planned Monitoring
- Application performance (Vercel Analytics)
- Error tracking (Sentry integration)
- User activity logging
- HIPAA audit trails

---

## 🤝 Contributing

1. Create feature branch from main
2. Follow coding standards
3. Add tests for new features
4. Update documentation
5. Submit PR with detailed description 