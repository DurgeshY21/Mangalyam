import Image from "next/image";
import Link from "next/link";
import { FiBriefcase, FiCalendar, FiCheckSquare, FiChevronDown, FiCreditCard, FiGift, FiGrid, FiImage, FiMail, FiMonitor, FiSettings, FiRepeat, FiUsers, FiVideo, FiX } from "react-icons/fi";
import { PiBed, PiConfetti, PiForkKnife } from "react-icons/pi";
import type { IconType } from "react-icons";
import { routes } from "@/lib/routes";

type Item = { label: string; icon: IconType; target?: string; soon?: boolean };
const groups: { title: string; items: Item[] }[] = [
  { title: "Overview", items: [{ label: "Dashboard", icon: FiGrid, target: "overview" }, { label: "Calendar", icon: FiCalendar, target: "schedule" }, { label: "Functions", icon: PiConfetti, target: "schedule" }] },
  { title: "Planning", items: [{ label: "Guests & RSVP", icon: FiUsers, target: "rsvp-metric" }, { label: "Vendors", icon: FiBriefcase, target: "vendor-engagements" }, { label: "Budget & Expenses", icon: FiCreditCard, target: "budget-utilization" }, { label: "Tasks", icon: FiCheckSquare, target: "tasks" }, { label: "Catering & Menus", icon: PiForkKnife }, { label: "Accommodation & Transport", icon: PiBed }] },
  { title: "Experience", items: [{ label: "Invitations", icon: FiMail }, { label: "Wedding Website", icon: FiMonitor }, { label: "Gallery", icon: FiImage }, { label: "Livestream", icon: FiVideo, soon: true }, { label: "Shagun & Gifts", icon: FiGift }] },
  { title: "Workspace", items: [{ label: "Organizers", icon: FiUsers }, { label: "Wedding Settings", icon: FiSettings }] },
];

export function DashboardSidebar({ open, onClose, onModule }: { open: boolean; onClose: () => void; onModule: (name: string) => void }) {
  return (
    <>
      {open && <button type="button" aria-label="Close sidebar" onClick={onClose} className="fixed inset-0 z-40 bg-[#25031f]/35 min-[1100px]:hidden" />}
      <aside aria-label="Wedding workspace navigation" className={`fixed inset-y-0 left-0 z-50 flex w-[232px] flex-col border-r border-[#f0e5de] bg-[#fffdfb] px-3 transition-transform duration-200 motion-reduce:transition-none max-[1099px]:w-[252px] ${open ? "translate-x-0" : "max-[1099px]:invisible max-[1099px]:-translate-x-full"}`}>
        <div className="relative flex h-[66px] shrink-0 items-center px-1"><Link href={routes.home} aria-label="Mangalyam home" className="flex h-[50px] w-[190px] items-center overflow-hidden"><Image src="/images/mangalyam-logo.png" alt="Mangalyam — Royal Concierge" width={1200} height={480} preload className="h-full w-full object-cover" /></Link><button type="button" aria-label="Close sidebar" onClick={onClose} className="absolute top-3 right-0 grid size-7 place-items-center rounded-full text-[#88727e] min-[1100px]:hidden"><FiX aria-hidden="true" /></button></div>
        <div className="mb-3 flex items-center justify-between gap-2 rounded-lg bg-[#faf1eb] px-3 py-2"><div><p className="text-[13px] font-semibold text-plum">Aarav &amp; Siya</p><p className="mt-1 text-[10px] text-[#9b8490]">Jaipur · 15 Feb 2027</p></div><FiChevronDown aria-hidden="true" className="size-3 text-[#a18c96]" /></div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-4">
          {groups.map((group) => <div key={group.title}><p className="mb-1.5 px-2 text-[9px] font-medium tracking-[0.4px] text-[#9a8790] uppercase">{group.title}</p><nav aria-label={group.title} className="space-y-0.5">{group.items.map(({ label, icon: Icon, target, soon }) => {
            const className = `flex min-h-[25px] w-full items-center gap-2 rounded-md px-2 text-left text-[11px] leading-4 transition-colors ${label === "Dashboard" ? "border border-[#d6beca] bg-[#f0e5e9] font-semibold text-plum" : "text-[#88727e] hover:bg-[#faf1eb] hover:text-plum"}`;
            const content = <><Icon aria-hidden="true" className="size-3.5 shrink-0" /><span className="min-w-0 flex-1">{label}</span>{soon && <span className="rounded-full bg-[#ffe497] px-1.5 py-0.5 text-[7px] font-semibold text-[#8d6c0a]">SOON</span>}</>;
            return target ? <a key={label} href={`#${target}`} onClick={onClose} aria-current={label === "Dashboard" ? "page" : undefined} className={className}>{content}</a> : <button key={label} type="button" className={`${className} cursor-pointer`} onClick={() => { onClose(); onModule(label); }}>{content}</button>;
          })}</nav></div>)}
        </div>
        <button type="button" onClick={() => { onClose(); onModule("Workspace Switching"); }} aria-label="Workspace options for Aditi Sharma" className="-mx-3 flex shrink-0 cursor-pointer items-center gap-2 border-t border-[#f0e5de] bg-[#faf2ec] px-4 py-3 text-left transition-colors hover:bg-[#f0e5df]">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-plum text-[11px] font-medium text-white">AS</span>
          <span className="min-w-0 flex-1"><span className="block text-[12px] font-medium text-plum">Aditi Sharma</span><span className="mt-0.5 flex items-center gap-1.5 text-[9px] text-[#9b8291]"><span className="rounded-full bg-plum px-1.5 py-0.5 text-[7px] font-semibold text-white">ADMIN</span>Lead</span></span>
          <FiRepeat aria-hidden="true" className="size-3.5 text-[#9b8291]" />
        </button>
      </aside>
    </>
  );
}
