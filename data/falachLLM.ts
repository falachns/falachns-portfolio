export interface LLMLink {
  label: string;
  url: string;
}

export interface LLMMessage {
  id: string;
  sender: "user" | "falach";
  text: string;
  timestamp: string;
  links?: LLMLink[];
}

export const PRESET_PROMPTS = [
  "PT KAI ESG platform",
  "Qiscus CSAT survey",
  "Design systems & Claude skill",
  "AI-assisted design workflow",
] as const;

export interface IntentRule {
  id: string;
  matcher: (q: string) => boolean;
  reply: string;
  links?: LLMLink[];
}

export const INTENT_RULES: IntentRule[] = [
  // --- A. DESIGN-RELATED INTENTS ---
  // 1. PT Kereta Api Indonesia (Persero)
  {
    id: "kai-esg",
    matcher: (q) =>
      /\b(kai|kereta|esg|sustainability|railway|compliance|stasiun|station|operator|task completion)\b/i.test(
        q
      ),
    reply:
      "At PT Kereta Api Indonesia (Persero), I work as a Product Designer based in Bandung:\n\n• Designed modules for KAI's ESG Sustainability platform for structured, role-based compliance reporting across the national railway ecosystem.\n• Optimized internal operations software for station operators, streamlining repetitive operational flows and reducing task completion time.\n• Standardized data-dense tabular grids, role permissions, and audit-ready workflows with high accessibility.",
    links: [
      {
        label: "KAI Sustainability Platform",
        url: "https://sustainability.kai.id/",
      },
    ],
  },

  // 2. Qiscus Helpdesk CSAT Survey Builder
  {
    id: "qiscus-csat",
    matcher: (q) =>
      /\b(csat|survey|survey builder|qiscus csat|helpdesk csat|rating|feedback)\b/i.test(
        q
      ),
    reply:
      "At Qiscus (customer engagement platform serving 200M+ users across 25 countries), I led the design of the Helpdesk CSAT survey builder:\n\n• Architected a 4-step wizard combining custom brand themes, dynamic branching logic, and trigger automation.\n• Built an instant side-by-side live brand preview so enterprise admins configure surveys with zero guesswork.\n• Crafted a frictionless 1-tap rating experience for end users across mobile web and in-chat webviews.\n• Successfully adopted by 20+ enterprise clients across retail, healthcare, and logistics with 0 critical bugs at launch.",
    links: [
      {
        label: "Read CSAT Case Study",
        url: "/work/qiscus-csat",
      },
    ],
  },

  // 3. Qiscus Shop Customer Microsite
  {
    id: "qiscus-shop",
    matcher: (q) =>
      /\b(shop|microsite|customer microsite|qiscus shop|modifier|variant|checkout|10%|order)\b/i.test(
        q
      ),
    reply:
      "I redesigned the Qiscus Shop mobile customer microsite and checkout experience:\n\n• Audited variant selection drop-offs and architected a structured modifier pattern separating mandatory choices (e.g. Size) from optional add-ons.\n• Designed an ergonomic thumb-friendly bottom sheet configuration modal with sticky real-time price calculations.\n• Contributed to an approximately 10% lift in completed customer order sessions and 45% faster variant selection time.",
    links: [
      {
        label: "Read Customer Microsite Case Study",
        url: "/work/customer-microsite",
      },
    ],
  },

  // 4. Claude Skill & AI-Assisted Design Engineering Workflow
  {
    id: "ai-workflow",
    matcher: (q) =>
      /\b(claude|claude skill|cursor|codex|ai workflow|ai-assisted|ai design|prototyping|design engineer|design engineering)\b/i.test(
        q
      ),
    reply:
      "My AI-assisted design engineering workflow bridges systematic design with production code:\n\n• Encapsulated the Qiscus design system into a custom Claude skill, enabling developers and non-designers to produce on-brand interfaces autonomously.\n• Rebuilt the Qiscus Helpdesk frontend in HTML using AI-assisted coding tools (Cursor & Codex) to compress high-fidelity interactive prototyping from weeks into days.\n• I treat production code (Next.js, React, Tailwind tokens) as an extension of the design canvas to validate ergonomics directly in the browser.",
  },

  // 5. Bot Management & Qiscus Career Page
  {
    id: "bot-career",
    matcher: (q) =>
      /\b(bot|intent|visual builder|career|careers|qiscus career|bot builder|bot management)\b/i.test(
        q
      ),
    reply:
      "At Qiscus, I also led product design for two strategic company initiatives:\n\n• Bot Management Dashboard & Intent Visual Builder: Empowered customer support managers to map complex conversational bots and intent hierarchies visually.\n• Qiscus's First Careers Page: Designed and shipped the company's inaugural talent acquisition experience from wireframes to launch, elevating employer branding.",
  },

  // 6. tiket.com Hotel Conversion Challenge
  {
    id: "tiket-challenge",
    matcher: (q) =>
      /\b(tiket|tiket\.com|hotel|listing|tiket design|challenge|competition)\b/i.test(
        q
      ),
    reply:
      "In 2024–2025, I participated in and won the Product Design Challenge by Tiket Design (tiket.com):\n\n• Redesigned the hotel room listing experience to clarify room amenity tiers, bed configurations, and cancellation policies.\n• Streamlined decision fatigue during hotel checkout, resulting in winning 1st place in the competition with concepts implemented directly in the tiket.com mobile app.",
  },

  // 7. Habitz Children Gamification Tracker
  {
    id: "habitz",
    matcher: (q) =>
      /\b(habitz|gamification|habit|kebiasaan|children|anak|parenting|google for startups)\b/i.test(
        q
      ),
    reply:
      "Habitz is a mobile application incubated under UNS Innovation Hub and backed by Google for Startups:\n\n• Conducted discovery research across 140+ parents to identify friction in childhood daily routines.\n• Designed an engaging gamification quest journey that turns daily habits into fun rewards.\n• Reached 550+ downloads on Google Play, earned 10 five-star reviews, and pitched to 5+ venture investors.",
    links: [
      {
        label: "Read Habitz Case Study",
        url: "/work/habitz",
      },
    ],
  },

  // 8. Artverse Art Commerce Platform
  {
    id: "artverse",
    matcher: (q) =>
      /\b(artverse|art|lukisan|forgery|provenance|assetfindr|commerce)\b/i.test(
        q
      ),
    reply:
      "At AssetFindr, I designed Artverse—a digital art commerce platform addressing Indonesian art forgery:\n\n• Surveyed 35+ collectors and artists to build transparent provenance verification and tamper-evident certificates.\n• Crafted a gallery interface balancing artistic aesthetic with institutional trust.",
    links: [
      {
        label: "Read Artverse Case Study",
        url: "/work/artverse",
      },
    ],
  },

  // 9. Education, Background & Honors
  {
    id: "education-awards",
    matcher: (q) =>
      /\b(education|degree|kuliah|gpa|ipk|uns|universitas terbuka|award|honors|recognitions|background|prestasi|mahasiswa berprestasi|sebelas maret)\b/i.test(
        q
      ),
    reply:
      "Falach holds a dual academic background in technology and communication:\n\n• B.S. in Information Systems — Universitas Terbuka (GPA 3.85 / 4.00)\n• Associate Degree in Applied Communication — Universitas Sebelas Maret (UNS, GPA 3.82 / 4.00)\n• Recognitions: Most Outstanding Student UNS 2024, Top Framer Creator 2024, 1st Place Tiket Design Challenge.",
    links: [
      {
        label: "Explore Playground & Honors",
        url: "/playground",
      },
    ],
  },

  // 10. Design Philosophy & Principles
  {
    id: "design-philosophy",
    matcher: (q) =>
      /\b(philosophy|principles|approach|mindset|craft|values|filosofi|prinsip)\b/i.test(
        q
      ),
    reply:
      "Falach's design philosophy centers on quiet editorial restraint and practical ergonomics:\n\n• Clarity over decoration: Every pixel and token earns its place by reducing cognitive friction.\n• Design systems & tokens: Systematic tokens ensure scalable accessibility across light and dark modes.\n• Interaction ergonomics: Touch-first action zones, clear affordances, and zero extraneous steps.\n• Designer-engineer bridge: Writing clean frontend code ensures design intent survives 1:1 into production.",
    links: [
      {
        label: "View Featured Works",
        url: "/",
      },
    ],
  },

  // 11. Contact & Collaboration
  {
    id: "contact",
    matcher: (q) =>
      /\b(contact|email|hire|freelance|collaborate|connect|reach|hubungi|kontak)\b/i.test(
        q
      ),
    reply:
      "Falach is open to discussing high-impact product design roles, enterprise systems, and frontend collaborations:\n\n• Email: falachns10@gmail.com\n• LinkedIn: linkedin.com/in/falachnoorsyahid\n• GitHub: github.com/falachns\n• Location: Bandung, Indonesia (UTC+7)",
    links: [
      {
        label: "Send Email",
        url: "mailto:falachns10@gmail.com",
      },
      {
        label: "LinkedIn Profile",
        url: "https://www.linkedin.com/in/falachnoorsyahid/",
      },
    ],
  },

  // --- B. OFF-TOPIC / CASUAL / WIT INTENTS ---
  // 1. Greetings
  {
    id: "greeting",
    matcher: (q) =>
      /\b(halo|hai|hello|hey|hi|good morning|good day|good afternoon|good evening|pagi|siang|sore|malam|what'?s up|sup)\b/i.test(
        q
      ),
    reply:
      "Hello! Good to have you here. I'm Falach's AI counterpart—ready to share details on his design work at KAI, Qiscus, or his design engineering workflow. What would you like to explore?",
  },

  // 2. Food / Coffee / Culinary
  {
    id: "food-coffee",
    matcher: (q) =>
      /\b(makan|makanan|food|kuliner|kulineran|tempat makan|coffee|kopi|lunch|dinner|breakfast|sarapan)\b/i.test(
        q
      ),
    reply:
      "I run on design tokens and clean syntax rather than local culinary gems, but Falach definitely knows his way around Bandung food. Need details on his case studies while you grab lunch?",
  },

  // 3. Weather / Bandung / Daily Life
  {
    id: "weather-bandung",
    matcher: (q) =>
      /\b(cuaca|weather|hujan|rain|keseharian|how is bandung|living in bandung|suasana bandung|tinggal di bandung)\b/i.test(
        q
      ) ||
      (/\b(bandung|kota bandung)\b/i.test(q) &&
        !/\b(makan|food|kuliner|kopi|coffee)\b/i.test(q)),
    reply:
      "Bandung is treating us well—usually cool with a bit of afternoon rain and plenty of good coffee. But if you're here to talk product, I'd rather tell you how Falach tackles scalable UX or design systems. Curious about any of his projects?",
  },

  // 4. General Code / Math / Calculations
  {
    id: "coding-math",
    matcher: (q) =>
      /\b(code|coding|python|javascript|write code|bikin code|math|matematika|calculate|kalkulator|script)\b/i.test(
        q
      ),
    reply:
      "While Falach codes his own prototypes (leveraging Cursor, React, and Tailwind), I'm fine-tuned specifically around his product design cases and career track. For custom engineering or deeper collabs, check his GitHub or shoot him an email at falachns10@gmail.com!",
    links: [
      {
        label: "GitHub Profile",
        url: "https://github.com/falachns",
      },
    ],
  },

  // 5. Existential / Who are you?
  {
    id: "who-are-you",
    matcher: (q) =>
      /\b(who are you|who r u|siapa kamu|kamu siapa|what are you|falachllm|tell me about yourself)\b/i.test(
        q
      ),
    reply:
      "I'm FalachLLM, an interactive showcase companion built into this portfolio. I know Falach's design rationale, metrics, and workflow inside out. Feel free to ask about his work at PT KAI, Qiscus, or his approach to interaction design.",
  },
];

export function getFalachResponse(query: string): {
  text: string;
  links?: LLMLink[];
} {
  const normalized = query.trim().toLowerCase();

  for (const rule of INTENT_RULES) {
    if (rule.matcher(normalized)) {
      return {
        text: rule.reply,
        links: rule.links,
      };
    }
  }

  return {
    text: "I focus specifically on Falach's enterprise design cases, ESG platforms, and design engineering workflows. Feel free to ask about his work at PT KAI, Qiscus Helpdesk, or reach him directly at falachns10@gmail.com.",
    links: [
      {
        label: "View Featured Works",
        url: "/",
      },
    ],
  };
}
