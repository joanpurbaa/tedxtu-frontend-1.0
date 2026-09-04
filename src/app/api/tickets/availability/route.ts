import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const confirmedByTier = await prisma.ticket.groupBy({
    by: ["tier"],
    where: { status: "CONFIRMED" },
    _count: { tier: true },
  });

  const soldByTier: Record<string, number> = {};
  for (const row of confirmedByTier) {
    soldByTier[row.tier] = row._count.tier;
  }

  return NextResponse.json({ confirmed: soldByTier });
}
