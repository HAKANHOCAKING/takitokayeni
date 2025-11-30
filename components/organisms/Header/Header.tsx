"use client";

import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "@/components/atoms/Button";

export const Header = () => {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold">Takı Toka</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Products
            </Link>
            <Link
              href="/builder"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Builder
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button variant="outline" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

