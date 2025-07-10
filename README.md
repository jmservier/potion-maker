# Potion Maker

This project is a mini-game created for a technical test. You play as a wizard who must create different magic potions by combining three ingredients from a given list.

The application is built with Next.js, React, TypeScript, and Prisma, following the requirements outlined in the technical test description.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **UI:** [React](https://react.dev/) & [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (via Docker)
- **E2E Testing:** [Cypress](https://www.cypress.io/)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20 or later recommended)
- [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### Quick Setup

Run the setup script to get started quickly:

```bash
./setup.sh
```

This will:

1. Start the PostgreSQL database container
2. Install all dependencies
3. Run database migrations
4. Seed initial data
5. Provide instructions to start the dev server

### Manual Setup

If you prefer to set up manually:

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd potion-maker
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up environment variables**

    Create a `.env` file by copying the example:

    ```bash
    cp .env.example .env
    ```

    The default `DATABASE_URL` in the example file is configured to work with the Docker setup.

4.  **Start the database**

    ```bash
    docker-compose up -d
    ```

5.  **Run migrations and seed data**

    ```bash
    npx prisma migrate dev
    npm run seed
    ```

6.  **Run the development server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase.
- `npm run seed`: Populates the database with initial data.
- `npm run cypress:open`: Opens the Cypress E2E test runner.
