import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaViewer from "@/components/MediaViewer";
import PomodoroWidget from "@/components/PomodoroWidget";

export const metadata: Metadata = {
  title: "Explorations — Falach Noor Syahid",
  description: "Focus Pomodoro timer and creative UI/UX design experiments by Falach Noor Syahid.",
  alternates: {
    canonical: "/explorations",
  },
};

const EXPLORATION_SHOTS = [
  {
    title: "Focus Pomodoro Interface & Dark Mode",
    caption: "Minimalist timer surface optimized for visual serenity and deep concentration.",
    video: "https://framerusercontent.com/assets/d1g0Txzj2AYZxCtpk5MOqzOlZ3g.mp4",
    poster: "https://framerusercontent.com/images/hid2aXaIO0nS85UlbzxXgVXenE.png?width=2048&height=1221",
    tag: "PROTOTYPE",
  },
  {
    title: "Typography & Responsive Grid System",
    caption: "Micro-typographic hierarchy pairing sans-serif utility with editorial serifs.",
    image: "https://framerusercontent.com/images/GICwTFgsnfLjZXszkuwLhxZnuEY.png?width=3371&height=2427",
    tag: "DESIGN SYSTEM",
  },
  {
    title: "Mobile Interaction & Component States",
    caption: "High-density touch targets, tactile spring physics, and intuitive bottom navigation.",
    image: "https://framerusercontent.com/images/6NpLiiKLI5uEBIGCdoJsGKtSYuk.png?width=2048&height=1536",
    tag: "MOBILE UX",
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
        <header className="subpage-header">
          <div className="section-label-quiet">LAB / 01</div>
          <h1 className="subpage-title">Focus Pomodoro Timer</h1>
          <p className="subpage-lead">
            A quiet space to get things done. Set your timer, queue your tasks, and let ambient focus keep you in the flow.
          </p>

          <PomodoroWidget />
        </header>

        {/* Selected Visual Explorations */}
        <section className="section-block" aria-label="Selected Explorations">
          <div className="section-label-quiet">ARCHIVE / VISUAL EXPERIMENTS</div>

          <div className="flex flex-col gap-10">
            {EXPLORATION_SHOTS.map((shot) => (
              <figure key={shot.title} className="flex flex-col gap-3">
                <MediaViewer
                  video={shot.video}
                  videoPoster={shot.poster}
                  image={shot.image}
                  alt={shot.title}
                  aspectRatio="16 / 10"
                />
                <figcaption className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-[var(--ink)] m-0">{shot.title}</h2>
                    <span className="tag-mono">{shot.tag}</span>
                  </div>
                  <p className="text-[13px] text-[var(--subtle)] m-0 leading-relaxed">{shot.caption}</p>
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
