// Mock Prisma Client
jest.mock("@/lib/db", () => ({
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
