export interface ProjectMeta {
  role: string;
  timeline: string;
  platform: string;
  team: string;
  impact: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface CaseStudySection {
  title: string;
  subtitle?: string;
  content: string[];
  bulletPoints?: string[];
  image?: string;
  imageCaption?: string;
  video?: string;
  videoPoster?: string;
  videoCaption?: string;
  callout?: {
    title: string;
    text: string;
  };
  steps?: {
    step: string;
    title: string;
    description: string;
  }[];
}

export interface Project {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  bullets?: string[];
  fullDescription: string;
  tags: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  video?: string;
  videoPoster?: string;
  tone?: "neutral";
  featured: boolean;
  metrics: MetricItem[];
  meta: ProjectMeta;
  sections: CaseStudySection[];
  reflection: {
    learnings: string[];
    nextSteps: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "qiscus-csat",
    eyebrow: "Qiscus Helpdesk · Omnichannel",
    title: "Elevating CSAT Survey Experience to Improve Agent Performance",
    summary:
      "A clearer end-to-end survey flow for admins and end-users, adopted by 20+ enterprise clients.",
    bullets: [
      "✦  Designed end-to-end survey creation for admin and end-user, adopted by 20+ enterprise clients.",
      "✦  Enabling agents to capture customer feedback and drive faster ticket resolution.",
    ],
    fullDescription:
      "Qiscus Helpdesk is an omnichannel ticketing system that empowers customer support teams to manage, prioritize, and resolve inquiries at scale. As enterprise adoption expanded, measuring agent performance with actionable, real-time feedback became a vital requirement. I redesigned the end-to-end survey builder experience to balance deep customization for admins with frictionless completion for end customers.",
    tags: ["Survey Builder", "Micro-Interaction", "Competitive Analysis"],
    image:
      "https://framerusercontent.com/images/7yUAmetmI8toA1NRXVLoFyq7O24.png?scale-down-to=2048&width=2100&height=1575",
    imageWidth: 2100,
    imageHeight: 1575,
    video: "https://framerusercontent.com/assets/bxbSVbhcIjyXFRwiHaqmOHvG9NE.mp4",
    videoPoster: "https://framerusercontent.com/images/7yUAmetmI8toA1NRXVLoFyq7O24.png",
    tone: "neutral",
    featured: true,
    metrics: [
      { value: "20+", label: "Enterprise Clients Adopted" },
      { value: "0", label: "Critical Bugs at Launch" },
      { value: "5+", label: "International Deals Differentiated" },
    ],
    meta: {
      role: "Product Designer (End-to-End UX/UI)",
      timeline: "Jan – Feb 2026",
      platform: "Web Application / SaaS Helpdesk",
      team: "Aditya (PM Lead), Agung, Safira, Rifky (Engineers), Tiyas (QA)",
      impact: "Adopted across retail, healthcare, and transportation enterprise clients.",
    },
    sections: [
      {
        title: "The Starting Point & Challenge",
        subtitle: "Bridging the gap between agent coaching and customer feedback",
        content: [
          "Qiscus Helpdesk is used by high-velocity customer operations teams across Southeast Asia. As ticket volumes grew, support leaders needed a reliable mechanism to evaluate individual agent resolution quality directly from customers.",
          "The core challenge was two-fold: Enterprise admins required granular configuration (branding, question formats, trigger rules), while end customers required a survey so swift and intuitive that response completion rates remained high without survey fatigue.",
        ],
      },
      {
        title: "Discovery & Competitive Benchmarking",
        subtitle: "Learning from global standards without overwhelming local teams",
        content: [
          "To establish baseline requirements, I conducted a deep comparative analysis across leading global helpdesk platforms (Zendesk, Freshdesk) and local regional solutions (Mekari Qontak).",
          "Global tools offer profound flexibility but often introduce steep configuration curves that slow initial onboarding. Conversely, local tools were fast but lacked enterprise brand identity control. Our opportunity was to combine enterprise-level customizability with a guided, linear setup flow.",
        ],
        bulletPoints: [
          "Zendesk & Freshdesk: High configuration depth, but required multi-page settings menus that increased admin cognitive load.",
          "Mekari Qontak: Fast single-screen setup, but lacked live brand previews and custom rating scales.",
          "Key Takeaway: Build a 4-step focused wizard with live real-time preview to eliminate setup guesswork.",
        ],
      },
      {
        title: "Structuring Intentions: 4-Step Builder Flow",
        subtitle: "Separating complex tasks into distinct, bite-sized stages",
        content: [
          "To minimize cognitive load, I structured the creation journey into four focused stages. Each step serves a single purpose and validates against usability heuristics before allowing progress:",
        ],
        steps: [
          {
            step: "01",
            title: "Identity & General Info",
            description: "Define survey name, target language, and brief operational description with character counters and input boundaries.",
          },
          {
            step: "02",
            title: "Survey Content & Questions",
            description: "Configure core rating logic (5-star, CSAT scale, emojis) and follow-up conditional feedback questions.",
          },
          {
            step: "03",
            title: "Brand Customization & Live Preview",
            description: "Upload client logo, adjust primary button colors and card styles with an instant side-by-side interactive preview.",
          },
          {
            step: "04",
            title: "Automation Triggers & Dispatch",
            description: "Set ticket resolution trigger criteria and personalize email notification templates with pre-filled dynamic variables.",
          },
        ],
      },
      {
        title: "Brand Customization & End-User Experience",
        subtitle: "When a survey feels familiar, response rates rise",
        content: [
          "Every enterprise client has strict brand guidelines. The live preview editor enables support managers to match company color tokens, custom logos, and greeting copy seamlessly.",
          "For end-users, the submission interface is stripped of all redundant UI elements. It renders instantly on both mobile browsers and in-chat webviews, making submission a 1-tap interaction.",
        ],
        video: "https://framerusercontent.com/assets/h6jsbfKO7soS1XU5TnMnDyZq9ZU.mp4",
        videoCaption: "Live brand preview panel reflecting client color tokens and logos in real-time.",
        callout: {
          title: "Design Detail: Micro-Interactions",
          text: "Selected rating states trigger subtle haptic-like spring transitions and instant score confirmations, giving respondents visual clarity that their feedback was registered.",
        },
      },
    ],
    reflection: {
      learnings: [
        "Proactive exploration before PRD finalization: Initiating wireframes early allowed our team to identify edge cases in trigger automation before engineering started.",
        "Clear Figma handoff system: Documented states (loading, empty, error, active) and token annotations reduced frontend iteration cycles significantly.",
        "Cross-functional Design QA: Participating actively in pre-release staging testing ensured 100% visual fidelity and zero critical UI regressions at launch.",
      ],
      nextSteps: [
        "Integrate AI sentiment summarization for open-text CSAT responses.",
        "Add automated Slack / Discord webhook alerts for negative customer ratings.",
      ],
    },
  },
  {
    slug: "customer-microsite",
    eyebrow: "E-Commerce · Merchant Conversion",
    title: "Redesigning Customer Microsite for Higher Merchant Conversion",
    summary:
      "Improving product detail clarity and contributing to an approximately 10% lift in customer order sessions.",
    bullets: [
      "✦  Contributing to ~10% increase in customer order sessions.",
      "✦  Improved microsite product pages allowing customers to view variants details clearly.",
    ],
    fullDescription:
      "For independent merchants and multi-outlet retail brands, their mobile customer microsite is the digital front door for direct-to-consumer orders. By auditing drop-off friction points, clarifying variant selection mechanics, and streamlining product detail pages, this redesign directly boosted customer order session conversions by approximately 10%.",
    tags: ["E-commerce Dashboard", "Mobile Web App", "Design System"],
    image:
      "https://framerusercontent.com/images/KyirwtP3wo9c3ntxA5k7KiafSHE.png?width=2048&height=1640",
    imageWidth: 2048,
    imageHeight: 1640,
    video: "https://framerusercontent.com/assets/YwrEm1iK044p33dH6v1P9XpZ3c.mp4",
    videoPoster: "https://framerusercontent.com/images/KyirwtP3wo9c3ntxA5k7KiafSHE.png",
    tone: "neutral",
    featured: true,
    metrics: [
      { value: "~10%", label: "Lift in Order Sessions" },
      { value: "45%", label: "Faster Variant Selection Time" },
      { value: "100%", label: "Responsive Mobile-First Architecture" },
    ],
    meta: {
      role: "Lead UI/UX Designer",
      timeline: "Oct – Dec 2025",
      platform: "Mobile Web App & Merchant Dashboard",
      team: "Falach (Product Design), Front-end & Back-end Engineering Team",
      impact: "Adopted across high-volume F&B and retail merchant storefronts.",
    },
    sections: [
      {
        title: "The Problem & Friction Analysis",
        subtitle: "Navigating messy variant trees and high cart abandonment",
        content: [
          "Customers ordering through merchant mobile web links frequently abandoned purchases during the product configuration stage. Complex product options (sizes, toppings, customizations, temperature) were displayed as confusing nested radio groups, resulting in accidental orders or drop-offs.",
          "Merchants also struggled with duplicate catalog entries because their legacy system couldn't handle flexible modifiers without cloning entire product listings.",
        ],
      },
      {
        title: "UX Architecture & Modifier System",
        subtitle: "Unifying modifiers to eliminate duplicate products",
        content: [
          "I architected a structured modifier design pattern that separated mandatory choices (e.g. Size: Regular/Large) from optional add-ons (e.g. Extra Espresso Shot).",
          "The updated bottom-sheet product detail modal features sticky price tallying, visual quantity steppers, and clear error messaging if required choices are missing.",
        ],
        bulletPoints: [
          "Sticky Bottom Action Bar: Displays real-time calculated total price based on active modifiers.",
          "Visual Pill Chips: Instant visual feedback for single-select and multi-select choices.",
          "Optimized Thumbnail Previews: Compressed high-fidelity imagery with fast progressive loading on 4G networks.",
        ],
      },
      {
        title: "Design System & Responsive Components",
        subtitle: "Ensuring consistency across diverse merchant brand themes",
        content: [
          "A modular token-based component library was created in Figma and implemented in production. Merchants can easily customize primary accent colors while ensuring typography scales, contrast ratios, and touch-target sizes (minimum 44x44px) remain strictly accessible.",
        ],
        callout: {
          title: "Measurable Impact",
          text: "Post-launch analytics revealed a ~10% increase in completed order sessions and a notable reduction in customer support inquiries regarding incorrect order options.",
        },
      },
    ],
    reflection: {
      learnings: [
        "Mobile ergonomics matter: Placing key decision-making actions in the thumb-friendly lower 40% of mobile screens drastically reduced interaction friction.",
        "Design system scalability: Defining modifier components systematically saved months of redundant engineering work across merchant dashboard tools.",
      ],
      nextSteps: [
        "Introduce 1-click reordering for returning authenticated customers.",
        "Implement real-time inventory threshold badges on low-stock variants.",
      ],
    },
  },
  {
    slug: "habitz",
    eyebrow: "PT Habitz Inovasi Tekologi · UNS Innovation Hub",
    title: "Empowering Children's positive habits through Gamification Design",
    summary:
      "Gamified approach to teaching habits, acquired 550+ app users and 10 five-star reviews on Google Play.",
    bullets: [
      "✦  Acquired 550+ app users and 10 five-star reviews on Google Play.",
      "✦  Built parenting community of 400+ members.",
    ],
    fullDescription:
      "Habitz is a mobile application incubated under UNS Innovation Hub designed to empower positive daily habits for children through gamification mechanics. By interviewing 140+ parents and collaborating closely with front-end engineers, we crafted an engaging, child-friendly journey that turns everyday routines into rewarding quests.",
    tags: ["User Research", "UX Design", "Gamification", "Mobile App"],
    image:
      "https://framerusercontent.com/images/aG8oCyME0xjjkIeVE5X6cqHmas.png?width=1920&height=1000",
    imageWidth: 1920,
    imageHeight: 1000,
    tone: "neutral",
    featured: false,
    metrics: [
      { value: "550+", label: "App Downloads on Google Play" },
      { value: "10", label: "Five-Star Reviews" },
      { value: "400+", label: "Parenting Community Members" },
    ],
    meta: {
      role: "User Research & UX Design",
      timeline: "July – December 2023",
      platform: "Android Mobile Application",
      team: "Raihan (UI Design) & Dinar (Frontend Developer)",
      impact: "Successfully incubated and launched on Google Play Store with active family adoption.",
    },
    sections: [
      {
        title: "The Starting Point & Discovery",
        subtitle: "Understanding parental challenges in building childhood routines",
        content: [
          "To gain insight into parental challenges and expectations, I conducted a survey with 140 respondents, all of whom were parents. The survey highlighted the desire for a structured and enjoyable approach to building positive habits in children.",
          "Parents expressed the need for a system that could hold children's interest while being flexible enough to adapt to different family routines. These insights shaped the direction of the design, focusing on interactive elements that make habit-building enjoyable.",
        ],
      },
      {
        title: "Design Process & Prototyping",
        subtitle: "From user personas to interactive gamified workflows",
        content: [
          "The design process started with creating a UX research plan and conducting a competitor analysis to understand how similar apps approached habit-building for children. I developed user personas and affinity diagrams to represent our key user groups and prioritize the main challenges.",
          "During ideation, I organized the information architecture and brainstormed solutions through 'How Might We' sessions. The design progressed through building a design system and creating an interactive prototype before conducting MVP usability testing.",
        ],
      },
    ],
    reflection: {
      learnings: [
        "Leading a design team: Collaboration with developers is about bridging gaps between creativity and technical execution.",
        "Rapid adaptation: When prototypes miss the mark, it's better to fail fast, gather feedback, and iterate quickly.",
      ],
      nextSteps: [
        "Build a scalable design system for upcoming feature modules.",
        "Deepen user feedback loops with child psychology advisors.",
      ],
    },
  },
  {
    slug: "artverse",
    eyebrow: "AssetFindr (PT Sumber Solusi Inovatif) · Intern Project",
    title: "Transforming Art Commerce through a Seamless Web Experience",
    summary:
      "Resolving authenticity, transparency, and modern digital commerce experience for Indonesian art lovers and collectors.",
    bullets: [
      "✦  Researched forgery challenges across 35+ local artists & collectors.",
      "✦  Designed end-to-end verification and trustworthy checkout experience.",
    ],
    fullDescription:
      "Artverse addresses one of the most critical challenges in the Indonesian art ecosystem: forgery and lack of transparency. Working directly with Head of Product Benediktus Sumarso at AssetFindr, I designed a multiplatform commerce experience that pairs artistic elegance with robust provenance verification.",
    tags: ["UI Designer", "Multiplatform", "Design System", "Art Commerce"],
    image:
      "https://framerusercontent.com/images/e1soJ6eYESGftMwI6x6GBpgDA0.png?width=1920&height=1000",
    imageWidth: 1920,
    imageHeight: 1000,
    tone: "neutral",
    featured: false,
    metrics: [
      { value: "35+", label: "Artists & Collectors Surveyed" },
      { value: "80%", label: "Experienced Forgery Awareness" },
      { value: "100%", label: "Responsive Multiplatform Design" },
    ],
    meta: {
      role: "UI Designer, Multiplatform",
      timeline: "Jan – Mar 2025",
      platform: "Responsive Web Platform",
      team: "Benediktus Sumarso (Head of Product), Falach (UI/UX)",
      impact: "Prototyped and handed off for production implementation.",
    },
    sections: [
      {
        title: "Insights from the Field & Problem Space",
        subtitle: "Addressing the rampant issue of art forgery and buyer distrust",
        content: [
          "Imagine the work of an Indonesian art maestro like Affandi being forged, as happened to his iconic painting, 'Self Portrait and His Pipe'. The Indonesian Fine Arts Lovers Association (PPSI) reports that art forgery damages artist reputations and costs billions.",
          "We surveyed 35 respondents including young artists, art lovers, and art students. 80% reported being acutely aware of forgery risks, citing lack of authenticity certificates and transparent provenance records.",
        ],
      },
      {
        title: "Crafting the Experience & Design Solutions",
        subtitle: "A balanced digital gallery where aesthetics meet trust",
        content: [
          "To gain a clearer perspective, I analyzed three core dimensions across Indonesian art commerce: product cataloging, detailed artwork authentication displays, and seamless checkout.",
          "The final Artverse experience brings together verified artist badges, high-resolution zoom views of canvas brushstrokes, and tamper-evident certificate records.",
        ],
      },
    ],
    reflection: {
      learnings: [
        "Designing for credibility: Visual hierarchy and verified provenance indicators directly influence high-ticket conversion confidence.",
        "Cross-functional handoff: Annotated Figma design tokens accelerated frontend engineering in React.",
      ],
      nextSteps: [
        "Explore blockchain-verified certificate of authenticity integration.",
        "Implement artist portfolio customization options.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
