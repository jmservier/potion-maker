"use client";

import { usePathname, useRouter } from "next/navigation";
import { BeakerIcon, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="mb-8 rounded-xl border border-amber-500/30 bg-black/30 p-4 backdrop-blur-sm">
      <div className="flex flex-wrap justify-center gap-2">
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
                  : "border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700"
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
