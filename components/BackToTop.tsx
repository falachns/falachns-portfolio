"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";

export default function BackToTop() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="back-to-top"
      aria-label="Scroll back to top of page"
      type="button"
    >
      <span>Back to top</span>
      <HugeiconsIcon icon={ArrowUp01Icon} size={15} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
