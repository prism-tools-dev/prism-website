import Link from "next/link";
import { IconGitHub, IconLinkedIn, IconVSCode, IconCursor } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-mono text-sm font-bold tracking-wider text-text">
              PRISM
            </span>
            <p className="mt-3 text-sm text-text-3 leading-relaxed">
              Know exactly which version of a method actually runs.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-text-3 mb-4">
              Product
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/features" className="text-sm text-text-2 hover:text-text transition-colors">Features</Link>
              <Link href="/suite" className="text-sm text-text-2 hover:text-text transition-colors">Suite</Link>
              <Link href="/changelog" className="text-sm text-text-2 hover:text-text transition-colors">Changelog</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-text-3 mb-4">
              Resources
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/blog" className="text-sm text-text-2 hover:text-text transition-colors">Blog</Link>
              <a href="https://github.com/temilola23" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-text-2 hover:text-text transition-colors"><IconGitHub size={14} />GitHub</a>
              <a href="https://linkedin.com/in/temilola-olowolayemo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-text-2 hover:text-text transition-colors"><IconLinkedIn size={14} />LinkedIn</a>
              <Link href="/about" className="text-sm text-text-2 hover:text-text transition-colors">About</Link>
            </div>
          </div>

          {/* Install */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-text-3 mb-4">
              Install
            </h4>
            <div className="flex flex-col gap-2">
              <a href="https://marketplace.visualstudio.com/items?itemName=TemilolaOlowolayemo.prism-vscode" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-text-2 hover:text-text transition-colors"><IconVSCode size={14} />VS Code</a>
              <a href="https://open-vsx.org/extension/TemilolaOlowolayemo/prism-vscode" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-text-2 hover:text-text transition-colors"><IconCursor size={14} />Cursor / Open VSX</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-3">
            &copy; {new Date().getFullYear()} Temilola Olowolayemo
          </p>
          <p className="font-mono text-xs text-text-3">
            Built with obsessive attention to method resolution order.
          </p>
        </div>
      </div>
    </footer>
  );
}
