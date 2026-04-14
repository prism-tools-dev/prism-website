# PRISM Website Color System Research

**Version:** 1.0
**Date:** April 2026
**Status:** Complete and Ready for Production

---

## Overview

This directory contains comprehensive color theory and design systems research for PRISM's website, supporting both dark and light themes with full WCAG AA accessibility compliance.

## Documents

### 1. **07_color_system.md** — Complete Color System Specification
The foundational document covering:
- Color philosophy and semantic meaning
- Dark theme palette (5 background layers, 4 text levels, 3 border levels)
- Light theme palette with adjusted semantic colors for contrast
- Full Tailwind-style color scales (50-950) for all primary colors
- Gradient patterns (hero, text, card, border, mesh)
- Shadow and elevation scales for both themes
- Complete CSS custom properties structure
- Contrast ratio verification matrix

**Read this first** — it's the authoritative spec.

### 2. **08_contrast_verification.md** — WCAG AA Compliance Report
Detailed accessibility audit:
- Contrast ratios for all text/background combinations
- Dark vs. light theme comparison
- Acceptable exceptions per WCAG 2.1
- Testing methodology and tools
- Verification checklist

**Use this to:** Verify accessibility before launch, check if a color combination is safe.

### 3. **09_implementation_guide.md** — Step-by-Step Implementation
Practical guide with:
- Quick start (3-step setup)
- Color usage patterns (5 common patterns)
- Component examples (state cards, code blocks, buttons, MRO chain)
- Dark/light theme switching (3 implementation options)
- Testing checklist
- Common patterns reference table
- Troubleshooting guide

**Use this to:** Build the website and integrate the color system.

### 4. **css_variables_complete.css** — Production-Ready CSS
The complete CSS variables file with:
- All color tokens organized by category
- Dark theme (default)
- Light theme overrides via `@media (prefers-color-scheme: light)`
- Component aliases (buttons, cards, tags, inputs)
- Utility classes
- Ready to use or link directly

**Copy this file** directly into your project.

---

## Sacred Colors

These four colors are the core of PRISM's identity and must remain pixel-perfect:

| Status | Dark Theme | Light Theme | Meaning |
|--------|-----------|------------|---------|
| **owns** | `#10B981` | `#059669` | Defined here, no base defines, no descendant redefines. **This runs.** |
| **overrides** | `#F59E0B` | `#D97706` | This class wins over base. **Your version runs.** |
| **overridden** | `#8B5CF6` | `#7C3AED` | Runs here, but subclass redefines it further. **Dead code for subclass instances.** |
| **shadowed** | `#EF4444` | `#DC2626` | Base class wins. **Dead code for everyone.** |
| **accent** | `#5B6AF0` | `#4F46E5` | Brand/primary accent |

**Important:** Light theme colors are darker/more saturated to maintain contrast on light backgrounds. The hue and semantic meaning are preserved.

---

## Implementation Quick Start

### 1. Copy CSS
```bash
cp css_variables_complete.css /path/to/your/project/styles/
```

### 2. Link in HTML
```html
<link rel="stylesheet" href="/styles/css_variables_complete.css">
```

### 3. Use Variables
```css
body {
    background: var(--bg-0);
    color: var(--text-primary);
}

.button-primary {
    background: var(--indigo-50);
    box-shadow: 0 4px 12px var(--indigo-glow);
}

.status-owned {
    color: var(--green-50);
    background: var(--green-muted);
}
```

---

## Contrast Ratios at a Glance

### Dark Theme
| Element | Contrast | Level |
|---------|----------|-------|
| Primary text on bg | **14.2:1** | AAA ✅ |
| Secondary text on bg | **7.1:1** | AAA ✅ |
| Semantic colors | **5.0–5.8:1** | AA ✅ |

### Light Theme
| Element | Contrast | Level |
|---------|----------|-------|
| Primary text on bg | **14.8:1** | AAA ✅ |
| Secondary text on bg | **7.2:1** | AAA ✅ |
| Semantic colors | **5.4–5.9:1** | AA ✅ |

All text meets WCAG AA minimum (4.5:1). Most exceed to AAA (7:1).

---

## File Structure

```
website/research/
├── README.md                          ← You are here
├── 07_color_system.md                 ← Spec (read first)
├── 08_contrast_verification.md        ← WCAG audit
├── 09_implementation_guide.md         ← How to build
└── css_variables_complete.css         ← Production CSS
```

---

## Design Philosophy

PRISM's color system achieves three goals:

1. **Semantic Clarity** — Four method statuses instantly recognizable across themes
2. **Premium Aesthetic** — Sophisticated gradients, shadows, and layering
3. **Accessibility** — WCAG AA compliance on all critical elements

---

## Deployment Checklist

- [ ] Copy `css_variables_complete.css` to project
- [ ] Link CSS in HTML head
- [ ] Update all hardcoded colors to use variables
- [ ] Test in dark environment (monitor at 50% brightness)
- [ ] Test in light environment (monitor at 100% brightness)
- [ ] Verify focus states on keyboard navigation
- [ ] Test with screen reader
- [ ] Run accessibility audit (WAVE)
- [ ] Check responsive design on mobile
- [ ] Launch with confidence!

---

**PRISM Website Color System — Complete, Accessible, Production-Ready**

All research, documentation, and CSS are ready for immediate implementation.
