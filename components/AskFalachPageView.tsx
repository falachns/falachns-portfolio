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
    links: [{ label: "View Qiscus CSAT Case Study", url: "/work/qiscus-csat" }],
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
    links: [{ label: "View Customer Microsite Case Study", url: "/work/customer-microsite" }],
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

export default function AskFalachPageView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "falach",
      text: "Hey! I'm Falach. Ask me about my work on PT KAI's ESG platform, Qiscus Helpdesk, or my AI-assisted design engineering workflows.",
      timestamp: "Just now",
      links: [
        { label: "KAI ESG Platform", url: "https://sustainability.kai.id/" },
        { label: "Qiscus CSAT Case Study", url: "/work/qiscus-csat" },
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
