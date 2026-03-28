"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu, MessageCircleHeart, Home, BookMarked } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { Separator } from "./ui/separator";

const navIcons = [
  <Home key="home" size={16} />,
  <BookMarked key="bookmarked" size={16} />,
];

export function SideBar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-rose-400/60 hover:text-rose-500 lg:hidden">
          <Menu size={16} />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-72 flex-col p-0">
        {/* Header */}
        <SheetHeader className="px-5 pb-4 pt-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm">
              <MessageCircleHeart size={16} />
            </div>
            <span className="text-base font-bold tracking-tight">
              Konpisko<span className="text-rose-500">.</span>
            </span>
          </Link>
          <p className="text-xs text-muted-foreground">
            Anonymous confessions, shared with the world.
          </p>
        </SheetHeader>

        <Separator />

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 pt-4">
          {NavLinks.map((link, idx) => {
            const isActive = pathname === link.route;
            return (
              <Link key={link.route} href={link.route}>
                <SheetClose asChild>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md",
                        isActive
                          ? "bg-rose-500 text-white"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {navIcons[idx]}
                    </span>
                    {link.title}
                  </div>
                </SheetClose>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <SheetFooter className="mt-auto px-3 pb-6">
          <Separator className="mb-4" />
          <SheetClose asChild>
            <SignOutButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
