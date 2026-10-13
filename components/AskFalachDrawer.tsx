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
  "Tell me about your work on PT KAI's ESG platform.",
  "How did you design the CSAT survey at Qiscus?",
  "What is your approach to AI-assisted design engineering?",
];

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; links?: { label: string; url: string }[] }[] = [
  {
    keywords: ["kai", "esg", "sustainability", "railway", "kereta", "compliance", "station", "operator"],
    answer:
      "At PT Kereta Api Indonesia (Persero), I work as a Product Designer in Bandung:\n\n• Designed modules for KAI's ESG Sustainability platform for structured, role-based compliance reporting across the national railway network.\n• Enhanced internal operational tools for station operators to cut repetitive task completion time and reduce operational friction.\n• Structured data-dense workflows and tabular views with strong visual hierarchy and resilient UX architecture.",
    links: [{ label: "KAI Sustainability Platform", url: "https://sustainability.kai.id/" }],
  },
  {
    keywords: ["csat", "qiscus", "survey", "helpdesk", "agent", "feedback"],
    answer:
      "At Qiscus (customer engagement platform serving 200M+ end users across 25 countries), I designed the Helpdesk CSAT survey builder:\n\n• Designed a 4-step wizard combining custom branding, dynamic question logic, and trigger automation.\n• Built an instant side-by-side live brand preview so admins configure without guesswork.\n• Crafted a 1-tap rating experience for end users across mobile web and in-chat webviews.\n• Adopted by 20+ enterprise clients across retail, healthcare, and logistics, launching with 0 critical bugs.",
    links: [{ label: "Read CSAT Case Study", url: "/work/qiscus-csat" }],
  },
  {
    keywords: ["ai", "claude", "cursor", "codex", "skill", "engineering", "prototype", "prototyping", "frontend"],
    answer:
      "My approach to AI-assisted design engineering centers on speed, fidelity, and systematic consistency:\n\n• Encapsulated the Qiscus design system into a Claude skill, empowering non-designers and developers to generate on-brand interfaces autonomously.\n• Rebuilt the Qiscus Helpdesk frontend in HTML using AI-assisted coding tools (Cursor & Codex) to accelerate interactive prototyping from weeks into days.\n• I treat production code (HTML, CSS, React, Next.js) as a direct design medium to eliminate handoff ambiguity and verify interaction ergonomics directly in the browser.",
  },
  {
    keywords: ["shop", "microsite", "conversion", "commerce", "10%", "lift", "order", "variant", "modifier"],
    answer:
      "I redesigned the Qiscus Shop customer microsite and checkout flow:\n\n• Audited variant selection drop-offs and architected a structured modifier design pattern separating mandatory choices from optional add-ons.\n• Designed a thumb-friendly bottom-sheet product configuration modal with sticky real-time price calculations.\n• Contributed to an approximately 10% lift in completed customer order sessions.",
    links: [{ label: "Read Customer Microsite Case Study", url: "/work/customer-microsite" }],
  },
  {
    keywords: ["bot", "intent", "builder", "dashboard", "career"],
    answer:
      "At Qiscus, I also led UX/UI for two strategic company products:\n\n• Bot Management Dashboard & Intent Visual Builder: Empowered support managers to construct conversational bot flows and intents visually.\n• Qiscus's First Career Page: Designed and shipped the complete careers experience from initial wireframes to launch, reinforcing employer branding and talent acquisition.",
  },
  {
    keywords: ["philosophy", "principle", "approach", "mindset", "process", "craft"],
    answer:
      "My product design philosophy is rooted in practical restraint:\n\n• Clarity over decoration: Every component and pixel earns its place by reducing cognitive load.\n• Design systems & tokens: Semantic tokens ensure scalable accessibility across light and dark modes.\n• Interaction ergonomics: Touch-first action bars, clear boundaries, and zero extraneous steps.\n• Designer-engineer bridge: Writing clean frontend code ensures design intent survives 1:1 into production.",
    links: [{ label: "Explore Work", url: "/" }],
  },
  {
    keywords: ["contact", "email", "hire", "freelance", "reach", "connect", "linkedin"],
    answer:
      "I'm always open to discussing product design challenges, enterprise systems, and frontend engineering. Reach out directly via email at falachns10@gmail.com or on LinkedIn.",
    links: [
      { label: "Send Email", url: "mailto:falachns10@gmail.com" },
      { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/falachnoorsyahid/" },
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
      text: "Hey! I'm Falach. Ask me about my work on PT KAI's ESG platform, Qiscus Helpdesk, or my AI-assisted design engineering workflows.",
      timestamp: "Just now",
      links: [
        { label: "KAI ESG Platform", url: "https://sustainability.kai.id/" },
        { label: "Qiscus CSAT", url: "/work/qiscus-csat" },
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerPanelRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const closeDrawer = () => {
    setIsOpen(false);
    if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === "function") {
      previouslyFocusedElementRef.current.focus();
    }
  };

  // Global event listener, focus trap, and keyboard shortcuts (⌘K / Esc / Tab)
  useEffect(() => {
    const handleOpen = () => {
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          closeDrawer();
        } else {
          handleOpen();
        }
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeDrawer();
      } else if (e.key === "Tab" && isOpen && drawerPanelRef.current) {
        const focusable = drawerPanelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("open-ask-falach", handleOpen);
    window.addEventListener("close-ask-falach", closeDrawer);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-ask-falach", handleOpen);
      window.removeEventListener("close-ask-falach", closeDrawer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Lock scroll when open & focus input (robust across desktop & iOS Safari)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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
        : `I focus on enterprise SaaS workflows, ESG platforms, and AI-assisted design engineering. Feel free to ask about my work at PT KAI, Qiscus, or reach me at falachns10@gmail.com.`;

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

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-reset-" + Date.now(),
        sender: "falach",
        text: "Conversation reset. Ask me anything about my product design work, metrics, or choose a prompt below.",
        timestamp: "Just now",
        links: [
          { label: "KAI ESG Platform", url: "https://sustainability.kai.id/" },
          { label: "Qiscus CSAT", url: "/work/qiscus-csat" },
        ],
      },
    ]);
    setInputQuery("");
    setIsTyping(false);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`drawer-backdrop ${isOpen ? "open" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over panel conforming to W3C ARIA (div instead of aside) */}
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
            <HugeiconsIcon icon={SparklesIcon} size={15} strokeWidth={1.8} aria-hidden="true" />
            <h2 id="drawer-heading" className="drawer-title">FalachLLM</h2>
            <span className="drawer-badge">AI Assistant</span>
          </div>
          <p id="drawer-subheading" className="sr-only">
            AI assistant grounded in Falach&apos;s product design work and resume.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {messages.length > 1 && (
              <button
                type="button"
                onClick={handleReset}
                className="drawer-reset-btn"
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeDrawer}
              aria-label="Close assistant drawer"
              title="Close (Esc)"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={15} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="drawer-body">
          <div className="drawer-welcome">
            <p>
              Grounded in Falach&apos;s product design case studies, official 2026 resume, and technical practices.
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

          {/* Accessible Chat Stream Container */}
          <div className="drawer-messages" role="log" aria-live="polite">
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
                        onClick={closeDrawer}
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
      </div>
    </>
  );
}
