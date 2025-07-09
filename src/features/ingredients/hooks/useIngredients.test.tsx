import React from "react";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { mockIngredients } from "@/server/__mocks__/data";
import { useIngredients, useResetInventory } from "./useIngredients";

// Mock fetch globally
global.fetch = jest.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = "TestQueryClientProviderWrapper";
  return Wrapper;
};

describe("useIngredients", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch ingredients successfully", async () => {
    const mockResponse = mockIngredients.slice(0, 3);
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useIngredients(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith("/api/ingredients");
  });

  it("should handle fetch error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useIngredients(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe(
      "Échec du chargement des ingrédients",
    );
  });

  it("should use initial data when provided", () => {
    const initialData = mockIngredients.slice(0, 2);

    const { result } = renderHook(() => useIngredients(initialData), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toEqual(initialData);
  });
});

describe("useResetInventory", () => {
  it("should reset inventory successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { result } = renderHook(() => useResetInventory(), {
      wrapper: createWrapper(),
    });

    await result.current.mutateAsync();

    expect(global.fetch).toHaveBeenCalledWith("/api/ingredients/reset", {
      method: "POST",
    });
  });

  it("should handle reset error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useResetInventory(), {
      wrapper: createWrapper(),
    });

    await expect(result.current.mutateAsync()).rejects.toThrow(
      "Échec de la réinitialisation de l'inventaire",
    );
  });
});
