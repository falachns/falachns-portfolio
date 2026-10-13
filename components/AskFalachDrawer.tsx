"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, SentIcon, SparklesIcon } from "@hugeicons/core-free-icons";

interface Message {
  id: string;
  sender: "user" | "falach";
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

const PRESET_PROMPTS = [
  "What was your role in the Qiscus CSAT project?",
  "How was the ~10% conversion lift achieved?",
  "What is your product design philosophy?",
  "How do you handle developer handoff & Design QA?",
];

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; links?: { label: string; url: string }[] }[] = [
  {
    keywords: ["csat", "qiscus", "survey", "helpdesk", "enterprise", "agent"],
    answer:
      "At Qiscus, I led the end-to-end UX/UI for the CSAT Survey Experience across Qiscus Helpdesk:\n\n• Adopted by 20+ enterprise clients across retail, healthcare, and transportation.\n• Designed a 4-step linear wizard combining custom branding, question logic, and automation triggers.\n• Side-by-side real-time preview to eliminate setup guesswork for admins.\n• Zero critical bugs reported in the first month post-launch.",
    links: [{ label: "Read CSAT Case Study", url: "/work/qiscus-csat" }],
  },
  {
    keywords: ["microsite", "conversion", "commerce", "10%", "lift", "order", "variant", "modifier"],
    answer:
      "For the customer microsite redesign project, I eliminated order drop-off friction during variant selection:\n\n• Achieved an approximately 10% lift in completed order sessions.\n• Architected a structured modifier design pattern separating mandatory choices from optional add-ons.\n• Bottom-sheet product configuration with sticky real-time price calculation.",
    links: [{ label: "Read Customer Microsite Case Study", url: "/work/customer-microsite" }],
  },
  {
    keywords: ["philosophy", "principle", "approach", "mindset", "craft"],
    answer:
      "Design philosophy centered on quiet restraint:\n\n1. Purposeful craft — Every pixel and component earns its place.\n2. Visual honesty — Let real product work carry weight rather than decorative noise.\n3. Frictionless ergonomics — Clear navigation and thumb-friendly decision areas.\n4. Human dialogue — Design is an active collaboration between users, designers, and engineers.",
    links: [{ label: "Explore Works", url: "/" }],
  },
  {
    keywords: ["handoff", "developer", "engineering", "qa", "collaboration", "pm"],
    answer:
      "Collaboration is built on clarity:\n\n• Early exploration: Wireframing edge cases before PRDs are locked.\n• Systematic tokens: Documenting loading, empty, error, and hover states.\n• Active Design QA: Testing pre-release builds in staging to catch regressions before production release.",
  },
  {
    keywords: ["habitz", "children", "habit", "gamification"],
    answer:
      "Habitz is a gamified habit-building mobile application incubated at UNS Innovation Hub:\n\n• Surveyed 140+ parents to identify daily routine friction.\n• Acquired 550+ app users on Google Play with 10 five-star reviews.",
    links: [{ label: "Read Habitz Case Study", url: "/work/habitz" }],
  },
  {
    keywords: ["artverse", "art", "forgery", "commerce"],
    answer:
      "Artverse addresses art forgery and buyer distrust in Indonesia:\n\n• Surveyed 35+ local artists and collectors (80% awareness of forgery risks).\n• Designed transparent provenance displays and verified certificates.",
    links: [{ label: "Read Artverse Case Study", url: "/work/artverse" }],
  },
  {
    keywords: ["contact", "email", "hire", "freelance", "job", "linkedin"],
    answer:
      "You can get in touch with Falach directly via email at falachns10@gmail.com or on LinkedIn (linkedin.com/in/falachnoorsyahid).",
    links: [
      { label: "Send Email", url: "mailto:falachns10@gmail.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/falachnoorsyahid/" },
    ],
  },
];

export function openAskDrawer() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-ask-falach"));
  }
}

export default function AskFalachDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "falach",
      text: "Hi! I'm FalachLLM. Ask me anything about Falach's design work, case studies, or engineering collaboration.",
      timestamp: "Just now",
      links: [
        { label: "Qiscus CSAT", url: "/work/qiscus-csat" },
        { label: "Commerce Microsite", url: "/work/customer-microsite" },
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global event listener and ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("open-ask-falach", handleOpen);
    window.addEventListener("close-ask-falach", handleClose);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-ask-falach", handleOpen);
      window.removeEventListener("close-ask-falach", handleClose);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Lock scroll when open & focus input
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto scroll messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const match = KNOWLEDGE_BASE.find((entry) =>
        entry.keywords.some((kw) => lowerQuery.includes(kw))
      );

      const replyText = match
        ? match.answer
        : `Thank you for asking about "${query}". Falach focuses on enterprise SaaS workflows, design systems, and conversion-oriented product redesigns. Feel free to explore the case studies or email falachns10@gmail.com!`;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "falach",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: match?.links,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      {/* Slide-over panel */}
      <aside
        className={`drawer-panel ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Ask FalachLLM Assistant"
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <HugeiconsIcon icon={SparklesIcon} size={15} strokeWidth={1.8} aria-hidden="true" />
            <h3 className="drawer-title">FalachLLM</h3>
            <span className="drawer-badge">AI Assistant</span>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close assistant drawer"
            title="Close (Esc)"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          <div className="drawer-welcome">
            <p>
              Grounded in Falach&apos;s product design case studies, design system methodologies, and technical practices.
            </p>
            <span className="drawer-prompts-label">Suggested Prompts</span>
            <div className="drawer-prompts-list">
              {PRESET_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="drawer-prompt-chip"
                  onClick={() => handleSend(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="drawer-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`drawer-msg ${msg.sender === "user" ? "user" : "assistant"}`}>
                <div className="drawer-bubble">{msg.text}</div>
                {msg.links && msg.links.length > 0 && (
                  <div className="drawer-msg-links">
                    {msg.links.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        className="drawer-link-pill"
                        onClick={() => setIsOpen(false)}
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
                <div className="drawer-bubble font-mono" style={{ fontSize: "11px", color: "var(--subtle)" }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Footer Input */}
        <div className="drawer-footer">
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
            />
            <button
              type="submit"
              className="drawer-send-btn"
              disabled={!inputQuery.trim() || isTyping}
              aria-label="Send message"
            >
              <HugeiconsIcon icon={SentIcon} size={14} strokeWidth={2} aria-hidden="true" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
