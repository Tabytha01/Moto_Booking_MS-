#!/bin/bash

echo "🚀 Setting up MotoBook in Codespaces..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
sleep 10

# Run migrations
echo "📦 Running database migrations..."
docker-compose exec -T web npx prisma migrate deploy

# Seed the database
echo "🌱 Seeding database with default users..."
docker-compose exec -T web npx prisma db seed

echo "✅ Setup complete!"
echo ""
echo "📋 Default Credentials:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "ADMIN:"
echo "  Email: admin@motobook.com"
echo "  Password: admin123"
echo ""
echo "CUSTOMERS:"
echo "  john@example.com / password123"
echo "  jane@example.com / password123"
echo ""
echo "RIDERS:"
echo "  mike@motobook.com / rider123 (VERIFIED)"
echo "  sarah@motobook.com / rider123 (PENDING)"
echo "  david@motobook.com / rider123 (VERIFIED)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Access the app at: http://localhost:3000"
