import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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
  const ext = file.name.split(".").pop();
  const filename = `${orderId}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), bytes);

  await prisma.ticket.update({
    where: { orderId },
    data: { paymentName, proofUrl: `/uploads/${filename}` },
  });

  return NextResponse.json({ ok: true });
}
