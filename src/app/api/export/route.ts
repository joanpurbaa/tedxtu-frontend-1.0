import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET() {
    const tickets = await prisma.ticket.findMany({
        orderBy: { createdAt: 'asc' },
    });

    const rows = tickets.map((t) => ({
        'Order ID': t.orderId,
        'Created At': t.createdAt.toISOString(),
        'Status Pembayaran': t.status,
        Scanned: t.scanned ? 'Yes' : 'No',
        'Scanned At': t.scannedAt ? t.scannedAt.toISOString() : '',

        Email: t.email,
        'Full Name': t.fullName,
        Nickname: t.nickname,
        'WhatsApp Number': t.phone,
        Domicile: t.domisili,
        'Current Status': t.participantStatus,
        'Student ID (NIM)': t.studentId ?? '',
        Faculty: t.faculty ?? '',
        'Institution/Organization': t.institution ?? '',
        'Major/Study Programme': t.major ?? '',
        Instagram: t.instagram ?? '',
        LinkedIn: t.linkedin ?? '',

        'TED/TEDx Familiarity': t.tedFamiliarity,
        'Topics of Interest': t.topics.join(', '),
        'Topics (Others)': t.topicsOther ?? '',
        'Music preference / lifestyle': t.musicLifestyle,
        'Environment shapes who you are': t.environmentShapes,
        'Emotions expressed through arts': t.artsExpression,
        'Biggest takeaway': t.eventTakeaway,
        'Aspect looking forward to': t.eventAspect.join(', '),
        'Aspect (Others)': t.eventAspectOther ?? '',

        'Ticket Tier': t.tier,
        Price: t.price,
        'Payment Name': t.paymentName ?? '',

        'Consent - Data Accurate': t.consentAccurate ? 'Yes' : 'No',
        'Consent - Data Processing': t.consentDataProcessing ? 'Yes' : 'No',
        'Consent - Receive Updates': t.consentUpdates ? 'Yes' : 'No',
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(new Uint8Array(buffer), {
        headers: {
            'Content-Type':
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="tedx-tickets-${new Date().toISOString().slice(0, 10)}.xlsx"`,
        },
    });
}
