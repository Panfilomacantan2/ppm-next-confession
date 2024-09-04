import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function EmptyConfession() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/icons/empty_confession.svg"
        alt="empty-confession"
        height={200}
        width={200}
        priority
        className="h-[200px] w-[200px]"
      />

      <p className="my-4 text-lg text-foreground/80">No confessions yet</p>

      <Button asChild>
        <Link href="/create">Create now</Link>
      </Button>
    </div>
  );
}
