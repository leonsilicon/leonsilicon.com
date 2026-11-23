import { Link } from "expo-router";
import { ArrowDownToLine, ArrowLeft, Check, Share, Smartphone } from "lucide-react";
import { site } from "./content";
import { InstallQr, SiteShell } from "./site-shell.web";
import { useWebInstall } from "./web-install.web";

export default function Install() {
  const { platform, installed, install } = useWebInstall();

  return (
    <SiteShell installPage>
      <title>Get the app · Leon Si</title>
      <meta name="description" content="Install Leon Si’s portfolio on Android or your iPhone home screen." />
      <link rel="canonical" href={site.installUrl} />
      <div className="install-page">
        <Link className="inline-link install-back" href="/"><ArrowLeft size={16} aria-hidden /> Back to home</Link>
        <div className="install-heading">
          <div>
            <h1>Get the app</h1>
            <p>Take my portfolio with you. It also works offline after the first visit.</p>
          </div>
          {platform === "other" && !installed && (
            <div className="install-qr">
              <InstallQr />
              <span>Scan with your phone</span>
            </div>
          )}
        </div>
        {installed && (
          <div className="installed-banner" role="status"><Check size={20} aria-hidden /> The web app is installed.</div>
        )}
        {install && !installed && (
          <button className="button button-primary web-install" type="button" onClick={install}>
            Install web app <ArrowDownToLine size={18} aria-hidden />
          </button>
        )}
        {!installed && (
          <div className="install-options">
            {(platform === "ios" ? ["ios", "android"] : ["android", "ios"]).map((option) =>
              option === "android"
                ? <AndroidOption key={option} showWebFallback={platform === "android" && !install} />
                : <IphoneOption key={option} />,
            )}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

function AndroidOption({ showWebFallback }: { showWebFallback: boolean }) {
  return (
    <section className="install-option" aria-labelledby="android-title">
      <span className="strip-icon"><ArrowDownToLine size={22} aria-hidden /></span>
      <h2 id="android-title">Android</h2>
      <p>Download the APK, open it, and follow the Android installation prompts. Your browser may ask you to allow app installs.</p>
      <a className="button button-primary" href={site.androidDownload}>
        Download APK <ArrowDownToLine size={18} aria-hidden />
      </a>
      {showWebFallback && <p className="android-web-fallback">For the web app, open Chrome’s menu and tap <strong>Add to Home screen</strong>.</p>}
    </section>
  );
}

function IphoneOption() {
  return (
    <section className="install-option" aria-labelledby="iphone-title">
      <span className="strip-icon"><Smartphone size={22} aria-hidden /></span>
      <h2 id="iphone-title">iPhone and iPad</h2>
      <ol>
        <li>Open this page in <strong>Safari</strong>.</li>
        <li>Tap <Share className="share-icon" size={16} aria-hidden /> <strong>Share</strong> (in the Page Menu if needed), then <strong>Add to Home Screen</strong>.</li>
        <li>Enable <strong>Open as Web App</strong> if shown, then tap <strong>Add</strong>.</li>
      </ol>
    </section>
  );
}
