# Portfolio Next Steps

Updated: 22 November 2026, Asia/Colombo.

## Current Handoff

1. Finish shared-counter configuration for the chatbot before deploying the protection changes. See `docs/chatbot.md`.
2. Confirm the contact-form behavior with a deliberate test enquiry when Udara is available. Do not send unsolicited test emails.
3. Review today's local implementation in `http://127.0.0.1:5180/`. Wallpaper reliability and the remaining dependency audit findings are now fixed locally.
4. Browser checks cover six viewport sizes in both themes, plus desktop/mobile workflows. Real-phone and Safari verification remain pending.

Implemented locally on 22 November: optional enquiry metadata and service prefill, a compact animated process strip, six initial featured cards with all nine retained, a text-based review carousel, staged local wallpaper loading, lazy-loaded chat formatting and secondary pages, keyboard/mobile fixes, and search/social assets. Follow-up: wallpapers are bundled with the site, unavailable images are skipped, stalled loads time out, review visibility tracking is corrected, and Zod is patched without downgrading Blob. No account, deployment, email delivery, or production Redis verification has been performed.

This is the current forward plan. `PORTFOLIO_IMPLEMENTATION_PLAN.md` remains the older historical plan; its earlier counts, hidden-role notes, and completed phases may no longer describe the current application.

## Non-Negotiable Boundaries

- Keep the approved hero wording, left-text/right-portrait layout, purple theme, and glass surfaces.
- Preserve rotating wallpapers, stars, meteors, floating skill/service icons, and existing animations. Do not remove or reduce the normal visual motion experience.
- Optimizations must preserve the visible effects. Respect explicit accessibility preferences without stripping animation for everyone.
- Keep the website compact. Prefer replacing or restructuring existing content over adding tall sections.
- Keep the OpenAI chatbot, existing starter questions, transparency, outside-click minimization, and preserved conversation.
- Do not require visitors to log in or show the private Upwork profile link, earnings, rates, or hours.
- No n8n workflow is required for the portfolio contact flow. Defer lead-routing automations.
- Do not remove projects, skills, credentials, or approved experience content. Keep hidden items hidden.
- Do not invent client quotes, names, companies, results, or metrics. Publication permission matters.
- Missing project-gallery images are deferred; Udara will provide them later. Do not add placeholder or generated evidence.
- Do not open project screenshots to decide thumbnails; use filenames when later media work is requested.
- No deployment, account creation, subscription, purchase, or commit/push without authorization.

## Status Legend

- `[x]` Implemented and locally checked.
- `[ ]` Pending implementation or verification.
- `[!]` Requires configuration, user content, or approval.

## Stage 1: Protect The Working Chatbot

### Local implementation

- [x] Enforce 50 requests per visitor IP per UTC day.
- [x] Add 5 requests per IP per minute against bursts.
- [x] Add a configurable site-wide cap of 200 provider attempts per UTC day.
- [x] Count reservations before calling OpenAI, including provider failures, without refund races.
- [x] Return readable 429 responses, `Retry-After`, and a contact alternative.
- [x] Preserve message/history size restrictions and adaptive 700/1,600 output-token limits.
- [x] Implement atomic shared Redis reservations for deployment and isolated process-memory counters for local development only.
- [x] Fail closed in production when shared storage is absent or unavailable.
- [x] Hash IP identities before counter storage; do not store messages or raw IPs in Redis counters.
- [x] Test visitor separation, minute/day reset, daily/global thresholds, shared-store command shape, and no OpenAI calls after rejection.

### Deployment gate

- [!] Choose/configure the shared Redis REST store and private Vercel environment variables. Nothing has been provisioned.
- [ ] Test concurrent requests against a separate preview store and verify deployed Vercel IP identification.
- [ ] Verify allowed and rejected requests on the deployment; do not advertise deployed protection until verified.
- [ ] Review actual OpenAI usage and choose an acceptable ongoing budget.

Important: 50 requests per IP is not 50 requests per authenticated person. People on shared networks can share quotas. Different IPs can bypass a visitor quota, so the global cap is intentional. Request/token limits reduce exposure but do not guarantee an exact monetary cap. Store costs, if any, are separate.

## Stage 2: Easier Project Enquiries Without n8n

- [x] Separate primary email delivery from acknowledgement failure so visitors are not told to resend an already-delivered enquiry.
- [x] Prevent immediate duplicate submissions with an in-flight guard.
- [x] Preserve form contents when primary delivery fails; clear only after primary success.
- [x] Test successful delivery, primary failure, and acknowledgement-only failure with mocks.
- [x] Add an optional service selector covering the existing four services.
- [x] Add an optional timeline selector, without making the form long.
- [x] Include selections in the existing email message without requiring template changes.
- [x] Prefill the service from its enquiry button, while allowing edits.
- [x] Add a honeypot, duplicate-submit guard, length checks, and a short client-side resend cooldown. These are not a replacement for server/provider abuse controls.
- [!] Confirm EmailJS allowed-origin/account settings in the provider account.
- [!] Verify one authorized real message reaches Udara and that the acknowledgement is correct. No real email has been sent during automated tests.

Acceptance: existing EmailJS flow works without n8n, duplicates are discouraged, optional fields are genuinely optional, and failures never erase a visitor's message.

## Stage 3: Explain The Process Without A Long New Section

- [x] Integrate a compact four-step strip into Services, rather than adding another full-height page section.
- [x] Use: Understand -> Plan -> Build -> Launch & Support.
- [x] Keep each explanation to one short sentence and avoid unsupported turnaround or support commitments.
- [x] Add purple connecting-line and step-highlight animation consistent with current effects.
- [x] Use a compact two-by-two arrangement on narrow screens, with no forced horizontal overflow.

Acceptance: clients understand how work starts without a major increase in mobile scrolling.

## Stage 4: Project First Impressions

- [x] Improve each featured card's short description to explain the business problem or purpose in plain language.
- [x] Retain the consistent existing My contribution section in all project details; keyboard interaction is now focus-contained.
- [ ] Add measurable results only where Udara can verify and disclose them; otherwise use accurate qualitative outcomes.
- [x] Show six featured projects initially, with Show all/Show fewer actions; retain all nine featured projects and categories.
- [x] Preserve existing project order and featured flags. Automated inventory comparison confirms all original identities, types, media, links, and tags are retained.
- [x] Keep View details as the only featured-card action, with external links inside details.
- [!] Additional project-gallery images: waiting for Udara, not a blocker for text/structure improvements.

Acceptance: cards remain compact and details remain rich. Do not fabricate images, client outcomes, or project metrics.

## Stage 5: Client Review Carousel And Evidence

### Approved direction

- [x] Replace screenshot-opening cards with compact text and inline screenshot evidence. Updated at Udara's request: existing Upwork feedback images are visible beside the review, with no image links or popup viewer.
- [x] Show one review at a time, with left/right arrows and active-position indicators.
- [x] Support a horizontal slide transition and the suggested two-second automatic cycling interval.
- [x] Loop forward continuously from review three to review one using boundary clones and an invisible position reset; no reverse sweep through the second review. Previous navigation loops in the opposite direction when deliberately requested.
- [ ] Check whether two seconds gives enough reading time for actual quotes; propose a longer interval if needed, not less animation.
- [x] Pause cycling on hover, keyboard focus, touch navigation, or hidden pages; include pause/play and reduced-motion support.
- [x] Add touch swipes, manual/keyboard navigation, and narrow-screen controls.
- [x] Use a shared-height grid track so slides do not jump or truncate content.
- [x] Keep the carousel in the existing Reviews section next to Services.

### Content needed

- [!] Receive exact review text, reviewer display name or approved anonymous label, company if permitted, project/service, and rating only if genuinely given.
- [x] Inspect review evidence only: 1.png and 2.png contain ratings but no written quotes; 3.png contains the existing quote "Honest, talented freelancer". Retain all three ratings without inventing additional testimonial text.
- [!] Additional reviews do not need screenshots: direct client-written feedback is acceptable when its authenticity and publication permission are confirmed.
- [x] Do not label manually supplied feedback as platform-verified without actual platform evidence.
- [x] Existing `public/reviews` evidence is intentionally displayed inline following Udara's latest request. New WhatsApp/Telegram evidence needs approved content and redaction of private details before publication.
- [x] Do not add an unmoderated public review/comment form. Future submissions would require consent and manual approval before publication.

Three genuine reviews are sufficient to start. There is no reason to duplicate or fabricate more reviews to fill the carousel.

## Stage 6: Motion, Performance, And Discoverability

- [x] Keep 13 wallpapers and existing eight-second rotation; preload the next wallpaper instead of mounting 13 layers. Twelve original photos remain unchanged; one source returned HTTP 404 and was replaced with a working technology photo.
- [x] Serve mobile/desktop JPEG copies from `public/wallpapers` so visitors no longer depend on Unsplash access. All 26 assets are validated; initially only current/next images are requested.
- [x] Wait for the next wallpaper to load, then crossfade, temporarily retaining the outgoing layer. Skip failed images and time out stalled loads after six seconds; keep the existing image if no alternative loads.
- [x] Browser checks decode every wallpaper at 390px and 1440px, prove automatic rotation, and simulate both image failure and an indefinitely stalled request.
- [x] Request responsive wallpaper sizes; load chat Markdown and secondary routes separately. Main production JS decreased from approximately 588 kB before today to approximately 443 kB after the review-loop update, uncompressed build output. This is not a field-performance score.
- [x] Add animated process nodes inside existing Services space without a new tall section.
- [x] Strengthen process nodes and connecting lines with sequential purple fill, halo, and pulse. Add automatic two-second-staggered purple surface/icon highlights to the three About cards and four Service rows; actual hover/focus takes priority. Preserve reduced-motion support and existing technology-logo colors.
- [x] Fix the reveal/highlight animation conflict: revealed elements explicitly retain full opacity and their resting position even when another animation replaces the reveal. Normal-motion checks verify all three About cards and all four Service rows on desktop/mobile, including hover and reduced-motion changes.
- [x] Cycle the four chronological experience roles every two seconds: synchronized purple card accents, numbered marker pulses, desktop rail progress, and mobile rail glow. Restart at the first role without rewinding the filled rail. Pause on hover/focus, hidden pages, off-screen sections, or reduced-motion preference. Automatic changes never scroll or transfer focus; manual milestone selection remains available. Hero animation ideas are recommendations only; the hero has not been changed.
- [ ] Verify readable text over every wallpaper in both themes.
- [x] Add a 1200x630 social preview using the real profile photo, canonical URL, sitemap, and robots file for the existing configured origin `https://udarachamidu.site`.
- [x] Capture an initial production-build lab measurement rather than inferring performance from build size. One unthrottled local Chrome sample at 390px: FCP/LCP 1,524ms, CLS 0; at 1440px: FCP/LCP 708ms, CLS 0. Only two wallpapers were requested in each initial sample. These single local samples are not field scores or proof of improved performance; real-network interactivity remains pending.

## Stage 7: Complete Mobile Review Last

- [x] Check 320x740, 390x844, 844x390, 768x1024, 1440x900, and 1920x1080 layouts in both themes through headless Chrome.
- [x] Check hero wrapping/portrait/controls, page errors, detected broken images, and off-screen interactive element bounds.
- [x] Check hamburger navigation, focus cycling, theme controls, and closing/restoring scroll on desktop resize.
- [x] Check featured expansion, filters, modal opening/closing, and keyboard focus containment.
- [ ] Real-phone gallery gestures, media playback, and Safari behavior remain pending.
- [x] Check section bounds, review arrows/keyboard/swipe events, normal animations, skills, and credential filters; capture layout screenshots.
- [x] Check contact prefill and optional metadata, draft retention on primary failure, honeypot behavior, and acknowledgement-only failure with mocked delivery.
- [x] Check chat minimization, preserved conversation, quota feedback, and a simulated visual-keyboard viewport. Actual mobile keyboard behavior still needs a device test.
- [x] Give floating wallpaper/chat controls safe-area-aware bottom offsets; a touch-only browser check verifies footer links remain clear. Floating controls can still overlap page content while scrolling; verify physical-device usability before further placement changes.
- [x] Check touch-only wallpaper switching/chat opening without hover, 44px minimum floating-control targets, safe-area styling, and layout overflow. Physical-device behavior remains a separate gate.
- [ ] Test an actual phone when available; distinguish emulation from real-device results.

## Validation And Handoff

- [x] Full-project lint and production build pass. Existing toast prop validation warnings were resolved without visual changes.
- [x] 22 unit/integration tests cover rate limits, delivery states, optional enquiry metadata, project inventory, and all local wallpaper assets.
- [x] All 37 browser checks passed against an isolated production preview, including forward/reverse review boundaries, inline evidence, automatic highlights and manual priority, complete wallpaper loading/rotation, failure recovery, touch-only controls, both themes, and desktop/mobile workflows. Screenshots are in ignored `.browser-qa/`. An earlier development-server run was invalidated by live reloads; final validation uses the built preview instead.
- [x] Visibility follow-up: build and lint pass; 38 of 39 checks passed in the full run. The remaining carousel check sampled a short animation window and was changed to inspect actual transition keyframes. The focused rerun passed all three cases: carousel wrapping and both new desktop/mobile opacity regressions. All 39 distinct cases have now passed across the full run and targeted rerun.
- [x] Experience-animation follow-up: build and lint pass; five focused browser checks pass, covering desktop/mobile automatic cycling, marker/card synchronization, no automatic scrolling or focus movement, hover/focus priority, reduced-motion behavior, and the existing About/Services visibility regressions. The complete suite was not rerun for this focused change.
- [x] Keep a change summary and outstanding items in this plan.
- [x] Keep optional account/configuration work separate from local code completion.

## Remaining External And Content Gates

- Configure/verify shared Redis and Vercel settings before deploying chat protection. Missing production storage deliberately blocks AI calls. No production changes were made.
- Verify EmailJS allowed domains and actual inbox/acknowledgement delivery with an authorized test enquiry. Automated tests use mocks only; no real messages were sent.
- Supply approved client names, company/role details, additional exact review text, and any missing project gallery images.
- Confirm the carousel's two-second pace by trying it; it can be changed without altering the animation design.
- Real mobile hardware, Safari, all-wallpaper contrast/readability checks, and deployed field performance remain pending.
- Dependency audit now reports zero known vulnerabilities. A scoped override updates `@vercel/cli-config`'s Zod from 4.1.11 to 4.6.7 within the same major version, removing the remaining advisory chain without downgrading Blob or removing the Writing backend. Recheck this override when upstream updates its pinned dependency.

## Reproduce Checks

- `npm test`
- `npm run lint`
- `npm run build`
- `npm run test:ui` (builds first, then tests an isolated production preview on port 5181 with installed Chrome; mocks AI/email calls and leaves the development server on 5180 alone)
- `node scripts/render-social-preview.mjs` (regenerates the sharing image from the real profile photo and HTML layout)

The older implementation plan is preserved. No commits, pushes, account changes, or deployments were performed.
