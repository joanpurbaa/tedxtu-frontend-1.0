import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isValidProofUrl } from "@/lib/paymentProof";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const orderId = typeof body.orderId === "string" ? body.orderId.trim() : "";
  const paymentName = typeof body.paymentName === "string" ? body.paymentName.trim() : "";
  const proofUrl = typeof body.proofUrl === "string" ? body.proofUrl.trim() : "";

  if (!orderId || !proofUrl) {
    return NextResponse.json({ error: "Missing required fields: orderId, proofUrl" }, { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({ where: { orderId } });
  if (!ticket) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (!isValidProofUrl(orderId, proofUrl)) {
    return NextResponse.json(
      { error: "Proof URL must be a valid Vercel Blob URL for this order" },
      { status: 400 },
    );
  }

  const proofData = {
    ...(paymentName ? { paymentName } : {}),
    proofUrl,
  };

  // Satu pembayaran untuk satu bundle: bukti juga dihubungkan ke seluruh
  // tiket anggota dalam grup yang sama sehingga jumlah terbitut sesuai
  // (stok dihitung per orang).
  if (ticket.bundleGroupId) {
    await prisma.ticket.updateMany({
      where: { bundleGroupId: ticket.bundleGroupId },
      data: proofData,
    });
  } else {
    const updated = await prisma.ticket.update({
      where: { orderId },
      data: proofData,
    });
    return NextResponse.json({ ok: true, orderId: updated.orderId });
  }

  return NextResponse.json({ ok: true, orderId: ticket.orderId });
}
