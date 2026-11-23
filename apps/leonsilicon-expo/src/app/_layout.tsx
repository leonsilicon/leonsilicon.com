import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WebInstallProvider } from "@leonsilicon/site/web-install";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <WebInstallProvider>
        <Slot />
      </WebInstallProvider>
    </SafeAreaProvider>
  );
}
