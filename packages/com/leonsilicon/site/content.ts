export const site = {
  name: "Leon Si",
  domain: "leonsilicon.com",
  url: "https://leonsilicon.com",
  installUrl: "https://leonsilicon.com/install",
  github: "https://github.com/leonsilicon",
  email: "leon@leonsilicon.com",
  androidDownload:
    "https://github.com/leonsilicon/leonsilicon.com/releases/latest/download/leonsilicon.apk",
  tagline: "I build apps, developer tools, and open-source software.",
  bio: "I’m interested in making the tools we use every day easier to work with. That takes me from mobile apps to native modules to small utilities that solve one problem well.",
} as const;

export const projects = [
  {
    name: "Passthrough",
    category: "Mobile app",
    description:
      "Share your phone’s internet over USB and reach your Mac’s shell from anywhere.",
    url: "https://github.com/leonsilicon/passthrough",
    icon: "cable",
  },
  {
    name: "Zami",
    category: "Messaging",
    description: "An extensible Matrix chat client built with React Native.",
    url: "https://github.com/leonsilicon/Zami",
    icon: "message",
  },
  {
    name: "IndexedDB for React Native",
    category: "Developer library",
    description: "A persistent IndexedDB implementation backed by Expo SQLite.",
    url: "https://github.com/leonsilicon/react-native-indexeddb-sqlite",
    icon: "database",
  },
] as const;
