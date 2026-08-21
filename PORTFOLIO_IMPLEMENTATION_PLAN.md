# Professional Portfolio Implementation Plan

## Objective

Present Udara Herath as a credible AI Automation Engineer and Full-Stack
Developer who builds practical AI, automation, SaaS, and web systems for
international clients.

The portfolio should prioritize evidence, clarity, business value, and trust.
It should not attempt to display every project, skill, certificate, or personal
milestone on the main page.

## Status Legend

- `[ ]` Pending
- `[-]` In progress
- `[x]` Completed
- `[!]` Blocked or requires information

## Proposed Page Order

1. Navigation
2. Hero
3. Professional proof strip
4. About
5. Featured projects and case studies
6. Services
7. Client reviews when approved content is available
8. Experience
9. Technical capabilities
10. Credentials
11. Contact
12. Footer and chatbot

---

## Phase 1: Content And Credibility Cleanup

### Projects

- [x] Give every project a unique and stable ID.
- [x] Remove or hide demo and GitHub buttons when their links do not exist.
- [x] Verify public repository and live-demo URLs; remove links confirmed as unavailable.
- [x] Add the verified Trip Planner repository URL.
- [x] Use AI, AI Automation, ML / DL, Computer Vision, Full Stack, and Embedded Systems categories.
- [x] Fix missing React keys for project tags.
- [x] Correct project grammar, punctuation, capitalization, and technology names.
- [x] Classify visible projects as client, internship, academic, research, or personal work.
- [x] Select a balanced six-project set for the default Featured view.
- [x] Keep smaller projects accessible through their category views.

Project link audit note (August 2026): public repository links returning `404`
were removed from the Insurance AI, Level Up Trading, HR Leave Management,
UniLife, and Lanka Yard cards. Redirected GitHub URLs for the n8n assistant,
Video Chatty, and PDF chatbot were replaced with their canonical destinations.
The Video Chatty and PDF Chatty demo actions were removed after Udara confirmed
that both deployments are no longer working. Their available source links are
retained.

### Experience

- [x] Label roles as employment, collaboration, freelance, internship, or founder work.
- [x] Verify company names, locations, dates, and exact engagement types.
- [x] Replace generic responsibility statements with specific contributions.
- [!] Add measurable outcomes where they can be shared safely.
- [x] Clearly explain overlapping current roles.
- [x] Preserve client confidentiality where required.

### Certifications

- [x] Organize all certifications into focused categories on the main page.
- [x] Remove expired signed URLs and general dashboard links.
- [x] Add permanent verification links where available.
- [x] Separate foundational certificates from advanced AI credentials.
- [x] Correct issuer naming and duplicate IDs.

### General Content

- [x] Correct spelling and grammar throughout the portfolio.
- [x] Use consistent terminology for AI, machine learning, SaaS, and automation.
- [x] Remove repeated claims across Hero, About, Services, Experience, and Journey.
- [x] Ensure every professional claim is accurate and defensible.

### Phase 1 Acceptance Criteria

- [x] No placeholder links remain.
- [x] No known incorrect project links remain.
- [x] Every visible claim is accurate.
- [x] Project and experience copy uses professional English.
- [x] All repeated project IDs and missing project-tag keys are fixed.

---

## Phase 2: Information Architecture

### Navigation

- [x] Use About Me, Projects, Services, Reviews, Experience, Credentials, and Contact navigation.
- [x] Add a visible Download CV action.
- [x] Add active-section highlighting.
- [x] Verify mobile navigation, focus handling, and menu closing behavior.

### Main Page Composition

- [x] Place About directly after Hero, followed by projects and professional evidence.
- [x] Remove the Journey section because it repeats Experience.
- [x] Combine Education and all Certifications into a compact tabbed Credentials section.
- [x] Remove percentage-based skill presentation.
- [ ] Reduce repeated calls to action.

### Dormant Features

- [x] Remove Game from the public page.
- [x] Remove Blog from navigation and public routes.
- [x] Pause scheduled blog generation.
- [x] Remove GitHub Stats from the public page.
- [x] Remove Future Plans from the public page.
- [x] Permanently delete dormant files after final approval.

### Phase 2 Acceptance Criteria

- [x] A visitor can understand Udara's role within five seconds.
- [x] Projects and professional evidence appear before personal history.
- [x] The page contains no substantial duplicated sections.
- [x] Desktop and mobile navigation remain concise and usable.

---

## Phase 3: Modern Visual System

### Design Direction

- [ ] Use a quiet, modern technology-consultant visual style.
- [ ] Keep dark mode as the first-visit default.
- [ ] Maintain a polished and accessible light theme.
- [ ] Use neutral surfaces with purple as an accent rather than the dominant color.
- [ ] Refine nonessential animation while preserving the rotating wallpapers, stars, meteors, and background controls requested by Udara.
- [ ] Use section bands and open layouts instead of excessive floating cards.

### Design Tokens

- [ ] Define consistent background, surface, border, text, and accent colors.
- [ ] Define a consistent typography scale.
- [ ] Define spacing and container-width rules.
- [ ] Standardize buttons, links, tags, cards, inputs, and icon buttons.
- [ ] Keep card corner radius at approximately 6-8px.
- [ ] Define responsive image ratios for project and review media.
- [ ] Add reduced-motion support.

### Phase 3 Acceptance Criteria

- [ ] All sections feel like one coherent product.
- [ ] Text hierarchy is clear on desktop and mobile.
- [ ] Animation supports interaction without distracting visitors.
- [ ] Color contrast meets accessibility requirements.

---

## Phase 4: Hero And Professional Proof

### Hero

- [x] Use `AI Automation Engineer & Full-Stack Developer` as the primary role.
- [x] Replace the long affiliation paragraph with a concise value proposition.
- [x] Keep current role in the professional proof strip without an additional availability sentence.
- [x] Add View Projects, Contact Me, and View Services actions; keep Download CV in navigation.
- [x] Use a professional portrait treatment with restrained animation.
- [x] Remove the animated scroll indicator.

### Professional Proof Strip

- [x] Add current UK role.
- [x] Add Upwork freelancing status.
- [x] Add Veloxdy founder status.
- [x] Add only verified project, client, workflow, or experience statistics.
- [x] Ensure the proof strip remains compact on mobile.

### Phase 4 Acceptance Criteria

- [x] The first viewport states role, value, proof, and next action clearly.
- [x] The hero does not read like a list of affiliations.
- [x] No unverified statistics are displayed.

---

## Phase 5: Featured Case Studies

Visibility note: the reusable case-study pages are implemented but currently
disabled for public visitors. Set `caseStudiesPublic` to `true` in
`src/data/caseStudies.js` when the content and supporting media are ready to
publish.

### Project Card Requirements

- [x] Project name and concise outcome-oriented summary.
- [x] Project type: client, employment, academic, personal, or professional.
- [x] Udara's role and individual contribution on Featured case-study pages.
- [x] Relevant technologies only.
- [x] High-quality and consistent project image.
- [x] Correct demo, repository, or case-study action.

### Case Study Detail Requirements

- [x] Problem or business context.
- [x] Constraints and responsibilities based on currently verified information.
- [x] Solution architecture.
- [x] Important implementation decisions.
- [x] Security, privacy, or human-approval considerations where relevant.
- [ ] Measurable result or clearly stated current status.
- [ ] Screenshots, workflow diagrams, or dashboard media.
- [ ] Related client review where permission exists.

### Recommended Initial Case Studies

- [x] Insurance AI Consultant Platform.
- [x] BiaBot AI Client Intake Platform.
- [x] AI Voice Agent Platform.
- [x] Lumina AI.
- [x] HR Leave Management System.

### Phase 5 Acceptance Criteria

- [x] Five selected projects are visible in the Featured view.
- [x] Every Featured case study explains the problem, contribution, architecture, and current outcome without invented metrics.
- [ ] Confidential projects reveal no protected client information.
- [ ] All links, images, and responsive layouts work correctly.

---

## Phase 6: Services

### Final Service Groups

- [x] AI Applications and RAG.
- [x] Full-Stack Web Applications.
- [x] AI Agents and Business Automation.
- [x] Machine Learning Solutions.

### Service Content

- [x] Explain the business problem each service solves.
- [x] Identify suitable client types.
- [x] List practical deliverables instead of broad technology claims.
- [x] Link each service to relevant project evidence.
- [x] Provide Start a Project, Upwork, and Veloxdy actions without duplication.

### Phase 6 Acceptance Criteria

- [x] Services are understandable to non-technical business clients.
- [x] Each service is supported by visible project evidence.
- [x] The section contains four focused offers rather than six overlapping cards.

---

## Phase 7: Client Reviews

### Review Data Requirements

Every published review should include as many of the following as permission
allows:

- Client name or approved anonymized identity
- Role, company, or industry
- Country
- Exact review text
- Related project or service
- Source such as Upwork or LinkedIn
- Public source URL when available
- Client photo or company logo only with permission
- Rating only when it comes from a real public review

### Review Component

- [x] Create a reusable testimonials data structure.
- [x] Display three featured reviews in a responsive grid.
- [x] Avoid an automatically moving carousel.
- [x] Include original review screenshots as evidence and link to the Upwork profile.
- [x] Add a View Upwork Profile action.
- [x] Avoid exposing client identities not present in the supplied evidence.
- [ ] Connect reviews to related case studies where possible.
- [ ] Add empty and fallback states when review data becomes dynamic.

### Proposed Review Data Shape

```js
{
  id: "review-id",
  quote: "Client's exact approved review",
  clientName: "Client name or approved label",
  clientRole: "Role",
  company: "Company or industry",
  country: "Country",
  project: "Related project",
  source: "Upwork",
  sourceUrl: "https://...",
  image: "/reviews/client-image.webp",
  rating: 5,
  featured: true
}
```

### Review Integrity Rules

- [x] Do not generate, rewrite, or invent client reviews.
- [x] Publish only the supplied contract evidence without adding client identities.
- [x] Clearly present reviews without unsupported identity claims.
- [x] Preserve the exact visible client feedback.
- [x] Keep original screenshots and an Upwork profile source link.

### Phase 7 Acceptance Criteria

- [x] Every displayed review comes from supplied Upwork evidence.
- [x] Review cards are structured for mobile and desktop.
- [x] Reviews strengthen AI and automation service evidence.
- [x] No client identity or confidential information is added.

---

## Phase 8: Experience, Capabilities, And About

### Experience

- [x] Replace cards with one clear professional timeline.
- [x] Put current roles first.
- [x] Add engagement type and location.
- [x] Use two to four outcome-oriented bullets per role.
- [x] Link Upwork and Veloxdy entries to their profiles.

### Technical Capabilities

- [x] Replace arbitrary percentages with evidence-neutral technology icons.
- [x] Add AI and Automation capabilities.
- [x] Add Programming and Web Development capabilities.
- [x] Add Cloud, Data, and Deployment capabilities.
- [x] Keep the default view focused on core capabilities.
- [ ] Connect important capabilities to project evidence.

### About And Credentials

- [x] Write a short professional introduction.
- [x] Include degree, university, location, and remote availability.
- [x] Show all certifications in focused categories, as requested.
- [x] Keep Education and Certifications under one Credentials navigation target.
- [x] Keep personal history brief and relevant.

### Phase 8 Acceptance Criteria

- [x] Experience does not repeat the hero or About section.
- [x] Skills avoid arbitrary percentages and use recognizable technology labels.
- [x] Education and certifications occupy one compact tabbed section.

---

## Phase 9: Contact, Footer, And Chatbot

### Contact

- [x] Keep one professional contact email.
- [x] Remove the public phone number.
- [x] Remove public WhatsApp contact details.
- [x] Include LinkedIn, GitHub, Medium, Upwork, and Veloxdy.
- [x] Remove Facebook from professional contact links.
- [ ] Add project type and budget-range fields only if they improve qualification.
- [ ] Add clear success, validation, and failure states.

### Chatbot

Preservation note: keep the current chatbot behavior and presentation unchanged
unless Udara explicitly requests a chatbot update in a future session.

- [x] Preserve the current working chatbot as requested.

### Footer

- [ ] Add concise navigation and professional social links.
- [ ] Keep copyright and Veloxdy relationship clear.
- [ ] Add privacy information if analytics or form tracking is introduced.

### Phase 9 Acceptance Criteria

- [ ] A visitor can contact Udara without unnecessary friction.
- [ ] The chatbot never blocks or covers essential mobile content.
- [ ] Contact details remain professional and privacy-conscious.

---

## Phase 10: Technical Quality, SEO, And Accessibility

### Code Quality

- [x] Upgrade React Router and the Vite toolchain to security-fixed versions.
- [x] Resolve all reported npm dependency vulnerabilities.
- [ ] Make ESLint pass with zero errors and warnings.
- [ ] Remove unused imports and dormant comments.
- [ ] Remove unsupported `style jsx` attributes.
- [ ] Fix hook dependency warnings.
- [ ] Add appropriate lint environments for Vercel functions.
- [ ] Add focused component and utility tests where valuable.

### Performance

- [ ] Lazy-load below-the-fold sections and chatbot code.
- [ ] Optimize project, portrait, certificate, and review images.
- [ ] Use WebP or AVIF where appropriate.
- [ ] Define image dimensions to prevent layout shifts.
- [ ] Minimize third-party scripts and remote image dependencies.
- [ ] Measure the production bundle after each major phase.

### SEO And Sharing

- [x] Fix the favicon path.
- [x] Use a descriptive page title.
- [-] Add meta description; add canonical URL after the final domain is confirmed.
- [-] Add Open Graph metadata; replace the portrait with a dedicated social-preview image after the final domain and image preference are confirmed.
- [ ] Create a professional social-preview image.
- [-] Add Person structured data; add ProfessionalService after the final domain is confirmed.
- [ ] Add project structured data where useful.
- [ ] Configure a professional custom domain.

### Accessibility

- [ ] Verify keyboard navigation and focus visibility.
- [ ] Add accessible names to icon-only controls.
- [ ] Verify heading hierarchy.
- [ ] Verify color contrast in both themes.
- [ ] Respect reduced-motion preferences.
- [ ] Test forms and chatbot with keyboard-only input.
- [ ] Test at desktop, tablet, and mobile viewports.

### Phase 10 Acceptance Criteria

- [ ] Production build passes.
- [ ] Lint passes with no warnings.
- [ ] No broken internal or external links remain.
- [ ] Core interactions work with keyboard and touch.
- [ ] SEO and social previews contain correct information.
- [ ] Performance has no avoidable large assets or blocking dependencies.

---

## Phase 11: Final QA And Deployment

- [ ] Test navigation at all target viewport sizes.
- [ ] Test dark and light themes.
- [ ] Test every project, review, company, social, and CV link.
- [ ] Test the contact form success and failure paths.
- [ ] Test chatbot short and detailed questions.
- [ ] Verify Vercel environment variables and serverless functions.
- [ ] Verify custom-domain routing and HTTPS.
- [ ] Review spelling, dates, company names, and role descriptions.
- [ ] Capture final desktop and mobile screenshots.
- [ ] Deploy to production and perform a post-deployment smoke test.

## Final Definition Of Done

- [ ] The first viewport clearly communicates role, value, proof, and action.
- [ ] The main page contains only the strongest professional evidence.
- [ ] Four to six projects are presented as credible case studies.
- [ ] Client reviews are genuine, approved, and connected to relevant work.
- [ ] Experience and capabilities are concise and evidence-based.
- [ ] The site is responsive, accessible, fast, and technically clean.
- [ ] Contact options work without unnecessary user friction.
- [ ] All production content is accurate and ready to show recruiters and clients.

## Information Required From Udara

- [ ] Exact client reviews and public source links
- [ ] Permission status for client names, companies, photos, and logos
- [x] Strongest four to six projects
- [ ] Individual contribution to each selected project
- [ ] Measurable project outcomes that may be shared
- [x] Engagement type for every current role
- [ ] Verified Upwork statistics that may be displayed
- [ ] Preferred custom portfolio domain
- [ ] Final professional portrait and social-preview preference

## Next Session Starting Point

Phase 1, Phase 4, and Phase 6 are complete. Phase 2 is substantially complete;
the remaining work is to consolidate Education and Certifications into a more
compact Credentials presentation and reduce repeated calls to action. Continue
with the remaining Phase 2 items, then proceed to the Phase 3 visual system or
Phase 5 case studies as priorities allow.
