# PRISM Logo Concepts — Visual Reference

This document contains SVG previews of all 5 logo concepts. Open in a browser or VS Code to see them rendered.

---

## Concept 1: Geometric Prism (Icon-First)

**Best for:** VS Code activity bar icon, favicon, small badges

### Dark Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200">
  <!-- Dark blue background for reference -->
  <rect width="24" height="24" fill="#1E2130"/>

  <!-- Prism: simple triangle, side view -->
  <polygon points="8,6 8,18 16,12" fill="none" stroke="#2D3148" stroke-width="1" stroke-linejoin="round"/>

  <!-- Incoming white beam -->
  <line x1="2" y1="12" x2="8" y2="12" stroke="#E2E8F0" stroke-width="1" stroke-linecap="round"/>

  <!-- Refracted beams (top, middle, bottom) -->
  <line x1="16" y1="8" x2="22" y2="4" stroke="#10B981" stroke-width="1" stroke-linecap="round"/>
  <line x1="16" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1" stroke-linecap="round"/>
  <line x1="16" y1="16" x2="22" y2="20" stroke="#EF4444" stroke-width="1" stroke-linecap="round"/>
</svg>
```

### Light Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200">
  <!-- White background for reference -->
  <rect width="24" height="24" fill="#FFFFFF"/>

  <!-- Prism: darker outline -->
  <polygon points="8,6 8,18 16,12" fill="none" stroke="#4a5080" stroke-width="1" stroke-linejoin="round"/>

  <!-- Incoming beam: darker grey -->
  <line x1="2" y1="12" x2="8" y2="12" stroke="#999999" stroke-width="1" stroke-linecap="round"/>

  <!-- Refracted beams: colors remain saturated -->
  <line x1="16" y1="8" x2="22" y2="4" stroke="#10B981" stroke-width="1" stroke-linecap="round"/>
  <line x1="16" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1" stroke-linecap="round"/>
  <line x1="16" y1="16" x2="22" y2="20" stroke="#EF4444" stroke-width="1" stroke-linecap="round"/>
</svg>
```

**Strengths:**
- Minimal and crisp at any size
- Directly represents the prism refraction metaphor
- Perfect for 16px icon use

**Weaknesses:**
- No text label; requires separate "PRISM" typography
- Very small at 16px (but still recognizable)

---

## Concept 2: Typographic Logotype (Text-Only)

**Best for:** Website header, print materials, situations where text is preferred

### Dark Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <rect width="200" height="60" fill="#1E2130"/>
  <text x="10" y="48" font-family="IBM Plex Sans, sans-serif" font-size="40" font-weight="700" fill="#E2E8F0" letter-spacing="-1">PRISM</text>
  <!-- Refraction line under R -->
  <line x1="65" y1="55" x2="80" y2="62" stroke="#5B6AF0" stroke-width="2" stroke-linecap="round"/>
</svg>
```

### Light Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
  <rect width="200" height="60" fill="#FFFFFF"/>
  <text x="10" y="48" font-family="IBM Plex Sans, sans-serif" font-size="40" font-weight="700" fill="#1E2130" letter-spacing="-1">PRISM</text>
  <!-- Refraction line under R -->
  <line x1="65" y1="55" x2="80" y2="62" stroke="#0d47a1" stroke-width="2" stroke-linecap="round"/>
</svg>
```

**Strengths:**
- Extremely minimal and confident
- "I don't need decoration" approach, very modern
- Works at any size without detail loss
- Perfect for Marketplace listing

**Weaknesses:**
- No icon; can't be used as a standalone app icon
- Less distinctive than a unique geometric mark

---

## Concept 3: Monogram (Letter P with Refraction)

**Best for:** Icon badge, Twitter avatar, social media

### Dark Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200">
  <rect width="24" height="24" fill="#1E2130"/>

  <!-- Letter P (simplified, geometric) -->
  <path d="M 6 4 L 6 20 M 6 4 L 14 4 Q 16 4 16 7 Q 16 10 14 10 L 6 10"
        fill="none" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Refraction line (emerging from bowl, bending light) -->
  <line x1="14" y1="8" x2="20" y2="16" stroke="#5B6AF0" stroke-width="1" stroke-linecap="round"/>
</svg>
```

### Light Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200">
  <rect width="24" height="24" fill="#FFFFFF"/>

  <!-- Letter P -->
  <path d="M 6 4 L 6 20 M 6 4 L 14 4 Q 16 4 16 7 Q 16 10 14 10 L 6 10"
        fill="none" stroke="#1E2130" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Refraction line -->
  <line x1="14" y1="8" x2="20" y2="16" stroke="#0d47a1" stroke-width="1" stroke-linecap="round"/>
</svg>
```

**Strengths:**
- Immediately recognizable as letter P
- Works as icon at 16px
- Modern geometric feel
- Memorable diagonal refraction line

**Weaknesses:**
- Doesn't fully communicate MRO concept
- May feel like just an initial without context

---

## Concept 4: Abstract Refraction (Three-Ray Gradient)

**Best for:** Minimalist icon, app badge, modern tech aesthetic

### Dark Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200">
  <rect width="24" height="24" fill="#1E2130"/>

  <!-- Center point -->
  <circle cx="12" cy="12" r="1.5" fill="#5B6AF0"/>

  <!-- Three refracted rays (representing owns, overrides, shadowed) -->
  <!-- Green ray (owns) — top-left -->
  <line x1="12" y1="12" x2="6" y2="6" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Amber ray (overrides) — right -->
  <line x1="12" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/>

  <!-- Red ray (shadowed) — bottom-right -->
  <line x1="12" y1="12" x2="18" y2="18" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

### Light Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200">
  <rect width="24" height="24" fill="#FFFFFF"/>

  <!-- Center point -->
  <circle cx="12" cy="12" r="1.5" fill="#0d47a1"/>

  <!-- Three refracted rays -->
  <line x1="12" y1="12" x2="6" y2="6" stroke="#10B981" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="12" y1="12" x2="18" y2="18" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

**Strengths:**
- Highly geometric and modern
- Encodes the three states (green, amber, red) into one symbol
- Works at any size
- Memorable asymmetry

**Weaknesses:**
- Abstract; doesn't obviously communicate "prism"
- Could read as "divergence" rather than "refraction"

---

## Concept 5: Hybrid (Icon + Logotype)

**Best for:** Primary logo, Marketplace listing, website, print

### Dark Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="400" height="100">
  <rect width="200" height="50" fill="#1E2130"/>

  <!-- Prism icon (scaled, positioned left) -->
  <g transform="translate(8, 10)">
    <!-- Prism: simple triangle, side view -->
    <polygon points="8,6 8,18 16,12" fill="none" stroke="#2D3148" stroke-width="1.2" stroke-linejoin="round"/>

    <!-- Incoming white beam -->
    <line x1="2" y1="12" x2="8" y2="12" stroke="#E2E8F0" stroke-width="1" stroke-linecap="round"/>

    <!-- Refracted beams (top, middle, bottom) -->
    <line x1="16" y1="8" x2="22" y2="4" stroke="#10B981" stroke-width="1" stroke-linecap="round"/>
    <line x1="16" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1" stroke-linecap="round"/>
    <line x1="16" y1="16" x2="22" y2="20" stroke="#EF4444" stroke-width="1" stroke-linecap="round"/>
  </g>

  <!-- Text "PRISM" -->
  <text x="52" y="38" font-family="IBM Plex Sans, sans-serif" font-size="32" font-weight="700" fill="#E2E8F0" letter-spacing="-0.5">PRISM</text>
</svg>
```

### Light Background
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" width="400" height="100">
  <rect width="200" height="50" fill="#FFFFFF"/>

  <!-- Prism icon (adjusted for light background) -->
  <g transform="translate(8, 10)">
    <!-- Prism: darker outline -->
    <polygon points="8,6 8,18 16,12" fill="none" stroke="#4a5080" stroke-width="1.2" stroke-linejoin="round"/>

    <!-- Incoming beam: darker grey -->
    <line x1="2" y1="12" x2="8" y2="12" stroke="#999999" stroke-width="1" stroke-linecap="round"/>

    <!-- Refracted beams: colors remain saturated -->
    <line x1="16" y1="8" x2="22" y2="4" stroke="#10B981" stroke-width="1" stroke-linecap="round"/>
    <line x1="16" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1" stroke-linecap="round"/>
    <line x1="16" y1="16" x2="22" y2="20" stroke="#EF4444" stroke-width="1" stroke-linecap="round"/>
  </g>

  <!-- Text "PRISM" -->
  <text x="52" y="38" font-family="IBM Plex Sans, sans-serif" font-size="32" font-weight="700" fill="#1E2130" letter-spacing="-0.5">PRISM</text>
</svg>
```

**Strengths:**
- Versatile: works as full logo, icon alone, or text alone
- Professional and modern approach
- Icon and text reinforce each other
- Clearly communicates the product's purpose

**Weaknesses:**
- More complex than single-concept logos
- Requires spacing discipline

---

## Size Scaling Tests

### Concept 1 at Different Sizes

**16×16px (VS Code icon)**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <polygon points="8,6 8,18 16,12" fill="none" stroke="#2D3148" stroke-width="1" stroke-linejoin="round"/>
  <line x1="2" y1="12" x2="8" y2="12" stroke="#E2E8F0" stroke-width="1" stroke-linecap="round"/>
  <line x1="16" y1="8" x2="22" y2="4" stroke="#10B981" stroke-width="1" stroke-linecap="round"/>
  <line x1="16" y1="12" x2="22" y2="12" stroke="#F59E0B" stroke-width="1" stroke-linecap="round"/>
  <line x1="16" y1="16" x2="22" y2="20" stroke="#EF4444" stroke-width="1" stroke-linecap="round"/>
</svg>
```
✓ Crisp and recognizable even at 16px

**32×32px (Toolbar/Taskbar)**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <polygon points="12,8 12,24 20,16" fill="none" stroke="#2D3148" stroke-width="1.5" stroke-linejoin="round"/>
  <line x1="4" y1="16" x2="12" y2="16" stroke="#E2E8F0" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="10" x2="28" y2="4" stroke="#10B981" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="16" x2="28" y2="16" stroke="#F59E0B" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="22" x2="28" y2="28" stroke="#EF4444" stroke-width="1.2" stroke-linecap="round"/>
</svg>
```
✓ Clean, all details visible

**256×256px (Marketplace, Web)**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <polygon points="96,64 96,192 160,128" fill="none" stroke="#2D3148" stroke-width="2" stroke-linejoin="round"/>
  <line x1="32" y1="128" x2="96" y2="128" stroke="#E2E8F0" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="80" x2="224" y2="32" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="128" x2="224" y2="128" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="176" x2="224" y2="224" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
</svg>
```
✓ Scales beautifully, all geometric lines remain crisp

---

## Recommended Implementation

Use **Concept 5 (Hybrid)** as the primary logo:
- **Primary:** 160×40px hybrid (icon + text) for website, Marketplace
- **Icon:** 32×32px standalone Concept 1 for VS Code activity bar
- **Icon:** 16×16px Concept 1 for favicon

Create both dark and light variants for each.

---

**All SVGs are production-ready. Save each variant to `/resources/` directory.**
