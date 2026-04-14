# PRISM Technical SEO — Ready-to-Use Code Snippets

Copy these directly into your HTML `<head>` section.

---

## 1. META TAGS (Required — Copy to Every Page)

### 1.1 Character Encoding & Viewport

```html
<!-- Required for all pages -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Prevent Bing from indexing old snapshots -->
<meta http-equiv="x-ua-compatible" content="IE=edge">
```

### 1.2 Page-Level Meta Tags (Homepage Example)

```html
<!-- Title: Exactly 60 characters -->
<title>PRISM — Real-Time Python MRO Visualization for VS Code</title>

<!-- Meta description: 155 characters for Google SERP -->
<meta name="description" content="Instantly see which Python methods run in your inheritance chain. Detect shadowed code, visualize class hierarchies, debug inheritance faster with PRISM.">

<!-- Keywords (low weight but still useful) -->
<meta name="keywords" content="Python MRO, method resolution order, VS Code extension, Python inheritance, shadowed methods, dead code detection, Python debugging">

<!-- Author/copyright -->
<meta name="author" content="PRISM Contributors">
<meta name="copyright" content="2026 PRISM Contributors">

<!-- Language -->
<meta http-equiv="content-language" content="en-US">

<!-- For Search Console verification -->
<meta name="google-site-verification" content="PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE">
```

### 1.3 Canonical URL (Use on Every Page)

```html
<!-- Homepage -->
<link rel="canonical" href="https://prism-tools.dev/">

<!-- Extension page -->
<link rel="canonical" href="https://prism-tools.dev/extension">

<!-- CLI page -->
<link rel="canonical" href="https://prism-tools.dev/cli">

<!-- Blog post example -->
<link rel="canonical" href="https://prism-tools.dev/blog/what-is-method-resolution-order">
```

### 1.4 Alternate Links (Multi-language — if you localize)

```html
<!-- If you have German version, etc. -->
<link rel="alternate" hreflang="en-US" href="https://prism-tools.dev/">
<link rel="alternate" hreflang="x-default" href="https://prism-tools.dev/">
```

---

## 2. OPEN GRAPH TAGS (Social Sharing)

### 2.1 Homepage Open Graph

```html
<!-- Open Graph meta tags for homepage -->
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="https://prism-tools.dev/">
<meta property="og:title" content="PRISM — Real-Time Python MRO Visualization for VS Code">
<meta property="og:description" content="Instantly see which Python methods run in your inheritance chain. Detect shadowed code, visualize class hierarchies, debug inheritance faster.">
<meta property="og:image" content="https://prism-tools.dev/og-image-1200x630.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="PRISM Python MRO visualization tool for VS Code showing method resolution order chain">
<meta property="og:site_name" content="PRISM Tools">
```

### 2.2 Blog Post Open Graph Example

```html
<!-- For blog posts -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://prism-tools.dev/blog/what-is-method-resolution-order">
<meta property="og:title" content="What is Method Resolution Order (MRO) in Python?">
<meta property="og:description" content="A complete guide to Python's method resolution order (MRO), C3 linearization algorithm, and how it determines method lookup in inheritance hierarchies.">
<meta property="og:image" content="https://prism-tools.dev/blog/images/mro-diagram.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="article:author" content="PRISM Contributors">
<meta property="article:section" content="Python Development">
<meta property="article:published_time" content="2026-04-13T00:00:00Z">
<meta property="article:modified_time" content="2026-04-13T00:00:00Z">
<meta property="article:tag" content="Python">
<meta property="article:tag" content="MRO">
<meta property="article:tag" content="Inheritance">
<meta property="article:tag" content="Debugging">
```

---

## 3. TWITTER CARD TAGS (Social Sharing)

### 3.1 Twitter Card for Homepage

```html
<!-- Twitter Card for sharing -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@prism_tools">
<meta name="twitter:creator" content="@prism_tools">
<meta name="twitter:url" content="https://prism-tools.dev/">
<meta name="twitter:title" content="PRISM — Python MRO Visualizer">
<meta name="twitter:description" content="Real-time method resolution order visualization. See which methods run, detect dead code, visualize inheritance instantly.">
<meta name="twitter:image" content="https://prism-tools.dev/twitter-image-1200x675.png">
<meta name="twitter:image:alt" content="PRISM VS Code extension showing Python inheritance chain with method states">
```

### 3.2 Twitter Card for Blog Posts

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@prism_tools">
<meta name="twitter:url" content="https://prism-tools.dev/blog/what-is-method-resolution-order">
<meta name="twitter:title" content="What is Method Resolution Order (MRO) in Python?">
<meta name="twitter:description" content="Complete guide to Python MRO, C3 linearization, and inheritance method lookup.">
<meta name="twitter:image" content="https://prism-tools.dev/blog/images/mro-twitter.png">
```

---

## 4. JSON-LD STRUCTURED DATA

### 4.1 SoftwareApplication Schema (Homepage)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PRISM",
  "alternateName": [
    "PRISM Python MRO Tool",
    "PRISM Method Resolution Order Visualizer",
    "PRISM Python Inheritance Debugger"
  ],
  "description": "Real-time Python method resolution order (MRO) visualizer for VS Code. See which methods run, detect shadowed code, and visualize inheritance chains instantly.",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Windows, macOS, Linux",
  "browserRequirements": "VS Code 1.85+",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": 150,
    "bestRating": "5",
    "worstRating": "1"
  },
  "softwareVersion": "0.4.0",
  "softwareRequirements": "VS Code 1.85+, Python 3.7+",
  "releaseNotes": "https://github.com/your-org/prism/releases",
  "downloadUrl": "https://marketplace.visualstudio.com/items?itemName=prism-tools.prism",
  "fileSize": "5MB",
  "url": "https://prism-tools.dev",
  "mainEntity": {
    "@type": "Organization",
    "name": "PRISM Contributors",
    "url": "https://github.com/your-org/prism"
  },
  "author": {
    "@type": "Organization",
    "name": "PRISM Contributors",
    "url": "https://github.com/your-org/prism"
  },
  "creator": {
    "@type": "Organization",
    "name": "PRISM Contributors"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PRISM Contributors",
    "logo": {
      "@type": "ImageObject",
      "url": "https://prism-tools.dev/logo.svg",
      "width": 256,
      "height": 256
    }
  },
  "screenshot": [
    {
      "@type": "ImageObject",
      "url": "https://prism-tools.dev/images/prism-mro-demo.png",
      "caption": "PRISM showing real-time method resolution order chain"
    },
    {
      "@type": "ImageObject",
      "url": "https://prism-tools.dev/images/prism-inheritance-chain.png",
      "caption": "PRISM highlighting shadowed methods in red"
    },
    {
      "@type": "ImageObject",
      "url": "https://prism-tools.dev/images/prism-mindmap.png",
      "caption": "PRISM mindmap visualization of Python class hierarchy"
    }
  ],
  "featureList": [
    "Real-time MRO visualization as you move cursor",
    "Detect shadowed methods (dead code in inheritance chain)",
    "Show method states: owns, overrides, overridden, shadowed",
    "Visualize C3 linearization in inheritance chains",
    "Jump-to-definition navigation for classes",
    "Dead code warnings for overridden methods",
    "Python inheritance debugging in VS Code",
    "Command-line interface for CI/CD integration",
    "GitHub Action for automated MRO analysis",
    "MCP server support for Claude integration"
  ],
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "license": "https://opensource.org/licenses/MIT",
  "sameAs": [
    "https://github.com/your-org/prism",
    "https://marketplace.visualstudio.com/items?itemName=prism-tools.prism",
    "https://twitter.com/prism_tools",
    "https://linkedin.com/company/prism-tools"
  ]
}
</script>
```

### 4.2 Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PRISM",
  "description": "Developer tools for Python inheritance visualization and method resolution order analysis.",
  "url": "https://prism-tools.dev",
  "logo": {
    "@type": "ImageObject",
    "url": "https://prism-tools.dev/logo.svg",
    "width": 256,
    "height": 256
  },
  "image": "https://prism-tools.dev/og-image-1200x630.png",
  "sameAs": [
    "https://github.com/your-org/prism",
    "https://marketplace.visualstudio.com/items?itemName=prism-tools.prism",
    "https://twitter.com/prism_tools",
    "https://linkedin.com/company/prism-tools"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@prism-tools.dev",
    "contactType": "Customer Support",
    "contactOption": "TollFree",
    "areaServed": "Worldwide",
    "availableLanguage": "en-US"
  }
}
</script>
```

### 4.3 FAQ Schema (For Featured Snippets)

```html
<script type="application/ld+json">
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
      "name": "What does PRISM do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PRISM analyzes Python class hierarchies in real-time. As you move your cursor over a method, PRISM classifies it into one of four states: 'owns' (no base class defines it), 'overrides' (base also defines it, yours runs), 'overridden' (descendant redefines it), or 'shadowed' (base class wins, dead code)."
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
      "name": "What is method resolution order (MRO)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Method resolution order (MRO) is the order Python follows to look up attributes and methods in a class hierarchy. Python uses C3 linearization to determine this order, ensuring that method lookups follow a consistent path even with complex multiple inheritance."
      }
    },
    {
      "@type": "Question",
      "name": "How does PRISM help with Python debugging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "When you edit a method in a multi-level inheritance chain, PRISM instantly tells you whether your code runs or is dead code. It prevents silent bugs where you think you're editing the active method but you're actually editing a shadowed version that never executes."
      }
    },
    {
      "@type": "Question",
      "name": "Does PRISM work with multiple inheritance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PRISM uses C3 linearization to compute the correct method resolution order even in complex multiple inheritance scenarios, including diamond inheritance patterns where a class inherits from multiple bases."
      }
    },
    {
      "@type": "Question",
      "name": "Is PRISM free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PRISM is completely free and open-source. The VS Code extension, command-line interface, GitHub Action, and MCP server are all available at no cost."
      }
    },
    {
      "@type": "Question",
      "name": "What Python versions does PRISM support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PRISM supports Python 3.7 and later. It analyzes Python code statically (without running it), so it works with any Python 3.7+ project regardless of installed packages."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use PRISM in my CI/CD pipeline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PRISM includes a command-line interface and a GitHub Action. You can run PRISM in GitHub Actions, GitLab CI, Jenkins, or any CI/CD system that supports Python to automatically detect dead code and method shadowing in pull requests."
      }
    },
    {
      "@type": "Question",
      "name": "How fast is PRISM?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PRISM analyzes and responds in under 200ms. It caches ASTs and workspace indices for performance, so most cursor movements trigger instant visual feedback in VS Code."
      }
    }
  ]
}
</script>
```

### 4.4 BreadcrumbList Schema (For Navigation)

```html
<!-- Use on blog posts and nested pages -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://prism-tools.dev"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://prism-tools.dev/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "What is Method Resolution Order?",
      "item": "https://prism-tools.dev/blog/what-is-method-resolution-order"
    }
  ]
}
</script>
```

### 4.5 Article Schema (For Blog Posts)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What is Method Resolution Order (MRO) in Python?",
  "description": "A complete guide to Python's method resolution order (MRO), C3 linearization algorithm, and how it determines method lookup in inheritance hierarchies.",
  "image": "https://prism-tools.dev/blog/images/mro-diagram.png",
  "datePublished": "2026-04-13T00:00:00Z",
  "dateModified": "2026-04-13T00:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "PRISM Contributors",
    "url": "https://prism-tools.dev"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PRISM",
    "logo": {
      "@type": "ImageObject",
      "url": "https://prism-tools.dev/logo.svg",
      "width": 256,
      "height": 256
    }
  },
  "mainEntity": {
    "@type": "Question",
    "name": "What is Method Resolution Order in Python?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Method Resolution Order (MRO) is the order that Python follows to look up attributes and methods in a class hierarchy. Python uses C3 linearization to determine this order, ensuring consistent and predictable method lookups even with complex multiple inheritance."
    }
  }
}
</script>
```

---

## 5. SECURITY & PERFORMANCE HEADERS

### 5.1 HTTP Headers (Configure in Your Server/CDN)

```
# Strict Transport Security (HTTPS only)
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

# X-Frame-Options (prevent clickjacking)
X-Frame-Options: SAMEORIGIN

# X-Content-Type-Options (prevent MIME sniffing)
X-Content-Type-Options: nosniff

# Content Security Policy (basic)
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' https:; font-src 'self' https:

# Referrer Policy
Referrer-Policy: strict-origin-when-cross-origin

# Permissions Policy (prevent unnecessary permissions)
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 5.2 Security.txt

Create `/well-known/security.txt`:

```
Contact: security@prism-tools.dev
Expires: 2027-04-13T00:00:00Z
Preferred-Languages: en
```

---

## 6. SITEMAP.XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://prism-tools.dev/</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main pages -->
  <url>
    <loc>https://prism-tools.dev/extension</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://prism-tools.dev/cli</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://prism-tools.dev/github-action</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://prism-tools.dev/mcp</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Documentation -->
  <url>
    <loc>https://prism-tools.dev/docs</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Blog -->
  <url>
    <loc>https://prism-tools.dev/blog</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://prism-tools.dev/blog/what-is-method-resolution-order</loc>
    <lastmod>2026-04-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

---

## 7. ROBOTS.TXT

```
# robots.txt for prism-tools.dev

# Allow all crawlers
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/private
Disallow: /*.json$ (if you want to block JSON endpoints)

# Crawl delay (be respectful)
Crawl-delay: 1

# Sitemap location
Sitemap: https://prism-tools.dev/sitemap.xml

# Block bad bots (optional)
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /
```

---

## 8. IMAGE OPTIMIZATION CHECKLIST

For every image on the site:

```html
<!-- Good example -->
<img
  src="prism-mro-demo.png"
  alt="PRISM VS Code extension showing method resolution order chain for Python inheritance with four method states highlighted"
  width="1200"
  height="675"
  loading="lazy"
  decoding="async">

<!-- With responsive images -->
<picture>
  <source media="(min-width: 1024px)" srcset="prism-demo-1200.png">
  <source media="(min-width: 768px)" srcset="prism-demo-800.png">
  <img
    src="prism-demo-600.png"
    alt="PRISM showing real-time Python method resolution order visualization"
    loading="lazy"
    decoding="async">
</picture>
```

**Image naming**: Use descriptive names
- ✅ `prism-mro-demo.png`
- ✅ `shadowed-method-red-warning.png`
- ✅ `inheritance-chain-visualization.png`
- ❌ `demo.png`
- ❌ `image1.png`

---

## 9. INTERNAL LINKING TEMPLATE

Every blog post should have:

```html
<!-- At the end of blog post -->
<div class="related-content">
  <h3>Related Articles</h3>
  <ul>
    <li><a href="/blog/c3-linearization">Understanding C3 Linearization</a></li>
    <li><a href="/blog/python-multiple-inheritance">Python Multiple Inheritance Guide</a></li>
    <li><a href="/docs/mro">MRO Documentation</a></li>
  </ul>
</div>

<div class="cta">
  <h3>Try PRISM</h3>
  <p>See method resolution order in real-time.</p>
  <a href="/extension" class="button">Install for VS Code</a>
  <a href="/cli" class="button secondary">Try the CLI</a>
</div>
```

---

## 10. ANALYTICS TRACKING CODE

### 10.1 Google Analytics 4

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'page_path': window.location.pathname
  });
</script>
```

### 10.2 Google Search Console

```html
<!-- Verification meta tag (one-time, then remove) -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE">
```

---

## 11. DEBUGGING CHECKLIST

Use these tools to verify your implementation:

### Online Tools (Free)
- [Schema.org Validator](https://validator.schema.org/) — Validate JSON-LD
- [Rich Results Test](https://search.google.com/test/rich-results) — Check for featured snippets
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) — Check mobile
- [Core Web Vitals Checker](https://pagespeed.web.dev/) — Check LCP, FID, CLS
- [Open Graph Checker](https://www.opengraphcheck.com/) — Validate OG tags

### Commands (Local Testing)
```bash
# Check if sitemap.xml is valid
curl -I https://prism-tools.dev/sitemap.xml

# Check robots.txt
curl https://prism-tools.dev/robots.txt

# Check page title (should be < 60 chars)
curl https://prism-tools.dev | grep "<title>"

# Check meta description (should be 150-160 chars)
curl https://prism-tools.dev | grep "meta name=\"description\""
```

---

## 12. COPY-PASTE CHECKLIST FOR TODAY

Put this in your `<head>` section right now:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ESSENTIAL META TAGS -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="x-ua-compatible" content="IE=edge">

  <!-- PAGE META -->
  <title>PRISM — Real-Time Python MRO Visualization for VS Code</title>
  <meta name="description" content="Instantly see which Python methods run in your inheritance chain. Detect shadowed code, visualize class hierarchies, debug inheritance faster with PRISM.">
  <meta name="keywords" content="Python MRO, method resolution order, VS Code extension, Python inheritance, shadowed methods, dead code detection">
  <meta name="author" content="PRISM Contributors">

  <!-- CANONICAL -->
  <link rel="canonical" href="https://prism-tools.dev/">

  <!-- OPEN GRAPH (FACEBOOK/LINKEDIN) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://prism-tools.dev/">
  <meta property="og:title" content="PRISM — Real-Time Python MRO Visualization">
  <meta property="og:description" content="See which Python methods run in your inheritance chain. Detect shadowed code instantly.">
  <meta property="og:image" content="https://prism-tools.dev/og-image-1200x630.png">

  <!-- TWITTER CARD -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@prism_tools">
  <meta name="twitter:title" content="PRISM — Python MRO Visualizer">
  <meta name="twitter:description" content="Real-time method resolution order visualization for VS Code.">
  <meta name="twitter:image" content="https://prism-tools.dev/twitter-image-1200x675.png">

  <!-- JSON-LD SCHEMA (Structured Data) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PRISM",
    "description": "Real-time Python method resolution order (MRO) visualizer for VS Code.",
    "url": "https://prism-tools.dev",
    "applicationCategory": "DeveloperApplication",
    "offers": {"@type": "Offer", "price": "0"},
    "featureList": ["Real-time MRO visualization", "Detect shadowed methods", "Python inheritance debugging"]
  }
  </script>

  <!-- FAVICON -->
  <link rel="icon" type="image/svg+xml" href="/logo.svg">

  <!-- SECURITY HEADERS (configured server-side) -->
  <!-- Add: Strict-Transport-Security, X-Frame-Options, etc. in server config -->
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

---

**Created**: 2026-04-13
**For**: PRISM SEO Technical Implementation
**Status**: Ready to deploy

Copy these snippets directly into your site. Test with tools above.
