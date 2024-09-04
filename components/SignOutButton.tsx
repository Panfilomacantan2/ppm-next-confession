"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return (
    // Clicking on this button will sign out a user
    // and reroute them to the "/" (home) page.
    <Button
      className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-transparent p-2 text-foreground/80 hover:bg-transparent"
      onClick={() => signOut({ redirectUrl: "/sign-in" })}
    >
      Logout <LogOut size={18} />
    </Button>
  );
}
