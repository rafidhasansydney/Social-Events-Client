"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

export default function EventImage({ src, title = "Event photograph" }) {
  const [failed, setFailed] = useState(false);
  let valid = false;
  try {
    const url = new URL(src);
    valid =
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password;
  } catch {}
  return (
    <div className="event-photo">
      {valid && !failed ? (
        <Image
          src={src}
          alt={title}
          fill
          unoptimized
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="event-photo-placeholder">
          <ImagePlus size={30} strokeWidth={1.2} />
          <span>
            {failed ? "Image unavailable" : "A glimpse of your good work"}
          </span>
        </div>
      )}
    </div>
  );
}
