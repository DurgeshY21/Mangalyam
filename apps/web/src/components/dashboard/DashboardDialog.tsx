"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { FiX } from "react-icons/fi";

export function DashboardDialog({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog ref={dialogRef} aria-labelledby={titleId} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-0 m-auto max-h-[calc(100svh-40px)] w-[min(480px,calc(100%-32px))] overflow-y-auto rounded-2xl border border-[#eaddd3] bg-[#fffaf7] p-0 text-plum shadow-2xl backdrop:bg-[#25031f]/40 backdrop:backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 border-b border-[#eaddd3] px-6 py-5"><h2 id={titleId} className="font-dashboard-display text-2xl font-medium">{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog" className="grid size-8 cursor-pointer place-items-center rounded-full hover:bg-[#f2e7ed]"><FiX aria-hidden="true" /></button></div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
