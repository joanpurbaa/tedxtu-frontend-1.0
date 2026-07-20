import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateOrderId() {
  return "TEDX-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export async function POST(req: NextRequest) {
  const { fullName, email, phone, tier, price } = await req.json();

  if (!fullName || !email || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const ticket = await prisma.ticket.create({
    data: {
      orderId: generateOrderId(),
      fullName,
      email,
      phone,
      tier: tier ?? "REGULAR",
      price: price ?? "",
    },
  });

  return NextResponse.json({ orderId: ticket.orderId });
}
