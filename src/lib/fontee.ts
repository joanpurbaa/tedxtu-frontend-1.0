import QRCode from 'qrcode';
import { prisma } from '@/lib/prisma';
import { GROUP_INVITE_LINK } from '@/lib/group';

export async function sendTicketWhatsapp(
    phone: string,
    fullName: string,
    orderId: string,
    qrToken: string,
) {
    const target = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
    const ticketUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/ticket/${qrToken}`;

    const qrDataUrl = await QRCode.toDataURL(qrToken, { width: 500 });
    const qrCodeBase64 = qrDataUrl.split(',')[1];

    await prisma.ticket.update({
        where: { qrToken },
        data: { qrCodeBase64 },
    });

    const form = new FormData();
    form.append('target', target);
    form.append(
        'message',
        `👋 Hi *${fullName}*, tiket TEDx kamu sudah dikonfirmasi!\n\nOrder ID: ${orderId}\n\n🤩 Lihat & tunjukin e-tiket QR kamu di sini:\n${ticketUrl}\n\nStep selanjutnya :\n1️⃣ Join grup peserta TEDx berikut\n${GROUP_INVITE_LINK}\n\n2️⃣ Klik link e-tiket QR kamu, dan klik tombol *"Saya Sudah Join Grup"*\n\nTerima kasih!!! 😍`,
    );

    const res = await fetch('https://api.fonnte.com/send', {
        method: 'POST',
        headers: { Authorization: process.env.FONNTE_TOKEN! },
        body: form,
    });

    const data = await res.json();
    if (data.status === false)
        throw new Error(data.reason ?? 'Fonnte send failed');
    return data;
}
