"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  SentIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";

interface Message {
  id: string;
  sender: "user" | "falach";
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

const PRESET_PROMPTS = [
  "What is your role at PT KAI (Persero)?",
  "How did you design the Qiscus CSAT Builder?",
  "How was the ~10% conversion lift achieved?",
  "What is your core design philosophy & approach?",
];

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; links?: { label: string; url: string }[] }[] = [
  {
    keywords: ["kai", "railway", "kereta", "current", "role", "perkeretaapian"],
    answer:
      "Currently at PT KAI (Persero), I design digital platforms for the national railway ecosystem serving over 40 million users across Indonesia.\n\nMy focus centers on high-reliability flows, integrated passenger service touchpoints, and scalable UX architecture built to handle high concurrency with zero ambiguity.",
    links: [{ label: "PT KAI Ecosystem", url: "https://sustainability.kai.id/" }],
  },
  {
    keywords: ["csat", "qiscus", "survey", "helpdesk", "enterprise", "agent"],
    answer:
      "At Qiscus Helpdesk, I led the end-to-end UX/UI for the CSAT Survey Experience:\n\n• Designed a 4-step survey builder for admins with live preview, eliminating setup guesswork.\n• Created a friction-free 1-tap rating flow for end customers across mobile web and in-app webviews.\n• Adopted by 20+ enterprise clients across retail, healthcare, and transportation to drive faster ticket resolution.\n• Zero critical bugs at launch.",
    links: [{ label: "View Qiscus CSAT Case Study", url: "/work/qiscus-csat" }],
  },
  {
    keywords: ["microsite", "conversion", "commerce", "10%", "lift", "order", "variant", "modifier"],
    answer:
      "For the customer microsite redesign, I tackled checkout and configuration drop-off friction:\n\n• Contributed to an approximately 10% lift in completed customer order sessions.\n• Architected a structured modifier pattern separating mandatory choices from optional add-ons.\n• Designed a bottom-sheet product configuration modal with sticky real-time price tallying and 44px+ touch targets.",
    links: [{ label: "View Customer Microsite Case Study", url: "/work/customer-microsite" }],
  },
  {
    keywords: ["philosophy", "principle", "approach", "mindset", "process", "craft"],
    answer:
      "My design approach centers on clarity over decoration:\n\n• Clarity over decoration: Every element and pixel earns its keep through utility.\n• Semantic design tokens: Building consistent, accessible systems instead of ad-hoc styles.\n• Minimizing interaction cost: Reducing cognitive friction and keeping decision points clear.\n• Engineering bridge: Speaking frontend code fluently to ensure 100% design fidelity and resilient UX.",
    links: [{ label: "Explore Work", url: "/" }],
  },
  {
    keywords: ["handoff", "developer", "engineering", "qa", "collaboration", "code"],
    answer:
      "I treat design as an active dialogue with engineering:\n\n• Early wireframing and edge-case discovery before PRDs are locked.\n• Documented component tokens for all interactive states (loading, empty, disabled, error, hover).\n• Active Design QA in staging environments to verify layout fidelity and catch regressions before production release.",
  },
  {
    keywords: ["contact", "email", "hire", "freelance", "reach", "connect", "linkedin"],
    answer:
      "I'm always open to discussing product design opportunities and technical challenges. Reach out via email at falachns10@gmail.com or connect on LinkedIn.",
    links: [
      { label: "Send Email", url: "mailto:falachns10@gmail.com" },
      { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/falachnoorsyahid/" },
    ],
  },
];

export default function AskFalachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "falach",
      text: "Hey! Ask me anything about my product design work, design systems, or engineering collaboration.",
      timestamp: "Just now",
      links: [
        { label: "Qiscus CSAT Case Study", url: "/work/qiscus-csat" },
        { label: "Customer Microsite Case Study", url: "/work/customer-microsite" },
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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
        : `I focus on enterprise SaaS workflows, design systems, and conversion-oriented product redesigns. Feel free to ask about my work at PT KAI, Qiscus Helpdesk, or email me directly at falachns10@gmail.com.`;

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

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "falach",
        text: "Conversation cleared. Feel free to ask another question or tap one of the suggested prompts below.",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#main-content">
        Skip to chat
      </a>

      <Header />

      <main id="main-content">
        <article className="subpage-container wrap" id="chat-content">
        <header className="subpage-header">
          <div className="section-label-quiet">AI / KNOWLEDGE BASE</div>
          <h1 className="subpage-title">Ask FalachLLM</h1>
          <p className="subpage-lead">
            Explore case study decisions, design system methodologies, and technical practices through a quiet conversational interface. Also accessible anywhere via <kbd className="font-mono text-xs px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--card)]">⌘K</kbd>.
          </p>
        </header>

        {/* Suggestion Chips */}
        <div className="mb-6">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--faint)] mb-2">
            Suggested Prompts
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="text-xs text-[var(--muted)] hover:text-[var(--ink)] bg-[var(--card)] hover:bg-[var(--line)] border border-[var(--line)] px-2.5 py-1.5 rounded transition-colors text-left"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Stream */}
        <section
          className="border border-[var(--line)] rounded-lg bg-[var(--card)] p-4 sm:p-5 flex flex-col gap-4 mb-8"
          role="log"
          aria-live="polite"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--subtle)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" aria-hidden="true" />
              <span>Grounded in live portfolio context</span>
            </div>
            {messages.length > 2 && (
              <button
                type="button"
                onClick={handleClear}
                className="font-mono text-[11px] text-[var(--subtle)] hover:text-[var(--ink)] flex items-center gap-1"
                aria-label="Clear chat history"
              >
                <HugeiconsIcon icon={Delete02Icon} size={12} strokeWidth={1.8} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 min-h-[240px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <span className="font-mono text-[10px] uppercase text-[var(--faint)] tracking-wider">
                  {msg.sender === "user" ? "You" : "FalachLLM"} · {msg.timestamp}
                </span>
                <div
                  className={`text-[13.5px] leading-relaxed p-3 rounded-md ${
                    msg.sender === "user"
                      ? "bg-[var(--ink)] text-[var(--page)]"
                      : "bg-[var(--page)] border border-[var(--line)] text-[var(--ink)]"
                  }`}
                >
                  {msg.text.split("\n").map((line, idx) => (
                    <p key={idx} className="m-0 mb-1.5 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>

                {msg.links && msg.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.links.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        className="inline-flex items-center gap-1 font-mono text-[11px] px-2 py-1 rounded border border-[var(--line)] bg-[var(--page)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--subtle)] transition-colors"
                        target={link.url.startsWith("http") || link.url.startsWith("mailto") ? "_blank" : undefined}
                        rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                      >
                        <span>{link.label}</span>
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={11} strokeWidth={2} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="mr-auto items-start">
                <span className="font-mono text-[11px] text-[var(--subtle)]">Thinking...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 pt-3 border-t border-[var(--line)]"
          >
            <input
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
              <HugeiconsIcon icon={SentIcon} size={13} strokeWidth={2} aria-hidden="true" />
            </button>
          </form>
        </section>
      </article>
      </main>

      <Footer />
    </div>
  );
}
