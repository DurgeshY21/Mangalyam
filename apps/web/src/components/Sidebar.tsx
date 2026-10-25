"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

export function Sidebar() {
  const pathname = usePathname();
  if (pathname === routes.home) return null;

  return (
    <aside className="w-[150px] shrink-0 border-r border-[#e6dfd6] px-[18px] py-7 max-[640px]:w-auto max-[640px]:border-r-0 max-[640px]:border-b">
      <nav className="flex flex-col gap-[18px] text-[13px] max-[640px]:flex-row" aria-label="Sidebar navigation">
        <Link href={routes.home}>Home</Link>
        <Link href={routes.login}>Login</Link>
        <Link href={routes.signup}>Signup</Link>
      </nav>
    </aside>
  );
}
