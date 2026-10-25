"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
export function DashboardNav() {const path = usePathname(); return <nav className="dashboard-nav" aria-label="Wedding navigation"><Link href={routes.dashboard} aria-current={path === routes.dashboard ? "page" : undefined}>Overview</Link><Link href="/dashboard#functions">Functions</Link><Link href="/dashboard#checklist">Planning checklist</Link></nav>;}
