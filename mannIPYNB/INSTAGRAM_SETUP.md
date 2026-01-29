# Instagram Reels Integration Setup

To display your most recent Instagram reels, you'll need to set up a backend endpoint that fetches data from Instagram's API.

## Option 1: Backend API Endpoint (Recommended)

Create a backend endpoint (Node.js, Python, etc.) that:

1. Uses Instagram Basic Display API or Graph API
2. Fetches your recent reels
3. Returns JSON with reel data

### Example Backend Endpoint Response:
```json
{
  "reels": [
    {
      "id": "reel_id_1",
      "url": "https://www.instagram.com/p/ABC123/",
      "thumbnail": "https://instagram.com/image.jpg",
      "embedHtml": "<blockquote>...</blockquote>"
    }
  ]
}
```

### Update the Component:
In `App.tsx`, pass the API endpoint:
```tsx
<InstagramReels username="mann.ascends" apiEndpoint="/api/instagram/reels" />
```

## Option 2: Instagram Graph API Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product
4. Get App ID and App Secret
5. Set up OAuth redirect URI
6. Generate access token

## Option 3: Use Instagram oEmbed (For Specific Reels)

If you have specific reel URLs, you can use Instagram's oEmbed API:
```
https://api.instagram.com/oembed?url=REEL_URL
```

## Quick Start (Without Backend)

For now, the component shows placeholder reels. To add real reels:

1. Get your reel URLs from Instagram
2. Update the `getPlaceholderReels()` function with actual URLs
3. Or set up a backend endpoint as described above

