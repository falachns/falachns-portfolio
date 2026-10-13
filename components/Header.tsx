"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { openAskDrawer } from "./AskFalachDrawer";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header wrap" id="top">
      <Link href="/" className="wordmark" aria-label="Falachns home">
        falachns
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          Work
        </Link>
        <Link
          href="/playground"
          className={`nav-link ${pathname === "/playground" ? "active" : ""}`}
        >
          Playground
        </Link>
        <Link
          href="/explorations"
          className={`nav-link ${pathname === "/explorations" ? "active" : ""}`}
        >
          Explorations
        </Link>
        <button
          type="button"
          onClick={openAskDrawer}
          className="nav-ai-btn"
          aria-label="Open Ask FalachLLM assistant drawer"
        >
          <span>Ask FalachLLM</span>
          <kbd className="nav-kbd">⌘K</kbd>
        </button>
      </nav>
    </header>
  );
}
