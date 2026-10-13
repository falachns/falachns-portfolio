"use client";

import { useState } from "react";
import LiveClock from "./LiveClock";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "falachns10@gmail.com";

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

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer wrap" id="contact" aria-label="Site footer">
      <div className="footer-email-row">
        <a
          href={`mailto:${email}`}
          onClick={handleCopy}
          className="footer-email-btn"
          title="Click to copy email address"
          aria-label={`Copy or email ${email}`}
        >
          <span>{email}</span>
          {copied ? (
            <span className="copied-toast-clean" role="status">
              Copied
            </span>
          ) : (
            <span style={{ fontSize: "11px", color: "var(--faint)" }}>↗</span>
          )}
        </a>

        <div className="footer-links-row">
          <a
            href="https://www.linkedin.com/in/falachnoorsyahid/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/falachns"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom-row">
        <LiveClock />

        <button
          onClick={scrollToTop}
          type="button"
          className="footer-back-to-top"
          aria-label="Scroll back to top"
        >
          <span>Top</span>
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
}
