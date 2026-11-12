import fs from "node:fs";
import path from "node:path";

// Downloads already-generated managed assets into client/public/images so the
// site works from the dev port, Preview and the published static build alike.
const API_URL = (process.env.MANUS_API_URL || "").replace(/\/+$/, "");
const API_KEY = process.env.MANUS_API_KEY || "";

const KEYS = {
  "hero-community.webp": "async-images/VOdoEBjJ8GlDD1nuWyzGoO/image-1.webp",
  "hero-watershed.webp": "async-images/VOdoEBjJ8GlDD1nuWyzGoO/image-2.webp",
  "hero-learning.webp": "async-images/VOdoEBjJ8GlDD1nuWyzGoO/image-3.webp",
  "story-public-space.webp": "async-images/VOdoEBjJ8GlDD1nuWyzGoO/image-4.webp",
  "story-farming.webp": "async-images/VOdoEBjJ8GlDD1nuWyzGoO/image-5.webp",
  "story-market.webp": "async-images/zY3XBTH3GK0aewlUpQtXTX/image-1.webp",
  "story-health.webp": "async-images/zY3XBTH3GK0aewlUpQtXTX/image-2.webp",
  "about-values.webp": "async-images/zY3XBTH3GK0aewlUpQtXTX/image-3.webp",
  "get-involved.webp": "async-images/zY3XBTH3GK0aewlUpQtXTX/image-4.webp",
  "story-youth.webp": "async-images/zY3XBTH3GK0aewlUpQtXTX/image-5.webp",
};

const outDir = path.resolve(import.meta.dirname, "../client/public/images");
fs.mkdirSync(outDir, { recursive: true });

if (!API_URL || !API_KEY) {
  console.error("MANUS_API_URL / MANUS_API_KEY missing");
  process.exit(1);
}

let failures = 0;

for (const [fileName, key] of Object.entries(KEYS)) {
  const target = path.join(outDir, fileName);
  try {
    const presign = new URL("v1/storage/presign/get", API_URL + "/");
    presign.searchParams.set("path", key);
    const res = await fetch(presign, { headers: { Authorization: `Bearer ${API_KEY}` } });
    if (!res.ok) throw new Error(`presign ${res.status}: ${(await res.text()).slice(0, 160)}`);
    const { url } = await res.json();
    if (!url) throw new Error("empty presign url");

    const bytes = await fetch(url);
    if (!bytes.ok) throw new Error(`download ${bytes.status}`);
    const buf = Buffer.from(await bytes.arrayBuffer());

    const type = buf.subarray(0, 12).toString("latin1");
    const isImage = type.startsWith("RIFF") || type.startsWith("\xff\xd8");
    const stillRendering = buf.length < 20_000;

    if (!isImage || stillRendering) {
      console.warn(`PENDING ${fileName} bytes=${buf.length} header=${type.slice(0, 8)}`);
      failures += 1;
      continue;
    }

    fs.writeFileSync(target, buf);
    console.log(`OK ${fileName} ${(buf.length / 1024).toFixed(0)} KiB -> ${target}`);
  } catch (error) {
    console.warn(`FAILED ${fileName}: ${String(error).slice(0, 200)}`);
    failures += 1;
  }
}

console.log(failures === 0 ? "ALL IMAGES DOWNLOADED" : `${failures} image(s) not ready`);
process.exit(failures === 0 ? 0 : 2);
