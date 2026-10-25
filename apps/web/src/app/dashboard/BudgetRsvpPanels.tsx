import { FiArrowRight, FiCamera, FiMessageSquare, FiMusic, FiUsers } from "react-icons/fi";
import { PiArmchair, PiFlowerLotus, PiForkKnife, PiWallet } from "react-icons/pi";
import { initialBudgetCategories, type CategoryAllocation, type DemoExpense } from "./dashboard-data";

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const categoryIcons = { venue: PiArmchair, catering: PiForkKnife, decor: PiFlowerLotus, photography: FiCamera, entertainment: FiMusic };
const compactAmount = (value: number) => `₹${(value / 100000).toFixed(1).replace(/\.0$/, "")}L`;

type Props = {
  expenses: DemoExpense[];
  allocations: CategoryAllocation[];
  addedGuests: { name: string; size: number }[];
  onManageBudget: () => void;
  onManageGuests: () => void;
  onReminders: () => void;
};

export function BudgetRsvpPanels({ expenses, allocations, addedGuests, onManageBudget, onManageGuests, onReminders }: Props) {
  const totalBudget = allocations.reduce((sum, category) => sum + category.budget, 0);
  const extraExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paid = 980000 + extraExpenses;
  const committed = 420000;
  const remaining = Math.max(0, totalBudget - paid - committed);
  const paidWidth = Math.min(100, paid / totalBudget * 100);
  const committedWidth = Math.min(100 - paidWidth, committed / totalBudget * 100);
  const confirmed = 320;
  const awaiting = 75 + addedGuests.reduce((sum, guest) => sum + guest.size, 0);
  const declined = 25;
  const invited = confirmed + awaiting + declined;
  const confirmedPercent = Math.round(confirmed / invited * 100);
  const segments = [
    { count: awaiting, color: "#826500" },
    { count: confirmed, color: "#2b0525" },
    { count: declined, color: "#e9dfe3" },
  ];
  const legend = [
    { label: "Confirmed Guests", count: confirmed, color: "bg-[#2b0525]", tone: "text-plum" },
    { label: "Awaiting Response", count: awaiting, color: "bg-[#826500]", tone: "text-[#8d6c0a]" },
    { label: "Declined / Regrets", count: declined, color: "bg-[#d5c7d0]", tone: "text-[#9b8291]" },
  ];

  return (
    <div id="budget-rsvp" className="mt-5 grid scroll-mt-24 grid-cols-[minmax(0,2.1fr)_minmax(250px,1fr)] items-stretch gap-5 max-[900px]:grid-cols-1">
      <section id="budget-utilization" aria-labelledby="budget-utilization-title" className="min-w-0 scroll-mt-24 rounded-xl border border-[#f0e5df] bg-white p-5 max-[480px]:p-4">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div><h2 id="budget-utilization-title" className="flex items-center gap-2 text-base leading-6 font-semibold"><PiWallet aria-hidden="true" className="size-[19px] text-[#9e7f20]" />Budget Utilization</h2><p className="mt-0.5 pl-[27px] text-[10px] text-[#9b8291]">Allocated pool: {currency.format(totalBudget)} total cap</p></div>
          <button type="button" onClick={onManageBudget} className="inline-flex shrink-0 cursor-pointer items-center gap-1 text-[10px] text-[#9e7f20]">Manage Budget<FiArrowRight aria-hidden="true" className="size-3" /></button>
        </div>

        <svg viewBox="0 0 100 2" preserveAspectRatio="none" role="img" aria-label={`Budget: ${currency.format(paid)} paid, ${currency.format(committed)} committed, ${currency.format(remaining)} remaining`} className="mb-2 h-2 w-full overflow-hidden rounded-full">
          <rect width="100" height="2" fill="#e9e1db" /><rect width={paidWidth} height="2" fill="#431739" /><rect x={paidWidth} width={committedWidth} height="2" fill="#eac74d" />
        </svg>
        <div className="mb-4 flex flex-wrap justify-between gap-x-3 gap-y-1.5 text-[8px] leading-normal text-[#9b8291]">
          {[{ label: "Paid", amount: paid, color: "bg-plum" }, { label: "Committed", amount: committed, color: "bg-[#eac74d]" }, { label: "Remaining", amount: remaining, color: "bg-[#e9e1db]" }].map((item) => <span key={item.label} className="inline-flex items-center gap-1"><span aria-hidden="true" className={`size-2 rounded-[1px] ${item.color}`} />{item.label} {compactAmount(item.amount)} ({(item.amount / totalBudget * 100).toFixed(1)}%)</span>)}
        </div>
        {paid + committed > totalBudget && <p className="mb-3 text-[10px] text-[#b7344c]">Paid and committed costs exceed the budget by {currency.format(paid + committed - totalBudget)}.</p>}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[440px] table-fixed border-separate border-spacing-0 text-left">
            <caption className="sr-only">Budget and allocated costs by wedding category</caption>
            <colgroup><col className="w-[29%]" /><col className="w-[16%]" /><col className="w-[21%]" /><col className="w-[20%]" /><col className="w-[14%]" /></colgroup>
            <thead className="bg-[#faf2ec] text-[8px] leading-[1.4] font-medium tracking-[0.3px] text-[#9b8291] uppercase"><tr><th scope="col" className="rounded-l-md py-2.5 pl-3 font-medium">Category</th><th scope="col" className="py-2.5 font-medium">Budgeted</th><th scope="col" className="py-2.5 font-medium">Spent /<br />Allocated</th><th scope="col" className="py-2.5 font-medium">Progress</th><th scope="col" className="rounded-r-md py-2.5 pr-3 text-right font-medium">Used</th></tr></thead>
            <tbody>
              {initialBudgetCategories.map((category) => {
                const Icon = categoryIcons[category.id];
                const budget = allocations.find((allocation) => allocation.id === category.id)?.budget ?? category.budget;
                const spent = category.spent + expenses.filter((expense) => expense.category === category.id).reduce((sum, expense) => sum + expense.amount, 0);
                const percentage = Math.round(spent / budget * 100);
                return <tr key={category.id} className="text-[10px] leading-[1.6] text-plum"><th scope="row" className="py-2.5 pr-2 pl-3 text-left font-normal"><span className="flex items-center gap-2"><Icon aria-hidden="true" className="size-3.5 shrink-0 text-[#9b8291]" /><span>{category.label}</span></span></th><td className="py-2.5 pr-1 whitespace-nowrap">{currency.format(budget)}</td><td className="py-2.5 pr-2 font-medium whitespace-nowrap">{currency.format(spent)}</td><td className="py-2.5 pr-3"><svg viewBox="0 0 100 6" role="img" aria-label={`${category.label}: ${percentage}% allocated`} className="h-1.5 w-full"><rect width="100" height="6" rx="3" fill="#f2e9e3" /><rect width={Math.min(100, percentage)} height="6" rx="1" fill="#431739" /></svg></td><td className={`py-2.5 pr-3 text-right ${percentage > 100 ? "text-[#b7344c]" : "text-[#9e7f20]"}`}>{percentage}%</td></tr>;
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="rsvp-metric" aria-labelledby="rsvp-metric-title" className="flex min-w-0 scroll-mt-24 flex-col rounded-xl border border-[#f0e5df] bg-white p-5 max-[480px]:p-4">
        <div className="mb-2 flex items-start justify-between gap-3"><h2 id="rsvp-metric-title" className="flex items-center gap-2 text-base leading-5 font-semibold"><FiUsers aria-hidden="true" className="size-4 shrink-0 text-[#9e7f20]" /><span>Guest RSVP<br />Metric</span></h2><button type="button" onClick={onManageGuests} className="inline-flex cursor-pointer items-center gap-2 text-left text-[10px] leading-4 text-[#9e7f20]">Manage<br />guests<FiArrowRight aria-hidden="true" className="size-3" /></button></div>
        <div className="mx-auto my-2 w-[132px] max-[900px]:w-[150px]">
          <svg viewBox="0 0 120 120" role="img" aria-label={`${confirmedPercent}% of invited guests confirmed`} className="h-auto w-full">
            {segments.map((segment, index) => <circle key={segment.color} cx="60" cy="60" r="47" fill="none" stroke={segment.color} strokeWidth="14" pathLength="100" strokeDasharray={`${segment.count / invited * 100} ${100 - segment.count / invited * 100}`} strokeDashoffset={-segments.slice(0, index).reduce((sum, item) => sum + item.count / invited * 100, 0)} transform="rotate(-90 60 60)" />)}
            <text x="60" y="61" textAnchor="middle" className="fill-plum font-dashboard-display text-[23px] font-medium">{confirmedPercent}%</text><text x="60" y="73" textAnchor="middle" className="fill-[#9b8291] text-[7px] tracking-[0.6px] uppercase">Confirmed</text>
          </svg>
        </div>
        <dl className="mb-3 space-y-3 text-[10px]">
          {legend.map((item) => <div key={item.label} className="flex items-center justify-between gap-2"><dt className="inline-flex items-center gap-1.5"><span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${item.color}`} />{item.label}</dt><dd className={`shrink-0 font-medium ${item.tone}`}>{item.count} ({Math.round(item.count / invited * 100)}%)</dd></div>)}
        </dl>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 rounded-md bg-[#faf2ec] px-2.5 py-2 text-[9px]"><span className="text-[#9b8291]">Total Invitations Issued</span><strong className="font-medium">{invited} ({165 + addedGuests.length} Families)</strong></div>
        <button type="button" onClick={onReminders} className="mt-3 inline-flex min-h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-[#f0e7e1] px-2 py-2 text-[9px] leading-normal font-medium text-plum transition-colors hover:bg-[#e9dce4]"><FiMessageSquare aria-hidden="true" className="size-3.5 shrink-0 text-[#9e7f20]" />Send WhatsApp RSVP Reminders</button>
      </section>
    </div>
  );
}
