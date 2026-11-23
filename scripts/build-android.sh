#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
app="$root/apps/leonsilicon-expo"
output="$root/dist-android"
android_sdk="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
build_tools="${ANDROID_BUILD_TOOLS_VERSION:-37.0.0}"

: "${ANDROID_KEYSTORE:?Set ANDROID_KEYSTORE to the release signing keystore path}"
: "${ANDROID_KEY_ALIAS:?Set ANDROID_KEY_ALIAS to the release signing alias}"
: "${ANDROID_KEYSTORE_PASSWORD_FILE:?Set ANDROID_KEYSTORE_PASSWORD_FILE to the signing password file}"
: "${android_sdk:?Set ANDROID_HOME to the Android SDK path}"

if [[ -n "${JAVA_HOME:-}" ]]; then
  export PATH="$JAVA_HOME/bin:$PATH"
fi

apksigner="$android_sdk/build-tools/$build_tools/apksigner"
[[ -x "$apksigner" ]] || { echo "Missing Android build tools $build_tools" >&2; exit 1; }

cd "$app"
CI=1 bun x --no-install expo prebuild --platform android --clean --no-install
cd android
./gradlew :app:assembleRelease -PreactNativeArchitectures=arm64-v8a,armeabi-v7a,x86_64

mkdir -p "$output"
"$apksigner" sign \
  --ks "$ANDROID_KEYSTORE" --ks-key-alias "$ANDROID_KEY_ALIAS" \
  --ks-pass "file:$ANDROID_KEYSTORE_PASSWORD_FILE" \
  --out "$output/leonsilicon.apk" app/build/outputs/apk/release/app-release.apk
"$apksigner" verify --verbose "$output/leonsilicon.apk"
