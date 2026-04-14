# PRISM Feature Catalog — Complete Visual & UI Inventory

**Purpose:** This document catalogs every visual feature, interaction, UI element, and surface in PRISM v0.4.0 for website mockups and demos.

**Date:** April 2026
**Scope:** V1 core + V2/V3 enhancements (multi-language, graph visualizations, workspace scans, live callers)

---

## Color System

### Status Colors (Exact Hex)
- **Owns** — `#3FB950` (green, VS Code diagnostic passed)
- **Overrides** — `#D29922` (amber, VS Code diagnostic warning)
- **Overridden** — `#8B5CF6` (purple)
- **Shadowed** — `#F85149` (red, VS Code diagnostic error)

### Base Palette (Theme-Aware)
- **Foreground** — VS Code `--vscode-foreground`
- **Dim text** — VS Code `--vscode-descriptionForeground`
- **Background** — VS Code `--vscode-sideBar-background` or editor background
- **Surface** — VS Code `--vscode-editorWidget-background`
- **Border** — VS Code `--vscode-widget-border` (subtle dividers)
- **Link** — VS Code `--vscode-textLink-foreground` (accent, typically blue)

### Spacing Scale (4px base unit)
`--s1: 4px`, `--s2: 8px`, `--s3: 12px`, `--s4: 16px`, `--s5: 20px`, `--s6: 24px`, `--s8: 32px`

---

## 1. CORE PANEL UI

### 1.1 Panel Header
**What it is:**
Sticky, ultra-compact bar at the top with "PRISM" branding and action buttons.

**Where it appears:**
- Sidebar MRO View (always visible)
- Floating panel (always visible)

**Visual description:**
- Layout: flexbox, space-between
- Height: ~40px (6px top/bottom padding, 12px left/right)
- Background: `--bg` (editor background)
- Border-bottom: 1px `--border`
- Position: sticky (top: 0, z-index: 11)

**Elements:**
- **Title:** "PRISM" — 11px uppercase, 600 weight, letter-spacing 0.08em, color `--fg-faint`
- **Action buttons (right side):**
  - **Open Panel button** (↗ icon) — 28×28px, hover: background highlight, tooltip on hover
  - **Refresh button** (↻ icon) — 28×28px, triggers `refreshAnalysis` message

**Interaction:**
- All buttons: click-to-action, hover shows tooltip
- Buttons fade to lighter gray on hover

**States:**
- Normal (idle)
- Hover (button highlighted)
- Active (button pressed/loading)

**Website showcase:**
- Static screenshot showing header with icon + tooltip
- Or: animated GIF of button click → analysis refresh

---

### 1.2 Progress Strip
**What it is:**
Indeterminate progress bar mimicking GitLens design, shows when analysis is in-flight.

**Where it appears:**
- Top edge of panel (fixed position, full width)
- Z-index: 100 (above all content)

**Visual description:**
- Height: 2px (hair-thin)
- Background: transparent (only shows animation)
- Animation: sliding gradient (30% width, left-to-right, 1.1s loop, easing)
- Color: `--link` (accent blue)
- Opacity: 0 normally, fades to 1 when active

**Interaction:**
- Auto-appears when cursor moves (via `setInFlight(true)`)
- Auto-hides when response arrives
- Non-blocking (pointer-events: none)

**Website showcase:**
- Animated GIF showing the progress bar sliding across the top

---

### 1.3 Signal Bar (Status Summary)
**What it is:**
One-sentence status message about the cursor method, color-coded by method status.

**Where it appears:**
- Top of Resolution tab (immediately below header)
- Always visible when a class is selected

**Visual description:**
- Layout: vertical stack (status label, message, optional caller count)
- Padding: 12px 16px
- Margin-bottom: 24px
- Background: status color at 12% opacity
- Border-left: 2px solid, status color
- Rounded corners: 0 (sharp left edge only)
- Transition: border-color 0.2s, opacity 0.2s

**Color variants by status:**
- `owns` — left border green, bg green tint
- `overrides` — left border amber, bg amber tint
- `overridden` — left border purple, bg purple tint
- `shadowed` — left border red, bg red tint
- `neutral` (cursor outside class) — left border dim, bg gray tint
- `error` — left border gray, message in plain text (no red alert)

**Text styling:**
- **Status label:** 10px uppercase, 600 weight, letter-spacing 0.04em, color matches border
  - Examples: "SHADOWED", "OVERRIDES BASE", "UNIQUE", "OVERRIDDEN DOWNSTREAM"
- **Message:** 12px regular, 1.45 line-height, color `--fg-dim`
  - Inline code (class.method) rendered in `--mono` font
  - Examples:
    - Shadowed: "LightningTrainer.configure_optimizers is called instead. This definition never runs."
    - Overrides: "Replaces [BaseClass.method]. Your version runs."
    - Owns: "[method] is only defined here."
    - Overridden: "[N subclasses] redefine [method]. Won't run for instances of those subclasses."
    - Neutral: "Move cursor to a method for details."
- **Signal callers (optional):** Caller count + warning triangle if shadowed method has callers

**Interaction:**
- Click on class/method name in message → jumps to definition
- Hover over code snippet → hover card appears (see 1.11)
- No interaction on the bar itself (read-only)

**States:**
- With cursor in class (any status)
- With cursor outside class (neutral gray)
- Error state (error message in gray)
- Loading (while awaiting response)
- Stale (cursor left the same file, bar dims to 45% opacity to signal last analysis)

**Website showcase:**
- 4 separate screenshots, one per status color
- Show actual generated text for each scenario
- Or: animated transition between statuses as cursor moves

---

### 1.4 Timeline / MRO Chain
**What it is:**
Vertical stack of class cards showing the Method Resolution Order, with method pills inside each card.

**Where it appears:**
- Center of Resolution tab
- Below signal bar, above horizontal divider

**Visual description:**
- **Container structure:**
  - Label: "RESOLUTION ORDER" — 10px uppercase, faint color, letter-spacing 0.1em
  - Timeline: relative positioned container with vertical spine
  - Spine: 1px left border at x=6px, from top to bottom, color `--border`

- **Each class node (.tl-node):**
  - Padding: 8px vertical
  - Position: relative (for spine dot)
  - Dot (::before): 7×7px circle, 1.5px border, at x=-19px (spine position)
    - Border color: `--border`, outer ring `--bg`
    - Background: `--border` normally
    - Active (cursor class): background `--link`, box-shadow double ring
  - Header row (flex):
    - **Toggle icon (if methods):** 10px, "▼" (expanded) or "▶" (collapsed), color `--fg-faint`, hover darkens
    - **Class name (.tl-name):** monospace, 12px, 600 weight, **clickable link** (underline on hover)
      - Color: `--fg`, hover: `--link` with bottom border
      - Cursor: pointer
    - **Method summary (collapsed):** gray inline pills for first 3 methods, "+ N more" count
      - 10px monospace, color: status color for each pill
  - **File path (.tl-path):** 10px monospace, color `--fg-faint`, margin-top 1px, ellipsis
    - Shows last 2 path segments only (e.g., "trainer/base.py")
  - **Method list (.tl-methods, hidden by default):**
    - Flexbox, wrap, gap: 4px horizontal, 8px vertical
    - Hidden until toggle clicked
    - Each method: tiny pill (see 1.5)

- **Arrow between classes:**
  - "↓" centered, 10px, color `--fg-faint`, margin: 0

**Interaction:**
- **Toggle (▼/▶):** Click to expand/collapse methods for that class
  - State persists across cursor moves
  - Toggling re-renders the entire timeline
- **Class name link:** Click to jump to class definition
  - Posts `{ type: 'jumpToClass', file, line }` to extension
  - Editor opens file at that line
- **Method pill:** Click to show callers for that method in Callers tab
  - Callers count badge appears on method pill after async callers response

**States:**
- Collapsed (arrow = ▶, methods hidden, summary pills shown)
- Expanded (arrow = ▼, full methods list visible)
- Active (cursor class has special dot styling)
- Stale (entire timeline dims to 45% if cursor left the file but response is preserved)

**Website showcase:**
- Screenshot of expanded and collapsed states side-by-side
- Or: animated collapse/expand interaction on click
- Show the 4 status colors in different class nodes

---

### 1.5 Method Pills
**What it is:**
Tiny, clickable tags representing methods defined on a class, color-coded by status.

**Where it appears:**
- Inside expanded `.tl-methods` container (Timeline tab)
- Inside descendant class nodes (Descendants section)
- On method nodes in mindmap graph (Graph tab)
- On radial view method dots (Resolution tab, optional)

**Visual description:**
- **Base styling:**
  - Font: 10px monospace, regular weight
  - Padding: inline (no padding on pill)
  - Color: `--fg-dim`
  - Display: inline-flex, align-items center, gap 4px
  - Cursor: pointer
  - Border-bottom: 1px transparent, hover: border-bottom `--link`
  - Transition: color 0.15s, border-color 0.15s

- **Status dot (.method::before):**
  - 5×5px circle, border-radius 50%, flex-shrink 0
  - Color matches status:
    - owns: green
    - overrides: amber
    - overridden: purple
    - shadowed: red

- **Status glyph (.method::after) — color-blind indicator:**
  - Character placed after method name
  - owns: "●" (bullet)
  - overrides: "▲" (triangle)
  - overridden: "◆" (diamond)
  - shadowed: "✕" (cross)
  - Font-size: 8px

- **Caller badge (optional):**
  - `<span class="method-callers-btn">`
  - Shows count if > 0, else shows "←" arrow
  - Clickable independently, triggers callers fetch

- **Focus state (cursor method):**
  - Class: "focus"
  - Color: `--fg` (brighter)
  - Font-weight: 600

**Interaction:**
- **Hover:** Color lightens to `--link`, bottom border appears
- **Click:**
  - If data-file present: jump to method definition
  - If data-callers-method present: fetch callers for that method
- **Caller button click:** Switch to Callers tab + fetch

**States:**
- Normal (idle)
- Hover (brightened)
- Focus (cursor method, bold)
- With caller count (badge shows number)
- Without callers (badge shows arrow)

**Website showcase:**
- Horizontal strip of method pills in all 4 status colors
- Show the dot + glyph combo for accessibility
- Or: animated hover effect on pills

---

### 1.6 Welcome / Idle State
**What it is:**
Branded placeholder when no class is selected, encouraging the user to move cursor into a class.

**Where it appears:**
- Full panel when cursor is outside any class
- Also shown on initial load before first cursor move

**Visual description:**
- Layout: flexbox column, center, centered text, gap 8px
- Padding: 32px 16px
- Color: `--fg-faint`
- Font-size: 11px, line-height 1.6

**Content:**
- **Icon:** Diamond shape (◇), 20px, opacity 0.4
- **Title:** "PRISM" — small, secondary text
- **Subtitle:** "Program Resolution & Inheritance Structure Map"
- **Description:** "Open a source file and place your cursor inside a class to see its inheritance chain, method resolution order, and which version of each method actually runs."

**Interaction:**
- None (static placeholder)

**States:**
- Shown when cursor is outside any class
- Hidden when class is entered
- May reappear if cursor leaves the file

**Website showcase:**
- Static screenshot of welcome splash
- Or: full-page hero showing sidebar with welcome state

---

### 1.7 Error State
**What it is:**
Quiet, human-readable error message if analysis fails.

**Where it appears:**
- Resolution content area when backend returns error
- All async areas (descendants, super, call chain, callers) cleared

**Visual description:**
- Layout: signal bar style (see 1.3)
- Background: neutral gray tint
- Border-left: 2px dim gray
- Status label: "ERROR" in dim gray
- Message: 12px regular, plain text (never shows raw stack trace)
  - Examples: "Could not resolve base class XYZ", "Syntax error in file", "Maximum recursion depth exceeded"

**Interaction:**
- None (read-only)
- Check output channel for full error log

**States:**
- Shown when error response arrives
- Hidden when new analysis succeeds

**Website showcase:**
- Screenshot showing error message in signal bar
- Emphasize "human-readable" vs raw stack trace

---

### 1.8 Loading / In-Flight State
**What it is:**
Visual feedback that analysis is in progress, shown before first response or on refresh.

**Where it appears:**
- Full panel before first response
- Progress strip at top (see 1.2)

**Visual description:**
- **Loading div:**
  - Initially visible (display: block)
  - Pulses or shows spinner
  - Text: "Analyzing..." or similar
  - Fades out when response arrives

- **Content area:**
  - Initially display: none
  - Fades in with animation (`fadeUp` 0.15s ease-out)
  - Opacity 0→1, translateY 4px→0

**Interaction:**
- Auto-shows on cursor move
- Auto-hides on response
- Non-blocking

**States:**
- Loading (first response pending)
- Loaded (response received, content visible)

**Website showcase:**
- Animated GIF showing loading spinner → analysis appears

---

### 1.9 Tab Bar
**What it is:**
Horizontal button bar allowing user to switch between five major views.

**Where it appears:**
- Just below panel header
- Full width, sticky

**Visual description:**
- Layout: flexbox, horizontal
- Height: ~40px
- Background: `--bg`
- Border-bottom: 1px `--border`
- Each tab button:
  - Flex-grow: 0
  - Padding: 10px 12px
  - Font-size: 11px
  - Color: `--fg-dim` (inactive), `--fg` (active)
  - Border-bottom: 2px solid transparent (inactive), `--link` (active)
  - Cursor: pointer
  - Hover: color `--fg`, background highlight

**Tabs:**
1. **Resolution** — MRO chain + method statuses + optional radial view
   - Icon: horizontal lines (list)
2. **Scan** — workspace-wide overridden methods, unique code, MRO conflicts, name collisions
   - Icon: magnifying glass + crosshairs
3. **Search** — find classes and methods by name across workspace
   - Icon: magnifying glass
4. **Callers** — incoming call sites for the cursor method
   - Icon: arrow into circle
5. **Graph** — SVG mindmap of the inheritance hierarchy + text-mode tree
   - Icon: node graph (3 circles + 2 lines)

**Interaction:**
- Click tab → switch view
- Tab key cycles between tabs
- Active tab: bottom border highlighted in `--link` color

**States:**
- Active (blue bottom border, bright text)
- Inactive (dim border, dim text)
- Hover (highlight background)

**Website showcase:**
- Screenshot showing all 5 tabs
- Or: animated carousel switching between tabs

---

### 1.10 Tab Panes (Content Areas)
**What it is:**
Five independent content containers, one per tab, shown/hidden via `hidden` attribute.

**Where it appears:**
- Below tab bar
- Full panel width/height

**Pane structure:**
- `.tab-pane[data-pane="resolution"]` — Resolution content
- `.tab-pane[data-pane="scan"]` — Scan tab content
- `.tab-pane[data-pane="search"]` — Search tab content
- `.tab-pane[data-pane="callers"]` — Callers tab content
- `.tab-pane[data-pane="graph"]` — Graph tab content

**Shared placeholder:**
- Each pane (except initially active one) has a `.tab-placeholder` div
- Placeholder text describes the view's purpose
- Placeholder hidden when content is loaded

**Website showcase:**
- Five separate screenshots, one per tab
- Or: tabbed interface demo

---

### 1.11 Hover Card (GitLens-style)
**What it is:**
Floating popover showing detailed metadata when hovering over a class name or method pill.

**Where it appears:**
- Anywhere a class/method has `data-hover-class` or `data-hover-method` attribute
- Timeline (class names, method pills)
- Graph (class nodes, method pills)
- Scan results
- Search results
- Descendants section

**Visual description:**
- **Container:**
  - Fixed position (computed to stay in viewport)
  - z-index: 1000 (above all other content)
  - Background: VS Code hover widget background (`--vscode-editorHoverWidget-background`)
  - Color: VS Code hover widget foreground
  - Border: 1px VS Code hover widget border
  - Padding: 8px
  - Border-radius: 3px
  - Max-width: fits without overflow

- **Class card layout:**
  - Title: class name, monospace, 12px, bold
  - Meta: comma-separated (method count, source, file path), 10px, dim
  - Doc: class docstring (or "No docstring."), 10px, regular, up to ~300px width

- **Method card layout:**
  - Title: "ClassName.method_name", monospace, 12px, bold
  - Meta: status + effective class (if different), 10px, dim
  - Doc: method docstring, 10px, regular

**Interaction:**
- **Appear:** Mouse enters element with `data-hover-*` attribute
- **Stay visible:** While hovering card itself or the trigger element
- **Disappear:** Mouse leaves both (60ms delay to prevent flicker)
- **Click through:** Card does not block clicks to underlying elements

**States:**
- Visible (opacity 1)
- Hidden (opacity 0, `display: none`)
- Transitioning (fade, no animation property, instant on appearance)

**Website showcase:**
- Screenshot showing hover card appearing on method pill
- Show class card variant + method card variant

---

### 1.12 Footer
**What it is:**
Bottom bar with quick links to VS Code views.

**Where it appears:**
- Bottom of panel
- Sticky (scrolls into view at end of content)

**Visual description:**
- Layout: flexbox, 2 buttons
- Padding: 12px 16px
- Border-top: 1px `--border`
- Background: `--bg`

**Buttons:**
- **Problems** — link to Problems panel (icon + text)
  - ID: `footer-problems`
  - Fires `{ type: 'showProblems' }` to extension
  - Shows diagnostics for shadowed methods in workspace
- **Output** — link to PRISM output channel
  - ID: `footer-output`
  - Fires `{ type: 'showOutput' }` to extension
  - Shows timing logs + errors

**Interaction:**
- Click → posts message to extension → VS Code switches view

**Website showcase:**
- Screenshot of footer
- Or: GIF showing click → Problems panel opens

---

## 2. GRAPH VISUALIZATIONS

### 2.1 Mindmap (SVG Hierarchy Tree)
**What it is:**
Interactive force-directed-style graph showing the full inheritance chain (ancestors left, descendants right) with method pills beneath expanded classes. Lives in Graph tab.

**Where it appears:**
- Graph tab (full width/height)
- SVG viewBox adaptive to graph size

**Visual description:**

#### Layout:
- **Cursor class:** center hub (0, 0) with bold outline
- **Ancestors (MRO chain):** fanned left (negative x), decreasing MRO specificity left-to-right
- **Descendants:** fanned right (positive x), from immediate children top-to-bottom
- **Method pills:** grid below each expanded class node

#### Geometry:
- Class node: 150×30px, rounded corners, border 1px `--border`
- Column gap (x-axis): 70px
- Row gap (y-axis): 14px between siblings
- Method pill: 130×18px grid cells
- Method gap: 6px (both directions)
- Padding (viewBox margin): 30px

#### Colors & Styles:
- **Class node:**
  - Background: `--card`
  - Border: 1px `--border`
  - Cursor class: left strip 3px `--link`, bold outline
  - Hover: background lightens
- **Edges (connecting lines):**
  - Stroke: 1px `--border` (inactive, gray)
  - Stroke: 1px `--link` (active ancestor, brighter)
- **Class label:**
  - Monospace, 12px, 600 weight, centered
  - Color: `--fg`
  - Clickable (jump to definition)
- **Method pill (inside node):**
  - Status-colored dot + name
  - 10px monospace
  - Clickable (callers)

#### Animation:
- Viewport transform (translate + scale) animated via `requestAnimationFrame`
- Easing: cubic-bezier ease-in-out (3/8 over 300–1000ms depending on action)

**Interaction:**
1. **Pan:** Click-drag on empty space to move viewport (not on nodes/edges)
2. **Zoom:**
   - Mouse wheel: zoom at cursor location
   - Ctrl+wheel: precise zoom
   - Buttons: zoom in/out (increments 20%)
3. **Fit:** Button to auto-scale graph to fill viewport
4. **Focus:** Button to center on cursor class
5. **Reset:** Button to collapse all expanded classes + recenter
6. **Dynamic camera:** Toggle button
   - When ON: viewport animates to follow cursor class as it changes
   - When OFF: viewport stays put
7. **Freeze:** Toggle button
   - When ON: cursor moves no longer redraw the graph
   - Nag banner shows which class is frozen
   - Auto-unfreezes when cursor returns to that class
8. **Text mode:** Toggle button
   - Switch from SVG mindmap to ASCII text tree (see 2.2)
9. **Hide:** Button to collapse graph body (toolbar still visible for re-expand)
10. **Back/Forward:** History buttons for navigating between previously-clicked classes
11. **Click class node:** Zoom into that class (animates to fill ~40% of viewport)
12. **Click method pill:** Jump to method definition

**States:**
- **Normal:** Dynamic OFF, not frozen, SVG mode, viewport at fit
- **Exploring:** Pan/zoom, viewport changes are saved
- **Frozen:** Nag banner visible, graph body grayed
- **Text mode:** ASCII tree replaces SVG
- **Hidden:** Toolbar visible, body collapsed
- **Dynamic-follow:** Camera animates on cursor class change

**Website showcase:**
- **High impact:** Animated GIF showing full mindmap interaction — pan, zoom, click class to focus, dynamic follow
- Or: before/after screenshots (collapsed → expanded, zoomed out → focused)
- Show the 4 status colors on method pills
- Show freeze + auto-unfreeze behavior

---

### 2.2 Text Tree (ASCII Alternative to Mindmap)
**What it is:**
Fallback/alternative view to the SVG mindmap, using ASCII art (├──, │, └──) to show the inheritance hierarchy in text form.

**Where it appears:**
- Graph tab, when "Text" toggle is ON
- Replaces the SVG mindmap

**Visual description:**
- **Container:** `.mm-text-tree`
- **Section headers:**
  - "Ancestors (MRO)" — intro for the MRO chain
  - "Descendants" — intro for loaded descendants

- **Tree structure:**
  - Indentation: │  (vertical line + 2 spaces) for intermediate levels
  - Connectors: ├─ (T-junction) or └─ (L-corner)
  - Class names: monospace, clickable, hover underline
  - Method count: " (3 methods)" appended when collapsed
  - File path: 10px dim, below class name

- **Expanded methods:**
  - Indented further, one per line
  - Connector + method name + status label
  - Status label in status color (e.g., "Shadowed by base", "Overrides base")

**Color:**
- Node name: `--fg`
- Status label: status color
- Connector/indent: `--fg-faint`

**Interaction:**
- **Click toggle (▼/▶):** Expand/collapse a class to show its methods
- **Click class name:** Jump to definition
- **Click method name:** Jump to method definition
- State persists (mmTextExpanded Set)

**States:**
- Expanded class (▼, methods visible)
- Collapsed class (▶, method count shown)
- Active class (cursor class, visual emphasis)

**Website showcase:**
- Screenshot of text tree with mixed expanded/collapsed classes
- Or: side-by-side comparison (SVG mindmap vs text tree)

---

### 2.3 Radial Visualization (Optional Resolution Tab)
**What it is:**
Polar layout of the MRO chain with cursor class at center, ancestors on concentric rings, method dots distributed around each ring.

**Where it appears:**
- Resolution tab (only when "Radial" toggle is ON)
- Below timeline, replacing Timeline content if enabled

**Visual description:**

#### Layout:
- **Center (Ring 0):** Cursor class, large circle with fill + stroke
  - Label: "cursor class" subtitle
  - Click to zoom
- **Concentric rings (1..N):** One ring per ancestor in MRO order
  - Ring radius: 50px (inner) + 56px per ring
  - Dynamically sized based on ancestor count + max method density
  - Width/height: determined to fit all rings + 40px margin

#### Method dots:
- Circle, 5px radius, status-colored fill
- Distributed around ring at even angles
- Avoid top label area (25°–335° range for ancestors, full 360° for center)
- Hover: tooltip shows "ClassName.method (status)"
- Click: zoom to focus on that dot

#### Labels:
- **Ancestor ring labels:** Class name at top of ring (0° angle)
  - Clickable, jumps to definition
  - Highlighted if that class is the cursor class
- **Method dots (outer ring):** Labels shown if ring has ≤10 methods
  - Radially outward from dot
  - Text-anchor: end (left side) or start (right side) based on angle
  - Cursor method: always shown with caption "cursor method" below
- **Legend (bottom):** Color key for owns/overrides/overridden/shadowed
  - Also shows: "Click any class/dot to zoom · Ctrl+wheel to zoom · drag to pan"

**Interaction:**
1. **Pan:** Click-drag to move viewport
2. **Zoom:**
   - Buttons: −/+ (±20% increment), Fit (reset), Focus (center on cursor, scale 1.4x)
   - Mouse wheel: zoom at center
   - Ctrl+wheel: precise zoom
3. **Click class label or method dot:** Animate viewport to zoom into that element
4. **Dynamic-follow toggle:** When ON, camera animates to follow cursor class
5. **Limit check:** If >40 methods across MRO, show message directing to Graph tab

**States:**
- Normal (dynamic OFF, viewport at fit)
- Dynamic-follow (ON, viewport animates)
- Zoomed (focused on method/class)
- Density-limited (message shown, no SVG)

**Website showcase:**
- Animated GIF showing radial interaction — zoom, pan, click dot to focus
- Or: before/after screenshots (full radial → zoomed to method)
- Show concentric rings + method dots with status colors

---

## 3. EDITOR INTEGRATIONS

### 3.1 CodeLens (Inline Gutter Annotations)
**What it is:**
Per-method inline badges in the editor margin showing method status + quick navigation.

**Where it appears:**
- Editor gutter (code lens area), aligned to method definition line
- Only on methods with status != "owns"

**Visual description:**
- **Format:** "↓ overridden in X" or "↑ shadowed by Y"
- **Color:** Status color (amber for overridden, red for shadowed)
- **Font:** Small, sans-serif (VS Code's own font)
- **Behavior:** Clickable, opens quick-pick menu

**Interaction:**
- **Click:** Opens quick-pick with navigation options
  - "Go to base" / "Go to override" (jump to the related definition)
  - "Show callers" (switch to Callers tab in PRISM panel)
  - "Scan for descendants" (trigger workspace scan)

**States:**
- Visible (method is overridden or shadowed)
- Hidden (method is owns or overrides)
- Hover (highlighted)

**Website showcase:**
- Screenshot of editor with CodeLens annotations
- Show both "↓" and "↑" variants
- Or: GIF showing click → quick-pick menu

---

### 3.2 Hover Provider (Editor Hover on Method)
**What it is:**
Rich markdown hover tooltip when hovering over a method name in the editor.

**Where it appears:**
- Editor, on any method identifier
- Above/below the identifier depending on viewport space

**Visual description:**
- **Markdown card:**
  - Title: `ClassName.method_name` — code formatting
  - Status: "Shadowed" / "Overrides base" / "Unique" / etc. — status color
  - Effective class: (if different from defined_in) — gray label
  - Docstring: first ~200 chars of docstring (if any)
  - Links: "Open PRISM panel" / "Show callers"

**Interaction:**
- **Hover:** Tooltip appears, stays visible while hovering
- **Click link:** Posts message to switch tab or jump location

**States:**
- Visible (hovering method)
- Hidden (mouse leaves)

**Website showcase:**
- Screenshot of editor with hover card visible
- Show the markdown formatting

---

### 3.3 Inline Decorations (Text Color/Styling)
**What it is:**
Subtle in-editor styling applied to shadowed/overridden method definitions.

**Where it appears:**
- Editor, on the method definition line

**Visual description:**
- **Shadowed methods:** Dimmed (reduced opacity, e.g., 50%)
  - Signals: "this code doesn't run"
- **Overridden methods:** Amber underline (wavy or solid)
  - Signals: "a subclass redefines this"
- **Overrides methods:** (optional) green underline
  - Signals: "this method wins over base"

**Interaction:**
- None (read-only visual indicator)

**States:**
- Visible (method in scope)
- Hidden (method out of scope / different file)

**Website showcase:**
- Screenshot of editor showing dimmed shadowed methods + underlined overridden/overrides methods
- Use color-coding to make status clear

---

### 3.4 Diagnostics (Problems Panel)
**What it is:**
Workspace-wide diagnostic warnings for shadowed methods (dead code).

**Where it appears:**
- VS Code Problems panel
- One entry per shadowed method in workspace
- Accessible via footer link or Ctrl+Shift+M

**Visual description:**
- **Icon:** Red circle (error-level diagnostic)
- **Message:** "Shadowed by [EffectiveClass].[method] (line X) — this definition never runs."
- **File:** Shows source file path
- **Location:** Shows line number of shadowed method definition
- **Hover:** Full path + file preview (VS Code built-in)

**Interaction:**
- **Click:** Jumps to method definition in editor
- **Batch:** Diagnostic provider runs on file save/open

**States:**
- Listed (when shadowed methods exist)
- Empty (no shadowed methods)

**Website showcase:**
- Screenshot of Problems panel with diagnostic entries
- Or: GIF showing click → jump to definition

---

### 3.5 Status Bar Item
**What it is:**
Persistent status indicator in VS Code's status bar (bottom right).

**Where it appears:**
- VS Code status bar
- Always visible when PRISM panel is active

**Visual description:**
- **Icon:** `$(telescope)` (VS Code built-in telescope icon)
- **Text:**
  - `PRISM` (idle, cursor inside class)
  - `PRISM: outside class` (cursor outside any class)
  - `PRISM: error` (subprocess crashed)
  - Optionally: `PRISM: analyzing…` (while request in flight, optional)

**Color:** Status color bar beside text
- Green (owns/overrides/normal)
- Gray (neutral / outside class)
- Red (error state)

**Interaction:**
- **Click:** Opens/focuses PRISM panel

**States:**
- Normal (idle, cursor in class)
- Outside class (cursor not in class)
- Error (subprocess dead)
- Analyzing (optional, while in flight)

**Website showcase:**
- Screenshot of VS Code bottom bar with PRISM status item

---

## 4. WORKSPACE FEATURES

### 4.1 Scan Tab — Workspace Scanner
**What it is:**
Workspace-wide scans for overridden methods, unique code, MRO conflicts, and name collisions.

**Where it appears:**
- Scan tab (second tab)
- Full-width table with filtering + pagination

**Visual description:**

#### Header:
- **Title:** "Overridden methods" / "Workspace unique code" / "MRO conflicts" / "Name collisions" + result count
- **Search input:** Filter by class, method, filename
  - 12px font, `--surface` background, `--border` outline
  - Placeholder: "Filter by class, method, or filename…"
  - Instant filter as user types
- **Action buttons:**
  - "Scan overridden" (blue, or green if last run) — triggers `scan_mode: 'dead'`
  - "Scan unique code" (blue, or green if last run) — triggers `scan_mode: 'unique'`
  - "MRO conflicts" (blue, or green if last run) — triggers `scan_mode: 'conflicts'`
  - "Name collisions" (blue, or green if last run) — triggers `scan_mode: 'name_collisions'`
  - "Clear" (red, appears after results) — clears cache + dismissals
  - Active mode button highlighted in brighter color

#### Results list:
- **Row structure (.scan-ws-row):**
  - **Main line:**
    - **Source method:** `ClassName.method` monospace, clickable (jump)
    - **Arrow:** "→ runs" / "→ shadowed by" / "→ shadows external"
    - **Effective:** `EffectiveClass.method` monospace, clickable (jump)
    - **Dismiss button:** "×" (remove from list)
  - **Path line:** 10px dim, shows last 2 path segments
- **For name-collision rows:**
  - **Workspace class:** clickable
  - **Arrow:** "→ shadows external"
  - **Via class:** (if detected) gray label
- **Row colors:**
  - Default background: `--bg`
  - Hover: background highlight
  - Striped alternating (optional, light pattern)

#### Loading:
- "Scanning workspace…" message + pulsing button while in flight
- Buttons disabled during scan

#### Results states:
- No results run: "Click 'Scan' to begin…"
- Scanning: "Scanning workspace…"
- Results found: Table with pagination
- No results after scan: "No overridden methods found in workspace."
- Error: "Scan failed: [error message]"

#### Pagination:
- Shows first 25 results by default (configurable: `prism.ui.scanPageSize`, 5–200)
- "Load more (142 remaining)" button at bottom
- "Reset [N] dismissed" button if user dismissed items
- "Dismiss" button on each row

**Interaction:**
- **Filter input:** Type to filter (searches across class + method + filename + effective class)
- **Click scan button:** Fetch + render results
- **Click row:** Jump to source definition
- **Click effective cell:** Jump to effective definition
- **Click dismiss:** Remove row (persisted via wsDismissed Set)
- **Click "Load more":** Load next page (wsVisibleCount += 25)
- **Click "Clear":** Reset to initial state

**States:**
- Pre-scan (buttons visible, no results)
- Scanning (buttons disabled, message shown)
- Results (table with rows)
- Error (error message shown)
- Empty (scanned, but no results)
- Filtered (search input narrows table)

**Website showcase:**
- **High impact:** Animated GIF showing scan flow — click button → pulsing load → results appear with color-coded rows
- Or: before/after screenshots (no results → full table)
- Show filtering + pagination in action

---

### 4.2 Descendants Section (Under Timeline)
**What it is:**
Per-class list of subclasses that override the cursor method, shown beneath the main timeline on the Resolution tab.

**Where it appears:**
- Below timeline, when descendant data is loaded
- Async request triggered automatically on cursor move

**Visual description:**
- **Header:** "Descendants" — section label, uppercase, faint
- **Each descendant node (.desc-node):**
  - Similar structure to timeline nodes (toggle + class name + file path)
  - **Toggle:** Expand/collapse methods for that descendant
  - **Class name:** Monospace, clickable (jump)
  - **File path:** 10px dim
  - **Methods (when expanded):** Method pills in same format as timeline
  - Method status: computed from backend (not just "owns")

- **State filters (optional pills above list):**
  - "Owns", "Overrides", "Overridden", "Shadowed" — click to filter
  - Selected state highlighted in status color
  - Multi-select: shows only methods matching any selected status
  - Empty filter = show all

- **Search box:** "Filter by method name…"
  - Instant filter as user types

**Interaction:**
- **Toggle:** Expand/collapse methods
- **Filter pills:** Click to select/deselect status (multi-select)
- **Search box:** Type to filter method names
- **Click class name:** Jump to definition
- **Click method pill:** Jump or show callers

**States:**
- Loading (while awaiting descendants request)
- Loaded (descendants list visible)
- Expanded (methods shown for a descendant)
- Filtered (by status or search)

**Website showcase:**
- Screenshot showing descendants section with toggled/collapsed classes
- Show the status-filter pills in action

---

### 4.3 Search Tab
**What it is:**
Global search for classes and methods by name across the workspace.

**Where it appears:**
- Search tab (third tab)
- Full-width results list with instant filtering

**Visual description:**
- **Search input:** Class or method name
  - Placeholder: "Search for a class or method…"
  - 12px font, `--surface` background
  - Instant results as user types (backend sends search request)
- **Results:** List similar to scan results
  - **Row:** Class name (if class result) / Class.method (if method result)
  - **File path:** 10px dim
  - **Hover:** Highlight background
- **Status:** "Searching…" while request in flight, or count + pagination

**Interaction:**
- **Type in search:** Posts `{ type: 'requestSearch', query }` to backend
- **Click result:** Jump to definition
- **Pagination:** Load more results (same as scan)

**States:**
- Empty (no query)
- Searching (query in flight)
- Results (matches shown)
- No results (query returned 0 matches)

**Website showcase:**
- Screenshot of search results
- GIF showing type → results appear + instant filter

---

### 4.4 Callers Tab
**What it is:**
Incoming call sites for the cursor method, grouped by caller class.

**Where it appears:**
- Callers tab (fourth tab)
- Async request auto-fired on cursor move (or manually via caller button on method pill)

**Visual description:**
- **Header:** "Callers of <strong>[ClassName.]method</strong> (N calls)"
- **Groups (collapsible):**
  - **Group header:** Class name (or "Module-level" for module-level calls)
    - Toggle: "▼" (expanded) or "▶" (collapsed)
    - Count: "(3)" calls in this group
    - Click to expand/collapse
  - **Rows in group:**
    - **Call type tag:** "self" / "super" / "class" / "fn" — in monospace, dim
    - **Caller method:** Clickable link (jump to caller)
    - **Line ref:** ":42" — call site line number
    - Hover: background highlight
    - Click: jump to call site

- **States:**
  - No callers: "No callers found in workspace."
  - Error: "Could not analyze callers: [error]"
  - Results: Groups of callers

**Interaction:**
- **Click group header:** Expand/collapse that group
- **Click caller name:** Jump to that caller's definition
- **Auto-trigger:** When user clicks method pill's "←" badge (on method .method-callers-btn)

**States:**
- Empty (tab placeholder visible until cursor is on a method)
- Searching (loading indicator)
- Results (grouped callers)
- Error (error message)

**Website showcase:**
- Screenshot showing grouped callers
- GIF showing click caller → jump to editor

---

## 5. CALL GRAPH FEATURES

### 5.1 Super Calls Section (Graph Tab, Under Timeline)
**What it is:**
Detailed analysis of super() calls within the cursor method's body, with resolution to the actual MRO class that receives each call.

**Where it appears:**
- Graph tab, below timeline (in "Super" section)
- Only shown when cursor is on a method with super() calls

**Visual description:**
- **Header:** "super() in method_name"
- **Each call:**
  - **Line number:** "line 42"
  - **Call detail:** "super().method_called()"
  - **Resolution:** "→ ResolvedClass.method_called" — monospace, clickable
  - Hover: background highlight, color `--link`
  - Click: jump to resolved definition

**Interaction:**
- **Click resolution link:** Jump to the class in MRO that receives that super() call

**States:**
- Shown (method has super() calls)
- Empty (no super() calls)

**Website showcase:**
- Screenshot showing super() calls with resolutions
- Show the arrow + resolved class/method

---

### 5.2 Call Chain Section (Graph Tab)
**What it is:**
Outgoing calls made by the cursor method, recursively walked on the backend, shown as a tree with parent/child nesting.

**Where it appears:**
- Graph tab, below super() section
- Header: "Calls from ClassName.method"

**Visual description:**
- **Tree structure:**
  - Indented entries, one per call
  - **Indent:** Used for child call nesting
  - **Entry:** Call type tag (self/super/class/fn) + call name + line ref
  - **Resolved links:** Jump to definition if resolved

- **Call type tag colors:**
  - "self" — monospace, dim
  - "super" — monospace, dim
  - "class" — monospace, dim (shows the class name)
  - "fn" — monospace, dim (for unresolved functions)

- **Unresolved calls:** Name shown in gray, no link (external / dynamic call)

**Interaction:**
- **Click link:** Jump to resolved definition
- **Nested:** Child calls shown indented under parent

**States:**
- Shown (method has outgoing calls)
- Empty (no outgoing calls found)
- Unresolved (some calls can't be resolved)

**Website showcase:**
- Screenshot showing nested call chain
- GIF showing click → jump to call definition

---

### 5.3 Callers (Incoming) Section (Graph Tab / Callers Tab)
**What it is:**
Inverse of call chain — who calls the cursor method. See 4.4 (Callers Tab) for full description.

**Where it appears:**
- Callers tab (primary view)
- Also rendered in graph area if space permits

**Website showcase:**
- See 4.4

---

## 6. STATUS & FEEDBACK

### 6.1 Output Channel
**What it is:**
VS Code output channel showing per-request analysis timing + errors.

**Where it appears:**
- VS Code Output panel ("PRISM" channel)
- Accessible via footer link or View → Output

**Visual description:**
- **Per-request log:**
  - `[HH:MM:SS] analysis: 42ms` — success (green)
  - `[HH:MM:SS] SLOW: 5099ms` — warning (amber, if > 200ms threshold)
  - `[HH:MM:SS] [stderr] Error message` — error (red)
  - `[HH:MM:SS] Backend exited with code 1` — critical

**Interaction:**
- Click footer link → Opens output panel + switches to PRISM channel
- Logs accumulate over session

**States:**
- Empty (startup)
- Growing (requests logged)
- Warnings/errors (visible in log)

**Website showcase:**
- Screenshot of output channel
- GIF showing footer link click → output opens

---

### 6.2 Activity Bar Icon
**What it is:**
Icon in VS Code activity bar (left sidebar) to open/focus PRISM panel.

**Where it appears:**
- VS Code activity bar
- Always visible when a supported language file is open

**Visual description:**
- **Icon:** Custom PRISM logo (diamond shape, typically blue)
- **Badge:** Red dot with number (optional, shows diagnostic count)
- **Tooltip:** "PRISM" on hover

**Interaction:**
- **Click:** Opens PRISM sidebar or focuses if already open
- **Context menu:** May include quick actions (show panel, focus, etc.)

**States:**
- Idle (icon visible)
- Active (sidebar/panel open, icon highlighted)
- Badge (N diagnostics detected)

**Website showcase:**
- Screenshot of VS Code sidebar with PRISM icon
- Show the icon design

---

### 6.3 Keyboard Shortcuts
**What it is:**
Quick-key bindings for common actions.

**Where it appears:**
- VS Code command palette
- User's keybindings.json (customizable)

**Shortcuts (v0.4.0):**
- `Shift+Alt+P` — Open PRISM panel
- `Shift+Alt+M` — Focus PRISM sidebar
- `Shift+Alt+S` — Scan workspace for overridden methods

**Interaction:**
- Press shortcut → action fires immediately
- User can customize in keybindings.json

**Website showcase:**
- List of shortcuts in onboarding / walkthrough
- GIF showing keyboard shortcut in action

---

## 7. WELCOME & ONBOARDING

### 7.1 Quick Tour Walkthrough
**What it is:**
Interactive 6-step guided tour available on first install or via command palette.

**Where it appears:**
- VS Code Getting Started tab
- Accessible via "PRISM: Open Quick Tour" command

**Steps:**
1. **Welcome** — Intro to PRISM (with screenshot of MRO chain)
2. **Understand Method Statuses** — Explanation of 4 statuses (with status color demo)
3. **Scan for Overridden Methods** — How to use Scan tab (with screenshot)
4. **Visualize Inheritance** — How to use Graph tab (with screenshot)
5. **Need More Space?** — Opening floating panel (with tip about dragging tabs)
6. **Tips & Tricks** — Quick summary of features + keyboard shortcuts

**Visual description:**
- **Step card:**
  - Title: Step title (e.g., "Welcome to PRISM")
  - Description: 1–2 sentences + optional markdown (links, bold, code)
  - Media: Screenshot or markdown file (walkthrough-*.md)
  - CTA button: "Open PRISM Sidebar" / "Run Workspace Scan" / etc.

**Interaction:**
- **Next/Previous buttons:** Navigate between steps
- **CTA button:** Executes action + optionally advances step
- **Close:** Exits tour

**Website showcase:**
- Screenshot of walkthrough cards
- Or: GIF showing tour progression

---

## 8. ADVANCED / OPTIONAL FEATURES

### 8.1 Name Collision Detection
**What it is:**
Scanner that detects when a workspace class shadows an external class with the same name (e.g., workspace `Trainer` vs imported `pytorch_lightning.Trainer`).

**Where it appears:**
- Scan tab, "Name collisions" scan mode
- Signal bar (collision warning box, if active class has a collision)

**Visual description:**
- **Warning signal bar:**
  - Status: "⚠ Name collision" (amber background)
  - Message: "workspace_class shadows an external class with the same name (detected via ClassName importing an external class also named workspace_class)."
  - Multiple collisions shown stacked

**Interaction:**
- Click scan button "Name collisions" to find all
- Via class may be shown in parenthetical

**Website showcase:**
- Screenshot of collision warning in signal bar
- Table of name collision scan results

---

### 8.2 Dynamic Camera (Mindmap)
**What it is:**
Viewport auto-follows the cursor class on the mindmap as the user moves their cursor in the editor.

**Where it appears:**
- Mindmap toolbar, "Dynamic" button
- Toggles on/off, state persists

**Visual description:**
- **Button:** "Dynamic" in toolbar
  - Highlighted when ON
- **Behavior:** When ON, viewport animates to center on cursor class whenever it changes
- **Animation:** 400ms cubic-ease, smooth motion

**Interaction:**
- **Click button:** Toggle ON/OFF
- **Auto-animation:** When ON, viewport animates on every cursor class change

**States:**
- OFF (static viewport)
- ON (animated following)

**Website showcase:**
- GIF showing dynamic camera following cursor class changes (fast cursor movement)

---

### 8.3 Freeze / Auto-Unfreeze (Mindmap)
**What it is:**
Lock the mindmap viewport while exploring, auto-unlock when cursor returns to the original class.

**Where it appears:**
- Mindmap toolbar, "Freeze" button
- Nag banner when frozen

**Visual description:**
- **Button:** "Freeze" / "❄ Frozen"
  - Visual distinction when frozen (icy blue or similar)
- **Nag banner:** "❄ Frozen — cursor in ClassName. Return to OriginalClass to unfreeze."
  - Top of mindmap, dim background
  - Auto-updates as cursor moves

**Interaction:**
- **Click button:** Toggle freeze ON/OFF
- **Auto-unfreeze:** When frozen and cursor returns to original class, unfreezes automatically (no manual action needed)
- **Graph continues to update:** Even when frozen, if you manually navigate to other classes via clicks, the graph updates (respecting the frozen cursor class for unfreezing)

**States:**
- Unfrozen (normal operation)
- Frozen (graph locked, nag visible)
- Auto-unfrozen (user returns to original class)

**Website showcase:**
- GIF showing freeze button → graph locks → nag banner updates with cursor position → return to class → auto-unfreeze

---

## 9. CONFIGURATION & SETTINGS

### 9.1 User Settings (package.json)
**Where they appear:**
- VS Code Settings UI (Ctrl+,) → PRISM section
- User's settings.json

**Settings (v0.4.0):**
1. **prism.ui.defaultTab** — Which tab to show on panel open (resolution/scan/search/graph)
2. **prism.ui.showWelcomeOnStartup** — Show welcome state when no class selected (bool)
3. **prism.ui.scanPageSize** — Results per page in scans (5–200, default 25)
4. **prism.analysis.debounceMs** — Cursor move debounce (20–500ms, default 80)
5. **prism.analysis.maxDepth** — Max inheritance chain depth (1–50, default 10)
6. **prism.output.autoShow** — Auto-show output channel on file focus (bool)
7. **prism.output.showTimings** — Log per-request timings (bool)
8. **prism.telemetry.enabled** — Allow anonymous usage analytics (bool, respects VS Code's global setting)

**Website showcase:**
- Screenshot of Settings UI with PRISM settings
- Or: table describing each setting

---

## 10. VISUAL IMPACT & SHOWCASE STRATEGY

### High-Impact Features (For Website Hero)

1. **Mindmap with dynamic camera**
   - **Why:** Most visually striking, shows real-time inheritance exploration
   - **Format:** Animated GIF (5–8 sec loop)
   - **Demo:** Cursor moves in editor → mindmap updates + zooms + method pills expand
   - **Visual impact:** HIGH

2. **Status bar → signal bar transition**
   - **Why:** Demonstrates immediate feedback, status colors are memorable
   - **Format:** GIF (cursor move → signal bar changes color)
   - **Show all 4 colors** in sequence
   - **Visual impact:** HIGH

3. **MRO timeline with method pills**
   - **Why:** Core feature, color-coded method statuses are immediately clear
   - **Format:** Static screenshot or short GIF (toggle expand)
   - **Show expanded + collapsed** states
   - **Visual impact:** MEDIUM

4. **Scan tab results + filtering**
   - **Why:** Practical feature, shows real value (finding dead code)
   - **Format:** GIF (click scan → results appear → filter by class)
   - **Visual impact:** MEDIUM

5. **Radial visualization (bonus)**
   - **Why:** Beautiful, unique, differentiates from other tools
   - **Format:** Animated GIF (zoom + pan on radial)
   - **Visual impact:** MEDIUM

6. **Text tree alternative**
   - **Why:** Shows accessibility + alt-mode for power users
   - **Format:** Side-by-side screenshot (SVG mindmap vs text tree)
   - **Visual impact:** LOW–MEDIUM

### Suggested Website Sections

**Hero section (above the fold):**
- Title: "PRISM — See Your Inheritance Chain, in Real Time"
- Subheading: "Know which method actually runs. Find dead code. Explore inheritance hierarchies live as you code."
- **Animated background:** Looping GIF of mindmap + dynamic camera OR signal bar color changes

**Feature showcase grid:**
1. **"Live MRO Chain"** — Static screenshot of timeline + hover card
2. **"Find Dead Code"** — GIF of scan tab in action
3. **"Visualize Hierarchies"** — Animated mindmap with zoom/pan
4. **"Multi-language Support"** — Logo grid (Python, Java, TypeScript, etc.)
5. **"Quick Navigation"** — GIF of click class → jump + CodeLens
6. **"Workspace-Wide Scan"** — GIF of scan mode toggle + results

**Interactive demo section:**
- Embed live or simulated interactive demo (if possible)
- Or: carousel of GIFs showing each tab

**Walkthrough / onboarding section:**
- Link to "PRISM: Open Quick Tour" command
- 6 screenshot cards (one per walkthrough step)

---

## 11. SUMMARY BY CATEGORY

| Category | Feature Count | Key Elements |
|----------|---------------|--------------|
| **Core Panel UI** | 12 | Header, progress strip, signal bar, timeline, method pills, welcome, error, loading, tabs, panes, hover card, footer |
| **Graph Visualizations** | 3 | Mindmap (SVG), text tree, radial view |
| **Editor Integrations** | 5 | CodeLens, hover, inline decorations, diagnostics, status bar |
| **Workspace Features** | 4 | Scan tab, descendants section, search tab, callers tab |
| **Call Graph Features** | 3 | Super calls, call chain, callers |
| **Status & Feedback** | 3 | Output channel, activity bar icon, keyboard shortcuts |
| **Welcome & Onboarding** | 1 | Quick tour walkthrough (6 steps) |
| **Advanced Features** | 3 | Name collision detection, dynamic camera, freeze/unfreeze |
| **Configuration** | 1 | User settings (8 options) |
| **TOTAL** | **37 major features** | — |

---

## 12. FILE REFERENCES

**Key source files in codebase:**

### UI Templates & Styles
- `/src/panel/template.ts` — HTML structure (header, tabs, panes, footers)
- `/src/panel/styles.ts` — All CSS (color system, layout, animations)

### Rendering Modules
- `/src/panel/script/render-resolution.ts` — Signal bar + timeline + method pills
- `/src/panel/script/render-mindmap.ts` — SVG mindmap + toolbar
- `/src/panel/script/render-radial.ts` — Radial view
- `/src/panel/script/render-scan.ts` — Scan tab + descendants
- `/src/panel/script/render-call-graph.ts` — Super calls + call chain + callers
- `/src/panel/script/hover-card.ts` — Hover tooltips
- `/src/panel/script/render-search.ts` — Search tab

### State & Logic
- `/src/panel/script/state.ts` — Module-level state + tab logic
- `/src/panel/script/message-router.ts` — Backend response dispatch
- `/src/panel/script/utils.ts` — Shared helpers (path shortening, HTML escape, progress strip)

### Extension Layer
- `/src/extension/ipc.ts` — Backend subprocess lifecycle + stdout buffering
- `/src/extension/requests.ts` — Cursor event handler + async request orchestration

### Package Manifest
- `/package.json` — Commands, menus, keyboard shortcuts, settings, walkthroughs

---

## Checklist for Website Team

- [ ] Collect all color hex values (green, amber, purple, red + theme-aware)
- [ ] Extract PRISM icon + variant
- [ ] Record 5–8 short GIFs (mindmap, scan, timeline, signal bar, etc.)
- [ ] Capture 10–15 static screenshots (all states, all tabs)
- [ ] Document exact CSS measurements (padding, gaps, font sizes)
- [ ] Review walkthrough step content + markdown links
- [ ] Design mockups for each major feature (hero image, feature grid, interactive sections)
- [ ] Plan interactive demo or embedded PRISM instance
- [ ] Coordinate with video team for any motion graphics
- [ ] QA: Verify all links, GIFs, and screenshots match current v0.4.0 code

---

*End of Feature Catalog — v0.4.0*

Last updated: April 13, 2026
