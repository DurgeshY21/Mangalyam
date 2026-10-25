import Image from "next/image";
import { FiCalendar, FiCreditCard, FiMapPin, FiPlus, FiUserCheck, FiUserPlus } from "react-icons/fi";
import { PiHandshake } from "react-icons/pi";

type Props = {
  days: number;
  spent: number;
  budget: number;
  invited: number;
  onAddFunction: () => void;
  onAddGuest: () => void;
  onAddExpense: () => void;
};

const lakhs = (amount: number) => (amount / 100000).toFixed(1).replace(/\.0$/, "");

export function WeddingOverview({ days, spent, budget, invited, onAddFunction, onAddGuest, onAddExpense }: Props) {
  const accepted = Math.round(320 / invited * 100);
  const cards = [
    { id: "countdown", title: "Muhurat", value: `${days} Days`, suffix: "", detail: "15 Feb 2027", icon: FiCalendar, gold: true },
    { id: "budget", title: "Budget Used", value: `₹${(spent / 100000).toFixed(1)}L`, suffix: ` / ${lakhs(budget)}L`, detail: "", icon: FiCreditCard, gold: false },
    { id: "guests", title: "Confirmed RSVPs", value: "320", suffix: ` / ${invited}`, detail: `${accepted}% Accepted`, icon: FiUserCheck, gold: false },
    { id: "vendors", title: "Key Vendors", value: "8", suffix: " of 12", detail: "4 In Shortlist", icon: PiHandshake, gold: true },
  ];

  return (
    <>
      <section aria-labelledby="wedding-overview-title" className="relative mb-6 isolate flex min-h-[350px] items-end overflow-hidden rounded-[20px] bg-plum p-7 shadow-lg shadow-plum/10 min-[1400px]:min-h-[410px] max-[640px]:min-h-[420px] max-[640px]:p-5">
        <Image src="/assets/ceremonies/wedding.png" alt="A wedding ceremony beneath a floral mandap overlooking a palace and lake" fill priority sizes="(min-width: 1100px) calc(100vw - 272px), 100vw" className="-z-20 object-cover object-[center_46%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(36,0,29,0.08)_0%,rgba(36,0,29,0.3)_35%,rgba(36,0,29,0.96)_100%)]" />
        <div className="flex w-full flex-wrap items-end justify-between gap-x-5 gap-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3 text-[14px] font-semibold text-[#ffdf63] max-[640px]:text-xs"><span className="rounded-full bg-[#ffdf63] px-3 py-1 tracking-[0.6px] text-[#76590b]">ROYAL NUPTIALS</span><span className="inline-flex items-center gap-1.5"><FiMapPin aria-hidden="true" className="size-4" />Rambagh Palace, Jaipur</span></div>
            <h1 id="wedding-overview-title" className="font-dashboard-display text-[50px] leading-[1.2] font-normal tracking-[-1.5px] text-white max-[640px]:text-[40px]">Aarav &amp; Siya</h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-white"><span>12 – 15 February 2027</span><span aria-hidden="true">•</span><span className="font-semibold text-[#ffdf63]">{days} Days to Muhurat</span></p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={onAddFunction} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#ffdf63] px-4 text-sm font-semibold text-[#76590b] transition-colors hover:bg-[#ffe887]"><FiPlus aria-hidden="true" className="size-4" />Add Function</button>
            <button type="button" onClick={onAddGuest} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-white/25 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/35"><FiUserPlus aria-hidden="true" className="size-4" />Guest Pass</button>
            <button type="button" onClick={onAddExpense} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-white/25 px-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/35"><FiCreditCard aria-hidden="true" className="size-4" />Expense</button>
          </div>
        </div>
      </section>
      <div className="mb-6 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[380px]:grid-cols-1">
        {cards.map(({ id, title, value, suffix, detail, icon: Icon, gold }) => <article key={id} id={id} className="flex min-h-[145px] scroll-mt-24 items-center justify-between gap-3 rounded-2xl border border-[#f5eee8] bg-white px-5 py-5 shadow-sm max-[640px]:gap-2 max-[640px]:px-3">
          <div className="min-w-0"><h2 className="mb-2 max-w-[135px] text-[13px] leading-5 font-semibold tracking-[0.3px] text-[#8b7e88] uppercase">{title}</h2><p className="font-dashboard-display text-[18px] leading-6 text-[#2b0525]">{value}<span className={id === "budget" || id === "guests" ? "font-dashboard font-normal text-[#8b7e88]" : ""}>{suffix}</span></p>{detail && <p className="mt-1 text-[13px] leading-5 text-[#80610e]">{detail}</p>}{id === "budget" && <div role="meter" aria-label="Budget used" aria-valuenow={Math.round(spent / budget * 100)} aria-valuemin={0} aria-valuemax={100} aria-valuetext={`${Math.round(spent / budget * 100)}% of budget used`} className="mt-2 h-1.5 w-[100px] overflow-hidden rounded-full bg-[#f4ece6]"><div className="h-full bg-plum" style={{ width: `${Math.min(100, spent / budget * 100)}%` }} /></div>}</div>
          <span className={`grid size-12 shrink-0 place-items-center rounded-xl max-[640px]:size-10 ${gold ? "bg-[#fff0b8] text-[#8b690d]" : "bg-[#f0e7e2] text-[#2b0525]"}`}><Icon aria-hidden="true" className="size-6 max-[640px]:size-5" /></span>
        </article>)}
      </div>
    </>
  );
}
