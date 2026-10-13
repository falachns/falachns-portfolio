import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { getAllProjects } from "@/data/projects";
import GreetingHero from "@/components/GreetingHero";
import LiveClock from "@/components/LiveClock";
import EmailCopy from "@/components/EmailCopy";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  const projects = getAllProjects();

  return (
    <main id="main-content" className="site-wrapper">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Navigation Header */}
      <header className="site-header wrap" id="top">
        <Link className="wordmark" href="/" aria-label="Falachns home">
          falachns
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/playground" className="nav-link">
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

      {/* Hero Section */}
      <section className="hero wrap" aria-labelledby="intro-title">
        <GreetingHero />
        <div className="hero-foot">
          <p className="hero-focus-tag">
            Crafting for every single pixel.
          </p>
          <LiveClock />
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="work wrap" id="work" aria-label="Selected case studies">
        <div className="section-label-bar">
          <span className="section-label">Selected Work</span>
          <span className="section-sublabel">2023 — Present</span>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article
              className={`project project-${project.tone}`}
              key={project.slug}
            >
              <Link
                href={`/work/${project.slug}`}
                className="project-link"
                aria-label={`View ${project.title} case study`}
              >
                <div className="project-media">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 900px"
                    className="project-image"
                  />
                  <span className="project-view">
                    View case study{" "}
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={13}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <div className="project-info">
                  <div className="project-index">
                    <span className="project-eyebrow">{project.eyebrow}</span>
                  </div>
                  <h2 className="project-title">{project.title}</h2>

                  {project.bullets && project.bullets.length > 0 ? (
                    <ul className="project-bullets" aria-label="Key accomplishments">
                      {project.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="project-summary">{project.summary}</p>
                  )}

                  <ul className="project-tags" aria-label="Project domains">
                    {project.tags.map((tag) => (
                      <li key={tag} className="tag-pill">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Explorations & Playground quick links */}
      <section className="notes wrap" aria-label="Explorations and experiments">
        <div className="notes-card">
          <div className="notes-content">
            <span className="notes-tag">Labs & Playground</span>
            <h3>Curious explorations & side-quests</h3>
            <p>
              Interactive experiments, Pomodoro timer utilities, design challenge archives, and visual play.
            </p>
          </div>
          <div className="note-links">
            <Link href="/explorations" className="note-pill">
              Explorations{" "}
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>
            <Link href="/playground" className="note-pill">
              Playground{" "}
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

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
            <span>falachns.web.id</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
