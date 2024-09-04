import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function EmptyConfession() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Image
        src="/icons/empty_confession.svg"
        alt="empty-confession"
        height={200}
        width={200}
      />
      <p className="text-lg text-foreground/80">No confessions yet</p>

      <Button asChild>
        <Link href="/create">Create now</Link>
      </Button>
    </div>
  );
}
