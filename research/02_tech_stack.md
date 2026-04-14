# PRISM Marketing Website — Tech Stack Research 2026

**Date:** April 2026
**Status:** Final Recommendation
**Updated:** 2026-04-13

---

## Executive Summary

For building PRISM's marketing website in 2026, the optimal stack prioritizes **zero JavaScript overhead, maximum performance, and developer simplicity**.

### Recommended Stack

| Category | Choice | Rationale |
|----------|--------|-----------|
| **Framework** | **Astro 5** | 90% less JS than Next.js; 40% faster load times; Content Layer API for dynamic content; newly acquired by Cloudflare |
| **Styling** | **Tailwind CSS 4** | Mature ecosystem; seamless integration with Aceternity UI; 12M weekly downloads; no learning curve |
| **Animations** | **GSAP + CSS-driven** | GSAP for complex effects; CSS scroll-driven for 60fps compositor-level animations; Lenis for smooth scroll |
| **UI Components** | **Aceternity UI + Shadcn/ui** | Aceternity for landing page magic; Shadcn for structured components; both use Tailwind CSS, fully compatible |
| **Typography** | **JetBrains Mono** (code) + **Geist Sans** (body) | JetBrains Mono for developer credibility; Geist Sans for modern, clean body text; both free |
| **Deployment** | **Cloudflare Pages** | Best edge performance (50ms TTFB globally); 300+ edge locations; cost-efficient; synergy with Astro |

---

## 1. Framework Analysis

### Contenders

#### Astro 5 — WINNER ✓

**Performance:**
- **Bundle size:** 8KB (home page) vs Next.js ~85KB gzipped
- **Load time:** 40% faster than Next.js for static content
- **JavaScript overhead:** 90% less than Next.js
- **Core Web Vitals:** Consistently achieves 95+ Lighthouse scores (vs Next.js 80–85)

**Why it wins:**
- Pure HTML by default; zero JavaScript unless you explicitly add `client:*` directives
- Content Layer API (new in Astro 5) allows type-safe content from any source (Markdown, CMS, APIs, databases)
- Built-in SSG with streaming SSR support
- Acquired by Cloudflare (Jan 2026) — the team is now part of Cloudflare's strategic vision
- Fastest-growing web framework for content sites in 2026

**Tradeoffs:**
- Limited to ~80% static content for best results; highly dynamic sections may need island architecture
- Smaller ecosystem than Next.js (but sufficient for marketing sites)

**Acceptance threshold:** Perfect for PRISM's marketing site, which is 100% static content with optional contact form.

---

#### Next.js 15

**Performance:**
- Bundle size: ~85KB gzipped (even with static export)
- Mandatory React runtime + hydration logic
- Strong SEO and route-based code splitting
- Excellent for full-stack apps

**Why it loses:**
- Over-engineered for a marketing site; the React/hydration overhead is unnecessary
- Vercel-centric ecosystem (though not a blocker)
- Learning curve steeper than Astro for content-focused teams

---

#### SvelteKit 2

**Performance:**
- Bundle size: 12–20KB (middle ground)
- Excellent DX; minimal boilerplate
- Solid SSG + SSR support

**Why it loses:**
- Smaller community than Astro (1M vs 2M weekly downloads)
- Component ecosystem not as mature as React-based tools
- Harder to find component libraries for marketing sites (Aceternity UI, shadcn are React-only)

---

#### Nuxt 4

**Performance:**
- Bundle size: 60–80KB (Vue + runtime)
- Strong SSG/SSR story
- Great for teams already using Vue

**Why it loses:**
- Vue ecosystem smaller than React
- Heavier than Astro for static content
- No advantage over Astro for marketing sites

---

#### Plain HTML + Vite

**Why it loses:**
- No routing; no templating; no content management
- Zero SEO tooling; no sitemap generation
- Would require manual build orchestration
- Not worth the overhead

---

### Framework Winner: **Astro 5**

**Decision:** Astro 5 is the clear winner for PRISM's marketing site. Zero JavaScript by default + Content Layer API + Cloudflare backing make it the obvious choice.

**References:**
- [Astro vs Next.js: 40% Faster Static Site Performance](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/)
- [Next.js vs Astro: Which Framework Should You Choose in 2026?](https://cipherprojects.com/blog/posts/nextjs-vs-astro-which-one-fits-your-project/)
- [Astro in 2026: Why It's Beating Next.js for Content Sites](https://dev.to/polliog/astro-in-2026-why-its-beating-nextjs-for-content-sites-and-what-cloudflare-s-acquisition-means-6kl)
- [Astro 5.0 Release](https://astro.build/blog/astro-5/)
- [Content Layer: A Deep Dive](https://astro.build/blog/content-layer-deep-dive/)

---

## 2. Styling System

### Contenders

#### Tailwind CSS 4 — WINNER ✓

**Performance:**
- Zero runtime; pure CSS output
- JIT (Just-In-Time) compilation; only includes classes you use
- ~30KB gzipped for a typical marketing site

**Why it wins:**
- Ecosystem maturity: 12M weekly downloads
- Seamless integration with Aceternity UI, shadcn/ui, daisyUI, etc.
- Excellent dark mode support
- No learning curve; widely known across industry
- Active maintenance and strong community

**Tradeoffs:**
- ~200ms hot reload (slower than UnoCSS but still acceptable)
- Requires PostCSS; adds build complexity (minimal with Astro)

---

#### UnoCSS

**Performance:**
- 5x faster builds than Tailwind
- 100x faster dev reload (~10ms vs Tailwind's ~200ms)
- Identical output CSS

**Why it loses:**
- Ecosystem gap: 2M vs 12M weekly downloads
- No Aceternity UI support (as of 2026)
- Requires rewriting Tailwind utility class knowledge
- Not worth a migration for a new project

---

#### Open Props

**Performance:**
- 8KB of CSS variables; zero utility classes
- Entirely CSS-based; no framework overhead

**Why it loses:**
- Requires writing custom CSS for every component
- No utility classes = more CSS per developer per feature
- Incompatible with Aceternity UI
- Better for teams who want full control; worse for velocity

---

### Styling Winner: **Tailwind CSS 4**

**Decision:** Tailwind CSS 4 wins because the ecosystem (Aceternity UI, shadcn) depends on it, and the performance is excellent for a static site. Hot reload speed is not a blocker for marketing sites.

**References:**
- [Tailwind CSS vs UnoCSS 2026: Utility-First CSS Compared](https://www.pkgpulse.com/blog/tailwind-vs-unocss-2026)
- [Tailwind CSS Alternatives 2026](https://bytepulse.io/tailwind-css-alternatives-review-2026/)

---

## 3. Animation Libraries

### Contenders

#### GSAP (GreenSock) + CSS-Driven Animations — WINNER ✓

**Why GSAP wins for complex effects:**
- Industry-standard for advanced animations
- Unmatched control over timeline sequencing, SVG morphs, and complex scroll effects
- Extremely performant on transforms and opacity
- Plugin ecosystem: ScrollTrigger (scroll-triggered), SplitText (text effects), and more

**Why CSS scroll-driven animations win for simple effects:**
- 60fps on compositor thread (never blocks main thread)
- Zero JavaScript required
- Browser-native (Safari, Chrome, Firefox support; partial for Firefox)
- Perfect for parallax, fade-on-scroll, scale-on-scroll

**Combined strategy:**
- Use CSS scroll-driven animations for simple fade/scale/translate on scroll
- Use GSAP for complex sequences, text effects, timeline coordination
- Never animate layout properties (width, height, margin) — stick to transforms, opacity, filters

**Tradeoffs:**
- GSAP has a small learning curve for timelines
- CSS scroll-driven animations require careful browser support testing (Firefox needs flag enable)

---

#### Framer Motion / Motion

**Why it loses:**
- Designed for React component state
- Heavier bundle than GSAP for static sites
- Overkill for landing page animations
- Better for interactive applications than marketing sites

---

#### Lenis (Smooth Scroll)

**Role:** Not a replacement for animation libraries; a *supplement* for smooth scrolling.

- 3KB library
- Synchronized with GSAP ticker for perfect coordination
- Eliminates scroll-jank
- Use: `npm install lenis` and initialize on page load

---

### Animation Winner: **GSAP + CSS-Driven Animations + Lenis**

**Decision:** Use CSS scroll-driven animations for simple effects (80% of cases); GSAP for complex sequences (20% of cases); Lenis for buttery smooth scroll.

**References:**
- [Why GSAP but not Framer Motion?](https://gsap.com/community/forums/topic/38826-why-gsap-but-not-framer-motion/)
- [Framer vs GSAP: Which Animation Library Should You Choose?](https://pentaclay.com/blog/framer-vs-gsap-which-animation-library-should-you-choose)
- [GSAP vs Motion: A detailed comparison](https://motion.dev/docs/gsap-vs-motion)
- [CSS Scroll-Driven Animations — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Lenis – Smooth Scroll](https://lenis.darkroom.engineering/)

---

## 4. UI Component Libraries

### Contenders

#### Aceternity UI — WINNER (For Marketing Pages) ✓

**What it is:**
- "Shadcn/ui for magic effects"
- 200+ free animated components
- All built on Tailwind CSS + Framer Motion
- Designed specifically for landing pages, SaaS, and agencies

**Components available:**
- Spotlight effects
- Parallax scrolling
- 3D cards
- Text effects (animated gradients, typing)
- Feature comparisons
- Testimonial carousels
- CTA sections

**Why it wins:**
- Pre-built, production-ready animated components
- Zero setup friction
- Copy-paste into Astro project
- Premium blocks (~100) and templates (~30) for $199 lifetime

**Tradeoffs:**
- Uses Framer Motion (React component library); must be imported as islands in Astro
- Not suitable for non-animated, structural components (use shadcn/ui instead)

---

#### Shadcn/ui — WINNER (For App Components) ✓

**What it is:**
- Unstyled, composable React components
- All built on Tailwind CSS + Radix UI primitives
- Copy-paste into your project (not an npm package)
- Designed for applications, not marketing sites

**Components available:**
- Forms, dialogs, dropdowns, modals
- Data tables
- Navigation
- Alerts, toasts

**Why it wins:**
- Perfect for contact forms, pricing tables, feature matrices
- Full control over styling (all code in your repo)
- Compatible with Aceternity UI (both use Tailwind CSS)

**Combined strategy:**
- Use Aceternity UI for animated landing page sections
- Use Shadcn/ui for structured, functional components (forms, tables)

---

#### Magic UI

**Why it loses:**
- Similar to Aceternity but smaller ecosystem
- Less mature; fewer components (as of 2026)
- Would require picking between Magic UI and Aceternity

---

### Component Winner: **Aceternity UI + Shadcn/ui**

**Decision:** Aceternity UI for landing page magic; Shadcn/ui for functional components. Both use Tailwind CSS, zero conflict.

**References:**
- [Aceternity UI — Beautiful Tailwind CSS and Framer Motion Components](https://ui.aceternity.com/)
- [Aceternity UI Pro — Premium Templates & Component Blocks](https://ui.aceternity.com/pro)
- [Aceternity UI vs Shadcn/ui — Complete Comparison 2026](https://ui.aceternity.com/compare/aceternity-vs-shadcn)
- [Best React UI Component Libraries 2026](https://ui.aceternity.com/guides/best-react-ui-components-2026)

---

## 5. Typography

### Contenders

#### For Code/Monospace: JetBrains Mono — WINNER ✓

**Why it wins:**
- Free and open source
- 139 programming ligatures
- 8 weights + true italics
- Increased x-height for readability at small sizes
- Developers consistently rate it highest for 6+ hour sessions
- Clean rendering on macOS, Windows, Linux

**Best for:** Inline code, code blocks, function signatures

---

#### For Body Text: Geist Sans — WINNER ✓

**Why it wins:**
- Clean, geometric, modern aesthetic
- Vercel's design system font
- Variable font (weight axis)
- Excellent pairing with monospace fonts
- Free from Vercel
- Zero serif (perfect for tech/product sites)

**Best for:** Headlines, body copy, labels, navigation

---

#### For Display/Headlines: Inter (Alternative)

**Why it's an option:**
- Extremely popular pairing with JetBrains Mono
- Geometric, highly legible
- Available on Google Fonts
- Works perfectly with Tailwind CSS

**Decision:** Geist Sans over Inter for PRISM (better alignment with modern Vercel aesthetic; tighter integration).

---

#### What NOT to use:

- **Cal Sans** — Great for startups, but overused; feels less "PRISM"
- **Plus Jakarta Sans** — Good alternative, but less distinctive
- **Syne** — Too quirky for a developer tool marketing site

---

### Typography Winner: **JetBrains Mono (code) + Geist Sans (body)**

**Decision:** Use Geist Sans for headlines/body, JetBrains Mono for code blocks and any monospace contexts. Both are free.

**References:**
- [Best Coding Fonts: 20+ Monospace Typefaces for Developers (2026)](https://madegooddesigns.com/coding-fonts/)
- [JetBrains Mono: A free and open source typeface for developers](https://www.jetbrains.com/lp/mono/)
- [Geist Sans Font Pairings](https://maxibestof.one/typefaces/geist)

---

## 6. Deployment

### Contenders

#### Cloudflare Pages — WINNER ✓

**Performance:**
- **TTFB:** 50ms globally (best-in-class)
- **Edge locations:** 300+ worldwide
- **Consistency:** Every location under 50ms (no geographic dead zones)

**Why it wins:**
- Best edge performance globally
- Cloudflare's 300+ edge locations ensure sub-50ms TTFB everywhere
- Cost-efficient (free tier + pay-as-you-go)
- **Synergy:** Cloudflare now owns Astro; expect deeper integration
- Built-in DDoS protection, caching, and Workers
- One-command Astro deployment: `npm run build` → push to GitHub → auto-deploy

**Tradeoffs:**
- Build minutes limited on free tier (500/month)
- Slightly less intuitive UI than Vercel (improving)

---

#### Vercel

**Performance:**
- TTFB: ~70ms for EU visitors, ~90ms for others
- Improved "Fluid Compute" in 2026 for serverless functions
- Quick builds

**Why it loses:**
- More expensive than Cloudflare
- Slight latency advantage over Netlify, but worse than Cloudflare
- Tightly coupled to Next.js ecosystem (not ideal for Astro)

---

#### Netlify

**Performance:**
- TTFB: ~90ms globally
- Solid DX; easy deployments
- Free tier is generous

**Why it loses:**
- Slowest of the three
- Less suitable for performance-critical marketing sites
- Build infrastructure not as advanced as Vercel or Cloudflare

---

### Deployment Winner: **Cloudflare Pages**

**Decision:** Cloudflare Pages wins on performance (50ms globally), cost, and strategic alignment with Astro's acquisition by Cloudflare. Deploy directly from GitHub; zero config.

**References:**
- [Cloudflare Pages vs Netlify vs Vercel](https://bejamas.com/compare/cloudflare-pages-vs-netlify-vs-vercel)
- [Vercel vs Netlify vs Cloudflare Pages: 2025 Comparison](https://www.digitalapplied.com/blog/vercel-vs-netlify-vs-cloudflare-pages-comparison)
- [Cloudflare Pages vs Netlify vs Vercel: Static Site Hosting Compared (2026)](https://danubedata.ro/blog/cloudflare-pages-vs-netlify-vs-vercel-static-hosting-2026)
- [Cloudflare vs Vercel vs Netlify for engineering websites in 2026](https://www.luniq.io/en/resources/blog/cloudflare-vs-vercel-vs-netlify-for-engineering-websites-in-2026)

---

## 7. Performance Targets (Core Web Vitals)

### 2026 Benchmarks

| Metric | Target | PRISM Goal |
|--------|--------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | **< 1.2s** |
| **INP** (Interaction to Next Paint) | < 200ms | **< 100ms** |
| **CLS** (Cumulative Layout Shift) | < 0.1 | **< 0.05** |

### Context

- Pages ranking #1 are 10% more likely to pass Core Web Vitals thresholds
- E-commerce sites see 20% conversion increases when load time drops from 3s to 1s
- Every 100ms of latency costs ~1% in sales (Amazon study)

### How Astro + Cloudflare hits these:

1. **LCP < 1.2s:**
   - Astro renders pure HTML (no hydration delay)
   - Cloudflare edge caches static HTML globally
   - Result: Sub-300ms server response + instant paint

2. **INP < 100ms:**
   - Form interactions use native HTML + minimal JavaScript
   - CSS animations run on compositor (never block main thread)
   - Result: Instant responsiveness

3. **CLS < 0.05:**
   - No dynamic image loading without `aspect-ratio`
   - Fixed layout for above-the-fold
   - Lenis smooth scroll prevents jank
   - Result: Rock-solid visual stability

---

## 8. Recommended Full Stack

```
┌─────────────────────────────────────────┐
│           PRISM Marketing Site          │
├─────────────────────────────────────────┤
│  Framework:    Astro 5                  │
│  Styling:      Tailwind CSS 4           │
│  Animations:   GSAP + CSS scroll-drive  │
│  Smooth Scroll: Lenis                   │
│  Components:   Aceternity UI            │
│               + Shadcn/ui               │
│  Typography:   Geist Sans + JetBrains   │
│  Deployment:   Cloudflare Pages         │
│  DNS:          Cloudflare               │
└─────────────────────────────────────────┘
```

### Installation & Setup

```bash
# Initialize Astro project
npm create astro@latest prism-marketing -- --template minimal

# Install dependencies
npm install tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms @tailwindcss/typography
npm install gsap lenis

# Install UI components (copy-paste, not npm packages)
# From https://ui.aceternity.com/components
# From https://ui.shadcn.com/docs/installation/astro

# Add fonts
# Geist Sans: https://vercel.com/font
# JetBrains Mono: https://www.jetbrains.com/lp/mono/ (or Google Fonts)

# Deploy to Cloudflare Pages
npm run build
git push  # Cloudflare auto-deploys on push to main
```

### Project Structure

```
prism-marketing/
├── src/
│   ├── layouts/
│   │   └── Base.astro          # Base layout with nav/footer
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── docs.astro          # Docs index
│   │   ├── pricing.astro       # Pricing page
│   │   └── contact.astro       # Contact form
│   ├── components/
│   │   ├── Hero.astro          # Animated hero (Aceternity)
│   │   ├── Features.astro      # Feature grid (Tailwind)
│   │   ├── Testimonials.astro  # Testimonial carousel (Aceternity)
│   │   └── ContactForm.tsx     # Contact form (Shadcn + Islands)
│   └── styles/
│       └── globals.css          # Tailwind + custom properties
├── public/
│   └── fonts/                  # Geist, JetBrains Mono (self-hosted)
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

---

## 9. Why This Stack Wins

### Performance
- **Astro 5:** 90% less JavaScript overhead than Next.js
- **Cloudflare Pages:** 50ms TTFB globally (best-in-class)
- **CSS scroll-driven:** 60fps animations without JavaScript
- **Expected result:** LCP < 1.2s, INP < 100ms, CLS < 0.05

### Developer Experience
- **Astro:** Familiar HTML/JSX syntax; minimal learning curve
- **Tailwind CSS:** Universal Utility-first; billions of developers know it
- **Aceternity + Shadcn:** Copy-paste components; no build complexity
- **Expected result:** Website shipped in 2–3 weeks

### Ecosystem Alignment
- **Cloudflare owns Astro:** Deep integration, long-term support
- **Aceternity UI:** Actively maintained; 200+ free components
- **Shadcn/ui:** Community-driven; backed by Vercel ecosystem
- **Expected result:** Minimal tech debt; easy to maintain

### Cost
- **Astro:** Free and open source
- **Tailwind CSS:** Free
- **Aceternity UI:** 200+ free components; $199 for premium
- **Shadcn/ui:** Free
- **Cloudflare Pages:** $0–$20/month (pay-as-you-go)
- **Expected result:** < $300/month total (mostly domain + premium components)

---

## 10. Delivery Checklist

### Phase 1: Foundation (Week 1)
- [ ] Astro 5 project initialized
- [ ] Tailwind CSS 4 configured
- [ ] Geist Sans + JetBrains Mono integrated
- [ ] Base layout (header, footer, navigation)
- [ ] Cloudflare Pages deployment pipeline set up

### Phase 2: Content & Components (Week 2)
- [ ] Homepage hero section (Aceternity UI)
- [ ] Feature showcase (animated, Tailwind)
- [ ] Testimonials/social proof (Aceternity UI)
- [ ] Pricing page (Shadcn/ui + Tailwind)
- [ ] Contact form (Shadcn/ui + Astro form handling)

### Phase 3: Polish & Optimization (Week 3)
- [ ] GSAP animations for complex sequences (if needed)
- [ ] Lenis smooth scroll integration
- [ ] SEO audit (Astro built-in + Lighthouse)
- [ ] Core Web Vitals optimization
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Light/dark mode toggle
- [ ] Analytics integration (PostHog, Posthog-js-lite)

### Phase 4: Launch
- [ ] Final Lighthouse audit (target: 95+ all categories)
- [ ] Performance budget enforcement (< 50KB JS, < 100KB CSS)
- [ ] DNS/SSL via Cloudflare
- [ ] Go live on prism.dev (or chosen domain)

---

## 11. References

### Frameworks
- [Astro vs Next.js: The Technical Truth Behind 40% Faster Static Site Performance](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/)
- [Astro in 2026: Why It's Beating Next.js for Content Sites](https://dev.to/polliog/astro-in-2026-why-its-beating-nextjs-for-content-sites-and-what-cloudflare-s-acquisition-means-6kl)
- [Astro 5.0 Release](https://astro.build/blog/astro-5/)

### Styling
- [Tailwind CSS vs UnoCSS 2026: Utility-First CSS Compared](https://www.pkgpulse.com/blog/tailwind-vs-unocss-2026)
- [Tailwind CSS Alternatives 2026](https://bytepulse.io/tailwind-css-alternatives-review-2026/)

### Animations
- [GSAP vs Motion: A detailed comparison](https://motion.dev/docs/gsap-vs-motion)
- [CSS Scroll-Driven Animations — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Lenis – Smooth Scroll](https://lenis.darkroom.engineering/)

### Components
- [Aceternity UI — Beautiful Tailwind CSS and Framer Motion Components](https://ui.aceternity.com/)
- [Aceternity UI vs Shadcn/ui — Complete Comparison 2026](https://ui.aceternity.com/compare/aceternity-vs-shadcn)

### Typography
- [Best Coding Fonts: 20+ Monospace Typefaces for Developers (2026)](https://madegooddesigns.com/coding-fonts/)
- [JetBrains Mono: A free and open source typeface for developers](https://www.jetbrains.com/lp/mono/)

### Deployment
- [Cloudflare Pages vs Netlify vs Vercel](https://bejamas.com/compare/cloudflare-pages-vs-netlify-vs-vercel)
- [Cloudflare vs Vercel vs Netlify for engineering websites in 2026](https://www.luniq.io/en/resources/blog/cloudflare-vs-vercel-vs-netlify-for-engineering-websites-in-2026)

### Performance
- [Core Web Vitals Optimization Guide 2026](https://skyseodigital.com/core-web-vitals-optimization-complete-guide-for-2026/)

---

## 12. Next Steps

1. **Create this stack:** Use `npm create astro@latest` with minimal template
2. **Add Tailwind:** Follow Astro's official integration guide
3. **Copy components:** Start with Aceternity UI hero section + Shadcn contact form
4. **Deploy:** Push to GitHub; Cloudflare auto-deploys
5. **Iterate:** Add content, refine animations, measure Core Web Vitals

---

**End of Tech Stack Research**

*Last updated: 2026-04-13*
