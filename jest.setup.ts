// Mock Prisma Client
jest.mock("@/server/db/client", () => ({
  __esModule: true,
  default: {
    recipe: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    ingredient: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    craftingAttempt: {
      create: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));