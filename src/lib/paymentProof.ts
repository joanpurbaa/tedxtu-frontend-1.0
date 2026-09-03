import { createHmac } from "node:crypto";

export const MAX_SIZE_BYTES = 4 * 1024 * 1024;
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];
export const BLOB_HOST_SUFFIX = "public.blob.vercel-storage.com";

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
};

function pathSecret(): string {
  return process.env.BLOB_READ_WRITE_TOKEN || "payment-proof-path-secret";
}

function randomSegment(orderId: string): string {
  return createHmac("sha256", pathSecret()).update(orderId).digest("hex").slice(0, 16);
}

export function proofPathname(
  orderId: string,
  fileType: string,
): string | null {
  const ext = MIME_EXTENSIONS[fileType];
  if (!ext) return null;
  return `proofs/${randomSegment(orderId)}-${orderId}.${ext}`;
}

export function isValidProofUrl(orderId: string, proofUrl: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(proofUrl);
  } catch {
    return false;
  }

  if (parsed.protocol !== "https:") return false;
  if (!parsed.hostname.endsWith(`.${BLOB_HOST_SUFFIX}`)) return false;

  const seg = randomSegment(orderId);
  const raw = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");
  return (
    raw === `proofs/${seg}-${orderId}.jpg` ||
    raw === `proofs/${seg}-${orderId}.png`
  );
}
