"use client";

import { useState, useEffect } from "react";
import LiveClock from "./LiveClock";

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const email = "falachns10@gmail.com";

  useEffect(() => {
    // Read active theme from DOM attribute or default to light
    const active =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    setTheme(active);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Ignore local storage errors
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer className="site-footer wrap" id="contact" aria-label="Site footer">
      <div className="footer-email-row">
        <button
          type="button"
          onClick={handleCopy}
          className="footer-email-btn"
          title="Click to copy email address"
          aria-label={`Copy email address ${email}`}
        >
          <span>{email}</span>
          {copied ? (
            <span className="copied-badge" role="status">
              <CheckIcon className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </span>
          ) : (
            <span className="copy-icon-wrap" aria-hidden="true">
              <CopyIcon className="w-3.5 h-3.5" />
            </span>
          )}
        </button>

        <div className="footer-links-row">
          <a
            href="https://x.com/falachns"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter) profile"
          >
            X ↗
          </a>
          <a
            href="https://www.linkedin.com/in/falachnoorsyahid/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/falachns"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom-row">
        <LiveClock />

        <button
          type="button"
          onClick={toggleTheme}
          className="theme-icon-btn"
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          title={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {theme === "dark" ? (
            <SunIcon className="w-3.5 h-3.5" />
          ) : (
            <MoonIcon className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </footer>
  );
}
