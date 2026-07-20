import nodemailer from "nodemailer";
import QRCode from "qrcode";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendTicketEmail(
  to: string,
  fullName: string,
  orderId: string,
  qrToken: string
) {
  const qrDataUrl = await QRCode.toDataURL(qrToken, { width: 400 });
  const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");

  await transporter.sendMail({
    from: `TEDxTelkom University <${process.env.GMAIL_USER}>`,
    to,
    subject: `Your TEDx Ticket - ${orderId}`,
    html: `
      <div style="font-family:sans-serif;background:#000;color:#fff;padding:24px">
        <h2>Hi ${fullName}, your ticket is confirmed!</h2>
        <p>Order ID: <b>${orderId}</b></p>
        <p>Show this QR code at the entrance.</p>
        <img src="cid:qrcode" width="300" />
      </div>
    `,
    attachments: [{ filename: "ticket-qr.png", content: qrBuffer, cid: "qrcode" }],
  });
}
