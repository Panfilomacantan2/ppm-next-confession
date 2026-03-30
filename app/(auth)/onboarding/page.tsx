"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/lib/actions/user.actions";
import { MessageCircleHeart, User, Settings, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

const steps = [
  { id: 1, label: "Profile", icon: <User size={16} /> },
  { id: 2, label: "Preferences", icon: <Settings size={16} /> },
  { id: 3, label: "Done", icon: <CheckCircle2 size={16} /> },
];

export default function BoardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const name = user?.fullName ?? user?.firstName ?? "";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const avatar = user?.imageUrl ?? "";

  const next = () => setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  const back = () => { setError(""); setStep((s) => (s > 1 ? ((s - 1) as Step) : s)); };

  const submit = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      await completeOnboarding({
        clerkId: user.id,
        name,
        email,
        avatar,
        username: username.trim() || undefined,
      });
      setStep(3);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-rose-500" size={32} />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-md">
            <MessageCircleHeart size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to Konpisko<span className="text-rose-500">.</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            A safe space for your anonymous confessions.
          </p>
        </div>

        {/* Step indicators */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                step === s.id
                  ? "border-rose-500 bg-rose-500 text-white"
                  : step > s.id
                  ? "border-rose-300 bg-rose-50 text-rose-500 dark:bg-rose-500/10"
                  : "border-border bg-muted text-muted-foreground"
              )}>
                {s.icon}
              </div>
              {idx < steps.length - 1 && (
                <div className={cn(
                  "h-px w-8 transition-colors",
                  step > s.id ? "bg-rose-300" : "bg-border"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">

          {/* Step 1 — Profile */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold">Your Profile</h2>
                <p className="text-xs text-muted-foreground">Pulled from your Clerk account.</p>
              </div>

              {/* Avatar preview */}
              {avatar && (
                <div className="flex items-center gap-3">
                  <Image src={avatar} alt={name} width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-border" />
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground/80">
                  Username <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. silent_soul"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30"
                />
                <p className="text-[11px] text-muted-foreground">
                  This will be shown on your confessions instead of your real name.
                </p>
              </div>
            </div>
          )}

          {/* Step 2 — Preferences */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold">Almost there</h2>
                <p className="text-xs text-muted-foreground">Review your details before finishing.</p>
              </div>

              <div className="rounded-lg border border-border/60 bg-muted/40 p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{name || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{email || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Username</span>
                  <span className="font-medium">{username.trim() || "Anonymous"}</span>
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
              )}
            </div>
          )}

          {/* Step 3 — Done */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-500/10">
                  <CheckCircle2 size={36} />
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold">You&apos;re all set, {name || "friend"}!</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your confessions await. Share your truth anonymously.
                </p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="w-full rounded-lg bg-rose-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-600"
              >
                Start Confessing
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                step === 1
                  ? "invisible"
                  : "border border-border hover:bg-accent"
              )}
            >
              <ArrowLeft size={15} /> Back
            </button>

            <button
              type="button"
              onClick={step === 2 ? submit : next}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : step === 2 ? (
                "Complete"
              ) : (
                <>Next <ArrowRight size={15} /></>
              )}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
