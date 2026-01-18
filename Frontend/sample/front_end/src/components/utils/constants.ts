// 🔹 App Info
export const APP_NAME = "CrisisTruth AI";
export const APP_TAGLINE = "Fighting misinformation with AI during crises";

// 🔹 API Base URL
export const API_BASE_URL = "http://localhost:5000/api";

// 🔹 Routes
export const ROUTES = {
  DASHBOARD: "/",
  FAKE_NEWS: "/fake-news",
  REAL_NEWS: "/real-news",
  CHATBOT: "/chatbot",
};

// 🔹 News Types
export const NEWS_TYPE = {
  FAKE: "FAKE",
  REAL: "REAL",
} as const;

// 🔹 Platform Types
export const PLATFORMS = [
  "WhatsApp",
  "Facebook",
  "X (Twitter)",
  "Instagram",
  "YouTube",
  "News Website",
];

// 🔹 Chart Colors
export const CHART_COLORS = {
  FAKE: "#dc2626",
  REAL: "#16a34a",
  PRIMARY: "#2563eb",
  WARNING: "#f59e0b",
};

// 🔹 Chatbot Defaults
export const CHATBOT_DEFAULT_MESSAGE =
  "Hi 👋 I’m CrisisTruth AI. Paste a news text or URL to verify.";

// 🔹 Pagination
export const ITEMS_PER_PAGE = 10;
