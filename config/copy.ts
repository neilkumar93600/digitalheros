// DevOS AI - Marketing/Landing Copy (single source of truth)
// Source-of-truth for any coded text used on marketing landing page.

export const COPY = {
  common: {
    appName: "DevOS AI",
    navProduct: "DevOS AI",
    navPricing: "Pricing",
    navBlog: "Blog",
    navChangelog: "Changelog",
    ctaPrimary: "Create free account",
    ctaSecondary: "See how it works",
    ctaTertiary: "Get started",
    legalAllRightsReserved: "All rights reserved.",
  },
  landing: {
    hero: {
      label: "AI work execution platform",
      headline: "The AI workspace where developers ship.",
      subheadline:
        "Turn natural language goals into real, production-quality outputs: code files, zipped projects, DOCX reports, and pitch-ready decks - all in a persistent workspace.",
      primaryCta: "Create your first workspace",
      secondaryCta: "Explore the platform",
      heroNote: "No copy-paste chaos. Generate outputs you can download and use immediately.",
    },
    demo: {
      label: "Output-first workflow",
      title: "From prompt to downloadable deliverables.",
      description:
        "DevOS turns your goal into a complete, usable output. When you need code, you download a project ZIP. When you need documents, you get ready-to-edit DOCX and PDFs.",
    },
    terminalAnimation: {
      title: "Terminal Demo",
      prompt: "devosai@workspace:~$ generate a REST API with JWT",
      okLabel: "[OK]",
      step1: "creating file manifest...",
      step2: "packaging ZIP for download...",
      streamingPrefix: "streaming output",
      cursorChar: "_",
    },
    features: {
      label: "What you get",
      title: "Everything you ship with AI.",
      items: [
        {
          title: "Real file generation",
          description: "Generate ZIP projects, DOCX docs, PPTX decks, PDFs, and READMEs - not just chat text.",
        },
        {
          title: "Persistent project memory",
          description: "DevOS remembers your stack, decisions, and preferences so each new session continues seamlessly.",
        },
        {
          title: "Multi-model routing",
          description: "Choose the right model for the job - fast, long-form reasoning, and complex architecture when needed.",
        },
        {
          title: "Prompt skills library",
          description: "Use proven templates like scaffold-project, write-prd, api-docs, and pitch-deck to move faster.",
        },
        {
          title: "Web search (with citations)",
          description: "When enabled, DevOS can look up current docs and facts to reduce outdated answers.",
        },
        {
          title: "Built for builders",
          description: "Designed like a developer IDE: focus, density, and \"output-first\" workflows.",
        },
      ],
    },
    skillsShowcase: {
      label: "Prompt skills library",
      title: "Templates that keep you moving.",
      description:
        "Use proven skill templates to jumpstart complex work: scaffold-project, api-builder, write-prd, api-docs, and pitch-deck.",
      items: [
        "scaffold-project",
        "api-builder",
        "write-prd",
        "write-trd",
        "api-docs",
        "pitch-deck",
      ],
    },
    models: {
      label: "Choose your model",
      title: "Use the best model for your task.",
      items: [
        {
          key: "llama-3.3",
          name: "Llama 3.3",
          tier: "Free",
          description: "Great for quick tasks and learning - fast and reliable.",
        },
        {
          key: "gemini-2.0-flash",
          name: "Gemini 2.0 Flash",
          tier: "Starter+",
          description: "Fast general coding and iteration for everyday builds.",
        },
        {
          key: "claude-sonnet-4-5",
          name: "Claude Sonnet 4.5",
          tier: "Pro+",
          description: "Long documents and complex reasoning for deep work.",
        },
        {
          key: "gpt-4o",
          name: "GPT-4o",
          tier: "Pro+",
          description: "Strong for architecture and end-to-end engineering outputs.",
        },
      ],
    },
    pricing: {
      label: "Pricing plans",
      title: "Pricing built for builders.",
      subtitle:
        "Start free. Upgrade when you want unlimited files, more models, and longer project memory.",
      plans: [
        {
          key: "free",
          name: "Free",
          price: "₹0",
          tagline: "Learn and test DevOS.",
          badge: "Free",
          cta: "Start free",
          bullets: [
            "30 AI messages per month",
            "3 workspaces",
            "ZIP code projects only",
            "Llama 3.3 model",
            "7-day project memory retention",
          ],
        },
        {
          key: "starter",
          name: "Starter",
          price: "₹1,599/mo",
          tagline: "Ship deliverables faster.",
          badge: "Starter",
          cta: "Upgrade to Starter",
          bullets: [
            "500 AI messages per month",
            "10 workspaces",
            "ZIP + DOCX + PDF",
            "Add Gemini Flash model",
            "30-day project memory retention",
            "Web search enabled",
          ],
        },
        {
          key: "pro",
          name: "Pro",
          price: "₹3,299/mo",
          tagline: "Unlimited building.",
          badge: "Pro",
          cta: "Go Pro",
          bullets: [
            "Unlimited AI messages",
            "Unlimited workspaces",
            "All file formats (ZIP, DOCX, PPTX, PDF)",
            "All 4 models enabled",
            "Unlimited project memory",
          ],
        },
        {
          key: "team",
          name: "Team",
          price: "₹8,299/mo",
          tagline: "Shared work, faster outcomes.",
          badge: "Team",
          cta: "Join Team",
          bullets: [
            "Unlimited AI messages",
            "Unlimited shared workspaces",
            "All file formats",
            "All 4 models enabled",
            "Up to 10 team members",
          ],
        },
      ],
    },
    testimonials: {
      label: "Social proof",
      title: "Trusted by builders who ship.",
      items: [
        {
          quote: "DevOS feels like my IDE's output engine. I go from prompt to downloadable deliverables without context switching.",
          name: "Arjun",
          role: "Indie Developer",
        },
        {
          quote:
            "The persistent memory is the difference. Every new session continues where I left off - no re-explaining my stack.",
          name: "Sara",
          role: "Solo SaaS Founder",
        },
        {
          quote:
            "I love that it generates real files. DOCX and pitch decks are instantly useful for client work and investor updates.",
          name: "Maya",
          role: "CS Student",
        },
      ],
    },
    cta: {
      headline: "Ship faster. Output more.",
      subheadline:
        "Create your first workspace and generate your next deliverable in minutes - with persistent context and multi-model control.",
      primaryCta: "Create free account",
      secondaryCta: "See pricing",
    },
  },
} as const

