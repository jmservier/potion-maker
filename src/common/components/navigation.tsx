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
    <div 
      className="rounded-2xl p-6 mb-8"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(222, 184, 135, 0.3)',
        boxShadow: '0 4px 20px rgba(222, 184, 135, 0.3)'
      }}
    >
      <div className="flex flex-wrap gap-3 justify-center">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = currentPage === page.id;
          return (
            <Button
              key={page.id}
              onClick={() => handlePageChange(page.path)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200"
              style={{
                background: isActive 
                  ? 'linear-gradient(135deg, #a0522d 0%, #8b4513 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.7) 100%)',
                border: isActive 
                  ? '1px solid #a0522d'
                  : '1px solid rgba(210, 180, 140, 0.5)',
                color: isActive ? 'white' : '#a0522d',
                boxShadow: isActive 
                  ? '0 4px 15px rgba(160, 82, 45, 0.3)'
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(222, 184, 135, 0.15) 0%, rgba(245, 230, 211, 0.8) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(160, 82, 45, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.7) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(210, 180, 140, 0.5)';
                }
              }}
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
