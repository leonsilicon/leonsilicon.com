# Leon Si

A personal portfolio for [leonsilicon.com](https://leonsilicon.com), built with Expo Router. Visitors can scan the homepage QR code to open [the install page](https://leonsilicon.com/install), download a signed Android APK, or add the offline-capable web app to their iPhone or iPad home screen.

## Layout

| Path | Purpose |
| --- | --- |
| `apps/leonsilicon-expo` | Expo shell, file-based routes, platform configuration, and static web assets |
| `packages/com/leonsilicon/site` | Shared portfolio content and platform-specific screens |
| `scripts` | Web export, QR generation, offline cache, and Android release build |

The Bun workspace, thin `apps/*-expo/src/app` routes, and reverse-domain package namespace follow Haniverse’s layout.

## Development

Use Bun 1.4.4 and Node.js 22.13 or newer.

```sh
bun install --frozen-lockfile
bun run dev
bun run typecheck
bun run build
```

The web export writes `dist/`. The deployment must serve `/install` with `install.html` and expose the manifest and service worker at the site root. The Cloudflare Workers static assets configuration serves those routes. The QR is generated from `site.installUrl` in the shared content package.

## Release

1. Set the release version in `apps/leonsilicon-expo/package.json` and increment Android’s `versionCode` in `app.config.js`.
2. Run the type check, build the web export, then build the APK with `bun run build:android`. The Android build requires Java 17 and Android SDK Platform 37, Build Tools 37.0.0, and NDK 27.1.12297006. Set `ANDROID_HOME`, `ANDROID_KEYSTORE`, `ANDROID_KEY_ALIAS`, and `ANDROID_KEYSTORE_PASSWORD_FILE`. Keep the same signing key for updates.
3. Commit and push the source. Create a GitHub release for the version tag with `dist-android/leonsilicon.apk` attached under the name `leonsilicon.apk`.
4. Deploy the web build with `bunx wrangler deploy`. Confirm the install page and the release APK are publicly reachable.

## Artwork

The [processor image](packages/com/leonsilicon/site/assets/processor.webp) was generated with the built-in ImageGen tool.

> Landscape 4:3 premium website hero image. Photoreal studio 3D still life of a single translucent violet and cobalt glass processor cube on a stepped circuit-board base. Isometric three-quarter front angle, luminous beveled glass edges and a glowing inner core, very dark midnight indigo blueprint-grid background, tightly controlled lavender reflections. Object large and centered with generous breathing room. No text, logo, or watermarks.
