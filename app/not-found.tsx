import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export default function NotFound() {
  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content">
        <article className="subpage-container wrap" id="not-found-content">
          <div className="py-24 flex flex-col items-start gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
              404 / UNDER CONSTRUCTION
            </span>
            <h1 className="text-xl sm:text-2xl font-normal text-[var(--ink)] m-0">
              This page is under construction
            </h1>
            <p
              className="text-sm text-[var(--muted)] leading-relaxed m-0 max-w-md"
              style={{ fontSize: "16px" }}
            >
              Still polishing things up here. Check back soon!
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--muted)] transition-colors border-b border-[var(--ink)] pb-0.5"
                aria-label="Return to home page"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={15} strokeWidth={2} aria-hidden="true" />
                <span>Take Me Home</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
