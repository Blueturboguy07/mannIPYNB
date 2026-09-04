import { useEffect, useState } from "react";
import { GITHUB_USER, Repo, SEED_REPOS, SEED_TOTALS } from "../../data";

export interface RepoData {
  featured: Repo[];
  totalRepos: number;
  totalStars: number;
  live: boolean;
}

const SEED: RepoData = {
  featured: SEED_REPOS,
  totalRepos: SEED_TOTALS.repos,
  totalStars: SEED_TOTALS.stars,
  live: false,
};

const FEATURED_COUNT = 6;

interface ApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  license: { spdx_id: string | null } | null;
  topics?: string[];
  pushed_at: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
}

/** GitHub labels a licence it cannot map to an SPDX id as "Other", not "NOASSERTION". */
function normalizeLicense(spdxId: string | null | undefined): string | null {
  if (!spdxId) return null;
  return spdxId === "NOASSERTION" ? "Other" : spdxId;
}

/**
 * Module-level cache so the stdout line and the rendered cards in the same
 * notebook cell agree, and so we only hit the (unauthenticated, 60/hr) GitHub
 * API once per page load. Falls back to the committed snapshot on any failure.
 */
let cache: RepoData = SEED;
let inFlight: Promise<RepoData> | null = null;
const listeners = new Set<(data: RepoData) => void>();

function load(): Promise<RepoData> {
  if (inFlight) return inFlight;

  inFlight = fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
    { headers: { Accept: "application/vnd.github+json" } }
  )
    .then((res) => {
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      return res.json() as Promise<ApiRepo[]>;
    })
    .then((raw) => {
      const own = raw.filter((r) => !r.fork && !r.archived);
      if (own.length === 0) throw new Error("no repositories returned");

      const mapped: Repo[] = own.map((r) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        license: normalizeLicense(r.license?.spdx_id),
        topics: r.topics ?? [],
        pushedAt: r.pushed_at,
        homepage: r.homepage,
      }));

      const featured = mapped
        .filter((r) => r.description)
        .sort((a, b) => b.stars - a.stars)
        .slice(0, FEATURED_COUNT);

      const data: RepoData = {
        featured: featured.length ? featured : SEED.featured,
        totalRepos: mapped.length,
        totalStars: mapped.reduce((sum, r) => sum + r.stars, 0),
        live: true,
      };
      cache = data;
      listeners.forEach((fn) => fn(data));
      return data;
    })
    .catch(() => SEED);

  return inFlight;
}

export function useRepos(): RepoData {
  const [data, setData] = useState<RepoData>(cache);

  useEffect(() => {
    let active = true;
    const listener = (next: RepoData) => active && setData(next);
    listeners.add(listener);
    load().then((next) => active && setData(next));
    return () => {
      active = false;
      listeners.delete(listener);
    };
  }, []);

  return data;
}
