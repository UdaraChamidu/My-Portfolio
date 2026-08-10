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
4. Featured case studies
5. Services
6. Client reviews
7. Experience
8. Technical capabilities
9. About and credentials
10. Contact
11. Footer and chatbot

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

- [x] Reduce navigation to About, Projects, Services, Experience, Credentials, and Contact; add Reviews when approved testimonials exist.
- [x] Add a visible Download CV action.
- [x] Add active-section highlighting.
- [x] Verify mobile navigation, focus handling, and menu closing behavior.

### Main Page Composition

- [x] Place About directly after Hero, followed by projects and professional evidence.
- [x] Remove the Journey section because it repeats Experience.
- [ ] Combine Education and selected Certifications into a compact Credentials section.
- [x] Remove percentage-based skill presentation.
- [ ] Reduce repeated calls to action.

### Dormant Features

- [x] Remove Game from the public page.
- [x] Remove Blog from navigation and public routes.
- [x] Pause scheduled blog generation.
- [x] Remove GitHub Stats from the public page.
- [x] Remove Future Plans from the public page.
- [ ] Permanently delete dormant files only after final approval.

### Phase 2 Acceptance Criteria

- [ ] A visitor can understand Udara's role within five seconds.
- [x] Projects and professional evidence appear before personal history.
- [ ] The page contains no substantial duplicated sections.
- [x] Desktop and mobile navigation remain concise and usable.

---

## Phase 3: Modern Visual System

### Design Direction

- [ ] Use a quiet, modern technology-consultant visual style.
- [ ] Keep dark mode as the first-visit default.
- [ ] Maintain a polished and accessible light theme.
- [ ] Use neutral surfaces with purple as an accent rather than the dominant color.
- [ ] Reduce stars, glows, bouncing elements, and continuous animation.
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

- [ ] Use `AI Automation Engineer & Full-Stack Developer` as the primary role.
- [ ] Replace the long affiliation paragraph with a concise value proposition.
- [ ] Keep current role and availability in one supporting sentence.
- [ ] Add View Projects, Contact Me, and Download CV actions.
- [ ] Use a professional portrait treatment with restrained animation.
- [ ] Remove the animated scroll indicator.

### Professional Proof Strip

- [ ] Add current UK role.
- [ ] Add Upwork freelancing status.
- [ ] Add Veloxdy founder status.
- [ ] Add only verified project, client, workflow, or experience statistics.
- [ ] Ensure the proof strip remains compact on mobile.

### Phase 4 Acceptance Criteria

- [ ] The first viewport states role, value, proof, and next action clearly.
- [ ] The hero does not read like a list of affiliations.
- [ ] No unverified statistics are displayed.

---

## Phase 5: Featured Case Studies

### Project Card Requirements

- [ ] Project name and concise outcome-oriented summary.
- [ ] Project type: client, employment, academic, or personal.
- [ ] Udara's role and individual contribution.
- [ ] Relevant technologies only.
- [ ] High-quality and consistent project image.
- [ ] Correct demo, repository, or case-study action.

### Case Study Detail Requirements

- [ ] Problem or business context.
- [ ] Constraints and responsibilities.
- [ ] Solution architecture.
- [ ] Important implementation decisions.
- [ ] Security, privacy, or human-approval considerations where relevant.
- [ ] Measurable result or clearly stated current status.
- [ ] Screenshots, workflow diagrams, or dashboard media.
- [ ] Related client review where permission exists.

### Recommended Initial Case Studies

- [ ] AI Email Automation System for a USA business client.
- [ ] Insurance AI Consultant Platform.
- [ ] One strong SaaS or full-stack client product.
- [ ] One strong RAG, AI agent, or chatbot project.
- [ ] One machine learning or computer vision project with evaluation results.

### Phase 5 Acceptance Criteria

- [ ] Four to six excellent projects are visible on the main page.
- [ ] Every case study explains problem, contribution, and result.
- [ ] Confidential projects reveal no protected client information.
- [ ] All links, images, and responsive layouts work correctly.

---

## Phase 6: Services

### Final Service Groups

- [ ] AI Agents and Business Automation.
- [ ] AI Applications, RAG, and Machine Learning.
- [ ] Full-Stack SaaS and Web Applications.

### Service Content

- [ ] Explain the business problem each service solves.
- [ ] Identify suitable client types.
- [ ] List practical deliverables instead of broad technology claims.
- [ ] Link each service to a relevant case study.
- [ ] Provide Start a Project, Upwork, and Veloxdy actions without duplication.

### Phase 6 Acceptance Criteria

- [ ] Services are understandable to non-technical business clients.
- [ ] Each service is supported by visible project evidence.
- [ ] The section contains three focused offers rather than six overlapping cards.

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

- [ ] Create a reusable testimonials data structure.
- [ ] Display three featured reviews in a responsive grid.
- [ ] Avoid an automatically moving carousel.
- [ ] Add source and verification links.
- [ ] Add a View More Reviews action when more reviews are available.
- [ ] Support approved anonymous reviews for confidential projects.
- [ ] Connect reviews to related case studies where possible.
- [ ] Add empty and fallback states without inventing testimonials.

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

- [ ] Do not generate, rewrite, or invent client reviews.
- [ ] Obtain permission before displaying names, photos, logos, or company names.
- [ ] Clearly label anonymized reviews.
- [ ] Preserve the meaning of client feedback when correcting minor grammar.
- [ ] Keep evidence or source links for every public testimonial.

### Phase 7 Acceptance Criteria

- [ ] Every review is genuine and approved.
- [ ] Review cards are readable and consistent on mobile and desktop.
- [ ] Reviews strengthen specific services and projects.
- [ ] No confidential or misleading information is exposed.

---

## Phase 8: Experience, Capabilities, And About

### Experience

- [x] Replace cards with one clear professional timeline.
- [x] Put current roles first.
- [x] Add engagement type and location.
- [x] Use two to four outcome-oriented bullets per role.
- [x] Link Upwork and Veloxdy entries to their profiles.

### Technical Capabilities

- [ ] Replace percentages with Production Experience.
- [ ] Add Applied AI and Automation.
- [ ] Add Full-Stack Engineering.
- [ ] Add Cloud, Databases, and Deployment.
- [ ] Add Familiar or Currently Developing only when useful.
- [ ] Connect important capabilities to project evidence.

### About And Credentials

- [ ] Write a short professional introduction.
- [ ] Include degree, university, location, and remote availability.
- [ ] Show three to five selected certifications.
- [ ] Provide a View All Credentials option only if needed.
- [ ] Keep personal history brief and relevant.

### Phase 8 Acceptance Criteria

- [ ] Experience does not repeat the hero or About section.
- [ ] Skills are supported by evidence instead of arbitrary percentages.
- [ ] Education and certifications occupy appropriate visual space.

---

## Phase 9: Contact, Footer, And Chatbot

### Contact

- [ ] Keep one professional business email.
- [ ] Decide whether the public phone number is necessary.
- [ ] Keep WhatsApp only when it supports client communication.
- [ ] Include LinkedIn, GitHub, Medium, Upwork, and Veloxdy.
- [ ] Remove Facebook unless it has a professional purpose.
- [ ] Add project type and budget-range fields only if they improve qualification.
- [ ] Add clear success, validation, and failure states.

### Chatbot

- [ ] Position chatbot as a secondary assistant.
- [ ] Rename it to clarify that it answers questions about Udara's work.
- [ ] Remove unnecessary bouncing and repeated tips.
- [ ] Keep complete-response and adaptive-token behavior.
- [ ] Add rate limiting and graceful API failure handling.
- [ ] Verify mobile keyboard, scrolling, and message layout.

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

- [ ] Fix the favicon path.
- [ ] Use a descriptive page title.
- [ ] Add meta description and canonical URL.
- [ ] Add Open Graph and social-preview metadata.
- [ ] Create a professional social-preview image.
- [ ] Add structured data for Person and ProfessionalService.
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
- [ ] Strongest four to six projects
- [ ] Individual contribution to each selected project
- [ ] Measurable project outcomes that may be shared
- [ ] Engagement type for every current role
- [ ] Verified Upwork statistics that may be displayed
- [ ] Preferred custom portfolio domain
- [ ] Final professional portrait and social-preview preference

## Recommended Starting Point

Implement Phase 1 and Phase 2 first. Content accuracy and information
architecture should be finalized before the visual redesign. Update this file
after each implementation step so it remains the source of truth for the
portfolio modernization work.
