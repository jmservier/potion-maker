import type { Metadata } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Potion Maker",
  description: "Tech Test - Potion Maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${crimsonText.variable} ${inter.variable} ${inter.className} antialiased`}
      >
        <Providers>
          <div className="min-h-screen">
            <div className="mx-auto max-w-7xl p-6">
              <div className="mb-12 text-center">
                <h1 className="gradient-text mb-4 flex items-center justify-center gap-4 text-5xl font-bold">
                  Laboratoire de potions
                </h1>
              </div>
              <Navigation />
              {children}
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
