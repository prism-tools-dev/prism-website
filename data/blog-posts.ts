// Blog post data for all PRISM blog posts.
// Each post is a structured object with typed sections for rendering.

export interface BlogSection {
  type: "paragraph" | "heading" | "code" | "diagram" | "list" | "callout";
  content: string;
  language?: string; // for code blocks
  level?: 2 | 3;    // for headings
  items?: string[];  // for lists
  variant?: "info" | "warning" | "insight"; // for callouts
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  // ──────────────────────────────────────────────────────
  // Dead Code You Can't See
  // ──────────────────────────────────────────────────────
  {
    slug: "dead-code-you-cant-see",
    title: "Dead Code You Can't See",
    date: "April 14, 2026",
    readTime: "8 min read",
    excerpt: "Your codebase probably has methods that compile, pass lint, and never execute. Here's why.",
    tags: ["Python", "Dead Code", "Tooling"],
    sections: [
      {
        type: "paragraph",
        content: "You probably have dead code in your codebase right now. Not the obvious kind. Not unused imports or unreachable branches after an early return. The kind that looks completely normal, compiles fine, and passes every check your editor throws at it. But when your application runs, Python never touches it.",
      },
      {
        type: "heading",
        content: "What it looks like",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Here's a simplified version of something you'd see in any large Python project:",
      },
      {
        type: "code",
        content: "# base.py\nclass BaseProcessor:\n    def validate(self, data):\n        if not isinstance(data, dict):\n            raise TypeError(\"Expected dict\")\n        return data\n\n    def process(self, data):\n        validated = self.validate(data)\n        return self.transform(validated)\n\n# enhanced.py\nclass EnhancedProcessor(BaseProcessor):\n    def validate(self, data):\n        data = super().validate(data)\n        if \"version\" not in data:\n            raise ValueError(\"Missing version field\")\n        return data",
        language: "python",
      },
      {
        type: "paragraph",
        content: "If EnhancedProcessor is what gets instantiated at runtime, editing BaseProcessor.validate still has an effect: it changes the behavior of super().validate(data) inside EnhancedProcessor. That's fine.",
      },
      {
        type: "paragraph",
        content: "But say there's a third class, ProductionProcessor(EnhancedProcessor), that also defines validate. Now EnhancedProcessor.validate is dead code for ProductionProcessor instances. Your edits to EnhancedProcessor's validation logic do nothing in production.",
      },
      {
        type: "heading",
        content: "Why your linter won't catch this",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Linters check syntax, style, and (in mypy's case) type correctness. They don't compute the method resolution order across your class hierarchy. Python 3.12 introduced the @override decorator, which mypy can verify, but it only tells you whether a method is an override. It doesn't tell you that a method is shadowed by something three levels away in the chain.",
      },
      {
        type: "paragraph",
        content: "\"Go to Definition\" in your editor shows you where a method is defined. It doesn't tell you which definition Python will actually call for a given instance type. That's a question about the MRO, and no standard editor feature answers it.",
      },
      {
        type: "heading",
        content: "Why your tests might miss it too",
        level: 2,
      },
      {
        type: "paragraph",
        content: "This is the sneaky part. Say you write a test for BaseProcessor.validate:",
      },
      {
        type: "code",
        content: "def test_base_validate_rejects_non_dict():\n    proc = BaseProcessor()\n    with pytest.raises(TypeError):\n        proc.validate(\"not a dict\")",
        language: "python",
      },
      {
        type: "paragraph",
        content: "This test passes. But it only exercises BaseProcessor when BaseProcessor is instantiated directly. In your actual application, if EnhancedProcessor or ProductionProcessor is the class being created, BaseProcessor.validate might never be the version that runs. Your test covers code that's dead in production.",
      },
      {
        type: "callout",
        content: "Tests that directly instantiate base classes can create false confidence. The method \"works,\" but only for an instance type that production never creates.",
        variant: "warning",
      },
      {
        type: "heading",
        content: "The cost adds up",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Method shadowing isn't usually a single dramatic bug. It's a slow accumulation of wasted effort:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Debugging a \"fix\" applied to a shadowed method. The code looks correct, the test passes, but the bug persists because the running version lives in a different class.",
          "Adding defensive checks to a method that another class already overrides. You're duplicating logic the framework handles upstream.",
          "Code review cycles spent discussing code that never executes. Nobody in the review knows it's dead, so everybody treats it as live.",
        ],
      },
      {
        type: "paragraph",
        content: "In a codebase with deep inheritance (five, six, seven levels), these situations are common and hard to spot by reading code alone. You'd have to trace the MRO manually or instrument the runtime with logging.",
      },
      {
        type: "heading",
        content: "Finding it with workspace scanning",
        level: 2,
      },
      {
        type: "paragraph",
        content: "PRISM's workspace scan walks every class in your project and checks the method resolution status across the full hierarchy. It categorizes each method into one of four states: owns (unique to this class), overrides (wins over a base), overridden (wins here but a descendant redefines it), and shadowed (a base class version wins).",
      },
      {
        type: "diagram",
        content: "Workspace scan results (overridden mode):\n\n  BaseProcessor.validate\n    overridden by EnhancedProcessor.validate\n    File: src/base.py:12\n\n  EnhancedProcessor.validate\n    overridden by ProductionProcessor.validate\n    File: src/enhanced.py:8\n\n  BaseProcessor.process\n    overridden by ProductionProcessor.process\n    File: src/base.py:18\n\n  Found: 3 overridden methods across 4 classes",
      },
      {
        type: "paragraph",
        content: "Each result links back to the source file. Click through to see the full MRO chain and understand which version wins. No print statements, no runtime instrumentation.",
      },
      {
        type: "heading",
        content: "What to do about it",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Not all dead code is a bug. Sometimes a base class method exists as a default, and subclasses are expected to override it. The point isn't to eliminate every override. It's to know about them. If you're spending time editing or debugging a method, you should know upfront whether that method actually runs for the instances your code creates.",
      },
      {
        type: "paragraph",
        content: "Run a workspace scan. If nothing surprises you, great. If something does, you just saved yourself an afternoon.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // The Diamond Problem, Demystified
  // ──────────────────────────────────────────────────────
  {
    slug: "the-diamond-problem-demystified",
    title: "The Diamond Problem, Demystified",
    date: "April 12, 2026",
    readTime: "10 min read",
    excerpt: "Multiple inheritance creates diamonds. Here's how Python resolves them, step by step.",
    tags: ["Python", "MRO", "Inheritance"],
    sections: [
      {
        type: "paragraph",
        content: "If you've written a class that inherits from two parents, you've created a potential diamond. If those two parents share a common ancestor, the diamond is real, and Python has to decide: when your class calls a method, which version runs? The answer depends on the method resolution order, and the algorithm Python uses to compute it is more subtle than most developers expect.",
      },
      {
        type: "heading",
        content: "The shape of the problem",
        level: 2,
      },
      {
        type: "diagram",
        content: "         A\n        / \\\n       B   C\n        \\ /\n         D\n\n  class D(B, C): pass\n  class B(A): pass\n  class C(A): pass\n\n  When D calls a method defined in A, B, and C,\n  which one runs?",
      },
      {
        type: "paragraph",
        content: "The \"diamond\" refers to the shape of the inheritance graph. D inherits from both B and C. Both B and C inherit from A. When D looks up a method, there are multiple paths to A, and potentially multiple definitions along the way.",
      },
      {
        type: "paragraph",
        content: "This isn't a corner case. It shows up in real frameworks. GUI toolkits, ORM systems, ML pipelines. Any codebase that uses mixins or multiple inheritance to compose behavior will eventually produce diamonds.",
      },
      {
        type: "heading",
        content: "Why depth-first search fails",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Before Python 2.3, method resolution used a simple depth-first left-to-right traversal. For the diamond above, that produced:",
      },
      {
        type: "code",
        content: "DFS order: D -> B -> A -> C -> A\n\nProblem: A appears before C.\nA method defined in A would be found before\na method defined in C, even though C is a\ndirect parent of D.",
        language: "text",
      },
      {
        type: "paragraph",
        content: "That breaks the intuition that a direct parent should take priority over a grandparent. If B and C both override a method from A, the DFS order finds B's version (correct, since B is listed first) but then finds A's version before C's. So A's version shadows C's, which is wrong. C is more specific than A.",
      },
      {
        type: "heading",
        content: "C3 linearization",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Python 2.3 switched to C3 linearization, an algorithm that guarantees three properties:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Children come before parents. D always appears before B, C, and A.",
          "Left-to-right order is preserved. If you write class D(B, C), then B comes before C.",
          "No class appears twice. The algorithm finds a single consistent ordering or rejects the hierarchy entirely.",
        ],
      },
      {
        type: "paragraph",
        content: "The algorithm computes the MRO recursively and merges the results. For a class C with bases B1, B2:",
      },
      {
        type: "code",
        content: "MRO(C) = C + merge(MRO(B1), MRO(B2), [B1, B2])\n\nThe merge procedure:\n  1. Look at the first element of each list.\n  2. Pick one that doesn't appear in the tail\n     of any other list.\n  3. Add it to the result, remove it from all lists.\n  4. Repeat until all lists are empty.\n  5. If no valid pick exists, the hierarchy\n     is inconsistent.",
        language: "text",
      },
      {
        type: "heading",
        content: "Walking through the diamond",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Let's trace it for class D(B, C) where B(A) and C(A):",
      },
      {
        type: "code",
        content: "MRO(A) = [A]\nMRO(B) = [B, A]\nMRO(C) = [C, A]\n\nMRO(D) = D + merge([B, A], [C, A], [B, C])\n\nStep 1: Heads are B, C, B.\n  Is B in the tail of any list?\n  Tails: [A], [A], [C]. No.\n  Select B. Remove from all lists.\n  Remaining: merge([A], [C, A], [C])\n\nStep 2: Heads are A, C, C.\n  Is A in the tail of any list?\n  Tail of [C, A] is [A]. Yes! Blocked.\n  Try C instead.\n  Is C in the tail of any list?\n  Tails: [], [A], []. No.\n  Select C. Remove from all lists.\n  Remaining: merge([A], [A], [])\n\nStep 3: Head is A.\n  Not in any tail. Select A.\n\nResult: [D, B, C, A]",
        language: "text",
      },
      {
        type: "paragraph",
        content: "A appears only once, at the end. Both B and C get checked before A. And B comes before C because that's the order declared in class D(B, C). This is the correct, intuitive order.",
      },
      {
        type: "heading",
        content: "When C3 says no",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Not every hierarchy has a valid C3 linearization. Consider:",
      },
      {
        type: "code",
        content: "class A: pass\nclass B(A): pass\nclass C(A, B): pass  # Puts A before B\n\n# This raises:\n# TypeError: Cannot create a consistent method\n# resolution order (MRO) for bases A, B",
        language: "python",
      },
      {
        type: "paragraph",
        content: "The problem: C declares A before B, but B is a subclass of A. C3 requires that children come before parents, which means B should come before A. But C's declaration puts A first. These constraints contradict each other, so Python refuses to create the class.",
      },
      {
        type: "paragraph",
        content: "This is a feature, not a limitation. A silent wrong ordering would be far worse than a loud error at class creation time. If you hit this, the fix is usually to reorder the bases to match the inheritance relationships.",
      },
      {
        type: "heading",
        content: "Where you actually encounter diamonds",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Diamonds appear more often than you'd expect:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Mixin composition: class MyView(AuthMixin, LoggingMixin, BaseView). If both mixins inherit from BaseView or a shared base, there's your diamond.",
          "Framework extension: Django's class-based views use cooperative multiple inheritance heavily. A typical view might have four or five bases that all converge on View.",
          "ML pipelines: Distributed training estimators that inherit from both a model base and a hardware-specific mixin, both sharing a common configuration interface.",
        ],
      },
      {
        type: "paragraph",
        content: "In these cases, the MRO determines which version of a method runs. If you add a validate() method to a mixin and the base view also defines validate(), the MRO picks the winner. The answer depends on the order of bases in every class declaration across the chain.",
      },
      {
        type: "heading",
        content: "Making it visible",
        level: 2,
      },
      {
        type: "paragraph",
        content: "The reason the diamond problem causes real bugs is that the resolution is invisible. Nothing in your editor shows you the computed MRO. Nothing highlights that your validate() method is shadowed by a mixin declared earlier in someone else's class.",
      },
      {
        type: "paragraph",
        content: "You can check the MRO in a REPL (MyClass.__mro__), but that requires importing the class, which means running the code. PRISM computes it statically from source. No imports, no execution, no side effects.",
      },
      {
        type: "paragraph",
        content: "If you work with multiple inheritance, try this: add a print(YourClass.__mro__) somewhere in your project and look at the actual resolution order. Chances are it'll surprise you at least once. That surprise is the kind of thing that turns into a bug at 2 AM on a Friday.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // Why Your Method Might Not Run
  // ──────────────────────────────────────────────────────
  {
    slug: "why-your-method-might-not-run",
    title: "Why Your Method Might Not Run",
    date: "April 10, 2026",
    readTime: "12 min read",
    excerpt: "Understanding method resolution order and why the version you're editing might be dead code.",
    tags: ["Python", "MRO", "Inheritance"],
    sections: [
      {
        type: "paragraph",
        content: "You open a Python file, navigate to a method, and start editing. The syntax is valid. The linter is quiet. But when you run your tests, your changes have no effect. The method you're editing is dead code, shadowed by another class in the inheritance chain.",
      },
      {
        type: "heading",
        content: "The setup: a training pipeline",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Consider a deep learning codebase with three classes in an inheritance chain:",
      },
      {
        type: "code",
        content: "# base.py\nclass DLEstimatorBase:\n    def setup_dataloader(self):\n        return \"base dataloader\"\n\n    def configure_optimizers(self):\n        return \"SGD\"\n\n    def train(self):\n        return \"training...\"",
        language: "python",
      },
      {
        type: "code",
        content: "# lightning.py\nfrom base import DLEstimatorBase\n\nclass LightningTrainer(DLEstimatorBase):\n    def configure_optimizers(self):\n        return \"Adam via Lightning\"",
        language: "python",
      },
      {
        type: "code",
        content: "# deepspeed.py\nfrom lightning import LightningTrainer\n\nclass DeepSpeedEstimator(LightningTrainer):\n    def setup_dataloader(self):\n        return \"deepspeed dataloader v2\"",
        language: "python",
      },
      {
        type: "paragraph",
        content: "If you're editing DLEstimatorBase.configure_optimizers, your changes will never execute when LightningTrainer (or any of its subclasses) is instantiated. LightningTrainer's version shadows the base. This is not a bug. It's how Python's method resolution order works.",
      },
      {
        type: "heading",
        content: "How Python resolves methods: C3 linearization",
        level: 2,
      },
      {
        type: "paragraph",
        content: "When you call estimator.configure_optimizers(), Python doesn't just look at the instance's class. It walks the entire Method Resolution Order (MRO), a deterministic sequence of classes computed at class creation time, and returns the first match.",
      },
      {
        type: "paragraph",
        content: "Python uses the C3 linearization algorithm, introduced in Python 2.3 to replace the older depth-first left-to-right search. C3 guarantees three properties:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Monotonicity: If class A comes before class B in the MRO of class C, then A comes before B in the MRO of any subclass of C.",
          "Local precedence order: The order in which base classes are listed in the class definition is preserved.",
          "Extended precedence graph consistency: If the constraints conflict, Python raises a TypeError at class creation time rather than silently producing a wrong order.",
        ],
      },
      {
        type: "heading",
        content: "The C3 algorithm, step by step",
        level: 3,
      },
      {
        type: "paragraph",
        content: "C3 linearization computes the MRO recursively. For a class C with bases B1, B2, ...:",
      },
      {
        type: "code",
        content: "MRO(C) = C + merge(MRO(B1), MRO(B2), ..., [B1, B2, ...])\n\nmerge works as follows:\n  1. Take the head (first element) of the first non-empty list.\n  2. If that head does not appear in the tail of ANY other list,\n     select it: add it to the result and remove it from all lists.\n  3. If it does appear in a tail, skip to the next list and try its head.\n  4. Repeat until all lists are empty.\n  5. If no valid head can be found, the hierarchy is inconsistent.",
        language: "text",
      },
      {
        type: "paragraph",
        content: "For our DeepSpeedEstimator example:",
      },
      {
        type: "code",
        content: "MRO(DeepSpeedEstimator)\n= DeepSpeedEstimator + merge(\n    MRO(LightningTrainer),\n    [LightningTrainer]\n  )\n= DeepSpeedEstimator + merge(\n    [LightningTrainer, DLEstimatorBase],\n    [LightningTrainer]\n  )\n\nStep 1: Head of first list = LightningTrainer\n  Not in tail of any list? Tails: [], []\n  Yes -> select LightningTrainer\n\nStep 2: Head of first list = DLEstimatorBase\n  Not in tail of any list? Tails are empty\n  Yes -> select DLEstimatorBase\n\nResult: [DeepSpeedEstimator, LightningTrainer, DLEstimatorBase]",
        language: "text",
      },
      {
        type: "callout",
        content: "You can verify this in a Python REPL: DeepSpeedEstimator.__mro__ returns the same order. PRISM computes it from source using its own C3 implementation, without importing your code.",
        variant: "info",
      },
      {
        type: "heading",
        content: "The diamond problem",
        level: 2,
      },
      {
        type: "paragraph",
        content: "C3 linearization matters most with multiple inheritance. Consider:",
      },
      {
        type: "code",
        content: "class A:\n    def method(self): return \"A\"\n\nclass B(A):\n    def method(self): return \"B\"\n\nclass C(A):\n    def method(self): return \"C\"\n\nclass D(B, C):\n    pass\n\n# D.__mro__ = [D, B, C, A]\n# D().method() returns \"B\"",
        language: "python",
      },
      {
        type: "paragraph",
        content: "Without C3, a naive depth-first search would visit D -> B -> A -> C -> A, hitting A before C. That breaks the intuition that C, being a direct base, should be checked before A (a grandparent). C3 correctly produces [D, B, C, A], ensuring every class appears exactly once and local precedence is preserved.",
      },
      {
        type: "paragraph",
        content: "In this diamond, if you're editing A.method, it's shadowed by both B and C. If you're editing C.method, it's shadowed by B (because D lists B first). These relationships are hard to see in large codebases, which is exactly the kind of thing a tool should surface.",
      },
      {
        type: "heading",
        content: "The four states of a method",
        level: 2,
      },
      {
        type: "paragraph",
        content: "PRISM classifies every method into one of four states based on the MRO analysis:",
      },
      {
        type: "diagram",
        content: "MRO chain: [DeepSpeedEstimator, LightningTrainer, DLEstimatorBase]\n\n  DeepSpeedEstimator          LightningTrainer           DLEstimatorBase\n  +--------------------+     +---------------------+    +---------------------+\n  | setup_dataloader   |     | configure_optimizers|    | setup_dataloader    |\n  | STATUS: overrides  |     | STATUS: overrides   |    | STATUS: shadowed    |\n  +--------------------+     +---------------------+    +---------------------+\n                                                        | configure_optimizers|\n                                                        | STATUS: shadowed    |\n                                                        +---------------------+\n                                                        | train               |\n                                                        | STATUS: owns        |\n                                                        +---------------------+",
      },
      {
        type: "list",
        content: "",
        items: [
          "Owns (green): DLEstimatorBase.train. Only one class defines it. It always runs.",
          "Overrides (amber): DeepSpeedEstimator.setup_dataloader. Wins over the base class version.",
          "Overridden (purple): A method that wins in its own MRO but is redefined by a descendant. Dead code for subclass instances.",
          "Shadowed (red): DLEstimatorBase.configure_optimizers. LightningTrainer's version wins. Dead code.",
        ],
      },
      {
        type: "heading",
        content: "Why existing tools miss this",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Python linters (pylint, flake8, mypy) check for syntax errors, type mismatches, and style violations. They don't compute the MRO at edit time. IDE features like \"Go to Definition\" and \"Find All References\" help you navigate, but they don't tell you whether the definition you're looking at is the one that actually executes.",
      },
      {
        type: "paragraph",
        content: "The information exists. Python computes the MRO at class creation. But it's only available at runtime. PRISM extracts it statically by parsing the AST, resolving the class hierarchy across files, and running C3 linearization from source. No imports, no execution, no side effects.",
      },
      {
        type: "heading",
        content: "Detection at the speed of thought",
        level: 2,
      },
      {
        type: "paragraph",
        content: "PRISM's analysis runs on every cursor movement. The full pipeline (AST parsing, hierarchy resolution, C3 linearization, status classification) completes in under 200 milliseconds. Fast enough that the panel updates feel instant, turning method resolution from an invisible runtime concept into something you can see and reason about as you code.",
      },
      {
        type: "paragraph",
        content: "The next time you're deep in an inheritance chain and wondering whether your edit will actually take effect, look at PRISM's signal bar. If it's red, you're editing dead code.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // Shipping Multi-Language Support
  // ──────────────────────────────────────────────────────
  {
    slug: "shipping-multi-language-support",
    title: "Shipping Multi-Language Support",
    date: "April 8, 2026",
    readTime: "10 min read",
    excerpt: "How we added 9 languages in one release using tree-sitter.",
    tags: ["Engineering", "Release"],
    sections: [
      {
        type: "paragraph",
        content: "PRISM started as a Python-only tool. The core problem (knowing whether the method you're editing actually runs) exists in every language with inheritance, but the original backend was built on Python's ast module. Extending it to 9 more languages in a single release required rethinking the parsing layer without blowing the 200ms performance budget.",
      },
      {
        type: "heading",
        content: "The problem with language-specific parsers",
        level: 2,
      },
      {
        type: "paragraph",
        content: "When we started planning multi-language support, the obvious approach was to build a parser for each language: Java with javaparser, TypeScript with the TS compiler API, C++ with libclang. Each would produce a class hierarchy that could feed into PRISM's existing resolution and status classification pipeline.",
      },
      {
        type: "paragraph",
        content: "This approach has a scaling problem. Each parser has its own build system, its own version dependencies, and its own quirks. The TS compiler API requires Node.js. libclang requires a C toolchain. Maintaining 10 different parser implementations would consume more engineering time than the actual analysis logic.",
      },
      {
        type: "heading",
        content: "Tree-sitter: one parser to rule them all",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Tree-sitter is a parser generator framework originally built by Max Brunsfeld at GitHub for syntax highlighting in Atom (now used in Zed, Neovim, Helix, and others). It generates fast, incremental parsers for any language from a grammar specification.",
      },
      {
        type: "paragraph",
        content: "Tree-sitter parsers produce concrete syntax trees (CSTs). They preserve every token, including whitespace and comments, and they never crash on invalid input. They just mark error nodes. For PRISM, tree-sitter offered three advantages:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Uniform API: Every language produces a tree with the same node traversal interface. Query patterns differ, but the infrastructure is shared.",
          "Speed: Tree-sitter parsers are compiled to C and operate in linear time. Parsing a 10,000-line file takes single-digit milliseconds.",
          "Error recovery: Partially written code (common during editing) still produces a usable tree. The parser doesn't bail on a missing semicolon.",
        ],
      },
      {
        type: "heading",
        content: "The extraction pattern",
        level: 2,
      },
      {
        type: "paragraph",
        content: "For each language, PRISM needs to extract three things from a source file: class definitions (name, line, base classes), method definitions (name, line, containing class), and import statements (to resolve cross-file references). We wrote a tree-sitter query for each language that captures these nodes.",
      },
      {
        type: "paragraph",
        content: "Here's what the TypeScript query looks like (simplified):",
      },
      {
        type: "code",
        content: ";; Match class declarations\n(class_declaration\n  name: (type_identifier) @class.name\n  (class_heritage\n    (extends_clause (identifier) @class.base))?)\n\n;; Match method definitions\n(method_definition\n  name: (property_identifier) @method.name)",
        language: "scheme",
      },
      {
        type: "paragraph",
        content: "The same pattern works for every language. The query syntax changes, but the output format is identical: a list of classes with their bases and methods. This feeds directly into PRISM's existing resolver and status classifier, which are language-agnostic.",
      },
      {
        type: "heading",
        content: "Language-specific resolution rules",
        level: 2,
      },
      {
        type: "paragraph",
        content: "While extraction is uniform, resolution rules differ by language. Python uses C3 linearization. Java uses single inheritance for classes (so the MRO is a simple chain) but allows multiple interface implementation with default methods. C++ uses C3-like linearization for virtual inheritance. Each language has edge cases:",
      },
      {
        type: "list",
        content: "",
        items: [
          "TypeScript/JavaScript: Prototype chain is single-inheritance, but mixin patterns (Object.assign, spread) create implicit multiple inheritance that tree-sitter can detect at the syntactic level.",
          "Java: Default methods in interfaces create diamond-like conflicts. The resolution rule is: class methods win over interface defaults, and more specific interfaces win over less specific ones.",
          "C++: Virtual inheritance changes the object layout and method resolution. PRISM tracks the virtual keyword to adjust the hierarchy.",
          "Go: No classical inheritance. Method resolution works through embedded structs (composition). PRISM treats embedded structs as bases.",
          "Ruby: Mixins via include/prepend create an MRO. prepend inserts before the class; include inserts after. PRISM handles both.",
        ],
      },
      {
        type: "heading",
        content: "Performance: staying under 200ms",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Adding 9 languages to the parser could have blown our performance budget. Tree-sitter helped by being fast, but the real savings came from the cache architecture. PRISM caches parsed ASTs by file modification time. Switching between languages doesn't invalidate the cache for other files. The workspace index is shared across languages but partitioned by file extension.",
      },
      {
        type: "paragraph",
        content: "In benchmarks on a mixed TypeScript/Python monorepo with 50,000 lines, cursor-move-to-panel-update averaged 87ms for Python files and 94ms for TypeScript files. Well within budget.",
      },
      {
        type: "heading",
        content: "The result",
        level: 2,
      },
      {
        type: "paragraph",
        content: "PRISM v0.3.0 shipped with support for Python, TypeScript, JavaScript, Java, Kotlin, C++, Go, C#, Ruby, and Scala. Same four-state classification. Same sub-200ms analysis. Same UI. The tree-sitter approach turned what could have been months of per-language work into a pattern that each language could plug into.",
      },
      {
        type: "paragraph",
        content: "If you're building developer tools that need to parse multiple languages, consider tree-sitter. The upfront investment in learning the query language pays off fast when you realize you can add a new language in a day instead of a month.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // Why I Built PRISM
  // ──────────────────────────────────────────────────────
  {
    slug: "why-i-built-prism",
    title: "Why I Built PRISM",
    date: "April 6, 2026",
    readTime: "8 min read",
    excerpt: "An Uber internship debugging session that turned into a developer tool.",
    tags: ["Personal", "Origin Story"],
    sections: [
      {
        type: "paragraph",
        content: "The summer before my junior year, I interned at Uber on the ML Platform team. I was working on infrastructure that had to integrate with a large, mature ML framework. If you've worked on a codebase like that, you know what it means: deep class hierarchies, multiple inheritance, and layers of reliability and abstraction that have accumulated over years of iteration.",
      },
      {
        type: "heading",
        content: "The feedback that changed how I think about code",
        level: 2,
      },
      {
        type: "paragraph",
        content: "A few weeks in, I was in a debug session with my mentor and a couple of other engineers. I'd been writing new components for the framework and, wanting to write careful code, I had added input validation and defensive checks all over the place. Format verification, null guards, type assertions. What I thought was solid engineering practice.",
      },
      {
        type: "paragraph",
        content: "My mentor pulled up the class hierarchy and pointed something out: several of the methods I'd written were overriding implementations already defined in base classes further up the chain. The validation checks I was adding were already handled upstream. The framework guaranteed correct input format at a higher level. My checks were redundant at best and misleading at worst.",
      },
      {
        type: "paragraph",
        content: "The other part was the try-except problem. I had been gating everything in exception handlers because that felt like the responsible thing to do. When bugs came up, though, I couldn't tell which handler was catching what. I'd add more logging, more try-except blocks, more print statements. The codebase got noisier, not clearer. I was spending more time tracing execution paths than solving the actual problem.",
      },
      {
        type: "callout",
        content: "The code compiled fine. The linter was quiet. My editor showed no warnings. But I was writing redundant code that duplicated work the framework already did, and I had no way to see that without reading thousands of lines across dozens of files.",
        variant: "insight",
      },
      {
        type: "heading",
        content: "I started seeing this pattern everywhere",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Once I knew what to look for, it kept coming up. Methods that existed in a subclass but never ran because a base class version took priority. Defensive checks duplicated across multiple levels of a hierarchy. Override chains where nobody was sure which version actually executed for a given instance.",
      },
      {
        type: "paragraph",
        content: "This wasn't a skill issue. In a codebase with five, six, seven levels of inheritance and liberal use of multiple inheritance, no one holds the full resolution order in their head. You trace through the MRO manually or add print statements and run the code. Neither option scales.",
      },
      {
        type: "heading",
        content: "The question I couldn't let go of",
        level: 2,
      },
      {
        type: "paragraph",
        content: "After the internship, the problem kept nagging at me. What I had needed wasn't more logging or more try-except blocks. I needed to see, at a glance, which version of a method was going to run when the code executed. Was my version the one Python would call, or was something else in the chain taking priority?",
      },
      {
        type: "paragraph",
        content: "I started reading about method resolution across different languages. Python's C3 linearization. Java's interface default method rules. C++ virtual dispatch. Every language with inheritance has some version of this problem, and none of the developer tools I could find surfaced it while you were actually writing code.",
      },
      {
        type: "heading",
        content: "The 200ms constraint",
        level: 2,
      },
      {
        type: "paragraph",
        content: "I started prototyping during my junior year at Minerva. The core idea: parse the code statically, compute the MRO from source without running anything, and show the result in real time as the cursor moves.",
      },
      {
        type: "paragraph",
        content: "I set a hard constraint from day one. 200 milliseconds, from cursor move to panel update. A tool you have to run manually is a tool you forget to use. It had to feel instant. That constraint shaped every design decision: a persistent subprocess instead of spawning Python per request, AST caching keyed by file modification time, debounced cursor events to keep the backend from getting flooded.",
      },
      {
        type: "heading",
        content: "Four states, not two",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Early prototypes had a binary classification: \"runs\" or \"doesn't run.\" That wasn't enough. Testing against real codebases, I found four distinct situations:",
      },
      {
        type: "list",
        content: "",
        items: [
          "Owns: Only this class defines it. It runs.",
          "Overrides: A base class also defines it, but this version wins.",
          "Overridden: This version runs for direct instances, but a descendant class redefines it. Partially dead code.",
          "Shadowed: A base class's version wins. This code never runs.",
        ],
      },
      {
        type: "paragraph",
        content: "The distinction between \"overridden\" and \"shadowed\" matters because the fix is different. If your method is overridden, maybe that's intentional and you just need to be aware of it. If it's shadowed, you're writing dead code and should probably be editing a different file.",
      },
      {
        type: "heading",
        content: "Where PRISM is today",
        level: 2,
      },
      {
        type: "paragraph",
        content: "PRISM supports 10 languages, has workspace-wide dead code scanning, interactive graph visualization, and CodeLens annotations in the editor gutter. But at its core, it still answers the same question I had that summer: when your cursor is on a method, does that method actually run?",
      },
      {
        type: "paragraph",
        content: "Every feature traces back to that debug session. The scan modes, the radial view, the method status colors. I keep asking the same thing: what would have helped me that afternoon? What would have made the class hierarchy visible instead of something I had to reconstruct in my head?",
      },
      {
        type: "paragraph",
        content: "PRISM is the tool I wish I'd had on day one of that internship.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────
  // Building a Sub-200ms VS Code Extension
  // ──────────────────────────────────────────────────────
  {
    slug: "building-sub-200ms-vscode-extension",
    title: "Building a Sub-200ms VS Code Extension",
    date: "April 6, 2026",
    readTime: "14 min read",
    excerpt: "The architecture behind PRISM's real-time cursor tracking.",
    tags: ["Engineering", "Performance"],
    sections: [
      {
        type: "paragraph",
        content: "PRISM updates its analysis panel on every cursor movement. Not on save. Not on a keyboard shortcut. On every cursor movement. The full pipeline (identifying what class and method the cursor is in, resolving the inheritance hierarchy, computing the MRO, classifying method statuses) completes in under 200 milliseconds.",
      },
      {
        type: "heading",
        content: "The constraint that shapes everything",
        level: 2,
      },
      {
        type: "paragraph",
        content: "200 milliseconds is the threshold for perceived instantaneity in UI interactions. Research from the Nielsen Norman Group and Google's RAIL model both identify ~200ms as the upper bound for a response to feel \"immediate.\" Beyond that, users start to notice the delay. For a tool that fires on every cursor movement (potentially dozens of times per second when holding an arrow key), the analysis pipeline has to be fast enough that you never perceive it.",
      },
      {
        type: "paragraph",
        content: "This constraint drove three architectural decisions: a persistent subprocess, aggressive AST caching, and debounced cursor events.",
      },
      {
        type: "heading",
        content: "Decision 1: Persistent subprocess",
        level: 2,
      },
      {
        type: "paragraph",
        content: "PRISM's analysis engine is written in Python (to use Python's own ast module for parsing). The TypeScript extension communicates with it. Three options:",
      },
      {
        type: "list",
        content: "",
        items: [
          "HTTP server: Spawn a local HTTP server, send requests via fetch. Adds ~10-30ms per request for TCP setup, HTTP framing, and serialization on both sides.",
          "Per-request spawning: Spawn a new Python process for each cursor movement. Process startup (loading the interpreter, importing modules) takes 50-150ms. Already half the budget before any analysis starts.",
          "Persistent subprocess: Spawn one Python process on activation. Keep it alive. Send JSON lines to stdin, read JSON lines from stdout. No network overhead, no startup cost.",
        ],
      },
      {
        type: "paragraph",
        content: "The persistent subprocess wins on overhead: one write to stdin, one read from stdout, both through an OS pipe. Measured cost: roughly 1-2ms per round trip for the IPC itself.",
      },
      {
        type: "code",
        content: "// extension.ts\nconst backend = spawn(\"python3\", [\"analyze.py\"], {\n  cwd: backendDir,\n  stdio: [\"pipe\", \"pipe\", \"pipe\"],\n});\n\n// Send a request: one JSON line to stdin\nfunction sendRequest(payload: object) {\n  backend.stdin.write(JSON.stringify(payload) + \"\\n\");\n}\n\n// Read responses: buffer until newline, parse JSON\nlet buffer = \"\";\nbackend.stdout.on(\"data\", (chunk) => {\n  buffer += chunk.toString();\n  let idx;\n  while ((idx = buffer.indexOf(\"\\n\")) !== -1) {\n    const line = buffer.slice(0, idx);\n    buffer = buffer.slice(idx + 1);\n    handleResponse(JSON.parse(line));\n  }\n});",
        language: "typescript",
      },
      {
        type: "heading",
        content: "Decision 2: AST caching by mtime",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Parsing a Python file into an AST takes 5-15ms for a typical file (a few hundred lines) and can reach 50ms+ for large files. Since the user is moving their cursor, not editing, the file hasn't changed. Parsing the same file again is wasted work.",
      },
      {
        type: "paragraph",
        content: "PRISM maintains a module-level cache in the Python backend: a dictionary mapping file paths to (mtime, ast.Module) tuples. Before parsing, we check os.path.getmtime(). If it matches the cached mtime, we skip parsing entirely.",
      },
      {
        type: "code",
        content: "# analyze.py\n_ast_cache: dict[str, tuple[float, ast.Module]] = {}\n\ndef get_ast(file_path: str) -> ast.Module:\n    mtime = os.path.getmtime(file_path)\n    cached = _ast_cache.get(file_path)\n    if cached and cached[0] == mtime:\n        return cached[1]\n    with open(file_path) as f:\n        tree = ast.parse(f.read(), filename=file_path)\n    _ast_cache[file_path] = (mtime, tree)\n    return tree",
        language: "python",
      },
      {
        type: "paragraph",
        content: "On the first request, every file in the hierarchy gets parsed (one-time cost). On subsequent cursor movements in the same file, parsing is skipped for all cached files. The cache is invalidated per-file when the extension's file watcher detects a save.",
      },
      {
        type: "heading",
        content: "Decision 3: 80ms debounce",
        level: 2,
      },
      {
        type: "paragraph",
        content: "When a user holds an arrow key, VS Code fires onDidChangeTextEditorSelection many times per second. Sending a backend request for every event would flood the subprocess and waste cycles analyzing intermediate cursor positions the user has already moved past.",
      },
      {
        type: "paragraph",
        content: "PRISM debounces cursor events with an 80ms delay. When a selection change fires, we start a timer. If another change fires before the timer completes, we reset it. Only when the cursor is still for 80ms do we send the request. This reduces backend load by 10-20x during rapid cursor movement while keeping perceived latency low: 80ms debounce + <120ms analysis = <200ms total.",
      },
      {
        type: "heading",
        content: "The analysis pipeline: what happens in those 120ms",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Once a request reaches the Python backend, four modules execute in sequence:",
      },
      {
        type: "diagram",
        content: "Request JSON (file, line, col, workspace)\n        |\n        v\n  ast_parser.find_cursor_context()    ~2ms (cached) / ~10ms (cold)\n  -> class_name, base_names, methods\n        |\n        v\n  resolver.build_hierarchy()           ~5ms (cached) / ~40ms (cold)\n  -> { ClassName: { file, line, bases, methods } }\n        |\n        v\n  mro.compute_mro()                    ~1ms\n  -> [\"DeepSpeedEstimator\", \"LightningTrainer\", \"DLEstimatorBase\"]\n        |\n        v\n  shadow_detector.compute_statuses()   ~1ms\n  -> [{ name, defined_in, status: owns|overrides|shadowed }]\n        |\n        v\n  Response JSON -> stdout",
      },
      {
        type: "paragraph",
        content: "The cold path (first request, nothing cached) takes 50-80ms total. The warm path (cursor moving within the same hierarchy) takes 4-8ms. The debounce absorbs the difference: by the time the 80ms debounce fires, the cache is almost certainly warm.",
      },
      {
        type: "heading",
        content: "Workspace indexing: the resolver's secret weapon",
        level: 2,
      },
      {
        type: "paragraph",
        content: "The most expensive operation is resolver.build_hierarchy() on the cold path. It needs to find where each base class is defined, which means searching the workspace. Without an index, this requires scanning every .py file in the project.",
      },
      {
        type: "paragraph",
        content: "PRISM builds a workspace index on first request: a mapping from class name to (file, line) for every class in the workspace. This index is cached by workspace root and invalidated incrementally when files are saved, created, or deleted. The extension's file watcher sends invalidation messages to the subprocess:",
      },
      {
        type: "code",
        content: "// extension.ts\nconst watcher = vscode.workspace.createFileSystemWatcher(\"**/*.py\");\nwatcher.onDidChange((uri) => {\n  backend.stdin.write(\n    JSON.stringify({ type: \"invalidate\", file: uri.fsPath }) + \"\\n\"\n  );\n});",
        language: "typescript",
      },
      {
        type: "paragraph",
        content: "On the backend, an invalidation message removes the specific file from the AST cache and workspace index, so the next request re-parses only that file, not the entire workspace.",
      },
      {
        type: "heading",
        content: "Request IDs and stale response handling",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Because requests and responses are asynchronous (the backend might take 50ms to respond), fast cursor movement can produce out-of-order responses. If the user moves from line 10 to line 50 quickly, the response for line 10 might arrive after the response for line 50.",
      },
      {
        type: "paragraph",
        content: "PRISM solves this with monotonically increasing request IDs. Every request includes a request_id. The extension tracks the last sent ID. When a response arrives, it checks: is this response's ID equal to the last sent ID? If not, the response is stale and gets dropped. Only the most recent response is rendered.",
      },
      {
        type: "heading",
        content: "Measuring and monitoring",
        level: 2,
      },
      {
        type: "paragraph",
        content: "Every response includes timing data. The extension logs it to the PRISM output channel:",
      },
      {
        type: "code",
        content: "// Typical output channel entries:\n[PRISM] analysis: 6ms     (warm cache, simple hierarchy)\n[PRISM] analysis: 47ms    (cold cache, 4-level hierarchy)\n[PRISM] analysis: 183ms   (first request, workspace indexing)\n[PRISM] SLOW: 312ms       (very large file, deep hierarchy)",
        language: "text",
      },
      {
        type: "paragraph",
        content: "The SLOW threshold (>200ms) helps identify performance regressions. In practice, the only time we see >200ms is on the very first request in a large workspace, when the index is being built. After that, requests stay consistently under 50ms.",
      },
      {
        type: "heading",
        content: "The webview rendering budget",
        level: 2,
      },
      {
        type: "paragraph",
        content: "The 200ms budget includes rendering. After the TypeScript extension receives the JSON response, it posts a message to the webview panel. The webview's JavaScript handler reconstructs the DOM: signal bar, MRO chain cards, method pills. This rendering step takes 5-15ms for a typical response.",
      },
      {
        type: "paragraph",
        content: "We optimized this by avoiding full DOM rebuilds. The webview maintains a reference to each element and patches it incrementally. If only the cursor method changed (same class, same hierarchy), only the method pill highlighting is updated. The MRO chain cards are not redrawn.",
      },
      {
        type: "heading",
        content: "Lessons learned",
        level: 2,
      },
      {
        type: "list",
        content: "",
        items: [
          "Set a performance budget before writing code. 200ms shaped every decision. Without that budget, we would have built something slower and tried to optimize later, which rarely works.",
          "Cache at every layer. AST cache, workspace index, hierarchy cache. Each layer reduces the typical-path cost by an order of magnitude.",
          "Debounce aggressively. 80ms feels instant to the user but prevents 90% of unnecessary backend requests.",
          "Use request IDs to handle concurrency. Async communication needs a mechanism to drop stale responses.",
          "Measure everything. The output channel timing lets us catch regressions before users report them.",
        ],
      },
      {
        type: "paragraph",
        content: "If you're building a VS Code extension that needs real-time analysis, the persistent subprocess + cache + debounce pattern is a solid foundation. The per-request overhead is minimal, and the cache makes repeated queries nearly free.",
      },
    ],
  },
];

// Helper to look up a post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

// Get adjacent posts for prev/next navigation
export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const idx = blogPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? blogPosts[idx - 1] : null,
    next: idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null,
  };
}

// All slugs (for static generation)
export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
