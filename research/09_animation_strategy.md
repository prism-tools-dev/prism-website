# PRISM Website — Motion Design Strategy

**Date:** April 13, 2026
**Project:** PRISM — VS Code extension for Python MRO visualization
**Objective:** Define a complete animation/motion strategy for the marketing website
**Status:** Final Animation Framework

---

## Executive Summary

PRISM's website motion design should feel **purposeful and restrained** — every animation sells the core value proposition (live MRO visualization, instant feedback, zero guesswork) without distracting from the code demo content. The strategy prioritizes **performance** (CSS-driven, 60fps), **clarity** (clear information hierarchy), and **developer credibility** (understated, no skeuomorphism or flashiness).

### Key Principles

1. **Performance First:** All animations run at 60fps; CSS handles 80%, GSAP handles complex sequences 20%
2. **Purpose-Driven:** Every animation teaches something or draws attention to a key feature
3. **Restrained:** No gratuitous effects; dark theme primary; minimal color movement
4. **Accessibility:** All animations respect `@prefers-reduced-motion` media query
5. **Invisible Delays:** Debounce and stagger to feel instant, not sluggish

---

## 1. Page Load Sequence (0–3.5 seconds)

### Timeline & Elements

| Time | Element | Animation | Duration | Easing | Notes |
|------|---------|-----------|----------|--------|-------|
| **0.0s** | Background | Fade in (opacity 0→1) | 0.3s | ease-out | Immediate, sets scene |
| **0.1s** | Stars | Twinkle begins | ∞ | ease-in-out | Staggered random delays (0–1s) |
| **0.3s** | Nav bar | Slide down + fade | 0.8s | ease-out | From -12px to 0 |
| **0.4s** | Hero glow | Drift & breathe | 0.6s | ease-out | Ambient subtle movement |
| **0.6s** | Prism visual (SVG) | Fade + scale up | 1.0s | ease-out | From scale(0.9) opacity 0 |
| **0.8s** | Beam 0 (white light) | Clip-path in | 1.0s | ease-out | Left-to-right sweep (100% → 0%) |
| **1.0s** | Beam 1 (indigo) | Clip-path in | 0.8s | ease-out | Staggered +0.2s |
| **1.2s** | Beam 2 (green) | Clip-path in | 0.8s | ease-out | Staggered +0.2s |
| **1.4s** | Beam 3 (amber) | Clip-path in | 0.8s | ease-out | Staggered +0.2s |
| **1.6s** | Beam 4 (red) | Clip-path in | 0.8s | ease-out | Staggered +0.2s |
| **1.6s** | Hero title "PRISM" | Fade up + spectral glow | 0.8s | ease-out | From translateY(24px) opacity 0 |
| **1.9s** | Tagline | Fade up | 0.8s | ease-out | From translateY(24px) opacity 0 |
| **2.1s** | Sub-tagline | Fade up | 0.8s | ease-out | From translateY(24px) opacity 0 |
| **2.3s** | CTA buttons | Fade up | 0.8s | ease-out | From translateY(24px) opacity 0 |
| **3.1s** | ✓ Full hero visible | — | — | — | User can interact |

### Animation Choreography

```
0.0s ═══════════════════════════════════════════════════════════ 3.5s
     │
     ├─ 0.3s: Nav slides down (ease-out 0.8s)
     │   │
     │   └─ Fade in + slide -12px → 0
     │
     ├─ 0.4s: Hero glow breathes (infinite)
     │   │
     │   └─ Subtle scale 1 ↔ 1.08, transform 0→8px drift
     │
     ├─ 0.6s: Prism visual scales in
     │   │
     │   └─ Scale 0.9→1, opacity 0→1
     │
     ├─ 0.8s–1.6s: Beams refract in sequence
     │   │
     │   ├─ Beam 0 (white): clip-path inset(0 100% 0 0) → inset(0 0 0 0)
     │   ├─ Beam 1 (indigo): +0.2s delay
     │   ├─ Beam 2 (green): +0.2s delay
     │   ├─ Beam 3 (amber): +0.2s delay
     │   └─ Beam 4 (red): +0.2s delay
     │
     ├─ 1.6s: Title "PRISM" fades up + spectral anim begins
     │   │
     │   └─ Fade up from translateY(24px)
     │   └─ Spectral gradient shift (infinite, 8s cycle)
     │
     ├─ 1.9s–2.3s: Hero content staggered fade-ups
     │   │
     │   ├─ Tagline: 0.8s ease-out
     │   ├─ Sub-tagline: 0.8s ease-out (+0.2s delay)
     │   └─ CTA buttons: 0.8s ease-out (+0.2s delay)
     │
     └─ 3.1s: ✓ Page interactive, scroll reveals begin
```

### CSS Implementation

```css
/* Background fade-in */
body {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Nav slide down */
nav {
  animation: slideDown 0.8s ease-out 0.3s both;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hero glow breathing drift */
.hero-glow {
  animation: glowDrift 12s ease-in-out infinite;
}

@keyframes glowDrift {
  0%, 100% { transform: translate(-50%, -55%) scale(1); }
  50% { transform: translate(-50%, -52%) scale(1.08); }
}

/* Prism visual fade + scale */
.prism-visual {
  animation: fadeUp 1s ease-out 0.6s both;
}

/* Beams clip-path reveal */
.beam {
  opacity: 0;
}

.beam-white {
  animation: beamIn 1s ease-out 0.8s both;
}

.beam-1 { animation: beamIn 0.8s ease-out 1.0s both; }
.beam-2 { animation: beamIn 0.8s ease-out 1.2s both; }
.beam-3 { animation: beamIn 0.8s ease-out 1.4s both; }
.beam-4 { animation: beamIn 0.8s ease-out 1.6s both; }

@keyframes beamIn {
  from {
    opacity: 0;
    clip-path: inset(0 100% 0 0);
  }
  to {
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
}

/* Title spectral animation (infinite) */
.hero-title {
  background: linear-gradient(135deg, #5B6AF0 0%, #A855F7 20%, ...);
  background-size: 300% 300%;
  animation: fadeUp 0.8s ease-out 1.6s both,
             spectral 8s ease infinite 1.6s;
}

@keyframes spectral {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Tagline + sub + buttons fade-ups with delays */
.hero-tagline {
  animation: fadeUp 0.8s ease-out 1.9s both;
}

.hero-sub {
  animation: fadeUp 0.8s ease-out 2.1s both;
}

.hero-ctas {
  animation: fadeUp 0.8s ease-out 2.3s both;
}
```

### Performance Notes

- **Total JS overhead:** 0KB (all CSS animations)
- **Paint events:** 1 (initial background); subsequent animations are transforms/opacity (compositor-safe)
- **Frame rate:** 60fps throughout
- **Total load delay:** 3.1s to full interactivity (acceptable for marketing sites)

---

## 2. Hero Prism Refraction Visual

### Concept

The prism visual is the hero's centerpiece and teaches users instantly what PRISM does. A white light beam enters from the left, hits a geometric prism, and refracts into four colored beams (blue/indigo, green, amber, red) exiting right. This mirrors the four method statuses (owns/overrides/overridden/shadowed).

### Components

1. **SVG Prism shape:** Isometric triangle, dark outline, gradient fill
2. **White incoming beam:** Thin line with glow, left to right
3. **Four refracted beams:** One per status color, each a different angle and length
4. **Ambient glow:** Halo effect behind the prism (already in hero-glow)

### Animation Loop (8-second cycle)

The prism itself is static, but the beams have subtle, looping animations:

| Beam | Color | Animation | Duration | Easing |
|------|-------|-----------|----------|--------|
| **Incoming (white)** | #E2E8F0 | Glow pulse, 1→0.6 opacity | 3s | ease-in-out |
| **Refracted 1 (indigo)** | #5B6AF0 | Glow pulse, length flicker | 3.2s | ease-in-out |
| **Refracted 2 (green)** | #10B981 | Glow pulse, opacity flicker | 3.4s | ease-in-out |
| **Refracted 3 (amber)** | #F59E0B | Glow pulse, length flicker | 3.6s | ease-in-out |
| **Refracted 4 (red)** | #EF4444 | Glow pulse, opacity flicker | 3.8s | ease-in-out |

### CSS Implementation

```css
/* Incoming beam glow pulse */
.beam-white {
  animation: beamPulse 3s ease-in-out infinite;
}

@keyframes beamPulse {
  0%, 100% {
    opacity: 0.9;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
  }
  50% {
    opacity: 0.5;
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.1));
  }
}

/* Refracted beams: staggered pulses */
.beam-1 {
  animation: beamRefractPulse1 3.2s ease-in-out infinite;
}

.beam-2 {
  animation: beamRefractPulse2 3.4s ease-in-out infinite;
}

.beam-3 {
  animation: beamRefractPulse3 3.6s ease-in-out infinite;
}

.beam-4 {
  animation: beamRefractPulse4 3.8s ease-in-out infinite;
}

@keyframes beamRefractPulse1 {
  0%, 100% {
    opacity: 0.8;
    filter: drop-shadow(0 0 12px rgba(91, 106, 240, 0.3));
  }
  50% {
    opacity: 0.4;
    filter: drop-shadow(0 0 6px rgba(91, 106, 240, 0.1));
  }
}

/* Similar for 2, 3, 4 with respective colors */
```

### Mouse Parallax (Optional Enhancement)

For larger screens (> 1024px), add subtle mouse parallax to the prism glow:

```javascript
// Vanilla JS, no dependencies
const glow = document.querySelector('.hero-glow');
const baseX = -50, baseY = -55;

document.addEventListener('mousemove', e => {
  if (!glow || window.innerWidth < 1024) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;

  glow.style.transform =
    `translate(calc(${baseX}% + ${x}px), calc(${baseY}% + ${y}px))`;
});
```

---

## 3. Scroll-Triggered Animations

### General Strategy

- **Trigger point:** Element enters viewport at 12% from bottom (threshold: 0.12)
- **Animation type:** `fade-up + scale` or `fade-in` depending on element importance
- **Duration:** 0.7s (feels snappy, not rushed)
- **Easing:** `ease-out` (deceleration, natural feel)
- **Stagger:** Sequential elements delayed by 0.1s (max 0.3s)
- **Replay:** One-time only (do not replay on scroll back up)

### IntersectionObserver Setup (Vanilla JS)

```javascript
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});
```

### CSS Classes

```css
/* Base reveal state (before entering viewport) */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

/* After entering viewport */
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays */
.reveal-d1 { transition-delay: 0.1s; }
.reveal-d2 { transition-delay: 0.2s; }
.reveal-d3 { transition-delay: 0.3s; }
```

### Per-Section Breakdown

#### **Problem Statement Section**

| Element | Animation | Stagger | Notes |
|---------|-----------|---------|-------|
| Problem code block | Fade up | 0s | First thing to animate |
| Problem text ("You edit...") | Fade up | 0.1s | Follows code block |

```html
<div class="problem-inner reveal">
  <div class="problem-code">...</div>
  <p class="problem-text">...</p>
</div>
```

**Timing:** When user scrolls to "Problem" heading, code block and text fade in sequentially.

---

#### **Four States Cards Section**

| Element | Animation | Stagger |
|---------|-----------|---------|
| Section label ("METHOD STATUS") | Fade up | 0s |
| Section title ("Four states...") | Fade up | 0.1s |
| State card 1 (owns) | Fade up + lift | 0.1s |
| State card 2 (overrides) | Fade up + lift | 0.1s (same as 1) |
| State card 3 (overridden) | Fade up + lift | 0.2s |
| State card 4 (shadowed) | Fade up + lift | 0.2s (same as 3) |

```html
<div class="section-label reveal">Method status</div>
<h2 class="section-title reveal">Four states. Zero guesswork.</h2>
<div class="states-grid">
  <div class="state-card reveal reveal-d1"></div>
  <div class="state-card reveal reveal-d1"></div>
  <div class="state-card reveal reveal-d2"></div>
  <div class="state-card reveal reveal-d2"></div>
</div>
```

**On hover:** Each card lifts up 4px with a color-matched box-shadow (already implemented).

---

#### **Languages Section**

| Element | Animation | Notes |
|---------|-----------|-------|
| Section label | Fade up | 0s |
| Section title | Fade up | 0.1s |
| Language tags grid | Fade up | 0.2s (entire grid as one) |

**On hover:** Each tag lifts 2px and brightens border (already implemented).

---

#### **Features Section**

| Element | Animation | Stagger |
|---------|-----------|---------|
| Divider line | Fade up | 0s |
| Feature item 1 | Fade up | 0.1s |
| Feature item 2 | Fade up | 0.1s |
| Feature item 3 | Fade up | 0.1s |
| Feature item 4 | Fade up | 0.2s |
| Feature item 5 | Fade up | 0.2s |
| Feature item 6 | Fade up | 0.2s |

**Grid layout:** Grid auto-fits columns; items stagger in pairs for rhythm.

---

#### **Footer Section**

| Element | Animation | Stagger |
|---------|-----------|---------|
| "Full website launching soon" | Fade up | 0s |
| "Available now..." tagline | Fade up | 0.1s |
| Email link | Fade up | 0.2s |

---

### Advanced Scroll Effects (Optional, Phase 2)

**CSS Scroll-Driven Animations** (when entering viewport from bottom):

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: scrollReveal linear;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}

@keyframes scrollReveal {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

This offloads animation to the compositor; no JavaScript required. **Caveat:** Limited browser support (Chrome 115+, Safari 17.2+; Firefox needs feature flag). Use as progressive enhancement.

---

## 4. Feature Demo Animations

These are the "sell" animations — they show PRISM's core value in motion. Each demo is a **looping video-like sequence** that plays once visible, repeats every 6–8 seconds.

### 4a. MRO Panel Demo (8-second loop)

**Scenario:** A cursor moves through a Python file. The PRISM panel on the right updates with MRO chain and method statuses in real time.

**Story:**
1. Code editor shows a Python class hierarchy
2. Cursor moves to `DeepSpeedEstimator.setup_dataloader` (line 5)
3. Panel title updates: "cursor_method: setup_dataloader"
4. Summary bar turns RED: "This method never runs. DLEstimatorBase.setup_dataloader is called instead."
5. MRO chain renders: DeepSpeedEstimator → LightningTrainer → DLEstimatorBase
6. Method pills appear: setup_dataloader is RED (shadowed), __init__ is GREEN (owns)
7. Pause 1.5s for reading
8. Cursor moves to `LightningTrainer.configure_optimizers` (line 12)
9. Panel updates: AMBER summary, different MRO, different method pills
10. Pause 1.5s
11. Loop back to step 2

**Duration:** 8 seconds per loop

**Implementation:** Use **GSAP Timeline** for precise sequencing.

```javascript
// Pseudo-code (GSAP v3)
import gsap from 'gsap';

const mroDemo = () => {
  const tl = gsap.timeline({ repeat: -1 }); // Infinite loop

  // Frame 1: Cursor on DeepSpeedEstimator.setup_dataloader
  tl.to('.editor-cursor', { attr: { line: '5', col: '10' } }, 0.4)
    .to('.summary-bar', {
      backgroundColor: 'rgba(239, 68, 68, 0.12)',
      borderColor: '#EF4444'
    }, 0.3, '<')
    .to('.summary-text', {
      text: 'This method never runs. DLEstimatorBase.setup_dataloader is called instead.'
    }, 0.2, '<')
    .to('.mro-chain', {
      opacity: 1,
      // Render MRO: DeepSpeedEstimator → LightningTrainer → DLEstimatorBase
    }, 0.4, '<')
    .to('.method-pills', {
      opacity: 1,
      // Render: setup_dataloader RED, __init__ GREEN
    }, 0.3, '<')
    .to({}, {}, 1.5); // Pause for reading

  // Frame 2: Cursor on LightningTrainer.configure_optimizers
  tl.to('.editor-cursor', { attr: { line: '12', col: '10' } }, 0.4)
    .to('.summary-bar', {
      backgroundColor: 'rgba(245, 158, 11, 0.12)',
      borderColor: '#F59E0B'
    }, 0.3, '<')
    .to('.summary-text', {
      text: 'You override DLEstimatorBase.configure_optimizers. Your version runs.'
    }, 0.2, '<')
    .to('.mro-chain', {
      // Update MRO render
    }, 0.4, '<')
    .to('.method-pills', {
      // Update method pills
    }, 0.3, '<')
    .to({}, {}, 1.5); // Pause

  return tl;
};

mroDemo();
```

**Rendering the demo:**

Option A (SVG Mock-up): Create a simplified SVG version of the code editor + panel, animate cursor and panel state changes.

Option B (Live Screenshot): Capture an actual VS Code session with PRISM running, embed as video, play on loop with captions.

**Recommendation:** Use Option A (SVG) for:
- Smaller file size (< 50KB)
- Crisp rendering at any screen size
- Easier to update without re-recording
- Better accessibility (can narrate with captions)

---

### 4b. Graph Visualization Demo (6-second loop)

**Scenario:** The mindmap/graph view of a class hierarchy animates in, with pan/zoom interactions.

**Story:**
1. Empty canvas
2. Root class nodes appear with fade-in (0.4s)
3. Edges draw in (SVG path animation, 0.6s)
4. Child nodes appear sequentially (0.3s each, staggered)
5. A node highlights (border/glow grows, 0.3s)
6. Connected method pills expand/pop in (0.4s)
7. Camera smoothly zooms/pans to focus that node (0.5s)
8. Hold focused view (1s)
9. Camera zoom out (0.5s)
10. Loop back to step 1

**Duration:** 6 seconds per loop

**Implementation:**

```javascript
// GSAP + SVG path animation
const graphDemo = () => {
  const tl = gsap.timeline({ repeat: -1 });

  // Nodes fade in
  tl.to('.graph-node', {
    opacity: 1,
    duration: 0.4,
    stagger: 0.1
  }, 0)

  // Edges draw in (SVG stroke-dasharray animation)
  .to('.graph-edge', {
    strokeDashoffset: 0,
    duration: 0.6,
    stagger: 0.05
  }, 0.1)

  // Highlight a specific node
  .to('.graph-node.highlight', {
    r: 28, // SVG circle radius grows
    fill: 'rgba(91, 106, 240, 0.2)',
    stroke: '#5B6AF0',
    strokeWidth: 2
  }, 0.3, '-=0.2')

  // Method pills expand
  .to('.method-pill', {
    opacity: 1,
    scale: 1,
    duration: 0.4
  }, 0.1, '-=0.1')

  // Camera zoom in on node
  .to('.graph-viewport', {
    scale: 1.8,
    x: -100, // Pan to node position
    y: -50,
    duration: 0.5
  }, '-=0.2')

  .to({}, {}, 1); // Hold

  // Zoom back out
  .to('.graph-viewport', {
    scale: 1,
    x: 0,
    y: 0,
    duration: 0.5
  }, 0.5)

  return tl;
};

graphDemo();
```

**SVG Stroke Animation (edges drawing in):**

```css
.graph-edge {
  stroke-dasharray: 500; /* Path length */
  stroke-dashoffset: 500; /* Start hidden */
  stroke: rgba(91, 106, 240, 0.3);
  stroke-width: 1.5;
  transition: stroke-dashoffset 0.6s ease;
}

.graph-edge.drawn {
  stroke-dashoffset: 0;
}
```

---

### 4c. CodeLens Demo (5-second loop)

**Scenario:** Inline badges appear in the editor, showing method status annotations.

**Story:**
1. Code editor with class methods visible
2. Method 1: "↓ overridden downstream" badge fades in (PURPLE) at line X
3. Method 2: "↑ shadowed by Base.method" badge fades in (RED) at line Y
4. Method 3: Green "⚡ effective" badge fades in (GREEN) at line Z
5. Hold 1.5s (user reads)
6. Badges pulse gently (opacity 0.7 ↔ 1) for 1.5s
7. Fade out (0.3s)
8. Loop back to step 1

**Duration:** 5 seconds per loop

**Implementation:**

```javascript
const codelensDemo = () => {
  const tl = gsap.timeline({ repeat: -1 });

  // Badges fade in sequentially
  tl.to('.codelens-badge-1', {
    opacity: 1,
    y: 0,
    duration: 0.3
  }, 0)

  .to('.codelens-badge-2', {
    opacity: 1,
    y: 0,
    duration: 0.3
  }, 0.15)

  .to('.codelens-badge-3', {
    opacity: 1,
    y: 0,
    duration: 0.3
  }, 0.3)

  .to({}, {}, 1.5) // Read time

  // Gentle pulse
  .to('.codelens-badge', {
    opacity: 0.7,
    duration: 0.6,
    yoyo: true,
    repeat: 1
  }, 0)

  .to({}, {}, 0.3) // Fade out

  .to('.codelens-badge', {
    opacity: 0,
    duration: 0.3
  }, '-=0.3');

  return tl;
};

codelensDemo();
```

**Badge Styling:**

```css
.codelens-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0;
  transform: translateY(-8px);
  transition: all 0.2s ease;
}

.codelens-badge.overridden {
  background: rgba(168, 85, 247, 0.15);
  color: #A855F7;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.codelens-badge.shadowed {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.codelens-badge.effective {
  background: rgba(16, 185, 129, 0.15);
  color: #10B981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
```

---

### 4d. Workspace Scan Demo (5-second loop)

**Scenario:** A "Scan" button is clicked, and results populate one by one showing dead code and method overrides.

**Story:**
1. Scan button in focused state (glow pulse, 0.3s)
2. Click animation (button press, 0.1s)
3. Results table appears (0.3s)
4. Result row 1 slides in from left (0.3s)
5. Result row 2 slides in from left (0.2s, staggered)
6. Result row 3 slides in from left (0.2s, staggered)
7. Dead code highlights in red (background flash, 0.4s)
8. Hold 1.5s (user reads)
9. Fade all out (0.3s)
10. Loop back to step 1

**Duration:** 5 seconds per loop

**Implementation:**

```javascript
const scanDemo = () => {
  const tl = gsap.timeline({ repeat: -1 });

  // Button glow pulse before click
  tl.to('.scan-button', {
    boxShadow: [
      '0 0 0 rgba(91, 106, 240, 0)',
      '0 0 20px rgba(91, 106, 240, 0.4)',
      '0 0 0 rgba(91, 106, 240, 0)'
    ],
    duration: 0.6
  }, 0)

  // Click press
  .to('.scan-button', {
    scale: 0.95,
    duration: 0.1
  }, 0.5)

  .to('.scan-button', {
    scale: 1,
    duration: 0.1
  }, 0.6)

  // Results table appears
  .to('.scan-results', {
    opacity: 1,
    y: 0,
    duration: 0.3
  }, 0.7)

  // Result rows slide in from left
  .to('.result-row', {
    x: 0,
    opacity: 1,
    duration: 0.3,
    stagger: 0.15
  }, 0.8)

  // Dead code row highlights in red
  .to('.result-row.dead-code', {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    duration: 0.4
  }, 1.3)

  .to({}, {}, 1.5) // Read time

  // Fade out
  .to('.scan-results, .result-row', {
    opacity: 0,
    duration: 0.3
  }, 3.0);

  return tl;
};

scanDemo();
```

---

### Demo Container HTML Structure

```html
<section class="feature-demo" id="mro-demo">
  <h3>Live MRO Panel</h3>
  <div class="demo-container">
    <!-- SVG editor + panel mockup -->
    <svg class="demo-mockup"></svg>
  </div>
  <p class="demo-caption">Cursor moves, panel updates instantly. Sub-200ms.</p>
</section>
```

**Note:** Each demo is a self-contained webview/SVG. Consider using **Lottie** (JSON animation format) for easy export from animation tools like Adobe Animate or Figma.

---

## 5. Micro-interactions

### Button Hover Effects

```css
.btn {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(91, 106, 240, 0.45);
}

.btn-secondary:hover {
  border-color: rgba(91, 106, 240, 0.3);
  background: rgba(91, 106, 240, 0.1);
  transform: translateY(-2px);
}

/* Optional: shimmer effect on primary button hover */
.btn-primary:hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  animation: shimmer 0.6s ease;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### Card Hover Effects

```css
.state-card {
  transition: all 0.35s ease;
}

.state-card:hover {
  transform: translateY(-4px);
  border-color: rgba(91, 106, 240, 0.15);
  /* Color-matched box-shadow per state */
}

.state-card[data-state="owns"]:hover {
  box-shadow: 0 8px 30px rgba(16, 185, 129, 0.08);
}
```

### Nav Link Underline Slide-In

```css
.nav-links a {
  position: relative;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--indigo), var(--purple));
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}
```

### Language Tag Interactions

```css
.lang-tag {
  transition: all 0.3s ease;
  transform-origin: center;
}

.lang-tag:hover {
  transform: translateY(-2px) scale(1.05);
  background: rgba(91, 106, 240, 0.12);
  border-color: rgba(91, 106, 240, 0.25);
}
```

### Theme Toggle Smooth Transition

```css
:root {
  --bg: #0B0D17;
  --text: #E2E8F0;
  --transition-duration: 0.3s;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background-color var(--transition-duration) ease,
              color var(--transition-duration) ease;
}

/* When toggling to light mode */
body.light-mode {
  --bg: #FFFFFF;
  --text: #1E2130;
}
```

---

## 6. Ambient Effects

### Starfield (Already Implemented)

The existing starfield with staggered twinkling is excellent. Keep as-is.

```css
.star {
  animation: twinkle 4s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.6; }
}
```

### Gradient Mesh Background (Enhancement)

Add a subtle animated gradient mesh for extra depth (optional, Phase 2):

```css
.gradient-mesh {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background:
    radial-gradient(ellipse 600px 400px at 20% 30%, rgba(91, 106, 240, 0.06), transparent),
    radial-gradient(ellipse 500px 350px at 80% 70%, rgba(168, 85, 247, 0.04), transparent),
    radial-gradient(ellipse 450px 300px at 40% 80%, rgba(16, 185, 129, 0.03), transparent);
  animation: meshShift 20s ease-in-out infinite;
}

@keyframes meshShift {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}
```

### Grain Overlay (Already Implemented)

The grain overlay at 0.03 opacity is subtle and professional. Keep.

```css
.grain {
  opacity: 0.03; /* Subtle, not distracting */
}
```

---

## 7. Transition Between Dark & Light Themes

### Duration & Easing

- **Duration:** 0.3s (fast enough to feel responsive, slow enough to avoid harshness)
- **Easing:** `ease` (natural acceleration/deceleration)
- **Properties:** `background-color`, `color`, `border-color`, `box-shadow`

### Implementation

```css
/* Transition root variables */
:root {
  --bg: #0B0D17;
  --bg-card: #12152A;
  --border: #1C2042;
  --text: #E2E8F0;
  --dim: #5A6078;
  --indigo: #5B6AF0;
  --green: #10B981;
  --amber: #F59E0B;
  --red: #EF4444;
  --purple: #A855F7;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Light mode */
:root.light-mode {
  --bg: #FFFFFF;
  --bg-card: #F9F9F9;
  --border: #EFEFEF;
  --text: #1E2130;
  --dim: #6B7280;
}

/* Elements inherit transition */
body, .section, .card {
  background-color: var(--bg);
  color: var(--text);
  border-color: var(--border);
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Box shadows also transition */
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:root.light-mode .card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

### Toggle Button Script

```javascript
// Theme toggle (in navbar)
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
  const isDark = root.classList.contains('dark-mode');
  root.classList.toggle('light-mode', isDark);
  root.classList.toggle('dark-mode', !isDark);

  // Persist preference
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Restore user preference on load
const savedTheme = localStorage.getItem('theme') || 'dark';
root.classList.add(`${savedTheme}-mode`);
```

---

## 8. Performance Budget

### Targets

| Metric | Budget | Justification |
|--------|--------|---------------|
| **Total CSS for animations** | < 20KB | All animations are keyframes + transitions; minified |
| **JavaScript for animations** | < 15KB | GSAP minified (33KB → 15KB gzipped) |
| **Total JS (all scripts)** | < 50KB | Lenis (3KB) + GSAP (15KB) + IntersectionObserver (0KB, native) + Theme toggle (1KB) |
| **Frame rate** | 60fps | All animations use transforms/opacity, compositor-safe |
| **Paint events** | < 5 per viewport | Only on scroll reveals; subsequent animations avoid repaints |
| **Load time impact** | < 100ms | Defer GSAP/Lenis to after page load |

### CSS vs JS Animation Decisions

| Animation | Technology | Rationale |
|-----------|-----------|-----------|
| **Page load sequence** | CSS @keyframes | Set-and-forget; no JS overhead |
| **Scroll reveals** | CSS transitions + JS observer | Observer is lightweight; transitions run on compositor |
| **Hero glow breathing** | CSS @keyframes | Infinite, no interactivity needed |
| **Prism beam pulses** | CSS @keyframes | Subtle, compositor-safe |
| **Feature demo loops** | GSAP + SVG animation | Complex sequencing, timing control, repeat logic |
| **Button hover effects** | CSS transitions | Instant response, no JS needed |
| **Theme toggle transition** | CSS transitions + JS class toggle | Quick class flip, CSS handles fade |

### Performance Optimization Checklist

- [ ] **All animations use transforms/opacity** (never animate layout properties like width/height)
- [ ] **CSS animations on compositor thread** (will-change: transform, opacity)
- [ ] **GSAP minified and gzipped** (33KB → ~8KB gzipped)
- [ ] **Lenis deferred to after DOMContentLoaded** (non-blocking)
- [ ] **IntersectionObserver throttled to 0.12 threshold** (no excessive callbacks)
- [ ] **SVG animations optimized** (no unnecessary paths, use stroke-dasharray for line draws)
- [ ] **Keyframes reduced** (no duplicate animations; reuse @keyframes)
- [ ] **Local fonts** (self-hosted Geist Sans + JetBrains Mono, no Google Fonts network requests)
- [ ] **Lazy-load demo videos/SVGs** (only load if scrolled into view)
- [ ] **Prefers-reduced-motion respected** (disable all animations if user has it enabled)

### Prefers-Reduced-Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 9. Implementation Approach

### Tooling

| Component | Tool | Reason |
|-----------|------|--------|
| **Simple scroll reveals** | CSS + IntersectionObserver | Zero dependencies; native browser API |
| **Hero load sequence** | CSS @keyframes | Set-and-forget; no JS overhead |
| **Feature demos (complex)** | GSAP v3 + ScrollTrigger | Unmatched timeline control; SVG-friendly |
| **Smooth scroll** | Lenis (3KB) | Buttery smooth without jank; GSAP-integrated |
| **SVG animations** | CSS + GSAP | Stroke-dasharray for draw effects; GSAP for complex sequences |
| **Micro-interactions** | CSS transitions | Instant, responsive hover effects |

### Astro Integration

Since the website will be built with **Astro 5** (as per tech stack research), here's how to integrate animations:

```astro
---
// src/layouts/Base.astro
import '../styles/animations.css';
---

<html>
  <head>
    <!-- ... -->
    <style is:global>
      @import './animations.css';
    </style>
  </head>
  <body>
    <slot />

    <!-- Defer animation scripts to end of body -->
    <script defer src="/_/animations/intersection-observer.js"></script>
    <script defer src="/_/animations/theme-toggle.js"></script>
  </body>
</html>
```

**Loading GSAP:**

```astro
---
// src/components/FeatureDemo.astro
---

<div class="mro-demo">
  <svg class="demo-mockup"><!-- ... --></svg>
</div>

<script>
  // Only load GSAP if visible (Astro client:visible directive)
  import gsap from 'gsap';

  const mroDemo = () => {
    // ... GSAP timeline
  };

  // Execute only when component is visible
  if (document.querySelector('.mro-demo')) {
    mroDemo();
  }
</script>
```

### CSS File Organization

```css
/* src/styles/animations.css */

/* ── Load sequence (hero) ── */
@keyframes fadeIn { ... }
@keyframes slideDown { ... }
@keyframes beamIn { ... }
/* ... etc */

/* ── Scroll reveals ── */
.reveal { ... }
.reveal.visible { ... }
.reveal-d1 { transition-delay: 0.1s; }
/* ... etc */

/* ── Micro-interactions ── */
.btn:hover { ... }
.card:hover { ... }
/* ... etc */

/* ── Ambient effects ── */
@keyframes twinkle { ... }
@keyframes glowDrift { ... }
/* ... etc */

/* ── Theme transitions ── */
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}
/* ... etc */

/* ── Accessibility ── */
@media (prefers-reduced-motion: reduce) { ... }
```

---

## 10. Summary: Animation Timeline by Section

### Overall Flow (0s → ∞)

```
0.0s ─── Page Load Sequence (0–3.1s) ───┐
         │                               │
         ├─ 0.3s: Nav slide down         │
         ├─ 0.6s: Prism visual fade      │
         ├─ 0.8–1.6s: Beams refract in  │
         ├─ 1.6s: Title fade + spectral  │
         ├─ 1.9–2.3s: Content fade-ups   │
         │                               │
3.1s ────────────────────────────────────┤ User scrolls
         │                               │
         Hero Glow: Infinite drift       ├─ Scroll Reveals
         Beam Pulses: Staggered infinite │ (0.7s each)
         Spectral gradient: 8s cycle     │ (0.1–0.2s stagger)
         │                               │
∞ ──────────────────────────────────────┘
         Hover Effects (on-demand)
         Theme Transitions (instantaneous class toggle)
```

---

## 11. Fallback Strategy (Browser Compatibility)

### Modern Browsers (2024+)

- Full CSS animations + GSAP
- Lenis smooth scroll
- CSS scroll-driven animations (progressive enhancement)
- IntersectionObserver native

### Older Browsers (2020–2023)

- CSS animations degrade gracefully (no fancy scroll-driven)
- GSAP still works (maintains compatibility back to IE 9)
- Lenis may need polyfill (use Detect.js)
- IntersectionObserver polyfilled if needed

### No JavaScript (JavaScript disabled)

- All CSS animations still work (fade-ups, hover effects)
- Page is fully functional
- Feature demos don't animate (that's okay; static images show intent)
- Theme toggle disabled (site stays dark)

---

## 12. Testing Checklist

- [ ] **Load sequence:** Verify timing of each element (nav, prism, beams, title, content)
- [ ] **Scroll reveals:** Check fade-up stagger on all sections at various viewport widths
- [ ] **Micro-interactions:** Button hover lifts 2px, card hover lifts 4px, underline slides in
- [ ] **Feature demos:** GSAP timelines loop infinitely; timing accurate per script
- [ ] **Performance:** DevTools shows 60fps during all animations; no jank
- [ ] **Accessibility:** All animations respect prefers-reduced-motion
- [ ] **Dark/Light theme:** Theme toggle transitions smoothly; colors accurate in both modes
- [ ] **Responsive:** All animations scale correctly on mobile (< 768px)
- [ ] **Browser support:** Test on Chrome, Safari, Firefox, Edge (latest versions)
- [ ] **Mobile performance:** No jank on iPhone 14/Galaxy S24 (60fps expected)

---

## 13. Deliverables

1. **animations.css** (< 20KB) — All keyframes, transitions, and classes
2. **intersection-observer.js** (< 2KB) — Scroll reveal logic
3. **theme-toggle.js** (< 1KB) — Dark/light mode switching
4. **demo-timeline.js** (< 15KB GSAP + timelines) — Feature demo orchestration
5. **SVG mockups** (hero prism, editor + panel, graph visualization, codelens, scan UI)

---

## 14. Launch Readiness

### Phase 1 (MVP)
- [x] Page load sequence (CSS only)
- [x] Scroll reveals (IntersectionObserver + CSS)
- [x] Micro-interactions (CSS hover)
- [x] Hero prism visual (SVG + CSS pulses)
- [x] Ambient effects (stars, grain, glow)
- [x] Theme toggle (CSS transitions)

### Phase 2 (Polish)
- [ ] Feature demo animations (GSAP timelines)
- [ ] Lenis smooth scroll integration
- [ ] CSS scroll-driven animations (progressive enhancement)
- [ ] Advanced parallax on hero glow

### Performance Targets
- **LCP:** < 1.2s
- **INP:** < 100ms
- **CLS:** < 0.05
- **All animations:** 60fps
- **Total JS:** < 50KB gzipped

---

**End of Animation Strategy**

*Date: April 13, 2026*
*Status: Ready for Implementation*
*Next: Convert to production code in Astro 5 project*
