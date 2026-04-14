# PRISM Website Copy & Content Strategy

**Purpose:** Complete, ready-to-ship copy for every section of the PRISM website. All variants, all messaging tiers, all CTAs.

**Context:** PRISM is being repositioned as a **developer tool suite** with expanding reach:
- **Current:** VS Code extension (Python + 9 other languages)
- **Coming:** CLI, CI/GitHub Actions, MCP server
- **Free forever** for multi-language support
- **Premium tier** at 5K users (workflow features: PR diff integration, AI agents, CI hooks)

---

## 1. Navigation

### Logo Text
- **Short:** `PRISM`
- **Full tagline for hover/alt text:** `PRISM — Know exactly which code runs`

### Navigation Links

| Link | Target | Label |
|------|--------|-------|
| VS Code Marketplace | `https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode` | VS Code |
| Open VSX (Cursor) | `https://open-vsx.org/extension/TemilolaOlowolayemo/prism-vscode` | Cursor |
| GitHub | `https://github.com/Temilola23/prism` | GitHub |
| Docs / Wiki | `/docs` | Docs |
| Changelog | `/changelog.html` | What's New |

**Note:** Current site only links to VS Code + Cursor. Future expansion to Docs, GitHub, What's New.

---

## 2. Hero Section

### Hero Headline — Three Variants

**Variant 1 (Bold, Direct)**
```
Know exactly which version of a method actually runs.
```
- **Why it works:** Immediate clarity. Solves the core pain point in one sentence.
- **Audience:** Developers who've been burned by shadowed methods.
- **Tone:** Confident, matter-of-fact.

**Variant 2 (Clever, Relatable)**
```
Stop shipping code that never runs.
```
- **Why it works:** Punchy. Hits the emotional nerve. Everyone has done this.
- **Audience:** Mid-career developers, teams with large codebases.
- **Tone:** Slightly irreverent, sympathetic.

**Variant 3 (Straightforward, Benefit-Focused)**
```
Live MRO visualization for VS Code.
```
- **Why it works:** Technical clarity. Exact feature description.
- **Audience:** Developers searching for "inheritance visualization" or "MRO tool".
- **Tone:** Neutral, informative.

**Recommended primary:** Variant 1 (currently used in index.html)

---

### Hero Subheadline
```
Live inheritance chain and MRO visualization for VS Code.
10 languages. Sub-200ms. Free.
```

**Alternative (slightly shorter):**
```
Live inheritance visualization. 10 languages. 200ms refresh. Free.
```

### Hero Supporting Text (2 sentences max)
```
Move your cursor into any class and PRISM instantly shows the full Method Resolution Order —
a vertical stack of class cards with color-coded method status pills. Every cursor move,
within 200ms, zero setup required.
```

**Alternative (more narrative):**
```
You edit a method in a class. You add logging. You ship it. Nothing happens —
because a parent class's version is what actually runs. PRISM catches this the moment
your cursor lands on the method.
```

### Primary CTA Button
- **Text:** `Install for VS Code`
- **Icon:** VS Code logo / Code icon
- **Action:** Links to VS Code Marketplace
- **Style:** Primary button (indigo background)

### Secondary CTA Button
- **Text:** `Install for Cursor`
- **Icon:** Cursor logo / Sparkle icon
- **Action:** Links to Open VSX registry
- **Style:** Secondary button (bordered, transparent)

**Alternative secondary:** `View on GitHub` (links to repo)

---

## 3. Problem Statement Section

### Section Headline
```
The Inheritance Trap
```

**Alternative:**
```
The Shadowed Method Problem
```

### Setup Text (The Pain)
```
You edit a method. Add logging. Ship it.
Nothing happens — because a base class version is what actually runs.
PRISM catches this the moment your cursor lands.
```

### Code Example (Current)
```python
class DeepSpeedEstimator(LightningTrainer):
    def setup_dataloader(self):                    # SHADOWED
        return "deepspeed dataloader"

class DLEstimatorBase:
    def setup_dataloader(self):                    # THIS RUNS
        return "base dataloader"
```

**Visual annotations:**
- `SHADOWED` tag in red on DeepSpeedEstimator line
- `THIS RUNS` tag in green on DLEstimatorBase line
- DeepSpeedEstimator method text struck-through, dimmed

### Punchline / Closing Text
```
PRISM knows the answer instantly.
Move your cursor into the method — see its status within 200ms.
```

---

## 4. Four States Section

### Section Label
```
METHOD STATUS
```

### Section Headline
```
Four states. Zero guesswork.
```

**Alternative:**
```
Every method has a status.
```

### State Definitions

#### Owns
- **Name:** `Owns`
- **Color:** Green (#10B981)
- **1-line desc:** Defined here. No base defines it. It runs.
- **2-sentence explanation:**
  - This class defines the method and no parent class does.
  - This is the code that executes for all instances of this class.

#### Overrides
- **Name:** `Overrides`
- **Color:** Amber (#F59E0B)
- **1-line desc:** Your version wins over the base class. This runs.
- **2-sentence explanation:**
  - This class redefines a method that also exists in a parent class.
  - Your version comes first in the MRO, so it's the one that executes.

#### Overridden
- **Name:** `Overridden`
- **Color:** Purple (#A855F7)
- **1-line desc:** Runs here, but a subclass redefines it. Dead code for those instances.
- **2-sentence explanation:**
  - This class defines the method and it executes for instances of this class.
  - But a child class further down has redefined it, so this version never runs for those instances.

#### Shadowed
- **Name:** `Shadowed`
- **Color:** Red (#EF4444)
- **1-line desc:** A parent's version runs instead. This never executes.
- **2-sentence explanation:**
  - This class defines the method, but a parent class earlier in the MRO also defines it.
  - The parent's version always runs instead — this code is dead.

---

## 5. Suite Overview Section (THE KEY SECTION)

### Section Label
```
DEVELOPER TOOL SUITE
```

**Alternative:**
```
ONE MISSION, MANY TOOLS
```

### Section Headline
```
From cursor to commit to CI. One tool suite.
```

**Alternative:**
```
Live analysis, everywhere you code.
```

**Alternative (more product-focused):**
```
PRISM across your entire workflow.
```

---

### Product: VS Code Extension

- **Status:** Available Now
- **Icon concept:** VS Code logo or Editor window with highlight
- **Name:** `PRISM for VS Code`
- **Tagline:** `Live MRO in your editor`
- **Description:**
  ```
  Move your cursor into any class and watch the MRO panel update in real time.
  Color-coded method pills, clickable class navigation, CodeLens annotations,
  interactive graph visualization. All 10 languages supported. Sub-200ms refresh.
  ```

- **Key features to highlight in copy:**
  - Live cursor-to-panel (< 200ms)
  - MRO chain with class cards
  - Color-coded method status (owns, overrides, overridden, shadowed)
  - CodeLens inline annotations
  - Interactive mindmap + radial graph
  - Workspace scanning
  - 10 languages: Python, TypeScript, JavaScript, Java, Kotlin, C++, Go, C#, Ruby, Scala

---

### Product: CLI Tool

- **Status:** Coming Soon
- **Icon concept:** Terminal icon / Command-line prompt
- **Name:** `PRISM CLI`
- **Tagline:** `Inheritance analysis in your terminal`
- **Description:**
  ```
  Run PRISM from the command line to analyze inheritance hierarchies across your codebase.
  Output MRO chains, detect dead code, report overridden methods, and integrate into scripts.
  Same analysis engine. Same speed.
  ```

- **Proposed commands (for positioning):**
  - `prism analyze <file> <class>` — Show MRO for a class
  - `prism scan` — Scan workspace for inheritance issues
  - `prism report` — Generate dead-code report
  - `prism resolve <class>` — Show which method actually runs

---

### Product: CI / GitHub Action

- **Status:** Coming Soon
- **Icon concept:** GitHub Actions workflow icon / CI/CD pipeline
- **Name:** `PRISM CI`
- **Tagline:** `Catch inheritance bugs before they ship`
- **Description:**
  ```
  Add PRISM to your GitHub Actions workflow. Scan pull requests for new shadowed methods,
  flag dead code before merge, enforce inheritance patterns. Deterministic rules engine.
  No false positives.
  ```

- **Example use cases (for copy):**
  - Detect new shadowed methods in pull requests
  - Warn when a method override changes behavior
  - Enforce "no dead code" policy
  - Report on inheritance complexity
  - Integration with PR status checks

---

### Product: MCP Server

- **Status:** Coming Soon
- **Icon concept:** Server/network icon / Claude logo
- **Name:** `PRISM MCP`
- **Tagline:** `AI-native inheritance analysis`
- **Description:**
  ```
  PRISM as an MCP server. Let Claude (or any LLM) ask about method resolution,
  inheritance chains, and dead code. Powers AI-assisted development: Claude can
  catch inheritance bugs while you code, suggest safer method names, warn about
  shadowed behavior.
  ```

- **Positioning angle:**
  - AI agents asking "which method actually runs?"
  - Claude-powered code review
  - Deterministic analysis + AI creativity

---

## 6. Feature Deep Dives

### Feature: Live MRO Panel

- **Feature name:** `Live MRO Panel`
- **Tagline:** `Always up to date as you code`
- **Description:**
  ```
  Move your cursor into any class and the MRO panel updates within 200ms.
  Vertical stack of class cards shows the full method resolution order.
  Color-coded method pills let you see at a glance which version of each
  method actually runs. No manual refresh. No configuration.
  ```
- **Visual:** Screenshot of panel showing DeepSpeedEstimator → LightningTrainer → DLEstimatorBase

### Feature: Interactive Graph Visualization

- **Feature name:** `Interactive Graph`
- **Tagline:** `Navigate complex inheritance visually`
- **Description:**
  ```
  SVG mindmap shows your entire class hierarchy. Pan, zoom, fit-to-view, and focus
  on the cursor class. Radial MRO view arranges classes in a circle with method
  dots. Instantly understand deep inheritance chains — no manual tree digging.
  ```
- **Visual:** Screenshots of graph tab and radial view

### Feature: CodeLens Annotations

- **Feature name:** `CodeLens Annotations`
- **Tagline:** `Status right in your editor margin`
- **Description:**
  ```
  Inline badges appear directly in your code: "overridden downstream" warns that
  a child class replaces this method. "shadowed by base" flags methods that never
  run. Click any badge for a quick-jump menu to the relevant class.
  ```
- **Visual:** Screenshot of editor showing CodeLens badges

### Feature: Hover Cards

- **Feature name:** `Rich Hover Cards`
- **Tagline:** `Details on demand`
- **Description:**
  ```
  Hover over any class or method name and see a rich detail popup. Shows status,
  where it's defined, what overrides or shadows it, and file/line. GitLens-style
  experience without leaving your editor.
  ```
- **Visual:** Screenshot of hover card popup

### Feature: Workspace Scanning

- **Feature name:** `Workspace Scanning`
- **Tagline:** `Project-wide inheritance analysis`
- **Description:**
  ```
  Run a full workspace scan to analyze inheritance across your entire codebase.
  PRISM indexes every class, computes every MRO, and reports overridden methods,
  unique code, MRO conflicts, and dead-code warnings. Complete picture in seconds.
  ```
- **Visual:** Screenshot of scan tab with results

### Feature: Performance

- **Feature name:** `Sub-200ms Refresh`
- **Tagline:** `Instant feedback, every keystroke`
- **Description:**
  ```
  AST caching per file. Persistent backend subprocess. Incremental re-indexing.
  PRISM updates in under 200ms from cursor move to visible panel change.
  No cold starts. No lag.
  ```
- **Visual:** Performance chart or benchmark results

---

## 7. Language Support Section

### Section Headline
```
10 languages. One experience.
```

**Alternative:**
```
Multi-language inheritance analysis.
```

### Supporting Text
```
PRISM works across Python, TypeScript, JavaScript, Java, Kotlin, C++, Go, C#, Ruby, and Scala.
Same features. Same speed. All free.
```

**Alternative:**
```
Python. TypeScript. Java. C++. Go. Kotlin. Ruby. C#. Scala. JavaScript.
Same MRO analysis. Same speed. No language wars.
```

### Language List (with icons)
- Python 🐍
- TypeScript 📘
- JavaScript 📙
- Java ☕
- Kotlin 🎨
- C++ ⚙️
- Go 🔵
- C# 💜
- Ruby 💎
- Scala 🌊

---

## 8. Performance Section

### Section Headline
```
Designed for speed.
```

**Alternative:**
```
Performance is non-negotiable.
```

### Key Metrics to Highlight

| Metric | Value | Why It Matters |
|--------|-------|----------------|
| Cursor-to-panel | < 200ms | Feels instant. No lag. |
| AST caching | Per-file + mtime | Never reparses unchanged files. |
| Persistent backend | Long-lived subprocess | Zero cold starts. Warm on every request. |
| Workspace indexing | On activation | Class resolution instant from first cursor move. |
| Incremental re-indexing | File-level | Save a file; only that file re-indexes. |
| Stress tested | 136K+ classes | Opened 11 production repos in one workspace. No errors. |

### Credible Speed Claim

**Copy:**
```
Every cursor move is analyzed in under 200ms. We cache ASTs per file by modification time,
run a persistent Python subprocess to avoid cold starts, and index your entire workspace
on activation. You get instant feedback without any configuration.

Tested on 136,000+ classes across 7 languages in a single workspace.
```

**Why this is credible:**
- Specific number (200ms, not "fast")
- Explains *why* it's fast (caching, persistent subprocess, indexing)
- Real-world stress test (136K classes)
- No hand-waving

---

## 9. Roadmap Teaser Section

### Section Headline
```
What's next.
```

**Alternative:**
```
Coming soon.
```

### Roadmap Copy (Without Over-Promising)

```
We're expanding PRISM from a VS Code extension into a complete developer tool suite.

CLI: Analyze inheritance from your terminal. Integrate into scripts and CI workflows.

CI / GitHub Actions: Catch new shadowed methods in pull requests before they ship.
Deterministic rule checking. No false positives.

MCP Server: PRISM for Claude. Let AI agents ask about method resolution, catch inheritance
bugs during coding, suggest safer names, warn about shadowed behavior.

All the same analysis engine. All the same speed.
```

### What NOT to Promise Yet

- ❌ Exact dates (say "coming soon", not "Q3")
- ❌ Specific feature sets (say "PR diff integration" not "PR diff with side-by-side comparison")
- ❌ Premium pricing specifics (say "premium tier coming" not "$19/month at 5K users")
- ❌ Language expansions (Python + 9 is enough for now)

---

## 10. Install CTA Section

### Section Headline
```
Available now on both marketplaces.
```

**Alternative:**
```
Get started in 30 seconds.
```

### Install Buttons (Copy for Each)

| Platform | Button Text | Destination | Icon |
|----------|------------|-------------|------|
| VS Code Marketplace | `Install for VS Code` | `https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode` | VS Code logo |
| Open VSX (Cursor) | `Install for Cursor` | `https://open-vsx.org/extension/TemilolaOlowolayemo/prism-vscode` | Cursor logo |
| GitHub | `View Source` | `https://github.com/Temilola23/prism` | GitHub logo |

### Supporting Text
```
Free. Open source. No configuration needed.

Python 3.10+ required. All other languages included.

Having issues? Check the troubleshooting guide or email hello@prism-tools.dev.
```

**Alternative (shorter):**
```
Free forever. Requires Python 3.10+. Works with VS Code 1.85+.
```

---

## 11. Footer

### Footer Links Structure

**Column 1: Product**
- Features
- Languages
- Performance
- Roadmap

**Column 2: Resources**
- Changelog
- GitHub
- Report a Bug
- Request a Feature

**Column 3: Company**
- About
- Blog (future)
- Contact: hello@prism-tools.dev
- Support: support@prism-tools.dev

**Social Links**
- GitHub: `https://github.com/Temilola23/prism`
- Twitter/X: `@prism_dev` (future)
- Email: `hello@prism-tools.dev`

### Legal Text
```
© 2026 PRISM. All rights reserved.

PRISM is a proprietary tool. The VS Code extension is free and open-source.
Commercial use and redistribution prohibited without explicit permission.
```

### Footer CTA
```
Enjoying PRISM? Leave a review on the VS Code Marketplace or Open VSX.
It helps other developers discover PRISM and keeps development going.
```

---

## 12. Meta / SEO Copy

### Page Title
```
PRISM — Know exactly which version of a method actually runs
```

### Meta Description (160 characters max)
```
Live MRO visualization for VS Code. See which method actually runs in real time.
10 languages, sub-200ms refresh, free forever.
```

### OG Title (optimal ~50-60 characters)
```
PRISM — Know which method actually runs
```

### OG Description (optimal ~150 characters)
```
Live MRO visualization for VS Code. Inheritance analysis for Python, TypeScript,
Java, C++, and 6 more languages. Free forever.
```

### OG Image
- **Recommended:** Hero screenshot showing MRO panel with colored method pills
- **Size:** 1200x630px (standard OG image size)
- **Format:** PNG or JPG
- **File:** `/assets/og-image.png`

### Favicon / App Icon
- **Current:** SVG prism triangle
- **Alt suggested:** Gradient-filled triangle with PRISM initials

### Theme Color (for browser address bar)
```
#5B6AF0  (indigo)
```

---

## 13. Email / Newsletter Copy (Future)

### Welcome Email (When Installed)
```
Subject: Welcome to PRISM!

---

Hi,

You've just installed PRISM. Here's what you need to know:

1. Move your cursor into any class. The panel shows up automatically.
2. Color-coded pills tell you the status of each method:
   - Green: "owns" (only this class defines it)
   - Amber: "overrides" (you win over a parent)
   - Purple: "overridden" (a child redefines it)
   - Red: "shadowed" (a parent's version runs instead)
3. Click any class name to jump to its definition.

Need help? Run the guided tour: Cmd+Shift+P, then "PRISM: Open Quick Tour".

Enjoying it? Leave a review on the marketplace — it helps us grow.

Questions? Reply to this email or email support@prism-tools.dev.

Happy analyzing,
The PRISM Team
```

### Feature Announcement Email
```
Subject: [PRISM] New: Interactive Graph Visualization

---

PRISM just got a visual overhaul.

Three new tabs in the floating panel:

1. **Resolution** — The MRO chain (what you already know and love)
2. **Scan** — Project-wide inheritance analysis (new!)
3. **Graph** — Interactive SVG mindmap of your class hierarchy (new!)

The graph view lets you:
- Pan and zoom to explore complex hierarchies
- Focus on the cursor class
- See method dots on each class
- Click to jump to definitions

Update PRISM now from the marketplace.

What would you like to see next? Reply or email hello@prism-tools.dev.

Happy analyzing,
The PRISM Team
```

---

## 14. Error Message Copy (In-App)

### When Cursor Is Outside a Class
```
Move cursor inside a class to see its MRO.
```

### When File Has Syntax Error
```
Could not analyze this file — syntax error. Check the Problems panel for details.
```

### When Analysis Exceeds 200ms (Output Channel Warning)
```
SLOW: 5,234ms (expected < 200ms)

This file's workspace is large or the MRO chain is deep.
Consider reducing the max depth in settings (prism.analysis.maxDepth).
```

### When Backend Is Not Running
```
PRISM: error

The backend subprocess crashed. Try reloading the window
(Cmd+Shift+P → "Reload Window").
```

---

## 15. Positioning Statements

### For Developers (Primary Audience)
```
PRISM is the fastest way to understand inheritance in your codebase.
One cursor move. One second. Full picture. No more shadowed methods.
```

### For Teams (Secondary Audience)
```
PRISM gives your team a shared language around inheritance.
Every developer sees the same MRO. Same understanding. Same confidence.
```

### For Open-Source Contributors
```
Ramping up on a new framework? PRISM cuts onboarding time in half.
Understand any class hierarchy in seconds, not hours.
```

### For Enterprise
```
PRISM reduces inheritance-related bugs. Fewer regressions. Faster code reviews.
Confident refactoring.
```

### Competitive Positioning
```
No other tool combines live cursor tracking, 10-language support, and sub-200ms speed.
PRISM is the only real-time MRO visualization tool for VS Code.
```

---

## 16. Call-to-Action Hierarchy

### Tier 1: Top of Page (Hero)
- **Primary:** Install for VS Code
- **Secondary:** Install for Cursor

### Tier 2: Problem Section
- **Implied CTA:** "PRISM solves this instantly"
- **Explicit CTA:** None (let the problem resonate)

### Tier 3: Features Section
- **Implied CTA:** "These are what you get"
- **Explicit CTA:** None (features speak for themselves)

### Tier 4: Install CTA Section
- **Primary:** Install for VS Code (button)
- **Secondary:** Install for Cursor (button)
- **Tertiary:** View on GitHub (link)

### Tier 5: Footer
- **Primary:** Email: hello@prism-tools.dev
- **Secondary:** Social links (GitHub, Twitter future)
- **Tertiary:** Marketplace links (for repeat visitors)

---

## 17. Tone & Voice Guide

### Core Principles
1. **Honest:** No buzzwords. No "AI-powered" nonsense.
2. **Direct:** Say it in 6 words, not 60.
3. **Technical:** Developers trust specificity. Use real numbers and terms.
4. **Confident:** This tool solves a real problem. Own it.
5. **Human:** Real pain point. Real solution. Real speed.

### Examples

**Good (Honest, Direct, Technical):**
```
Sub-200ms MRO analysis via AST caching and persistent Python subprocess.
```

**Bad (Buzzword-laden):**
```
AI-powered real-time inheritance intelligence engine.
```

**Good (Specific):**
```
Move cursor. Wait 200ms. See which method runs.
```

**Bad (Vague):**
```
Instant inheritance visualization.
```

---

## 18. Language-Specific Positioning

### For Python Developers
```
Python's MRO is powerful and complex. PRISM makes it visible.
Instant answers to: Which version of this method runs? Is this code dead?
```

### For Java Developers
```
Java interface and inheritance hierarchies can be deep. PRISM visualizes them.
From AbstractClass to concrete implementation in one click.
```

### For TypeScript / JavaScript Teams
```
TypeScript inheritance can surprise. PRISM shows exactly what's inherited,
overridden, or shadowed. Understand mixins and base classes instantly.
```

### For C++ Developers
```
Virtual methods, multiple inheritance, complex MRO. PRISM computes it instantly.
See which override actually runs.
```

### For Go Developers
```
Go doesn't have classes, but struct embedding can be just as complex.
PRISM shows you what's embedded, overridden, and shadowed.
```

---

## 19. Pricing Page Copy (Future)

### Heading
```
Free for everyone. Premium for teams.
```

### Tier: Free

- **Name:** `PRISM Free`
- **Price:** `Free forever`
- **Description:** Everything you need to understand inheritance in your codebase.
- **Features:**
  - Live MRO panel in VS Code
  - CodeLens annotations
  - Hover cards
  - Workspace scanning
  - Interactive graph visualization
  - 10 languages
  - Sub-200ms refresh
  - All updates forever

### Tier: Premium (Unlocked at 5K Users)

- **Name:** `PRISM Pro`
- **Price:** `$19/month` (or `$180/year`)
- **Description:** For teams who want to catch inheritance bugs before shipping.
- **Additional Features:**
  - PR diff mode (see inheritance changes in pull requests)
  - GitHub Action CI integration
  - Deterministic dead-code rules
  - MCP server (Claude integration)
  - Team usage analytics
  - Priority support

---

## 20. Quick Reference: Copy by Audience

### Persona: Junior Developer (First Time)
- **Pain:** I don't understand this codebase's class hierarchy.
- **Message:** PRISM cuts ramp-up time in half. See any inheritance chain in seconds.
- **CTA:** Install now. Open Quick Tour.

### Persona: Mid-Career Developer (Been Burned)
- **Pain:** I've shipped code that never ran because it was shadowed.
- **Message:** PRISM catches that instantly. Move cursor. See status. Know for sure.
- **CTA:** Install for your language. Stop guessing.

### Persona: Tech Lead / Architect
- **Pain:** My team doesn't share a common understanding of our inheritance patterns.
- **Message:** PRISM gives your team a shared language. Same tool. Same view. Same confidence.
- **CTA:** Install on team machines. Set PRISM as the standard.

### Persona: Open-Source Maintainer
- **Pain:** Onboarding contributors is slow. They don't understand the hierarchy.
- **Message:** PRISM makes your codebase self-documenting. New contributors understand faster.
- **CTA:** Recommend in your CONTRIBUTING.md.

### Persona: Enterprise / DevOps
- **Pain:** We need to reduce inheritance-related bugs and ensure code quality.
- **Message:** PRISM as a CI check. Catch new shadowed methods before merge. Deterministic rules.
- **CTA:** Coming soon: CI/GitHub Actions integration.

---

## 21. Messaging for Each Release

### v0.1.0 (Shipped April 6, 2026)
```
PRISM launched: Live MRO panel for Python. Sub-200ms updates. Free.
```

### v0.2.0 (Multi-Language Support)
```
PRISM now supports 10 languages: Python, TypeScript, Java, C++, Go, C#, Kotlin, Ruby, Scala, JavaScript.
Same speed. Same experience. All free.
```

### v0.3.0 (UI Overhaul + Graph Tab)
```
New: Interactive graph visualization, workspace scanning, search tab, welcome state.
PRISM just got visual.
```

### v0.4.0 (Product Analytics + Roadmap Clarity)
```
PRISM now ships with privacy-respecting product analytics (opt-in).
Roadmap: CLI, GitHub Actions, MCP server. Coming soon.
```

---

## 22. Emergency / Crisis Copy

### If Service Outages or Bugs Arise
```
PRISM has an issue. We're working on it.

[Current Status]: Analyzing MRO chains is taking longer than usual.
[Workaround]: Try reloading the window (Cmd+Shift+P → "Reload Window").
[ETA]: Update in progress. Will ship within 24 hours.

Questions? Email support@prism-tools.dev.
```

### If Privacy Incident
```
We take privacy seriously. Here's what happened, what we're doing about it, and what you should do.

[What]: [Description of incident]
[When]: [Timeline]
[Our response]: [What we're doing]
[Your action]: [What users should do]
[Going forward]: [How we prevent this]

Questions? Email hello@prism-tools.dev.
```

---

## 23. Social Media Copy (Future)

### Twitter/X Post Templates

**Template 1: Feature Highlight**
```
Just pushed a new feature to PRISM: [Feature Name]

[1-sentence benefit]

[Link to marketplace or video]

#Python #TypeScript #VSCode
```

**Template 2: Pain Point**
```
You ship code. Nothing happens.

Because a parent class's version is what actually runs.

PRISM catches this the moment your cursor lands.

Free. All languages. No setup.

[Link]
```

**Template 3: User Win**
```
"PRISM saved me hours of debugging. I immediately understood why my method wasn't being called."

— [User name/company]

Get PRISM free: [Link]

#Development #Debugging #VSCode
```

---

## 24. Accessibility Copy Notes

### Alt Text for Images
- **Hero visual (prism):** "Animated prism refracting white light into 5 colored beams"
- **MRO panel screenshot:** "PRISM MRO panel showing inheritance chain: DeepSpeedEstimator → LightningTrainer → DLEstimatorBase, with color-coded method status pills"
- **Graph visualization:** "Interactive SVG mindmap of a class hierarchy with pan, zoom, and focus controls"

### Color-Blind Accessible Copy
- Don't rely on color alone. Include shape/icon indicators:
  - Green circle = "Owns"
  - Amber diamond = "Overrides"
  - Purple square = "Overridden"
  - Red X = "Shadowed"

### Screen Reader Considerations
- All buttons should have clear, descriptive text (not just icons)
- Headings should use proper h1 → h6 hierarchy
- Form inputs should have associated labels
- Images should have descriptive alt text

---

## 25. A/B Testing Recommendations

### Test 1: Hero Headline
- **Variant A:** "Know exactly which version of a method actually runs."
- **Variant B:** "Stop shipping code that never runs."
- **Metric:** Click-through to marketplace

### Test 2: Hero CTA Primary Button
- **Variant A:** "Install for VS Code"
- **Variant B:** "Get PRISM for VS Code"
- **Metric:** Click-through rate, marketplace traffic

### Test 3: Problem Section Copy
- **Variant A:** [Current problem section]
- **Variant B:** [Alternative: focus on "save time onboarding"]
- **Metric:** Time spent on page, click-through to marketplace

### Test 4: "Four States" Section Title
- **Variant A:** "Four states. Zero guesswork."
- **Variant B:** "Every method has a status."
- **Metric:** Click-through to marketplace (people should feel informed)

---

## 26. Glossary (For Consistency)

| Term | Definition | Usage |
|------|-----------|-------|
| MRO | Method Resolution Order | Always spell out on first use, then MRO. |
| Shadowed | A method defined in a class but overridden by a parent. | Never "hidden" or "blocked". |
| Overridden | A method redefined in a child class. | Child overrides parent. Not "overrode". |
| Method Resolution Order (MRO) | The order Python searches for methods in a hierarchy. | Technical term. Use for developers. |
| Inheritance Chain | The sequence of parent → grandparent → ... classes. | More accessible than MRO. |
| Dead Code | Code that never executes. | Shadowed or overridden methods. |
| Status | The classification of a method (owns, overrides, overridden, shadowed). | Never "state" on webpage (reserve for internal docs). |

---

## 27. Final Checklist: Copy Completeness

- ✅ Navigation links + logo text
- ✅ Hero section (3 headline variants, subheading, supporting text, CTAs)
- ✅ Problem statement (pain, code example, punchline)
- ✅ Four states (definitions, descriptions, colors)
- ✅ Suite overview (VS Code, CLI, CI, MCP + descriptions)
- ✅ Feature deep dives (6 features + visuals)
- ✅ Language support (10 languages + supporting text)
- ✅ Performance section (metrics + credibility)
- ✅ Roadmap teaser (what's coming, without over-promising)
- ✅ Install CTA (buttons + supporting text)
- ✅ Footer (links, legal, socials)
- ✅ Meta / SEO (title, meta description, OG tags)
- ✅ Email templates (welcome, announcements)
- ✅ Error messages (4 common errors)
- ✅ Positioning statements (5 audiences)
- ✅ CTA hierarchy (5 tiers)
- ✅ Tone guide (5 principles + examples)
- ✅ Language-specific positioning (6 languages)
- ✅ Pricing copy (future)
- ✅ Release messaging (v0.1 → v0.4)
- ✅ Crisis copy (outages, privacy)
- ✅ Social media templates (3 types)
- ✅ Accessibility notes (alt text, color-blind, screen reader)
- ✅ A/B testing recommendations (4 tests)
- ✅ Glossary (consistency)

---

## Document History

- **Created:** April 13, 2026
- **Status:** Complete, ready for implementation
- **Next Steps:**
  1. Integrate Variant 1 headline into index.html (already done)
  2. Create suite overview section on website
  3. Implement footer with all links
  4. Add meta tags to index.html
  5. Create email templates in marketing automation (future)
  6. Set up A/B testing framework (future)

---

**End of Copy Document**

All copy is written for clarity, accuracy, and conversion. Every sentence serves a purpose. Every CTA is direct.

No buzzwords. No hand-waving. Just clarity.
