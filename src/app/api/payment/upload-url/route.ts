import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { issueSignedToken, presignUrl } from "@vercel/blob";
import {
  ALLOWED_MIME_TYPES,
  MAX_SIZE_BYTES,
  proofPathname,
} from "@/lib/paymentProof";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
  const fileName = typeof body.fileName === "string" ? body.fileName.trim() : "";
  const fileType = typeof body.fileType === "string" ? body.fileType.toLowerCase() : "";
  const fileSize = typeof body.fileSize === "number" ? body.fileSize : NaN;

  if (!orderId || !fileName) {
    return NextResponse.json({ error: "Missing required fields: orderId, fileName" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.includes(fileType)) {
    return NextResponse.json(
      { error: "Only JPG/JPEG or PNG files are allowed" },
      { status: 400 },
    );
  }

  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File size must not exceed 4 MB" },
      { status: 400 },
    );
  }

  const ticket = await prisma.ticket.findUnique({ where: { orderId } });
  if (!ticket) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const pathname = proofPathname(orderId, fileType);
  if (!pathname) {
    return NextResponse.json(
      { error: "Unsupported file type" },
      { status: 400 },
    );
  }

  const signed = await issueSignedToken({
    pathname,
    operations: ["put"],
    allowedContentTypes: ALLOWED_MIME_TYPES,
    maximumSizeInBytes: MAX_SIZE_BYTES,
    validUntil: Date.now() + 10 * 60 * 1000,
  });

  const { presignedUrl } = await presignUrl(
    {
      clientSigningToken: signed.clientSigningToken,
      delegationToken: signed.delegationToken,
    },
    {
      operation: "put",
      pathname,
      access: "public",
      validUntil: Date.now() + 10 * 60 * 1000,
      allowedContentTypes: ALLOWED_MIME_TYPES,
      maximumSizeInBytes: MAX_SIZE_BYTES,
      allowOverwrite: true,
      addRandomSuffix: false,
    },
  );

  return NextResponse.json({ orderId, uploadUrl: presignedUrl });
}
