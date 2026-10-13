import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaViewer from "@/components/MediaViewer";

export const metadata: Metadata = {
  title: "Playground & Honors — Falachns",
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
    description: "End-to-end product proposal for travel experience optimization, recognized by Tiket.com product design team.",
  },
  {
    title: "Top Framer Creator 2024",
    category: "Community & Craft",
    year: "2024",
    image: "https://framerusercontent.com/images/TlQQg0Ey3jTrNFiTxX6AUI3Owbc.png?width=1348&height=768",
    description: "Recognized among top creators for building modular interactive components, design systems, and web templates.",
  },
  {
    title: "Most Outstanding Student UNS 2024",
    category: "Academic & Leadership",
    year: "2024",
    image: "https://framerusercontent.com/images/IkHMOoXvLN8yaUdZAaPdNvaM.jpg?width=5184&height=3456",
    description: "Awarded Mahasiswa Berprestasi (Mawapres) Universitas Sebelas Maret for achievements in product design innovation and research.",
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
    <div className="site-wrapper">
      <a className="skip-link" href="#playground-content">
        Skip to content
      </a>

      {/* Header */}
      <Header />

      <main id="main-content">
        <article className="wrap subpage-container" id="playground-content">
          <header className="subpage-header">
            <h1 className="subpage-title">Playground & Recognitions</h1>
            <p className="subpage-lead">
              A collection of honors, design competitions, and milestones reflecting my journey in product design and incubation.
            </p>
          </header>

          <section className="honors-list" aria-label="Honors and awards">
            {RECOGNITIONS.map((item) => (
              <div className="honor-item" key={item.title}>
                <div className="honor-top">
                  <span className="honor-name">{item.title}</span>
                  <span className="honor-year">{item.year}</span>
                </div>
                <p className="honor-desc">{item.description}</p>
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
