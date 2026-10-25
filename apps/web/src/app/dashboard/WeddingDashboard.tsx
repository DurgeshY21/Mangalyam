"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type HTMLInputTypeAttribute } from "react";
import { WeddingOverview } from "./WeddingOverview";
import { FiAlertCircle, FiArrowRight, FiBell, FiChevronRight, FiClock, FiMapPin, FiMenu, FiMoreVertical, FiPlus, FiSearch, FiUser, FiUserPlus, FiUsers } from "react-icons/fi";
import { PiConfetti } from "react-icons/pi";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardDialog } from "@/components/dashboard/DashboardDialog";
import { routes } from "@/lib/routes";
import { BudgetRsvpPanels } from "./BudgetRsvpPanels";
import { VendorAlertsPanels } from "./VendorAlertsPanels";
import { WorkspaceActivity } from "./WorkspaceActivity";
import { demoVendors, initialBudgetCategories, initialCeremonies, initialTasks, type BudgetCategoryId, type CategoryAllocation, type DemoExpense, type Ceremony, type WeddingTask } from "./dashboard-data";

type Modal = { kind: "function" | "guest" | "expense" | "task" | "vendors" | "info" | "ceremony" | "budget" | "guest-list" | "reminders"; name?: string; ceremony?: Ceremony };
// Demonstration snapshot as of 25 October 2026, for the 15 February 2027 wedding.
const daysToWedding = 113;
const primaryButton = "inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md bg-plum px-4 text-xs font-semibold whitespace-nowrap text-white shadow-sm transition-colors hover:bg-[#5a254e]";
const secondaryButton = "inline-flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#eee1db] bg-white px-3.5 text-[11px] font-medium whitespace-nowrap text-plum transition-colors hover:bg-[#f5eaf0]";
const inputClass = "h-11 w-full rounded-lg border border-[#e7d8e0] bg-white px-3 text-sm text-plum outline-none focus:border-gold focus:ring-2 focus:ring-gold/15";

function FormField({ label, name, type = "text", defaultValue, min, step }: { label: string; name: string; type?: HTMLInputTypeAttribute; defaultValue?: string; min?: number; step?: string }) {
  return <label className="block text-xs text-[#806674]">{label}<input name={name} type={type} required defaultValue={defaultValue} min={min} step={step} className={`${inputClass} mt-2`} /></label>;
}

export function WeddingDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ceremonies, setCeremonies] = useState(initialCeremonies);
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [showAllSchedule, setShowAllSchedule] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [guests, setGuests] = useState<{ name: string; size: number }[]>([]);
  const [expenses, setExpenses] = useState<DemoExpense[]>([]);
  const [allocations, setAllocations] = useState<CategoryAllocation[]>(initialBudgetCategories.map(({ id, budget }) => ({ id, budget })));
  const [modal, setModal] = useState<Modal | null>(null);
  const [notice, setNotice] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(100);

  useEffect(() => {
    function searchShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); searchRef.current?.focus(); }
    }
    document.addEventListener("keydown", searchShortcut);
    return () => document.removeEventListener("keydown", searchShortcut);
  }, []);

  const totalBudget = allocations.reduce((sum, category) => sum + category.budget, 0);
  const spent = 1400000 + expenses.reduce((sum, item) => sum + item.amount, 0);
  const invitedGuests = 420 + guests.reduce((sum, guest) => sum + guest.size, 0);
  const openTasks = tasks.filter((task) => !task.done);
  const overdueTasks = openTasks.filter((task) => task.overdue).length;
  const search = query.trim().toLowerCase();
  const matchingCeremonies = ceremonies.filter((item) => `${item.name} ${item.venue} ${item.lead}`.toLowerCase().includes(search));
  const visibleCeremonies = search || showAllSchedule ? matchingCeremonies : matchingCeremonies.slice(0, 3);
  const matchingTasks = tasks.filter((task) => `${task.title} ${task.owner} ${task.priority}`.toLowerCase().includes(search));
  const visibleTasks = search || showAllTasks ? matchingTasks : matchingTasks.slice(0, 4);

  function toggleTask(id: string) {
    setTasks((previous) => previous.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  function saveDemoRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    if (modal?.kind === "budget") {
      const nextAllocations = allocations.map((category) => ({ ...category, budget: Number(text(category.id)) }));
      if (nextAllocations.some((category) => !Number.isFinite(category.budget) || category.budget <= 0)) return;
      setAllocations(nextAllocations);
      setNotice("Category budgets updated in this demo workspace.");
      setModal(null);
      return;
    }
    if (!text("name")) return;
    if (modal?.kind === "function") {
      const date = new Date(`${text("date")}T12:00:00Z`);
      if (Number.isNaN(date.getTime())) return;
      setCeremonies((previous) => [...previous, { id: `function-${nextId.current++}`, name: text("name"), month: date.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase(), day: String(date.getUTCDate()).padStart(2, "0"), year: String(date.getUTCFullYear()), status: "Planning in Progress", time: text("time"), venue: text("venue"), guests: Number(text("guests")), lead: "You", initials: "YO" }]);
      setShowAllSchedule(true);
      setNotice("Function added to this demo workspace.");
    } else if (modal?.kind === "guest") {
      setGuests((previous) => [...previous, { name: text("name"), size: Number(text("size")) }]);
      setNotice("Guest invitation count updated in this demo. No invitation has been sent.");
    } else if (modal?.kind === "expense") {
      setExpenses((previous) => [...previous, { name: text("name"), amount: Number(text("amount")), category: text("category") as BudgetCategoryId }]);
      setNotice("Expense added to the demo ledger. No payment has been made.");
    } else if (modal?.kind === "task") {
      setTasks((previous) => [{ id: `task-${nextId.current++}`, title: text("name"), due: "New task", owner: text("owner"), priority: text("priority") as WeddingTask["priority"], overdue: false, done: false }, ...previous]);
      setNotice("Task added to this demo workspace.");
    }
    setQuery("");
    setModal(null);
  }

  const modalTitle = modal?.kind === "function" ? "Add Function" : modal?.kind === "guest" ? "Add Guest" : modal?.kind === "expense" ? "Add Expense" : modal?.kind === "task" ? "Add Task" : modal?.kind === "vendors" ? "Vendor Directory" : modal?.kind === "budget" ? "Manage Budget" : modal?.kind === "guest-list" ? "Guest Overview" : modal?.kind === "reminders" ? "WhatsApp RSVP Reminder" : modal?.kind === "ceremony" ? modal.ceremony?.name ?? "Function Details" : modal?.name ?? "Wedding Workspace";

  return (
    <div className="min-h-svh bg-[#fff8f5] font-dashboard font-normal antialiased text-plum">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onModule={(name) => setModal({ kind: "info", name })} />
      <div className="min-[1100px]:pl-[232px]">
        <header className="sticky top-0 z-30 border-b border-[#f0e5df] bg-[#fffaf7]/95 backdrop-blur-lg">
          <div className="flex min-h-[64px] items-center justify-between gap-3 px-5 py-2 max-[640px]:flex-wrap max-[640px]:gap-3 max-[640px]:px-4">
            <div className="flex min-w-0 items-center gap-3"><button type="button" aria-label="Open dashboard navigation" onClick={() => setSidebarOpen(true)} className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#eadbe2] min-[1100px]:hidden"><FiMenu aria-hidden="true" /></button><p className="flex items-center gap-2 whitespace-nowrap text-[10px] text-[#9b8791]"><span className="max-[800px]:hidden">Weddings</span><FiChevronRight aria-hidden="true" className="size-3 max-[800px]:hidden" /><span>Aarav &amp; Siya</span><FiChevronRight aria-hidden="true" className="size-3" /><strong className="font-semibold text-plum">Dashboard</strong></p></div>
            <div className="relative min-w-0 max-w-[250px] flex-1 max-[640px]:order-3 max-[640px]:max-w-none max-[640px]:basis-full"><FiSearch aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#a28c97]" /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search functions and tasks" placeholder="Search functions, tasks, team..." className="h-8 w-full rounded-md border border-transparent bg-[#faf2ec] pr-12 pl-9 text-[10px] outline-none placeholder:text-[#ad9aa4] focus:border-[#d6bdcb]" /><kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[9px] text-[#a28c97]">Ctrl K</kbd></div>
            <div className="flex shrink-0 items-center gap-4 max-[640px]:gap-3"><span className="inline-flex items-center gap-1 rounded-full bg-[#ffedb9] px-2.5 py-1.5 text-[9px] font-medium text-[#8d6c0a] max-[900px]:hidden"><FiClock aria-hidden="true" className="size-3" />{daysToWedding} Days to Muhurat</span><details className="relative"><summary aria-label="Wedding notifications" className="relative grid size-7 cursor-pointer list-none place-items-center [&::-webkit-details-marker]:hidden"><FiBell aria-hidden="true" className="size-4" /><span className="absolute top-1 right-1 size-1.5 rounded-full bg-[#c43e58]" /></summary><div className="absolute top-full right-0 mt-3 w-64 rounded-xl border border-[#eadbe2] bg-white p-4 text-xs leading-relaxed shadow-lg"><p className="mb-2 font-semibold">Wedding alerts</p><p className="text-[#a1485e]">{overdueTasks} tasks need attention.</p><p className="mt-1 text-[#8b7280]">Sangeet artist soundcheck is pending.</p></div></details><button type="button" onClick={() => setModal({ kind: "function" })} className={`${primaryButton} max-[640px]:hidden`}><FiPlus aria-hidden="true" className="size-3.5 text-[#e8c96a]" />Add Function</button><Link href={routes.login} aria-label="Sign in to your account" className="grid size-7 place-items-center rounded-full bg-[#2b0525] text-white"><FiUser aria-hidden="true" className="size-3.5" /></Link></div>
          </div>
        </header>

        <div id="overview" className="scroll-mt-24 px-5 pt-5 pb-8 max-[640px]:px-4 max-[640px]:pt-5">
          <WeddingOverview days={daysToWedding} spent={spent} budget={totalBudget} invited={invitedGuests} onAddFunction={() => setModal({ kind: "function" })} onAddGuest={() => setModal({ kind: "guest" })} onAddExpense={() => setModal({ kind: "expense" })} />
          <div role="status" aria-live="polite">{notice && <p className="mb-4 rounded-lg border border-[#eadbbd] bg-[#fff4d8] px-4 py-3 text-xs leading-relaxed text-[#8d6c0a]">{notice}</p>}</div>
          {search && <p className="mb-4 text-xs text-[#9b8291]">{matchingCeremonies.length} functions and {matchingTasks.length} tasks match “{query}”.</p>}
          <div className="grid grid-cols-[minmax(0,2.1fr)_minmax(250px,1fr)] items-start gap-5 max-[900px]:grid-cols-1">
            <section id="schedule" aria-labelledby="schedule-title" className="scroll-mt-24 rounded-xl border border-[#f0e5df] bg-white p-5 max-[480px]:p-4">
              <div className="mb-4 flex items-center justify-between gap-4"><div><h2 id="schedule-title" className="flex items-center gap-2 text-base leading-6 font-semibold"><PiConfetti aria-hidden="true" className="size-[19px] text-[#9e7f20]" />Ceremonial Schedule</h2><p className="mt-1 pl-[27px] text-[10px] text-[#9b8291]">{ceremonies.length} functions across your wedding celebration</p></div><button type="button" onClick={() => setShowAllSchedule(!showAllSchedule)} className="inline-flex shrink-0 cursor-pointer items-center gap-1 text-[10px] text-[#9e7f20]">{showAllSchedule ? "Show less" : `View all (${ceremonies.length})`}<FiArrowRight aria-hidden="true" className="size-3" /></button></div>
              <div className="space-y-3">
                {visibleCeremonies.map((ceremony) => <article key={ceremony.id} className="flex min-h-[114px] items-start gap-3 rounded-lg bg-[#faf2ec] p-3.5 max-[480px]:gap-2.5 max-[480px]:p-3"><div className={`flex w-11 shrink-0 flex-col items-center rounded-md px-2 py-2 ${ceremony.isWedding ? "bg-plum text-white" : "bg-[#ffe8ab] text-[#8d6c0a]"}`}><span className="text-[8px] font-semibold">{ceremony.month}</span><strong className="text-[21px] leading-tight font-medium">{ceremony.day}</strong></div><div className="min-w-0 flex-1"><h3 className="mb-1 text-[13px] leading-5 font-semibold">{ceremony.name}</h3><span className="inline-block rounded-full bg-[#f1e1c3] px-1.5 py-0.5 text-[8px] text-[#957225]">{ceremony.status}</span><div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] leading-normal text-[#967b89]"><span className="inline-flex items-center gap-1"><FiClock aria-hidden="true" className="size-3" />{ceremony.time}</span><span className="inline-flex items-center gap-1"><FiMapPin aria-hidden="true" className="size-3" />{ceremony.venue}</span></div><p className="mt-1 flex items-center gap-1 text-[9px] text-[#967b89]"><FiUsers aria-hidden="true" className="size-3" />{ceremony.guests} Guests</p></div><div className="flex items-center gap-2 self-center max-[640px]:hidden"><span className={`grid size-7 place-items-center rounded-full text-[8px] font-semibold text-white ${ceremony.isWedding ? "bg-[#2b0525]" : "bg-[#8d567a]"}`}>{ceremony.initials}</span><div className="w-[42px] text-[9px] leading-tight"><p className="text-[7px] tracking-wide text-[#a18b98] uppercase">{ceremony.isWedding ? "Admin" : "Lead"}</p>{ceremony.lead}</div></div><button type="button" aria-label={`View details for ${ceremony.name}`} onClick={() => setModal({ kind: "ceremony", ceremony })} className="grid size-6 shrink-0 cursor-pointer place-items-center self-center rounded-full text-[#a18b98] hover:bg-[#ecdde5]"><FiMoreVertical aria-hidden="true" className="size-3.5" /></button></article>)}
                {visibleCeremonies.length === 0 && <p className="rounded-lg bg-[#faf2ec] px-4 py-8 text-center text-xs text-[#9b8291]">No functions match your search.</p>}
              </div>
            </section>

            <section id="tasks" aria-labelledby="tasks-title" className="flex min-h-[460px] scroll-mt-24 flex-col rounded-xl border border-[#f0e5df] bg-white p-5 max-[900px]:min-h-0 max-[480px]:p-4">
              <div className="mb-4 flex items-center justify-between gap-3"><h2 id="tasks-title" className="flex items-center gap-2 text-base leading-6 font-semibold"><FiBell aria-hidden="true" className="size-4 text-[#ba294b]" />Critical Tasks</h2><button type="button" onClick={() => setShowAllTasks(!showAllTasks)} className="inline-flex cursor-pointer items-center gap-1 text-[10px] text-[#9e7f20]">{showAllTasks ? "Show less" : "View tasks"}<FiArrowRight aria-hidden="true" className="size-3" /></button></div>
              <div className="space-y-2">
                {visibleTasks.map((task) => <label key={task.id} className={`flex cursor-pointer items-start gap-2 rounded-lg bg-[#faf2ec] p-3 transition-opacity ${task.done ? "opacity-55" : ""}`}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} className="mt-0.5 size-3.5 shrink-0 cursor-pointer accent-plum" /><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-1.5"><span title={task.title} className={`truncate text-[11px] leading-4 font-medium ${task.done ? "line-through" : ""}`}>{task.title}</span><span className={`shrink-0 rounded px-1.5 py-0.5 text-[7px] ${task.priority === "Urgent" ? "bg-[#ffd6d8] text-[#b7344c]" : task.priority === "High" ? "bg-[#ffe49a] text-[#8d6c0a]" : "bg-[#f0e6e1] text-[#8a7581]"}`}>{task.priority}</span></span><span className={`mt-1.5 flex flex-wrap items-center gap-1 text-[9px] leading-[14px] ${task.overdue && !task.done ? "text-[#ba3d55]" : "text-[#9b8291]"}`}>{task.overdue && !task.done && <FiAlertCircle aria-hidden="true" className="size-2.5" />}{task.done ? "Completed" : task.due}<span aria-hidden="true">·</span>{task.owner}</span></span></label>)}
                {visibleTasks.length === 0 && <p className="py-8 text-center text-xs text-[#9b8291]">No tasks match your search.</p>}
              </div>
              <div className="mt-auto flex items-center justify-between gap-2 pt-8 text-[9px]"><p className="text-[#a18b98]">{8 + tasks.filter((task) => task.done).length} tasks completed this week</p><button type="button" onClick={() => setModal({ kind: "task" })} className="inline-flex cursor-pointer items-center gap-1 font-medium"><FiPlus aria-hidden="true" className="size-3" />Add Task</button></div>
            </section>
          </div>
          <BudgetRsvpPanels expenses={expenses} allocations={allocations} addedGuests={guests} onManageBudget={() => setModal({ kind: "budget" })} onManageGuests={() => setModal({ kind: "guest-list" })} onReminders={() => setModal({ kind: "reminders" })} />
          <VendorAlertsPanels onExploreVendors={() => setModal({ kind: "vendors" })} />
          <WorkspaceActivity />
        </div>
      </div>

      {modal && <DashboardDialog title={modalTitle} onClose={() => setModal(null)}>
        {["function", "guest", "expense", "task"].includes(modal.kind) && <form onSubmit={saveDemoRecord} className="space-y-4">
          <p className="text-[11px] leading-relaxed text-[#9b8291]">Add a record to this demo workspace. Changes stay in this tab.</p>
          <FormField label={modal.kind === "function" ? "Function name" : modal.kind === "guest" ? "Guest or household name" : modal.kind === "expense" ? "Expense description" : "Task title"} name="name" />
          {modal.kind === "function" && <><div className="grid grid-cols-2 gap-3"><FormField label="Date" name="date" type="date" defaultValue="2027-02-14" /><FormField label="Expected guests" name="guests" type="number" min={0} step="1" defaultValue="100" /></div><FormField label="Time window" name="time" defaultValue="7:00 PM – 10:00 PM" /><FormField label="Venue" name="venue" /></>}
          {modal.kind === "guest" && <FormField label="People in household" name="size" type="number" min={1} step="1" defaultValue="1" />}
          {modal.kind === "expense" && <><FormField label="Amount (INR)" name="amount" type="number" min={0.01} step="0.01" /><label className="block text-xs text-[#806674]">Category<select name="category" defaultValue="decor" className={`${inputClass} mt-2`}>{initialBudgetCategories.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></label></>}
          {modal.kind === "task" && <><FormField label="Assignee" name="owner" defaultValue="You" /><label className="block text-xs text-[#806674]">Priority<select name="priority" defaultValue="High" className={`${inputClass} mt-2`}><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select></label></>}
          <div className="flex justify-end gap-2 pt-2"><button type="button" className={secondaryButton} onClick={() => setModal(null)}>Cancel</button><button type="submit" className={primaryButton}><FiPlus aria-hidden="true" />Add {modal.kind === "function" ? "Function" : modal.kind === "guest" ? "Guest" : modal.kind === "expense" ? "Expense" : "Task"}</button></div>
        </form>}
        {modal.kind === "budget" && <form onSubmit={saveDemoRecord} className="space-y-4"><p className="text-xs leading-relaxed text-[#9b8291]">Set the allocation for each category. The total cap and utilization figures update together in this demo.</p>{initialBudgetCategories.map((category) => <FormField key={category.id} label={`${category.label} (INR)`} name={category.id} type="number" min={1} step="1" defaultValue={String(allocations.find((item) => item.id === category.id)?.budget ?? category.budget)} />)}<div className="flex justify-end gap-2"><button type="button" onClick={() => setModal(null)} className={secondaryButton}>Cancel</button><button type="submit" className={primaryButton}>Save Budget</button></div></form>}
        {modal.kind === "guest-list" && <div className="space-y-4"><p className="text-xs leading-relaxed text-[#9b8291]">Sample wedding: 320 confirmed, {75 + guests.reduce((sum, guest) => sum + guest.size, 0)} awaiting response, and 25 declined.</p><div className="rounded-lg bg-[#faf2ec] p-4 text-sm">{invitedGuests} invited guests across {165 + guests.length} households</div>{guests.length > 0 && <ul className="divide-y divide-[#eadbe2]">{guests.map((guest, index) => <li key={`${guest.name}-${index}`} className="flex items-center justify-between gap-3 py-3 text-xs"><span>{guest.name}</span><span className="text-[#9b8291]">{guest.size} invited · Awaiting RSVP</span></li>)}</ul>}<button type="button" onClick={() => setModal({ kind: "guest" })} className={primaryButton}><FiUserPlus aria-hidden="true" />Add Guest</button></div>}
        {modal.kind === "reminders" && <form className="space-y-4" onSubmit={async (event) => { event.preventDefault(); const message = String(new FormData(event.currentTarget).get("message") ?? ""); try { await navigator.clipboard.writeText(message); setNotice("RSVP reminder copied. No messages have been sent."); setModal(null); } catch { setNotice("Clipboard access is unavailable. You can select and copy the reminder manually."); } }}><p className="text-xs leading-relaxed text-[#9b8291]">Reminder preview for {75 + guests.reduce((sum, guest) => sum + guest.size, 0)} guests awaiting a response. No messages are sent from this demo.</p><label className="block text-xs text-[#806674]">Message<textarea name="message" required rows={5} className="mt-2 w-full resize-y rounded-lg border border-[#e7d8e0] bg-white p-3 text-sm leading-relaxed text-plum outline-gold" defaultValue="Namaste! We can’t wait to celebrate Aarav & Siya’s wedding with you. Please confirm your attendance and any dietary preferences using your personal invitation link. With love, the wedding family." /></label><div className="flex justify-end gap-2"><button type="button" onClick={() => setModal(null)} className={secondaryButton}>Close</button><button type="submit" className={primaryButton}>Copy Reminder</button></div></form>}
        {modal.kind === "vendors" && <><p className="mb-4 text-xs leading-relaxed text-[#9b8291]">Illustrative vendor records for this sample wedding. Live vendor discovery will be added later.</p><div className="space-y-3">{demoVendors.map((vendor) => <div key={vendor.name} className="flex items-center justify-between gap-3 rounded-lg border border-[#eadbe2] bg-white p-3"><div><p className="text-xs font-semibold">{vendor.name}</p><p className="mt-1 text-[10px] text-[#9b8291]">{vendor.category}</p></div><span className="rounded-full bg-[#fff0c3] px-2 py-1 text-[9px] text-[#8d6c0a]">{vendor.status}</span></div>)}</div></>}
        {modal.kind === "info" && <div className="text-sm leading-relaxed text-[#9b8291]"><p className="mb-4">{modal.name} is coming soon. You can explore your wedding overview, schedule, tasks, and the sample planning actions today.</p><button type="button" onClick={() => setModal(null)} className={primaryButton}>Back to Dashboard</button></div>}
        {modal.kind === "ceremony" && modal.ceremony && <div className="space-y-3 text-sm leading-relaxed text-[#9b8291]"><p className="font-medium text-plum">{modal.ceremony.status}</p><p>{modal.ceremony.day} {modal.ceremony.month} {modal.ceremony.year ?? "2027"} · {modal.ceremony.time}</p><p className="flex items-center gap-2"><FiMapPin aria-hidden="true" />{modal.ceremony.venue}</p><p>{modal.ceremony.guests} expected guests</p><p>Coordinator: {modal.ceremony.lead}</p></div>}
      </DashboardDialog>}
    </div>
  );
}
