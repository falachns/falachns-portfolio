"use client";

import { useState } from "react";
import Image from "next/image";

interface MediaViewerProps {
  src?: string;
  poster?: string;
  video?: string;
  videoPoster?: string;
  image?: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

export default function MediaViewer({
  src,
  poster,
  video,
  videoPoster,
  image,
  alt,
  width = 1200,
  height = 750,
  aspectRatio = "16 / 10",
  caption,
  className = "",
  priority = false,
}: MediaViewerProps) {
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const activeVideo = video || (src && (src.endsWith(".mp4") || src.endsWith(".webm") || src.includes(".mp4")) ? src : undefined);
  const displayImage = videoPoster || poster || image || (!activeVideo ? src : undefined);

  return (
    <figure className={`media-container ${className}`}>
      {activeVideo && !videoError ? (
        <video
          src={activeVideo}
          poster={displayImage}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded-lg object-cover project-video"
          style={{ aspectRatio }}
          onError={() => {
            console.warn(`Video failed to load: ${activeVideo}, falling back to poster image`);
            setVideoError(true);
          }}
        />
      ) : displayImage && !imageError ? (
        <Image
          src={displayImage}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 720px) 100vw, 680px"
          className="project-img"
          onError={() => {
            console.warn(`Image failed to load: ${displayImage}`);
            setImageError(true);
          }}
        />
      ) : (
        <div
          style={{
            aspectRatio: "16 / 10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--card)",
            color: "var(--subtle)",
            fontFamily: "var(--font-family-mono)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {alt || "Preview asset"}
        </div>
      )}

      {caption && <figcaption className="media-caption">{caption}</figcaption>}
    </figure>
  );
}
