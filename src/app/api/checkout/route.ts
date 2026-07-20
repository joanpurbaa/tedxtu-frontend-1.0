import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateOrderId() {
  return "TEDX-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.fullName || !body.email || !body.phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const ticket = await prisma.ticket.create({
    data: {
      orderId: generateOrderId(),
      fullName: body.fullName,
      nickname: body.nickname,
      email: body.email,
      phone: body.phone,
      participantStatus: body.participantStatus,
      studentId: body.studentId || null,
      faculty: body.faculty || null,
      institution: body.institution || null,
      major: body.major || null,
      tedFamiliarity: body.tedFamiliarity,
      topics: body.topics ?? [],
      musicLifestyle: body.musicLifestyle === "yes",
      environmentShapes: body.environmentShapes === "yes",
      artsExpression: body.artsExpression === "yes",
      eventAspect: body.eventAspect ?? [],
      consentAccurate: body.consentAccurate === "yes",
      consentDataProcessing: body.consentDataProcessing === "yes",
      consentUpdates: body.consentUpdates === "yes",
      tier: body.tier ?? "REGULAR",
      price: body.price ?? "",
    },
  });

  return NextResponse.json({ orderId: ticket.orderId });
}
