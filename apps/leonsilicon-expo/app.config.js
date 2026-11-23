const { version } = require("./package.json");

module.exports = {
  name: "Leon Si",
  slug: "leonsilicon",
  scheme: "leonsilicon",
  version,
  orientation: "default",
  userInterfaceStyle: "dark",
  icon: "./assets/icon.png",
  ios: {
    bundleIdentifier: "com.leonsilicon.portfolio",
    supportsTablet: true,
  },
  android: {
    package: "com.leonsilicon.portfolio",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#111126",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/icon.png",
  },
  plugins: ["expo-router"],
};
