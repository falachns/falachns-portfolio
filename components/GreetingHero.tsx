"use client";

import { useEffect, useState } from "react";

const GREETINGS = ["Good day!", "Bonjour!", "Ni Hao!", "I’m Falach"];

export default function GreetingHero() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-intro">
      <div className="hero-greeting-pill" aria-label="Multilingual greeting">
        <span className="greeting-text fade-in-text" key={greetingIndex}>
          {GREETINGS[greetingIndex]}
        </span>
      </div>

      <h1 id="intro-title" className="hero-headline">
        <span className="hero-title-main">
          Good day! I&apos;m Falach, <span className="font-editorial italic">Product Designer</span> building products
        </span>{" "}
        <span className="hero-title-sub font-editorial italic">
          into meaningful digital experiences.
        </span>
      </h1>

      <div className="hero-status-bar">
        <a
          href="https://www.qiscus.com/en/about-us"
          target="_blank"
          rel="noreferrer"
          className="hero-badge"
          aria-label="Currently designing platform for railway ecosystem at PT KAI (Persero)"
        >
          <span className="pulse-indicator" aria-hidden="true" />
          <span className="badge-text">
            ✦ Currently designing platform for railway ecosystem, with 40M+ users at{" "}
            <strong>PT KAI (Persero)</strong>
          </span>
        </a>
      </div>
    </div>
  );
}
