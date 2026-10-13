import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaViewer from "@/components/MediaViewer";

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

  const title = project.title;
  const description =
    project.summary || project.fullDescription.slice(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: `https://falachns.web.id/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${project.title} | Falach Noor Syahid`,
      description,
      url: `https://falachns.web.id/work/${project.slug}`,
      siteName: "Falach Noor Syahid",
      images: [
        {
          url: project.image,
          width: project.imageWidth,
          height: project.imageHeight,
          alt: project.imageAlt || `${project.title} interface preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Falach Noor Syahid`,
      description,
      images: [project.image],
      creator: "@falachns",
      site: "@falachns",
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
    <div className="site-wrapper">
      <a className="skip-link" href="#case-study-content">
        Skip to case study content
      </a>

      {/* Header */}
      <Header />

      <main id="main-content">
        <article className="wrap case-study-article" id="case-study-content">
          {/* Case Header */}
          <header className="case-header">
            <div className="case-breadcrumb">
              <Link href="/" className="breadcrumb-link">
                Work
              </Link>
              <span className="breadcrumb-sep">/</span>
              <span>{project.eyebrow}</span>
            </div>
            <h1 className="case-title">{project.title}</h1>
            <p className="case-lead">{project.fullDescription}</p>
          </header>

          {/* Key Impact Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="metrics-strip" aria-label="Key project metrics">
              {project.metrics.map((m) => (
                <div className="metric-strip-item" key={m.label}>
                  <span className="metric-strip-val">{m.value}</span>
                  <span className="metric-strip-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Hero Media (Video AutoPlay Loop Muted with Image Fallback) */}
          <div style={{ marginBottom: "32px" }}>
            <MediaViewer
              src={project.video || project.image}
              poster={project.videoPoster || project.image}
              alt={project.imageAlt || `${project.title} cover preview`}
              width={project.imageWidth}
              height={project.imageHeight}
              priority
            />
          </div>

          {/* Project Metadata Strip */}
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
              <span className="meta-label">Collaborators</span>
              <span className="meta-value">{project.meta.team}</span>
            </div>
          </section>

          {/* Narrative Sections */}
          <div className="case-body">
            {project.sections.map((section, idx) => (
              <section className="case-section" key={section.title || idx}>
                <h2>{section.title}</h2>
                {section.subtitle && (
                  <p className="case-section-subtitle">{section.subtitle}</p>
                )}

                {section.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="case-bullet-list">
                    {section.bulletPoints.map((pt, bIdx) => (
                      <li key={bIdx}>{pt}</li>
                    ))}
                  </ul>
                )}

                {section.steps && section.steps.length > 0 && (
                  <div className="steps-list">
                    {section.steps.map((st) => (
                      <div className="step-row" key={st.step}>
                        <span className="step-num">{st.step}</span>
                        <div className="step-content">
                          <h3>{st.title}</h3>
                          <p>{st.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Section Media (Video or Image) */}
                {(section.video || section.image) && (
                  <div style={{ margin: "20px 0" }}>
                    <MediaViewer
                      src={section.video || section.image}
                      poster={section.videoPoster || section.image}
                      alt={section.videoCaption || section.imageCaption || section.title}
                      caption={section.videoCaption || section.imageCaption}
                    />
                  </div>
                )}

                {section.callout && (
                  <div className="case-callout-clean">
                    <h3>{section.callout.title}</h3>
                    <p>{section.callout.text}</p>
                  </div>
                )}
              </section>
            ))}

            {/* Reflections */}
            {project.reflection && (
              <section className="case-section">
                <h2>Reflections & Learnings</h2>
                <ul className="case-bullet-list">
                  {project.reflection.learnings.map((l, lIdx) => (
                    <li key={lIdx}>{l}</li>
                  ))}
                </ul>

                {project.reflection.nextSteps &&
                  project.reflection.nextSteps.length > 0 && (
                    <>
                      <h2 style={{ marginTop: "24px" }}>Future Opportunities</h2>
                      <ul className="case-bullet-list">
                        {project.reflection.nextSteps.map((s, sIdx) => (
                          <li key={sIdx}>{s}</li>
                        ))}
                      </ul>
                    </>
                  )}
              </section>
            )}
          </div>

          {/* Next Project Footer Link */}
          {nextProject && nextProject.slug !== project.slug && (
            <div className="next-project-strip">
              <span className="next-project-lbl">Next Case Study</span>
              <Link
                href={`/work/${nextProject.slug}`}
                className="next-project-link"
              >
                <span className="next-project-title">
                  {nextProject.title} ↗
                </span>
              </Link>
            </div>
          )}
        </article>
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
