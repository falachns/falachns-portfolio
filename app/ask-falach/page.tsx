"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  SparklesIcon,
  SentIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import LiveClock from "@/components/LiveClock";
import EmailCopy from "@/components/EmailCopy";
import BackToTop from "@/components/BackToTop";

interface Message {
  id: string;
  sender: "user" | "falach";
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
}

const PRESET_PROMPTS = [
  "What was your role and impact in the Qiscus CSAT project?",
  "How did you achieve the ~10% conversion lift on the customer microsite?",
  "What is your product design philosophy?",
  "How do you approach developer handoff and Design QA?",
  "What tools and tech stack do you use?",
];

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; links?: { label: string; url: string }[] }[] = [
  {
    keywords: ["csat", "qiscus", "survey", "helpdesk", "enterprise", "agent"],
    answer:
      "At Qiscus, I served as the end-to-end Product Designer for the CSAT Survey Experience feature on Qiscus Helpdesk (omnichannel ticketing).\n\nKey accomplishments:\n• Adopted by 20+ enterprise clients across retail, healthcare, and transportation.\n• Designed a 4-step wizard combining granular customization (branding, questions, trigger automations) with zero setup guesswork via live real-time preview.\n• Zero critical bugs reported in the first month post-launch.\n• Differentiated in 5+ international enterprise acquisition pitches.",
    links: [{ label: "View Qiscus CSAT Case Study", url: "/work/qiscus-csat" }],
  },
  {
    keywords: ["microsite", "conversion", "commerce", "10%", "lift", "order", "variant", "modifier"],
    answer:
      "For the customer microsite redesign project, I tackled drop-off friction during the product configuration and checkout phase.\n\nKey highlights:\n• Achieved an approximately 10% lift in customer order sessions.\n• Architected a structured modifier design pattern that separated required choices from optional add-ons, eliminating duplicate product listings for merchants.\n• 45% faster variant selection time with sticky price calculation in the bottom sheet modal.",
    links: [{ label: "View Customer Microsite Case Study", url: "/work/customer-microsite" }],
  },
  {
    keywords: ["philosophy", "principle", "approach", "mindset", "craft"],
    answer:
      "My design philosophy is grounded in 5 core principles:\n\n1. Every element earns its place — No decorative noise or arbitrary UI.\n2. Let product work carry the visual weight — Clean, high-contrast framing.\n3. Keep navigation obvious and minimal — Respect user cognitive energy.\n4. Quiet, practical copy — Straightforward, human, and clear.\n5. Favor clarity over novelty — Solve real user friction first.",
    links: [{ label: "Explore Selected Works", url: "/" }],
  },
  {
    keywords: ["handoff", "developer", "engineering", "qa", "collaboration", "pm"],
    answer:
      "I treat design as an active dialogue with engineering and product management:\n\n• Early exploration: Starting UX wireframes and edge-case discovery before PRDs are locked.\n• Systematized Figma handoffs: Documenting loading, empty, hover, and error states with tokenized naming.\n• Active Design QA: Testing pre-release builds in staging environments to catch layout and interaction regressions before production release.",
  },
  {
    keywords: ["tool", "stack", "figma", "code", "next", "react", "framwork", "tech"],
    answer:
      "My toolkit spans design and frontend development:\n\n• Product Design: Figma (Design systems, auto-layout, token management, component variables), Prototyping, Usability Testing.\n• Frontend & Code: Next.js, React, TypeScript, Semantic HTML5, CSS Variables, Framer.\n• Research & Strategy: Usability heuristics, competitive benchmarking, user journey mapping.",
  },
  {
    keywords: ["contact", "email", "hire", "freelance", "job", "linkedin"],
    answer:
      "You can get in touch with Falach directly via email at falachns10@gmail.com, or connect on LinkedIn (linkedin.com/in/falachnoorsyahid). Open to impactful product design opportunities and design system consultations!",
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
      text: "Good day! I'm FalachLLM, an interactive AI assistant trained on Falach's design portfolio, case studies, and engineering practices. How can I help you today?",
      timestamp: "Just now",
      links: [
        { label: "Qiscus CSAT Case Study", url: "/work/qiscus-csat" },
        { label: "Commerce Microsite Case Study", url: "/work/customer-microsite" },
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

    // AI response matching based on knowledge base
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const match = KNOWLEDGE_BASE.find((entry) =>
        entry.keywords.some((kw) => lowerQuery.includes(kw))
      );

      const replyText = match
        ? match.answer
        : `Thank you for asking about "${query}". As a Product Designer at Qiscus, Falach specializes in enterprise UX, B2B SaaS workflows, design systems, and conversion-oriented product redesigns. Feel free to explore the detailed case studies or send an email to falachns10@gmail.com!`;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "falach",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: match?.links,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 650);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "falach",
        text: "Conversation cleared. Feel free to ask another question or tap one of the suggested topics below.",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <main id="main-content" className="ask-falach-page">
      <a className="skip-link" href="#chat-container">Skip to chat interface</a>

      {/* Header */}
      <header className="site-header wrap" id="top">
        <Link className="wordmark" href="/">
          falachns
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/" className="nav-back">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link href="/playground" className="nav-link">
            Playground
          </Link>
          <Link href="/explorations" className="nav-link">
            Explorations
          </Link>
          <Link href="/ask-falach" className="nav-link active nav-highlight">
            Ask FalachLLM
          </Link>
        </nav>
      </header>

      {/* Chat Area */}
      <div className="wrap ask-content-wrap" id="chat-container">
        <div className="ask-intro">
          <div className="assistant-badge">
            <HugeiconsIcon icon={SparklesIcon} size={14} strokeWidth={2} aria-hidden="true" />
            <span>FalachLLM Knowledge Base</span>
          </div>
          <h1>Ask anything about Falach&apos;s design practice.</h1>
          <p>
            Explore case study metrics, UX decisions, design systems, and collaboration methodologies through an interactive conversational assistant.
          </p>
        </div>

        {/* Suggestion Chips */}
        <div className="chips-container" aria-label="Suggested questions">
          <span className="chips-label">Popular Prompts:</span>
          <div className="chips-scroll">
            {PRESET_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="prompt-chip"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Stream */}
        <div className="chat-stream-box" role="log" aria-live="polite">
          <div className="chat-stream-header">
            <span className="stream-status-dot" aria-hidden="true"></span>
            <span>Online · Knowledge Base synced with live portfolio</span>
            {messages.length > 2 && (
              <button
                type="button"
                onClick={handleClear}
                className="chat-clear-btn"
                aria-label="Clear chat history"
              >
                <HugeiconsIcon icon={Delete02Icon} size={13} strokeWidth={1.8} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="messages-list">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-bubble-wrapper ${
                  msg.sender === "user" ? "user-side" : "falach-side"
                }`}
              >
                <div className="message-bubble">
                  <div className="message-sender-tag">
                    {msg.sender === "user" ? "You" : "FalachLLM"}
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                  <div className="message-text">
                    {msg.text.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>

                  {msg.links && msg.links.length > 0 && (
                    <div className="message-links-group">
                      {msg.links.map((link) => (
                        <Link
                          key={link.url}
                          href={link.url}
                          className="message-action-link"
                          target={link.url.startsWith("http") || link.url.startsWith("mailto") ? "_blank" : undefined}
                          rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                        >
                          <span>{link.label}</span>
                          <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} strokeWidth={2} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-bubble-wrapper falach-side">
                <div className="message-bubble typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Box */}
          <form
            className="chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask about design projects, metrics, or methodology..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              aria-label="Ask a question about Falach"
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputQuery.trim() || isTyping}
              aria-label="Send message"
            >
              <span>Send</span>
              <HugeiconsIcon icon={SentIcon} size={15} strokeWidth={2} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer wrap" id="contact" aria-label="Site footer">
        <div className="footer-status-row">
          <LiveClock />
          <BackToTop />
        </div>

        <div className="footer-thanks">
          <p className="thanks-text">Thanks for checking it out!</p>
        </div>

        <div className="contact-row">
          <EmailCopy email="falachns10@gmail.com" />

          <div className="socials">
            <a
              href="https://www.linkedin.com/in/falachnoorsyahid/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <span>Linkedin</span>
              <span className="social-sub">Connect</span>
            </a>
            <a
              href="https://github.com/falachns"
              target="_blank"
              rel="noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <span>GitHub</span>
              <span className="social-sub">Shots ➜</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Falach Noor Syahid. Interactive AI Assistant.
          </p>
          <div className="footer-badge">
            <span className="dot" aria-hidden="true" />
            <span>falachns.web.id/ask-falach</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
