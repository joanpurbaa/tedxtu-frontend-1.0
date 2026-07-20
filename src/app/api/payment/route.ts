import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const orderId = form.get("orderId") as string;
  const paymentName = form.get("paymentName") as string;
  const file = form.get("file") as File | null;

  if (!orderId || !paymentName || !file) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${bytes.toString("base64")}`;

  await prisma.ticket.update({
    where: { orderId },
    data: { paymentName, proofUrl: base64 },
  });

  return NextResponse.json({ ok: true });
}
