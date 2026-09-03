import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    {
      error:
        "The legacy upload endpoint is deprecated. Uploads now go directly to Vercel Blob: call POST /api/payment/upload-url, then PUT the file to the returned uploadUrl, then POST /api/payment/complete with the proof URL.",
    },
    { status: 410 },
  );
}
