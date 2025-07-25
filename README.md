# Potion Maker

This project is a mini-game created for a technical test. You play as a wizard who must create different magic potions by combining three ingredients from a given list.

The application is built with Next.js, React, TypeScript, and Prisma, following modern architectural patterns and best practices.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 15 with App Router
- **UI:** [React](https://react.dev/) & [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** PostgreSQL (via Docker)
- **State Management:** [TanStack Query](https://tanstack.com/query) (React Query)
- **Validation:** [Zod](https://zod.dev/)
- **Testing:** [Jest](https://jestjs.io/) & [Cypress](https://www.cypress.io/)

## Architecture Overview

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── crafting/          # Main game page
│   ├── history/           # Crafting history page
│   ├── inventory/         # Inventory management
│   └── recipes/           # Recipe book page
├── components/            # Shared UI components
│   ├── layout/           # Layout components (navigation)
│   └── ui/               # Base UI components (shadcn/ui)
├── features/              # Feature-based modules
│   ├── crafting/         # Crafting game logic
│   ├── history/          # History tracking
│   ├── ingredients/      # Ingredient management
│   └── recipes/          # Recipe system
├── lib/                  # Utilities and shared code
├── schemas/              # Shared Zod schemas
└── server/               # Server-side utilities
```

### Key Architectural Patterns

#### 1. **Feature-Based Architecture**

Each feature module contains:

- `queries.ts` - Read operations (data fetching)
- `actions.ts` - Write operations (mutations)
- `components/` - Feature-specific UI components
- `hooks/` - Custom React hooks
- `schemas/` - Zod validation schemas

#### 2. **Data Fetching Strategy**

- **Server Components**: Initial data fetching at page level
- **React Query**: Client-side refetching and mutations
- **Server Actions**: Direct database mutations from client

```typescript
// Page level (Server Component)
const ingredients = await getAllIngredients();

// Client component with React Query
const { data, refetch } = useIngredients();

// Mutations with optimistic updates
const updateMutation = useMutation({
  mutationFn: updateIngredientQuantity,
  onSuccess: () => queryClient.invalidateQueries(),
});
```

#### 3. **Type Safety & Validation**

- **Zod schemas** validate all external inputs
- **TypeScript** ensures type safety throughout
- **Prisma** generates type-safe database client

```typescript
// API route validation
const body = await request.json();
const validated = checkRecipeSchema.parse(body);

// Type-safe database queries
const recipe = await prisma.recipe.findFirst({
  where: { ingredients: validated.ingredients },
});
```

#### 4. **Separation of Concerns**

- **Queries**: Pure read operations
- **Actions**: Write operations with side effects
- **API Routes**: HTTP layer with validation
- **Components**: UI presentation and interaction

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

- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run start`: Starts the production server
- `npm run lint`: Lints the codebase
- `npm run format`: Format code with Prettier
- `npm run seed`: Populates the database with initial data
- `npm test`: Run unit and component tests
- `npm run cypress:open`: Opens the Cypress E2E test runner
- `npm run cypress:run`: Run E2E tests in headless mode

## Testing Strategy

The project includes a pragmatic testing approach focusing on high-value tests:

- **Component Tests**: Snapshot tests for UI consistency
- **Hook Tests**: React Query integration and data fetching
- **E2E Tests**: Critical user flows (crafting success/failure)

See [Testing Summary](docs/testing-summary.md) for details.
