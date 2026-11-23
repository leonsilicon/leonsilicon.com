import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

interface InstallPrompt extends Event {
  prompt(): Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Platform = "android" | "ios" | "other";

const InstallContext = createContext<{
  platform: Platform;
  installed: boolean;
  install?: () => Promise<void>;
}>({ platform: "other", installed: false });

export function WebInstallProvider({ children }: PropsWithChildren) {
  const [platform, setPlatform] = useState<Platform>("other");
  const [installed, setInstalled] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<InstallPrompt>();

  useEffect(() => {
    const { userAgent, maxTouchPoints } = navigator;
    if (/android/i.test(userAgent)) setPlatform("android");
    else if (/iPad|iPhone|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)) {
      setPlatform("ios");
    }

    const displayMode = window.matchMedia("(display-mode: standalone)");
    const updateMode = () =>
      setInstalled(displayMode.matches || Boolean(
        (navigator as Navigator & { standalone?: boolean }).standalone,
      ));
    updateMode();

    const capturePrompt = (event: Event) => {
      event.preventDefault();
      setPendingPrompt(event as InstallPrompt);
    };
    const handleInstalled = () => {
      setPendingPrompt(undefined);
      setInstalled(true);
    };
    displayMode.addEventListener("change", updateMode);
    window.addEventListener("beforeinstallprompt", capturePrompt);
    window.addEventListener("appinstalled", handleInstalled);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
        console.warn("Could not enable offline access", error);
      });
    }

    return () => {
      displayMode.removeEventListener("change", updateMode);
      window.removeEventListener("beforeinstallprompt", capturePrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = pendingPrompt
    ? async () => {
        setPendingPrompt(undefined);
        const result = await pendingPrompt.prompt().catch(() => undefined);
        if (result?.outcome === "accepted") setInstalled(true);
      }
    : undefined;

  return (
    <InstallContext.Provider value={{ platform, installed, install }}>
      {children}
    </InstallContext.Provider>
  );
}

export function useWebInstall() {
  return useContext(InstallContext);
}
