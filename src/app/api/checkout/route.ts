import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generateOrderId() {
    return 'TEDX-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.phone) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const data = {
        fullName: body.fullName,
        nickname: body.nickname,
        email: body.email,
        phone: body.phone,
        domisili: body.domisili || '',
        participantStatus: body.participantStatus,
        studentId: body.studentId || null,
        faculty: body.faculty || null,
        institution: body.institution || null,
        major: body.major || null,
        instagram: body.instagram || null,
        linkedin: body.linkedin || null,
        tedFamiliarity: body.tedFamiliarity,
        topics: body.topics ?? [],
        topicsOther: body.topicsOther || null,
        musicLifestyle: body.musicLifestyle ?? '',
        environmentShapes: body.environmentShapes ?? '',
        artsExpression: body.artsExpression ?? '',
        eventTakeaway: body.eventTakeaway ?? '',
        eventAspect: body.eventAspect ?? [],
        eventAspectOther: body.eventAspectOther || null,
        tier: body.tier ?? 'REGULAR',
        price: body.price ?? '',
    };

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const ticket = await prisma.ticket.create({
                data: { orderId: generateOrderId(), ...data },
            });
            return NextResponse.json({ orderId: ticket.orderId });
        } catch (err: any) {
            const isUniqueClash = err?.code === 'P2002';
            if (!isUniqueClash || attempt === 2) {
                return NextResponse.json(
                    { error: 'Something went wrong, please try again' },
                    { status: 500 },
                );
            }
        }
    }
}

export async function PATCH(req: NextRequest) {
    const body = await req.json();

    if (!body.orderId) {
        return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    try {
        await prisma.ticket.update({
            where: { orderId: body.orderId },
            data: {
                consentAccurate: body.consentAccurate === 'yes',
                consentDataProcessing: body.consentDataProcessing === 'yes',
                consentUpdates: body.consentUpdates === 'yes',
            },
        });
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json(
            { error: 'Something went wrong, please try again' },
            { status: 500 },
        );
    }
}
