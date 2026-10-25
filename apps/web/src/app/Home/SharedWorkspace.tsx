import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiCreditCard, FiLock, FiMonitor, FiPlay, FiTruck, FiUsers } from "react-icons/fi";
import { PiBed, PiForkKnife } from "react-icons/pi";

function FeatureCard({ icon: Icon, title, description, children }: {
  icon: IconType;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="flex min-w-0 flex-col rounded-xl bg-[#f4ece6] p-7 max-[900px]:p-5">
      <span className="mb-5 grid size-12 place-items-center rounded-[7px] bg-plum text-[#f3ce6e] max-[900px]:mb-4 max-[900px]:size-10">
        <Icon aria-hidden="true" className="size-[23px]" />
      </span>
      <h3 className="mb-2 font-display text-[clamp(22px,2.05vw,30px)] leading-[1.2] tracking-[-0.4px] text-[#260d22] max-[900px]:text-lg max-[640px]:text-[22px]">{title}</h3>
      <p className="mb-5 max-w-[620px] text-[13px] leading-[1.7] text-[#85717d] max-[900px]:text-[11px] max-[640px]:text-xs">{description}</p>
      <div className="mt-auto">{children}</div>
    </article>
  );
}

export function SharedWorkspace() {
  return (
    <section id="shared-workspace" aria-labelledby="workspace-heading" className="scroll-mt-8 bg-[#fff8f5] pt-[72px] pb-[88px] max-[640px]:py-12">
      <div className="mx-auto w-[min(1400px,calc(100%-80px))] max-[1150px]:w-[calc(100%-64px)] max-[640px]:w-[calc(100%-36px)]">
        <div className="mx-auto mb-10 max-w-[780px] text-center max-[640px]:mb-7">
          <p className="mb-3 text-[9px] font-semibold tracking-[1.2px] text-[#8d6c0a] uppercase">The Royal Operating System</p>
          <h2 id="workspace-heading" className="mb-3 font-display text-[clamp(32px,3.5vw,50px)] leading-[1.1] tracking-[-1px] text-[#260d22]">One Shared Nuptial Workspace,<br className="max-[480px]:hidden" /> Zero Chaos.</h2>
          <p className="mx-auto max-w-[720px] text-sm leading-[1.7] text-[#85717d] max-[640px]:text-xs">Eliminate 40+ fragmented WhatsApp groups and lost spreadsheets. Unify bride, groom, extended elders, and luxury vendors in real time.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-[640px]:grid-cols-1 max-[640px]:gap-5">
          <FeatureCard icon={FiUsers} title="Role-Based Family Delegation" description="Empower Chacha, Mama, and wedding planners with dedicated permissions. Give transport teams vehicle checklists and catering managers headcounts, while financial ledgers remain completely confidential.">
            <div className="rounded-[7px] border border-[#efe5de] bg-white p-[18px] max-[480px]:p-3.5">
              <p className="mb-3 text-[8px] font-medium tracking-[0.4px] text-[#85717d] uppercase">Active Delegations</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3ece6] px-2.5 py-1 text-[10px] leading-normal text-[#665343]"><FiTruck aria-hidden="true" className="size-3 text-[#8d6c0a]" />Baraat Logistics Lead (Uncle Vikram)</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3ece6] px-2.5 py-1 text-[10px] leading-normal text-[#665343]"><PiForkKnife aria-hidden="true" className="size-3 text-[#8d6c0a]" />Catering Concierge (Mami Sunita)</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffe39a] px-2.5 py-1 text-[10px] leading-normal font-medium text-[#705005]"><FiLock aria-hidden="true" className="size-3" />Trousseau &amp; Jewelry Vault (Locked to Couple)</span>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon={FiCreditCard} title="Real-Time Multi-Currency Budgeting" description="Seamlessly record tokens, retainers, and GST-compliant invoices across INR (₹), USD ($), and AED (د.إ). Track ceremonial milestones and vendor balances in one shared view.">
            <div className="rounded-[7px] border border-[#efe5de] bg-white p-[18px] max-[480px]:p-3.5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-plum">Recent Milestone Disbursement</p>
                <span className="rounded-full bg-[#ffe39a] px-2 py-0.5 text-[8px] font-semibold tracking-[0.3px] text-[#795704]">Approved</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-[25px] leading-tight text-plum">₹5,00,000</p>
                <p className="text-[9px] text-[#8d6c0a]">Verified by Chief Architect</p>
              </div>
              <p className="mt-1 text-[10px] text-[#85717d]">Stage 2: Royal Palace Floral Scaffolding</p>
            </div>
          </FeatureCard>

          <FeatureCard icon={PiBed} title="Smart 1-Click WhatsApp RSVP & Room Allocation" description="Guests confirm attendance, flight details, and dietary preferences (Jain, Swaminarayan, Vegan) directly in WhatsApp. Allocate diplomatic groups into contiguous palace wings and heritage suites.">
            <div className="rounded-[7px] border border-[#efe5de] bg-white p-[18px] max-[480px]:p-3.5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[8px] font-medium tracking-[0.3px] text-[#85717d] uppercase">Automated Room Matrix</p>
                <span className="text-[9px] font-medium text-[#8d6c0a]">96 of 96 Suites Allocated</span>
              </div>
              <dl className="space-y-2 text-[11px]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><dt className="font-medium text-plum">Maharaja Heritage Wing</dt><dd className="text-[10px] text-[#85717d]">48 Rooms · Groom’s Close Kin</dd></div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><dt className="font-medium text-plum">Zenana Palace Pavilion</dt><dd className="text-[10px] text-[#85717d]">48 Rooms · Bride’s Delegation</dd></div>
              </dl>
            </div>
          </FeatureCard>

          <FeatureCard icon={FiMonitor} title="Curated Guild & NRI Broadcast" description="Connect directly with vetted master couturiers, celebrity choreographers, and heritage estates. Bring overseas loved ones together with function-specific broadcasts from Udaipur, Dubai, and New York.">
            <div className="flex flex-wrap items-center gap-3 rounded-[7px] border border-[#efe5de] bg-white p-4 max-[480px]:p-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#ffe39a] text-[#795704]"><FiPlay aria-hidden="true" className="size-[17px]" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-plum">Global Muhurat Live Stream</p>
                <p className="mt-1 text-[9px] text-[#85717d]">Sample broadcast · Function-scoped viewing</p>
              </div>
              <span className="rounded-full bg-plum px-2 py-1 text-[8px] leading-none font-semibold whitespace-nowrap text-white">240 Remote Families</span>
            </div>
          </FeatureCard>
        </div>
        <p className="mt-4 text-right text-[9px] text-[#a18c97]">Illustrative workspace previews</p>
      </div>
    </section>
  );
}
