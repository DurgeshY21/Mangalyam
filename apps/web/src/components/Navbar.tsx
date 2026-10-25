"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiGlobe, FiMenu, FiUser, FiX } from "react-icons/fi";
import { PiCrownSimple } from "react-icons/pi";
import { routes } from "@/lib/routes";

const navigation = [
  { label: "Home", href: routes.home },
  { label: "Features", href: "/#shared-workspace" },
  { label: "Events", href: "/#ceremonies" },
  { label: "Planners", href: "/#pricing" },
  { label: "Dashboard", href: routes.dashboard },
] as const;

const planningButton = "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-plum bg-plum px-5 text-xs leading-none font-semibold tracking-[0.15px] whitespace-nowrap text-[#fff8ef] shadow-[0_3px_10px_#43173915] transition-[background,box-shadow] duration-200 hover:bg-[#59254f] hover:shadow-[0_4px_14px_#43173925] motion-reduce:transition-none";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function updateSection() {
      const match = navigation.find((item) => item.href === "/" + window.location.hash);
      setActiveSection(match?.label ?? "Home");
    }
    updateSection();
    window.addEventListener("hashchange", updateSection);
    return () => window.removeEventListener("hashchange", updateSection);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function selectSection(label: string) {
    setActiveSection(label);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#eaddd3]/70 bg-[#fff8f4]/95 font-['Segoe_UI',Tahoma,sans-serif] text-[#34262f] shadow-[0_2px_16px_#43173903] backdrop-blur-xl">
      <nav className="relative mx-auto flex min-h-[68px] w-[min(1400px,calc(100%-64px))] items-center justify-between gap-7 py-1.5 max-[1250px]:w-[calc(100%-40px)] max-[1250px]:gap-5 max-[540px]:min-h-[58px] max-[540px]:w-[calc(100%-28px)] max-[540px]:gap-2.5 max-[540px]:py-1" aria-label="Main navigation">
        <Link className="flex h-[54px] w-[216px] shrink-0 items-center overflow-hidden rounded-lg max-[1250px]:w-[196px] max-[540px]:h-[46px] max-[540px]:w-[165px]" href={routes.home} aria-label="Mangalyam home" onClick={() => selectSection("Home")}>
          <Image src="/images/mangalyam-logo.png" alt="Mangalyam — The Royal Nuptial Atelier" width={1200} height={480} preload className="block h-full w-full object-cover" />
        </Link>

        <div className="flex items-center justify-center gap-6 max-[1250px]:gap-5 max-[1180px]:hidden">
          {navigation.map(({ label, href }) => {
            const active = pathname === routes.home && activeSection === label;
            return (
              <Link key={label} href={href} onClick={() => selectSection(label)} aria-current={active ? (label === "Home" ? "page" : "location") : undefined}
                className={`relative py-3 text-[12px] leading-5 font-medium tracking-[0.35px] transition-colors duration-200 after:absolute after:inset-x-1/4 after:bottom-1 after:h-[2px] after:rounded-full after:transition-colors hover:text-plum motion-reduce:transition-none ${active ? "text-plum after:bg-[#bd9651]" : "text-[#7b6974] after:bg-transparent hover:after:bg-[#e1cda9]"}`}>
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-4 max-[1250px]:gap-3 max-[540px]:gap-2">
          <div className="relative flex h-9 items-center gap-1.5 rounded-full border border-[#e9ded3] bg-[#f7f0e8] px-3 max-[540px]:h-9 max-[540px]:px-2.5">
            <FiGlobe aria-hidden="true" className="size-3.5 text-[#8b713b]" />
            <select aria-label="Display currency" defaultValue="INR" className="w-[51px] cursor-pointer appearance-none border-0 bg-transparent pr-3 text-[11px] leading-normal text-[#65525d] max-[540px]:w-[45px] max-[540px]:text-[10px]">
              <option value="INR">INR ₹</option><option value="USD">USD $</option><option value="GBP">GBP £</option><option value="EUR">EUR €</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 size-2.5" aria-hidden="true" />
          </div>
          <Link className="inline-flex h-10 shrink-0 items-center px-1 text-xs leading-none font-medium whitespace-nowrap text-[#65525d] transition-colors hover:text-plum max-[1180px]:hidden" href={routes.login}>Sign In</Link>
          <Link className={`${planningButton} max-[1250px]:px-4 max-[1250px]:text-[11px] max-[540px]:hidden`} href={routes.signup}>
            <PiCrownSimple aria-hidden="true" className="size-4 shrink-0 text-[#e2be67]" />Start Free Planning
          </Link>
          <Link className="grid size-9 shrink-0 place-items-center rounded-full border border-[#e5d6de] bg-[#fffaf7] text-plum transition-colors hover:border-[#c6a9bb] hover:bg-[#f4e8ee] max-[1180px]:hidden" href={routes.login} aria-label="Sign in to your account"><FiUser aria-hidden="true" className="size-4" /></Link>
          <button ref={menuButton} className="hidden size-9 cursor-pointer place-items-center rounded-full border border-[#e5d6de] bg-[#fffaf7] text-lg text-plum transition-colors hover:bg-[#f4e8ee] max-[1180px]:grid" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute inset-x-0 top-[calc(100%+1px)] hidden flex-col rounded-b-2xl border border-t-0 border-[#e9dedf] bg-[#fffaf7] p-4 shadow-[0_18px_35px_-15px_#43173930] max-[1180px]:flex" id="mobile-navigation">
            <div className="flex flex-col gap-1">
              {navigation.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => selectSection(label)} aria-current={pathname === routes.home && activeSection === label ? "location" : undefined}
                  className={`flex min-w-0 items-center rounded-lg px-4 py-3 text-sm font-medium tracking-[0.15px] ${pathname === routes.home && activeSection === label ? "bg-[#f3e9ed] text-plum" : "text-[#7b6974] hover:bg-[#f8f0ed] hover:text-plum"}`}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#eee4e1] pt-5 text-[13px]">
              <Link href={routes.login} onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link className={planningButton} href={routes.signup} onClick={() => setMenuOpen(false)}><PiCrownSimple aria-hidden="true" className="size-4 text-[#e2be67]" />Start Free Planning</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
