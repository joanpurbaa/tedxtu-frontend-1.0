"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Suspense, useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import PaymentPage from "./paymentPage";
import PaymentSuccessPage from "./paymentSuccess";

type FormData = {
  fullName: string;
  nickname: string;
  email: string;
  phone: string;
  participantStatus: string;
  studentId: string;
  faculty: string;
  institution: string;
  major: string;
  tedFamiliarity: string;
  topics: string[];
  musicLifestyle: string;
  environmentShapes: string;
  artsExpression: string;
  eventAspect: string[];
  consentAccurate: string;
  consentDataProcessing: string;
  consentUpdates: string;
};

const initial: FormData = {
  fullName: "",
  nickname: "",
  email: "",
  phone: "",
  participantStatus: "",
  studentId: "",
  faculty: "",
  institution: "",
  major: "",
  tedFamiliarity: "",
  topics: [],
  musicLifestyle: "",
  environmentShapes: "",
  artsExpression: "",
  eventAspect: [],
  consentAccurate: "",
  consentDataProcessing: "",
  consentUpdates: "",
};

const facultyOptions = [
  "Fakultas Ekonomi dan Bisnis (FEB)",
  "Fakultas Komunikasi dan Ilmu Sosial (FKS)",
  "Fakultas Industri Kreatif (FIK)",
  "Fakultas Ilmu Terapan (FIT)",
  "Fakultas Teknik Elektro (FTE)",
  "Fakultas Informatika (FIF)",
  "Fakultas Rekayasa Industri (FRI)",
  "Others",
];

const topicOptions = [
  "Science & Technology Development",
  "Arts, Music & Design",
  "Environment & animal welfare",
  "History, Archaeology & Culture",
  "Politics & Social Issues",
  "Psychology",
  "Education",
  "Others",
];

const aspectOptions = [
  "Inspiration & New Ideas",
  "Networking & Connection",
  "Atmosphere & Ambience",
  "Self-Reflection",
  "Entertainment",
  "Others",
];

const steps = ["identity", "persona", "consent", "payment"] as const;
type Step = (typeof steps)[number] | "success";

function inputClass() {
  return "h-[52px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-raleway text-white outline-none backdrop-blur-md transition duration-200 placeholder:text-white/50 focus:border-[#C58A1C]/80 focus:ring-2 focus:ring-[#C58A1C]/60";
}

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-raleway transition ${
        active
          ? "border-[#C58A1C] bg-[#C58A1C]/20 text-white"
          : "border-white/15 bg-white/5 text-white/70 hover:border-white/30"
      }`}
    >
      {label}
    </button>
  );
}

function YesNo({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-3">
      <Chip active={value === "yes"} label="Yes" onClick={() => onChange("yes")} />
      <Chip active={value === "no"} label="No" onClick={() => onChange("no")} />
    </div>
  );
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function TicketingFlow() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier") ?? "REGULAR";
  const price = searchParams.get("price") ?? "";

  const [step, setStep] = useState<Step>("identity");
  const [form, setForm] = useState<FormData>(initial);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onText = (e: ChangeEvent<HTMLInputElement>) =>
    set(e.target.id as keyof FormData, e.target.value as never);

  const isStudent = form.participantStatus === "Student";

  const validateIdentity = () => {
    if (!form.fullName.trim() || form.fullName.trim().length < 3) return "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter a valid email.";
    if (!/^08\d{8,13}$/.test(form.phone.trim())) return "Phone must start with 08.";
    if (!form.nickname.trim()) return "Nickname is required.";
    if (!form.participantStatus) return "Please select your status.";
    if (isStudent && !form.studentId.trim()) return "Student ID is required.";
    if (isStudent && !form.faculty) return "Please select your faculty.";
    if (!isStudent && !form.institution.trim()) return "Please fill your institution/organization.";
    if (!form.major.trim()) return 'Fill Major/Study Programme, or "-" if not applicable.';
    return "";
  };

  const validatePersona = () => {
    if (!form.tedFamiliarity) return "Please answer how familiar you are with TED/TEDx.";
    if (form.topics.length === 0) return "Pick at least one topic.";
    if (!form.musicLifestyle) return "Please answer the music question.";
    if (!form.environmentShapes) return "Please answer the psychology question.";
    if (!form.artsExpression) return "Please answer the arts question.";
    if (form.eventAspect.length === 0) return "Pick at least one aspect.";
    return "";
  };

  const validateConsent = () => {
    if (!form.consentAccurate) return "Please confirm your data is accurate.";
    if (!form.consentDataProcessing) return "Please answer the data processing consent.";
    if (!form.consentUpdates) return "Please answer the updates consent.";
    return "";
  };

  const next = (e: FormEvent) => {
    e.preventDefault();
    let msg = "";
    if (step === "identity") msg = validateIdentity();
    if (step === "persona") msg = validatePersona();
    if (step === "consent") msg = validateConsent();

    if (msg) {
      setError(msg);
      return;
    }
    setError("");

    if (step === "identity") setStep("persona");
    else if (step === "persona") setStep("consent");
    else if (step === "consent") submitCheckout();
  };

  const submitCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tier, price }),
    });

    if (!res.ok) {
      setError("Something went wrong, please try again.");
      return;
    }

    const data = await res.json();
    setOrderId(data.orderId);
    setStep("payment");
  };

  if (step === "payment" && orderId) {
    return <PaymentPage orderId={orderId} onConfirm={() => setStep("success")} />;
  }

  if (step === "success") {
    return <PaymentSuccessPage />;
  }

  const stepIndex = steps.indexOf(step as (typeof steps)[number]);

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-x-hidden bg-black text-white pt-24 sm:pt-28">
        <div className="pointer-events-none fixed right-[-42rem] top-[-42rem] h-[94rem] w-[94rem]">
          <Image src="/about/yellow-ellipse.webp" alt="" fill priority className="object-contain" />
        </div>
        <div className="pointer-events-none fixed bottom-[-42rem] left-[-42rem] h-[94rem] w-[94rem]">
          <Image src="/about/yellow-ellipse.webp" alt="" fill priority className="object-contain" />
        </div>

        <section className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col px-6 py-6 pb-16">
          <div className="mb-6">
            <h1 className="font-title text-5xl uppercase leading-none lg:text-6xl">Checkout Ticket</h1>
            <p className="mt-3 font-raleway text-xl text-white/75">
              {tier} — {price}
            </p>
          </div>

          <div className="mb-6 flex gap-2">
            {["Identity", "About You", "Consent"].map((label, i) => (
              <div
                key={label}
                className={`flex-1 rounded-full py-2 text-center font-raleway text-xs uppercase tracking-wide ${
                  i <= stepIndex ? "bg-[#C58A1C] text-black" : "bg-white/10 text-white/50"
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          <form onSubmit={next}>
            <div className="rounded-[38px] border border-white/15 bg-black/25 px-8 py-8 pb-10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl space-y-6">
              {step === "identity" && (
                <>
                  <h2 className="text-center font-title text-3xl uppercase">Personal Data</h2>

                  <div>
                    <label htmlFor="fullName" className="mb-2 block font-title text-sm uppercase">Full Name</label>
                    <input id="fullName" className={inputClass()} value={form.fullName} onChange={onText} placeholder="Type your full name" />
                  </div>

                  <div>
                    <label htmlFor="nickname" className="mb-2 block font-title text-sm uppercase">What should we call you?</label>
                    <input id="nickname" className={inputClass()} value={form.nickname} onChange={onText} placeholder="Nickname" />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block font-title text-sm uppercase">Email</label>
                    <input id="email" className={inputClass()} value={form.email} onChange={onText} placeholder="name@gmail.com" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block font-title text-sm uppercase">WhatsApp Number</label>
                    <input id="phone" className={inputClass()} value={form.phone} onChange={onText} placeholder="08xxxxxxxxxx" />
                  </div>

                  <div>
                    <p className="mb-2 font-title text-sm uppercase">Current Status</p>
                    <div className="flex flex-wrap gap-3">
                      {["Student", "Fresh Graduate", "Professional"].map((s) => (
                        <Chip key={s} active={form.participantStatus === s} label={s} onClick={() => set("participantStatus", s)} />
                      ))}
                    </div>
                  </div>

                  {isStudent ? (
                    <>
                      <div>
                        <label htmlFor="studentId" className="mb-2 block font-title text-sm uppercase">Student ID (NIM)</label>
                        <input id="studentId" className={inputClass()} value={form.studentId} onChange={onText} placeholder="NIM" />
                      </div>
                      <div>
                        <p className="mb-2 font-title text-sm uppercase">Faculty</p>
                        <div className="flex flex-wrap gap-2">
                          {facultyOptions.map((f) => (
                            <Chip key={f} active={form.faculty === f} label={f} onClick={() => set("faculty", f)} />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label htmlFor="institution" className="mb-2 block font-title text-sm uppercase">Institution / Organization</label>
                      <input id="institution" className={inputClass()} value={form.institution} onChange={onText} placeholder="e.g. Telkom Indonesia" />
                    </div>
                  )}

                  <div>
                    <label htmlFor="major" className="mb-2 block font-title text-sm uppercase">Major / Study Programme</label>
                    <input id="major" className={inputClass()} value={form.major} onChange={onText} placeholder='Fill "-" if not applicable' />
                  </div>
                </>
              )}

              {step === "persona" && (
                <>
                  <h2 className="text-center font-title text-3xl uppercase">Let Us Know You Better 🎶</h2>

                  <div>
                    <p className="mb-2 font-title text-sm uppercase">How familiar are you with TED/TEDx?</p>
                    <div className="flex flex-col gap-2">
                      {["I'm completely new to it", "I've heard of it / watched a few talks before", "I know the platform well and I'm a big fan"].map((o) => (
                        <Chip key={o} active={form.tedFamiliarity === o} label={o} onClick={() => set("tedFamiliarity", o)} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-title text-sm uppercase">What topics interest you most?</p>
                    <div className="flex flex-wrap gap-2">
                      {topicOptions.map((t) => (
                        <Chip key={t} active={form.topics.includes(t)} label={t} onClick={() => set("topics", toggle(form.topics, t))} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 font-title text-sm uppercase">Is music a big part of your daily life?</p>
                    <YesNo value={form.musicLifestyle} onChange={(v) => set("musicLifestyle", v)} />
                  </div>

                  <div>
                    <p className="mb-2 font-title text-sm uppercase">Do you believe your environment shapes who you are more than your own choices?</p>
                    <YesNo value={form.environmentShapes} onChange={(v) => set("environmentShapes", v)} />
                  </div>

                  <div>
                    <p className="mb-2 font-title text-sm uppercase">Do you believe emotions can truly be expressed through arts & music?</p>
                    <YesNo value={form.artsExpression} onChange={(v) => set("artsExpression", v)} />
                  </div>

                  <div>
                    <p className="mb-2 font-title text-sm uppercase">Which aspect are you looking forward to the most?</p>
                    <div className="flex flex-wrap gap-2">
                      {aspectOptions.map((a) => (
                        <Chip key={a} active={form.eventAspect.includes(a)} label={a} onClick={() => set("eventAspect", toggle(form.eventAspect, a))} />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === "consent" && (
                <>
                  <h2 className="text-center font-title text-3xl uppercase">Confirmation & Consent</h2>

                  <div>
                    <p className="mb-2 font-raleway text-white/90">I confirm all information submitted is true and accurate.</p>
                    <YesNo value={form.consentAccurate} onChange={(v) => set("consentAccurate", v)} />
                  </div>

                  <div>
                    <p className="mb-2 font-raleway text-white/90">Do you consent to your data being processed by TEDxTelkom University?</p>
                    <YesNo value={form.consentDataProcessing} onChange={(v) => set("consentDataProcessing", v)} />
                  </div>

                  <div>
                    <p className="mb-2 font-raleway text-white/90">Do you consent to receiving updates/news from TEDx Telkom University?</p>
                    <YesNo value={form.consentUpdates} onChange={(v) => set("consentUpdates", v)} />
                  </div>
                </>
              )}

              {error && <p className="font-raleway text-sm text-[#FFB4B4]">{error}</p>}
            </div>

            <div className="mt-5 flex justify-between">
              {step !== "identity" ? (
                <button
                  type="button"
                  onClick={() => setStep(steps[Math.max(0, stepIndex - 1)])}
                  className="h-[52px] rounded-full border border-white/20 px-6 font-title text-sm uppercase text-white/70"
                >
                  Back
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className="h-[52px] rounded-full bg-[#980B00] px-8 font-title text-sm uppercase text-white transition hover:brightness-110">
                {step === "consent" ? "Continue to Payment" : "Next"}
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default function TicketingPage() {
  return (
    <Suspense>
      <TicketingFlow />
    </Suspense>
  );
}
