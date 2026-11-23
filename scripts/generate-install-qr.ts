import { join } from "node:path";
import QRCode from "qrcode";
import { site } from "../packages/com/leonsilicon/site/content";

const publicDirectory = join(import.meta.dir, "../apps/leonsilicon-expo/public");
await QRCode.toFile(join(publicDirectory, "install-qr.png"), site.installUrl, {
  margin: 4,
  scale: 10,
  errorCorrectionLevel: "M",
  color: { dark: "#000000", light: "#ffffff" },
});
