import "./site.css";

import { Link } from "expo-router";
import { ArrowUpRight, Mail, Smartphone, Terminal } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "./content";

export function SiteShell({ children, installPage = false }: {
  children: ReactNode;
  installPage?: boolean;
}) {
  return (
    <div className="site">
      <header className="site-header">
        <div className="wrap header-inner">
          <Link className="brand" href="/" aria-label="Leon Si home">
            <span className="brand-mark"><Terminal size={19} aria-hidden /></span>
            <span>leon<span className="brand-accent">silicon</span></span>
          </Link>
          <nav aria-label="Main">
            <a href="/#work">Work</a>
            <a href="/#about">About</a>
            <Link className="nav-app" href="/install" aria-current={installPage ? "page" : undefined}>
              <Smartphone size={15} aria-hidden />
              <span>Get the app</span>
            </Link>
          </nav>
        </div>
      </header>
      <main id="main" className="wrap">{children}</main>
      <footer className="wrap site-footer">
        <span>© {site.name}</span>
        <div className="footer-links">
          <a href={site.github}>GitHub <ArrowUpRight size={14} aria-hidden /></a>
          <a href={`mailto:${site.email}`}><Mail size={15} aria-hidden /> Email</a>
        </div>
      </footer>
    </div>
  );
}

export function InstallQr() {
  return (
    <Link href="/install" className="qr-link" aria-label="Open the app installation page">
      <img src="/install-qr.png" alt="" width="104" height="104" />
    </Link>
  );
}
