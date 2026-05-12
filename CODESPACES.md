# 🚀 MotoBook - Codespaces Setup Guide

## Quick Start in Codespaces

### Step 1: Start Docker Containers
```bash
docker-compose up -d
```

### Step 2: Wait for Services (30 seconds)
The database needs time to initialize.

### Step 3: Seed the Database
```bash
docker-compose exec web npx prisma db seed
```

**OR use the automated setup script:**
```bash
chmod +x setup-codespaces.sh
./setup-codespaces.sh
```

### Step 4: Access the Application
Open the forwarded port 3000 in your browser.

---

## 📋 Default Login Credentials

### Admin
- **Email:** `admin@motobook.com`
- **Password:** `admin123`

### Customers
- **John Doe:** `john@example.com` / `password123`
- **Jane Smith:** `jane@example.com` / `password123`

### Riders
- **Mike Rider:** `mike@motobook.com` / `rider123` (VERIFIED)
- **Sarah Rider:** `sarah@motobook.com` / `rider123` (PENDING)
- **David Rider:** `david@motobook.com` / `rider123` (VERIFIED)

---

## 🔧 Troubleshooting

### "Invalid email or password" Error
This means the database is not seeded. Run:
```bash
docker-compose exec web npx prisma db seed
```

### Check if Database is Running
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f web
docker-compose logs -f db
```

### Reset Everything
```bash
docker-compose down -v
docker-compose up -d
# Wait 30 seconds
docker-compose exec web npx prisma migrate deploy
docker-compose exec web npx prisma db seed
```

---

## 📦 Common Commands

### Stop Containers
```bash
docker-compose down
```

### Restart Containers
```bash
docker-compose restart
```

### Access Database
```bash
docker-compose exec db psql -U moto_user -d moto_db
```

### Run Migrations
```bash
docker-compose exec web npx prisma migrate deploy
```

---

## 🎯 Development Workflow

1. Make code changes in Codespaces
2. Changes auto-reload (Next.js hot reload)
3. Test in browser
4. Commit and push to GitHub
5. Create new Codespace → Run setup script

---

## ⚠️ Important Notes

- **Always seed the database** after creating a new Codespace
- Database data is **not persistent** across Codespaces
- Each new Codespace = fresh database
- Use the setup script to save time

---

## 🆘 Still Having Issues?

1. Check Docker is running: `docker ps`
2. Check logs: `docker-compose logs`
3. Verify database connection: `docker-compose exec web npx prisma db push`
4. Re-seed: `docker-compose exec web npx prisma db seed`
