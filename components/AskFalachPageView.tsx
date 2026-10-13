"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  SentIcon,
  RotateLeft01Icon,
} from "@hugeicons/core-free-icons";
import {
  LLMMessage,
  PRESET_PROMPTS,
  getFalachResponse,
} from "@/data/falachLLM";

export default function AskFalachPageView() {
  const [messages, setMessages] = useState<LLMMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

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
    <div className="site-wrapper">
      <a className="skip-link" href="#chat-content">
        Skip to chat
      </a>

      <Header />

      <main id="main-content">
        <article className="subpage-container wrap" id="chat-content">
          <header className="subpage-header">
            <div className="section-label-quiet">AI / KNOWLEDGE BASE</div>
            <div className="flex items-center justify-between">
              <h1 className="subpage-title">Ask FalachLLM</h1>
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="drawer-reset-icon-btn"
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <HugeiconsIcon
                    icon={RotateLeft01Icon}
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            <p className="subpage-lead">
              Conversational showcase companion exploring case study decisions,
              design systems, and technical workflows. Also accessible
              anywhere via{" "}
              <kbd className="font-mono text-xs px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--card)]">
                ⌘K
              </kbd>
              .
            </p>
          </header>

          {/* Conversation Surface Container */}
          <section
            className="border border-[var(--line)] rounded-xl bg-[var(--card)] p-4 sm:p-5 flex flex-col justify-between min-h-[380px] mb-8"
            role="log"
            aria-live="polite"
          >
            {/* Stream */}
            <div className="flex flex-col gap-4 flex-1">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 py-12 text-center text-sm text-[var(--faint)] font-mono">
                  <span>Type a question below or pick a suggested prompt to begin.</span>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 max-w-[85%] ${
                      msg.sender === "user"
                        ? "ml-auto items-end"
                        : "mr-auto items-start"
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase text-[var(--faint)] tracking-wider">
                      {msg.sender === "user" ? "You" : "FalachLLM"} ·{" "}
                      {msg.timestamp}
                    </span>
                    <div
                      className={`text-[13.5px] leading-relaxed p-3.5 rounded-lg whitespace-pre-wrap ${
                        msg.sender === "user"
                          ? "bg-[var(--ink)] text-[var(--page)]"
                          : "bg-[var(--page)] border border-[var(--line)] text-[var(--ink)]"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.links && msg.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.links.map((link) => (
                          <Link
                            key={link.url}
                            href={link.url}
                            className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-1 rounded border border-[var(--line)] bg-[var(--page)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--subtle)] transition-colors"
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
                            <span>{link.label}</span>
                            <HugeiconsIcon
                              icon={ArrowUpRight01Icon}
                              size={11}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}

              {isTyping && (
                <div className="mr-auto items-start">
                  <span className="font-mono text-[11px] text-[var(--subtle)]">
                    Thinking...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Area Docked with Suggested Prompts & Disclaimer */}
            <div className="pt-4 border-t border-[var(--line)] mt-4">
              {messages.length === 0 && (
                <div
                  className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3"
                  aria-label="Suggested prompts"
                >
                  {PRESET_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="text-xs text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--page)] hover:bg-[var(--line)] border border-[var(--line)] px-2.5 py-1 rounded-full transition-colors whitespace-nowrap flex-shrink-0"
                      onClick={() => handleSend(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about design projects, metrics, or philosophy..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 text-sm bg-transparent border-0 outline-none text-[var(--ink)] placeholder:text-[var(--faint)]"
                  aria-label="Ask a question about Falach"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="drawer-send-btn"
                  aria-label="Send message"
                >
                  <HugeiconsIcon
                    icon={SentIcon}
                    size={13}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
              </form>

              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 text-center mt-2.5 tracking-normal m-0">
                FalachLLM is an AI counterpart and can make mistakes. For
                official inquiries:{" "}
                <a
                  href="mailto:falachns10@gmail.com"
                  className="underline hover:text-[var(--ink)] transition-colors"
                >
                  falachns10@gmail.com
                </a>
              </p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
