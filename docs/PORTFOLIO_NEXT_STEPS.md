# Portfolio Next Steps

Updated: 21 November 2026, Asia/Colombo.

## Resume Here Tomorrow

1. Finish shared-counter configuration for the chatbot before deploying the protection changes. See `docs/chatbot.md`.
2. Confirm the contact-form behavior with a deliberate test enquiry when Udara is available. Do not send unsolicited test emails.
3. Implement the compact contact/process improvements, then projects and reviews, one stage at a time.
4. Finish with a full mobile audit. Do not treat desktop screenshots or successful builds as mobile sign-off.

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
- [ ] Add an optional service selector covering the existing four services.
- [ ] Add an optional timeline selector, without making the form long.
- [ ] Include the selected service/timeline in the existing message text unless EmailJS templates are explicitly updated and checked.
- [ ] Prefill the service when a visitor clicks its existing enquiry button, while allowing edits.
- [ ] Add low-friction spam protection and confirm EmailJS allowed-origin/account settings.
- [!] Verify one authorized real message reaches Udara and that the acknowledgement is correct. No real email has been sent during automated tests.

Acceptance: existing EmailJS flow works without n8n, duplicates are discouraged, optional fields are genuinely optional, and failures never erase a visitor's message.

## Stage 3: Explain The Process Without A Long New Section

- [ ] Integrate a compact four-step strip into Services, rather than adding another full-height page section.
- [ ] Use: Understand -> Plan -> Build -> Launch & Support.
- [ ] Keep each explanation to one short sentence and avoid unsupported turnaround or support commitments.
- [ ] Add purple connecting-line or step-highlight animation consistent with current effects.
- [ ] Use a compact two-by-two arrangement on narrow screens, with no forced horizontal overflow.

Acceptance: clients understand how work starts without a major increase in mobile scrolling.

## Stage 4: Project First Impressions

- [ ] Improve each featured card's short description to explain the business problem or purpose in plain language.
- [ ] Standardize the existing contribution summaries inside project details.
- [ ] Add measurable results only where Udara can verify and disclose them; otherwise use accurate qualitative outcomes.
- [ ] Start with a manageable featured selection and a clear Show more action, retaining every project and existing category.
- [ ] Confirm which projects lead the initial view before changing featured priorities; do not silently demote approved work.
- [ ] Keep View details as the only featured-card action, with external links inside details.
- [!] Additional project-gallery images: waiting for Udara, not a blocker for text/structure improvements.

Acceptance: cards remain compact and details remain rich. Do not fabricate images, client outcomes, or project metrics.

## Stage 5: Text-Based Client Review Carousel

### Approved direction

- [ ] Replace public screenshot-opening cards with a compact text review component. No click-to-open review images.
- [ ] Show one review at a time, with left/right arrow buttons and active-position indicators.
- [ ] Support automatic cycling with a horizontal slide transition; initially preview Udara's suggested two-second interval as a configurable setting.
- [ ] Check whether two seconds gives enough reading time for actual quotes; propose a longer interval if needed, not less animation.
- [ ] Pause cycling on hover, keyboard focus, or active interaction so visitors can read. Provide accessible control and honor explicit reduced-motion preferences.
- [ ] Add touch swipes and keep the text from overflowing or being clipped on mobile.
- [ ] Avoid jumps between reviews: use an appropriate minimum height but allow long quotes to expand rather than truncating them invisibly.
- [ ] Keep the carousel near Services as the existing Reviews section, not an additional duplicate testimonial section.

### Content needed

- [!] Receive exact review text, reviewer display name or approved anonymous label, company if permitted, project/service, and rating only if genuinely given.
- [!] For existing screenshots, ask for transcripts or permission to transcribe the review images only. Existing verified text can be reused now; do not invent the unread feedback.
- [!] Additional reviews do not need screenshots: direct client-written feedback is acceptable when its authenticity and publication permission are confirmed.
- [ ] Do not label manually supplied feedback as platform-verified without actual platform evidence.
- [ ] Keep original evidence privately if necessary; do not accidentally publish private identities or financial details.
- [ ] Do not add an unmoderated public review/comment form. Future submissions would require consent and manual approval before publication.

Three genuine reviews are sufficient to start. There is no reason to duplicate or fabricate more reviews to fill the carousel.

## Stage 6: Motion, Performance, And Discoverability

- [ ] Preserve all normal wallpaper and animation behavior while loading only the current and next wallpaper assets where feasible.
- [ ] Preserve smooth crossfades; avoid a blank wallpaper or obvious loading flash.
- [ ] Optimize image variants and JS loading without removing content or effects.
- [ ] Add a small workflow animation inside existing Services space only if it contributes to the layout, not another tall decorative section.
- [ ] Verify readable text over every wallpaper in both themes.
- [ ] Add a purpose-built social preview, canonical URL, sitemap, and robots file once the production domain is confirmed.
- [ ] Measure actual load/interactivity/layout stability; do not claim performance gains based on a successful build alone.

## Stage 7: Complete Mobile Review Last

- [ ] Check narrow mobile, larger mobile, tablet, and desktop in both themes, including small landscape heights.
- [ ] Audit hero wrapping, portrait scale, spacing, and all three hero buttons.
- [ ] Check hamburger menu visibility, keyboard focus, theme toggle, and scroll restoration.
- [ ] Check project filters, cards, detail modals, galleries, optional video, close controls, and keyboard focus containment.
- [ ] Check Services icons, compact process strip, reviews swipes/arrows, experience journey, skills, and credential filters.
- [ ] Check contact inputs, error/success states, and long email addresses.
- [ ] Check chat with the software keyboard open, outside-click minimization, long replies, API errors, and limit messages.
- [ ] Prevent wallpaper controls and chatbot from covering important text, buttons, or footer links.
- [ ] Check touch behavior without relying on hover, readable type, tap targets, safe areas, and horizontal overflow.
- [ ] Test an actual phone when available; distinguish emulation from real-device results.

## Validation And Handoff

- [ ] Run focused lint and production build after each implemented stage.
- [ ] Keep automated coverage for rate limits and email delivery states.
- [ ] Use screenshots for meaningful layout changes; do not infer visual correctness solely from compilation.
- [ ] Keep a short change summary and outstanding items after each stage.
- [ ] Keep optional account/configuration work separate from local code completion.

No visual/content stages beyond the chatbot and contact reliability fixes were implemented tonight. Continue tomorrow with the production-protection gate, then Stage 2.
