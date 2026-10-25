"use client";

import { useState } from "react";
import { FiPlus, FiRotateCcw } from "react-icons/fi";
import { DashboardDialog } from "@/components/dashboard/DashboardDialog";

const organizers = [
  { name: "Aditi Sharma", initials: "AS", role: "Admin · Lead", color: "bg-[#431739]" },
  { name: "Rohan M.", initials: "RM", role: "Organizer", color: "bg-[#875274]" },
  { name: "Naina G.", initials: "NG", role: "Organizer", color: "bg-[#8a7514]" },
  { name: "Kabir S.", initials: "KS", role: "Organizer", color: "bg-[#592247]" },
];

const activities = [
  { name: "Aditi S.", text: "confirmed 4 guest RSVPs", time: "12m ago" },
  { name: "Rohan M.", text: "updated sound check rider", time: "1h ago" },
  { name: "Siya", text: "recorded ₹45,000 trousseau advance.", time: "3h ago" },
];

export function WorkspaceActivity() {
  const [showOrganizers, setShowOrganizers] = useState(false);

  return (
    <>
      <section id="workspace-activity" aria-labelledby="workspace-activity-title" className="mt-5 flex scroll-mt-24 items-center gap-6 rounded-xl border border-[#f0e5df] bg-white px-5 py-5 max-[900px]:flex-col max-[900px]:items-stretch">
        <div className="min-w-0 flex-1">
          <h2 id="workspace-activity-title" className="mb-2 flex items-center gap-2 text-[8px] font-medium tracking-[0.5px] text-[#8b7481] uppercase"><FiRotateCcw aria-hidden="true" className="size-3 text-[#a18422]" />Recent Workspace Activity</h2>
          <ul className="grid grid-cols-3 divide-x divide-[#eee4de] max-[640px]:grid-cols-1 max-[640px]:divide-x-0 max-[640px]:divide-y">
            {activities.map((activity, index) => (
              <li key={activity.name} className={`flex items-start gap-2 py-1 text-[9px] leading-[15px] max-[640px]:py-2 ${index ? "pl-3 max-[640px]:pl-0" : ""} ${index < activities.length - 1 ? "pr-3" : ""}`}>
                <span aria-hidden="true" className="mt-[6px] size-1 shrink-0 rounded-full bg-[#9e7f20]" />
                <p className="flex-1 text-[#9b8291]"><span className="font-medium text-plum">{activity.name}</span> {activity.text}</p>
                <span className="w-6 shrink-0 text-[8px] leading-3 text-[#9b8291]">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3 min-[901px]:justify-end">
          <div className="min-[901px]:text-right"><p className="text-[8px] tracking-[0.4px] text-[#9b8291] uppercase">Planning Circle</p><p className="mt-1 text-[10px] text-plum">4 Active Organizers</p></div>
          <div className="flex -space-x-2">
            {organizers.map((person) => <span key={person.initials} title={person.name} aria-label={person.name} className={`grid size-8 place-items-center rounded-full border-2 border-white text-[8px] font-medium text-white ${person.color}`}>{person.initials}</span>)}
            <button type="button" aria-label="View planning circle organizers" onClick={() => setShowOrganizers(true)} className="relative grid size-8 cursor-pointer place-items-center rounded-full border-2 border-white bg-[#f4ece6] text-plum transition-colors hover:bg-[#eaddd3] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-gold"><FiPlus aria-hidden="true" className="size-3" /></button>
          </div>
        </div>
      </section>
      {showOrganizers && <DashboardDialog title="Planning Circle" onClose={() => setShowOrganizers(false)}><p className="mb-4 text-xs text-[#9b8291]">Your sample wedding workspace has four active organizers.</p><ul className="divide-y divide-[#eee4de]">{organizers.map((person) => <li key={person.initials} className="flex items-center gap-3 py-3"><span className={`grid size-9 place-items-center rounded-full text-xs text-white ${person.color}`}>{person.initials}</span><div><p className="text-sm font-medium">{person.name}</p><p className="mt-1 text-xs text-[#9b8291]">{person.role}</p></div></li>)}</ul><p className="mt-4 text-[11px] leading-relaxed text-[#9b8291]">Organizer invitations will be available when workspace accounts are connected.</p></DashboardDialog>}
    </>
  );
}
