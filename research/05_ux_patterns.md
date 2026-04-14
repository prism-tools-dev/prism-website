# UX Patterns for Developer Tool Websites — 2026

> A comprehensive catalog of modern UX patterns that drive engagement, conversion, and accessibility for developer tool websites. This guide documents patterns used by leading SaaS platforms, with performance considerations and accessibility requirements.

---

## 1. Hero Section Patterns

### 1.1 Typography-First Hero

**What it is:**
A hero section that prioritizes bold, large text as the primary visual element. Minimal graphics, maximum messaging clarity. Often uses hierarchy through text size, color, and whitespace.

**When to use:**
- When your value proposition is crystal clear in 10 words or less
- Developer audiences who read, not just look
- Low-bandwidth environments or accessibility-first design
- Complex products where a visual metaphor would be confusing

**When NOT to use:**
- Visual-heavy products (design tools, game engines)
- Audiences with short attention spans (consumer SaaS)
- When explaining abstract concepts

**Implementation notes:**
- Headline: 48–72px for desktop (scale proportionally mobile)
- Subheading: 18–24px, max 60 characters per line for readability
- CTA button: 44px minimum touch target, high contrast (AA+)
- Load headline and subheading before any animations fire

**Performance cost:** Minimal (text is fast).

---

### 1.2 Visual/Animation Hero

**What it is:**
Animated backgrounds, parallax scrolling, animated diagrams, or video backgrounds that engage the eye. Often combined with subtle text overlay or sidebar text.

**Examples:**
- Linear's hero: animated code diffs and workflow visualization
- Vercel's hero: real-time deployment diagram
- GitHub's hero: moving network graph background

**When to use:**
- Visual product (design tools, analytics dashboards)
- When motion communicates a concept (e.g., real-time collaboration)
- Audiences with broadband (developers with modern hardware)
- To increase dwell time on landing page

**When NOT to use:**
- Accessibility-first design (auto-play motion triggers motion sickness)
- Low-bandwidth users (disable on slow connections)
- When text is the star

**Best libraries & tools:**
- **Framer**: Best for 3D transforms and scroll-triggered animations
- **GSAP (GreenSock)**: Most performant for complex motion
- **Lottie**: JSON-based animations, lightweight
- **Spline**: 3D modeling with web export

**Performance cost:** 200–500ms FCP delay if not optimized. Always test on Lighthouse. Use `prefers-reduced-motion` fallback.

---

### 1.3 Interactive Hero

**What it is:**
Users can interact with the hero: hover effects, click buttons, drag objects, or trigger animations. Often a code playground or live demo embedded in the hero.

**Examples:**
- CodePen's hero: an editable live code snippet
- Stripe's hero: interactive payment form preview
- Three.js docs: 3D canvas you can manipulate

**When to use:**
- Code-related products (frameworks, CLI tools)
- When hands-on demo proves credibility better than words
- Developer audiences (love building things)
- High engagement goal (want people to stay 45+ seconds)

**When NOT to use:**
- Limited dev resources (interactive heroes require JavaScript)
- Mobile-only audiences (interactive not touch-friendly)
- Conversion goal is click-through-rate (interactive can distract)

**Best practices:**
- Keep the interaction obvious (cursor hint, animated CTA arrow)
- Provide a fallback static image if code doesn't load
- Debounce/throttle interactive updates (no more than 60 FPS)
- Use `requestAnimationFrame` for smooth motion

**Performance cost:** 300–800ms FCP delay. Huge LCP impact if code editor involved. Test on mid-range devices.

---

### 1.4 Split Hero (Text + Visual)

**What it is:**
Two-column layout: text on left (headline, subheading, CTA), large visual on right (screenshot, illustration, video, 3D model).

**Examples:**
- Notion's hero: headline left, animated workspace on right
- Figma's hero: features text left, screenshot of tool right
- Fly.io's hero: copy left, infrastructure diagram right

**When to use:**
- When you need text clarity AND visual proof
- Product has a clear visual identity (not abstract)
- Desktop-first audience
- 60+ character headline (won't fit as typog-only)

**When NOT to use:**
- Mobile-first design (splits collapse to stack, lose benefit)
- Simple products with no UI to show
- Limited design polish (split hero exposes misalignment)

**Responsive behavior:**
- Desktop: True 50/50 split
- Tablet: 40/60 or 30/70 (image gets more space)
- Mobile: 100% stack, text above image

**Performance cost:** Image optimization is everything. WebP + srcset. Test on slow 3G.

---

### 1.5 Full-Bleed Hero with Ambient Effects

**What it is:**
Hero extends edge-to-edge. Background may use:
- Gradient mesh or "blob" animations
- Glassmorphism (frosted glass effect)
- Ambient light/shadow effects
- Layered parallax with depth

**Examples:**
- Apple's M3 hero: soft gradient and glow effects
- Anthropic's Claude hero: subtle pulsing gradient
- Cursor (AI IDE) hero: glassmorphic cards over gradient

**When to use:**
- Premium, high-polish brand
- Modern design aesthetic required
- Want to feel cutting-edge/AI-forward
- Audience on high-end devices

**When NOT to use:**
- Accessibility priority (gradients reduce text contrast)
- Old browser support needed
- Slow devices (animation drains battery)

**Accessibility gotchas:**
- Gradient over text must maintain 4.5:1 contrast ratio
- Add text shadow or semi-transparent overlay if needed
- Test on dark mode (gradients shift)
- Respect `prefers-reduced-motion`

**Performance cost:** 150–300ms FCP if optimized (CSS-only gradients are cheap). Avoid keyframe animations in hero for better LCP.

---

## 2. Scroll Interactions

### 2.1 Scroll-Triggered Reveals

**What it is:**
Elements fade in, slide, or transform as they enter the viewport. Uses Intersection Observer API for efficient triggering.

**Examples:**
- Linear's pricing page: cards fade in as you scroll
- Stripe's features: text and images animate in staggered
- Vercel's case studies: image reveals left/right alternately

**When to use:**
- Long-form content (avoid overwhelming above-the-fold)
- Multi-section pages (pacing is important)
- Drawing attention to specific elements as user scrolls
- Engagement metric goal (time on page)

**When NOT to use:**
- Accessibility priority (can be jarring for AT users)
- Users who prefer reduced motion
- Performance-critical pages (animation runs on main thread if done wrong)

**Best libraries:**
- **Intersection Observer API** (native, free): Most performant
- **ScrollReveal.js**: Lightweight, pre-built stagger patterns
- **AOS (Animate On Scroll)**: Popular, but heavier
- **GSAP ScrollTrigger**: Most flexible, but requires license for some features

**Performance best practices:**
- Use Intersection Observer, NOT scroll event listeners
- Limit to major sections (not every element)
- Use `will-change: transform` sparingly (memory cost)
- Prefer `transform` and `opacity` over layout-affecting properties
- Test: 60 FPS on mid-range mobile

**Accessibility:**
- Always include `prefers-reduced-motion` media query
- Don't hide content in the animation (content is visible, just style changes)
- Test with screen readers (content order doesn't change)

---

### 2.2 Parallax Effects

**What it is:**
Background elements move at a slower speed than foreground text/buttons, creating depth. Subtly engaging when done right, jarring when overdone.

**Subtle parallax:**
- Background moves 30–40% of scroll speed
- Only 1–2 background layers
- Limited to hero or key section

**Aggressive parallax:**
- Multiple layers, significant speed variation
- Full-page effect
- More visually striking but risky for motion sickness

**Examples:**
- Apple's product pages: hero background moves slowly
- GitHub's landing: subtle shift in background shapes
- Airbnb's brand site: layered parallax in hero

**When to use:**
- Modern, polished brand
- Desktop-first audience
- Single, powerful visual hero
- Want to feel premium/playful

**When NOT to use:**
- Mobile-heavy traffic (parallax doesn't work well on touch)
- Accessibility priority (motion triggers discomfort)
- Slow devices (battery impact)

**Performance cost:**
- Subtle parallax: ~20ms overhead
- Aggressive: 50–100ms overhead
- Test FCP and LCP impact

**Gotchas:**
- Parallax on `background-position` is slow; use `transform: translateY()` instead
- Mobile: Disable parallax on touch devices (use `@media (hover: hover)`)
- Respect `prefers-reduced-motion`; fall back to static background

---

### 2.3 Sticky Sections with Content Swap

**What it is:**
A section "sticks" to viewport as user scrolls past. Content inside changes (swaps, animates, or fades). Creates a guided narrative.

**Examples:**
- Stripe's CLI docs: sticky left navigation, content swaps on right
- Linear's features: sticky section title + description, cards animate below
- Notion's features: sidebar stays, feature details cycle as you scroll

**When to use:**
- Multi-step processes (onboarding, tutorials)
- Feature comparison (highlight one feature at a time)
- Navigation (index on left, content on right)
- Want guided, paced experience

**When NOT to use:**
- Short pages (overkill)
- Mobile-only (sticky + swap hard on touch)
- When content order is non-linear

**Implementation pattern:**
```css
.sticky-section {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
}

.sticky-content {
  transition: opacity 0.3s ease;
}

.visible {
  opacity: 1;
  pointer-events: auto;
}

.hidden {
  opacity: 0;
  pointer-events: none;
}
```

Trigger content swap with Intersection Observer (detect when each section enters viewport).

**Performance cost:** Minimal if done with opacity/transform swaps. Avoid layout shifts.

---

### 2.4 Horizontal Scroll Sections

**What it is:**
A section that scrolls horizontally while page scrolls vertically. Often paired with snap-scroll.

**Examples:**
- Apple's product lineup: horizontal scroll of products
- Figma's features: horizontal scroll of tabs/cards
- Figma design system: horizontal showcase of components

**When to use:**
- Displaying many items in limited vertical space
- Gallery or showcase (products, case studies, testimonials)
- Mobile-friendly (swipe left/right is intuitive)
- Want to slow the vertical scroll "feel"

**When NOT to use:**
- Desktop-only (less natural than vertical scroll)
- When all items need to be scannable at once
- Deep content (horizontal scroll hides stuff off-screen)

**Implementation:**
```css
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.horizontal-item {
  flex: 0 0 100vw; /* or 50vw, 33vw */
  scroll-snap-align: start;
}
```

**Performance cost:** Very cheap if native CSS scroll. JS scroll listeners add overhead.

**Accessibility:**
- Ensure keyboard navigation (arrow keys, Tab)
- All items accessible via scroll, not just swipe
- Test with screen readers

---

### 2.5 Progress Indicators

**What it is:**
Visual indicator of scroll position (e.g., progress bar at top of page, chapter indicators on long articles).

**Examples:**
- Medium articles: thin progress bar at top
- Apple's docs: chapter progress in sidebar
- Stripe's guides: scroll progress as colored line

**When to use:**
- Long articles or docs (>3000 words)
- Multi-section pages (orient user on where they are)
- Build anticipation (user knows how much left)

**When NOT to use:**
- Short pages (<1000 words)
- Mobile (space is tight)

**Patterns:**
1. **Top progress bar:** Fixed bar that fills as user scrolls
2. **Chapter dots:** Sidebar with dots showing sections, highlight current
3. **Scroll percentage:** Show `45% read` in corner

**Performance cost:** Minimal. Intersection Observer triggers at section boundaries (not every pixel).

---

## 3. Bento Grid Layouts

### What Is a Bento Grid?

A responsive, asymmetric grid layout inspired by Japanese bento boxes. Content blocks vary in size; the most important content gets the largest boxes. Not all boxes are equal 1×1 squares—some are 2×2, some are 1×3, creating visual interest and hierarchy.

**Key properties:**
- Asymmetric: Blocks have different dimensions
- Modular: Each block is self-contained
- Semantic size: Bigger boxes = more important content
- Responsive: Blocks reflow on smaller screens

### Why Bento Grids Work

Research from 2025 shows participants completed information-finding tasks **23% faster** on modular layouts vs. linear layouts. Higher dwell time, better click-through rates, and improved information retention.

**2026 adoption:** 67% of top 100 SaaS websites on Product Hunt now use bento-style layouts.

---

### Grid Sizes & Responsive Behavior

**Desktop (1440px+):**
```
[2x2 feature] [1x1] [1x1]
[1x1]         [1x1] [2x1 feature]
```

**Tablet (768px):**
```
[2x1 feature]
[1x1] [1x1]
[1x1] [1x2 feature]
```

**Mobile (375px):**
```
[1x1 full width]
[1x1 full width]
[1x1 full width]
```

**CSS Grid approach:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  grid-auto-rows: 200px;
}

.bento-item:nth-child(1) {
  grid-column: span 2;
  grid-row: span 2;
}

.bento-item:nth-child(2) {
  grid-column: span 2;
  grid-row: span 1;
}

@media (max-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .bento-item {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
}
```

---

### Content Types in Bento Cards

**Effective content for bento boxes:**

1. **Feature highlights** (2×2 or 2×1): Icon + headline + short description
2. **Testimonials** (1×1): Avatar + quote + name
3. **Metrics** (1×1): Large number + label
4. **Screenshots** (2×2): Product interface example
5. **Case studies** (2×1): Logo + metric + short story
6. **Integrations** (1×1): Partner logo + name
7. **Video/GIF** (2×1 or 2×2): Auto-play (muted), short demo
8. **CTAs** (1×1 or 2×1): Button group, download, etc.

---

### Real-World SaaS Examples

**Huly** (collaboration tool):
- 8-feature bento layout with icons + titles
- 2×2 for main features, 1×1 for secondary

**Notion**:
- Templates in bento grid (each template is a card)
- Screenshot, title, description per card
- Responsive: 4 columns → 2 → 1

**Shortcut** (project management):
- Bento for explaining product sections
- Alternating sizes to avoid monotony
- Each card is a feature module

---

### 2026 Design Trends

**Exaggerated corner rounding:**
Border-radius: 16–24px (vs. old 8px standard). Makes grid feel tactile.

**Kinetic typography:**
Text animates as card enters viewport (fade + slide).

**Squishy animations:**
Cards respond to scroll with subtle scale/skew effects, feeling "alive."

```css
.bento-item {
  border-radius: 20px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bento-item:hover {
  transform: scale(1.02);
}
```

---

## 4. Dark/Light Theme Design

### CSS Custom Properties Approach

**Define semantic tokens, not colors:**

```css
:root {
  /* Light mode (default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a1a;
  --text-secondary: #6b7280;
  --border: #e5e7eb;
  --accent: #3b82f6;
  --status-error: #ef4444;
  --status-success: #10b981;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #121212;
    --bg-secondary: #1e1e1e;
    --text-primary: #f5f5f5;
    --text-secondary: #a0a0a0;
    --border: #2d3748;
    --accent: #60a5fa;
    --status-error: #ff6b6b;
    --status-success: #34d399;
  }
}
```

**Use in code:**
```css
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

button {
  background-color: var(--accent);
  border: 1px solid var(--border);
}
```

---

### Color Palette Structure

**Layers:**

1. **Backgrounds** (`--bg-primary`, `--bg-secondary`, `--bg-tertiary`)
   - Primary: Page/section background
   - Secondary: Card, panel, slightly elevated
   - Tertiary: Subtle background (code block, quote)

2. **Text** (`--text-primary`, `--text-secondary`, `--text-tertiary`)
   - Primary: Headlines, body text (4.5:1 contrast)
   - Secondary: Labels, captions (3:1 contrast)
   - Tertiary: Disabled text, hints (lowest contrast, still readable)

3. **Interactive** (`--accent`, `--hover`, `--active`, `--focus`)
   - Accent: Primary CTA color
   - Hover: 10–20% lighter/darker than accent
   - Active: 20–30% shift
   - Focus: Ring color (visible on both light and dark)

4. **Status** (`--success`, `--warning`, `--error`, `--info`)
   - Must be distinguishable without color alone
   - Add icons/text labels in addition to color

5. **Borders** (`--border`, `--border-subtle`, `--border-strong`)
   - Subtle: Dividers between sections
   - Strong: Form inputs, cards, emphasis

---

### Transition Animations Between Themes

**Smooth fade (instant perception, performant):**

```css
/* Animate color properties only, not layout */
body,
button,
input {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
```

**Why 0.2s?** Fast enough to feel responsive, slow enough to perceive the change.

**Avoid:**
- `transition: all;` (triggers layout recalculation)
- Animating `background-image` (expensive repaint)
- Multi-second transitions (feels sluggish)

---

### Images & Illustrations in Both Modes

**Three strategies:**

1. **SVG illustrations with CSS variables:**
   ```html
   <svg width="200" height="200">
     <rect fill="var(--accent)" />
     <circle fill="var(--bg-secondary)" />
   </svg>
   ```
   Cheapest, most flexible. Colors update with theme.

2. **Two image files, swap on media query:**
   ```html
   <img src="diagram-light.svg" alt="Diagram" class="light-only" />
   <img src="diagram-dark.svg" alt="Diagram" class="dark-only" />
   ```
   ```css
   .light-only {
     display: block;
   }
   @media (prefers-color-scheme: dark) {
     .light-only { display: none; }
     .dark-only { display: block; }
   }
   ```

3. **Single image, CSS filter:**
   ```css
   @media (prefers-color-scheme: dark) {
     img {
       filter: invert(1) hue-rotate(180deg);
       opacity: 0.9; /* Reduce brightness)
     }
   }
   ```
   Works for photos, not exact color match.

---

### Dark Mode Color Palette Example

**Light mode:**
- Background: #ffffff
- Secondary bg: #f8f9fa
- Text: #1a1a1a
- Accent: #3b82f6

**Dark mode:**
- Background: #121212 (not pure black, reduce eye strain)
- Secondary bg: #1e1e1e (subtle elevation)
- Text: #f5f5f5 (not pure white, reduce fatigue)
- Accent: #60a5fa (lighter, maintains contrast)

**Contrast check (light on dark):**
- f5f5f5 on #121212 = 17.5:1 (exceeds AA)
- Reduce saturation 10–20% in dark mode to feel natural

---

### Theme Toggle UI Patterns

**Sun/moon icon button:**
```html
<button aria-label="Toggle dark mode" class="theme-toggle">
  <svg class="icon-sun"><!-- sun icon --></svg>
  <svg class="icon-moon"><!-- moon icon --></svg>
</button>
```

```css
.icon-moon {
  display: none;
}

@media (prefers-color-scheme: dark) {
  .icon-sun { display: none; }
  .icon-moon { display: block; }
}
```

**2026 trend:** Subtle gradient circle behind icon (matches accent color).

---

## 5. Micro-Interactions

### 5.1 Button Hover Effects

**Magnetic hover:**
Button follows cursor slightly, creating a "magnetic pull" sensation.

```css
button {
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

button:hover {
  box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.4);
  transform: scale(1.02);
}
```

**Better magnetic effect (requires JS):**
```javascript
button.addEventListener('mousemove', (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const distance = Math.sqrt(x * x + y * y);

  if (distance < 50) {
    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  }
});
```

**Glow effect:**
```css
button::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: radial-gradient(circle, rgba(var(--accent-rgb), 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

button:hover::before {
  opacity: 1;
}
```

**Gradient shift:**
```css
button {
  background: linear-gradient(90deg, var(--accent), var(--accent-dark));
  background-size: 200% 100%;
  transition: background-position 0.3s ease;
}

button:hover {
  background-position: right;
}
```

**Performance:** Use `will-change: transform` sparingly (adds memory cost).

---

### 5.2 Card Hover Effects

**Lift (scale + shadow):**
```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

**Tilt (3D perspective):**
```css
.card {
  perspective: 1000px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: rotateX(2deg) rotateY(-2deg) translateZ(10px);
}
```

**Border glow:**
```css
.card {
  border: 1px solid var(--border);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: var(--accent);
  box-shadow: inset 0 0 20px rgba(var(--accent-rgb), 0.1);
}
```

---

### 5.3 Link Hover Effects

**Underline slide:**
```css
a {
  position: relative;
  text-decoration: none;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
```

**Text color shift:**
```css
a {
  color: var(--text-primary);
  transition: color 0.2s ease;
}

a:hover {
  color: var(--accent);
}
```

---

### 5.4 Cursor Effects

**Spotlight/glow following cursor:**
```javascript
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const glow = document.querySelector('.cursor-glow');
  glow.style.left = `${x}px`;
  glow.style.top = `${y}px`;
});
```

```css
.cursor-glow {
  position: fixed;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 1;
}
```

**Performance:** Throttle mousemove listeners, use `requestAnimationFrame`.

---

### 5.5 Loading States & Skeleton Screens

**Pulsing skeleton:**
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 0%,
    var(--bg-tertiary) 50%,
    var(--bg-secondary) 100%
  );
  background-size: 200% 100%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Spinner (CSS only):**
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

### 5.6 Toast/Notification Patterns

**Slide-in from corner:**
```css
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  animation: slide-in 0.3s ease;
  animation-fill-mode: forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

**Auto-dismiss after 3s:**
```javascript
setTimeout(() => {
  toast.style.animation = 'slide-out 0.3s ease forwards';
  setTimeout(() => toast.remove(), 300);
}, 3000);
```

---

## 6. Code Display Patterns

### 6.1 Syntax Highlighted Code Blocks

**Library recommendations:**

- **Prism.js** (lightweight, ~5KB): Best for blogs, simple site
- **highlight.js** (7KB): Auto-language detection, large theme library
- **Shiki** (built on VS Code lexers): Most accurate highlighting, zero-runtime
- **Refractor** (remark/rehype plugin): For Markdown processors
- **Pygments** (Python): Server-side highlighting, if you have Python backend

**2026 trend: Shiki + Astro** (zero-runtime, ship just HTML + CSS).

**Example with Shiki:**
```javascript
import { codeToHtml } from 'shiki'

const html = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  theme: 'github-dark'
})
```

**Line highlighting:**
```html
<pre><code class="language-python" data-line="3,5">
def hello():
    print("start")
    print("highlighted")  <!-- Line 3 -->
    print("normal")
    print("highlighted")  <!-- Line 5 -->
</code></pre>
```

---

### 6.2 Animated Code Typing (Typewriter Effect)

**Libraries:**
- **Typewriter.js** (5KB, pure JS)
- **Framer Motion** (if React-based site)
- **GSAP** (heavier, but very flexible)

**Vanilla JS approach:**
```javascript
function typeCode(element, code, speed = 50) {
  let index = 0;
  element.textContent = '';

  function type() {
    if (index < code.length) {
      element.textContent += code[index];
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}
```

**When to use:**
- Hero section (grab attention, slow down user)
- Tutorial/guide (pace the learning)
- Show progression (code building)

**When NOT to use:**
- User wants to copy code (can't select while typing)
- Accessibility (screen readers see full code instantly)

---

### 6.3 Before/After Code Comparisons

**Two-column layout:**
```html
<div class="code-comparison">
  <div class="code-before">
    <label>Before</label>
    <pre><code>/* old code */</code></pre>
  </div>
  <div class="code-after">
    <label>After</label>
    <pre><code>/* new code */</code></pre>
  </div>
</div>
```

```css
.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }
}
```

**Slider overlay (drag to reveal):**
```javascript
const slider = document.querySelector('.before-after-slider');
const wrapper = slider.parentElement;

wrapper.addEventListener('mousemove', (e) => {
  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const percent = (x / rect.width) * 100;

  slider.style.width = Math.min(Math.max(percent, 0), 100) + '%';
});
```

---

### 6.4 Interactive Code Playgrounds

**Embedded editors:**

- **CodeSandbox** (full Node.js sandbox, slowest load)
- **CodePen** (front-end only, fast)
- **StackBlitz** (VS Code in browser, excellent DX)
- **Monaco Editor** (VS Code component, self-hosted)
- **Plaground.py** (Python in browser)

**Example embed (CodePen):**
```html
<iframe
  height="300"
  style="width: 100%"
  scrolling="no"
  title="Example"
  src="https://codepen.io/user/embed/xxxxx"
  frameborder="no"
  loading="lazy"
  allowtransparency="true"
  allowfullscreen="true"
></iframe>
```

**Self-hosted Monaco (React):**
```jsx
import { Monaco } from '@monaco-editor/react';

export function CodeEditor() {
  return (
    <Monaco
      language="python"
      defaultValue="print('hello')"
      height="300px"
    />
  );
}
```

---

### 6.5 Terminal/CLI Mockups

**ASCII-art terminal (cheap, no JS):**
```html
<div class="terminal">
  <div class="terminal-header">
    <span>Terminal</span>
  </div>
  <pre class="terminal-body">
$ python analyze.py
analysis: 42ms
Cursor status: shadowed
  </pre>
</div>
```

```css
.terminal {
  background: #121212;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Monaco', monospace;
  font-size: 13px;
}

.terminal-header {
  background: #1e1e1e;
  padding: 8px 12px;
  border-bottom: 1px solid #2d3748;
  color: #9ca3af;
}

.terminal-body {
  padding: 16px;
  color: #10b981;
  overflow-x: auto;
  white-space: pre;
}
```

**Animated terminal (type commands):**
Use typewriter effect above, but in a `<pre>` styled as terminal.

---

## 7. Feature Showcase Patterns

### 7.1 Tab-Based Feature Switcher

**HTML:**
```html
<div class="feature-tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="tab-1">MRO Chain</button>
    <button class="tab-btn" data-tab="tab-2">Shadow Detection</button>
    <button class="tab-btn" data-tab="tab-3">Call Graph</button>
  </div>

  <div class="tab-content">
    <div id="tab-1" class="tab-pane active">
      <h3>Live MRO Chain</h3>
      <p>See exactly where each method lives in the inheritance chain...</p>
      <img src="mro-demo.gif" alt="MRO demo" />
    </div>
    <div id="tab-2" class="tab-pane">
      <!-- ... -->
    </div>
  </div>
</div>
```

**CSS:**
```css
.tab-buttons {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border);
}

.tab-btn {
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
  animation: fade-in 0.2s ease;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**JS:**
```javascript
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');

    // Remove active from all
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    // Add active to clicked
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});
```

---

### 7.2 Scroll-Triggered Feature Reveals

**Layout:**
```html
<section class="feature-section">
  <h2>Feature 1: Live Analysis</h2>
  <p>As you move your cursor...</p>
  <img src="feature-1.png" alt="Feature 1" class="reveal-image" />
</section>

<section class="feature-section">
  <h2>Feature 2: MRO Visualization</h2>
  <p>See the full inheritance chain...</p>
  <img src="feature-2.png" alt="Feature 2" class="reveal-image" />
</section>
```

**Reveal on scroll:**
```javascript
const images = document.querySelectorAll('.reveal-image');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slide-up-fade 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

images.forEach(img => observer.observe(img));
```

```css
.reveal-image {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slide-up-fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### 7.3 Looping Animation Demos

**GIF or video loop:**
```html
<div class="demo-container">
  <video autoplay muted loop playsinline>
    <source src="demo.mp4" type="video/mp4" />
    <img src="demo.gif" alt="Demo fallback" />
  </video>
</div>
```

```css
.demo-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

video {
  width: 100%;
  height: auto;
  display: block;
}
```

**Tips:**
- Use MP4 (smaller than GIF, better quality)
- Aim for 15–30 FPS (not 60) to keep file size low
- Duration: 3–5 seconds (loops smoothly)
- Include static fallback GIF for older browsers

---

### 7.4 Side-by-Side Comparison

**Code vs. output:**
```html
<div class="comparison">
  <div class="comparison-left">
    <h3>Input</h3>
    <pre><code>class DeepSpeedEstimator(LightningTrainer):
    def setup_dataloader(self):
        return "deepspeed dataloader"</code></pre>
  </div>
  <div class="comparison-right">
    <h3>MRO Analysis</h3>
    <pre><code>MRO: [DeepSpeedEstimator, LightningTrainer, ...]
setup_dataloader: SHADOWED by LightningTrainer
(Never runs for DeepSpeedEstimator instances)</code></pre>
  </div>
</div>
```

```css
.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}
```

---

## 8. Social Proof Patterns

### 8.1 Testimonial Layouts

**Single column (vertical stack):**
```html
<section class="testimonials">
  <div class="testimonial-card">
    <p class="quote">"PRISM instantly showed me the shadowed method I was editing."</p>
    <div class="author">
      <img src="avatar.jpg" alt="John Doe" class="avatar" />
      <div>
        <p class="name">John Doe</p>
        <p class="title">Senior Python Engineer, TensorFlow</p>
      </div>
    </div>
  </div>
  <!-- More cards -->
</section>
```

**Grid layout (2–3 columns):**
```css
.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

**Carousel (swipe on mobile):**
```css
.testimonials {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
}

.testimonial-card {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

@media (min-width: 768px) {
  .testimonials {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow-x: visible;
  }

  .testimonial-card {
    flex: 1;
  }
}
```

**Card styling:**
```css
.testimonial-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.quote {
  font-size: 16px;
  font-style: italic;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.6;
}

.author {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.name {
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.title {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 4px 0 0;
}
```

---

### 8.2 Logo Clouds

**"Used by" or "Trusted by" section:**

```html
<section class="logo-cloud">
  <h2>Used by leading Python teams</h2>
  <div class="logo-grid">
    <div class="logo-item">
      <img src="logo-stripe.svg" alt="Stripe" />
    </div>
    <div class="logo-item">
      <img src="logo-anthropic.svg" alt="Anthropic" />
    </div>
    <!-- More logos -->
  </div>
</section>
```

```css
.logo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 32px;
  align-items: center;
  justify-items: center;
}

.logo-item {
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.logo-item:hover {
  opacity: 1;
}

img {
  max-width: 120px;
  height: auto;
  filter: grayscale(1);
  transition: filter 0.2s ease;
}

.logo-item:hover img {
  filter: grayscale(0);
}
```

---

### 8.3 GitHub Star Counter

**Fetch stars dynamically (client-side):**
```javascript
async function getGitHubStars() {
  const res = await fetch('https://api.github.com/repos/owner/repo');
  const data = await res.json();
  const stars = data.stargazers_count;

  document.getElementById('star-count').textContent = stars.toLocaleString();
}

getGitHubStars();
```

**Display with badge:**
```html
<a href="https://github.com/owner/repo" class="github-badge">
  <svg class="github-icon"><!-- GitHub logo --></svg>
  <span id="star-count">0</span>
  <span>Stars</span>
</a>
```

```css
.github-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  text-decoration: none;
  transition: border-color 0.2s, background-color 0.2s;
}

.github-badge:hover {
  border-color: var(--accent);
  background: var(--bg-tertiary);
}

.github-icon {
  width: 16px;
  height: 16px;
}

#star-count {
  font-weight: 600;
  color: var(--accent);
}
```

---

### 8.4 "Used by" Sections

**Company logos + brief mention:**
```html
<section class="used-by">
  <h2>Trusted by Python teams at</h2>
  <div class="company-list">
    <div class="company">
      <img src="company-logo.svg" alt="Company Name" />
      <p><strong>Company Name</strong>: Uses PRISM to catch shadowed methods in their data pipeline.</p>
    </div>
    <!-- More companies -->
  </div>
</section>
```

```css
.company-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.company {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 8px;
  border-left: 3px solid var(--accent);
}

.company img {
  width: 100%;
  max-width: 200px;
  margin-bottom: 12px;
}

.company p {
  color: var(--text-secondary);
  font-size: 14px;
}
```

---

### 8.5 Metric Counters (Animated)

**Scroll-triggered count-up:**
```javascript
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100; // Animate over ~100 frames
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 20);
}

// Trigger on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.dataset.target);
      animateCounter(counter, target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
```

**HTML:**
```html
<div class="metrics">
  <div class="metric">
    <p class="number" data-target="5000" data-counter>0</p>
    <p class="label">Developers using PRISM</p>
  </div>
  <div class="metric">
    <p class="number" data-target="42" data-counter>0</p>
    <p class="label">Average analysis time (ms)</p>
  </div>
</div>
```

```css
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.metric {
  text-align: center;
}

.number {
  font-size: 48px;
  font-weight: 700;
  color: var(--accent);
  margin: 0;
}

.label {
  color: var(--text-secondary);
  margin: 8px 0 0;
  font-size: 14px;
}
```

---

## 9. CTA Patterns

### 9.1 Install Button Designs for VS Code Extensions

**Primary CTA (install):**
```html
<div class="install-section">
  <h2>Install PRISM</h2>
  <div class="install-buttons">
    <a href="vscode:extension/owner.prism" class="btn btn-primary">
      <svg class="vs-icon"><!-- VS Code logo --></svg>
      Install for VS Code
    </a>
    <button class="btn btn-secondary" onclick="copyCommand()">
      <svg class="copy-icon"><!-- Copy icon --></svg>
      Copy Install Command
    </button>
  </div>
  <p class="install-note">Alternatively, open VS Code and run: `ext install owner.prism`</p>
</div>
```

```css
.install-section {
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
}

.install-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.install-note {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 16px;
}
```

---

### 9.2 "Copy Command" Clipboard Buttons

**Copy functionality:**
```javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slide-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
```

**Button:**
```html
<button class="copy-btn" onclick="copyToClipboard('pip install prism-vscode')">
  <svg class="copy-icon"><!-- Copy icon --></svg>
  <span class="copy-text">Copy</span>
</button>
```

```css
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  border-color: var(--accent);
  background: var(--bg-tertiary);
}

.copy-icon {
  width: 14px;
  height: 14px;
}
```

---

### 9.3 Multi-Platform Install (VS Code + Cursor + CLI)

```html
<div class="multi-install">
  <div class="install-tabs">
    <button class="tab-btn active" data-platform="vscode">VS Code</button>
    <button class="tab-btn" data-platform="cursor">Cursor</button>
    <button class="tab-btn" data-platform="cli">CLI</button>
  </div>

  <div class="install-content">
    <div class="platform-install active" id="vscode">
      <a href="vscode:extension/owner.prism" class="btn btn-primary">
        Install for VS Code
      </a>
    </div>
    <div class="platform-install" id="cursor">
      <p>Cursor uses VS Code extensions. Install from VS Code, then use in Cursor.</p>
    </div>
    <div class="platform-install" id="cli">
      <pre><code>pip install prism-cli</code></pre>
      <button class="copy-btn">Copy</button>
    </div>
  </div>
</div>
```

```css
.install-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

.tab-btn {
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.platform-install {
  display: none;
}

.platform-install.active {
  display: block;
}
```

---

### 9.4 Floating/Sticky CTAs

**Sticky bottom bar:**
```html
<div class="sticky-cta">
  <div class="sticky-content">
    <h3>Ready to catch shadowed methods?</h3>
    <a href="vscode:extension/owner.prism" class="btn btn-primary">
      Install PRISM Now
    </a>
  </div>
</div>
```

```css
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(18, 18, 18, 1), rgba(18, 18, 18, 0));
  padding: 20px;
  z-index: 100;
  animation: slide-up 0.3s ease;
}

.sticky-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.sticky-cta h3 {
  color: var(--text-primary);
  margin: 0;
}

@media (max-width: 640px) {
  .sticky-content {
    flex-direction: column;
    text-align: center;
  }

  .sticky-cta {
    padding: 16px;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

---

### 9.5 Exit-Intent Patterns

**Modal triggered on exit (mouse leaves top):**
```javascript
let exitModalShown = false;

document.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 0 && !exitModalShown) {
    showExitModal();
    exitModalShown = true;
  }
});

function showExitModal() {
  const modal = document.getElementById('exit-modal');
  modal.style.display = 'flex';
  modal.style.animation = 'fade-in 0.3s ease';
}

function closeExitModal() {
  const modal = document.getElementById('exit-modal');
  modal.style.animation = 'fade-out 0.3s ease';
  setTimeout(() => (modal.style.display = 'none'), 300);
}
```

**Modal HTML:**
```html
<div id="exit-modal" class="exit-modal">
  <div class="exit-content">
    <button class="close-btn" onclick="closeExitModal()">×</button>
    <h2>Before you go...</h2>
    <p>Don't miss out on PRISM. Catch shadowed methods instantly as you code.</p>
    <a href="vscode:extension/owner.prism" class="btn btn-primary">
      Install Now
    </a>
    <button class="btn btn-secondary" onclick="closeExitModal()">
      I'll pass
    </button>
  </div>
</div>
```

```css
.exit-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.exit-content {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--text-secondary);
}

.exit-content h2 {
  margin-top: 0;
  color: var(--text-primary);
}

.exit-content p {
  color: var(--text-secondary);
  margin-bottom: 20px;
}
```

---

## 10. Accessibility (WCAG 2.2 AA)

### 10.1 Color Contrast Requirements

**Minimum ratios (WCAG 2.2 AA):**
- Body text: **4.5:1** (large text 18pt+ or 14pt bold: **3:1**)
- UI components (borders, form labels): **3:1**
- Disabled buttons: May be lower, but must be distinguishable from enabled

**Testing tools:**
- WebAIM Contrast Checker (online, free)
- axe DevTools (browser extension)
- WAVE (automated audit)
- Lighthouse (built into Chrome DevTools)

**In code:**
```css
:root {
  --text-primary: #1a1a1a;    /* Contrast: 21:1 on white */
  --bg-primary: #ffffff;
  --accent: #0052cc;          /* Contrast: 8.6:1 on white */
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f5f5f5;   /* Contrast: 16:1 on #121212 */
    --bg-primary: #121212;
    --accent: #4c9aff;         /* Contrast: 7.3:1 on #121212 */
  }
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
}

a {
  color: var(--accent);
  /* Ensure link contrast meets 3:1 */
  text-decoration: underline;
}
```

---

### 10.2 Focus Management

**Visible focus indicator:**
```css
button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

input:focus-visible {
  outline: 2px solid var(--accent);
  border-color: var(--accent);
}

/* Don't remove focus indicator with outline: none */
*:focus {
  outline: revert;
}
```

**Focus not obscured (new WCAG 2.2 criterion):**
- When a form field receives focus, ensure it's not hidden by sticky headers
- Use `scroll-margin-top` to account for fixed headers

```css
input:focus {
  scroll-margin-top: 80px; /* Height of sticky header */
}
```

---

### 10.3 Reduced Motion Preferences

**Respect `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Or, conditionally apply animations:**
```css
/* Default: animate */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .card:hover {
    transform: none;
  }
}
```

---

### 10.4 Screen Reader Considerations

**Semantic HTML:**
```html
<!-- Good -->
<button onclick="installPrism()">Install PRISM</button>

<!-- Bad -->
<div onclick="installPrism()" role="button">Install PRISM</div>
```

**ARIA labels for icon buttons:**
```html
<button aria-label="Toggle dark mode">
  <svg class="icon-moon"><!-- moon icon --></svg>
</button>
```

**Hidden decorative elements:**
```html
<!-- Screen reader will ignore this -->
<svg aria-hidden="true" class="decorative-shape">
  <!-- ... -->
</svg>
```

**Form labels:**
```html
<!-- Good -->
<label for="email">Email address</label>
<input id="email" type="email" />

<!-- Bad -->
<input type="email" placeholder="Enter email" />
```

**Skip links (jump to main content):**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content">
  <!-- ... -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

### 10.5 Keyboard Navigation

**Ensure all interactive elements are keyboard accessible:**

1. Use semantic HTML (`<button>`, `<a>`, `<input>`)
2. Tab order follows visual order (test with Tab key)
3. All interactions available via keyboard (no mouse-only hover traps)

**Test checklist:**
- [ ] Can reach all interactive elements with Tab
- [ ] Can activate buttons/links with Enter
- [ ] Can dismiss modals with Escape
- [ ] Can navigate tabs with arrow keys
- [ ] Focus indicator visible and clear

---

## Performance Considerations

### FCP & LCP Impact

**Fastest patterns (< 100ms):**
- CSS variables, dark/light toggle
- Typography-first hero
- Static bento grids

**Medium (100–300ms):**
- Sticky sections with content swap
- Scroll-triggered reveals (with Intersection Observer)
- Tab-based feature switcher

**Slower (> 300ms):**
- Interactive hero (code editor, canvas)
- Parallax effects (especially on mobile)
- Auto-play video backgrounds

**Rule of thumb:** Optimize LCP by not blocking on heavy JS. Defer animations to after FCP.

---

### Bundle Size Impact

| Feature | KB | Notes |
|---------|------|-------|
| CSS variables + dark mode | 0.5 | Pure CSS |
| Intersection Observer | 0 | Native API |
| GSAP (if needed) | 30 | Minified, optional |
| Shiki (syntax highlighting) | ~50 | Or use Prism (~10KB) |
| Monaco Editor | 800+ | Self-hosted, large |
| CodeSandbox embed | 0 | Iframe, external |

**Strategy:** Ship CSS-only features in critical path. Defer JS for nice-to-have animations.

---

## Summary: Quick Reference Table

| Pattern | Best For | Accessibility Notes | Performance Cost |
|---------|----------|---------------------|------------------|
| **Typography-first hero** | Copy-heavy, dev tools | High (large text) | Minimal |
| **Scroll reveals** | Long-form, engagement | Respect `prefers-reduced-motion` | Low (Intersection Observer) |
| **Bento grid** | Feature showcase | Semantic grid structure | Very low |
| **Dark/light theme** | Modern brand | WCAG contrast in both modes | Low |
| **Tab switcher** | Feature tabs | Keyboard navigation (arrow keys) | Minimal |
| **Code playground** | Interactive demos | Accessible fallback code display | High (JS editor) |
| **Sticky CTA** | Conversion goal | Don't cover focus targets | Very low |
| **Exit intent** | Recapture visitors | Mobile-friendly triggers | Low |
| **Testimonial carousel** | Social proof | Tab stops, keyboard nav | Very low |
| **Micro-interactions** | Polish, delight | Respect motion preference | Varies (0–50ms) |

---

## 2026 Trends Summary

1. **AI-forward aesthetic** (glassmorphism, ambient effects)
2. **Kinetic typography** (text animates as it enters viewport)
3. **Asymmetric layouts** (bento grids dominate)
4. **Motion discipline** (respect `prefers-reduced-motion`, focus on purposeful micro-interactions)
5. **Accessibility-first** (WCAG 2.2 AA is baseline; Focus Not Obscured is new pain point)
6. **Performance obsession** (LCP < 2.5s, no CLS, smooth 60 FPS)
7. **Dark mode expectation** (80% of users prefer it; must be built-in, not afterthought)
8. **Developer-friendly CTAs** (install via command, one-click VS Code extensions)

---

## Sources

- [10 best hero section examples and what makes them effective - LogRocket Blog](https://blog.logrocket.com/ux-design/hero-section-examples-best-practices/)
- [Bento Grid Design: How to Create Modern Modular Layouts in 2026 - Landdding](https://landdding.com/blog/blog-bento-grid-design-guide)
- [Designing Bento Grids That Actually Work: A 2026 Practical Guide - SaaSFrame Blog](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)
- [CSS / JS Animation Trends 2026: Motion & Micro-Interactions | Web Peak](https://webpeak.org/blog/css-js-animation-trends/)
- [Website Animations in 2026: Pros, Cons & Best Practices](https://www.shadowdigital.cc/resources/do-you-need-website-animations)
- [Figma vs Framer vs Webflow for Scroll-Triggered 3D Animations in 2026](https://www.illustration.app/blog/figma-vs-framer-vs-webflow-for-scroll-triggered-3d-animations-in-2026)
- [Dark Mode Design Guide: Patterns That Users Actually Prefer (2026) | Launchwork Digital](https://launchworkdigital.co.uk/blog/designing-for-dark-mode)
- [Dark Mode & Theming — Ensuring Accessibility Across Color Schemes - Accesify Blog](https://www.accesify.io/blog/dark-mode-theming-accessibility-color-schemes/)
- [The Designer's Guide to Dark Mode Accessibility](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/)
- [WCAG 2.2 Checklist: Complete 2026 Compliance Guide](https://www.levelaccess.com/blog/wcag-2-2-aa-summary-and-checklist-for-website-owners/)
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [20 Modern CSS Buttons – Hover Effects and Animations (2026)](https://veebilehed24.ee/en/blog/css-effects/20-modern-css-buttons-hover-effects-and-animations-2026/)
- [41 Best CSS Button Hover Effects to Use in 2026 | TestMu AI (Formerly LambdaTest)](https://www.testmuai.com/blog/best-css-button-hover-effects/)
- [Social Proof Tools: 15 Best Platforms Compared for 2026](https://shapo.io/blog/social-proof-tools/)
- [Social Proof Examples That Boost Conversions in 2026](https://shapo.io/blog/social-proof-examples/)
- [Boost Conversions with These High-Performing CTA Strategies - Understand your customers | Microsoft Clarity Blog](https://clarity.microsoft.com/blog/cta-best-practices/)
- [The Best CTA Placement Strategies For 2026 Landing Pages | LandingPageFlow](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
- [Exit Intent Popup: The Complete 2026 Conversion Guide](https://www.hellobar.com/blog/exit-intent-popup-guide/)
- [I Tested 9 WordPress Floating Button Plugins (2026)](https://wisernotify.com/blog/wordpress-floating-buttons/)
- [Carousel Pattern | UX Patterns for Developers](https://uxpatterns.dev/patterns/content-management/carousel)
- [Carousel (Slide Show or Image Rotator) Pattern | APG | WAI | W3C](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
- [7 Best Code Playgrounds for Developers (2025)](https://snappify.com/blog/best-code-playgrounds)
- [Top 7 Code Playgrounds That Every Web Developer Should Check Out - DEV Community](https://dev.to/this-is-learning/top-7-code-playgrounds-that-every-web-developer-should-check-out-b7a)
