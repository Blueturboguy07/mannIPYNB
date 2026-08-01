export const GITHUB_USER = "Blueturboguy07";
export const IG_USERNAME = "mann.ascends";

export const LINKS = {
  github: `https://github.com/${GITHUB_USER}`,
  linkedin: "https://www.linkedin.com/in/mannbellani/",
  instagram: `https://www.instagram.com/${IG_USERNAME}/`,
};

/* ------------------------------------------------------------------ *
 * Experience — content mirrors linkedin.com/in/mannbellani 1:1.
 * Dates are stored as YYYY-MM and the "Mon YYYY - Mon YYYY · N mos"
 * labels are derived, so durations never go stale the way pasted ones do.
 * ------------------------------------------------------------------ */

export interface Position {
  title: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null for a current role. */
  end: string | null;
  location?: string;
  employmentType?: string;
  description?: string;
}

export interface Experience extends Position {
  organization: string;
  /** A single employer with several successive titles, as LinkedIn groups them. */
  positions?: Position[];
}

export const EXPERIENCE: Experience[] = [
  {
    title: "Tech/Startup Creator",
    organization: "Instagram",
    employmentType: "Full-time",
    start: "2025-12",
    end: null,
    description:
      "document personal progress, share my takes, and kill AI slop. 50k+ followers, 20M+ views",
  },
  {
    title: "Outreach+Logistics",
    organization: "Texas A&M Computing Society",
    start: "2025-10",
    end: null,
    location: "Bryan-College Station, Texas, United States",
  },
  {
    title: "Founder",
    organization: "Organize Campus",
    employmentType: "Full-time",
    start: "2026-01",
    end: "2026-06",
    location: "College Station, Texas, United States",
    description:
      "built+grew campus org-management app to 2000+ users and ended up pursuing another venture",
  },
  {
    title: "Research Intern (Brain Networks Lab)",
    organization:
      "Department of Computer Science and Engineering Texas A&M University",
    start: "2025-09",
    end: "2026-01",
    description:
      "custom neural network architectures to study adaptive tool manipulation. built simulation pipelines and visualizations to interpret sensorimotor learning",
  },
  {
    title: "Data Analyst",
    organization: "Southwest Airlines",
    start: "2025-10",
    end: "2025-12",
    description:
      "worked with teams to provide customer-facing standardized weather delay likelihood score",
  },
  {
    title: "",
    organization: "Code Ninjas",
    employmentType: "Part-time",
    start: "2023-06",
    end: "2025-05",
    location: "Frisco, Texas, United States",
    positions: [
      {
        title: "Lead Coding Sensei",
        start: "2024-06",
        end: "2025-05",
        description: "led summer camps and taught kids coding",
      },
      {
        title: "Coding Sensei",
        start: "2023-06",
        end: "2024-06",
        location: "On-site",
        description: "taught kids coding",
      },
    ],
  },
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseMonth(value: string): [number, number] {
  const [year, month] = value.split("-").map(Number);
  return [year, month - 1];
}

export function formatMonth(value: string): string {
  const [year, month] = parseMonth(value);
  return `${MONTH_NAMES[month]} ${year}`;
}

/** LinkedIn counts both the first and last month, so Jun 2023 - Jun 2024 is 13 mos. */
export function durationLabel(start: string, end: string | null): string {
  const [sy, sm] = parseMonth(start);
  const now = new Date();
  const [ey, em] = end ? parseMonth(end) : [now.getFullYear(), now.getMonth()];
  const months = Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;

  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export function rangeLabel(start: string, end: string | null): string {
  return `${formatMonth(start)} - ${end ? formatMonth(end) : "Present"} · ${durationLabel(
    start,
    end
  )}`;
}

/* ------------------------------------------------------------------ *
 * Open source
 * ------------------------------------------------------------------ */

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  license: string | null;
  topics: string[];
  pushedAt: string;
  homepage: string | null;
}

/**
 * Snapshot taken 2026-08-01 so the section renders instantly and still renders
 * correctly when the unauthenticated GitHub API is rate limited. Refreshed at
 * runtime by ReposOutput.
 */
export const SEED_REPOS: Repo[] = [
  {
    name: "cue",
    description:
      "Open-source macOS AI copilot that floats over your screen, sees/hears your meetings, and stays hidden from screen shares. Cluely alternative, bring-your-own-key.",
    language: "JavaScript",
    stars: 918,
    forks: 199,
    license: "GPL-3.0",
    topics: [],
    pushedAt: "2026-08-01T04:08:14Z",
    homepage: null,
  },
  {
    name: "WhimprFlow",
    description:
      "Local-first cross-platform voice dictation (proof of concept). macOS built & working; Windows built but untested.",
    language: "Rust",
    stars: 82,
    forks: 19,
    license: "MIT",
    topics: [],
    pushedAt: "2026-07-31T17:42:44Z",
    homepage: null,
  },
  {
    name: "NitroAI",
    description:
      "Free, local-first AI study notes - turn any lecture, PDF, or video into notes, flashcards, quizzes, and a study chat. Runs fully local or with your own API key.",
    language: "TypeScript",
    stars: 58,
    forks: 9,
    license: "AGPL-3.0",
    topics: [],
    pushedAt: "2026-07-31T00:55:03Z",
    homepage: null,
  },
  {
    name: "lunara",
    description:
      "Open-source, local-first cycle, fertility, pregnancy and perimenopause companion. An alternative to Flo. AGPL-3.0.",
    language: "TypeScript",
    stars: 31,
    forks: 13,
    license: "AGPL-3.0",
    topics: [],
    pushedAt: "2026-07-31T16:56:58Z",
    homepage: null,
  },
  {
    name: "freeharmony",
    description:
      "Free, open-source facial harmony analysis. Every metric free, photos never leave your device. AGPL-3.0.",
    language: "TypeScript",
    stars: 14,
    forks: 4,
    license: "AGPL-3.0",
    topics: [],
    pushedAt: "2026-07-31T18:30:20Z",
    homepage: "https://freeharmony.vercel.app",
  },
  {
    name: "noscroll",
    description:
      "Use Instagram and YouTube without short-form video. Free, open source, no paywall, no ads, no analytics.",
    language: "Swift",
    stars: 9,
    forks: 0,
    license: "AGPL-3.0",
    topics: ["ios", "android", "digital-wellbeing", "screen-time", "open-source"],
    pushedAt: "2026-07-30T17:33:27Z",
    homepage: null,
  },
];

export const SEED_TOTALS = { repos: 23, stars: 1123 };

/** github/linguist colours, verbatim. */
export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  Swift: "#F05138",
  Java: "#b07219",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#663399",
  R: "#198CE7",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
};

/* ------------------------------------------------------------------ *
 * Instagram
 * ------------------------------------------------------------------ */

export interface Reel {
  /** Instagram shortcode; also the permalink slug. */
  code: string;
  /** Play count as Instagram formats it. */
  views: string;
  cover: string;
  caption?: string;
}

export interface InstagramSnapshot {
  followers: string;
  following: string;
  fullName: string;
  bio: string[];
  reels: Reel[];
}

import reelDbdGOCKqy3q from "./assets/reels/DbdGOCKqy3q.jpg";
import reelDbb0uaiKtsJ from "./assets/reels/Dbb0uaiKtsJ.jpg";
import reelDbYA8EqCK0 from "./assets/reels/DbYA8E-qCK0.jpg";

/**
 * Snapshot read off the live profile on 2026-08-01. Replaced at runtime by
 * /api/instagram when Meta Graph API credentials are configured — see
 * api/instagram.ts.
 */
export const IG_SNAPSHOT: InstagramSnapshot = {
  followers: "57.9K",
  following: "244",
  fullName: "Mann Bellani",
  bio: ["19 | LARPslayer", "building @publikhq"],
  reels: [
    { code: "DbdGOCKqy3q", views: "70.7K", cover: reelDbdGOCKqy3q },
    { code: "Dbb0uaiKtsJ", views: "72.8K", cover: reelDbb0uaiKtsJ },
    { code: "DbYA8E-qCK0", views: "54.7K", cover: reelDbYA8EqCK0 },
  ],
};
