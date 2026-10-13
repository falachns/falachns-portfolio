import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import LiveClock from "@/components/LiveClock";
import EmailCopy from "@/components/EmailCopy";
import BackToTop from "@/components/BackToTop";

export default function NotFound() {
  return (
    <main id="main-content" className="site-wrapper not-found-wrapper">
      <header className="site-header wrap" id="top">
        <Link className="wordmark" href="/">
          falachns
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/playground" className="nav-link">
            Playground
          </Link>
          <Link href="/explorations" className="nav-link">
            Explorations
          </Link>
          <Link href="/ask-falach" className="nav-link nav-highlight">
            Ask FalachLLM
          </Link>
        </nav>
      </header>

      <section className="not-found wrap" aria-labelledby="not-found-heading">
        <div className="not-found-card">
          <span className="not-found-code">404</span>
          <h1 id="not-found-heading" className="not-found-title">
            This page is under construction
          </h1>
          <p className="not-found-text font-editorial italic">
            Still polishing things up here. Check back soon!
          </p>
          <Link href="/" className="not-found-btn">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} aria-hidden="true" />
            <span>Take Me Home</span>
          </Link>
        </div>
      </section>

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
            <span>falachns.web.id</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
