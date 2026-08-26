import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const orderId = form.get("orderId") as string;
  const paymentName = form.get("paymentName") as string;
  const file = form.get("file") as File | null;

  if (!orderId || !paymentName || !file) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Always save paymentName first
  await prisma.ticket.update({
    where: { orderId },
    data: { paymentName },
  });

  // Try Vercel Blob first, fallback to base64
  let proofUrl: string;
  try {
    const ext = file.name.split(".").pop() || "jpg";
    const blob = await put(`proofs/${orderId}.${ext}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    proofUrl = blob.url;
  } catch {
    const bytes = Buffer.from(await file.arrayBuffer());
    proofUrl = `data:${file.type};base64,${bytes.toString("base64")}`;
  }

  await prisma.ticket.update({
    where: { orderId },
    data: { proofUrl },
  });

  return NextResponse.json({ ok: true });
}
