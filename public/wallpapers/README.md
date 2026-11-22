# Background Wallpapers

These JPEG assets are local copies of the Unsplash technology photographs listed
in `src/components/DynamicBackground.jsx`. Each filename preserves its source
photo identifier. The source is `https://images.unsplash.com/<photo-id>`.

There are 13 photographs, each in 960px and 1920px widths, encoded as JPEG at
quality 75. The site requests only its current and next wallpaper initially;
the complete collection is not downloaded by each visitor on arrival.

The original `photo-1531297424006-db5118fe5b96` URL returned HTTP 404 on
22 November 2026. Its slot uses the available technology photograph
`photo-1531297484001-80022131f5a1` instead. The remaining 12 sources are unchanged.

Local serving avoids runtime dependence on the image CDN. Keep these files in
the deployment's public assets; do not replace them with generated project evidence.
