import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaViewer from "@/components/MediaViewer";
import PomodoroWidget from "@/components/PomodoroWidget";

export const metadata: Metadata = {
  title: "Design Works & Explorations — Falach Noor Syahid",
  description: "Focus Pomodoro timer and creative UI/UX design experiments by Falach Noor Syahid.",
  alternates: {
    canonical: "/explorations",
  },
};

const EXPLORATION_ITEMS = [
  {
    title: "Focus Pomodoro Interface & Dark Mode Ergonomics",
    caption: "Minimalist timer surface optimized for visual serenity and deep concentration.",
    video: "https://framerusercontent.com/assets/d1g0Txzj2AYZxCtpk5MOqzOlZ3g.mp4",
    poster: "https://framerusercontent.com/images/hid2aXaIO0nS85UlbzxXgVXenE.png?width=2048",
    tag: "INTERACTIVE LAB",
  },
  {
    title: "Mobile Interaction & Tactile Physics",
    caption: "High-density touch targets, fluid spring physics, and intuitive bottom navigation.",
    video: "https://framerusercontent.com/assets/k4s8yStUsLN4Qebk233ITGV1HFA.mp4",
    poster: "https://framerusercontent.com/images/6NpLiiKLI5uEBIGCdoJsGKtSYuk.png?width=2048",
    tag: "MOTION PROTOTYPE",
  },
  {
    title: "Product Workflow & State Transitions",
    caption: "Seamless step transitions and real-time state feedback for enterprise workflows.",
    video: "https://framerusercontent.com/assets/k3zM7tkCAle8MCUntBKNDfT1k.mp4",
    poster: "https://framerusercontent.com/images/6FDPE9O0WC3nwLC5YnYNJD2cBvg.png?width=2048",
    tag: "PRODUCT PROTOTYPE",
  },
  {
    title: "Typography & Responsive Grid System",
    caption: "Micro-typographic scale pairing clean utility sans-serif with editorial contrast.",
    image: "https://framerusercontent.com/images/GICwTFgsnfLjZXszkuwLhxZnuEY.png?width=3371",
    tag: "DESIGN SYSTEM",
  },
  {
    title: "Component Ergonomics & Surface Tokens",
    caption: "Hairline borders, elevation-free card layers, and neutral-ink hierarchy.",
    image: "https://framerusercontent.com/images/urhFFkMoogSQO8w3dkO1fjbrbrg.png?width=3072",
    tag: "SURFACE ARCHITECTURE",
  },
  {
    title: "Multi-Platform Layout Architecture",
    caption: "Responsive density scaling across mobile, tablet, and desktop breakpoints.",
    image: "https://framerusercontent.com/images/aRFHIOdNQxul8cfmfAHnh3mldo.png?width=4096",
    tag: "LAYOUT EXPLORATION",
  },
];

export default function ExplorationsPage() {
  return (
    <main id="main-content" className="site-wrapper">
      <a className="skip-link" href="#explorations-content">
        Skip to content
      </a>

      <Header />

      <article className="subpage-container wrap" id="explorations-content">
        {/* Authentic Header Matching Framer */}
        <header className="subpage-header">
          <div className="section-label-quiet">LAB / FOCUS TIMER</div>
          <h1 className="subpage-title">Focus Pomodoro Timer</h1>
          <p className="subpage-lead">
            Calm space to get things done. Set your timer, queue your tasks, pick a background that matches your mood, and let the ambient sound keep you in the zone. Try it for yourself!
          </p>

          <PomodoroWidget />
        </header>

        {/* Selected Visual Explorations Showcase */}
        <section className="section-block" aria-label="Selected Explorations">
          <div className="section-header">
            <h2 className="section-title">Selected Explorations</h2>
            <span className="section-sublabel">Interaction & Visual Design</span>
          </div>

          <div className="flex flex-col gap-12">
            {EXPLORATION_ITEMS.map((item) => (
              <figure key={item.title} className="flex flex-col gap-3">
                <MediaViewer
                  video={item.video}
                  videoPoster={item.poster}
                  image={item.image}
                  alt={item.title}
                  aspectRatio="16 / 10"
                />
                <figcaption className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-[var(--ink)] m-0">{item.title}</h3>
                    <span className="tag-mono">{item.tag}</span>
                  </div>
                  <p className="text-[13px] text-[var(--subtle)] m-0 leading-relaxed">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
