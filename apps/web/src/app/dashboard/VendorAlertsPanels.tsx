"use client";

import { useState, type FormEvent } from "react";
import { FiAlertTriangle, FiArrowRight, FiCamera, FiCheckCircle, FiChevronRight, FiClock, FiDisc, FiMessageSquare } from "react-icons/fi";
import { PiBed, PiBowlFood, PiMoney, PiPaintBrushBroad, PiStorefront } from "react-icons/pi";
import { DashboardDialog } from "@/components/dashboard/DashboardDialog";
import { demoVendors } from "./dashboard-data";

type Detail = { kind: "vendor"; index: number } | { kind: "rooms" } | { kind: "payment" } | { kind: "setup" } | { kind: "contact"; recipient: string; message: string };
const vendorIcons = [PiBowlFood, FiCamera, PiPaintBrushBroad, FiDisc];
const vendorColors = ["bg-plum text-white", "bg-[#f0e7e1] text-plum", "bg-[#ffe9a8] text-[#9e7f20]", "bg-[#f0e7e1] text-[#9b8291]"];
const actionClass = "cursor-pointer text-[9px] leading-normal font-medium text-plum underline-offset-4 hover:underline";
const primaryClass = "inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-plum px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#59254f]";
const fieldClass = "h-10 w-full rounded-lg border border-[#e7d8e0] bg-white px-3 text-sm text-plum outline-gold";

export function VendorAlertsPanels({ onExploreVendors }: { onExploreVendors: () => void }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const [roomsAssigned, setRoomsAssigned] = useState(false);
  const [setupAdjusted, setSetupAdjusted] = useState(false);
  const [setupWindow, setSetupWindow] = useState("2:30 PM – 4:00 PM");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const activeAlerts = 3 - Number(roomsAssigned) - Number(setupAdjusted);
  const closeDialog = () => { setDetail(null); setFormError(""); };

  function adjustSetup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const start = String(values.get("start"));
    const end = String(values.get("end"));
    const minutes = (time: string) => { const [hour, minute] = time.split(":").map(Number); return hour * 60 + minute; };
    const startMinute = minutes(start);
    const endMinute = minutes(end);
    if (!Number.isFinite(startMinute) || !Number.isFinite(endMinute) || endMinute - startMinute < 90) return setFormError("Allow at least 90 minutes for installation.");
    if (startMinute < 870 && endMinute > 720) return setFormError("This window still overlaps maintenance (12:00 PM – 2:30 PM).");
    if (endMinute > 960) return setFormError("Installation must finish before the Sangeet begins at 4:00 PM.");
    const format = (time: string) => { const [hour, minute] = time.split(":").map(Number); return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`; };
    setSetupWindow(`${format(start)} – ${format(end)}`);
    setSetupAdjusted(true);
    setNotice("Setup window updated in this demo. No vendor has been contacted.");
    closeDialog();
  }

  function downloadInvoice() {
    const invoice = ["MANGALYAM — SAMPLE INVOICE", "Illustrative record only. Not a payment request or tax invoice.", "", "Wedding: Aarav & Siya", "Vendor: Royal Caterers Rajasthan", "Milestone: Second-stage catering deposit", "Amount: INR 1,50,000", "Due: 29 October 2026", "Status: Pending review", "", "No payment details are included. No payment has been made."].join("\n");
    const url = URL.createObjectURL(new Blob([invoice], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "royal-caterers-sample-invoice.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Sample invoice downloaded as a text file. No payment has been made.");
  }

  const dialogTitle = detail?.kind === "vendor" ? demoVendors[detail.index].name : detail?.kind === "rooms" ? "Guest Room Allocation" : detail?.kind === "payment" ? "Review Milestone Payment" : detail?.kind === "setup" ? "Adjust Sangeet Setup" : detail?.kind === "contact" ? `Message ${detail.recipient}` : "Wedding Operations";

  return (
    <>
      <div id="vendor-operations" className="mt-5 grid scroll-mt-24 grid-cols-2 items-stretch gap-5 max-[900px]:grid-cols-1">
        <section id="vendor-engagements" aria-labelledby="vendor-engagements-title" className="flex min-h-[430px] min-w-0 scroll-mt-24 flex-col rounded-xl border border-[#f0e5df] bg-white p-5 max-[480px]:p-4">
          <div className="mb-4 flex items-center justify-between gap-3"><div><h2 id="vendor-engagements-title" className="flex items-center gap-2 text-base leading-6 font-semibold"><PiStorefront aria-hidden="true" className="size-[19px] text-[#9e7f20]" />Key Vendor Engagements</h2><p className="mt-0.5 pl-[27px] text-[10px] text-[#9b8291]">Live contracts &amp; vendor milestones</p></div><span className="shrink-0 rounded-full bg-[#f4ece6] px-2 py-1 text-[8px] font-medium">8 of 12 Booked</span></div>
          <div className="space-y-2">
            {demoVendors.map((vendor, index) => {
              const Icon = vendorIcons[index];
              return <button key={vendor.name} type="button" onClick={() => setDetail({ kind: "vendor", index })} className="flex min-h-[58px] w-full cursor-pointer items-center gap-2.5 rounded-lg bg-[#faf2ec] p-2.5 text-left transition-colors hover:bg-[#f3e7e0]"><span className={`grid size-9 shrink-0 place-items-center rounded-md ${vendorColors[index]}`}><Icon aria-hidden="true" className="size-[18px]" /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs leading-5 font-medium">{vendor.name}</span><span className="block truncate text-[9px] leading-[1.5] text-[#9b8291]">{vendor.category}</span></span><span className={`max-w-[94px] shrink-0 rounded-full px-2 py-1 text-[7px] leading-none whitespace-nowrap max-[420px]:hidden ${vendor.status === "Moodboard Review" ? "bg-[#ffe492] text-[#8d6c0a]" : "bg-[#eee3dc] text-[#7b546b]"}`}>{vendor.status}</span><FiChevronRight aria-hidden="true" className="size-3 shrink-0 text-[#9b8291]" /></button>;
            })}
          </div>
          <button type="button" onClick={onExploreVendors} className="mt-auto inline-flex cursor-pointer items-center gap-1.5 self-start pt-8 text-[10px] font-medium text-[#9e7f20] hover:underline hover:underline-offset-4">Explore Recommended Rajasthan Vendors<FiArrowRight aria-hidden="true" className="size-3" /></button>
        </section>

        <section aria-labelledby="operations-alerts-title" className="min-w-0 rounded-xl border border-[#f0e5df] bg-white p-5 max-[480px]:p-4">
          <div className="mb-4 flex items-center justify-between gap-3"><div><h2 id="operations-alerts-title" className="flex items-center gap-2 text-base leading-6 font-semibold"><FiAlertTriangle aria-hidden="true" className="size-4 shrink-0 text-[#a11b36]" />Alerts &amp; Operational Conflicts</h2><p className="mt-0.5 pl-6 text-[10px] text-[#9b8291]">{activeAlerts} logistical {activeAlerts === 1 ? "item requires" : "items require"} immediate sign-off</p></div><span aria-label={`${activeAlerts} active alerts`} className="size-2 shrink-0 rounded-full bg-[#c72d45]" /></div>
          <div className="space-y-2">
            <article className="flex items-start gap-3 rounded-lg bg-[#faf2ec] p-3.5"><span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${roomsAssigned ? "bg-[#e7efda] text-[#637a2b]" : "bg-[#ffe492] text-[#9e7f20]"}`}>{roomsAssigned ? <FiCheckCircle aria-hidden="true" className="size-3.5" /> : <PiBed aria-hidden="true" className="size-4" />}</span><div className="min-w-0 flex-1"><div className="mb-1 flex items-start justify-between gap-3"><h3 className="text-xs leading-[1.5] font-medium">{roomsAssigned ? "Guest Room Allocation Drafted" : "Unallocated Guest Rooms"}</h3><span className="pt-0.5 text-[8px] text-[#9e7f20]">Hospitality</span></div><p className="text-[10px] leading-[1.65] text-[#9b8291]">{roomsAssigned ? "A demo allocation for 24 outstation guests across 12 suites is ready for review." : "24 outstation guests arriving on 12 Feb currently have no assigned suites at Rambagh Palace or adjacent royal villas."}</p><div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"><button type="button" onClick={() => setDetail({ kind: "rooms" })} className={actionClass}>{roomsAssigned ? "View Suite Draft" : "Auto-assign Suites"}</button><span aria-hidden="true" className="size-1 rounded-full bg-[#d8c1cf]" /><button type="button" onClick={() => setDetail({ kind: "contact", recipient: "Guest Desk", message: "Please review suite assignments for 24 outstation guests arriving on 12 February. We need 12 suites across Rambagh Palace and the adjacent villas." })} className={`${actionClass} text-[#9b8291]`}>Contact Guest Desk</button></div></div></article>

            <article className="flex items-start gap-3 rounded-lg bg-[#faf2ec] p-3.5"><span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#f6e1dc] text-[#bd3f54]"><PiMoney aria-hidden="true" className="size-4" /></span><div className="min-w-0 flex-1"><div className="mb-1 flex items-start justify-between gap-3"><h3 className="text-xs leading-[1.5] font-medium">Milestone Payment Due in 4 Days</h3><span className="pt-0.5 text-[8px] text-[#bd3f54]">Finance</span></div><p className="text-[10px] leading-[1.65] text-[#9b8291]">₹1,50,000 second-stage deposit to Royal Caterers is due on 29 October 2026.</p><div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"><button type="button" onClick={() => setDetail({ kind: "payment" })} className={actionClass}>Review &amp; Pay</button><span aria-hidden="true" className="size-1 rounded-full bg-[#d8c1cf]" /><button type="button" onClick={downloadInvoice} className={`${actionClass} text-[#9b8291]`}>Download Invoice</button></div></div></article>

            <article className="flex items-start gap-3 rounded-lg bg-[#faf2ec] p-3.5"><span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full ${setupAdjusted ? "bg-[#e7efda] text-[#637a2b]" : "bg-[#eee3dc] text-plum"}`}>{setupAdjusted ? <FiCheckCircle aria-hidden="true" className="size-3.5" /> : <FiClock aria-hidden="true" className="size-3.5" />}</span><div className="min-w-0 flex-1"><div className="mb-1 flex items-start justify-between gap-3"><h3 className="text-xs leading-[1.5] font-medium">{setupAdjusted ? "Sangeet Setup Window Adjusted" : "Sangeet Stage Setup Window Conflict"}</h3><span className="pt-0.5 text-[8px] text-[#9b8291]">Logistics</span></div><p className="text-[10px] leading-[1.65] text-[#9b8291]">{setupAdjusted ? `Demo installation window: ${setupWindow} on 13 Feb. Maintenance no longer overlaps.` : "Lawn maintenance overlaps with truss installation by 1.5 hours on 13 Feb."}</p><div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"><button type="button" onClick={() => { setFormError(""); setDetail({ kind: "setup" }); }} className={actionClass}>Adjust Setup Time</button><span aria-hidden="true" className="size-1 rounded-full bg-[#d8c1cf]" /><button type="button" onClick={() => setDetail({ kind: "contact", recipient: "Venue Manager", message: `Please review the Sangeet stage setup on 13 February. Maintenance occupies the lawn from 12:00 PM to 2:30 PM. Proposed setup: ${setupWindow}, before the 4:00 PM event.` })} className={`${actionClass} text-[#9b8291]`}>Message Venue Manager</button></div></div></article>
          </div>
        </section>
      </div>
      <div role="status" aria-live="polite">{notice && <p className="mt-3 rounded-lg border border-[#eadbbd] bg-[#fff4d8] px-4 py-3 text-xs leading-relaxed text-[#8d6c0a]">{notice}</p>}</div>

      {detail && <DashboardDialog title={dialogTitle} onClose={closeDialog}>
        {detail.kind === "vendor" && <div className="space-y-4"><p className="text-xs leading-relaxed text-[#9b8291]">Sample engagement record for Aarav &amp; Siya’s wedding.</p><div className="rounded-lg bg-white p-4 text-sm"><p className="font-medium">{demoVendors[detail.index].category}</p><p className="mt-2 text-[#9e7f20]">{demoVendors[detail.index].status}</p></div><p className="text-xs leading-relaxed text-[#9b8291]">Contracts, quotes, and deliverables will be connected as vendor management is built.</p><button type="button" onClick={closeDialog} className={primaryClass}>Done</button></div>}
        {detail.kind === "rooms" && <div className="space-y-4"><p className="text-xs leading-relaxed text-[#9b8291]">Illustrative allocation only. No hotel availability has been verified and no rooms will be booked.</p><div className="space-y-2">{[{ name: "Bride’s relatives", guests: 8, suites: 4 }, { name: "Groom’s relatives", guests: 10, suites: 5 }, { name: "Overseas family", guests: 6, suites: 3 }].map((group) => <div key={group.name} className="flex items-center justify-between gap-3 rounded-lg bg-white p-3 text-xs"><span>{group.name}</span><span className="text-[#9b8291]">{group.guests} guests · {group.suites} suites</span></div>)}</div><button type="button" onClick={() => { setRoomsAssigned(true); setNotice("Demo suite allocation drafted. No hotel bookings have been made."); closeDialog(); }} className={primaryClass}>{roomsAssigned ? "Keep Demo Allocation" : "Apply Demo Allocation"}</button></div>}
        {detail.kind === "payment" && <div className="space-y-4"><p className="rounded-lg border border-[#eadbbd] bg-[#fff4d8] p-3 text-xs leading-relaxed text-[#8d6c0a]">Payment preview only. This frontend does not process payments.</p><dl className="space-y-3 text-sm"><div><dt className="text-xs text-[#9b8291]">Vendor</dt><dd>Royal Caterers Rajasthan</dd></div><div><dt className="text-xs text-[#9b8291]">Second-stage deposit</dt><dd className="font-dashboard-display text-2xl">₹1,50,000</dd></div><div><dt className="text-xs text-[#9b8291]">Due date</dt><dd>29 October 2026</dd></div></dl><div className="flex flex-wrap gap-2"><button type="button" onClick={downloadInvoice} className={primaryClass}>Download Sample Invoice</button><button type="button" onClick={closeDialog} className="cursor-pointer px-3 text-xs text-[#9b8291]">Close</button></div></div>}
        {detail.kind === "setup" && <form onSubmit={adjustSetup} className="space-y-4"><p className="text-xs leading-relaxed text-[#9b8291]">13 February 2027 · Maintenance: 12:00 PM – 2:30 PM. Allow 90 minutes for installation and finish before the 4:00 PM Sangeet.</p><div className="grid grid-cols-2 gap-3"><label className="text-xs text-[#806674]">Setup begins<input type="time" name="start" required defaultValue="14:30" className={`${fieldClass} mt-2`} /></label><label className="text-xs text-[#806674]">Setup ends<input type="time" name="end" required defaultValue="16:00" className={`${fieldClass} mt-2`} /></label></div>{formError && <p role="alert" className="text-xs leading-relaxed text-[#b7344c]">{formError}</p>}<button type="submit" className={primaryClass}>Save Demo Setup Window</button></form>}
        {detail.kind === "contact" && <form className="space-y-4" onSubmit={async (event) => { event.preventDefault(); const message = String(new FormData(event.currentTarget).get("message") ?? ""); try { await navigator.clipboard.writeText(message); setNotice(`Message draft copied for ${detail.recipient}. No message has been sent.`); closeDialog(); } catch { setFormError("Clipboard access is unavailable. Select and copy the message manually."); } }}><p className="text-xs leading-relaxed text-[#9b8291]">Draft only — no messages are sent from this demo.</p><label className="block text-xs text-[#806674]">Message<textarea name="message" rows={5} required defaultValue={detail.message} className="mt-2 w-full resize-y rounded-lg border border-[#e7d8e0] bg-white p-3 text-sm leading-relaxed outline-gold" /></label>{formError && <p role="alert" className="text-xs text-[#b7344c]">{formError}</p>}<button type="submit" className={primaryClass}><FiMessageSquare aria-hidden="true" />Copy Message</button></form>}
      </DashboardDialog>}
    </>
  );
}
