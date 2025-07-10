#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Potion Maker - Local Development Setup${NC}"
echo "========================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker Desktop first.${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 20 or later.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites checked${NC}"
echo ""

# Check if .env file exists, if not copy from .env.example
if [ ! -f .env ]; then
    echo -e "${BLUE}📋 Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
fi

# Start PostgreSQL container
echo -e "${BLUE}🐘 Starting PostgreSQL database...${NC}"
docker-compose up -d

# Wait for PostgreSQL to be ready
echo -e "${BLUE}⏳ Waiting for database to be ready...${NC}"
sleep 3

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Run database migrations
echo -e "${BLUE}🗄️  Running database migrations...${NC}"
npx prisma migrate dev

# Seed the database
echo -e "${BLUE}🌱 Seeding database with initial data...${NC}"
npm run db:seed

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}To start the development server, run:${NC}"
echo -e "${GREEN}npm run dev${NC}"
echo ""
echo -e "The app will be available at ${BLUE}http://localhost:3000${NC}"