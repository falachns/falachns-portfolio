import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, SparklesIcon } from "@hugeicons/core-free-icons";
import LiveClock from "@/components/LiveClock";
import EmailCopy from "@/components/EmailCopy";
import BackToTop from "@/components/BackToTop";
import PomodoroWidget from "@/components/PomodoroWidget";

export const metadata: Metadata = {
  title: "Design Works & Explorations",
  description: "Focus Pomodoro Timer and creative UI/UX design experiments by Falach Noor Syahid.",
  alternates: {
    canonical: "/explorations",
  },
};

const EXPLORATION_SHOTS = [
  {
    title: "Focus Pomodoro Interface & Dark Mode Ergonomics",
    caption: "Minimalist timer surface optimized for visual serenity and deep concentration.",
    image: "https://framerusercontent.com/images/hid2aXaIO0nS85UlbzxXgVXenE.png?width=2048&height=1221",
    tag: "Product Concept",
  },
  {
    title: "Typography & Responsive Grid System",
    caption: "Micro-typographic hierarchy pairing sans-serif utility with editorial serifs.",
    image: "https://framerusercontent.com/images/GICwTFgsnfLjZXszkuwLhxZnuEY.png?width=3371&height=2427",
    tag: "Visual Design",
  },
  {
    title: "Mobile Interaction & Component States",
    caption: "High-density touch targets, tactile spring physics, and intuitive bottom navigation.",
    image: "https://framerusercontent.com/images/6NpLiiKLI5uEBIGCdoJsGKtSYuk.png?width=2048&height=1536",
    tag: "Mobile UX",
  },
];

export default function ExplorationsPage() {
  return (
    <main id="main-content" className="site-wrapper">
      <a className="skip-link" href="#explorations-content">
        Skip to content
      </a>

      {/* Header */}
      <header className="site-header wrap" id="top">
        <Link className="wordmark" href="/">
          falachns
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/" className="nav-back">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link href="/playground" className="nav-link">
            Playground
          </Link>
          <Link href="/explorations" className="nav-link active">
            Explorations
          </Link>
          <Link href="/ask-falach" className="nav-link nav-highlight">
            Ask FalachLLM
          </Link>
        </nav>
      </header>

      {/* Explorations Article */}
      <article className="wrap explorations-article" id="explorations-content">
        <header className="explorations-hero">
          <span className="explorations-badge">
            <HugeiconsIcon icon={SparklesIcon} size={14} strokeWidth={2} aria-hidden="true" />
            Creative Lab
          </span>
          <h1 className="explorations-headline">
            Focus Pomodoro Timer
          </h1>
          <p className="explorations-lead font-editorial italic">
            Calm space to get things done. Set your timer, queue your tasks, pick a background that matches your mood, and let the ambient sound keep you in the zone. Try it for yourself!
          </p>

          <PomodoroWidget />
        </header>

        {/* Visual Explorations Showcase */}
        <section className="explorations-showcase" aria-label="Visual design archive">
          <div className="section-label-bar">
            <span className="section-label">Selected Explorations</span>
            <span className="section-sublabel">Interaction & Visual Design</span>
          </div>

          <div className="explorations-grid">
            {EXPLORATION_SHOTS.map((shot) => (
              <figure className="exploration-item" key={shot.title}>
                <div className="exploration-media">
                  <Image
                    src={shot.image}
                    alt={shot.title}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="exploration-img"
                  />
                  <span className="exploration-tag">{shot.tag}</span>
                </div>
                <figcaption className="exploration-caption">
                  <h4>{shot.title}</h4>
                  <p>{shot.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="footer wrap" id="contact" aria-label="Site footer">
        <div className="footer-status-row">
          <LiveClock />
          <BackToTop />
        </div>

        <div className="footer-thanks">
          <p className="thanks-text">Thanks for checking it out!</p>
        </div>

        <div className="contact-row">
          <EmailCopy email="falachns10@gmail.com" />

          <div className="socials">
            <a
              href="https://www.linkedin.com/in/falachnoorsyahid/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <span>Linkedin</span>
              <span className="social-sub">Connect</span>
            </a>
            <a
              href="https://github.com/falachns"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <span>GitHub</span>
              <span className="social-sub">Shots ➜</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Falach Noor Syahid. Crafted with care.
          </p>
          <div className="footer-badge">
            <span className="dot" aria-hidden="true" />
            <span>falachns.web.id/explorations</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
