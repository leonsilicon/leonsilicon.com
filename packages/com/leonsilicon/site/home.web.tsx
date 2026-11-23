import { Asset } from "expo-asset";

import { Link } from "expo-router";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Cable, Database, GitFork, Mail,
  MessagesSquare, Smartphone,
} from "lucide-react";
import { projects, site } from "./content";
import { InstallQr, SiteShell } from "./site-shell.web";
import { useWebInstall } from "./web-install.web";

const processor = Asset.fromModule(require("./assets/processor.webp")).uri;
const projectIcons = { cable: Cable, database: Database, message: MessagesSquare };

export default function Home() {
  const { installed } = useWebInstall();
  return (
    <SiteShell>
      <title>Leon Si · Software Developer</title>
      <meta name="description" content={site.tagline} />
      <meta property="og:title" content="Leon Si · Software Developer" />
      <meta property="og:description" content={site.tagline} />
      <link rel="canonical" href={site.url} />

      <section className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> Software developer</p>
          <h1 id="intro-title">Hi, I’m<br /><span>Leon Si.</span></h1>
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
                <span className={`project-icon project-${project.icon}`}><Icon size={21} aria-hidden /></span>
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
