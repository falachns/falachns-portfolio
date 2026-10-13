import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowUpRight01Icon, Award01Icon } from "@hugeicons/core-free-icons";
import LiveClock from "@/components/LiveClock";
import EmailCopy from "@/components/EmailCopy";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
  title: "Playground & Recognitions",
  description: "Crafting every single pixel. Personal story, design explorations, and honors by Falach Noor Syahid.",
  alternates: {
    canonical: "/playground",
  },
};

const RECOGNITIONS = [
  {
    title: "Product Design Challenge by Tiket Design",
    category: "Design Competition",
    year: "2024",
    image: "https://framerusercontent.com/images/JpOH5VvYJ91UmDr3gsWecVGxfew.jpg?width=1922&height=1442",
    description: "Crafted end-to-end product proposal for travel experience optimization, recognized by Tiket.com product design team.",
  },
  {
    title: "Top Framer Creator 2024",
    category: "Community & Craft",
    year: "2024",
    image: "https://framerusercontent.com/images/TlQQg0Ey3jTrNFiTxX6AUI3Owbc.png?width=1348&height=768",
    description: "Honored among top creators for building modular interactive components, design system templates, and web experiences.",
  },
  {
    title: "Most Outstanding Student UNS 2024",
    category: "Academic & Leadership",
    year: "2024",
    image: "https://framerusercontent.com/images/IkHMOoXvLN8yaUdZAaPdNvaM.jpg?width=5184&height=3456",
    description: "Awarded Mahasiswa Berprestasi (Mawapres) Universitas Sebelas Maret for achievements in design innovation, research, and incubation.",
  },
  {
    title: "Pitching Nurture to Scale 2023",
    category: "Startup Incubation",
    year: "2023",
    image: "https://framerusercontent.com/images/oEt2GJ6bO3Xc5v2peEzt6IOo.png?width=1036&height=768",
    description: "Pitched startup product prototype at UNS Innovation Hub, securing incubation funding and mentorship.",
  },
];

export default function PlaygroundPage() {
  return (
    <main id="main-content" className="site-wrapper">
      <a className="skip-link" href="#playground-content">
        Skip to content
      </a>

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
          <Link href="/playground" className="nav-link active">
            Playground
          </Link>
          <Link href="/explorations" className="nav-link">
            Explorations
          </Link>
          <Link href="/ask-falach" className="nav-link nav-highlight">
            Ask FalachLLM
          </Link>
        </nav>
      </header>

      {/* Playground Hero */}
      <article className="wrap playground-article" id="playground-content">
        <header className="playground-hero">
          <span className="playground-badge">
            <HugeiconsIcon icon={Award01Icon} size={14} strokeWidth={2} aria-hidden="true" />
            Playground & Honors
          </span>
          <h1 className="playground-headline">
            Crafting every single pixel <span className="emoji">🎨</span>
          </h1>
          <p className="playground-lead font-editorial italic">
            I’m a curious designer who loves building products that are genuinely useful for everyone.
          </p>
        </header>

        {/* Narrative Section */}
        <section className="playground-narrative" aria-label="Design philosophy and background">
          <div className="narrative-grid">
            <div className="narrative-block">
              <h3>Philosophy</h3>
              <p>
                For me, design is a dialogue between users, designers, and developers where strategy and craft work together to create something that feels effortless.
              </p>
              <p>
                Subtle, but with great impact. I thrive on learning through brainstorming and experimenting with ideas that bring real value to others.
              </p>
              <div className="resume-action">
                <a
                  href="https://linkedin.com/in/falachnoorsyahid"
                  target="_blank"
                  rel="noreferrer"
                  className="resume-link"
                >
                  Feel free to check out my updated resume{" "}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="narrative-block">
              <h3>Journey</h3>
              <p>
                Design is a journey of discovery, collaboration, and creating solutions to enrich life through systems and visuals—from story to impact.
              </p>
              <p>
                Whether architecting multi-tenant B2B configurations, building gamified habit loops for children, or crafting accessible web designs, I aim for quiet elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Recognitions Grid */}
        <section className="recognitions-section" aria-label="Honors and recognitions">
          <div className="section-label-bar">
            <span className="section-label">Recognitions & Honors</span>
            <span className="section-sublabel">Selected milestones</span>
          </div>

          <div className="recognitions-grid">
            {RECOGNITIONS.map((item) => (
              <div className="recognition-card" key={item.title}>
                <div className="recognition-media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="recognition-img"
                  />
                  <span className="recognition-year">{item.year}</span>
                </div>
                <div className="recognition-info">
                  <span className="recognition-category">{item.category}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

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
            © {new Date().getFullYear()} Falach Noor Syahid. Crafted with care.
          </p>
          <div className="footer-badge">
            <span className="dot" aria-hidden="true" />
            <span>falachns.web.id/playground</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
