import { useEffect, useState } from "react";
import { IG_SNAPSHOT, InstagramSnapshot, Reel } from "../../data";

export interface InstagramData extends InstagramSnapshot {
  posts: string | null;
  /** True once /api/instagram has returned Graph API data. */
  live: boolean;
}

const FALLBACK: InstagramData = { ...IG_SNAPSHOT, posts: null, live: false };

interface ApiReel {
  code: string;
  permalink: string;
  cover: string | null;
  caption: string;
}

interface ApiResponse {
  configured: boolean;
  followers?: string;
  following?: string;
  posts?: string;
  reels?: ApiReel[];
}

let cache: InstagramData = FALLBACK;
let inFlight: Promise<InstagramData> | null = null;

function load(): Promise<InstagramData> {
  if (inFlight) return inFlight;

  inFlight = fetch("/api/instagram")
    .then((res) => (res.ok ? (res.json() as Promise<ApiResponse>) : null))
    .then((body) => {
      if (!body?.configured || !body.reels?.length) return FALLBACK;

      // Keep a committed cover as the fallback image for each slot, so a reel
      // whose Graph thumbnail 404s still renders something.
      const reels: Reel[] = body.reels.map((reel, i) => ({
        code: reel.code,
        views: IG_SNAPSHOT.reels[i]?.views ?? "",
        cover: reel.cover ?? IG_SNAPSHOT.reels[i]?.cover ?? "",
        caption: reel.caption,
      }));

      cache = {
        ...IG_SNAPSHOT,
        followers: body.followers ?? IG_SNAPSHOT.followers,
        following: body.following ?? IG_SNAPSHOT.following,
        posts: body.posts ?? null,
        reels,
        live: true,
      };
      return cache;
    })
    .catch(() => FALLBACK);

  return inFlight;
}

export function useInstagram(): InstagramData {
  const [data, setData] = useState<InstagramData>(cache);

  useEffect(() => {
    let active = true;
    load().then((next) => active && setData(next));
    return () => {
      active = false;
    };
  }, []);

  return data;
}
