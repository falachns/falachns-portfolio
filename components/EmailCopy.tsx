"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, CheckmarkCircle02Icon, Copy01Icon } from "@hugeicons/core-free-icons";

export default function EmailCopy({ email = "falachns10@gmail.com" }: { email?: string }) {
  const [copied, setCopied] = useState(false);

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
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="email-copy-wrapper">
      <a
        href={`mailto:${email}`}
        onClick={handleCopy}
        className="email"
        aria-label={`Copy or email ${email}`}
        title="Click to copy email address"
      >
        <span>{email}</span>
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={24}
          strokeWidth={1.5}
          className="email-arrow"
          aria-hidden="true"
        />
      </a>

      {copied && (
        <span className="copied-toast" role="status" aria-live="polite">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} strokeWidth={2} aria-hidden="true" />
          <span>Copied!</span>
        </span>
      )}
    </div>
  );
}
