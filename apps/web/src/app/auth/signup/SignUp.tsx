"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FiArrowRight, FiEye, FiEyeOff, FiHeadphones, FiLock, FiMail, FiShield, FiUser } from "react-icons/fi";
import { routes } from "@/lib/routes";

type FieldName = "fullName" | "mobile" | "email" | "password" | "consent";
type FormErrors = Partial<Record<FieldName, string>>;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1.5 text-[11px] leading-relaxed text-[#a73b54]">{message}</p> : null;
}

const inputClass = "h-11 w-full rounded-md border border-[#e9e0dc] bg-white px-3 text-xs text-plum placeholder:text-[#ac9ca5] outline-none transition-colors focus:border-[#b99564] focus:ring-2 focus:ring-[#b99564]/15 aria-invalid:border-[#b3455c]";
const labelClass = "mb-2 block text-[11px] font-medium text-[#4d3d46]";

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const fullName = String(values.get("fullName") ?? "").trim();
    const mobile = String(values.get("mobile") ?? "").replace(/[\s()-]/g, "");
    const email = String(values.get("email") ?? "").trim();
    const password = String(values.get("password") ?? "");
    const nextErrors: FormErrors = {};

    if (fullName.length < 2) nextErrors.fullName = "Enter your full name.";
    const mobilePattern = values.get("country") === "IN" ? /^[1-9]\d{9}$/ : /^[1-9]\d{6,14}$/;
    if (!mobilePattern.test(mobile)) nextErrors.mobile = values.get("country") === "IN" ? "Enter a valid 10-digit mobile number." : "Enter a valid mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (password.length < 8) nextErrors.password = "Use at least 8 characters for your password.";
    if (values.get("consent") !== "on") nextErrors.consent = "Please agree to the terms and privacy policy.";
    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      const field = form.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    // Frontend preview: do not persist personal details or create a pretend session.
    setNotice("Account creation is coming soon. Your details have not been sent or saved.");
  }

  function clearError(field: FieldName) {
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setNotice("");
  }

  return (
    <div className="flex min-h-svh flex-1 flex-col bg-[#fff8f5] text-plum">
      <header className="border-b border-[#f0e7e1]/60 bg-[#fffaf7]">
        <div className="mx-auto flex min-h-[76px] w-[min(1440px,calc(100%-64px))] items-center justify-between gap-5 py-2 max-[640px]:min-h-[68px] max-[640px]:w-[calc(100%-32px)] max-[640px]:gap-2">
          <div className="flex items-center gap-5 max-[640px]:gap-2">
            <Link href={routes.home} aria-label="Mangalyam home" className="flex h-[52px] w-[195px] shrink-0 items-center overflow-hidden rounded-lg max-[640px]:h-11 max-[640px]:w-[155px]"><Image src="/images/mangalyam-logo.png" alt="Mangalyam — The Royal Nuptial Atelier" width={1200} height={480} preload className="h-full w-full object-cover" /></Link>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#75616d] max-[640px]:gap-3">
            <Link href="/#pricing" aria-label="Concierge assistance" className="inline-flex items-center gap-2 hover:text-plum"><FiHeadphones aria-hidden="true" className="size-3.5 text-[#977310]" /><span className="max-[640px]:hidden">Concierge Assistance</span></Link>
            <span className="max-[640px]:hidden">English (IN)</span>
            <Link href={routes.login} aria-label="Sign in to your account" className="grid size-8 place-items-center rounded-full bg-plum text-white shadow-sm"><FiUser aria-hidden="true" className="size-3.5" /></Link>
          </div>
        </div>
      </header>

      <section aria-labelledby="signup-heading" className="flex flex-1 flex-col items-center px-5 pt-7 pb-12 max-[640px]:pt-6 max-[640px]:pb-8">
        <div className="w-full max-w-[440px] rounded-[16px] border border-[#f0e5de] bg-white px-8 pt-8 pb-7 shadow-[0_14px_24px_-10px_#43173930] max-[480px]:px-6 max-[480px]:pt-7">
          <div className="mb-6 text-center">
            <h1 id="signup-heading" className="mb-2 font-display text-[28px] leading-tight tracking-[-0.5px]">Create Account</h1>
            <p className="text-[11px] leading-relaxed text-[#93808b]">Plan your royal wedding festivities with gilded ease.</p>
          </div>

          <form noValidate onSubmit={handleSubmit}>
            <fieldset className="mb-5">
              <legend className={labelClass}>I am a</legend>
              <div className="grid grid-cols-3 rounded-lg bg-[#f0e7e1] p-[3px]">
                {[{ value: "bride", label: "Bride" }, { value: "groom", label: "Groom" }, { value: "family-planner", label: "Family / Planner" }].map((role) => (
                  <label key={role.value} className="cursor-pointer">
                    <input className="peer sr-only" type="radio" name="role" value={role.value} defaultChecked={role.value === "bride"} />
                    <span className="flex min-h-[34px] items-center justify-center rounded-md px-1 text-[10px] font-medium text-[#8b7681] transition-colors peer-checked:bg-[#2b0525] peer-checked:text-white peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-gold peer-focus-visible:outline-offset-2">{role.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mb-4">
              <label htmlFor="signup-name" className={labelClass}>Full Name <span aria-hidden="true" className="text-[#a14d5d]">*</span></label>
              <div className="relative"><FiUser aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-[#94818c]" /><input id="signup-name" name="fullName" autoComplete="name" required placeholder="e.g., Ananya Deshmukh" className={`${inputClass} pl-10`} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "name-error" : undefined} onChange={() => clearError("fullName")} /></div>
              <FieldError id="name-error" message={errors.fullName} />
            </div>

            <div className="mb-4">
              <label htmlFor="signup-mobile" className={labelClass}>Mobile Number <span aria-hidden="true" className="text-[#a14d5d]">*</span></label>
              <div className="flex gap-2">
                <select name="country" defaultValue="IN" aria-label="Country calling code" onChange={() => clearError("mobile")} className="h-11 w-[86px] shrink-0 cursor-pointer rounded-md border border-[#e9e0dc] bg-[#f0e7e1] px-2 text-[10px] text-[#75616d] outline-gold"><option value="IN">IN +91</option><option value="US">US +1</option><option value="GB">UK +44</option><option value="AE">AE +971</option></select>
                <input id="signup-mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel-national" required placeholder="98765 43210" className={`${inputClass} min-w-0`} aria-invalid={Boolean(errors.mobile)} aria-describedby={errors.mobile ? "mobile-error" : undefined} onChange={() => clearError("mobile")} />
              </div>
              <FieldError id="mobile-error" message={errors.mobile} />
            </div>

            <div className="mb-4">
              <label htmlFor="signup-email" className={labelClass}>Email Address <span aria-hidden="true" className="text-[#a14d5d]">*</span></label>
              <div className="relative"><FiMail aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-[#94818c]" /><input id="signup-email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required placeholder="ananya@example.com" className={`${inputClass} pl-10`} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onChange={() => clearError("email")} /></div>
              <FieldError id="email-error" message={errors.email} />
            </div>

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between gap-3"><label htmlFor="signup-password" className="text-[11px] font-medium text-[#4d3d46]">Password <span aria-hidden="true" className="text-[#a14d5d]">*</span></label><button type="button" aria-controls="signup-password" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} className="inline-flex cursor-pointer items-center gap-1 text-[10px] text-[#8b7681] hover:text-plum">{showPassword ? <FiEyeOff aria-hidden="true" className="size-3" /> : <FiEye aria-hidden="true" className="size-3" />}{showPassword ? "Hide" : "Show"}</button></div>
              <div className="relative"><FiLock aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-[#94818c]" /><input id="signup-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required placeholder="At least 8 characters" className={`${inputClass} pl-10`} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} onChange={() => clearError("password")} /></div>
              <FieldError id="password-error" message={errors.password} />
            </div>

            <div className="mb-6">
              <div className="flex items-start gap-2"><input id="signup-consent" type="checkbox" name="consent" required className="mt-0.5 size-3.5 shrink-0 cursor-pointer accent-plum" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} onChange={() => clearError("consent")} /><div className="text-[10px] leading-[1.8] text-[#93808b]"><label htmlFor="signup-consent" className="cursor-pointer">I agree to the </label><button type="button" onClick={() => setNotice("The Terms of Service will be published before account registration opens.")} className="cursor-pointer text-plum underline underline-offset-2">Terms of Service</button> and <button type="button" onClick={() => setNotice("The Privacy Policy will be published before account registration opens.")} className="cursor-pointer text-plum underline underline-offset-2">Privacy Policy</button>.</div></div>
              <FieldError id="consent-error" message={errors.consent} />
            </div>

            <button type="submit" className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2b0525] text-[13px] font-semibold text-white shadow-[0_3px_6px_#43173925] transition-colors hover:bg-plum">Create Account<FiArrowRight aria-hidden="true" className="size-4 text-[#f2ce6b]" /></button>
          </form>

          <div role="status" aria-live="polite" aria-atomic="true">{notice && <p className="mt-4 rounded-lg border border-[#e9d9be] bg-[#fff4da] p-3 text-[11px] leading-relaxed text-[#795d26]">{notice}</p>}</div>
          <p className="mt-6 text-center text-[10px] text-[#93808b]">Already have an account? <Link href={routes.login} className="font-medium text-plum underline underline-offset-2">Sign In</Link></p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-[#f4ece7] pt-3 text-[9px] text-[#86717d]"><span className="inline-flex items-center gap-1.5"><FiShield aria-hidden="true" className="size-3 text-[#977310]" />Privacy First</span><span aria-hidden="true" className="text-[#d9c5cf]">•</span><span className="inline-flex items-center gap-1.5"><FiLock aria-hidden="true" className="size-3 text-[#977310]" />Discrete &amp; Private</span></div>
        </div>
      </section>

      <footer className="bg-[#f8f0ea] px-8 py-4 max-[640px]:px-5"><div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[9px] leading-relaxed text-[#8c7482] max-[640px]:justify-center max-[640px]:text-center"><p><span className="font-semibold text-[#977310]">Mangalyam Royal Suite</span> · Private Ceremonial Planning</p><div className="flex flex-wrap justify-center gap-x-5 gap-y-2"><span aria-disabled="true" title="Privacy policy will be available before launch">Privacy Charter</span><span aria-disabled="true" title="Security information will be available before launch">Security &amp; Protocols</span><Link href="/#pricing" className="hover:text-plum">Royal Help Desk</Link></div></div></footer>
    </div>
  );
}
