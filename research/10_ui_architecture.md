# PRISM Marketing Website — UI Component Architecture

**Date:** April 13, 2026
**Status:** Complete Architecture Reference
**Author:** Frontend Architecture Team
**Framework:** Astro 5 + Tailwind CSS 4

---

## Executive Summary

This document defines the **complete component inventory, responsive strategy, CSS architecture, and accessibility guidelines** for the PRISM marketing website. It's the source of truth for every developer building the site and ensures consistency, performance, and accessibility across all pages.

### Key Principles

1. **Component-driven:** Reusable, well-documented, tested in isolation
2. **Responsive first:** Mobile (< 768px) → Tablet (768–1199px) → Desktop (1200px+)
3. **Performance-obsessed:** Lighthouse 100 target; < 50KB JS, < 100KB CSS
4. **Dark-first design:** All components designed for dark backgrounds first, light theme as variant
5. **Accessibility native:** WCAG 2.1 AA standard, keyboard navigation, semantic HTML
6. **Astro islands:** Minimal JavaScript; only interactive components use `client:*` directives

---

## 1. Page Layout Architecture

### Overall Page Structure

```
┌─────────────────────────────────────────┐
│  NAVBAR (sticky, z-index: 1000)         │  Fixed height: 72px
├─────────────────────────────────────────┤
│  HERO SECTION                           │  Full viewport height or 100vh
├─────────────────────────────────────────┤
│  SECTION 1: Why PRISM                   │  Max-width container
├─────────────────────────────────────────┤
│  SECTION 2: The Four States             │  4 state cards
├─────────────────────────────────────────┤
│  SECTION 3: Suite Overview              │  4 product cards
├─────────────────────────────────────────┤
│  SECTION 4: Feature Showcase            │  Alternating image + text
├─────────────────────────────────────────┤
│  SECTION 5: Comparison / MRO Explainer  │  Interactive tabs/demo
├─────────────────────────────────────────┤
│  SECTION 6: Language Support            │  Tag grid or logo grid
├─────────────────────────────────────────┤
│  SECTION 7: Testimonials                │  Carousel or masonry
├─────────────────────────────────────────┤
│  SECTION 8: Metrics / Social Proof      │  Stat cards
├─────────────────────────────────────────┤
│  SECTION 9: Roadmap                     │  Timeline or vertical cards
├─────────────────────────────────────────┤
│  SECTION 10: CTA (Final)                │  Install/docs buttons
├─────────────────────────────────────────┤
│  FOOTER                                 │  Dark background, links
└─────────────────────────────────────────┘
```

### Max-Width Container Strategy

```css
/* Global max-width pattern */
.container {
  max-width: 1280px;        /* 1280px on desktop; Tailwind xl */
  margin: 0 auto;
  padding: 0 1.5rem;        /* 24px on desktop; 16px on mobile */
  width: 100%;
}

/* Responsive padding adjustments */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;        /* 16px on mobile */
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;     /* 12px on small phones */
  }
}
```

**Rationale:** 1280px max-width is standard for modern SaaS; balances content readability with screen real estate.

### Z-Index Hierarchy

```
1000  ← Navbar (sticky, always on top)
900   ← Mobile menu (slide-in overlay)
100   ← Modals, dropdowns
50    ← Floating CTA buttons
10    ← Cards, elevated content
1     ← Base layer
0     ← Background, animations
```

### Responsive Breakpoints

| Breakpoint | Width | Device | Grid Cols |
|-----------|-------|--------|-----------|
| **Mobile** | < 480px | iPhone SE, small phones | 1 |
| **Tablet Small** | 480–768px | iPhone 12+, iPad mini | 2 |
| **Tablet** | 768–1024px | iPad, small laptops | 3 |
| **Desktop** | 1024–1280px | MacBook Air, standard monitors | 4 |
| **Desktop Wide** | 1280px+ | 27" monitors, ultrawides | 6 |

*Tailwind equivalents: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)*

### Grid System

PRISM uses **Tailwind's native grid** with a 12-column base:

```astro
<!-- Example: 3 equal columns on desktop, 1 on mobile -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

**Grid Column Breakdown:**
- Mobile: 1 column (full width)
- Tablet: 2–3 columns (50–33% width each)
- Desktop: 4–6 columns (25–16% width each)

### Spacing Scale

All spacing uses an **8-pixel base unit**:

```
0.25rem = 4px    (xs)
0.5rem  = 8px    (sm, baseline)
1rem    = 16px   (md)
1.5rem  = 24px   (lg)
2rem    = 32px   (xl)
3rem    = 48px   (2xl)
4rem    = 64px   (3xl)
6rem    = 96px   (4xl)
8rem    = 128px  (5xl)
```

**Section padding:** `py-12 md:py-16 lg:py-20` (48px mobile → 64px tablet → 80px desktop)

**Component gaps:** `gap-4` (16px) between related items; `gap-8` (32px) between major sections

---

## 2. Component Inventory

### Navigation Components

#### **Navbar (Desktop)**

**Variants:**
- Default (transparent background)
- Scrolled (semi-transparent dark background with border)
- With mobile menu open (dark overlay behind nav)

**Elements:**
- Logo (left, clickable to home)
- Nav links (center/right, 4–5 items: Docs, Extension, CLI, Blog, etc.)
- Theme toggle button (right)
- CTA button (right, "Install" or "Get Started")

**Responsive:**
- Desktop (1024px+): Horizontal layout, all links visible
- Tablet (768–1024px): Links visible but may wrap
- Mobile (< 768px): Hamburger menu, nav links hidden

**Accessibility:**
- `<nav role="navigation">`
- Keyboard navigation: Tab through links, Enter/Space to activate
- Focus indicators: 2px outline in accent blue
- ARIA labels on buttons: `aria-label="Toggle mobile menu"`

**Code structure (Astro):**

```astro
---
// src/components/Navbar.astro
const navItems = [
  { label: 'Docs', href: '/docs' },
  { label: 'Extension', href: '/extension' },
  { label: 'CLI', href: '/cli' },
];
---

<nav class="fixed top-0 left-0 right-0 z-1000 bg-gradient-to-b from-slate-950 to-transparent">
  <div class="container flex items-center justify-between h-18">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2">
      <PrismLogo />
      <span class="text-xl font-bold text-slate-100">PRISM</span>
    </a>

    <!-- Desktop Nav -->
    <ul class="hidden lg:flex items-center gap-8">
      {navItems.map(item => (
        <li>
          <a href={item.href} class="text-slate-300 hover:text-slate-100 transition">
            {item.label}
          </a>
        </li>
      ))}
    </ul>

    <!-- Right Section: Theme + CTA -->
    <div class="flex items-center gap-4">
      <ThemeToggle client:idle />
      <button class="hidden sm:block px-4 py-2 bg-blue-600 text-white rounded transition hover:bg-blue-700">
        Install
      </button>
      <MobileMenuButton client:load />
    </div>
  </div>
</nav>
```

---

#### **Mobile Menu**

**Behavior:**
- Hamburger icon (3 horizontal lines) in mobile view
- Click opens slide-in overlay from right (or bottom)
- Dim background (semi-transparent overlay) behind menu
- Close button (X) in top-right
- Smooth slide animation: 200ms ease-out

**Elements:**
- Hamburger toggle (always visible on mobile)
- Menu items (full-width, stacked vertically)
- Theme toggle
- CTA button
- Optional: social links at bottom

**Responsive:**
- Visible: < 768px
- Hidden: 768px+

**Accessibility:**
- `<button aria-expanded="false" aria-controls="mobile-menu">`
- Menu container: `id="mobile-menu"`
- Escape key closes menu
- Focus trap: Tab stays within menu while open

---

#### **Theme Toggle Button**

**Variants:**
- Sun icon (light mode active)
- Moon icon (dark mode active)

**Interaction:**
- Click toggles dark/light mode
- State persists via localStorage

**Accessibility:**
- `<button aria-label="Toggle dark mode">`
- Clear visual indicator of current theme

---

### Hero Section Components

#### **Hero Container**

**Structure:**
- Full viewport height (or min-height: 100vh)
- Dark background (gradient from navy to darker navy)
- Optional animated background (SVG particles, slowly moving shapes)
- Positioned: relative (child elements positioned absolutely/relatively)

**Content stack:**
- Hero headline (centered, 3–4xl on mobile → 5–6xl on desktop)
- Hero subtitle (centered, smaller, secondary color)
- Hero description (centered, body text, max-width 600px)
- CTA button group (2–3 buttons, centered)

---

#### **Animated Prism Visual**

**Implementation:**
- SVG prism icon (32×32 → 64×64 → 128×128 on desktop)
- Positioned above headline or to the side
- Animation: gentle rotation + scale on load (GSAP timeline)
- On scroll: parallax effect (CSS scroll-driven animation)

**GSAP Timeline:**

```javascript
gsap.timeline({ delay: 0.2 })
  .from('.prism-icon', { opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out' })
  .to('.prism-icon', { rotation: 360, duration: 20, ease: 'none', repeat: -1 }, 0);
```

**Scroll-driven (CSS):**

```css
.prism-icon {
  animation: parallax linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes parallax {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(-50px); opacity: 1; }
}
```

---

#### **Hero Text Stack**

**Typography:**
- **Headline:** `font-bold text-4xl md:text-5xl lg:text-6xl text-slate-100`
- **Subtitle:** `text-lg md:text-xl text-slate-400 mt-4`
- **Description:** `text-base md:text-lg text-slate-300 mt-6 max-w-2xl mx-auto`

**Spacing:** Vertical rhythm with consistent line-height (1.5–1.6)

**Word breaking:** Use `<br>` strategically on mobile to control line breaks for readability

---

#### **CTA Button Group**

**Buttons:**
- Primary: "Get Started / Install" (bright blue)
- Secondary: "Read Docs" (outlined, transparent background)

**Layout:**
- Desktop: Side-by-side, gap-4
- Mobile: Stacked vertically, full-width

**Responsiveness:**

```astro
<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
  <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Get Started
  </button>
  <button class="px-6 py-3 border border-slate-500 text-slate-300 rounded-lg hover:bg-slate-900">
    Read Docs
  </button>
</div>
```

---

#### **Background Effects Layer**

**Techniques:**
1. **Gradient background:** `linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`
2. **Animated particles (GSAP + SVG):**
   - 5–10 small circles
   - Random positions, slow drift animation
   - Low opacity (0.05–0.15)
   - Blur filter for softness
3. **Glow effect (CSS):**
   - Radial gradient with blur
   - Positioned behind headline
   - Subtle, not overpowering

**Performance:**
- Use CSS for static effects (gradients, blur)
- GSAP only for continuous/interactive animations
- Test on mobile: disable heavy animations if viewport < 480px

---

### State Card Components

#### **State Card (4 Variants)**

**Structure:**
- Border: top 3px line in state color (green/amber/red/grey)
- Background: dark card color (`bg-slate-900`)
- Icon: left-aligned, 32×32
- Content: headline + description
- Optional: code snippet or example

**Variants:**

1. **Owns (Green)**
   - Border color: `#10B981`
   - Icon: Check mark
   - Copy: "This method runs. No base class defines it."

2. **Overrides (Amber)**
   - Border color: `#F59E0B`
   - Icon: Arrow up
   - Copy: "You override a base class. Your version runs."

3. **Overridden (Blue)**
   - Border color: `#5B6AF0` (accent)
   - Icon: Arrow down
   - Copy: "A descendant class overrides this. Dead code for subclasses."

4. **Shadowed (Red)**
   - Border color: `#EF4444`
   - Icon: Eye slash
   - Copy: "A base class wins. This method never runs."

**Responsive:**
- Desktop: 4-column grid (`grid-cols-4`)
- Tablet: 2-column grid (`md:grid-cols-2`)
- Mobile: 1 column (`grid-cols-1`)

**Accessibility:**
- Semantic HTML: `<article>`
- Heading: `<h3>`
- Icon: `<svg aria-hidden="true">` (icon is decorative)
- Description: accessible text

**CSS:**

```css
.state-card {
  @apply border-l-4 bg-slate-900 rounded-lg p-6 transition hover:bg-slate-800;
}

.state-card.owns { @apply border-l-green-500; }
.state-card.overrides { @apply border-l-amber-500; }
.state-card.overridden { @apply border-l-blue-500; }
.state-card.shadowed { @apply border-l-red-500; }
```

---

### Suite Card Components

#### **Suite Card (4 Product Cards)**

**Structure:**
- Icon (large, 64×64)
- Product name (headline)
- Description (body text)
- Features list (3–4 bullet points)
- CTA link ("Learn more →")

**Variants:**

1. **Extension**
   - Icon: VS Code logo (or custom prism icon)
   - Features: "Real-time MRO", "Jump to definition", "CodeLens"

2. **CLI**
   - Icon: Terminal icon
   - Features: "Scan entire codebase", "JSON export", "CI integration"

3. **CI Hooks**
   - Icon: Gear icon
   - Features: "Pre-commit checks", "PR annotations", "GitHub Actions"

4. **MCP / AI Integration**
   - Icon: Brain/AI icon
   - Features: "Claude integration", "Agent support", "Custom prompts"

**Hover effect:**
- Slight scale up (1.02x)
- Border color change
- Shadow increase

**Responsive:**
- Desktop: 4-column grid
- Tablet: 2-column grid
- Mobile: 1 column

**CSS:**

```css
.suite-card {
  @apply bg-slate-800 rounded-xl p-8 border border-slate-700 transition;
  @apply hover:scale-102 hover:border-blue-500 hover:shadow-lg;
}

.suite-card-icon {
  @apply w-16 h-16 mb-4 text-blue-400;
}

.suite-card-link {
  @apply text-blue-400 hover:text-blue-300 flex items-center gap-2 mt-4;
}
```

---

### Feature Showcase Components

#### **Feature Showcase Section**

**Pattern:** Alternating image + text layout

**For each feature:**
- Left (odd): Image / animation
- Right (odd): Text content
- Left (even): Text content
- Right (even): Image / animation

**On mobile:** Always stack vertically (text above image)

**Content:**
- Headline: Feature name
- Description: 2–3 sentences
- Key benefits: 3–4 bullet points
- Screenshot or looping video/animation

**Responsive structure:**

```astro
<section class="py-16 md:py-20">
  <div class="container">
    <!-- Feature 1: Image left, text right -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div class="md:order-1">
        <FeatureImage src="..." alt="..." />
      </div>
      <div class="md:order-2">
        <FeatureText headline="..." description="..." />
      </div>
    </div>

    <!-- Feature 2: Text left, image right -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20">
      <div>
        <FeatureText headline="..." description="..." />
      </div>
      <div>
        <FeatureImage src="..." alt="..." />
      </div>
    </div>
  </div>
</section>
```

---

#### **Animated Demo Container**

**Purpose:** Show looping feature demos without full videos

**Technique:**
- MP4 video (autoplay, loop, muted, no controls)
- Fallback: static screenshot
- Aspect ratio: 16:9
- Border radius: 12px
- Optional: subtle border highlight

**HTML:**

```html
<video
  autoplay
  loop
  muted
  playsinline
  class="w-full rounded-lg border border-slate-700 shadow-lg"
>
  <source src="/demo-mro.mp4" type="video/mp4" />
  <img src="/demo-mro-fallback.png" alt="MRO demo" />
</video>
```

**Performance:**
- Compress videos: target < 5MB per video
- Use H.264 codec for compatibility
- Disable on slow connections: `media="(prefers-reduced-motion: no-preference)"`

---

### Interactive Components

#### **Tab Switcher**

**Use case:** Compare MRO in different languages, or show different feature sets

**Structure:**
- Tab buttons (horizontal, full-width on mobile)
- Tab content panels (only one visible at a time)
- Optional: animated underline following active tab

**Accessibility:**
- `<button role="tab" aria-selected="true" aria-controls="panel-1">`
- Panel: `<div role="tabpanel" id="panel-1">`
- Keyboard: Left/Right arrows switch tabs, Home/End for first/last

**JavaScript (Astro island, minimal):**

```typescript
// Tab switching with smooth fade
const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Deactivate all
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    panels.forEach(p => p.classList.add('hidden'));

    // Activate selected
    tab.setAttribute('aria-selected', 'true');
    panels[index].classList.remove('hidden');
  });
});
```

---

#### **Code Block with Copy Button**

**Elements:**
- Language badge (top-left, small grey text)
- Code content (monospace, syntax highlighted)
- Copy button (top-right, hover effect)
- Line numbers (optional, light grey)

**Syntax highlighting:** Shiki or Prism.js

**Copy functionality:**

```astro
---
// src/components/CodeBlock.astro
const { code, lang } = Astro.props;
---

<div class="code-block relative bg-slate-900 rounded-lg overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
    <span class="text-xs text-slate-400 font-mono">{lang}</span>
    <button
      class="copy-button px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-300"
      data-code={code}
    >
      Copy
    </button>
  </div>
  <pre class="overflow-x-auto p-4 text-sm"><code set:html={highlightedCode} /></pre>
</div>

<script>
  document.querySelectorAll('.copy-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.code;
      navigator.clipboard.writeText(code);
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = 'Copy'), 2000);
    });
  });
</script>
```

---

#### **Install Command**

**Pattern:** Grey box with command, copy button

**Design:**
- Background: `bg-slate-900`
- Border: `border border-slate-700`
- Font: monospace (JetBrains Mono)
- Text: `text-slate-100`

**Example:**

```astro
<div class="bg-slate-900 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
  <code class="text-slate-100 font-mono">npm install -g @prism/cli</code>
  <button class="copy-button px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white">
    Copy
  </button>
</div>
```

---

#### **Language Tag Grid**

**Purpose:** Show supported languages at a glance

**Design:**
- Grid of small tags/badges
- Icon + language name
- Background: `bg-slate-800`
- Border: `border border-slate-700`
- Hover: scale up slightly, highlight

**Responsive:**
- Desktop: 6–8 tags per row
- Tablet: 4 tags per row
- Mobile: 3 tags per row

**HTML:**

```astro
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {languages.map(lang => (
    <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col items-center gap-2 hover:bg-slate-700 transition">
      <img src={lang.icon} alt={lang.name} class="w-6 h-6" />
      <span class="text-sm text-slate-300">{lang.name}</span>
    </div>
  ))}
</div>
```

---

#### **Metric Card**

**Use case:** Social proof, adoption stats

**Elements:**
- Large number (stat, bold, 2xl/3xl)
- Label (description, smaller, secondary color)
- Optional: small description or unit

**Responsive:**
- Desktop: 4-column grid
- Tablet: 2-column grid
- Mobile: 1 column

**Example:**

```astro
<div class="text-center">
  <div class="text-4xl md:text-5xl font-bold text-blue-400">50K+</div>
  <div class="text-lg text-slate-400 mt-2">Active Users</div>
</div>
```

---

#### **Accordion / FAQ**

**Behavior:**
- Click to expand/collapse item
- Only one open at a time (optional)
- Smooth height animation

**Accessibility:**
- `<button aria-expanded="false" aria-controls="faq-1">`
- Semantic HTML: `<dl>`, `<dt>`, `<dd>` or custom `<details>`

**Simple implementation (native HTML):**

```html
<details class="border-b border-slate-700 py-4">
  <summary class="cursor-pointer text-lg font-semibold text-slate-100 hover:text-blue-400">
    What is MRO?
  </summary>
  <p class="text-slate-300 mt-4">Method Resolution Order is...</p>
</details>
```

---

### Feedback Components

#### **Toast Notification**

**Use case:** "Copied to clipboard", "Form submitted", error messages

**Variants:**
- Success (green border, green icon)
- Error (red border, red icon)
- Info (blue border, blue icon)
- Warning (amber border, amber icon)

**Position:** Bottom-right, fixed

**Auto-dismiss:** 4 seconds

**Accessibility:**
- `role="status"` (success/info)
- `role="alert"` (error/warning)
- Announce to screen readers

---

#### **Skeleton Loader**

**Pattern:** Placeholder while content loads

**Design:**
- Grey bars matching content layout
- Subtle pulsing animation

**CSS:**

```css
.skeleton {
  @apply bg-slate-700 rounded animate-pulse;
}
```

---

#### **Progress Indicator**

**Use case:** Multi-step forms, download progress

**Types:**
- Linear progress bar (horizontal)
- Circular progress (radial)

**Colors:** Blue/green for active, grey for inactive

---

### Footer Components

#### **Footer Container**

**Layout:**
- Full width, dark background
- Max-width container inside
- Padding: `py-12 md:py-16`

**Structure (4 columns + legal):**

```
┌─────────────────────────────────┐
│ PRISM (logo + tagline)  │ Docs  │  Features  │ Community  │ Company │
├─────────────────────────────────┤
│ Copyright • Privacy • Terms      │
└─────────────────────────────────┘
```

**Responsive:**
- Desktop: 5 columns
- Tablet: 3 columns (2x2 + logo)
- Mobile: 1 column (stacked)

---

#### **Link Columns**

**Each column contains:**
- Column heading (bold, `text-slate-100`)
- 4–5 links (text, `text-slate-400` → hover `text-blue-400`)
- Optional: icon next to link (external link icon)

**Spacing:** `gap-4` between links

---

#### **Social Links**

**Icons:**
- GitHub
- Twitter/X
- LinkedIn
- Discord (optional)

**Design:**
- Small icon buttons (32×32px)
- Dark background, light icon
- Hover: color shift to accent color

**Accessibility:**
- `<a aria-label="Follow us on GitHub">`

---

## 3. Responsive Strategy

### Mobile-First Approach

**Principle:** Build for smallest screen first, then enhance with media queries.

**Example:**

```astro
<!-- Mobile first: 1 column -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Grid auto-expands on larger screens -->
</div>
```

### Breakpoint Strategy by Section

#### Hero Section
- **Mobile (< 480px):**
  - Prism icon: 48×48px
  - Headline: `text-3xl`
  - Single CTA button
  - Min-height: 100vh (full viewport)

- **Tablet (480–768px):**
  - Prism icon: 64×64px
  - Headline: `text-4xl`
  - Two CTA buttons side-by-side
  - Min-height: 100vh

- **Desktop (768px+):**
  - Prism icon: 128×128px
  - Headline: `text-6xl`
  - Two CTA buttons with spacing
  - Min-height: 100vh, parallax background

#### State Cards Section
- **Mobile:** 1 column (4 cards stack vertically)
- **Tablet (< 1024px):** 2 columns
- **Desktop (1024px+):** 4 columns

#### Feature Showcase
- **Mobile:** All images/text stack vertically
- **Tablet:** Still stacked (readability)
- **Desktop:** Alternating side-by-side layout with `md:order-*`

#### Footer
- **Mobile:** Single column, centered
- **Tablet:** 2–3 columns
- **Desktop:** 5 columns (equal-width)

---

## 4. CSS Architecture

### Utility-First with Tailwind CSS 4

**Philosophy:**
- Tailwind provides 95% of styling
- Custom CSS only for animations, complex layouts, or performance-critical styles
- No CSS-in-JS; pure Tailwind + CSS files

### Color System

**Palette (from CLAUDE.md and design research):**

```css
:root {
  /* Backgrounds */
  --bg-dark: #1E2130;        /* Main panel background */
  --bg-card: #252840;        /* Card backgrounds */
  --bg-secondary: #1a1f2e;   /* Alternative background */

  /* Borders & Accents */
  --border-dark: #2D3148;    /* Card borders */
  --border-light: #3d4254;   /* Lighter borders */

  /* Text */
  --text-primary: #E2E8F0;   /* Main text */
  --text-secondary: #6B7280; /* Labels, descriptions */
  --text-muted: #4B5563;     /* Disabled state */

  /* Status Colors */
  --status-owns: #10B981;    /* Green - method owns */
  --status-overrides: #F59E0B; /* Amber - method overrides */
  --status-shadowed: #EF4444; /* Red - shadowed method */
  --status-overridden: #5B6AF0; /* Blue - overridden method */

  /* Accent & Interactive */
  --accent: #5B6AF0;         /* Primary interactive color */
  --accent-hover: #7c8cff;   /* Hover state */
}

/* Light theme overrides */
@media (prefers-color-scheme: light) {
  :root {
    --bg-dark: #FFFFFF;
    --bg-card: #F5F5F5;
    --text-primary: #1E2130;
    --text-secondary: #666666;
    --accent: #0d47a1;
    --accent-hover: #1a5fc4;
  }
}
```

### Dark Mode Implementation

**Approach:** Use Tailwind's `class` strategy with localStorage

**HTML:**

```html
<!-- Add 'dark' class to root -->
<html class="dark">
```

**CSS:**

```css
/* Tailwind dark: prefix applies in dark mode */
.dark .card {
  @apply bg-slate-900 border-slate-700;
}

/* Light mode is default */
.card {
  @apply bg-white border-gray-200;
}
```

**JavaScript (Astro island):**

```typescript
// ThemeToggle.tsx
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const html = document.documentElement;

    if (saved) {
      setTheme(saved);
      html.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button onClick={toggle} aria-label="Toggle dark mode">
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
```

### Custom CSS (Minimal)

**File:** `src/styles/custom.css`

Only add CSS here for:
- Complex animations (keyframes, GSAP timelines)
- Component-specific hover states
- Media queries not covered by Tailwind
- CSS variables and theme overrides

```css
/* Example: Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Focus ring for accessibility */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Animation Classes

**CSS scroll-driven animations:**

```css
/* Fade on scroll */
.fade-in-on-scroll {
  animation: fadeInOnScroll linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes fadeInOnScroll {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Scale on scroll */
.scale-on-scroll {
  animation: scaleOnScroll linear both;
  animation-timeline: view();
}

@keyframes scaleOnScroll {
  from { transform: scale(0.9); }
  to { transform: scale(1); }
}
```

**GSAP animations (JavaScript):**

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Stagger animation on elements
gsap.to('.card', {
  opacity: 1,
  y: 0,
  stagger: 0.1,
  duration: 0.6,
  scrollTrigger: {
    trigger: '.card-container',
    start: 'top 80%',
    end: 'top 20%',
    toggleActions: 'play none none reverse',
  },
});
```

---

## 5. Image & Asset Strategy

### SVG vs PNG vs WebP

**SVG:** Used for logos, icons, prism diagrams
- No quality loss at any scale
- File size: 1–5KB
- Use: `<svg>` inline or `<img src="...svg">`

**WebP:** Used for feature screenshots, demos
- Modern browsers supported (95%+ coverage in 2026)
- 25% smaller than PNG
- Use: with PNG fallback via `<picture>`

**PNG:** Fallback for old browsers
- Used for images that aren't screenshots (e.g., testimonial avatars)
- Compressed with TinyPNG or similar

### Image Optimization

**Pipeline:**

1. **Source:** High-quality original (PNG-24 or RAW)
2. **Resize:** Scale to max display width (1280px for desktop)
3. **Optimize:** Compress with ImageOptim (macOS) or ImageMagick
4. **Convert:** Export to WebP with PNG fallback
5. **Lazy load:** `loading="lazy"` on all images below fold

**Responsive Images:**

```html
<picture>
  <source srcset="/img/feature.webp" type="image/webp" />
  <source srcset="/img/feature.png" type="image/png" />
  <img
    src="/img/feature.png"
    alt="Feature demo"
    class="w-full rounded-lg"
    loading="lazy"
  />
</picture>
```

### Lazy Loading Approach

**Native:** Use `loading="lazy"` on `<img>` tags (supported by all modern browsers)

```html
<img src="..." alt="..." loading="lazy" />
```

**Intersection Observer (if native is insufficient):**

```typescript
const images = document.querySelectorAll('img[data-lazy]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src!;
      observer.unobserve(img);
    }
  });
});
images.forEach(img => observer.observe(img));
```

### Placeholder / Blur-Up Technique

**Approach:** Inline tiny blurred version while full image loads

```astro
---
// src/components/Image.astro
// Requires: blurhash or LQIP (low-quality image placeholder)
import { getPlaiceholder } from 'plaiceholder';

const { src, alt } = Astro.props;
const { base64, img } = await getPlaiceholder(src);
---

<img
  src={src}
  alt={alt}
  style={`background-image: url('${base64}'); background-size: cover;`}
  loading="lazy"
/>
```

### Icon System

**Approach:** Inline SVG icons for performance + control

**Icon library:** Store SVG files in `src/components/icons/`

```astro
---
// src/components/icons/CheckIcon.astro
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
</svg>
```

**Usage:**

```astro
<CheckIcon class="w-6 h-6 text-green-500" />
```

---

## 6. Performance Optimization

### Critical CSS Inline Strategy

**Goal:** Render above-the-fold content without waiting for full CSS bundle

**Approach:**
1. Identify above-the-fold styles (navbar, hero, first section)
2. Extract to `critical.css`
3. Inline in `<head>` during build
4. Load rest of CSS asynchronously

**Astro integration:**

```astro
---
// src/layouts/Base.astro
import criticalCSS from '../styles/critical.css?raw';
---

<html>
  <head>
    <style set:html={criticalCSS} />
    <link rel="stylesheet" href="/styles/main.css" />
  </head>
  ...
</html>
```

### Font Loading

**Strategy:**

1. **Self-host fonts** (faster than Google Fonts CDN)
2. **Preload:** `<link rel="preload" as="font" href="...">` for above-the-fold fonts
3. **Font display:** `font-display: swap` for Tailwind config

**Tailwind config:**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      mono: ['JetBrains Mono', 'monospace'],
      sans: ['Geist Sans', 'system-ui', 'sans-serif'],
    },
  },
};
```

**CSS:**

```css
@font-face {
  font-family: 'Geist Sans';
  src: url('/fonts/geist-sans.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/jetbrains-mono.woff2') format('woff2');
  font-display: swap;
}
```

**HTML (preload):**

```html
<link rel="preload" as="font" href="/fonts/geist-sans.woff2" type="font/woff2" crossorigin />
<link rel="preload" as="font" href="/fonts/jetbrains-mono.woff2" type="font/woff2" crossorigin />
```

### JavaScript Loading

**Strategy:**
- `defer`: Load scripts after page parse (most scripts)
- `async`: Load in parallel, execute immediately (analytics, non-blocking)
- Dynamic import: Load interactive components on demand

**Example (Astro):**

```astro
---
// src/components/InteractiveSection.astro
---

<div id="interactive-section">
  <!-- Static content -->
</div>

<script type="module">
  // This is bundled by Astro and loaded with 'defer'
  import { initAnimation } from './animation.js';
  initAnimation();
</script>
```

**Analytics (async, non-blocking):**

```html
<!-- PostHog analytics -->
<script
  async
  src="https://posthog-js-light.vercel.app/lib.js"
></script>
```

### Image Optimization Pipeline

**Steps:**
1. Export from design tool at 2x resolution (for retina displays)
2. Crop to content (remove padding)
3. Resize to max breakpoint width (max 1280px)
4. Compress: ImageOptim or equivalent
5. Convert to WebP
6. Create low-res placeholder

**Tools:**
- ImageMagick: `convert input.png -quality 80 output.jpg`
- ImageOptim: GUI for manual optimization
- Cloudflare Image Optimization: On-the-fly optimization during build

### Bundle Size Budget

**Targets (per page):**

| Asset | Budget |
|-------|--------|
| **HTML** | < 50KB |
| **CSS** | < 100KB (gzipped: < 30KB) |
| **JavaScript** | < 50KB (gzipped: < 15KB) |
| **Images (above fold)** | < 200KB |
| **Total (all)** | < 400KB |

**Monitoring:**
- Lighthouse CI on each deploy
- Bundle analyzer: `npm run build -- --analyze`

**Enforcement:**
- Pre-commit hook: Warn if bundle > 50KB
- CI check: Fail if Lighthouse < 90

---

## 7. Accessibility Checklist

### Semantic HTML

**Every component uses semantic structure:**

```astro
<!-- Navigation -->
<nav>
  <ul>
    <li><a href="...">Link</a></li>
  </ul>
</nav>

<!-- Main content -->
<main>
  <!-- Page content here -->
</main>

<!-- Sections with headings -->
<section>
  <h2>Section Title</h2>
  <p>Content...</p>
</section>

<!-- Articles -->
<article>
  <h3>Article Title</h3>
  <p>Content...</p>
</article>

<!-- Footer -->
<footer>
  <p>&copy; 2026 PRISM</p>
</footer>
```

### ARIA Labels Needed

**Components requiring ARIA:**

| Component | ARIA Labels |
|-----------|------------|
| **Navbar hamburger** | `aria-label="Toggle mobile menu"`, `aria-expanded`, `aria-controls` |
| **Theme toggle** | `aria-label="Toggle dark mode"` |
| **Tabs** | `role="tab"`, `aria-selected`, `aria-controls` |
| **Accordion** | `role="button"`, `aria-expanded` |
| **Status messages** | `role="status"` or `role="alert"` |
| **Links to external** | `aria-label="..." target="_blank"` |
| **Icon-only buttons** | `aria-label="..."` |

**Example:**

```astro
<button
  aria-label="Copy to clipboard"
  class="copy-btn"
>
  📋
</button>

<div role="status" aria-live="polite">
  Copied to clipboard!
</div>
```

### Keyboard Navigation Flow

**Expected flow through page:**

1. **Skip navigation link** (before navbar)
2. **Navbar links** (Tab order: Home → Docs → Extension → CLI → etc.)
3. **Theme toggle** (right side of navbar)
4. **CTA button** (right side of navbar)
5. **Hero buttons** (Tab then Enter to activate)
6. **Section cards** (Tab through each card)
7. **Footer links** (Tab through columns)

**Skip navigation link:**

```astro
<a href="#main-content" class="skip-to-main">Skip to main content</a>

<main id="main-content">
  <!-- Page content -->
</main>

<style>
  .skip-to-main {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  }

  .skip-to-main:focus {
    top: 0;
  }
</style>
```

### Focus Indicators

**All interactive elements must have visible focus:**

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Button-specific */
button:focus-visible {
  outline: 2px solid #5B6AF0;
  outline-offset: 4px;
}

/* Links */
a:focus-visible {
  outline: 2px solid #5B6AF0;
  outline-offset: 2px;
}

/* Form inputs */
input:focus-visible,
textarea:focus-visible {
  border-color: #5B6AF0;
  box-shadow: 0 0 0 3px rgba(91, 106, 240, 0.1);
}
```

**Testing:** Tab through entire site; all buttons/links should show clear 2px outline

### Contrast Ratios (WCAG AA)

**All text must meet 4.5:1 contrast minimum:**

```
Text              Contrast Ratio
─────────────────────────────────
Primary (#E2E8F0) on Dark (#1E2130):  ~14:1 ✓
Secondary (#6B7280) on Dark:          ~4.8:1 ✓
Accent (#5B6AF0) on Dark:             ~3.2:1 ✗ (too low for small text)
Red (#EF4444) on Dark:                ~5.8:1 ✓
Green (#10B981) on Dark:              ~4.2:1 ✓
Amber (#F59E0B) on Dark:              ~4:1 ✓
```

**Fix for accent text:** Use darker shade or only for large text (18px+)

### Reduced Motion Support

**Disable animations for users who prefer reduced motion:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript detection:**

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Only run GSAP animations if motion is not reduced
  gsap.to('.element', { /* ... */ });
}
```

### Color Not Sole Means of Conveyance

**Don't use color alone to communicate:**

```astro
<!-- ❌ Bad: Color only -->
<div class="text-red-500">Error</div>

<!-- ✓ Good: Color + icon + text -->
<div class="flex items-center gap-2 text-red-500">
  <svg class="w-5 h-5"><!-- Error icon --></svg>
  <span>Error: Invalid email</span>
</div>
```

---

## 8. Development Workflow

### File Structure

```
prism-marketing/
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── StateCard.astro
│   │   ├── SuiteCard.astro
│   │   ├── FeatureShowcase.astro
│   │   ├── CodeBlock.astro
│   │   ├── TabSwitcher.tsx (island)
│   │   ├── ThemeToggle.tsx (island)
│   │   ├── Footer.astro
│   │   ├── Navbar.astro
│   │   └── icons/
│   │       ├── PrismLogo.astro
│   │       ├── CheckIcon.astro
│   │       └── ...
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro (homepage)
│   │   ├── docs.astro (docs index)
│   │   ├── pricing.astro
│   │   └── 404.astro
│   └── styles/
│       ├── global.css (Tailwind imports)
│       ├── custom.css (custom animations, overrides)
│       └── critical.css (above-fold styles)
├── public/
│   ├── fonts/
│   │   ├── geist-sans.woff2
│   │   └── jetbrains-mono.woff2
│   └── images/
│       ├── prism-logo.svg
│       └── ...
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

### Component Checklist

When creating a new component:

- [ ] Semantic HTML (`<article>`, `<button>`, etc.)
- [ ] Responsive design (mobile → tablet → desktop)
- [ ] ARIA labels where needed
- [ ] Dark/light theme variants
- [ ] Accessibility: focus indicators, contrast
- [ ] Performance: lazy-loaded images, no heavy JS
- [ ] Documentation: JSDoc comments
- [ ] Storybook story (optional but recommended)

---

## 9. Color Reference Card

**Use this as a quick copy-paste for every component:**

```css
/* Dark Theme (Primary) */
--bg-primary: #1E2130;
--bg-card: #252840;
--bg-hover: #2D3148;
--border: #2D3148;
--border-light: #3d4254;
--text: #E2E8F0;
--text-secondary: #6B7280;
--status-green: #10B981;
--status-amber: #F59E0B;
--status-red: #EF4444;
--status-blue: #5B6AF0;

/* Light Theme */
@media (prefers-color-scheme: light) {
  --bg-primary: #FFFFFF;
  --bg-card: #F5F5F5;
  --bg-hover: #EEEEEE;
  --border: #DDDDDD;
  --text: #1E2130;
  --text-secondary: #666666;
}
```

---

## 10. Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Flexbox | 29+ | 20+ | 6.1+ | 11+ |
| Grid | 57+ | 52+ | 10.1+ | 16+ |
| CSS Custom Props | 49+ | 31+ | 9.1+ | 15+ |
| CSS Scroll-Driven | 115+ | 114+ (flag) | 17.4+ (beta) | 115+ |
| Backdrop Filter | 76+ | 103+ | 9+ | 17+ |
| CSS Mask | 1+ | 53+ | 15.4+ | 79+ |
| WebP | 23+ | 65+ | 16+ | 18+ |

**Target:** Graceful degradation for unsupported features; core functionality works on all modern browsers (last 2 years)

---

## 11. Deployment Checklist

Before pushing to production:

- [ ] Lighthouse audit: all scores > 90
- [ ] Performance budget check: JS < 50KB, CSS < 100KB
- [ ] Accessibility: WAVE scan, no errors
- [ ] Mobile responsiveness: test on iPhone SE, iPad, Android phone
- [ ] Dark/light mode: both themes render correctly
- [ ] Forms: all inputs tested with keyboard, screen reader
- [ ] Images: all optimized, lazy-loaded
- [ ] SEO: meta tags, Open Graph, structured data
- [ ] Analytics: PostHog tracking working
- [ ] DNS: CNAME configured for Cloudflare Pages
- [ ] SSL certificate: auto-provisioned by Cloudflare

---

## 12. References & Resources

### Accessibility
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Performance
- [Core Web Vitals 2026](https://web.dev/vitals/)
- [Lighthouse Score Breakdown](https://web.dev/lighthouse-scoring/)
- [Image Optimization Best Practices](https://web.dev/images/)

### Responsive Design
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)

### Typography
- [Geist Sans Font Documentation](https://vercel.com/font)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

### Tools
- [WebAIM WAVE Accessibility Scanner](https://wave.webaim.org/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## Appendix: Component Templates

### Minimal Button Component

```astro
---
// src/components/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const { variant = 'primary', size = 'md', href, ...attrs } = Astro.props;

const baseClass = 'font-semibold rounded-lg transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600',
  ghost: 'bg-transparent text-slate-300 hover:text-slate-100',
};
const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const className = `${baseClass} ${variants[variant]} ${sizes[size]}`;
const Tag = href ? 'a' : 'button';
---

<Tag href={href} class={className} {...attrs}>
  <slot />
</Tag>
```

### Minimal Card Component

```astro
---
// src/components/Card.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<article class="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition">
  <h3 class="text-lg font-bold text-slate-100">{title}</h3>
  {description && <p class="text-slate-400 mt-2">{description}</p>}
  <slot />
</article>
```

---

**Document Status:** Complete, Ready for Implementation
**Last Updated:** April 13, 2026
**Next Step:** Begin building components with this architecture as reference
