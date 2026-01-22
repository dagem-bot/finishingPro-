# FinishingPro - Gypsum & Decoration Services Website

## Overview

FinishingPro is a professional services website for a finishing company in Ethiopia that offers gypsum work, painting, and decoration services. The application provides service listings, a cost calculator for project estimates, a portfolio gallery, and contact information. It's built as a full-stack TypeScript application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Design**: RESTful endpoints defined in shared routes file with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` defines all database tables
- **Migrations**: Drizzle Kit manages schema pushes (`npm run db:push`)

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utilities and query client
│       └── pages/        # Route page components
├── server/           # Express backend
│   ├── db.ts         # Database connection
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Data access layer
│   └── index.ts      # Server entry point
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle database schema
│   └── routes.ts     # API route definitions with types
└── migrations/       # Database migrations (auto-generated)
```

### Key Design Patterns
- **Shared Types**: Database schema and API routes are defined in `shared/` for type safety across client and server
- **Storage Pattern**: `DatabaseStorage` class in `server/storage.ts` abstracts database operations
- **Auto-seeding**: Database seeds initial service data on first run if empty

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### UI Framework
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration

### Key NPM Packages
- `@tanstack/react-query`: Server state management and caching
- `framer-motion`: Animation library for React
- `wouter`: Minimal routing solution
- `zod`: Runtime type validation for API responses
- `drizzle-zod`: Generates Zod schemas from Drizzle tables

### Development Tools
- `vite`: Frontend build tool with HMR
- `tsx`: TypeScript execution for development
- `esbuild`: Production server bundling
- `drizzle-kit`: Database migration tooling