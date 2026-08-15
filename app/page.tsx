import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

const projects = [
  {
    number: "01",
    eyebrow: "Qiscus · Customer experience",
    title: "Elevating CSAT survey experience for better agent performance.",
    summary:
      "A clearer end-to-end survey flow for admins and end-users, adopted by 20+ enterprise clients.",
    tags: ["Survey Builder", "Micro-interaction", "Competitive Analysis"],
    image:
      "https://framerusercontent.com/images/7yUAmetmI8toA1NRXVLoFyq7O24.png?scale-down-to=2048&width=2100&height=1575",
    tone: "blue",
  },
  {
    number: "02",
    eyebrow: "Commerce · Conversion",
    title: "Redesigning a customer microsite for higher merchant conversion.",
    summary:
      "Improving product detail clarity and contributing to an approximately 10% lift in customer order sessions.",
    tags: ["E-commerce", "Mobile Web App", "Design System"],
    image:
      "https://framerusercontent.com/images/KyirwtP3wo9c3ntxA5k7KiafSHE.png?width=2048&height=1640",
    tone: "sand",
  },
];

export default function Home() {
  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="site-header wrap">
        <a className="wordmark" href="#top" aria-label="Back to top">
          Falachns
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="https://falachns.framer.website/playground" target="_blank" rel="noreferrer">Playground</a>
          <a href="/ask-falach">Ask FalachLLM</a>
        </nav>
      </header>

      <section className="hero wrap" id="top">
        <div className="hero-intro">
          <p className="hero-name">Falach</p>
          <h1>Good day! I&apos;m Falach, Product Designer building products into usable digital experiences.</h1>
        </div>
        <div className="hero-foot">
          <p>Currently helping businesses stay connected with their customers at <strong>Qiscus</strong>.</p>
          <p className="clock">Indonesia, UTC+7</p>
        </div>
      </section>

      <section className="work wrap" id="work">
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project project-${project.tone}`} key={project.number}>
              <a href="#contact" className="project-link" aria-label={`View ${project.title}`}>
                <div className="project-media">
                  <img src={project.image} alt="Product interface preview" />
                  <span className="project-view">View case study <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} strokeWidth={1.7} /></span>
                </div>
                <div className="project-info">
                  <div className="project-index"><span>{project.number}</span><span>{project.eyebrow}</span></div>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                  <ul aria-label="Project focus areas">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="notes wrap">
        <div className="notes-grid">
          <div className="note-links">
            <a href="https://falachns.framer.website/playground" target="_blank" rel="noreferrer">Playground <span>↗</span></a>
            <a href="https://falachns.framer.website/explorations" target="_blank" rel="noreferrer">Explorations <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer className="footer wrap" id="contact">
        <div className="contact-row">
          <a className="email" href="mailto:falachns10@gmail.com">
            falachns10@gmail.com <HugeiconsIcon icon={ArrowUpRight01Icon} size={27} strokeWidth={1.5} />
          </a>
          <div className="socials">
            <a href="https://www.linkedin.com/in/falachnoorsyahid/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/falachns" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Falach Noor Syahid</p>
      </footer>
    </main>
  );
}
