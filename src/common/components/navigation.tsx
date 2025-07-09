"use client";

import { usePathname, useRouter } from "next/navigation";
import { BeakerIcon, BookOpen, Package } from "lucide-react";
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
    // { id: "history", name: "History", icon: History, path: "/history" },
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
    <div className="glass-card rounded-2xl p-6 mb-8 warm-glow">
      <div className="flex flex-wrap justify-center gap-3">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = currentPage === page.id;
          return (
            <Button
              key={page.id}
              onClick={() => handlePageChange(page.path)}
              className={`nav-button flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive ? "active" : ""
              }`}
            >
              <Icon size={18} />
              {page.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}