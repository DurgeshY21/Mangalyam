"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight, FiEye, FiEyeOff, FiHeadphones, FiLock, FiUser } from "react-icons/fi";
import { routes } from "@/lib/routes";

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [notice, setNotice] = useState("");
  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const values = new FormData(event.currentTarget);
    const identifier = String(values.get("identifier") ?? "").trim();
    const password = String(values.get("password") ?? "");
    const nextErrors: typeof errors = {};
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^\+?[1-9]\d{6,14}$/.test(identifier.replace(/[\s()-]/g, ""));

    if (!identifier) nextErrors.identifier = "Enter your email address or mobile number.";
    else if (!isEmail && !isPhone) nextErrors.identifier = "Enter a valid email address or mobile number with country code.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);

    if (nextErrors.identifier) return identifierRef.current?.focus();
    if (nextErrors.password) return passwordRef.current?.focus();
    // Frontend only: no credentials are stored or sent until authentication is connected.
    setNotice("Sign-in is coming soon. Your credentials have not been sent or saved.");
  }

  function socialSignIn(provider: string) {
    setNotice(`${provider} sign-in is not available yet. Please check back soon.`);
  }

  const fieldClass = "h-12 w-full rounded-xl border border-transparent bg-[#f9f2ec] px-4 text-[13px] text-plum placeholder:text-[#aa9ca7] outline-none transition-colors focus:border-[#b99564] focus:ring-2 focus:ring-[#b99564]/15 aria-invalid:border-[#b3455c]";

  return (
    <div className="flex min-h-svh flex-1 flex-col bg-[#fff8f5] text-plum">
      <header className="border-b border-[#efe7e1]/70 bg-[#fffaf7]">
        <div className="mx-auto flex min-h-[82px] w-[min(1400px,calc(100%-80px))] items-center justify-between gap-6 py-2 max-[640px]:min-h-[72px] max-[640px]:w-[calc(100%-36px)] max-[640px]:gap-3">
          <Link href={routes.home} aria-label="Mangalyam home" className="flex h-14 w-[210px] shrink-0 items-center overflow-hidden rounded-lg max-[640px]:h-12 max-[640px]:w-[170px]">
            <Image src="/images/mangalyam-logo.png" alt="Mangalyam — The Royal Nuptial Atelier" width={1200} height={480} preload className="h-full w-full object-cover" />
          </Link>
          <div className="flex items-center gap-5 text-xs text-[#675963] max-[640px]:gap-3">
            <Link href="/#pricing" className="inline-flex items-center gap-2 transition-colors hover:text-plum" aria-label="Concierge assistance"><FiHeadphones aria-hidden="true" className="size-4 text-[#977310]" /><span className="max-[640px]:hidden">Concierge Assistance</span></Link>
            <span className="border-l border-[#e7ddd6] pl-5 max-[640px]:hidden">English (IN)</span>
            <span className="grid size-8 place-items-center rounded-full bg-plum text-white shadow-sm" aria-hidden="true"><FiUser className="size-4" /></span>
          </div>
        </div>
      </header>

      <section aria-labelledby="signin-heading" className="flex flex-1 flex-col items-center px-5 pt-9 pb-12 max-[640px]:pt-8 max-[640px]:pb-9">
        <div className="w-full max-w-[440px]">
          <div className="mb-6 text-center">
            <h1 id="signin-heading" className="mb-2 font-display text-[32px] leading-tight tracking-[-0.5px]">Welcome Back</h1>
            <p className="text-[13px] leading-relaxed text-[#897480]">Enter your credentials to access your wedding workspace.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-[380px]:gap-2">
            <button type="button" onClick={() => socialSignIn("Google")} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#eae1da] bg-white px-3 text-[11px] shadow-[0_2px_2px_#43173904] transition-colors hover:bg-[#fcf5ef]"><FcGoogle aria-hidden="true" className="size-[18px]" />Google Workspace</button>
            <button type="button" onClick={() => socialSignIn("Apple")} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#eae1da] bg-white px-3 text-[11px] shadow-[0_2px_2px_#43173904] transition-colors hover:bg-[#fcf5ef]"><FaApple aria-hidden="true" className="size-[18px] text-[#24201f]" />Apple ID</button>
          </div>

          <div className="my-5 flex items-center gap-4"><span className="h-px flex-1 bg-[#eadfd6]" /><span className="text-[9px] tracking-[0.4px] text-[#8b7681] uppercase">Or continue with email / mobile</span><span className="h-px flex-1 bg-[#eadfd6]" /></div>

          <form noValidate onSubmit={handleSubmit} className="rounded-[18px] border border-[#f4ebe5] bg-white p-9 shadow-[0_10px_36px_-14px_#43173915] max-[480px]:p-6">
            <div className="mb-5">
              <label htmlFor="signin-identifier" className="mb-2 block text-[11px] font-medium">Email Address or Mobile Number <span aria-hidden="true">*</span></label>
              <input ref={identifierRef} id="signin-identifier" name="identifier" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} required placeholder="e.g., ananya@example.com" className={fieldClass} aria-invalid={Boolean(errors.identifier)} aria-describedby={errors.identifier ? "identifier-error" : undefined} onChange={() => { setErrors((previous) => ({ ...previous, identifier: undefined })); setNotice(""); }} />
              {errors.identifier && <p id="identifier-error" className="mt-2 text-[11px] leading-relaxed text-[#a73b54]">{errors.identifier}</p>}
            </div>

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="signin-password" className="text-[11px] font-medium">Password <span aria-hidden="true">*</span></label>
                <button type="button" onClick={() => setNotice("Password recovery will be available when sign-in launches.")} className="cursor-pointer text-[10px] font-medium text-[#977310] hover:underline hover:underline-offset-4">Forgot Password?</button>
              </div>
              <div className="relative">
                <FiLock aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#9a8692]" />
                <input ref={passwordRef} id="signin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" className={`${fieldClass} pr-12 pl-11`} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} onChange={() => { setErrors((previous) => ({ ...previous, password: undefined })); setNotice(""); }} />
                <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-[#796573] hover:text-plum">{showPassword ? <FiEyeOff aria-hidden="true" className="size-4" /> : <FiEye aria-hidden="true" className="size-4" />}</button>
              </div>
              {errors.password && <p id="password-error" className="mt-2 text-[11px] leading-relaxed text-[#a73b54]">{errors.password}</p>}
            </div>

            <label className="mb-5 inline-flex cursor-pointer items-center gap-2 text-[11px] text-[#78616e]"><input name="remember" type="checkbox" defaultChecked className="size-[18px] cursor-pointer rounded accent-plum" />Remember this device</label>
            <button type="submit" className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2b0525] text-sm font-semibold text-white shadow-[0_5px_12px_#43173924] transition-colors hover:bg-plum">Sign In<FiArrowRight aria-hidden="true" className="size-4 text-[#f2ce6b]" /></button>
          </form>

          <div role="status" aria-live="polite" aria-atomic="true">{notice && <p className="mt-4 rounded-lg border border-[#e9d9be] bg-[#fff4da] p-3 text-xs leading-relaxed text-[#795d26]">{notice}</p>}</div>
          <p className="mt-6 text-center text-xs text-[#977e8c]">Don’t have an account? <Link href={routes.signup} className="font-semibold text-plum underline-offset-4 hover:underline">Create Account</Link></p>
          <p className="mt-7 flex items-center justify-center gap-2 text-[9px] tracking-[0.5px] text-[#8a7481] uppercase"><FiLock aria-hidden="true" className="size-3.5 text-[#977310]" />Designed for privacy &amp; peace of mind</p>
        </div>
      </section>

      <footer className="bg-[#f8f0ea] px-10 py-5 max-[640px]:px-5">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[10px] leading-relaxed text-[#8c7482] max-[640px]:justify-center max-[640px]:text-center">
          <p><span className="font-semibold text-[#977310]">Mangalyam Royal Suite</span> <span aria-hidden="true">·</span> Private Ceremonial Planning</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2"><span aria-disabled="true" title="Privacy policy will be available before launch">Privacy Charter</span><span aria-disabled="true" title="Security information will be available before launch">Security &amp; Protocols</span><Link href="/#pricing" className="hover:text-plum">Royal Help Desk</Link></div>
        </div>
      </footer>
    </div>
  );
}
