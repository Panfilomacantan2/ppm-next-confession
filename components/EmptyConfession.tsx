import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import ButtonCreateConfessionForm from "./button-create-confession-form";

export default function EmptyConfession() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 py-16 text-center">
      <Image
        src="/icons/empty_confession.svg"
        alt="empty-confession"
        height={160}
        width={160}
        priority
        className="h-40 w-40 opacity-80"
      />
      <h3 className="text-lg font-semibold text-foreground">
        No confessions yet
      </h3>
      <p className="text-sm text-muted-foreground">
        Be the first to share something anonymously.
      </p>
      <Button asChild className="mt-2">
        <ButtonCreateConfessionForm />
      </Button>
    </div>
  );
}
