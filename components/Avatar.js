"use client";

import { useState } from "react";
import Image from "next/image";

export default function Avatar({ user, className = "" }) {
  const [failed, setFailed] = useState(false);
  const initials = (user.name || "Member")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return (
    <span className={`avatar ${className}`} title={user.name}>
      {user.image && !failed ? (
        <Image
          src={user.image}
          alt={user.name || "Your profile"}
          fill
          sizes="80px"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
