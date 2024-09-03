import Link from "next/link";
import React from "react";

export default function ConfessionContent({
  content,
  id,
}: {
  content: string;
  id: string;
}) {
  const contentLength = content.length;
  if (contentLength > 170) {
    return (
      <>
        {content.substring(0, 170)}...{" "}
        <Link className="hover:underline" href={`/confession/${id}`}>See more</Link>
      </>
    );
  }

  return content;
}
