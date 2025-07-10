"use client";

import { usePathname, useRouter } from "next/navigation";
import { BeakerIcon, BookOpen, History, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const pages = [
    {
      id: "laboratory",
      name: "Laboratoire",
      icon: BeakerIcon,
      path: "/crafting",
    },
    { id: "inventory", name: "Inventaire", icon: Package, path: "/inventory" },
    { id: "recipes", name: "Recettes", icon: BookOpen, path: "/recipes" },
    { id: "history", name: "Historique", icon: History, path: "/history" },
  ];

  const getCurrentPage = () => {
    const currentPage = pages.find((page) => pathname === page.path);
    return currentPage?.id || "laboratory";
  };

  const handlePageChange = (path: string) => {
    router.push(path);
  };

  const currentPage = getCurrentPage();

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-4">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = currentPage === page.id;
          return (
            <Button
              key={page.id}
              onClick={() => handlePageChange(page.path)}
              className={`nav-button flex items-center gap-3 rounded-xl px-8 py-4 text-base font-semibold transition-all duration-200 ${
                isActive ? "active" : ""
              }`}
            >
              <Icon size={20} />
              {page.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
