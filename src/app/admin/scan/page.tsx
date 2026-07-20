"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScanPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          const res = await fetch("/api/admin/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: decodedText }),
          });
          const data = await res.json();
          setResult(`${data.status} - ${data.ticket?.fullName ?? ""}`);
        },
        () => {}
      )
      .catch(() => setResult("Camera error"));

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Scan Ticket</h1>
      <div id="reader" className="w-full max-w-sm" />
      {result && <p className="mt-4 text-lg font-semibold text-[#C58A1C]">{result}</p>}
    </main>
  );
}
