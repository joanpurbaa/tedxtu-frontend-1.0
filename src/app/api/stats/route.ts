import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [total, confirmed, pending, rejected, scanned, byTier] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({ where: { status: "CONFIRMED" } }),
    prisma.ticket.count({ where: { status: "PENDING" } }),
    prisma.ticket.count({ where: { status: "REJECTED" } }),
    prisma.ticket.count({ where: { scanned: true } }),
    prisma.ticket.groupBy({ by: ["tier"], _count: { tier: true } }),
  ]);

  return NextResponse.json({ total, confirmed, pending, rejected, scanned, byTier });
}
