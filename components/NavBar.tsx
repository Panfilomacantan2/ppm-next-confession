"use client";

import Link from "next/link";
import { NavLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { SideBar } from "./SideBar";
import { AddConfessionDialog } from "./add-confession-button";
import { MessageCircleHeart } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const { isLoaded } = useUser();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-center border-b border-border/40 bg-background/80 backdrop-blur-md lg:px-20">
      <div className="flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm transition-transform group-hover:scale-105">
            <MessageCircleHeart size={18} />
          </div>
          <span className="text-base font-bold tracking-tight">
            Konpisko<span className="text-rose-500">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="ml-auto flex items-center gap-1">
          {NavLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <Link
                key={link.route}
                href={link.route}
                className={cn(
                  "hidden rounded-md px-3 py-1.5 text-sm font-medium transition-colors lg:block",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {link.title}
              </Link>
            );
          })}

          <div className="mx-2 hidden h-4 w-px bg-border lg:block" />

          <AddConfessionDialog />

          <SignedIn>
            <div className="ml-2 h-8 w-8">
              {!isLoaded ? (
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
              ) : (
                <UserButton afterSignOutUrl="/sign-in" />
              )}
            </div>
          </SignedIn>

          <div className="ml-1 lg:hidden">
            <SideBar />
          </div>
        </nav>
      </div>
    </header>
  );
}
