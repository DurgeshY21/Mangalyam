"use client";

import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === routes.login) {
    return <main id="main-content" className="flex min-w-0 flex-1 flex-col">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-1 max-[640px]:flex-col">
        <Sidebar />
        <main id="main-content" className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
