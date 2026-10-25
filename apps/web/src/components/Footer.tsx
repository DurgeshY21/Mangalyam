import Link from "next/link";
import Image from "next/image";
import { FiShield } from "react-icons/fi";
import { routes } from "@/lib/routes";

const footerGroups = [
  {
    title: "Ceremonial Suite",
    links: [
      { label: "Mehendi & Haldi Matrix", href: "/#ceremonies" },
      { label: "Sangeet Master Chronology", href: "/#workspace-preview" },
      { label: "Pheras & Lagna Protocol", href: "/#ceremony-wedding" },
      { label: "The Royal Reception", href: "/#ceremony-reception" },
    ],
  },
  {
    title: "Concierge & Guild",
    links: [
      { label: "Verified Couturiers", href: "/#shared-workspace" },
      { label: "Palace & Heritage Estates", href: "/#ceremonies" },
      { label: "Bespoke Trousseau Planning", href: "/#shared-workspace" },
      { label: "Private Air Charter Desk", href: "/#pricing" },
    ],
  },
  {
    title: "Trust & Sovereignty",
    links: [
      { label: "Membership Tiers", href: "/#pricing" },
      { label: "Family Privacy Shield", href: "/#shared-workspace", emphasized: true },
      { label: "Escrow Security Protocol", href: "/#workspace-preview", emphasized: true },
      { label: "Family Office Portal", href: routes.login },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer id="footer" className="mt-auto bg-[#f4ece6] pt-12 pb-8 text-plum max-[640px]:pt-9 max-[640px]:pb-7">
      <div className="mx-auto w-[min(1400px,calc(100%-80px))] max-[1150px]:w-[calc(100%-64px)] max-[640px]:w-[calc(100%-36px)]">
        <div className="grid grid-cols-[1.8fr_repeat(3,minmax(0,1fr))] gap-x-12 gap-y-8 max-[1000px]:grid-cols-3 max-[640px]:grid-cols-2 max-[640px]:gap-x-6">
          <div className="max-w-[430px] max-[1000px]:col-span-3 max-[640px]:col-span-2">
            <Link href={routes.home} aria-label="Mangalyam home" className="mb-4 inline-flex items-center gap-3">
              <Image src="/images/mangalyam-emblem.png" alt="" width={600} height={600} className="size-12 shrink-0 rounded-full max-[640px]:size-11" />
              <span className="font-display text-[30px] leading-none tracking-[-0.6px] text-plum max-[640px]:text-[28px]">Mangalyam</span>
            </Link>
            <p className="text-xs leading-[1.8] text-[#85717d]">Architecting timeless royal nuptials and high-production multi-day Indian ceremonies with bespoke precision, regal serenity, and transcendent luxury orchestration.</p>
            <p className="mt-4 flex items-center gap-2 text-[9px] leading-normal tracking-[0.3px] uppercase"><FiShield aria-hidden="true" className="size-4 shrink-0 text-[#977310]" />Crafted for India’s Most Prestigious Families</p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-[11px] leading-normal font-medium tracking-[0.3px] uppercase">{group.title}</h2>
              <ul className="space-y-2.5 text-xs leading-[1.5] text-[#85717d]">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={`underline-offset-4 transition-colors hover:text-plum hover:underline motion-reduce:transition-none ${"emphasized" in link && link.emphasized ? "font-semibold text-plum" : ""}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 text-[10px] leading-normal text-[#85717d] max-[640px]:mt-10 max-[640px]:flex-col max-[640px]:items-start">
          <p>© 2026 Mangalyam Nuptial Systems Pvt. Ltd. All royal rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {/* Legal destinations will be linked when their pages are supplied. */}
            <span aria-disabled="true" title="Terms will be available before launch">Terms of Grace</span>
            <span aria-disabled="true" title="Privacy policy will be available before launch">Privacy Sanctum</span>
            <Link href="/#pricing" className="underline-offset-4 hover:text-plum hover:underline">Concierge Dispatch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
