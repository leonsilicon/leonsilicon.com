import { Asset } from "expo-asset";

import { Link } from "expo-router";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Cable, Database, GitFork, Mail,
  MessagesSquare, Smartphone,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { projects, site } from "./content";
import { InstallQr, SiteShell } from "./site-shell.web";
import { useWebInstall } from "./web-install.web";

const processor = Asset.fromModule(require("./assets/processor.webp")).uri;
const projectIcons = { cable: Cable, database: Database, message: MessagesSquare };
const keyword = "silicon";
const revealKey = "portfolio-revealed";

export default function Home() {
  const [revealed, setRevealed] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  const reveal = useCallback(() => {
    setRevealed(true);
    try {
      sessionStorage.setItem(revealKey, "true");
    } catch {
      // The reveal still works when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    try {
      setRevealed(sessionStorage.getItem(revealKey) === "true");
    } catch {
      // Start on the minimal page when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (revealed) {
      heading.current?.focus({ preventScroll: true });
      return;
    }

    let typed = "";
    function handleKey(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]")) return;
      if (event.key === "Backspace") typed = typed.slice(0, -1);
      if (event.key.length !== 1) return;
      typed = (typed + event.key.toLowerCase()).slice(-keyword.length);
      if (typed === keyword) reveal();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [reveal, revealed]);

  return (
    <>
      <title>Leon Si</title>
      <meta name="description" content={site.tagline} />
      <link rel="canonical" href={site.url} />
      {revealed ? (
        <Portfolio heading={heading} />
      ) : (
        <main className="landing">
          <h1>{site.name}</h1>
          <input
            className="keyword-input"
            type="text"
            aria-label="Type a word"
            placeholder="Type here"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => {
              if (event.currentTarget.value.trim().toLowerCase() === keyword) reveal();
            }}
          />
        </main>
      )}
    </>
  );
}

function Portfolio({ heading }: { heading: RefObject<HTMLHeadingElement | null> }) {
  const { installed } = useWebInstall();
  return (
    <SiteShell>
      <section className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">Software developer</p>
          <h1 id="intro-title" ref={heading} tabIndex={-1}>Hi, I’m<br />Leon Si.</h1>
          <p className="intro">{site.tagline}</p>
          <div className="actions">
            <a className="button button-primary" href="#work">
              View my work <ArrowDown size={17} aria-hidden />
            </a>
            <a className="button button-secondary" href={site.github}>
              <GitFork size={17} aria-hidden /> GitHub <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src={processor} alt="" fetchPriority="high" />
        </div>
      </section>

      {!installed && (
        <section className="app-strip" aria-labelledby="app-title">
          <div className="strip-icon"><Smartphone size={25} strokeWidth={1.7} aria-hidden /></div>
          <div className="strip-copy">
            <h2 id="app-title">Get the app</h2>
            <p>Scan the QR code with your phone, or open the install page.</p>
            <Link className="inline-link" href="/install">
              Install on your phone <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <InstallQr />
        </section>
      )}

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected work</h2>
          <a className="inline-link" href={site.github}>
            All on GitHub <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
        <div className="project-grid">
          {projects.map((project) => {
            const Icon = projectIcons[project.icon];
            return (
              <a className="project-card" href={project.url} key={project.name}>
                <span className="project-icon"><Icon size={21} aria-hidden /></span>
                <ArrowUpRight className="project-arrow" size={19} aria-hidden />
                <span className="project-category">{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div>
          <h2 id="about-title">About me</h2>
          <p>{site.bio}</p>
        </div>
        <a className="button button-secondary" href={`mailto:${site.email}`}>
          <Mail size={18} aria-hidden /> Get in touch <ArrowUpRight size={15} aria-hidden />
        </a>
      </section>
    </SiteShell>
  );
}
