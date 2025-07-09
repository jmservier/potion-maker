import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Beaker } from "lucide-react";
import { Navigation } from "@/common/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <Providers>
          <div className="min-h-screen">
            <div className="mx-auto max-w-7xl p-6">
              <div className="mb-12 text-center">
                <h1 className="gradient-text mb-4 flex items-center justify-center gap-4 text-5xl font-bold">
                  <Beaker className="text-magical-purple" size={42} />
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
