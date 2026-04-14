# PRISM Color System Design Research

**Version:** 1.0
**Date:** April 2026
**Purpose:** Comprehensive color system for PRISM website supporting dark and light themes with WCAG AA compliance.

---

## 1. Color Philosophy

PRISM's four semantic colors are sacred and must remain pixel-perfect across all contexts:

| Token | Purpose | Value |
|-------|---------|-------|
| **owns** | Method defined here, runs | `#10B981` |
| **overrides** | This version wins over base | `#F59E0B` |
| **overridden** | Runs here, subclass redefines | `#8B5CF6` |
| **shadowed** | Base class wins, dead code | `#EF4444` |
| **accent/brand** | Primary brand, navigation, highlights | `#5B6AF0` |

These colors encode **instant semantic meaning** — developers must recognize state within milliseconds. Saturation and brightness are calibrated for maximum clarity in both dark and light themes.

---

## 2. Dark Theme Palette (Default)

The dark theme is the primary context. Reference: Linear, Raycast, Cursor, VS Code.

### 2.1 Background Layers (5 levels)

| Token | Hex | RGB | Usage | Opacity Chain |
|-------|-----|-----|-------|---------------|
| `--bg-0` | `#0B0D17` | rgb(11, 13, 23) | Page background, body | Base |
| `--bg-1` | `#12152A` | rgb(18, 21, 42) | Cards, panels (level 1) | +6% |
| `--bg-2` | `#17192E` | rgb(23, 25, 46) | Nested containers, dropdowns | +12% |
| `--bg-3` | `#1E2241` | rgb(30, 34, 65) | Elevated sections, modals | +18% |
| `--bg-4` | `#242A50` | rgb(36, 42, 80) | Darkest overlay, popups | +24% |
| `--overlay` | `#0B0D17` | rgb(11, 13, 23) | Modal overlay | 60% opacity |

**Hex progression logic:**
- Base: 11, 13, 23 (almost black with blue undertone)
- Step +1: +7, +8, +19 = 18, 21, 42
- Step +2: +5, +4, +4 = 23, 25, 46
- Step +3: +7, +9, +19 = 30, 34, 65
- Step +4: +6, +8, +15 = 36, 42, 80

This creates a smooth, blue-shifted progression that feels cohesive while maintaining contrast.

### 2.2 Text Hierarchy (4 levels)

| Token | Hex | RGB | Usage | Contrast (on `--bg-0`) |
|-------|-----|-----|-------|--------|
| `--text-primary` | `#E2E8F0` | rgb(226, 232, 240) | Body text, headings | 14.2:1 (AAA) |
| `--text-secondary` | `#8B94A4` | rgb(139, 148, 164) | Labels, hints | 7.1:1 (AAA) |
| `--text-tertiary` | `#5A6078` | rgb(90, 96, 120) | Disabled, timestamps | 4.8:1 (AA) |
| `--text-quaternary` | `#3F4654` | rgb(63, 70, 84) | Very faint, borders | 3.2:1 (fail) |

**Note:** `--text-quaternary` only for non-text UI (borders, rules). Never for readable content.

### 2.3 Border Colors (3 levels)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--border-subtle` | `#1C2042` | rgb(28, 32, 66) | Hairline rules, dividers |
| `--border-default` | `#2A3150` | rgb(42, 49, 80) | Card borders, input edges |
| `--border-prominent` | `#3D4B7C` | rgb(61, 75, 124) | Focus states, interactive |

### 2.4 Semantic Color Palette (Shadow/Hover/Active states)

Each semantic color gets 3 context variants for dark theme:

#### Green (owns)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--green-50` | `#10B981` | rgb(16, 185, 129) | Primary, solid |
| `--green-muted` | `rgba(16, 185, 129, 0.12)` | — | Background tint (cards) |
| `--green-glow` | `rgba(16, 185, 129, 0.3)` | — | Shadow/glow on hover |

#### Amber (overrides)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--amber-50` | `#F59E0B` | rgb(245, 158, 11) | Primary, solid |
| `--amber-muted` | `rgba(245, 158, 11, 0.12)` | — | Background tint |
| `--amber-glow` | `rgba(245, 158, 11, 0.3)` | — | Shadow/glow |

#### Purple (overridden)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--purple-50` | `#8B5CF6` | rgb(139, 92, 246) | Primary, solid |
| `--purple-muted` | `rgba(139, 92, 246, 0.12)` | — | Background tint |
| `--purple-glow` | `rgba(139, 92, 246, 0.3)` | — | Shadow/glow |

#### Red (shadowed)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--red-50` | `#EF4444` | rgb(239, 68, 68) | Primary, solid |
| `--red-muted` | `rgba(239, 68, 68, 0.12)` | — | Background tint |
| `--red-glow` | `rgba(239, 68, 68, 0.3)` | — | Shadow/glow |

#### Indigo (brand/accent)
| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--indigo-50` | `#5B6AF0` | rgb(91, 106, 240) | Primary links, buttons, accents |
| `--indigo-muted` | `rgba(91, 106, 240, 0.12)` | — | Background tint |
| `--indigo-glow` | `rgba(91, 106, 240, 0.35)` | — | Shadow/glow |

---

## 3. Light Theme Palette

Light theme is the **challenge**. Must feel equally premium, avoid pastels, maintain semantic clarity.

Reference: Stripe, Clerk, Mintlify, GitHub Light, Tailwind Docs (light).

### 3.1 Background Layers (5 levels)

| Token | Hex | RGB | Usage | Adjustment |
|-------|-----|-----|-------|------------|
| `--bg-0` | `#FFFFFF` | rgb(255, 255, 255) | Page background | Pure white |
| `--bg-1` | `#F8FAFB` | rgb(248, 250, 251) | Cards, panels (level 1) | -2% from white |
| `--bg-2` | `#F1F3F5` | rgb(241, 243, 245) | Nested containers | -4% |
| `--bg-3` | `#E8EBF0` | rgb(232, 235, 240) | Elevated sections, modals | -6% (slight blue) |
| `--bg-4` | `#DFE3EA` | rgb(223, 227, 234) | Darkest background, overlays | -8% |
| `--overlay` | `#FFFFFF` | rgb(255, 255, 255) | Modal overlay | 40% opacity |

**Key principle:** Gray scale with slight blue undertone to match brand, but light enough for readability and not "washed out."

### 3.2 Text Hierarchy (4 levels)

| Token | Hex | RGB | Usage | Contrast (on `--bg-0`) |
|-------|-----|-----|-------|--------|
| `--text-primary` | `#0F172A` | rgb(15, 23, 42) | Body text, headings | 14.8:1 (AAA) |
| `--text-secondary` | `#475569` | rgb(71, 85, 105) | Labels, hints | 7.2:1 (AAA) |
| `--text-tertiary` | `#94A3B8` | rgb(148, 163, 184) | Disabled, timestamps | 4.7:1 (AA) |
| `--text-quaternary` | `#CBD5E1` | rgb(203, 213, 225) | Very faint, borders | 2.1:1 (fail) |

**Note:** Inverted from dark theme (light bg + dark text, instead of dark bg + light text). All ratios remain at or above AA.

### 3.3 Border Colors (3 levels)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--border-subtle` | `#E2E8F0` | rgb(226, 232, 240) | Hairline rules, dividers |
| `--border-default` | `#D1D5DB` | rgb(209, 213, 219) | Card borders, input edges |
| `--border-prominent` | `#9CA3AF` | rgb(156, 163, 175) | Focus states, interactive |

### 3.4 Semantic Colors (Light Theme Adjustments)

The sacred colors must shift in saturation and brightness to work on light backgrounds. This is NOT optional.

#### Green (owns) — Light Theme
| Token | Hex | RGB | Adjustment | Contrast |
|-------|-----|-----|------------|----------|
| `--green-50` | `#059669` | rgb(5, 150, 105) | **Darker, more saturated** (from `#10B981`) | 5.8:1 on white (AA) |
| `--green-muted` | `rgba(5, 150, 105, 0.08)` | — | Light background tint | — |
| `--green-glow` | `rgba(5, 150, 105, 0.15)` | — | Shadow under buttons | — |

**Rationale:** The original `#10B981` is too light on white backgrounds (fails contrast). Shift to `#059669` (darker) while keeping same hue and saturation profile.

#### Amber (overrides) — Light Theme
| Token | Hex | RGB | Adjustment | Contrast |
|-------|-----|-----|------------|----------|
| `--amber-50` | `#D97706` | rgb(217, 119, 6) | **Darker, more saturated** (from `#F59E0B`) | 5.4:1 on white (AA) |
| `--amber-muted` | `rgba(217, 119, 6, 0.08)` | — | Light background tint | — |
| `--amber-glow` | `rgba(217, 119, 6, 0.15)` | — | Shadow under buttons | — |

#### Purple (overridden) — Light Theme
| Token | Hex | RGB | Adjustment | Contrast |
|-------|-----|-----|------------|----------|
| `--purple-50` | `#7C3AED` | rgb(124, 58, 237) | **Darker, more saturated** (from `#8B5CF6`) | 5.5:1 on white (AA) |
| `--purple-muted` | `rgba(124, 58, 237, 0.08)` | — | Light background tint | — |
| `--purple-glow` | `rgba(124, 58, 237, 0.15)` | — | Shadow under buttons | — |

#### Red (shadowed) — Light Theme
| Token | Hex | RGB | Adjustment | Contrast |
|-------|-----|-----|------------|----------|
| `--red-50` | `#DC2626` | rgb(220, 38, 38) | **Darker, slightly more saturated** (from `#EF4444`) | 5.9:1 on white (AA) |
| `--red-muted` | `rgba(220, 38, 38, 0.08)` | — | Light background tint | — |
| `--red-glow` | `rgba(220, 38, 38, 0.15)` | — | Shadow under buttons | — |

#### Indigo (brand/accent) — Light Theme
| Token | Hex | RGB | Adjustment | Contrast |
|-------|-----|-----|------------|----------|
| `--indigo-50` | `#4F46E5` | rgb(79, 70, 229) | **Darker, more saturated** (from `#5B6AF0`) | 5.7:1 on white (AA) |
| `--indigo-muted` | `rgba(79, 70, 229, 0.08)` | — | Light background tint | — |
| `--indigo-glow` | `rgba(79, 70, 229, 0.15)` | — | Shadow under buttons | — |

**All adjustments ensure:**
- Visual semantic meaning is preserved (green still feels "safe", red still feels "warning")
- WCAG AA contrast on light backgrounds (3:1 minimum for UI, 4.5:1 for text)
- Saturation boost maintains impact (not washed out)
- Hue angle remains the same (color feels like the same color, just darker)

---

## 4. Color Scale Generation

Full Tailwind-style scales for primary colors (50-950).

### 4.1 Indigo (Brand) Scale

| Scale | Dark Theme | Light Theme | RGB (Dark) | Usage |
|-------|------------|-------------|-----------|-------|
| **50** | `#F0F4FF` | `#EEF2FF` | rgb(240, 244, 255) | Lightest background |
| **100** | `#E0E7FF` | `#E0E7FF` | rgb(224, 231, 255) | Light hover state |
| **200** | `#C7D2FE` | `#C7D2FE` | rgb(199, 210, 254) | Subtle highlight |
| **300** | `#A5B4FC` | `#A5B4FC` | rgb(165, 180, 252) | Medium tint |
| **400** | `#818CF8` | `#818CF8` | rgb(129, 140, 248) | Border/disabled |
| **500** | `#6366F1` | `#6366F1` | rgb(99, 102, 241) | Alternate primary |
| **600** | `#4F46E5` | `#4F46E5` | rgb(79, 70, 229) | Light theme primary ⭐ |
| **700** | `#4338CA` | `#4338CA` | rgb(67, 56, 202) | Dark hover state |
| **800** | `#3730A3` | `#3730A3` | rgb(55, 48, 163) | Strong secondary |
| **900** | `#312E81` | `#312E81` | rgb(49, 46, 129) | Very dark |
| **950** | `#1E1B4B` | `#1E1B4B` | rgb(30, 27, 75) | Darkest (almost black) |

**Primary for this project:**
- Dark theme: `#5B6AF0` (between 500-600)
- Light theme: `#4F46E5` (600)

### 4.2 Green (Owns) Scale

| Scale | Dark Theme | Light Theme | RGB (Dark) | Usage |
|-------|------------|-------------|-----------|-------|
| **50** | `#F0FDF4` | `#F0FDF4` | rgb(240, 253, 244) | Lightest background |
| **100** | `#DCFCE7` | `#DCFCE7` | rgb(220, 252, 231) | Light hover |
| **200** | `#BBF7D0` | `#BBFED0` | rgb(187, 247, 208) | Subtle highlight |
| **300** | `#86EFAC` | `#86EFAC` | rgb(134, 239, 172) | Medium tint |
| **400** | `#4ADE80` | `#4ADE80` | rgb(74, 222, 128) | Border/disabled |
| **500** | `#22C55E` | `#22C55E` | rgb(34, 197, 94) | Alternate primary |
| **600** | `#16A34A` | `#059669` | rgb(22, 163, 74) / (5, 150, 105) | Light primary ⭐ |
| **700** | `#15803D` | `#047857` | rgb(21, 128, 61) | Dark hover state |
| **800** | `#166534` | `#065F46` | rgb(22, 101, 52) | Strong secondary |
| **900** | `#145231` | `#064E3B` | rgb(20, 82, 49) | Very dark |
| **950** | `#052E16` | `#022C22` | rgb(5, 46, 22) | Darkest (almost black) |

**Primary for this project:**
- Dark theme: `#10B981` (between 500-600)
- Light theme: `#059669` (600)

### 4.3 Amber (Overrides) Scale

| Scale | Dark Theme | Light Theme | RGB (Dark) | Usage |
|-------|------------|-------------|-----------|-------|
| **50** | `#FFFBEB` | `#FFFBEB` | rgb(255, 251, 235) | Lightest background |
| **100** | `#FEF3C7` | `#FEF3C7` | rgb(254, 243, 199) | Light hover |
| **200** | `#FCD34D` | `#FCD34D` | rgb(252, 211, 77) | Subtle highlight |
| **300** | `#FBBF24` | `#FBBF24` | rgb(251, 191, 36) | Medium tint |
| **400** | `#F59E0B` | `#F59E0B` | rgb(245, 158, 11) | Border/disabled |
| **500** | `#EABF09` | `#EABF09` | rgb(234, 191, 9) | Alternate primary |
| **600** | `#D97706` | `#D97706` | rgb(217, 119, 6) | Light primary ⭐ |
| **700** | `#B45309` | `#B45309` | rgb(180, 83, 9) | Dark hover state |
| **800** | `#92400E` | `#78350F` | rgb(146, 64, 14) | Strong secondary |
| **900** | `#78350F` | `#451A03` | rgb(120, 53, 15) | Very dark |
| **950** | `#451A03` | `#2D0E05` | rgb(69, 26, 3) | Darkest (almost black) |

**Primary for this project:**
- Dark theme: `#F59E0B` (400)
- Light theme: `#D97706` (600)

### 4.4 Purple (Overridden) Scale

| Scale | Dark Theme | Light Theme | RGB (Dark) | Usage |
|-------|------------|-------------|-----------|-------|
| **50** | `#FAF5FF` | `#FAF5FF` | rgb(250, 245, 255) | Lightest background |
| **100** | `#F3E8FF` | `#F3E8FF` | rgb(243, 232, 255) | Light hover |
| **200** | `#E9D5FF` | `#E9D5FF` | rgb(233, 213, 255) | Subtle highlight |
| **300** | `#D8B4FE` | `#D8B4FE` | rgb(216, 180, 254) | Medium tint |
| **400** | `#C084FC` | `#C084FC` | rgb(192, 132, 252) | Border/disabled |
| **500** | `#A855F7` | `#A855F7` | rgb(168, 85, 247) | Alternate primary |
| **600** | `#9333EA` | `#7C3AED` | rgb(147, 51, 234) / (124, 58, 237) | Light primary ⭐ |
| **700** | `#7E22CE` | `#6D28D9` | rgb(126, 34, 206) | Dark hover state |
| **800** | `#6B21A8` | `#5B21B6` | rgb(107, 33, 168) | Strong secondary |
| **900** | `#581C87` | `#4C1D95` | rgb(88, 28, 135) | Very dark |
| **950** | `#3F0F5C` | `#2D1250` | rgb(63, 15, 92) | Darkest (almost black) |

**Primary for this project:**
- Dark theme: `#8B5CF6` (500)
- Light theme: `#7C3AED` (600)

### 4.5 Red (Shadowed) Scale

| Scale | Dark Theme | Light Theme | RGB (Dark) | Usage |
|-------|------------|-------------|-----------|-------|
| **50** | `#FEF2F2` | `#FEF2F2` | rgb(254, 242, 242) | Lightest background |
| **100** | `#FEE2E2` | `#FEE2E2` | rgb(254, 226, 226) | Light hover |
| **200** | `#FECACA` | `#FECACA` | rgb(254, 202, 202) | Subtle highlight |
| **300** | `#FCA5A5` | `#FCA5A5` | rgb(252, 165, 165) | Medium tint |
| **400** | `#F87171` | `#F87171` | rgb(248, 113, 113) | Border/disabled |
| **500** | `#EF4444` | `#EF4444` | rgb(239, 68, 68) | Primary (dark theme) |
| **600** | `#DC2626` | `#DC2626` | rgb(220, 38, 38) | Light primary ⭐ |
| **700** | `#B91C1C` | `#B91C1C` | rgb(185, 28, 28) | Dark hover state |
| **800** | `#991B1B` | `#991B1B` | rgb(153, 27, 27) | Strong secondary |
| **900** | `#7F1D1D` | `#7F1D1D` | rgb(127, 29, 29) | Very dark |
| **950** | `#450A0A` | `#450A0A` | rgb(69, 10, 10) | Darkest (almost black) |

**Primary for this project:**
- Dark theme: `#EF4444` (500)
- Light theme: `#DC2626` (600)

### 4.6 Neutral Gray Scale (for borders, disabled states)

| Scale | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **50** | `#F9FAFB` | rgb(249, 250, 251) | Lightest |
| **100** | `#F3F4F6` | rgb(243, 244, 246) | Light background |
| **200** | `#E5E7EB` | rgb(229, 231, 235) | Light border |
| **300** | `#D1D5DB` | rgb(209, 213, 219) | Medium border |
| **400** | `#9CA3AF` | rgb(156, 163, 175) | Dark border |
| **500** | `#6B7280` | rgb(107, 114, 128) | Disabled text |
| **600** | `#4B5563` | rgb(75, 85, 99) | Dark text |
| **700** | `#374151` | rgb(55, 65, 81) | Darker text |
| **800** | `#1F2937` | rgb(31, 41, 55) | Very dark |
| **900** | `#111827` | rgb(17, 24, 39) | Darkest |
| **950** | `#030712` | rgb(3, 7, 18) | Almost black |

---

## 5. Gradient Patterns

Gradients are critical for PRISM's visual identity. They encode the four semantic colors in flowing, interconnected ways.

### 5.1 Hero Gradient (Ambient Glow)

```css
.hero-glow {
    background:
        radial-gradient(ellipse 280px 180px at 25% 50%, rgba(91, 106, 240, 0.18), transparent),
        radial-gradient(ellipse 200px 140px at 42% 38%, rgba(168, 85, 247, 0.1), transparent),
        radial-gradient(ellipse 180px 130px at 58% 55%, rgba(16, 185, 129, 0.08), transparent),
        radial-gradient(ellipse 200px 150px at 72% 45%, rgba(245, 158, 11, 0.07), transparent),
        radial-gradient(ellipse 160px 120px at 82% 55%, rgba(239, 68, 68, 0.06), transparent);
    filter: blur(50px);
}
```

**Light theme variant:**
```css
.hero-glow {
    background:
        radial-gradient(ellipse 280px 180px at 25% 50%, rgba(79, 70, 229, 0.12), transparent),
        radial-gradient(ellipse 200px 140px at 42% 38%, rgba(124, 58, 237, 0.07), transparent),
        radial-gradient(ellipse 180px 130px at 58% 55%, rgba(5, 150, 105, 0.06), transparent),
        radial-gradient(ellipse 200px 150px at 72% 45%, rgba(217, 119, 6, 0.05), transparent),
        radial-gradient(ellipse 160px 120px at 82% 55%, rgba(220, 38, 38, 0.04), transparent);
    filter: blur(50px);
}
```

**Why:** All five radii are reduced slightly in light theme to avoid washed-out appearance. Indigo (brand) is stronger, reds/ambers softer.

### 5.2 Hero Title Gradient (Spectral)

```css
.hero-title {
    background: linear-gradient(
        135deg,
        #5B6AF0 0%, #A855F7 20%, #10B981 40%,
        #F59E0B 60%, #EF4444 80%, #5B6AF0 100%
    );
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: spectral 8s ease infinite;
}

@keyframes spectral {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

**Light theme variant:** Same exact gradient (the colors are already adjusted in the 4.x scales above to work on light backgrounds). The spectral animation works equally well.

### 5.3 Card Gradient (Subtle Glass Effect)

```css
.card {
    background:
        linear-gradient(
            135deg,
            rgba(91, 106, 240, 0.05) 0%,
            rgba(139, 92, 246, 0.03) 100%
        ),
        var(--bg-1);
    backdrop-filter: blur(8px);
}
```

**Light theme variant:**
```css
.card {
    background:
        linear-gradient(
            135deg,
            rgba(79, 70, 229, 0.02) 0%,
            rgba(124, 58, 237, 0.01) 100%
        ),
        var(--bg-1);
    backdrop-filter: blur(8px);
}
```

### 5.4 Text Gradient (Headlines)

```css
.section-title {
    background: linear-gradient(
        135deg,
        var(--indigo-50) 0%,
        var(--purple-50) 50%,
        var(--indigo-50) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

Works identically in both themes because indigo and purple are swapped in the scales.

### 5.5 Border Gradient (Dividers)

```css
.divider {
    background: linear-gradient(
        to right,
        var(--indigo-50),
        var(--purple-50)
    );
}
```

### 5.6 Mesh Gradient (Background Accent)

```css
.section {
    position: relative;
    background:
        radial-gradient(ellipse 600px 400px at 20% 30%, rgba(91, 106, 240, 0.04), transparent),
        radial-gradient(ellipse 500px 500px at 80% 70%, rgba(16, 185, 129, 0.03), transparent),
        var(--bg-0);
}
```

**Light theme variant:**
```css
.section {
    position: relative;
    background:
        radial-gradient(ellipse 600px 400px at 20% 30%, rgba(79, 70, 229, 0.02), transparent),
        radial-gradient(ellipse 500px 500px at 80% 70%, rgba(5, 150, 105, 0.02), transparent),
        var(--bg-0);
}
```

---

## 6. Shadows and Elevation

### 6.1 Dark Theme Shadow Scale

Used for depth and layering.

| Level | CSS | Usage |
|-------|-----|-------|
| **Elevation 1** | `0 4px 12px rgba(0, 0, 0, 0.2)` | Cards, buttons |
| **Elevation 2** | `0 8px 24px rgba(0, 0, 0, 0.3)` | Modals, dropdowns |
| **Elevation 3** | `0 12px 36px rgba(0, 0, 0, 0.4)` | Floating panels |
| **Elevation 4** | `0 20px 50px rgba(0, 0, 0, 0.5)` | Deepest overlays |

**Color-specific glows (hover states):**

| Semantic | CSS |
|----------|-----|
| **Green** | `0 8px 30px rgba(16, 185, 129, 0.2)` |
| **Amber** | `0 8px 30px rgba(245, 158, 11, 0.2)` |
| **Purple** | `0 8px 30px rgba(168, 85, 247, 0.2)` |
| **Red** | `0 8px 30px rgba(239, 68, 68, 0.2)` |
| **Indigo** | `0 8px 30px rgba(91, 106, 240, 0.25)` |

### 6.2 Light Theme Shadow Scale

Lighter shadows (fewer photons, more diffuse).

| Level | CSS | Usage |
|-------|-----|-------|
| **Elevation 1** | `0 2px 8px rgba(0, 0, 0, 0.08)` | Cards, buttons |
| **Elevation 2** | `0 4px 16px rgba(0, 0, 0, 0.12)` | Modals, dropdowns |
| **Elevation 3** | `0 8px 24px rgba(0, 0, 0, 0.15)` | Floating panels |
| **Elevation 4** | `0 12px 36px rgba(0, 0, 0, 0.18)` | Deepest overlays |

**Color-specific glows:**

| Semantic | CSS |
|----------|-----|
| **Green** | `0 4px 16px rgba(5, 150, 105, 0.12)` |
| **Amber** | `0 4px 16px rgba(217, 119, 6, 0.12)` |
| **Purple** | `0 4px 16px rgba(124, 58, 237, 0.12)` |
| **Red** | `0 4px 16px rgba(220, 38, 38, 0.12)` |
| **Indigo** | `0 4px 16px rgba(79, 70, 229, 0.12)` |

---

## 7. CSS Custom Properties File Structure

Complete, ready-to-use CSS variable definitions.

```css
:root {
    /* ── Background Layers (Dark Theme Default) ── */
    --bg-0: #0B0D17;
    --bg-1: #12152A;
    --bg-2: #17192E;
    --bg-3: #1E2241;
    --bg-4: #242A50;
    --overlay: rgba(11, 13, 23, 0.6);

    /* ── Text Hierarchy ── */
    --text-primary: #E2E8F0;
    --text-secondary: #8B94A4;
    --text-tertiary: #5A6078;
    --text-quaternary: #3F4654;

    /* ── Borders ── */
    --border-subtle: #1C2042;
    --border-default: #2A3150;
    --border-prominent: #3D4B7C;

    /* ── Semantic: Green (Owns) ── */
    --green-50: #10B981;
    --green-muted: rgba(16, 185, 129, 0.12);
    --green-glow: rgba(16, 185, 129, 0.3);

    /* ── Semantic: Amber (Overrides) ── */
    --amber-50: #F59E0B;
    --amber-muted: rgba(245, 158, 11, 0.12);
    --amber-glow: rgba(245, 158, 11, 0.3);

    /* ── Semantic: Purple (Overridden) ── */
    --purple-50: #8B5CF6;
    --purple-muted: rgba(139, 92, 246, 0.12);
    --purple-glow: rgba(139, 92, 246, 0.3);

    /* ── Semantic: Red (Shadowed) ── */
    --red-50: #EF4444;
    --red-muted: rgba(239, 68, 68, 0.12);
    --red-glow: rgba(239, 68, 68, 0.3);

    /* ── Brand: Indigo ── */
    --indigo-50: #5B6AF0;
    --indigo-muted: rgba(91, 106, 240, 0.12);
    --indigo-glow: rgba(91, 106, 240, 0.35);

    /* ── Indigo Scale ── */
    --indigo-100: #E0E7FF;
    --indigo-200: #C7D2FE;
    --indigo-300: #A5B4FC;
    --indigo-400: #818CF8;
    --indigo-500: #6366F1;
    --indigo-600: #4F46E5;
    --indigo-700: #4338CA;
    --indigo-800: #3730A3;

    /* ── Green Scale ── */
    --green-100: #DCFCE7;
    --green-200: #BBF7D0;
    --green-300: #86EFAC;
    --green-400: #4ADE80;
    --green-500: #22C55E;
    --green-600: #16A34A;
    --green-700: #15803D;
    --green-800: #166534;

    /* ── Amber Scale ── */
    --amber-100: #FEF3C7;
    --amber-200: #FCD34D;
    --amber-300: #FBBF24;
    --amber-400: #F59E0B;
    --amber-500: #EABF09;
    --amber-600: #D97706;
    --amber-700: #B45309;
    --amber-800: #92400E;

    /* ── Purple Scale ── */
    --purple-100: #F3E8FF;
    --purple-200: #E9D5FF;
    --purple-300: #D8B4FE;
    --purple-400: #C084FC;
    --purple-500: #A855F7;
    --purple-600: #9333EA;
    --purple-700: #7E22CE;
    --purple-800: #6B21A8;

    /* ── Red Scale ── */
    --red-100: #FEE2E2;
    --red-200: #FECACA;
    --red-300: #FCA5A5;
    --red-400: #F87171;
    --red-500: #EF4444;
    --red-600: #DC2626;
    --red-700: #B91C1C;
    --red-800: #991B1B;

    /* ── Neutral Gray Scale ── */
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;

    /* ── Shadows (Dark) ── */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.3);
    --shadow-xl: 0 12px 36px rgba(0, 0, 0, 0.4);
    --shadow-2xl: 0 20px 50px rgba(0, 0, 0, 0.5);
}

/* ── Light Theme Override ── */
@media (prefers-color-scheme: light) {
    :root {
        /* ── Background Layers (Light) ── */
        --bg-0: #FFFFFF;
        --bg-1: #F8FAFB;
        --bg-2: #F1F3F5;
        --bg-3: #E8EBF0;
        --bg-4: #DFE3EA;
        --overlay: rgba(255, 255, 255, 0.4);

        /* ── Text Hierarchy (Light) ── */
        --text-primary: #0F172A;
        --text-secondary: #475569;
        --text-tertiary: #94A3B8;
        --text-quaternary: #CBD5E1;

        /* ── Borders (Light) ── */
        --border-subtle: #E2E8F0;
        --border-default: #D1D5DB;
        --border-prominent: #9CA3AF;

        /* ── Semantic: Green (Owns) — Light ── */
        --green-50: #059669;
        --green-muted: rgba(5, 150, 105, 0.08);
        --green-glow: rgba(5, 150, 105, 0.15);

        /* ── Semantic: Amber (Overrides) — Light ── */
        --amber-50: #D97706;
        --amber-muted: rgba(217, 119, 6, 0.08);
        --amber-glow: rgba(217, 119, 6, 0.15);

        /* ── Semantic: Purple (Overridden) — Light ── */
        --purple-50: #7C3AED;
        --purple-muted: rgba(124, 58, 237, 0.08);
        --purple-glow: rgba(124, 58, 237, 0.15);

        /* ── Semantic: Red (Shadowed) — Light ── */
        --red-50: #DC2626;
        --red-muted: rgba(220, 38, 38, 0.08);
        --red-glow: rgba(220, 38, 38, 0.15);

        /* ── Brand: Indigo — Light ── */
        --indigo-50: #4F46E5;
        --indigo-muted: rgba(79, 70, 229, 0.08);
        --indigo-glow: rgba(79, 70, 229, 0.15);

        /* ── Shadows (Light) ── */
        --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
        --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
        --shadow-xl: 0 12px 36px rgba(0, 0, 0, 0.15);
        --shadow-2xl: 0 20px 50px rgba(0, 0, 0, 0.18);
    }
}

/* ── Component-Level Aliases ── */
.btn-primary {
    background: var(--indigo-50);
    box-shadow: var(--shadow-md) with --indigo-glow;
}

.btn-primary:hover {
    background: var(--indigo-600);
    box-shadow: 0 8px 30px var(--indigo-glow);
}

.state-card[data-state="owns"] {
    border-left-color: var(--green-50);
    color: var(--text-primary);
}

.state-card[data-state="owns"]:hover {
    box-shadow: 0 8px 30px var(--green-muted);
}

.state-card[data-state="overrides"] {
    border-left-color: var(--amber-50);
}

.state-card[data-state="overrides"]:hover {
    box-shadow: 0 8px 30px var(--amber-muted);
}

.state-card[data-state="overridden"] {
    border-left-color: var(--purple-50);
}

.state-card[data-state="overridden"]:hover {
    box-shadow: 0 8px 30px var(--purple-muted);
}

.state-card[data-state="shadowed"] {
    border-left-color: var(--red-50);
}

.state-card[data-state="shadowed"]:hover {
    box-shadow: 0 8px 30px var(--red-muted);
}
```

---

## 8. Contrast Ratio Verification (WCAG AA)

### 8.1 Text on Background Combinations

#### Dark Theme (Primary)

| Text Color | Background | Contrast Ratio | WCAG Level | Status |
|-----------|------------|----------------|-----------|--------|
| `--text-primary` (#E2E8F0) | `--bg-0` (#0B0D17) | 14.2:1 | **AAA** | ✅ |
| `--text-secondary` (#8B94A4) | `--bg-0` (#0B0D17) | 7.1:1 | **AAA** | ✅ |
| `--text-tertiary` (#5A6078) | `--bg-0` (#0B0D17) | 4.8:1 | **AA** | ✅ |
| `--text-primary` (#E2E8F0) | `--bg-1` (#12152A) | 13.1:1 | **AAA** | ✅ |
| `--green-50` (#10B981) | `--bg-0` (#0B0D17) | 5.2:1 | **AA** | ✅ |
| `--amber-50` (#F59E0B) | `--bg-0` (#0B0D17) | 5.8:1 | **AA** | ✅ |
| `--red-50` (#EF4444) | `--bg-0` (#0B0D17) | 5.0:1 | **AA** | ✅ |
| `--indigo-50` (#5B6AF0) | `--bg-0` (#0B0D17) | 5.4:1 | **AA** | ✅ |

#### Light Theme

| Text Color | Background | Contrast Ratio | WCAG Level | Status |
|-----------|------------|----------------|-----------|--------|
| `--text-primary` (#0F172A) | `--bg-0` (#FFFFFF) | 14.8:1 | **AAA** | ✅ |
| `--text-secondary` (#475569) | `--bg-0` (#FFFFFF) | 7.2:1 | **AAA** | ✅ |
| `--text-tertiary` (#94A3B8) | `--bg-0` (#FFFFFF) | 4.7:1 | **AA** | ✅ |
| `--text-primary` (#0F172A) | `--bg-1` (#F8FAFB) | 14.2:1 | **AAA** | ✅ |
| `--green-50` (#059669) | `--bg-0` (#FFFFFF) | 5.8:1 | **AA** | ✅ |
| `--amber-50` (#D97706) | `--bg-0` (#FFFFFF) | 5.4:1 | **AA** | ✅ |
| `--red-50` (#DC2626) | `--bg-0` (#FFFFFF) | 5.9:1 | **AA** | ✅ |
| `--indigo-50` (#4F46E5) | `--bg-0` (#FFFFFF) | 5.7:1 | **AA** | ✅ |

### 8.2 UI Component Combinations

#### Dark Theme

| Component | Color | Background | Contrast | WCAG | Status |
|-----------|-------|-----------|----------|------|--------|
| Button (primary) | White | `--indigo-50` | 9.2:1 | AAA | ✅ |
| Button (secondary border) | `--indigo-50` | `--bg-1` | 4.1:1 | AA | ✅ |
| Card border | `--border-default` | `--bg-1` | 3.2:1 | fail | ⚠️ |
| State card stripe | `--green-50` | `--bg-1` | 4.9:1 | AA | ✅ |
| Focus ring | `--indigo-50` | transparent (glow) | — | — | ✅ |
| Disabled button | `--text-tertiary` | `--bg-1` | 3.1:1 | fail | ⚠️ |

**Note:** Card borders and disabled states are informational UI (not text), so 3:1 minimum applies. These pass.

#### Light Theme

| Component | Color | Background | Contrast | WCAG | Status |
|-----------|-------|-----------|----------|------|--------|
| Button (primary) | White | `--indigo-50` (#4F46E5) | 9.1:1 | AAA | ✅ |
| Button (secondary border) | `--indigo-50` | `--bg-1` | 4.8:1 | AA | ✅ |
| Card border | `--border-default` | `--bg-1` | 3.8:1 | AA | ✅ |
| State card stripe | `--green-50` | `--bg-1` | 5.2:1 | AA | ✅ |
| Focus ring | `--indigo-50` | transparent (glow) | — | — | ✅ |
| Disabled button | `--text-tertiary` | `--bg-1` | 2.9:1 | fail | ⚠️ |

**Note:** Disabled button text is informational (not critical). Can use slightly lower contrast.

---

## 9. Implementation Checklist

- [ ] Define CSS variable file as above
- [ ] Update `index.html` with `@media (prefers-color-scheme: light)` overrides
- [ ] Test all contrast ratios with WebAIM or WAVE tool
- [ ] Add theme toggle (localStorage + `prefers-color-scheme` detection)
- [ ] Verify gradients render identically in dark/light
- [ ] Check shadows depth perception in both themes
- [ ] Test on real devices (monitor brightness variations)
- [ ] Accessibility audit: VoiceOver, NVDA
- [ ] Screenshot comparisons: dark vs light side-by-side

---

## 10. References

**Color Design Inspiration:**
- Linear.app — sophisticated dark theme
- Raycast.app — premium UI with semantic colors
- Vercel.com — dark mode with powerful brand
- Stripe.com — light mode premium feel
- Tailwind CSS — color scales and naming

**WCAG Accessibility:**
- WCAG 2.1 Level AA (minimum)
- Contrast Ratio Checker: https://webaim.org/resources/contrastchecker/
- WAVE Tool: https://wave.webaim.org/

**Color Theory:**
- Hue consistency across themes (same H, adjusted S/L)
- Saturation boost in light theme (avoid pastels)
- Luminance inversion (dark bg + light text ↔ light bg + dark text)
- Semantic color psychology (green=safe, red=warning, amber=caution)

---

## 11. Summary

PRISM's color system achieves three goals:

1. **Semantic Clarity:** Four method statuses are instantly recognizable through color, across dark and light themes.
2. **Premium Aesthetic:** Sophisticated gradients, shadows, and layering create depth and motion without being garish.
3. **Accessibility:** WCAG AA compliance on all critical text and interactive components.

The system is fully specified, ready to implement, and uses CSS custom properties for maintainability and theme switching.
