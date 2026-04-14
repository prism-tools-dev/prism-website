// Pre-computed PRISM analysis results for the interactive playground.
// These mirror the exact JSON contract the extension produces.

export type Status = "owns" | "overrides" | "overridden" | "shadowed";

export interface MethodInfo {
  name: string;
  defined_in: string;
  effective_class: string;
  status: Status;
}

export interface MROEntry {
  name: string;
  file: string;
  line: number;
}

export interface AnalysisResult {
  cursor_class: string;
  cursor_method: string | null;
  cursor_status: Status | null;
  effective_class: string | null;
  mro_chain: MROEntry[];
  methods: MethodInfo[];
  signal: string;
}

// --- Source files shown in the editor ---

export interface SourceLine {
  code: string;          // raw text
  tokens: Token[];       // syntax-highlighted spans
  clickable?: string;    // scenario key if this line is interactive
}

export interface Token {
  text: string;
  type?: "kw" | "fn" | "cls" | "str" | "arg" | "cmt" | "dec" | "num";
}

function t(text: string, type?: Token["type"]): Token {
  return type ? { text, type } : { text };
}

export const files: Record<string, { name: string; lines: SourceLine[] }> = {
  "base.py": {
    name: "base.py",
    lines: [
      { code: "class DLEstimatorBase:", tokens: [t("class ", "kw"), t("DLEstimatorBase", "cls"), t(":")], clickable: "base:class" },
      { code: '    """Root trainer."""', tokens: [t('    '), t('"""Root trainer."""', "str")] },
      { code: "    def setup_dataloader(self):", tokens: [t("    "), t("def ", "kw"), t("setup_dataloader", "fn"), t("("), t("self", "arg"), t("):")], clickable: "base:setup_dataloader" },
      { code: '        return "base dataloader"', tokens: [t("        "), t("return ", "kw"), t('"base dataloader"', "str")] },
      { code: "", tokens: [] },
      { code: "    def configure_optimizers(self):", tokens: [t("    "), t("def ", "kw"), t("configure_optimizers", "fn"), t("("), t("self", "arg"), t("):")], clickable: "base:configure_optimizers" },
      { code: '        return "SGD"', tokens: [t("        "), t("return ", "kw"), t('"SGD"', "str")] },
      { code: "", tokens: [] },
      { code: "    def train(self):", tokens: [t("    "), t("def ", "kw"), t("train", "fn"), t("("), t("self", "arg"), t("):")], clickable: "base:train" },
      { code: '        return "training..."', tokens: [t("        "), t("return ", "kw"), t('"training..."', "str")] },
    ],
  },
  "lightning.py": {
    name: "lightning.py",
    lines: [
      { code: "from base import DLEstimatorBase", tokens: [t("from ", "kw"), t("base "), t("import ", "kw"), t("DLEstimatorBase", "cls")] },
      { code: "", tokens: [] },
      { code: "class LightningTrainer(DLEstimatorBase):", tokens: [t("class ", "kw"), t("LightningTrainer", "cls"), t("("), t("DLEstimatorBase", "cls"), t("):")], clickable: "lightning:class" },
      { code: '    """Lightning training loop."""', tokens: [t('    '), t('"""Lightning training loop."""', "str")] },
      { code: "    def configure_optimizers(self):", tokens: [t("    "), t("def ", "kw"), t("configure_optimizers", "fn"), t("("), t("self", "arg"), t("):")], clickable: "lightning:configure_optimizers" },
      { code: '        return "Adam via Lightning"', tokens: [t("        "), t("return ", "kw"), t('"Adam via Lightning"', "str")] },
    ],
  },
  "deepspeed.py": {
    name: "deepspeed.py",
    lines: [
      { code: "from lightning import LightningTrainer", tokens: [t("from ", "kw"), t("lightning "), t("import ", "kw"), t("LightningTrainer", "cls")] },
      { code: "", tokens: [] },
      { code: "class DeepSpeedEstimator(LightningTrainer):", tokens: [t("class ", "kw"), t("DeepSpeedEstimator", "cls"), t("("), t("LightningTrainer", "cls"), t("):")], clickable: "deepspeed:class" },
      { code: '    """Distributed training."""', tokens: [t('    '), t('"""Distributed training."""', "str")] },
      { code: "    def setup_dataloader(self):", tokens: [t("    "), t("def ", "kw"), t("setup_dataloader", "fn"), t("("), t("self", "arg"), t("):")], clickable: "deepspeed:setup_dataloader" },
      { code: '        return "deepspeed v2"', tokens: [t("        "), t("return ", "kw"), t('"deepspeed v2"', "str")] },
    ],
  },
};

// --- Pre-computed analysis results for each clickable line ---

export const scenarios: Record<string, AnalysisResult> = {
  // ── DLEstimatorBase ──────────────────────────────────
  "base:class": {
    cursor_class: "DLEstimatorBase",
    cursor_method: null,
    cursor_status: null,
    effective_class: null,
    mro_chain: [
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "DLEstimatorBase — root of the hierarchy.",
  },
  "base:setup_dataloader": {
    cursor_class: "DLEstimatorBase",
    cursor_method: "setup_dataloader",
    cursor_status: "overridden",
    effective_class: "DLEstimatorBase",
    mro_chain: [
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "Runs here, but DeepSpeedEstimator redefines setup_dataloader. Dead code for subclass instances.",
  },
  "base:configure_optimizers": {
    cursor_class: "DLEstimatorBase",
    cursor_method: "configure_optimizers",
    cursor_status: "overridden",
    effective_class: "DLEstimatorBase",
    mro_chain: [
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "Runs here, but LightningTrainer redefines configure_optimizers. Dead code for subclass instances.",
  },
  "base:train": {
    cursor_class: "DLEstimatorBase",
    cursor_method: "train",
    cursor_status: "owns",
    effective_class: "DLEstimatorBase",
    mro_chain: [
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "overridden" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "This method runs. No other class defines train.",
  },

  // ── LightningTrainer ─────────────────────────────────
  "lightning:class": {
    cursor_class: "LightningTrainer",
    cursor_method: null,
    cursor_status: null,
    effective_class: null,
    mro_chain: [
      { name: "LightningTrainer", file: "lightning.py", line: 3 },
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "configure_optimizers", defined_in: "LightningTrainer", effective_class: "LightningTrainer", status: "overrides" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "LightningTrainer", status: "shadowed" },
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "LightningTrainer extends DLEstimatorBase.",
  },
  "lightning:configure_optimizers": {
    cursor_class: "LightningTrainer",
    cursor_method: "configure_optimizers",
    cursor_status: "overrides",
    effective_class: "LightningTrainer",
    mro_chain: [
      { name: "LightningTrainer", file: "lightning.py", line: 3 },
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "configure_optimizers", defined_in: "LightningTrainer", effective_class: "LightningTrainer", status: "overrides" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "LightningTrainer", status: "shadowed" },
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "You override DLEstimatorBase.configure_optimizers. Your version runs.",
  },

  // ── DeepSpeedEstimator ───────────────────────────────
  "deepspeed:class": {
    cursor_class: "DeepSpeedEstimator",
    cursor_method: null,
    cursor_status: null,
    effective_class: null,
    mro_chain: [
      { name: "DeepSpeedEstimator", file: "deepspeed.py", line: 3 },
      { name: "LightningTrainer", file: "lightning.py", line: 3 },
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "setup_dataloader", defined_in: "DeepSpeedEstimator", effective_class: "DeepSpeedEstimator", status: "overrides" },
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DeepSpeedEstimator", status: "shadowed" },
      { name: "configure_optimizers", defined_in: "LightningTrainer", effective_class: "LightningTrainer", status: "overrides" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "LightningTrainer", status: "shadowed" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "DeepSpeedEstimator → LightningTrainer → DLEstimatorBase.",
  },
  "deepspeed:setup_dataloader": {
    cursor_class: "DeepSpeedEstimator",
    cursor_method: "setup_dataloader",
    cursor_status: "overrides",
    effective_class: "DeepSpeedEstimator",
    mro_chain: [
      { name: "DeepSpeedEstimator", file: "deepspeed.py", line: 3 },
      { name: "LightningTrainer", file: "lightning.py", line: 3 },
      { name: "DLEstimatorBase", file: "base.py", line: 1 },
    ],
    methods: [
      { name: "setup_dataloader", defined_in: "DeepSpeedEstimator", effective_class: "DeepSpeedEstimator", status: "overrides" },
      { name: "setup_dataloader", defined_in: "DLEstimatorBase", effective_class: "DeepSpeedEstimator", status: "shadowed" },
      { name: "configure_optimizers", defined_in: "LightningTrainer", effective_class: "LightningTrainer", status: "overrides" },
      { name: "configure_optimizers", defined_in: "DLEstimatorBase", effective_class: "LightningTrainer", status: "shadowed" },
      { name: "train", defined_in: "DLEstimatorBase", effective_class: "DLEstimatorBase", status: "owns" },
    ],
    signal: "You override DLEstimatorBase.setup_dataloader. Your version runs.",
  },
};

// Default scenario shown on load
export const defaultScenario = "deepspeed:setup_dataloader";
export const defaultFile = "deepspeed.py";

// --- Method location mapping (class.method → file:scenarioKey) ---

export interface MethodLocation {
  file: string;
  line: number;
  scenarioKey?: string;
}

export const methodLocations: Record<string, MethodLocation> = {
  "DLEstimatorBase.setup_dataloader":    { file: "base.py", line: 3, scenarioKey: "base:setup_dataloader" },
  "DLEstimatorBase.configure_optimizers": { file: "base.py", line: 6, scenarioKey: "base:configure_optimizers" },
  "DLEstimatorBase.train":               { file: "base.py", line: 9, scenarioKey: "base:train" },
  "LightningTrainer.configure_optimizers": { file: "lightning.py", line: 5, scenarioKey: "lightning:configure_optimizers" },
  "DeepSpeedEstimator.setup_dataloader": { file: "deepspeed.py", line: 5, scenarioKey: "deepspeed:setup_dataloader" },
};

export const classLocations: Record<string, MethodLocation> = {
  DLEstimatorBase:    { file: "base.py", line: 1, scenarioKey: "base:class" },
  LightningTrainer:   { file: "lightning.py", line: 3, scenarioKey: "lightning:class" },
  DeepSpeedEstimator: { file: "deepspeed.py", line: 3, scenarioKey: "deepspeed:class" },
};

// --- Workspace scan results ---

export interface ScanEntry {
  method: string;
  definedIn: string;
  file: string;
  line: number;
  status: Status;
  detail: string;
  scenarioKey?: string;
}

export type ScanMode = "dead" | "unique" | "conflicts" | "collisions";

export const scanResults: Record<ScanMode, { label: string; description: string; entries: ScanEntry[] }> = {
  dead: {
    label: "Dead / Overridden",
    description: "Methods that are shadowed or overridden downstream — dead code for some or all instances.",
    entries: [
      {
        method: "setup_dataloader",
        definedIn: "DLEstimatorBase",
        file: "base.py",
        line: 3,
        status: "overridden",
        detail: "Overridden by DeepSpeedEstimator. Dead code for subclass instances.",
        scenarioKey: "base:setup_dataloader",
      },
      {
        method: "configure_optimizers",
        definedIn: "DLEstimatorBase",
        file: "base.py",
        line: 6,
        status: "overridden",
        detail: "Overridden by LightningTrainer. Dead code for subclass instances.",
        scenarioKey: "base:configure_optimizers",
      },
    ],
  },
  unique: {
    label: "Unique Methods",
    description: "Methods defined in only one class — no overrides, no conflicts.",
    entries: [
      {
        method: "train",
        definedIn: "DLEstimatorBase",
        file: "base.py",
        line: 9,
        status: "owns",
        detail: "Only DLEstimatorBase defines train. No override in the hierarchy.",
        scenarioKey: "base:train",
      },
    ],
  },
  conflicts: {
    label: "MRO Conflicts",
    description: "Methods where the resolution order may surprise you — inherited from multiple paths.",
    entries: [
      {
        method: "configure_optimizers",
        definedIn: "LightningTrainer",
        file: "lightning.py",
        line: 5,
        status: "overrides",
        detail: "Overrides DLEstimatorBase.configure_optimizers. The base version is shadowed.",
        scenarioKey: "lightning:configure_optimizers",
      },
      {
        method: "setup_dataloader",
        definedIn: "DeepSpeedEstimator",
        file: "deepspeed.py",
        line: 5,
        status: "overrides",
        detail: "Overrides DLEstimatorBase.setup_dataloader. The base version is shadowed.",
        scenarioKey: "deepspeed:setup_dataloader",
      },
    ],
  },
  collisions: {
    label: "Name Collisions",
    description: "Same method name defined in multiple classes — potential confusion points.",
    entries: [
      {
        method: "setup_dataloader",
        definedIn: "DeepSpeedEstimator, DLEstimatorBase",
        file: "deepspeed.py",
        line: 5,
        status: "overrides",
        detail: "Defined in 2 classes. DeepSpeedEstimator wins for its instances.",
        scenarioKey: "deepspeed:setup_dataloader",
      },
      {
        method: "configure_optimizers",
        definedIn: "LightningTrainer, DLEstimatorBase",
        file: "lightning.py",
        line: 5,
        status: "overrides",
        detail: "Defined in 2 classes. LightningTrainer wins for its instances.",
        scenarioKey: "lightning:configure_optimizers",
      },
    ],
  },
};

// Status metadata
export const statusMeta: Record<Status, { label: string; color: string; bgClass: string; textClass: string; borderClass: string }> = {
  owns:       { label: "Owns",       color: "rgb(var(--prism-green))", bgClass: "bg-prism-green/10", textClass: "text-prism-green", borderClass: "border-prism-green/30" },
  overrides:  { label: "Overrides",  color: "rgb(var(--prism-amber))",  bgClass: "bg-prism-amber/10",  textClass: "text-prism-amber",  borderClass: "border-prism-amber/30" },
  overridden: { label: "Overridden", color: "rgb(var(--prism-purple))", bgClass: "bg-prism-purple/10", textClass: "text-prism-purple", borderClass: "border-prism-purple/30" },
  shadowed:   { label: "Shadowed",   color: "rgb(var(--prism-red))",    bgClass: "bg-prism-red/10",    textClass: "text-prism-red",    borderClass: "border-prism-red/30" },
};
