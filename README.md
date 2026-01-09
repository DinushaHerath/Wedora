# Wedora Project

Full-stack application with Next.js frontend, NestJS backend, and MySQL database.

## Tech Stack

- **Frontend:** Next.js 15+ with TypeScript & Tailwind CSS
- **Backend:** NestJS with TypeORM
- **Database:** MySQL 8.0

## Project Structure

```
wedora/
├── frontend/          # Next.js application
├── backend/           # NestJS API
├── docker-compose.yml # Docker configuration for MySQL
└── MYSQL_SETUP.md    # Detailed MySQL setup guide
```

## Prerequisites

- Node.js 18+ and npm
- MySQL 8.0 (see MYSQL_SETUP.md for installation)
- Git (optional)

## Quick Start

### 1. Setup MySQL Database

Follow the detailed guide in [MYSQL_SETUP.md](./MYSQL_SETUP.md) to:
- Install MySQL locally, OR
- Use XAMPP, OR  
- Run MySQL via Docker

Then create the database:
```sql
CREATE DATABASE wedora_db;
```

### 2. Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies (already done)
npm install

# Configure environment variables
# Edit .env file and add your MySQL password
# DB_PASSWORD=your_mysql_password

# Start development server
npm run start:dev
```

Backend will run on http://localhost:3000

### 3. Frontend Setup

```powershell
# Navigate to frontend
cd frontend

# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Frontend will run on http://localhost:3001 (or 3000 if backend is on different port)

## Available Scripts

### Backend (NestJS)

```powershell
npm run start          # Production mode
npm run start:dev      # Development mode with watch
npm run start:debug    # Debug mode
npm run build          # Build for production
npm run test           # Run tests
npm run test:e2e       # Run e2e tests
```

### Frontend (Next.js)

```powershell
npm run dev            # Development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
```

## Environment Variables

### Backend (.env)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=wedora_db
PORT=3000
NODE_ENV=development
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Development Workflow

1. Start MySQL service
2. Start backend: `cd backend && npm run start:dev`
3. Start frontend: `cd frontend && npm run dev`
4. Access frontend at http://localhost:3001
5. API endpoints available at http://localhost:3000

## Creating Your First Entity (Example)

Create a User entity in backend:

```typescript
// backend/src/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
```

TypeORM will auto-create the table when the app starts (in development mode).

## Production Deployment

### Database
- Disable `synchronize: true` in production
- Use TypeORM migrations for database schema changes

### Backend
```powershell
npm run build
npm run start:prod
```

### Frontend
```powershell
npm run build
npm run start
```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify credentials in .env file
- Check MYSQL_SETUP.md for common issues

### Port Conflicts
- Backend default: 3000
- Frontend default: 3001
- MySQL default: 3306

Change ports in respective configuration files if needed.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc)

## License

ISC
