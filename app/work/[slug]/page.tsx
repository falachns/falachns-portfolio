import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowUpRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import LiveClock from "@/components/LiveClock";
import EmailCopy from "@/components/EmailCopy";
import BackToTop from "@/components/BackToTop";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Falachns`,
      description: project.summary,
      url: `https://falachns.web.id/work/${project.slug}`,
      images: [
        {
          url: project.image,
          width: project.imageWidth,
          height: project.imageHeight,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Falachns`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <main id="main-content" className="case-study-page">
      <a className="skip-link" href="#case-study-content">Skip to case study content</a>

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
          <Link href="/ask-falach" className="nav-link nav-highlight">
            Ask FalachLLM
          </Link>
        </nav>
      </header>

      {/* Case Study Hero */}
      <article className="wrap case-study-article" id="case-study-content">
        <header className="case-header">
          <div className="case-breadcrumb">
            <Link href="/" className="breadcrumb-link">Projects</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{project.eyebrow}</span>
          </div>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-lead">{project.fullDescription}</p>

          {/* Key Impact Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="metrics-grid" aria-label="Project impact metrics">
              {project.metrics.map((metric) => (
                <div className="metric-card" key={metric.label}>
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-label">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Hero Visual Media */}
        <div className={`case-hero-media project-${project.tone}`}>
          <Image
            src={project.image}
            alt={`${project.title} main preview`}
            width={project.imageWidth}
            height={project.imageHeight}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="case-cover-image"
          />
        </div>

        {/* Project Meta Details Bar */}
        <section className="case-meta-grid" aria-label="Project metadata">
          <div className="meta-item">
            <span className="meta-label">Role</span>
            <span className="meta-value">{project.meta.role}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Timeline</span>
            <span className="meta-value">{project.meta.timeline}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Platform</span>
            <span className="meta-value">{project.meta.platform}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Team & Collaborators</span>
            <span className="meta-value">{project.meta.team}</span>
          </div>
        </section>

        {/* Narrative Sections */}
        <div className="case-body">
          {project.sections.map((section, idx) => (
            <section className="case-section" key={section.title || idx}>
              <div className="case-section-heading">
                <span className="section-index">0{idx + 1}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.subtitle && <p className="section-subtitle">{section.subtitle}</p>}
                </div>
              </div>

              <div className="case-section-content">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="case-bullet-list">
                    {section.bulletPoints.map((point, bIdx) => (
                      <li key={bIdx}>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} strokeWidth={2} className="bullet-icon" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.steps && section.steps.length > 0 && (
                  <div className="step-cards-grid">
                    {section.steps.map((st) => (
                      <div className="step-card" key={st.step}>
                        <span className="step-badge">Step {st.step}</span>
                        <h3>{st.title}</h3>
                        <p>{st.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.callout && (
                  <div className="case-callout">
                    <span className="callout-tag">{section.callout.title}</span>
                    <p>{section.callout.text}</p>
                  </div>
                )}

                {section.image && (
                  <figure className="case-inline-media">
                    <Image
                      src={section.image}
                      alt={section.imageCaption || section.title}
                      width={1200}
                      height={750}
                      sizes="(max-width: 768px) 100vw, 840px"
                    />
                    {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
                  </figure>
                )}
              </div>
            </section>
          ))}

          {/* Reflections & Learnings */}
          {project.reflection && (
            <section className="case-section reflection-section">
              <div className="case-section-heading">
                <span className="section-index">0{project.sections.length + 1}</span>
                <div>
                  <h2>Reflections & Key Takeaways</h2>
                  <p className="section-subtitle">What this project taught me and opportunities ahead</p>
                </div>
              </div>
              <div className="case-section-content">
                <div className="learnings-card">
                  <h3>Key Learnings</h3>
                  <ul className="case-bullet-list">
                    {project.reflection.learnings.map((learning, lIdx) => (
                      <li key={lIdx}>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} strokeWidth={2} className="bullet-icon" aria-hidden="true" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.reflection.nextSteps && project.reflection.nextSteps.length > 0 && (
                  <div className="next-steps-card">
                    <h3>Future Opportunities</h3>
                    <ul className="case-bullet-list">
                      {project.reflection.nextSteps.map((step, sIdx) => (
                        <li key={sIdx}>
                          <span className="step-dot" aria-hidden="true">→</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Next Project Footer Card */}
        {nextProject && nextProject.slug !== project.slug && (
          <section className="next-project-section" aria-label="Next case study">
            <span className="next-project-label">Next Case Study</span>
            <Link href={`/work/${nextProject.slug}`} className="next-project-card">
              <div className="next-project-info">
                <span className="next-project-eyebrow">{nextProject.eyebrow}</span>
                <h3>{nextProject.title}</h3>
                <span className="next-project-cta">
                  Read case study <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </section>
        )}
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
            <span>falachns.web.id/work/{project.slug}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
