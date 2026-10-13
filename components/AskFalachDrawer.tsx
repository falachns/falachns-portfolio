"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  SentIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import {
  LLMMessage,
  PRESET_PROMPTS,
  getFalachResponse,
} from "@/data/falachLLM";

export function openAskDrawer() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-ask-falach"));
  }
}

export default function AskFalachDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<LLMMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerPanelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const closeDrawer = () => {
    setIsOpen(false);
    if (
      previouslyFocusedElementRef.current &&
      typeof previouslyFocusedElementRef.current.focus === "function"
    ) {
      previouslyFocusedElementRef.current.focus();
    }
  };

  useEffect(() => {
    const handleOpen = () => {
      previouslyFocusedElementRef.current =
        document.activeElement as HTMLElement | null;
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            previouslyFocusedElementRef.current =
              document.activeElement as HTMLElement | null;
            setTimeout(() => {
              inputRef.current?.focus();
            }, 150);
            return true;
          }
          return false;
        });
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeDrawer();
      }
    };

    window.addEventListener("open-ask-falach", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-ask-falach", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-scroll to bottom whenever messages or typing state change
  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Focus trap inside drawer
  useEffect(() => {
    if (!isOpen) return;

    const panel = drawerPanelRef.current;
    if (!panel) return;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements =
        panel.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabKey);
    return () => {
      window.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMessage: LLMMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsTyping(true);

    // Keep focus in input
    inputRef.current?.focus();

    setTimeout(() => {
      const response = getFalachResponse(query);

      const botMessage: LLMMessage = {
        id: (Date.now() + 1).toString(),
        sender: "falach",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        links: response.links,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }, 450);
  };

  const handleReset = () => {
    setMessages([]);
    setInputQuery("");
    setIsTyping(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over panel conforming to W3C ARIA */}
      <div
        ref={drawerPanelRef}
        className={`drawer-panel ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-heading"
        aria-describedby="drawer-subheading"
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <HugeiconsIcon
              icon={SparklesIcon}
              size={15}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <h2 id="drawer-heading" className="drawer-title">
              FalachLLM
            </h2>
            <span className="drawer-badge">AI Assistant</span>
          </div>
          <p id="drawer-subheading" className="sr-only">
            AI counterpart grounded in Falach&apos;s product design work,
            metrics, and experience.
          </p>
          <div className="flex items-center gap-1.5">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="drawer-reset-icon-btn"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 7v6h-6" />
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
                </svg>
              </button>
            )}
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeDrawer}
              aria-label="Close assistant drawer"
              title="Close (Esc)"
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Body - Clean & Spacious */}
        <div className="drawer-body">
          <div className="drawer-messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`drawer-msg ${
                  msg.sender === "user" ? "user" : "assistant"
                }`}
              >
                <div className="drawer-bubble">{msg.text}</div>
                {msg.links && msg.links.length > 0 && (
                  <div className="drawer-msg-links">
                    {msg.links.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        className="drawer-link-pill"
                        onClick={closeDrawer}
                        target={
                          link.url.startsWith("http") ||
                          link.url.startsWith("mailto")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          link.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {link.label} ↗
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="drawer-msg assistant">
                <div
                  className="drawer-bubble font-mono"
                  style={{ fontSize: "11px", color: "var(--subtle)" }}
                >
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Footer with Suggested Prompts (when empty) + Input + Micro-Disclaimer */}
        <div className="drawer-footer">
          {/* Suggested Prompts stacked cards docked right above input field (hidden once chat starts) */}
          {messages.length === 0 && (
            <div className="drawer-prompts-bar" aria-label="Suggested prompts">
              {PRESET_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="drawer-prompt-card"
                  onClick={() => handleSend(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Form input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="drawer-input-form"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask anything about Falach's work..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="drawer-input"
              aria-label="Ask FalachLLM a question"
            />
            <button
              type="submit"
              className="drawer-send-btn"
              disabled={!inputQuery.trim() || isTyping}
              aria-label="Send message"
            >
              <HugeiconsIcon
                icon={SentIcon}
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </form>

          {/* Micro-disclaimer directly below the chat input */}
          <p className="drawer-disclaimer whitespace-nowrap">
            FalachLLM can make mistakes · Reach out:{" "}
            <a
              href="mailto:falachns10@gmail.com"
              className="underline hover:text-[var(--ink)] transition-colors"
            >
              falachns10@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
