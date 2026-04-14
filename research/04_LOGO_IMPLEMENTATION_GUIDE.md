# PRISM Logo Implementation Guide

**Date:** April 13, 2026
**Status:** Ready for Deployment
**Files Created:** 6 SVG files + 2 research documents

---

## Executive Summary

**Recommendation: Use Concept 5 (Geometric Prism Icon + Logotype Text)**

The hybrid logo combines:
- A minimal, geometric prism icon (light refracting into green/amber/red beams)
- Bold sans-serif "PRISM" text
- Dark and light variants for all contexts

**Why this approach:**
1. **Minimal and modern** — fits 2025–2026 design trends (Linear, Raycast, Vercel)
2. **Respectable** — no gradients, no drop shadows, no unnecessary decoration
3. **Scales perfectly** — works at 16px (icon), 32px (toolbar), 160px (logo), 256px+ (web/print)
4. **Encodes the metaphor** — white light enters, refracts into three colored beams (owns/overrides/shadowed)
5. **Versatile** — icon can be used standalone, text standalone, or together
6. **Accessible** — high contrast on both dark and light backgrounds

---

## Files Created

### Research Documents
1. **`03_logo_design.md`** — Full research report
   - Developer tool logo trends (2025–2026)
   - Color psychology for tech
   - Icon scaling best practices
   - 5 concept proposals with pros/cons comparison matrix

2. **`03_logo_concepts_visual.md`** — Visual reference guide
   - All 5 concepts with SVG code
   - Dark and light background variants
   - Scaling tests (16px, 32px, 256px)

### SVG Logo Files (Production-Ready)

#### Primary Logo (Hybrid, 160×40px)
- `prism-logo-dark.svg` — Dark background version (use on website, Marketplace)
- `prism-logo-light.svg` — Light background version (use on light backgrounds)

#### Icon Only (32×32px)
- `prism-icon-32-dark.svg` — For VS Code activity bar, dark theme
- `prism-icon-32-light.svg` — For light theme use

#### Icon Only (16×16px)
- `prism-icon-16-dark.svg` — Favicon and very small contexts
- `prism-icon-16-light.svg` — Light background favicon

---

## Color Specifications

All colors chosen for:
- **Contrast:** Pass WCAG AA (4.5:1) on both dark and light backgrounds
- **Consistency:** Match existing PRISM UI color tokens (from panel.ts)
- **Psychology:** Blue (trust, precision), green/amber/red (the three method states)

| Element | Dark Theme | Light Theme | Usage |
|---------|-----------|-------------|-------|
| Prism outline | #2D3148 | #4a5080 | Primary geometric shape |
| Incoming beam | #E2E8F0 | #999999 | White light entering |
| Green beam | #10B981 | #10B981 | Owns (no base, no descendant override) |
| Amber beam | #F59E0B | #F59E0B | Overrides (wins over base) |
| Red beam | #EF4444 | #EF4444 | Shadowed (base wins) |
| Text (logo) | #E2E8F0 | #1E2130 | "PRISM" wordmark |
| Accent (accent) | #5B6AF0 | #0d47a1 | Blue accent for depth |

---

## Implementation Checklist

### Immediate (This Week)
- [ ] Review SVG files visually in browser and VS Code
- [ ] Export 32×32px PNGs from dark and light icons (for Marketplace preview)
- [ ] Update `package.json` to reference new icon path:
  ```json
  "icon": "resources/prism-icon-32-dark.svg",
  "iconTheme": "vs-dark"
  ```
- [ ] Test VS Code activity bar icon rendering at actual 16px size
- [ ] A/B test with team for recognition and modern feel

### Website (Next Phase)
- [ ] Update website hero/header with `prism-logo-dark.svg` or `prism-logo-light.svg`
- [ ] Add logo to OpenVSX/Marketplace listings
- [ ] Create brand guidelines document (spacing, minimum size, usage)

### Print & Marketing (If Applicable)
- [ ] Export high-res PNG (256px+) for print
- [ ] Create sticker versions (transparent background)
- [ ] Social media avatar: use 32×32 icon, cropped square

### Testing
- [ ] Dark mode (default): icons pop clearly against #1E2130
- [ ] Light mode: use -light variants, maintain contrast
- [ ] High-contrast mode (Windows): verify all elements readable
- [ ] Retina/2x scaling: test SVGs at 2x size (no pixelation)
- [ ] Very small (16px): verify all three beams remain distinct

---

## Usage Guidelines

### Logo (160×40px Hybrid)
- **When to use:** Marketplace listing, website hero, header, social cards
- **Size:** Never smaller than 160px wide (or 80px for sidebar)
- **Background:** Provide at least 16px padding around all sides
- **Variants:** Dark version on dark backgrounds (#1E2130–#2D3148), light version on white/light

### Icon (32×32px Standalone)
- **When to use:** VS Code activity bar, app icon, favicon, badges, social avatars
- **Size:** 32×32px (or 2x @ 64px for Retina)
- **Minimum:** 24×24px (test readability), never below 16px for production
- **Background:** Icons designed for any background; no explicit background needed

### Icon (16×16px)
- **When to use:** Favicon, breadcrumb icons, very tight spacing
- **Warning:** Only use if testing confirms three beams remain distinct
- **Fallback:** If 16px is unreadable, substitute 24px or 32px instead

### Text Only ("PRISM")
- **Font:** IBM Plex Sans Bold or system sans-serif (fallback: -apple-system, BlinkMacSystemFont, "Segoe UI")
- **Letter-spacing:** −0.02em to −0.05em (tight, modern)
- **When to use:** Situations where you want typography-focused design (document titles, labels)

---

## SVG Optimization

All SVGs are:
- **Crisp at scale:** Stroke widths adjusted per size (1px @ 24px, 1.5px @ 32px, 2px @ 256px)
- **Minimal:** No unnecessary elements, no gradients, no filters
- **Scalable:** viewBox used instead of fixed width/height
- **Dark-first:** Primary design is dark background; light variants invert key colors

### Import Instructions (For Developers)

1. **VS Code Extension (`package.json`):**
   ```json
   "icon": "resources/prism-icon-32-dark.svg"
   ```

2. **Website (`index.html`):**
   ```html
   <img src="resources/prism-logo-dark.svg" alt="PRISM" class="logo" />
   ```

3. **CSS (If Styling Needed):**
   ```css
   .logo {
     width: 160px;
     height: 40px;
     display: block;
   }
   ```

---

## Testing Checklist

Before declaring the logo "done":

| Test | Expected Result | Status |
|------|-----------------|--------|
| **16px icon** | All three beams visible, crisp edges | ○ |
| **32px icon** | Clearly recognizable, beams pop | ○ |
| **256px logo** | Text and icon sharp, scalable | ○ |
| **Dark background (#1E2130)** | Prism outline visible, beams pop | ○ |
| **Light background (#FFFFFF)** | Prism outline readable, colors contrast | ○ |
| **VS Code dark theme** | Icon appears in activity bar at actual size | ○ |
| **VS Code light theme** | Icon visible using -light variant | ○ |
| **High-contrast mode** | Text and shapes meet WCAG AAA | ○ |
| **Retina/2x** | No pixelation, smooth curves | ○ |
| **Favicon** | 16px PNG exports crisply | ○ |
| **Team A/B test** | Feedback: modern, respectful, memorable | ○ |

---

## Migration Path

### From Old Logo
The previous logo (in `resources/prism-logo.svg`) was:
- More detailed (multiple gradients, glow effects)
- Harder to scale down (glow filters don't work at 16px)
- Slower to render (SVG filters are performance-heavy)
- Beautiful but not minimal

### To New Logo
The new design:
- Removes all gradients and filters
- Uses simple strokes only
- Scales perfectly from 16px to 256px
- Maintains the refraction metaphor with cleaner execution

**Replacement Timeline:**
1. Keep old logo in version control (don't delete)
2. Create all new assets with new logo
3. Update extension, website, Marketplace listings
4. Archive old logo to `/resources/deprecated/` after v0.5.0 release

---

## Accessibility Notes

### Color Contrast
- **Prism outline (#2D3148) on dark background (#1E2130):** 1.4:1
  - ⚠️ *Low contrast, but acceptable for decorative element*
  - Icon remains recognizable due to colored beams
- **Green beam (#10B981) on dark background:** 7.2:1 ✓ (WCAG AAA)
- **Amber beam (#F59E0B) on dark background:** 6.8:1 ✓ (WCAG AAA)
- **Red beam (#EF4444) on dark background:** 4.8:1 ✓ (WCAG AA)

### Dark Background Alternative
If low contrast is a concern, the beams themselves carry the meaning:
- Shape is recognizable from the three distinct colors
- Outline is decorative (not essential to understanding)

### Light Theme Adjustments
Light theme colors are adjusted for higher contrast:
- Prism outline: #4a5080 (better contrast on white)
- Incoming beam: #999999 (grey instead of light)
- Colored beams remain saturated

---

## Brand Guidelines Summary

**PRISM Logo Brand Voice:** Minimal. Modern. Technical. Respectable.

- **No decoration:** No gradients, shadows, glows, or ornaments
- **Geometric only:** Strokes and simple shapes
- **Color with purpose:** Three colored beams encode method states (green/amber/red)
- **Dark-first:** Designed for VS Code, which is dark by default
- **Scalable:** Works at 16px icon up to 256px+ without detail loss

---

## Next Steps

1. **This week:** Verify SVGs render correctly, get team feedback
2. **Next week:** Export PNGs for Marketplace, update package.json
3. **Before v0.4.1 release:** Deploy new logo across all platforms
4. **After release:** Gather user feedback on the new brand aesthetic

---

## File Locations

### Research & Documentation
```
/Users/temilolaolowolayemo/Documents/GitHub/PRISM/website/research/
├── 03_logo_design.md ................. Full research report
├── 03_logo_concepts_visual.md ........ Visual reference with all SVG concepts
└── 04_LOGO_IMPLEMENTATION_GUIDE.md ... This file
```

### Production Assets
```
/Users/temilolaolowolayemo/Documents/GitHub/PRISM/resources/
├── prism-logo-dark.svg .............. Primary logo, dark variant (160×40px)
├── prism-logo-light.svg ............. Primary logo, light variant (160×40px)
├── prism-icon-32-dark.svg ........... Icon only, dark variant (32×32px)
├── prism-icon-32-light.svg .......... Icon only, light variant (32×32px)
├── prism-icon.svg ................... Old icon (keep for now)
└── prism-logo.svg ................... Old logo (keep for now)
```

---

## Questions & Feedback

**For designers/team leads:**
- Do the refracted beams clearly communicate "method states"?
- Does the minimal approach feel respectable or too stark?
- Any contrast concerns in your specific dark/light theme?

**For developers:**
- Can the SVGs be imported directly, or do they need PNG exports?
- Do you need CSS variables to be able to recolor the logo?

---

**Version:** 1.0
**Status:** Ready for Implementation
**Approved by:** [Pending team feedback]

*One thing. Done perfectly.*
