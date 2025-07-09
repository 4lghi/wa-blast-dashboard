# WA Blast Dashboard

A full-stack dashboard for managing WhatsApp message campaigns, with integrated backend services for user and recipient management.

## Features
- Real-time messaging statistics
- Participant list management
- Campaign scheduling
- User authentication system
- API-driven architecture

## Tech Stack
**Frontend:**  
React + TypeScript  
Vite  
Tailwind CSS  

**Backend:**  
Node.js + Express  
Prisma ORM  
SQLite (default database)  

## Installation

### Prerequisites
- Node.js v18+
- npm v9+
- Git

### Backend Setup
```bash
cd server
npm install
cp .env.example .env  # Update with your database credentials
npx prisma migrate dev
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env  # Set VITE_API_BASE_URL=http://localhost:3001
npm run dev
```

## API Endpoints

### Nasabah (Customers)
| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | /api/nasabah     | List all customers   |
| POST   | /api/nasabah     | Create new customer  |
| GET    | /api/nasabah/:id | Get customer details |
| PUT    | /api/nasabah/:id | Update customer      |
| DELETE | /api/nasabah/:id | Delete customer      |

### Users
| Method | Endpoint    | Description       |
|--------|-------------|-------------------|
| GET    | /api/users  | List all users    |
| POST   | /api/users  | Create new user   |

## Environment Configuration
**server/.env**
```env
DATABASE_URL="file:./dev.db"
PORT=3001
JWT_SECRET=your_jwt_secret
```

**client/.env**
```env
VITE_API_BASE_URL=http://localhost:3001
```

## Development Scripts
**Backend**
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run test   # Run tests
```

**Frontend**
```bash
npm run dev    # Start Vite server
npm run build  # Build production bundle
npm run lint   # Run ESLint
```

## Database Schema (Prisma)
```prisma
// server/prisma/schema.prisma
model Nasabah {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String   @unique
  createdAt DateTime @default(now())
}

model User {
  id       Int     @id @default(autoincrement())
  username String  @unique
  password String
}
```

---

### Original Setup Instructions (Indonesian)
Cara run:
1. cd server
2. jika belum install modul, ketik npm install
3. npm run dev
4. tambahkan tab terminal, lalu cd client
5. jika belum install modul, ketik npm install
6. npm run dev
