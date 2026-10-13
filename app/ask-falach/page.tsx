import type { Metadata } from "next";
import AskFalachPageView from "@/components/AskFalachPageView";

export const metadata: Metadata = {
  title: "Ask FalachLLM",
  description:
    "Design-grounded conversational AI assistant trained on Falach Noor Syahid's product design philosophy, enterprise case studies, and engineering workflows.",
  alternates: {
    canonical: "https://falachns.web.id/ask-falach",
  },
  openGraph: {
    title: "Ask FalachLLM | Falach Noor Syahid",
    description:
      "Design-grounded conversational AI assistant trained on Falach Noor Syahid's product design philosophy, enterprise case studies, and engineering workflows.",
    url: "https://falachns.web.id/ask-falach",
    siteName: "Falach Noor Syahid",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Falach Noor Syahid — Ask FalachLLM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ask FalachLLM | Falach Noor Syahid",
    description:
      "Design-grounded conversational AI assistant trained on Falach Noor Syahid's product design philosophy, enterprise case studies, and engineering workflows.",
    images: ["/og-image.png"],
    creator: "@falachns",
    site: "@falachns",
  },
};

export default function AskFalachPage() {
  return <AskFalachPageView />;
}
