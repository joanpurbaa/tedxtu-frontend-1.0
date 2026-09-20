import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
    BUNDLE_PRICES,
    BUNDLE_MEMBER_COUNT,
    type BundleType,
} from '@/lib/ticketPricing';

function generateOrderId() {
    return 'TEDX-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

function isBundleType(value: unknown): value is BundleType {
    return value === 'SOLO' || value === 'DUO' || value === 'FOUR';
}

type BundleMember = {
    name: string;
    email: string;
    phone: string;
};

const MEMBER_DEFAULTS = {
    domisili: '',
    participantStatus: 'Student',
    tedFamiliarity: 'N/A',
};

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.phone) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const tier = body.tier ?? 'REGULAR';
    const rawBundleType = body.bundleType ?? 'SOLO';

    if (!isBundleType(rawBundleType)) {
        return NextResponse.json(
            { error: 'Invalid bundle type' },
            { status: 400 },
        );
    }

    const isBundling = rawBundleType !== 'SOLO';

    // Bundling hanya diperbolehkan untuk NORMAL PRICE.
    if (isBundling && tier !== 'NORMAL PRICE') {
        return NextResponse.json(
            { error: 'Bundling is only available for Normal Price' },
            { status: 400 },
        );
    }

    // Harga ditentukan SERVER-SIDE — jangan percaya `price` dari client.
    // Jika bukan NORMAL PRICE dan bukan bundling, totalAmount dibiarkan null
    // agar Early Bird / Pre-Sale tidak tersentuh.
    const totalAmount =
        tier === 'NORMAL PRICE' || isBundling
            ? BUNDLE_PRICES[rawBundleType]
            : null;

    let members: BundleMember[] = [];
    if (isBundling) {
        const expectedMembers = BUNDLE_MEMBER_COUNT[rawBundleType] - 1;
        members = Array.isArray(body.members) ? body.members : [];

        if (members.length !== expectedMembers) {
            return NextResponse.json(
                {
                    error: `Bundle ${rawBundleType} requires ${expectedMembers} member${
                        expectedMembers === 1 ? '' : 's'
                    }`,
                },
                { status: 400 },
            );
        }

        for (const m of members) {
            if (
                typeof m?.name !== 'string' ||
                !m.name.trim() ||
                typeof m?.email !== 'string' ||
                !/^\S+@\S+\.\S+$/.test(m.email.trim()) ||
                typeof m?.phone !== 'string' ||
                !/^\+?\d{9,15}$/.test(m.phone.trim())
            ) {
                return NextResponse.json(
                    { error: 'Each bundle member needs a valid name, email and WhatsApp number' },
                    { status: 400 },
                );
            }
        }
    }

    const displayPrice =
        isBundling && totalAmount
            ? `RP ${totalAmount.toLocaleString('id-ID')}`
            : (body.price ?? '');

    const primaryData = {
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
        tier,
        price: displayPrice,
        bundleType: rawBundleType,
        bundleRole: 'PRIMARY',
        bundleGroupId: isBundling ? crypto.randomUUID() : null,
        totalAmount,
    };

    const memberDatas = members.map((m) => ({
        fullName: m.name.trim(),
        nickname: m.name.trim(),
        email: m.email.trim(),
        phone: m.phone.trim(),
        ...MEMBER_DEFAULTS,
        tier,
        price: displayPrice,
        bundleType: rawBundleType,
        bundleRole: 'MEMBER',
        bundleGroupId: primaryData.bundleGroupId,
        totalAmount,
    }));

    const TRANSIENT_CODES = new Set(['P2028', 'P1008', 'P2024', 'P2002']);

    // Retry untuk error transien (neon cold-start / connection pool timeout),
    // termasuk unique clash orderId. Transaksi array yang gagal start tidak
    // membuat baris sama sekali, jadi aman untuk diulang.
    for (let attempt = 0; attempt < 4; attempt++) {
        try {
            const creates = [
                prisma.ticket.create({
                    data: { orderId: generateOrderId(), ...primaryData },
                }),
                ...memberDatas.map((md) =>
                    prisma.ticket.create({
                        data: { orderId: generateOrderId(), ...md },
                    }),
                ),
            ];

            const [primaryTicket] = await prisma.$transaction(creates);
            return NextResponse.json({ orderId: primaryTicket.orderId });
        } catch (err: unknown) {
            const code = (err as { code?: string })?.code;
            const shouldRetry = code !== undefined && TRANSIENT_CODES.has(code);
            if (attempt === 3 || !shouldRetry) {
                console.error('checkout error:', err);
                return NextResponse.json(
                    { error: 'Something went wrong, please try again' },
                    { status: 500 },
                );
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
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