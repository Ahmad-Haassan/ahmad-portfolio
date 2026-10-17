import { PROJECTS, Project } from "./projects";

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    status: "Learning" | "Practicing" | "Used in Projects";
    description: string;
    icon?: string;
  }[];
}

export interface PortfolioKnowledge {
  name: string;
  role: string;
  status: string;
  tagline: string;
  introduction: string;
  education: {
    degree: string;
    institution: string;
    status: string;
    focus: string[];
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
  skills: SkillCategory[];
  learningJourney: {
    step: string;
    title: string;
    description: string;
  }[];
  projects: Project[];
  faqs: {
    question: string;
    keywords: string[];
    answer: string;
    relatedLink?: string;
    relatedLinkLabel?: string;
  }[];
}

export const PORTFOLIO_DATA: PortfolioKnowledge = {
  name: "Ahmad Hassan",
  role: "Computer Science Student | Aspiring AI & Automation Developer",
  status: "Currently learning and building",
  tagline: "FROM IDEA TO APPLICATION.",
  introduction:
    "I'm a Computer Science student interested in AI, automation, and software development. I enjoy exploring new technologies, experimenting with ideas, and turning what I learn into practical projects. My goal is to build useful digital products while developing strong engineering and problem-solving skills.",
  education: {
    degree: "Bachelor of Science in Computer Science (BSCS)",
    institution: "Undergraduate Student",
    status: "In Progress",
    focus: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Operating Systems & Networks",
      "Software Engineering Principles",
      "Artificial Intelligence Fundamentals",
    ],
  },
  contact: {
    email: "ahmad.hassan.dev@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    location: "Pakistan (Remote / Worldwide)",
  },
  skills: [
    {
      title: "Programming",
      description: "Core languages used for coursework, algorithms, and local automation scripts.",
      skills: [
        {
          name: "C++",
          status: "Used in Projects",
          description: "Data structures, memory fundamentals, object-oriented concepts, and algorithmic problem solving.",
        },
        {
          name: "Python",
          status: "Used in Projects",
          description: "Scripting, web data extraction, automation routines, and experimenting with AI libraries.",
        },
      ],
    },
    {
      title: "Web Development",
      description: "Front-end and full-stack tools for building modern, responsive web interfaces.",
      skills: [
        {
          name: "HTML",
          status: "Used in Projects",
          description: "Semantic page structure, accessibility standards, and clean DOM markup.",
        },
        {
          name: "CSS",
          status: "Used in Projects",
          description: "Responsive layouts, Tailwind CSS utilities, flexbox, grid, and subtle micro-animations.",
        },
        {
          name: "JavaScript",
          status: "Used in Projects",
          description: "Core asynchronous programming, DOM event listeners, and ES6+ modern language features.",
        },
        {
          name: "TypeScript",
          status: "Practicing",
          description: "Type safety, custom interfaces, generic components, and catching bugs at compile time.",
        },
        {
          name: "Next.js",
          status: "Practicing",
          description: "App Router conventions, server/client component boundaries, and static page generation.",
        },
      ],
    },
    {
      title: "Development Tools",
      description: "Day-to-day workflow utilities for version control, code editing, and productivity.",
      skills: [
        {
          name: "Git",
          status: "Used in Projects",
          description: "Branching, committing, merge conflict resolution, and maintaining clean git histories.",
        },
        {
          name: "GitHub",
          status: "Used in Projects",
          description: "Remote repositories, open-source code hosting, issue tracking, and GitHub Actions.",
        },
        {
          name: "Visual Studio Code",
          status: "Used in Projects",
          description: "Daily development environment, debugging configurations, and productivity extensions.",
        },
        {
          name: "AI-Assisted Coding Tools",
          status: "Practicing",
          description: "Pair programming with AI assistants, prompt engineering for refactoring, and code analysis.",
        },
      ],
    },
  ],
  learningJourney: [
    {
      step: "01",
      title: "Learning programming fundamentals",
      description:
        "Building a solid base in computer science: data structures, object-oriented design, algorithmic complexity, and foundational languages like C++ and Python.",
    },
    {
      step: "02",
      title: "Exploring web development",
      description:
        "Mastering modern web fundamentals with HTML, CSS, JavaScript, and advancing to React, TypeScript, and the Next.js App Router for responsive digital products.",
    },
    {
      step: "03",
      title: "Experimenting with AI and automation",
      description:
        "Investigating speech recognition, webhook architectures, task automation scripts, and integrating language model APIs into practical workflows.",
    },
    {
      step: "04",
      title: "Building practical software projects",
      description:
        "Applying knowledge to real projects like ShopLens (product research), Flexivo (desktop automation), and WhatsApp Business Automation.",
    },
    {
      step: "05",
      title: "Improving, testing, and deploying applications",
      description:
        "Refining user experience, testing edge cases, optimizing build performance, and gathering feedback to continuously iterate and improve.",
    },
  ],
  projects: PROJECTS,
  faqs: [
    {
      question: "Tell me about Ahmad.",
      keywords: ["about", "ahmad", "who", "background", "bio", "intro", "student"],
      answer:
        "Ahmad Hassan is a Computer Science undergraduate student exploring AI, automation, and software engineering. He focuses on learning by building—turning theoretical CS concepts into practical digital projects like ShopLens, Flexivo, and WhatsApp Business Automation. He is currently based in Pakistan and open to remote collaboration.",
      relatedLink: "#about",
      relatedLinkLabel: "View About Me Section",
    },
    {
      question: "What projects has he explored?",
      keywords: ["projects", "works", "built", "portfolio", "experiments"],
      answer:
        "Ahmad is actively working on three core project concepts: (1) ShopLens — an exploration into cross-store product comparison and shopping research; (2) Flexivo — an experimental AI desktop assistant focused on voice interaction and workflow automation; and (3) WhatsApp Business Automation — a concept exploring webhook-driven messaging and routine customer query handling.",
      relatedLink: "#projects",
      relatedLinkLabel: "Explore Projects Section",
    },
    {
      question: "What technologies does he use?",
      keywords: ["technologies", "tech", "skills", "stack", "languages", "tools", "c++", "python", "next.js"],
      answer:
        "Ahmad's explored stack includes: Programming in C++ and Python; Web Development with HTML, CSS, JavaScript, TypeScript, and Next.js; and Development Tools including Git, GitHub, VS Code, and AI-assisted programming tools. He focuses on building practical working knowledge rather than claiming unverified expert scores.",
      relatedLink: "#skills",
      relatedLinkLabel: "View Tools & Skills Section",
    },
    {
      question: "Tell me about ShopLens.",
      keywords: ["shoplens", "shopping", "ecommerce", "price", "comparison"],
      answer:
        "ShopLens is an in-development project exploring how product discovery can help online shoppers compare prices across stores, understand complex specifications, and read synthesized review summaries. It's built with Next.js, TypeScript, and Python web data extraction.",
      relatedLink: "/projects/shoplens",
      relatedLinkLabel: "Open ShopLens Case Study",
    },
    {
      question: "What is Flexivo?",
      keywords: ["flexivo", "assistant", "voice", "desktop", "shortcuts"],
      answer:
        "Flexivo is an experimental desktop assistant concept combining voice command parsing with local operating system automation shortcuts. It investigates speech recognition, application hotkeys, and text-to-speech audio feedback to eliminate repetitive daily computer tasks.",
      relatedLink: "/projects/flexivo",
      relatedLinkLabel: "Open Flexivo Case Study",
    },
    {
      question: "Tell me about WhatsApp Business Automation.",
      keywords: ["whatsapp", "automation", "messaging", "webhook", "business"],
      answer:
        "WhatsApp Business Automation is a conceptual workflow project exploring how webhook event processing and AI-assisted responses can help small businesses handle routine customer inquiries, FAQs, and scheduled notifications.",
      relatedLink: "/projects/whatsapp-automation",
      relatedLinkLabel: "Open WhatsApp Automation Case Study",
    },
    {
      question: "How can I contact him?",
      keywords: ["contact", "email", "reach", "hire", "message", "collaborate", "linkedin", "github"],
      answer:
        "You can reach Ahmad directly via email at ahmad.hassan.dev@gmail.com, or connect with him on GitHub and LinkedIn. You can also open the Connect transmission dialog right here on the site.",
      relatedLink: "#contact",
      relatedLinkLabel: "Open Contact Dialog",
    },
  ],
};
