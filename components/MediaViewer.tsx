"use client";

import { useState, useRef, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeVideo =
    video ||
    (src && (src.endsWith(".mp4") || src.endsWith(".webm") || src.includes(".mp4"))
      ? src
      : undefined);
  const displayImage =
    videoPoster || poster || image || (!activeVideo ? src : undefined);

  useEffect(() => {
    if (!activeVideo || videoError) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            setShouldLoad(true);
            const v = videoRef.current;
            if (v) {
              if (!v.src && activeVideo) {
                v.src = activeVideo;
              }
              const playPromise = v.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    requestAnimationFrame(() => setIsPlaying(true));
                  })
                  .catch(() => {
                    // Autoplay policy or interrupted
                  });
              }
            }
          });
        } else {
          requestAnimationFrame(() => {
            const v = videoRef.current;
            if (v && !v.paused) {
              v.pause();
            }
          });
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [activeVideo, videoError]);

  return (
    <figure className={`media-container ${className}`}>
      {activeVideo && !videoError ? (
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden rounded-lg"
          style={{ aspectRatio }}
        >
          {/* High-fidelity Next.js optimized WebP/AVIF poster */}
          {displayImage && !imageError && (
            <Image
              src={displayImage}
              alt={alt}
              fill
              priority={priority}
              quality={80}
              unoptimized={priority}
              sizes="(max-width: 768px) 100vw, 680px"
              className={`object-cover transition-opacity duration-300 ${
                isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
              onError={() => setImageError(true)}
              {...(priority ? { fetchPriority: "high" as any } : {})}
            />
          )}

          <video
            ref={videoRef}
            src={shouldLoad ? activeVideo : undefined}
            poster={displayImage}
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover project-video"
            style={{ aspectRatio }}
            onPlaying={() => setIsPlaying(true)}
            {...(priority ? { fetchPriority: "high" as any } : {})}
            onError={() => {
              console.warn(
                `Video failed to load: ${activeVideo}, falling back to poster image`
              );
              setVideoError(true);
            }}
          />
        </div>
      ) : displayImage && !imageError ? (
        <Image
          src={displayImage}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={80}
          sizes="(max-width: 768px) 100vw, 680px"
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
