import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaViewer from "@/components/MediaViewer";

export default function Home() {
  const projects = getFeaturedProjects();

  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Minimal Header */}
      <Header />

      <main id="main-content">
        {/* Authentic Editorial Hero (Purified of Hallucinated Fluff) */}
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-intro">
            <h1 id="hero-title" className="hero-headline">
              Good day! I&apos;m Falach, junior product designer. Crafting for every single pixel.
            </h1>
            <p className="hero-body">
              Product Designer building products into usable, meaningful digital experiences.
            </p>
            <a
              href="https://www.qiscus.com/en/about-us"
              target="_blank"
              rel="noreferrer"
              className="hero-status"
              aria-label="Current role: Designing platform for railway ecosystem at PT KAI"
            >
              <span className="neutral-indicator-dot" aria-hidden="true" />
              <span>
                Currently designing platform for railway ecosystem, with 40M+ users at <strong>PT KAI (Persero)</strong>.
              </span>
            </a>
          </div>
        </section>

        {/* Selected Work Section (Strictly the 2 Featured Case Studies) */}
        <section className="wrap section-spacer" id="work" aria-label="Selected works">
          <div className="section-header">
            <h2 className="section-title">Selected Work</h2>
            <span className="section-sublabel">2024 — 2026</span>
          </div>

          <div className="projects-container">
            {projects.map((project, idx) => (
              <article className="project-item" key={project.slug}>
                <div className="project-meta-line">
                  <span className="project-eyebrow">
                    0{idx + 1} · {project.eyebrow}
                  </span>
                  <span className="project-year">
                    {project.meta.timeline.split("–")[1]?.trim() || "2026"}
                  </span>
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  className="project-link"
                  aria-label={`View ${project.title} case study`}
                >
                  <h3 className="project-title">
                    {project.title}
                    <span className="project-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </h3>
                </Link>

                <p className="project-desc">{project.summary}</p>

                {/* Media Container: AutoPlay Loop Muted Video with Graceful Image Fallback */}
                <Link
                  href={`/work/${project.slug}`}
                  className="project-link"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="project-media-box">
                    <MediaViewer
                      src={project.video || project.image}
                      poster={project.videoPoster || project.image}
                      alt={`${project.title} interface preview`}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      priority={idx === 0}
                    />
                  </div>
                </Link>

                {/* Subdued Bullet Highlights */}
                {project.bullets && project.bullets.length > 0 && (
                  <ul className="project-bullets-subdued" aria-label="Key highlights">
                    {project.bullets.map((b) => (
                      <li key={b}>{b.replace(/^[✦✧]\s*/, "")}</li>
                    ))}
                  </ul>
                )}

                {/* Minimalist Monospace Tags */}
                <div className="project-tags-row" aria-label="Tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Labs & Explorations Archive Strip */}
        <section className="wrap section-spacer" aria-label="Explorations and archive">
          <div className="section-header">
            <h2 className="section-title">Labs & Notes</h2>
            <span className="section-sublabel">Experiments & Archive</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p className="project-desc">
              Curious explorations, Pomodoro focus spaces, and startup incubation projects.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "13px" }}>
              <Link
                href="/explorations"
                style={{
                  color: "var(--ink)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Focus Pomodoro Timer & Gallery ↗
              </Link>
              <Link
                href="/playground"
                style={{
                  color: "var(--ink)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Honors & Recognitions ↗
              </Link>
              <Link
                href="/work/habitz"
                style={{
                  color: "var(--muted)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Habitz App (UNS Hub) ↗
              </Link>
              <Link
                href="/work/artverse"
                style={{
                  color: "var(--muted)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Artverse Commerce ↗
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer with Theme Toggle */}
      <Footer />
    </div>
  );
}
