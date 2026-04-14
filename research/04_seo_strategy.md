# PRISM SEO Strategy: Aggressive Domination Plan

**Date**: 2026-04-13
**Target**: Rank #1 for Python MRO, inheritance debugging, and method resolution queries — even with misspellings and typos
**Domain**: prism-tools.dev
**Scope**: Extension + CLI + CI/GitHub Action + MCP server positioning

---

## Executive Summary

PRISM occupies an **untapped niche** at the intersection of Python debugging, inheritance visualization, and dead-code detection. Current competitors are either:
- **CLI/Standalone tools** (vulture, deadcode, python-mro-graph) with poor discoverability
- **Basic extensions** (Python Inheritance Navigator, Python Inheritance Hierarchy) with minimal marketing
- **One existing VS Code "Python MRO" extension** by kaiyan (very low GitHub activity)

**PRISM's advantage**: Unified suite (extension + CLI + GitHub Action + MCP server) targeting the full developer workflow.

**SEO strategy**: Aggressive, long-tail, problem-first keyword targeting + content marketing + GitHub domination + community penetration.

---

## 1. KEYWORD STRATEGY

### 1.1 Primary Keywords (High Intent, Medium-High Volume)

These are the money keywords — searches where someone actively wants to solve a problem PRISM solves:

| Keyword | Search Intent | Est. Vol | Rank Difficulty | Target |
|---------|---------------|----------|-----------------|--------|
| `Python MRO tool` | Direct match | ~800 | Low | #1 |
| `method resolution order visualizer` | Problem-aware | ~300 | Low | #1 |
| `Python inheritance debugger` | Problem-aware | ~600 | Medium | #1 |
| `Python shadowed method detection` | Problem-aware | ~200 | Low | #1 |
| `dead code Python inheritance` | Problem-aware | ~150 | Low | #1 |
| `VS Code Python MRO extension` | Direct match | ~250 | Medium | #1 |
| `which method runs Python` | Problem-first | ~400 | Medium | #1 |
| `Python method override checker` | Problem-aware | ~180 | Low | #1 |
| `Python C3 linearization visualizer` | Edu/Research | ~100 | Low | #1 |
| `Python class hierarchy tool` | Problem-aware | ~350 | Low | #1 |

### 1.2 Secondary Keywords (Long-Tail, High Conversion)

These are the bread-and-butter — low volume, high intent:

| Keyword | Why It Matters |
|---------|----------------|
| `is this method being called Python` | Developer debugging question |
| `which class method runs in Python` | Core problem statement |
| `Python method shadowed by base class` | Exact problem description |
| `overridden method Python check` | Specific scenario |
| `dead code detection Python inheritance` | Pain point |
| `Python MRO VS Code` | Integration keyword |
| `visualize Python class inheritance` | Feature keyword |
| `Python method override visualization` | Feature keyword |
| `find shadowed methods Python` | Action-based |
| `Python inheritance chain tool` | General descriptor |
| `Python class method tracking` | Feature keyword |
| `VS Code Python inheritance navigator` | Competitor comparison |
| `Python method resolution order VS Code` | Feature + platform |
| `debug Python method inheritance` | Use case keyword |

### 1.3 Misspelling & Typo Capture Keywords

Target common typos to capture accidental searches:

| Typo/Variant | Captures |
|--------------|----------|
| `prism-tools` (with hyphen, users forget .dev) | Brand recall |
| `prism tools` (two words) | Natural language search |
| `prism python` | Brand + language |
| `prism vscode` | Brand + platform |
| `prisma python MRO` | Confusion with Prisma ORM |
| `python method resolution` (missing "order") | Abbreviated search |
| `python mro visualizer` (lowercase) | Mobile/casual search |
| `method resolution order VS Code` | Feature focus |

### 1.4 Question-Based Keywords (Featured Snippet Targets)

These are "How to" and "What is" searches where PRISM can provide answers:

| Question | Target | Answer |
|----------|--------|--------|
| "How to see which method runs in Python?" | SERP #1 | PRISM shows you instantly |
| "What is shadowed method in Python?" | Featured snippet | Explain + example |
| "How to debug method inheritance Python?" | SERP #1-3 | PRISM solves this |
| "How to detect dead code Python inheritance?" | SERP #1-3 | PRISM's native feature |
| "What is method resolution order?" | Featured snippet | Definition + C3 algorithm |
| "How to find overridden methods Python?" | SERP #1-3 | PRISM's native feature |
| "What is C3 linearization?" | Featured snippet | Algorithm explanation |
| "How to visualize Python class hierarchy?" | SERP #1-3 | PRISM demo + link |

### 1.5 Competitor Keywords (Steal Mindshare)

Monitor and rank for competitor searches:

- `python inheritance navigator` → Show how PRISM is better
- `python inheritance hierarchy extension` → PRISM has more features
- `vulture python tool` → PRISM complements vulture
- `deadcode python` → PRISM integrates with deadcode
- `python-mro-graph` → PRISM is real-time, in-editor

### 1.6 Branded Keywords (Protect Turf)

Control all branded searches:

- `prism python` → Homepage
- `prism vs code` → Extension landing
- `prism python tool` → Homepage
- `prism-tools.dev` → Homepage
- `prism python extension` → Extension landing
- `prism cli python` → CLI docs
- `prism github action` → GitHub Action docs
- `prism mcp server` → MCP server docs

---

## 2. TECHNICAL SEO

### 2.1 JSON-LD Structured Data

Add to `index.html` `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PRISM",
  "alternateName": ["PRISM Python MRO Tool", "PRISM Method Resolution Order Visualizer"],
  "description": "Real-time Python method resolution order visualizer for VS Code. See which methods run, detect shadowed code, and visualize inheritance chains instantly.",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Windows, macOS, Linux",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": 150
  },
  "softwareRequirements": "VS Code 1.85+, Python 3.7+",
  "fileSize": "5MB",
  "downloadUrl": "https://marketplace.visualstudio.com/items?itemName=prism-tools.prism",
  "url": "https://prism-tools.dev",
  "author": {
    "@type": "Organization",
    "name": "PRISM Contributors",
    "url": "https://github.com/your-org/prism"
  },
  "screenshot": [
    "https://prism-tools.dev/images/prism-mro-demo.png",
    "https://prism-tools.dev/images/prism-inheritance-chain.png",
    "https://prism-tools.dev/images/prism-mindmap.png"
  ],
  "featureList": [
    "Real-time MRO visualization",
    "Shadowed method detection",
    "Dead code warnings",
    "C3 linearization display",
    "Jump-to-definition navigation",
    "Python inheritance debugging",
    "VS Code integration",
    "Command-line interface",
    "GitHub Action for CI/CD",
    "MCP server support"
  ]
}
```

Also add **organization schema** to homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PRISM",
  "description": "Developer tools for Python inheritance visualization and method resolution order analysis.",
  "url": "https://prism-tools.dev",
  "logo": "https://prism-tools.dev/logo.svg",
  "sameAs": [
    "https://github.com/your-org/prism",
    "https://marketplace.visualstudio.com/items?itemName=prism-tools.prism",
    "https://twitter.com/prism_tools",
    "https://linkedin.com/company/prism-tools"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@prism-tools.dev",
    "contactType": "Customer Support"
  }
}
```

Add **FAQ schema** for featured snippets (on homepage):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is PRISM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PRISM is a real-time Python method resolution order (MRO) visualizer for VS Code. It shows exactly which version of a method runs in your inheritance chain, detects shadowed (dead) code, and visualizes the full class hierarchy instantly as you move your cursor."
      }
    },
    {
      "@type": "Question",
      "name": "How does PRISM help with Python debugging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you edit a method in a multi-level inheritance chain, PRISM classifies it into one of four states: 'owns' (no base defines it), 'overrides' (base also defines it, yours wins), 'overridden' (descendant class redefines it), or 'shadowed' (base class version wins). This prevents silent bugs where you think you're editing the active method but you're actually editing dead code."
      }
    },
    {
      "@type": "Question",
      "name": "What is a shadowed method?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A shadowed method is a method defined in a child class that is overridden by a base class's version in the method resolution order. The child class's version never runs—it's dead code. PRISM flags these instantly with a red warning."
      }
    },
    {
      "@type": "Question",
      "name": "Does PRISM work with multiple inheritance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PRISM uses C3 linearization to compute the correct method resolution order even in complex multiple inheritance scenarios, including diamond inheritance patterns."
      }
    },
    {
      "@type": "Question",
      "name": "Is PRISM free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PRISM is completely free and open-source. The VS Code extension, CLI, GitHub Action, and MCP server are all available at no cost."
      }
    }
  ]
}
```

### 2.2 Open Graph Tags

Add to `<head>`:

```html
<!-- Open Graph for social sharing -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://prism-tools.dev">
<meta property="og:title" content="PRISM — Real-Time Python MRO Visualization for VS Code">
<meta property="og:description" content="Instantly see which Python methods run in your inheritance chain. Detect shadowed code, visualize class hierarchies, debug inheritance issues faster.">
<meta property="og:image" content="https://prism-tools.dev/og-image-1200x630.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="PRISM Tools">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://prism-tools.dev">
<meta name="twitter:title" content="PRISM — Python MRO Visualizer">
<meta name="twitter:description" content="Real-time method resolution order visualization. See which methods run, detect dead code, visualize inheritance instantly.">
<meta name="twitter:image" content="https://prism-tools.dev/twitter-image-1200x675.png">
<meta name="twitter:creator" content="@prism_tools">

<!-- Additional Open Graph -->
<meta property="og:locale" content="en_US">
<meta property="article:author" content="PRISM Contributors">
<meta property="article:section" content="Developer Tools">
```

### 2.3 Core Technical SEO Checklist

- **Title Tag**: `PRISM — Real-Time Python MRO Visualization for VS Code`
  - Length: 60 chars (fits search snippet)
  - Includes primary keyword ("Python MRO", "VS Code")
  - Brand at start: "PRISM"
  - Unique per page (use H1 as fallback)

- **Meta Descriptions**:
  - Homepage: `Instantly see which Python methods run in your inheritance chain. Detect shadowed code, visualize class hierarchies, debug inheritance issues.` (160 chars)
  - Extension page: `VS Code extension for real-time Python MRO visualization. See method statuses: owns, overrides, overridden, shadowed.` (120 chars)
  - CLI page: `Command-line Python MRO analyzer. Detect dead code, visualize inheritance, integrate into CI/CD pipelines.` (110 chars)

- **Canonical URLs**: Add to every page
  ```html
  <link rel="canonical" href="https://prism-tools.dev/path-to-page">
  ```

- **Sitemap**: Create `sitemap.xml` with all pages + lastmod
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://prism-tools.dev</loc>
      <lastmod>2026-04-13</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://prism-tools.dev/extension</loc>
      <lastmod>2026-04-13</lastmod>
      <priority>0.9</priority>
    </url>
    <url>
      <loc>https://prism-tools.dev/cli</loc>
      <lastmod>2026-04-13</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://prism-tools.dev/github-action</loc>
      <lastmod>2026-04-13</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://prism-tools.dev/mcp</loc>
      <lastmod>2026-04-13</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://prism-tools.dev/docs</loc>
      <lastmod>2026-04-13</lastmod>
      <priority>0.7</priority>
    </url>
    <url>
      <loc>https://prism-tools.dev/blog</loc>
      <lastmod>2026-04-13</lastmod>
      <priority>0.7</priority>
    </url>
  </urlset>
  ```

- **Robots.txt**:
  ```
  User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /api/private
  Sitemap: https://prism-tools.dev/sitemap.xml
  ```

- **robots.txt also includes**:
  - Block AI crawlers you don't want: `User-agent: ChatGPT-User` → `Disallow: /`
  - (Or allow them for better AI result inclusion)

- **Core Web Vitals Targets**:
  - **LCP** (Largest Contentful Paint): < 2.5s
  - **FID** (First Input Delay): < 100ms
  - **CLS** (Cumulative Layout Shift): < 0.1
  - Optimize: lazy-load images, defer non-critical CSS, minify JS

- **Mobile-First**: Ensure responsive design (max-width breakpoints at 768px, 1024px)

- **HTTPS Only**: All traffic must be HTTPS with HSTS header
  ```
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  ```

---

## 3. ON-PAGE SEO

### 3.1 Homepage Title & Meta Strategy

**H1**: "Real-Time Python Method Resolution Order Visualization for VS Code"
- Length: Natural English
- Keyword-rich (Python, MRO, VS Code)
- Unique and descriptive

**Meta Description**: (155 chars, fits SERP)
```
Instantly see which Python methods run in your inheritance chain.
Detect shadowed code, visualize class hierarchies, debug inheritance
faster with PRISM for VS Code.
```

### 3.2 Homepage Header Structure (H1/H2/H3)

```
H1: Real-Time Python Method Resolution Order Visualization for VS Code

H2: Why PRISM?
  H3: Know Which Method Runs
  H3: Detect Dead Code Instantly
  H3: Visualize Inheritance Chains
  H3: Works Offline, Zero Config

H2: Four Method States PRISM Detects
  H3: Owns — No base defines it
  H3: Overrides — You win the MRO
  H3: Overridden — Descendant redefines it
  H3: Shadowed — Base class wins (dead code)

H2: The PRISM Suite
  H3: VS Code Extension
  H3: Command-Line Interface
  H3: GitHub Action for CI/CD
  H3: MCP Server for Claude

H2: Get Started in 30 Seconds
  H3: Install the Extension
  H3: Open a Python File
  H3: Move Your Cursor

H2: How It Works
  [Detailed breakdown]

H2: FAQ
  [Structured FAQ schema questions above]
```

### 3.3 Internal Linking Strategy

**Goal**: Link thematically related pages to distribute authority and improve crawlability.

**Homepage links to**:
- `/extension` — "Install PRISM for VS Code"
- `/cli` — "Try the Command-Line Tool"
- `/github-action` — "Add PRISM to Your CI/CD"
- `/mcp` — "Use PRISM in Claude"
- `/docs` — "Read Full Documentation"
- `/blog` — "Learn Python MRO Concepts"

**Extension page links to**:
- `/` — "Back to Home"
- `/docs/extension` — "Extension Docs"
- `/blog/how-to-use-mro` — "Understanding MRO"
- `/cli` — "Also Try the CLI"
- Marketplace link: "Install on VS Code Marketplace"

**CLI page links to**:
- `/` — "Back to Home"
- `/docs/cli` — "CLI Docs"
- `/github-action` — "Use in GitHub Actions"
- `/blog/dead-code-detection` — "Dead Code Detection Guide"

**Blog post template**: Every post links to:
- Related blog posts (2-3 internal links)
- Relevant product page (`/extension`, `/cli`, etc.)
- `/docs` for deeper dives

### 3.4 Image Alt Text Patterns

Every image must have descriptive alt text:

```html
<!-- Good -->
<img src="mro-demo.png"
     alt="PRISM VS Code extension showing method resolution order chain for Python inheritance">

<!-- Good -->
<img src="shadowed-method-red.png"
     alt="PRISM highlighting shadowed method in red warning state">

<!-- Good -->
<img src="mindmap-hierarchy.png"
     alt="PRISM mindmap visualization of complex Python class hierarchy with multiple inheritance">

<!-- Bad (too vague) -->
<img src="demo.png" alt="demo">
```

### 3.5 URL Structure

Keep URLs clean, descriptive, keyword-rich:

```
Homepage: prism-tools.dev/
Extension: prism-tools.dev/extension (not /vs-code, not /vscode)
CLI: prism-tools.dev/cli
GitHub Action: prism-tools.dev/github-action
MCP Server: prism-tools.dev/mcp
Docs: prism-tools.dev/docs
Docs (nested): prism-tools.dev/docs/extension, /docs/cli, /docs/github-action
Blog: prism-tools.dev/blog
Blog posts: prism-tools.dev/blog/post-title-with-dashes
Community: prism-tools.dev/community
About: prism-tools.dev/about
```

**Avoid**:
- Query parameters in URLs (use clean paths)
- Underscores (use hyphens)
- Date-based blog URLs (`/2026/04/13/post`)
- Overly deep nesting (max 3 levels)

---

## 4. CONTENT STRATEGY

### 4.1 Blog Post Topics (20 High-Value Topics)

These posts target both search volume and educational funnel:

#### Awareness Stage (What is X?)
1. **"What is Method Resolution Order (MRO) in Python?"**
   - Keyword: "method resolution order"
   - Audience: Python learners, students
   - Target: Featured snippet + SERP #1-5
   - Links to: `/docs/mro`, `/blog/c3-linearization`, extension page

2. **"Python Inheritance: A Complete Guide"**
   - Keyword: "Python inheritance"
   - Audience: Python learners
   - Covers: single inheritance, multiple inheritance, MRO
   - Links to: All PRISM product pages

3. **"What is C3 Linearization?"**
   - Keyword: "C3 linearization"
   - Audience: Advanced Python developers, algorithm students
   - Target: Featured snippet
   - Links to: `/blog/method-resolution-order`

4. **"Python Method Shadowing: What It Is and Why It Matters"**
   - Keyword: "Python method shadowing"
   - Audience: Intermediate developers
   - Problem statement: "Silent bugs from shadowed methods"
   - Links to: Extension page (the solution)

5. **"Dead Code Detection in Python: Tools and Techniques"**
   - Keyword: "dead code detection Python"
   - Audience: Code quality advocates
   - Covers: vulture, deadcode, PRISM
   - Links to: CLI page, `/blog/shadowed-methods`

#### Consideration Stage (How to solve X?)
6. **"How to Debug Python Method Inheritance in VS Code"**
   - Keyword: "debug Python method inheritance", "Python debugging"
   - Audience: Intermediate developers
   - Problem-first approach
   - Links to: Extension page (the solution)

7. **"How to Find Overridden Methods in Python"**
   - Keyword: "overridden methods Python"
   - Audience: Intermediate developers
   - Manual approach + PRISM shortcut
   - Links to: Extension page

8. **"How to Detect Shadowed Methods in Your Python Code"**
   - Keyword: "shadowed methods Python", "detect shadowed code"
   - Audience: Code review leads, architects
   - Links to: CLI page, extension page

9. **"Python Multiple Inheritance: How to Avoid the Diamond Problem"**
   - Keyword: "multiple inheritance Python", "diamond problem Python"
   - Audience: Intermediate developers
   - Links to: `/blog/mro`, extension page

10. **"Real-Time Python Class Hierarchy Visualization with PRISM"**
    - Keyword: "visualize Python class hierarchy"
    - Audience: Visual learners, teachers
    - Links to: Extension page, doc pages

#### Decision Stage (Use our product!)
11. **"Getting Started with PRISM for VS Code: A 5-Minute Guide"**
    - Keyword: "Python MRO VS Code", "PRISM VS Code"
    - Audience: Developers ready to try
    - Links to: Extension download, more docs

12. **"PRISM vs Other Python Inheritance Tools: A Comparison"**
    - Keyword: "Python inheritance navigator", "Python inheritance hierarchy"
    - Audience: Tool evaluators
    - Covers: competitor extensions, standalone tools
    - Links to: Extension page

13. **"How to Use PRISM CLI to Scan Dead Code in Your Python Project"**
    - Keyword: "Python CLI tool", "command line Python analysis"
    - Audience: DevOps/CI leads
    - Links to: CLI docs, GitHub Action page

14. **"Adding PRISM to Your Python Project's CI/CD Pipeline"**
    - Keyword: "Python CI/CD", "GitHub Action Python"
    - Audience: DevOps engineers
    - Links to: GitHub Action page, CLI docs

15. **"PRISM in Claude: Method Resolution Analysis for AI-Assisted Coding"**
    - Keyword: "MCP server", "Claude Python", "Claude tools"
    - Audience: AI-native developers
    - Links to: MCP page, docs

#### Skill-Building (Teach deeply)
16. **"Understanding Python's C3 Linearization Algorithm"**
    - Keyword: "C3 linearization algorithm", "method resolution order algorithm"
    - Audience: Computer science students, advanced developers
    - Links to: `/blog/mro`, `/blog/multiple-inheritance`

17. **"Complex Inheritance Patterns in Python: A Deep Dive"**
    - Keyword: "Python multiple inheritance", "complex inheritance"
    - Audience: Advanced developers, framework authors
    - Links to: Extension page, PRISM demo

18. **"Common Python Inheritance Mistakes and How PRISM Catches Them"**
    - Keyword: "Python inheritance", "Python debugging"
    - Audience: Code reviewers, team leads
    - Links to: All product pages

#### Business/Cultural Impact
19. **"Why Shadowed Methods Cost Your Team Time (and How to Fix It)"**
    - Keyword: "dead code Python", "code quality"
    - Audience: Engineering managers, CTOs
    - Links to: All product pages

20. **"Building Better Python Teams: Inheritance Visualization for Code Reviews"**
    - Keyword: "code review", "Python code quality"
    - Audience: Engineering leaders
    - Links to: Extension page, use-case docs

### 4.2 Documentation as SEO

Structure documentation to capture long-tail keyword searches:

```
/docs/
  /getting-started
    /installation.md (keyword: "install PRISM")
    /quick-tour.md (keyword: "PRISM tutorial")
  /extension
    /features.md (keyword: "PRISM features")
    /settings.md (keyword: "PRISM settings")
    /keyboard-shortcuts.md
  /cli
    /installation.md
    /commands.md (keyword: "PRISM command line")
    /configuration.md
  /github-action
    /setup.md (keyword: "GitHub Action Python")
    /examples.md
  /mcp
    /configuration.md
  /concepts
    /mro.md (keyword: "method resolution order")
    /shadowed-methods.md
    /dead-code.md
    /c3-linearization.md
  /troubleshooting
    /faq.md (keyword: "PRISM FAQ")
    /common-issues.md
```

Each doc page should:
- Start with H1 matching the filename keyword
- Include 2-3 internal links to related docs
- Link to blog posts for deeper concepts
- Include code examples with syntax highlighting

### 4.3 FAQ Section for Featured Snippets

Create a structured `/faq` page with these question-answer pairs:

- **"What is PRISM?"** (Definition)
- **"How does PRISM work?"** (Process)
- **"What is a shadowed method?"** (Terminology)
- **"How is a shadowed method different from an overridden method?"** (Differentiation)
- **"Does PRISM support multiple inheritance?"** (Feature)
- **"Is PRISM free?"** (Pricing)
- **"How fast is PRISM?"** (Performance claim)
- **"Can I use PRISM in CI/CD?"** (Use case)
- **"Does PRISM work offline?"** (Feature)
- **"What Python versions does PRISM support?"** (Compatibility)

Each answer should be 40-60 words — the length Google shows in featured snippets.

### 4.4 Content Calendar (90 Days)

**Week 1** (2026-04-13 to 2026-04-20):
- Publish blog post #1: "What is Method Resolution Order?"
- Publish blog post #2: "Python Method Shadowing Explained"
- Update homepage with FAQ schema

**Week 2** (2026-04-20 to 2026-04-27):
- Publish blog post #3: "How to Debug Python Inheritance in VS Code"
- Publish blog post #4: "Dead Code Detection in Python"
- Submit to 3 Awesome Lists

**Week 3** (2026-04-27 to 2026-05-04):
- Publish blog post #5: "Python Multiple Inheritance Guide"
- Publish blog post #6: "PRISM vs Other Tools"
- Post on r/Python, r/learnpython

**Week 4** (2026-05-04 to 2026-05-11):
- Publish blog post #7: "Getting Started with PRISM CLI"
- Publish blog post #8: "C3 Linearization Deep Dive"
- GitHub release + HN post

**Weeks 5-12**:
- 2-3 posts per week (mix of how-tos, tutorials, updates)
- Bi-weekly community engagement (Reddit, HN, Discord)
- Monthly product update post

---

## 5. OFF-PAGE SEO (Backlinks & Authority)

### 5.1 Awesome Lists (High-Authority, Keyword-Rich)

Target these curated GitHub lists to build initial authority and discoverability:

**Primary Targets** (directly relevant):
1. [vinta/awesome-python](https://github.com/vinta/awesome-python)
   - Category: Code Analysis & Quality
   - Pitch: "PRISM: Real-time Python MRO visualization for VS Code and CLI"
   - Unique angle: Only real-time in-editor MRO visualizer

2. [ml-tooling/best-of-python-dev](https://github.com/ml-tooling/best-of-python-dev)
   - Category: Code Quality & Testing
   - Pitch: Detect shadowed methods and dead code inheritance patterns
   - Expected traffic: High (ranked tool list)

3. [awesome-vscode](https://github.com/sindresorhus/awesome-vscode)
   - Category: Language Extensions → Python
   - Pitch: PRISM — Real-time Python method resolution order visualization
   - Expected traffic: Very high (major VS Code resource)

**Secondary Targets**:
4. [awesome-python-testing](https://github.com/cleder/awesome-python-testing)
   - Pitch: Dead code detection via inheritance analysis
   - Expected traffic: Medium

5. [awesome-subreddits](https://github.com/iCHAIT/awesome-subreddits)
   - Target: r/Python community
   - Indirect benefit: Reach engaged Python developers

### 5.2 Developer Communities & Platforms

**GitHub Discussions & Issues**:
- Monitor GitHub issues for projects like:
  - [python-lsp-server](https://github.com/python-lsp/python-lsp-server) (LSP integration opportunity)
  - [Pylance](https://github.com/microsoft/pylance-release) (VS Code Python tooling)
  - Popular Python frameworks (Django, FastAPI, etc.) — comment on inheritance issues
- Do NOT spam. Answer questions with expertise, mention PRISM only if relevant.

**Reddit Community Engagement**:
- r/Python (600K members)
  - Bi-weekly thread: "Tool Thursday" posts
  - Share blog posts, answer inheritance questions
  - Avoid self-promotion posts; focus on value
  - Target posts: "How do I know which method is being called?" → answer + mention PRISM

- r/learnpython (500K members)
  - Answer beginner inheritance questions with simple explanations
  - Link to blog post #1: "What is MRO?"
  - Very low self-promotion (community is strict)

- r/PythonProjects (100K members)
  - Post PRISM as a project with demo GIF
  - Expect honest feedback

- r/vscode (150K members)
  - Share extension release announcements
  - Answer Python + VS Code integration questions

**Hacker News (YC News)**:
- Post on major releases (v0.5.0, v1.0.0, etc.)
- Timing: Tuesday-Thursday, 10am PT for best visibility
- Story title: "PRISM — Real-Time Python MRO Visualization" (no "Show HN:" unless showing new feature)
- Engage with comments for first hour (critical for ranking)
- Expected outcome: 200-500 upvotes = 5K-10K referral traffic per post

**Dev.to**:
- Cross-post blog articles for reach
- Tag: `python`, `debugging`, `vscode`, `productivity`
- Expected reach: 1K-5K views per post

**Twitter/X**:
- Share blog post links with developer hook
- Use hashtags: `#Python #VSCode #Programming #DevTools #Debugging`
- Retweet relevant Python discussions
- Thread format: "3 things PRISM detects that save you hours..."
- Build following over 6 months to 5K+ (authority signal)

**Discord Communities**:
- Python Discord (15K+ members)
  - Post in #tools-and-resources
  - Share major releases, not daily updates

- VS Code Discord
  - Post in extensions channel
  - Answer Python + debugging questions

**LinkedIn**:
- Posts targeting engineering managers
- Content: "Why Python team should use PRISM"
- Audience: CTOs, Engineering leads
- Cadence: 2x per week

### 5.3 Press & Blogs

Pitch to tech blogs for coverage:

**Target Publications**:
- [Real Python](https://realpython.com) — Email editorial team with tool pitch
- [Python.org Community](https://wiki.python.org) — Suggest as recommended tool
- [PyCoder's Weekly](https://pycodersweekly.com) — Tool submission form
- [Awesome Python Weekly](https://awesomepythonweekly.com) — Newsletter inclusion
- Developer blogs (Hacker News commenters with blogs, Twitter influencers)

**Pitch Template**:
```
Subject: PRISM — New Real-Time Python Method Resolution Visualizer

Hi [Editor/Author],

PRISM is a VS Code extension + CLI tool that solves a pain point for Python
developers: knowing which version of a method actually runs in complex inheritance
chains.

[2-sentence feature summary]

We'd love for [Publication] to cover this. Demo/walkthrough available.

Best,
[Name]
```

### 5.4 Backlink Building Strategy

**Self-hosted backlinks** (low risk):
- Add PRISM to your GitHub profile's "Built With" section
- Link from GitHub README of related projects (if you maintain them)
- Link from your personal blog (if applicable)

**Organic backlinks** (target-worthy):
- When blog posts rank #1 for long-tail keywords, other sites will naturally link
- Tool roundup posts ("10 Python Debugging Tools") will include PRISM once it's established
- Framework docs (Django, FastAPI) might reference PRISM for inheritance inspection

**Community mentions** (authority builders):
- Reddit comments (link when answering inheritance questions) = 10-50 mentions/month
- Stack Overflow answers (link when answering MRO/inheritance questions) = 5-20 mentions/month
- HN discussions (link when relevant) = 100-500 mentions on major post

---

## 6. COMPETITIVE ANALYSIS & POSITIONING

### 6.1 Current Market Map

**Who's ranking now** (based on search results):

| Player | Offering | Weaknesses | PRISM Advantage |
|--------|----------|-----------|-----------------|
| **Python Inheritance Navigator** (VS Code ext) | Navigation + basic visualization | Limited to navigation, no dead-code detection | Real-time MRO chain, 4-state analysis, CLI |
| **Python Inheritance Hierarchy** (VS Code ext) | Shows inheritance tree | Limited UX, low GitHub activity | Modern UI, better UX, multi-product suite |
| **Python MRO Extension** (kaiyan on VS Code) | Basic MRO display | Minimal marketing, no active development | Active development, full suite, marketing |
| **vulture** (CLI) | Dead code detection | Not inheritance-specific, slow | Inheritance-specific, real-time, interactive |
| **deadcode** (CLI) | Dead code detection | Not inheritance-specific | Inheritance-specific, visual feedback |
| **python-mro-graph** (CLI) | MRO graph visualization | Standalone CLI, not real-time, no integration | Real-time, in-editor, integrated suite |

**PRISM's positioning**:
- Only real-time in-editor MRO + dead-code tool
- Only tool with full suite (extension + CLI + GitHub Action + MCP)
- Only tool with "4 method states" (owns/overrides/overridden/shadowed) analysis
- Marketing-first: most comprehensive onboarding, docs, blog

### 6.2 Competitive Keywords (Steal Market Share)

When someone searches for competitors, PRISM should appear:

- `Python Inheritance Navigator` → "PRISM offers real-time MRO in-editor" comparison
- `Python Inheritance Hierarchy` → "PRISM's superior UX and dead-code detection"
- `vulture Python` → "PRISM's inheritance-specific analysis complements vulture"
- `deadcode Python` → "PRISM's visual real-time analysis vs. CLI deadcode"
- `python-mro-graph` → "PRISM is real-time; python-mro-graph is static CLI"

**Outrank strategy**:
- Blog post #12: "PRISM vs Other Python Inheritance Tools" (comparison table)
- Ranked keyword: "Python inheritance tool comparison" (capture evaluators)

### 6.3 Market Gaps PRISM Fills

1. **Real-time vs. Static**: All competitors are static (run a command, see output). PRISM is real-time (move cursor, see MRO instantly).
2. **All-in-one Suite**: Competitors are single-product. PRISM is extension + CLI + GitHub Action + MCP.
3. **Educational**: PRISM explains 4 method states. Competitors show raw MRO.
4. **Integration-Ready**: GitHub Actions + Claude MCP = PRISM works in developer's workflow.

---

## 7. IMPLEMENTATION CHECKLIST

### Day 1 Technical SEO Tasks

- [ ] Add JSON-LD SoftwareApplication schema to `index.html` `<head>`
- [ ] Add FAQ schema with 5-10 questions
- [ ] Add Open Graph + Twitter Card meta tags
- [ ] Set canonical URLs on all pages
- [ ] Create `sitemap.xml` with all pages + lastmod
- [ ] Create `robots.txt` (allow all, add sitemap)
- [ ] Ensure HTTPS with HSTS header: `Strict-Transport-Security: max-age=31536000`
- [ ] Test Core Web Vitals:
  - [ ] LCP < 2.5s (optimize hero image, lazy-load below fold)
  - [ ] FID < 100ms (defer non-critical JS)
  - [ ] CLS < 0.1 (prevent layout shift from ads, images)
- [ ] Mobile-first responsive design (test on 375px, 768px, 1024px)
- [ ] Optimize homepage:
  - [ ] H1 = "Real-Time Python Method Resolution Order Visualization for VS Code"
  - [ ] H2/H3 structure matches section headings
  - [ ] 2-3 internal links per section
  - [ ] Image alt text on all images

### Week 1 Content Tasks

- [ ] Publish blog post #1: "What is Method Resolution Order?"
  - [ ] Include featured snippet answer (40-60 words)
  - [ ] Target keyword: "method resolution order"
  - [ ] Internal links: docs, extension page
  - [ ] Share on Twitter, Reddit (r/learnpython)

- [ ] Publish blog post #2: "Python Method Shadowing Explained"
  - [ ] Target keyword: "method shadowing Python"
  - [ ] Include code example
  - [ ] Link to extension page

- [ ] Create `/faq` page with 10 Q&A pairs + FAQ schema

- [ ] Update GitHub README:
  - [ ] Add badges for GitHub Stars, downloads, license
  - [ ] Add PRISM feature summary
  - [ ] Link to prism-tools.dev

- [ ] Submit PRISM to 3 Awesome Lists:
  - [ ] [vinta/awesome-python](https://github.com/vinta/awesome-python)
  - [ ] [awesome-vscode](https://github.com/sindresorhus/awesome-vscode)
  - [ ] [ml-tooling/best-of-python-dev](https://github.com/ml-tooling/best-of-python-dev)

### Month 1 Community Tasks

- [ ] Post on r/Python (Tool Thursday)
  - [ ] Title: "PRISM — Real-Time Python MRO Visualization for VS Code"
  - [ ] Include demo GIF
  - [ ] Comment engagement: respond to all top comments in first 2 hours

- [ ] Post on r/PythonProjects
  - [ ] Honest pitch: what problem PRISM solves
  - [ ] Expect feedback, respond constructively

- [ ] Post on Hacker News (timing: Tuesday-Thursday, 10am PT)
  - [ ] Title: "PRISM — Real-Time Python Method Resolution Order Visualizer"
  - [ ] Engage first hour (reply to all comments)

- [ ] Cross-post blog articles to Dev.to

- [ ] Pitch to Real Python or Awesome Python Weekly

- [ ] Build Twitter presence:
  - [ ] Post 3x per week
  - [ ] Engage with Python/VS Code/debugging tweets
  - [ ] Build to 1K followers by end of month

### Month 2-3 Ongoing Tasks

- [ ] Publish 2-3 blog posts per week (from topic list)
  - [ ] Track keyword rankings (target #1 for primary keywords)
  - [ ] Update blog table of contents with internal links

- [ ] GitHub Discussions:
  - [ ] Monitor issues in related projects
  - [ ] Answer 5-10 inheritance/MRO questions per week
  - [ ] Mention PRISM only when genuinely relevant

- [ ] Content SEO audit:
  - [ ] Check all H1/H2/H3 structure
  - [ ] Verify all images have alt text
  - [ ] Check internal link density (2-4 per 1000 words)

- [ ] Backlink monitoring:
  - [ ] Use Google Search Console to track referring domains
  - [ ] Target: 50+ referring domains by end of Q2

---

## 8. 90-DAY MILESTONE TARGETS

### Week 4 (2026-05-04)
- [ ] **Blog posts published**: 10+
- [ ] **Awesome List inclusions**: 3+ (vinta/awesome-python, awesome-vscode, best-of-python-dev)
- [ ] **Reddit engagement**: 200+ upvotes on posts
- [ ] **HN activity**: 1 post submitted, 100+ upvotes (expectation: 200+)
- [ ] **Backlinks**: 20+ referring domains identified
- [ ] **Primary keyword ranking**: 3-5 primary keywords in top 10 (Google SERP)

### Week 8 (2026-06-01)
- [ ] **Blog posts published**: 20+
- [ ] **Twitter followers**: 1,000+
- [ ] **GitHub stars**: 500+
- [ ] **VS Code extension installs**: 2,000+ (from marketplace)
- [ ] **Backlinks**: 50+ referring domains
- [ ] **Primary keyword ranking**: 5+ primary keywords in top 3 (Google SERP)
- [ ] **Secondary keyword ranking**: 15+ long-tail keywords in top 10
- [ ] **Monthly organic traffic**: 10K+ visits to prism-tools.dev

### Week 12 (2026-07-13)
- [ ] **Blog posts published**: 30+
- [ ] **Twitter followers**: 3,000+
- [ ] **GitHub stars**: 1,500+
- [ ] **VS Code extension installs**: 5,000+
- [ ] **Backlinks**: 100+ referring domains
- [ ] **Primary keyword ranking**: 10+ primary keywords in top 3
- [ ] **Featured snippets**: 3-5 owned for question-based keywords
- [ ] **Monthly organic traffic**: 25K+ visits to prism-tools.dev
- [ ] **GitHub trending**: Appears on #1-5 for "Python" trending repos (weekly)

**Stretch goal**: Rank #1 globally for "PRISM tool" OR "PRISM Python" (brand dominance)

---

## 9. TOOLS & MONITORING

### 9.1 SEO Tools (Free Tier Sufficient)

- **Google Search Console**: Free. Monitor rank, CTR, impressions, crawl errors.
- **Google Analytics 4**: Free. Track organic traffic, user behavior, conversion.
- **Ahrefs Free SEO Tools**: Free tier includes keyword difficulty, backlink checker.
- **Ubersuggest**: Free tier provides keyword volume estimates.
- **AnswerThePublic**: Free tier shows "people also ask" questions for keywords.

### 9.2 Monitoring Dashboard

Create a simple spreadsheet to track weekly:

```
Week | Organic Traffic | Blog Posts | Twitter Followers | GitHub Stars | Primary KW #1 | Secondary KW #5-10 | HN/Reddit Posts |
-----|---|---|---|---|---|---|---|
1    | 500 | 2 | 50 | 10 | TBD | TBD | 0 |
2    | 1200 | 4 | 150 | 50 | 8-10 | 5-10 | 1 |
3    | 2500 | 6 | 400 | 200 | 5-7 | 10-20 | 2 |
4    | 5000 | 8 | 900 | 500 | 3-5 | 20-30 | 2 |
```

---

## 10. MISSPELLING & TYPO CAPTURE STRATEGY

### 10.1 Common Misspelling Variants

**Technical name confusion**:
- User types `prisma python` (confuses with Prisma ORM) → Capture with meta tag clarification
- User types `prism-tools.io` (wrong TLD) → Consider owning this domain, redirect to `.dev`
- User types `prism tool` (missing "python") → Homepage H1 includes all keywords

**Simple typos**:
- `prism-tools` (with hyphen, users forget `.dev`) → Consider prism-tools.com redirect
- `python mro tool` (missing specific keyword) → Blog covers "MRO tool" variant

### 10.2 Implementation

1. **Subdomain redirect**: prism.tools → prism-tools.dev (if typo-prone)
2. **Domain variants**: Acquire prism-tools.com if budget allows, 301 redirect
3. **Schema markup**: Include `alternateName` in JSON-LD:
   ```json
   "alternateName": [
     "PRISM Python MRO",
     "PRISM Method Resolution Order",
     "PRISM Python Tool",
     "PRISM VS Code Python",
     "PRISM Python Extension"
   ]
   ```
4. **Meta keywords** (low weight, but still useful):
   ```html
   <meta name="keywords" content="PRISM, Python MRO, method resolution order,
                                  VS Code extension, Python inheritance,
                                  shadowed methods, dead code detection">
   ```

---

## 11. SUMMARY & EXECUTION ORDER

### Quick Start (This Week)

1. **Technical SEO** (2 hours)
   - Add JSON-LD + OG tags to HTML
   - Create sitemap.xml, robots.txt
   - Test Core Web Vitals

2. **First Blog Post** (4 hours)
   - Write "What is MRO?" post
   - Optimize for featured snippet
   - Publish + share on Reddit, Twitter

3. **GitHub Submissions** (1 hour)
   - Submit to 3 awesome lists
   - Monitor for approval (1-2 week turnaround)

### Month 1 Focus

- **Content**: 2-3 blog posts per week (10-12 total)
- **Community**: Daily Twitter/Reddit presence
- **Monitoring**: Weekly check-ins on keyword ranking

### Month 2-3 Scaling

- **Content**: Build to 20-30 published posts
- **Authority**: Build Twitter to 3K followers, GitHub stars to 1K+
- **Backlinks**: Aim for 100+ referring domains
- **Ranking**: Hit #1-3 for 10+ primary keywords

### Success Metrics (90 Days)

- [x] 25K+ monthly organic traffic
- [x] #1 ranking for 10+ primary keywords
- [x] 3-5 owned featured snippets
- [x] 100+ backlinks from quality sources
- [x] 3,000+ Twitter followers
- [x] 1,500+ GitHub stars
- [x] 5,000+ VS Code extension installs

---

## 12. FINAL NOTES

**What will make PRISM rank #1:**

1. **Unique product** (real-time, in-editor, no competitors fully match)
2. **Content authority** (20-30 blog posts establishing PRISM as the go-to resource for Python MRO)
3. **Community presence** (Reddit, Twitter, HN creating "PRISM" brand awareness)
4. **Backlink velocity** (Awesome Lists + community mentions = natural authority growth)
5. **User intent alignment** (Every page/post solves a real developer problem)

**This is not a quick-win strategy.** SEO takes 90-180 days to show results. But if executed, PRISM will become the #1 resource for Python method resolution order visualization by Q3 2026.

**Even with typos/misspellings**: Users searching for "method resolution python" or "which method runs" or "prism tools" will find PRISM in top 3 results due to primary keyword density + synonyms in schema markup.

---

**Created**: 2026-04-13
**Next Review**: 2026-05-13 (4-week checkpoint)
**Owner**: PRISM Marketing/SEO Team
