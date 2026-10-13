import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Explorations — Falachns",
  description: "Visual archive of interaction prototypes, motion studies, and interface design experiments by Falach Noor Syahid.",
  alternates: {
    canonical: "/explorations",
  },
};

const EXPLORATION_MEDIA = [
  // 1. Focus Pomodoro Interactive Item
  {
    type: "pomodoro-link" as const,
    url: "https://focus-pomodoro.figma.site/",
    video: "https://framerusercontent.com/assets/d1g0Txzj2AYZxCtpk5MOqzOlZ3g.mp4",
    caption: "Focus Pomodoro Timer ↗",
  },
  // 2. Interaction dynamics video
  {
    type: "video" as const,
    src: "https://framerusercontent.com/assets/k3zM7tkCAle8MCUntBKNDfT1k.mp4",
  },
  // 3. Design system & UI explorations images
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/KyirwtP3wo9c3ntxA5k7KiafSHE.png",
    alt: "E-commerce customer microsite and product variant layout",
    width: 2048,
    height: 1640,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/hid2aXaIO0nS85UlbzxXgVXenE.png",
    alt: "Focus Pomodoro timer surface in calm dark mode",
    width: 2048,
    height: 1536,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/GICwTFgsnfLjZXszkuwLhxZnuEY.png",
    alt: "Typography scale and responsive layout tokens",
    width: 3371,
    height: 2107,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/6NpLiiKLI5uEBIGCdoJsGKtSYuk.png",
    alt: "Mobile interaction interface exploration with tactile ergonomics",
    width: 2048,
    height: 1536,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/qQc7WUoyINHdIlhFOMXDwNkZY.png",
    alt: "Product design system component patterns and tokens",
    width: 2048,
    height: 1536,
  },
  // 4. Video micro-flow loop
  {
    type: "video" as const,
    src: "https://framerusercontent.com/assets/k4s8yStUsLN4Qebk233ITGV1HFA.mp4",
  },
  // 5. Visual archive layout shots
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/BlnMUGhj3Oz7EpDsV2dcYdhvgmc.png",
    alt: "Visual design exploration layout shot",
    width: 2048,
    height: 1536,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/1msSV1xFrqoPHjmxQNsLVfbLA.png",
    alt: "Interface prototype screen details",
    width: 2048,
    height: 1536,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/urhFFkMoogSQO8w3dkO1fjbrbrg.png",
    alt: "Surface architecture and micro-typography layout",
    width: 3072,
    height: 1920,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/aRFHIOdNQxul8cfmfAHnh3mldo.png",
    alt: "Multi-platform responsive breakpoint explorations",
    width: 4096,
    height: 2560,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/jBQroMlfYBz6JaJ8vVFhZJwuNt4.png",
    alt: "Interactive visual design experiment view",
    width: 2048,
    height: 1536,
  },
  {
    type: "image" as const,
    src: "https://framerusercontent.com/images/6FDPE9O0WC3nwLC5YnYNJD2cBvg.png",
    alt: "Product workflow and state transitions prototype",
    width: 2048,
    height: 1536,
  },
];

export default function ExplorationsPage() {
  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content">
        {/* Pure Framer-fidelity explorations grid: no visible title, mounting directly under header */}
        <h1 className="sr-only">Explorations</h1>
        <div className="wrap pt-28 pb-20">
          <section aria-label="Explorations visual gallery" className="flex flex-col space-y-6 sm:space-y-8">
            {EXPLORATION_MEDIA.map((item, idx) => {
              if (item.type === "pomodoro-link") {
                return (
                  <figure key={`pomodoro-${idx}`} className="m-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                      aria-label="Open Focus Pomodoro Timer preview"
                    >
                      <video
                        src={item.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full rounded-xl object-cover border border-neutral-200/60 dark:border-neutral-800/60 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors"
                      />
                      <figcaption className="mt-2 text-xs font-mono text-[var(--muted)] group-hover:text-[var(--ink)] transition-colors">
                        {item.caption}
                      </figcaption>
                    </a>
                  </figure>
                );
              }

              if (item.type === "video") {
                return (
                  <figure key={`video-${idx}`} className="m-0">
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full rounded-xl object-cover border border-neutral-200/60 dark:border-neutral-800/60"
                    />
                  </figure>
                );
              }

              return (
                <figure key={`image-${idx}`} className="m-0">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 680px) 100vw, 680px"
                    className="w-full h-auto rounded-xl object-cover border border-neutral-200/60 dark:border-neutral-800/60"
                  />
                </figure>
              );
            })}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
