// DevOS AI - Site metadata configuration used across the app (SEO + auth UI).

export const siteConfig = {
  name: "DevOS AI",
  tagline: "The AI workspace where developers ship.",
  description:
    "DevOS AI is an AI-native developer workspace. Generate real code files, documents, and pitch decks - not just text. Multi-model, persistent memory, built for builders.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://devosai.com",
  twitter: "@devosai",
  og: {
    image: "/images/og-image.png",
    width: 1200,
    height: 630,
  },
  keywords: [
    "AI developer workspace",
    "multi-model AI",
    "code generation",
    "AI file generation",
    "developer tools",
    "ChatGPT alternative",
    "Claude API",
    "GPT-4o workspace",
  ],
} as const

// Backwards/compat alias: some parts of the codebase import `SITE`.
export const SITE = siteConfig

