# Portfolio Application

## Overview

This is a personal portfolio website for Ratheesh D P, built as a full-stack application showcasing AI/ML expertise and full-stack development skills. The application features a modern, dark-themed design with AI/ML-inspired visual elements, comprehensive portfolio sections, resume management capabilities, and a contact system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript, utilizing modern web development practices:
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom AI/ML themed color schemes and animations
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
The backend follows a clean Node.js/Express architecture:
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **File Uploads**: Multer middleware for resume file handling
- **Request Logging**: Custom middleware for API request logging
- **Development**: Hot reload with Vite integration in development mode

### Database Layer
The application uses a flexible database approach:
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for production) with @neondatabase/serverless
- **Schema Management**: Centralized schema definitions in shared directory
- **Validation**: Drizzle-Zod integration for runtime validation
- **Development**: In-memory storage implementation for rapid development

## Key Components

### Portfolio Sections
- **Hero Section**: Animated profile with AI/ML themed gradients and call-to-action buttons
- **About Section**: Personal introduction with journey narrative and skill highlights
- **Skills Section**: Interactive progress bars for programming languages and categorized technology stacks
- **Projects Section**: Filterable project showcase with live demos and technology tags
- **Education Section**: Timeline of education, internships, and leadership roles
- **Resume Section**: File upload/download functionality with resume management
- **Contact Section**: Form with validation and email integration

### UI/UX Features
- **Dark Theme**: Professional dark mode with AI/ML inspired color palette
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Animations**: Custom CSS animations and smooth scroll navigation
- **Toast Notifications**: User feedback system for form submissions and actions
- **Loading States**: Proper loading indicators and error handling

### File Management
- **Resume Upload**: Secure file upload with type validation (PDF, DOC, DOCX)
- **File Storage**: Local file system storage with organized directory structure
- **File Serving**: Express static file serving for uploaded documents
- **Metadata Tracking**: Database records for file information and upload timestamps

## Data Flow

### Client-Server Communication
1. **Frontend**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle requests with proper validation and error handling
3. **Business Logic**: Service layer processes requests and interacts with storage
4. **Storage**: Drizzle ORM manages database operations with type safety
5. **Response**: Structured JSON responses with consistent error handling

### Form Handling
1. **Client Validation**: React Hook Form with Zod schemas for immediate feedback
2. **Server Validation**: Backend validation using shared Zod schemas
3. **File Processing**: Multer middleware handles file uploads with validation
4. **Database Operations**: Drizzle ORM persists form data with type safety
5. **User Feedback**: Toast notifications confirm successful operations

### State Management
- **Server State**: TanStack Query handles API data with caching and synchronization
- **Form State**: React Hook Form manages form inputs and validation states
- **UI State**: React useState for component-local state management
- **Global UI**: Context providers for theme, toast notifications, and tooltips

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form, TanStack Query
- **UI Components**: Radix UI primitives, shadcn/ui components, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Validation**: Zod for schema validation, @hookform/resolvers for form integration
- **Database**: Drizzle ORM, @neondatabase/serverless for PostgreSQL
- **File Handling**: Multer for file uploads with disk storage
- **Development**: Vite, TypeScript, PostCSS, Autoprefixer

### Development Tools
- **Type Checking**: TypeScript with strict configuration
- **Build System**: Vite with React plugin and custom error overlay
- **Code Quality**: ESLint configuration for React and TypeScript
- **Package Management**: npm with lockfile for dependency consistency

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React application to optimized static assets
2. **Backend Build**: esbuild bundles Express server for production deployment
3. **Type Checking**: TypeScript compilation validates types across the codebase
4. **Asset Optimization**: Vite optimizes assets, code splitting, and tree shaking

### Environment Configuration
- **Development**: Hot reload with Vite dev server and Express API integration
- **Production**: Compiled static frontend served by Express with API routes
- **Database**: Environment-based configuration for development and production databases
- **File Storage**: Configurable upload directory with proper permissions

### Production Considerations
- **Static Assets**: Frontend built to dist/public for Express static serving
- **API Security**: CORS configuration and request validation
- **Error Handling**: Comprehensive error boundaries and API error responses
- **Performance**: Asset optimization, query caching, and efficient database operations
- **Monitoring**: Request logging and error tracking for production debugging