export interface ProjectFeature {
  title: string;
  stage: "Implemented" | "In Progress" | "Planned" | "Experimental";
  description: string;
}

export interface TechStackDetail {
  category: string;
  tools: string[];
  purpose: string;
}

export interface Project {
  id: string;
  name: string;
  concept: string;
  tagline: string;
  overview: string;
  description?: string;
  problemExplored: string;
  proposedSolution: string;
  intendedUsers: string;
  intendedWorkflow?: string;
  status: "In Development" | "Experiment" | "Concept";
  statusVariant: "green" | "cyan" | "amber";
  tags: string[];
  techStackDetails: TechStackDetail[];
  features: ProjectFeature[];
  developmentChallenges: string[];
  currentStatusDetails: string;
  futureImprovements: string[];
  learningTakeaways: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "shoplens",
    name: "ShopLens",
    concept: "Product comparison and shopping research",
    tagline: "Exploring how product discovery can help users compare prices and make informed shopping decisions.",
    overview:
      "ShopLens explores how product discovery can help users compare prices, understand product information, and make more informed shopping decisions.",
    description:
      "An exploration of how product discovery can help users compare prices, understand product information, and make more informed shopping decisions. Built as an investigation into web data extraction, structured product schemas, and AI-assisted review synthesis.",
    problemExplored:
      "Shoppers frequently bounce across multiple ecommerce sites, search engines, and review forums just to verify if an item is fairly priced, in stock, or genuinely well-reviewed. Product specifications are often displayed in inconsistent formats, making apples-to-apples comparisons tedious and time-consuming.",
    proposedSolution:
      "A centralized research dashboard where users can input product links or names to retrieve clean price comparisons across stores, standardized specification tables, and impartial sentiment summaries distilled from real customer reviews.",
    intendedUsers:
      "Value-conscious online shoppers, technology enthusiasts comparing gadget specifications, and researchers studying cross-retailer pricing variations.",
    intendedWorkflow:
      "1. User inputs a product URL or search query. 2. Backend scraper extracts title, pricing, and specs. 3. Normalizer matches corresponding items across stores. 4. Frontend displays comparative price deltas and highlighted review points.",
    status: "In Development",
    statusVariant: "green",
    tags: ["Next.js", "TypeScript", "Python", "Data Extraction", "Tailwind CSS"],
    techStackDetails: [
      {
        category: "Frontend Application",
        tools: ["Next.js 16 (App Router)", "React 19", "Tailwind CSS v4", "TypeScript"],
        purpose: "Responsive comparison matrices, interactive search filters, and accessible tabular data displays.",
      },
      {
        category: "Extraction & Normalization",
        tools: ["Python", "BeautifulSoup4 / Playwright", "Regex", "Pydantic"],
        purpose: "Extracting structured product attributes (model, storage, color, price) from raw ecommerce DOM trees.",
      },
      {
        category: "Review Synthesis (Exploratory)",
        tools: ["LLM API (OpenAI / Gemini SDK)"],
        purpose: "Prototyping concise pros and cons summaries based on sample user reviews.",
      },
    ],
    features: [
      {
        title: "Searching for matching products across stores",
        stage: "In Progress",
        description: "Initial URL parsing and query matching for sample consumer electronics across two mock retailer structures.",
      },
      {
        title: "Comparing prices and product information",
        stage: "In Progress",
        description: "Visual price delta computation and side-by-side specification alignment for normalized hardware fields.",
      },
      {
        title: "Summarizing genuine customer reviews",
        stage: "Planned",
        description: "Prompt pipeline designed to filter out promotional noise and highlight recurring product durability issues.",
      },
      {
        title: "Exploring independent ecommerce and Shopify stores",
        stage: "Planned",
        description: "Extending scrapers to handle standard Schema.org microdata and Shopify storefront endpoints.",
      },
    ],
    developmentChallenges: [
      "Handling dynamic client-rendered JavaScript on modern ecommerce pages without incurring excessive latency.",
      "Reconciling slight naming differences (e.g. 'Space Gray 256GB' vs '256 GB - Space Grey') into a canonical product identity.",
      "Respecting retailer robots.txt policies, preventing aggressive rate limits, and caching results responsibly.",
    ],
    currentStatusDetails:
      "Currently in active prototype development. The frontend comparison view and initial Python metadata extractor exist in local experimentation. Cross-store linking is being tested on isolated sample datasets.",
    futureImprovements: [
      "Historical price tracking graphs to visualize price trends over 30/60/90 days.",
      "Browser extension companion to trigger comparisons directly while browsing retail sites.",
      "Exporting structured comparisons to PDF or Markdown for purchasing research notes.",
    ],
    learningTakeaways: [
      "Designing responsive comparison layouts in React that do not break on narrow mobile viewports.",
      "Structuring resilient extraction pipelines with error fallbacks when website DOM structures update.",
      "Understanding the trade-offs between server-side web scraping and official retailer API feeds.",
    ],
    githubUrl: "https://github.com/Ahmad-Haassan",
  },
  {
    id: "jarvis",
    name: "Jarvis AI Assistant",
    concept: "AI-powered desktop assistant and local OS automation",
    tagline: "A hands-free desktop assistant focused on voice recognition, acoustic parsing, and automating developer computer workflows.",
    overview:
      "Jarvis is an intelligent local desktop assistant focused on voice interaction, developer shortcuts, and automating everyday system tasks.",
    description:
      "Jarvis explores how local speech recognition, text-to-speech audio feedback, and native OS automation can eliminate repetitive developer setups and daily computer friction.",
    problemExplored:
      "Everyday computer use involves repetitive micro-actions: opening specific directories, arranging windows, launching dev servers, and managing meeting notes. Existing desktop assistants are either too rigid (fixed keywords) or too cloud-heavy without direct control over local developer tools.",
    proposedSolution:
      "A lightweight local desktop utility pairing voice trigger recognition with a custom shortcut runner, allowing users to execute local terminal commands, launch application profiles, and receive spoken audio confirmations.",
    intendedUsers:
      "Developers, students, and power users who prefer keyboard/voice orchestration to streamline repetitive workspace setup routines.",
    intendedWorkflow:
      "1. User speaks a command phrase (e.g., 'start study session'). 2. Acoustic model transcribes audio locally. 3. Command mapper validates the intent against allowed system scripts. 4. Workflow engine executes the tasks and returns audio/visual feedback.",
    status: "Experiment",
    statusVariant: "cyan",
    tags: ["Python", "Speech Recognition", "OS Automation", "AI API", "PyQt / Desktop"],
    techStackDetails: [
      {
        category: "Voice Input & Acoustic Processing",
        tools: ["Python speech_recognition", "PyAudio", "Whisper API (Planned)"],
        purpose: "Capturing microphone audio buffers, detecting voice activity, and converting speech to text tokens.",
      },
      {
        category: "System Automation & Shortcuts",
        tools: ["Python subprocess", "pyautogui", "pynput"],
        purpose: "Simulating keyboard macros, managing active window processes, and launching local shell scripts.",
      },
      {
        category: "Audio Feedback",
        tools: ["pyttsx3 (Text-to-Speech)"],
        purpose: "Generating low-latency, offline synthesized voice confirmations without cloud roundtrips.",
      },
    ],
    features: [
      {
        title: "Voice command capture & acoustic parsing",
        stage: "Experimental",
        description: "Captures microphone input and transcribes common short phrases in quiet indoor testing conditions.",
      },
      {
        title: "System hotkey & application launching shortcuts",
        stage: "In Progress",
        description: "Mapping discrete voice keywords to system subprocess calls that open code editors, browsers, or terminals.",
      },
      {
        title: "Text-to-speech interaction feedback",
        stage: "Experimental",
        description: "Offline audio feedback using pyttsx3 confirming command receipt and status updates.",
      },
      {
        title: "Chained workflow automation routines",
        stage: "Planned",
        description: "Scripting multi-step recipes (e.g., open terminal, cd to project, run git pull, launch npm dev).",
      },
    ],
    developmentChallenges: [
      "Minimizing background noise interference when running microphone capture while media is playing.",
      "Keeping speech recognition latency under 800ms on local CPU hardware without consuming excessive battery.",
      "Preventing unsafe shell command execution by enforcing a strict allowlist of pre-defined system actions.",
    ],
    currentStatusDetails:
      "Experimental prototype. Simple voice-triggered app launching and text-to-speech confirmations work on local development machines. Chained macro automations and contextual intent recognition are in the research and testing phase.",
    futureImprovements: [
      "Local quantized small language model for zero-latency offline command intent extraction.",
      "System tray UI companion showing active background listening status and recent logs.",
      "Customizable JSON configuration file for user-defined voice-to-script macros.",
    ],
    learningTakeaways: [
      "Managing Python threading to prevent voice recognition loops from freezing GUI interfaces.",
      "Handling operating system differences in subprocess and window management.",
      "Designing conversational micro-interactions where feedback is concise rather than verbose.",
    ],
    githubUrl: "https://github.com/Ahmad-Haassan",
  },
  {
    id: "whatsapp-automation",
    name: "WhatsApp Business Automation",
    concept: "Business messaging and workflow automation",
    tagline: "Exploring how messaging workflows and AI-assisted responses could help businesses handle routine communication.",
    overview:
      "This project explores how messaging automation and AI-assisted responses could help businesses manage routine communication.",
    description:
      "WhatsApp Business Automation explores webhook-driven customer routing, automated FAQ answers, and message orchestration for small businesses.",
    problemExplored:
      "Small business owners and service freelancers spend hours answering identical inquiries: store hours, pricing lists, booking availability, and order status. Manual messaging delays lead to frustrated customers and lost sales opportunities.",
    proposedSolution:
      "A webhook-driven messaging automation service that ingests customer messages, identifies intent, automatically dispatches standardized answers to frequent questions, and escalates complex queries to human operators.",
    intendedUsers:
      "Small online store owners, service businesses (salons, clinics, tutors), and support teams receiving high volumes of repetitive inquiries.",
    intendedWorkflow:
      "1. Customer sends WhatsApp message. 2. Webhook triggers backend endpoint with payload. 3. Parser checks for keywords or matches intent. 4. If recognized, auto-reply is formatted and queued via Cloud API; otherwise flagged for review.",
    status: "Concept",
    statusVariant: "amber",
    tags: ["Node.js", "Webhooks", "API Integration", "Workflow Logic", "JSON Schema"],
    techStackDetails: [
      {
        category: "Webhook Server & Routing",
        tools: ["Node.js", "Express / FastAPI", "Crypto (HMAC verification)"],
        purpose: "Validating webhook verification handshakes, authenticating payloads, and processing incoming message events.",
      },
      {
        category: "Workflow & Intent Engine",
        tools: ["JSON Schema", "State Machine Logic", "Keyword Matching"],
        purpose: "Determining whether a message is an FAQ, a booking request, or an urgent support request.",
      },
      {
        category: "Messaging API",
        tools: ["WhatsApp Business Cloud API (Meta Graph API)"],
        purpose: "Sending templated interactive buttons and transactional confirmation messages within official 24h windows.",
      },
    ],
    features: [
      {
        title: "Incoming message webhook ingestion & validation",
        stage: "In Progress",
        description: "Testing local webhook endpoint with mock Meta Graph API payloads and verifying sha256 signatures.",
      },
      {
        title: "Keyword & intent-based reply routing",
        stage: "Planned",
        description: "Matching standard inquiry queries ('price', 'hours', 'location') to pre-approved reply templates.",
      },
      {
        title: "Template-based notification dispatch",
        stage: "Planned",
        description: "Formatting interactive reply buttons (e.g. 'View Menu', 'Talk to Human') according to API guidelines.",
      },
      {
        title: "Contextual business FAQ response generation",
        stage: "Planned",
        description: "Exploring guardrailed AI responses grounded exclusively in an uploaded business knowledge document.",
      },
    ],
    developmentChallenges: [
      "Navigating Meta's strict verification requirements, business account setup, and template approval guidelines.",
      "Ensuring message processing is idempotent so network retries do not send duplicate auto-replies to customers.",
      "Designing a safe fallback architecture so AI never invents business policies or incorrect pricing.",
    ],
    currentStatusDetails:
      "Concept and architectural research phase. Webhook reception and JSON signature verification have been tested locally via ngrok. Live WhatsApp Business Cloud API integration and automated AI replies remain planned future milestones.",
    futureImprovements: [
      "Admin dashboard to view active conversations, unhandled queries, and customer satisfaction rates.",
      "Integration with Google Calendar or Calendly for direct appointment scheduling inside chat.",
      "Custom analytics showing top asked customer questions and average response times.",
    ],
    learningTakeaways: [
      "Understanding webhook architecture, signature verification, and HTTP handshake contracts.",
      "Designing conversational workflows that respect API rate limits and strict messaging windows.",
      "Recognizing the ethical necessity of clearly disclosing automated bots versus human communication.",
    ],
  },
];
