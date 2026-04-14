"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/features", label: "Features" },
  { href: "/suite", label: "Suite" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-wider text-text hover:text-prism-green transition-colors"
        >
          PRISM
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-wide text-text-3 hover:text-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href="https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs border border-border-2 px-3 py-1.5 text-text hover:border-prism-green hover:text-prism-green transition-colors"
          >
            Install
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden font-mono text-xs text-text-3 hover:text-text"
          aria-label="Toggle menu"
        >
          {open ? "[×]" : "[≡]"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-text-3 hover:text-text"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <a
              href="https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm border border-border-2 px-3 py-2 text-text hover:border-prism-green hover:text-prism-green transition-colors inline-block w-fit"
            >
              Install for VS Code
            </a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
