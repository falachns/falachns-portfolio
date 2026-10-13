import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export default function NotFound() {
  return (
    <main id="main-content" className="site-wrapper">
      <a className="skip-link" href="#not-found-content">
        Skip to content
      </a>

      <Header />

      <article className="subpage-container wrap" id="not-found-content">
        <div className="py-24 flex flex-col items-start gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--faint)]">
            404 / NOT FOUND
          </span>
          <h1 className="text-xl sm:text-2xl font-normal text-[var(--ink)] m-0">
            This page does not exist or has moved.
          </h1>
          <p className="text-sm text-[var(--muted)] leading-relaxed m-0 max-w-md">
            The link you followed might be broken, or the page may have been restructured during our minimalist redesign.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--muted)] transition-colors border-b border-[var(--ink)] pb-0.5"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={15} strokeWidth={2} aria-hidden="true" />
              <span>Return to Index</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
