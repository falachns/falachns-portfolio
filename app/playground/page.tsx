import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaViewer from "@/components/MediaViewer";

export const metadata: Metadata = {
  title: "Playground — Falachns",
  description: "Personal design philosophy, honors, and milestone recognitions by Falach Noor Syahid.",
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
  },
  {
    title: "Top Framer Creator 2024",
    category: "Community & Craft",
    year: "2024",
    image: "https://framerusercontent.com/images/TlQQg0Ey3jTrNFiTxX6AUI3Owbc.png?width=1348&height=768",
  },
  {
    title: "Most Outstanding Student UNS 2024",
    category: "Academic & Leadership",
    year: "2024",
    image: "https://framerusercontent.com/images/IkHMOoXvLN8yaUdZAaPdNvaM.jpg?width=5184&height=3456",
  },
  {
    title: "Pitching Nurture to Scale 2023",
    category: "Startup Incubation",
    year: "2023",
    image: "https://framerusercontent.com/images/oEt2GJ6bO3Xc5v2peEzt6IOo.png?width=1036&height=768",
  },
];

export default function PlaygroundPage() {
  return (
    <div className="site-wrapper">
      <a className="skip-link" href="#playground-content">
        Skip to content
      </a>

      {/* Header */}
      <Header />

      <main id="main-content">
        <article className="wrap subpage-container" id="playground-content">
          <header className="subpage-header">
            <div className="section-label-quiet">JOURNEY / PLAYGROUND</div>
            <h1 className="subpage-title">Crafting every single pixel 🎨</h1>
            <p className="subpage-lead">
              I’m a curious designer who loves building products that are genuinely useful for everyone. For me, design is a dialogue between users, designers, and developers where strategy and craft work together to create something that feels effortless. Subtle, but with great impact.
            </p>
            <div style={{ marginTop: "12px" }}>
              <a
                href="https://falachns.framer.website/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--ink)] hover:text-[var(--muted)] border-b border-[var(--ink)] pb-0.5 transition-colors"
              >
                <span>The full story&apos;s in my updated resume</span>
                <span>↗</span>
              </a>
            </div>
          </header>

          <section className="honors-list" aria-label="Honors and awards">
            {RECOGNITIONS.map((item) => (
              <div className="honor-item" key={item.title}>
                <div className="honor-top">
                  <span className="honor-name">{item.title}</span>
                  <span className="honor-year">{item.year}</span>
                </div>
                <div style={{ marginTop: "12px" }}>
                  <MediaViewer
                    src={item.image}
                    poster={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                  />
                </div>
              </div>
            ))}
          </section>
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
