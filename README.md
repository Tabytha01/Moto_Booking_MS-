# Moto Booking MS

A motorcycle booking system built with Next.js 13+, Prisma ORM, and PostgreSQL.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed

### Start the Application

1. **Build and start the containers:**
   ```bash
   docker-compose up --build
   ```

2. **Wait for the database to be ready and migrations to run.**

3. **Access the application:**
   - Web App: http://localhost:3000
   - Database: localhost:5432

### Default Credentials

After seeding (see below), use these credentials:

**Admin:**
- Email: `admin@motobook.com`
- Password: `admin123`

**Customers:**
- John Doe: `john@example.com` / `password123`
- Jane Smith: `jane@example.com` / `password123`

**Riders:**
- Mike Rider: `mike@motobook.com` / `rider123` (VERIFIED)
- Sarah Rider: `sarah@motobook.com` / `rider123` (PENDING)
- David Rider: `david@motobook.com` / `rider123` (VERIFIED)

## 🛠️ Development Setup (Local)

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Update DATABASE_URL in .env with your PostgreSQL credentials
   ```

3. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

4. **Seed the database (optional but recommended):**
   ```bash
   npx prisma db seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to http://localhost:3000

## 📦 Docker Commands

### Stop the containers
```bash
docker-compose down
```

### Stop and remove volumes (deletes database data)
```bash
docker-compose down -v
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild and restart
```bash
docker-compose up --build --force-recreate
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/          # Auth pages (login, register)
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   ├── customer/        # Customer interface
│   └── rider/           # Rider interface
├── components/
│   └── layout/          # Layout components
└── lib/
    └── prisma.js        # Prisma client
```

## 🔧 Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **ORM:** Prisma 7+
- **Database:** PostgreSQL 15
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Auth:** Custom JWT/Local Storage

## 📝 License

MIT
