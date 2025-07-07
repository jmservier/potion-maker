"use client";

import { Button } from "@/components/ui/button";
import { Package, BeakerIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const pages = [
    {
      id: "laboratory",
      name: "Laboratory",
      icon: BeakerIcon,
      path: "/potion-maker",
    },
    { id: "inventory", name: "Inventory", icon: Package, path: "/inventory" },
    // { id: "grimoire", name: "Grimoire", icon: BookOpen, path: "/grimoire" },
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
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-amber-500/30 mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = currentPage === page.id;
          return (
            <Button
              key={page.id}
              onClick={() => handlePageChange(page.path)}
              variant={isActive ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-amber-600 to-green-600 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              }`}
            >
              <Icon size={16} />
              {page.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
