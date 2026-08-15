import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export default function NotFound() {
  return (
    <main className="not-found">
      <a className="wordmark" href="/">Falachns</a>
      <section className="not-found-message">
        <p className="not-found-label">404</p>
        <h1>This page is under construction</h1>
        <p>Still polishing things up here. Check back soon!</p>
        <a className="home-link" href="/">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={17} strokeWidth={1.7} />
          Take Me Home
        </a>
      </section>
    </main>
  );
}
