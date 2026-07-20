"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Ticket = {
  id: string;
  orderId: string;
  fullName: string;
  email: string;
  tier: string;
  paymentName: string | null;
  proofUrl: string | null;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  scanned: boolean;
};

export default function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await fetch("/api/admin/orders");
    setTickets(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const act = async (id: string, action: "confirm" | "reject") => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    load();
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ticket Management</h1>
        <Link href="/admin/scan" className="rounded-full bg-[#980B00] px-5 py-2 text-sm">
          Scan QR
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20 text-white/60">
              <th className="py-2 pr-4">Order ID</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Tier</th>
              <th className="py-2 pr-4">Payment Name</th>
              <th className="py-2 pr-4">Proof</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Scanned</th>
              <th className="py-2 pr-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b border-white/10">
                <td className="py-2 pr-4">{t.orderId}</td>
                <td className="py-2 pr-4">{t.fullName}</td>
                <td className="py-2 pr-4">{t.email}</td>
                <td className="py-2 pr-4">{t.tier}</td>
                <td className="py-2 pr-4">{t.paymentName ?? "-"}</td>
                <td className="py-2 pr-4">
                  {t.proofUrl ? (
                    <a href={t.proofUrl} target="_blank" className="text-[#C58A1C] underline">
                      view
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-2 pr-4">{t.status}</td>
                <td className="py-2 pr-4">{t.scanned ? "yes" : "no"}</td>
                <td className="py-2 pr-4 flex gap-2">
                  {t.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => act(t.id, "confirm")}
                        className="rounded-full bg-green-700 px-3 py-1 text-xs"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => act(t.id, "reject")}
                        className="rounded-full bg-red-800 px-3 py-1 text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
