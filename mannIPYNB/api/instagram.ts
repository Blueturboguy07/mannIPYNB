/**
 * Live Instagram data for the profile section.
 *
 * There is no unauthenticated endpoint that returns a follower count or a
 * user's recent media, so this route uses the Instagram Graph API. It only
 * activates when both env vars are present on the deployment:
 *
 *   IG_USER_ID       the Instagram *Business/Creator* account id
 *   IG_ACCESS_TOKEN  a long-lived token for that account (60-day expiry)
 *
 * Getting those requires a Meta app and an OAuth flow that has to be done by
 * the account owner — see README. Until they are set the route reports
 * `configured: false` and the client falls back to the snapshot committed in
 * src/data.ts, so the section always renders.
 */

const GRAPH = "https://graph.instagram.com";
const FIELDS = "id,media_type,media_url,permalink,thumbnail_url,caption,timestamp";

interface GraphMedia {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default async function handler(request: Request): Promise<Response> {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;

  const json = (body: unknown, status = 200, maxAge = 0) =>
    new Response(JSON.stringify(body), {
      status,
      headers: {
        "content-type": "application/json",
        "cache-control": maxAge
          ? `public, s-maxage=${maxAge}, stale-while-revalidate=86400`
          : "no-store",
      },
    });

  if (!userId || !token) return json({ configured: false }, 200, 300);

  try {
    const [profileRes, mediaRes] = await Promise.all([
      fetch(`${GRAPH}/${userId}?fields=username,followers_count,follows_count,media_count&access_token=${token}`),
      fetch(`${GRAPH}/${userId}/media?fields=${FIELDS}&limit=25&access_token=${token}`),
    ]);

    if (!profileRes.ok || !mediaRes.ok) {
      return json({ configured: false, error: "graph request failed" }, 200, 300);
    }

    const profile = await profileRes.json();
    const media: { data: GraphMedia[] } = await mediaRes.json();

    const reels = media.data
      .filter((m) => m.media_type === "VIDEO")
      .slice(0, 3)
      .map((m) => ({
        code: m.permalink.replace(/\/$/, "").split("/").pop() ?? m.id,
        permalink: m.permalink,
        cover: m.thumbnail_url ?? m.media_url ?? null,
        caption: m.caption?.split("\n")[0]?.slice(0, 140) ?? "",
        timestamp: m.timestamp,
      }));

    return json(
      {
        configured: true,
        followers: compact(profile.followers_count ?? 0),
        following: compact(profile.follows_count ?? 0),
        posts: compact(profile.media_count ?? 0),
        reels,
      },
      200,
      // One hour at the edge: follower counts do not need to be to-the-second,
      // and the Graph API is rate limited per token.
      3600
    );
  } catch {
    return json({ configured: false, error: "unreachable" }, 200, 300);
  }
}

export const config = { runtime: "edge" };
