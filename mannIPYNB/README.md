# mannIPYNB

Personal site. Three faithful reproductions of real tools, stacked on a dark desktop:
a macOS Terminal, a JupyterLab notebook, and an instagram.com profile in a browser window.

```
npm install
npm run dev      # http://localhost:5174
npm run build
```

## Where the content comes from

| Section | Source | Refresh |
| --- | --- | --- |
| Experience | linkedin.com/in/mannbellani, transcribed 1:1 | manual — edit `EXPERIENCE` in `src/data.ts` |
| Open source | GitHub REST API, unauthenticated | automatic on page load |
| Instagram | Instagram Graph API via `/api/instagram` | automatic, hourly, **once configured** |

Experience dates are stored as `YYYY-MM` and the `Mon YYYY - Mon YYYY · N mos` labels
are computed, so durations stay correct without editing.

Both live sections ship with a committed snapshot (`SEED_REPOS`, `IG_SNAPSHOT` in
`src/data.ts`) that renders instantly and is used whenever the live call fails, so
nothing is ever blank.

## Making the Instagram numbers self-refreshing

Right now the follower count and the three reels come from the snapshot taken on
2026-09-03. The public endpoints that still return them (see below) rate limit hard and
break without notice, so keeping the numbers current on their own needs the Instagram
Graph API. `api/instagram.ts` is already written for it — it just needs two environment
variables on the Vercel project:

```
IG_USER_ID        Instagram Business/Creator account id
IG_ACCESS_TOKEN   long-lived access token for that account
```

To get them:

1. The `@mann.ascends` account must be a **Business** or **Creator** account and linked
   to a Facebook Page (Instagram app → Settings → Account type and tools).
2. Create an app at [developers.facebook.com](https://developers.facebook.com) and add
   the **Instagram** product.
3. Run the Instagram Business Login flow to get a short-lived token, then exchange it
   for a long-lived one (`GET /access_token?grant_type=ig_exchange_token`).
4. Put both values in Vercel → Project → Settings → Environment Variables and redeploy.

The route reports `configured: false` until both are set, and the client keeps using the
snapshot — so the site works exactly as it does today if you never do this.

**Long-lived tokens expire after 60 days.** Refresh with
`GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=…`
before then; a Vercel cron hitting that monthly is the usual way to automate it.

### Updating the snapshot by hand instead

Cheaper if you would rather not set up a Meta app. Two public endpoints, no auth needed.
Follower total, following, and the last 12 posts with their play counts and shortcodes:

```
curl -H "User-Agent: Instagram 219.0.0.12.117 Android" \
  "https://i.instagram.com/api/v1/users/web_profile_info/?username=mann.ascends"
```

It rate limits aggressively — a `"Please wait a few minutes"` body means try again shortly,
not that the endpoint is gone. Then the cover image for each reel you want to feature:

```
curl -L -o src/assets/reels/<shortcode>.jpg \
  "https://www.instagram.com/p/<shortcode>/media/?size=l"
sips -Z 640 src/assets/reels/<shortcode>.jpg --out src/assets/reels/<shortcode>.jpg
```

Then update `IG_SNAPSHOT` in `src/data.ts` with the new shortcodes, view counts and
follower total, formatted the way Instagram formats them (`88.5K`, `479K`), and delete the
cover files that are no longer imported.
