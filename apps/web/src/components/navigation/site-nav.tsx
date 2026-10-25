import Link from "next/link";
import { routes } from "@/lib/routes";
export function SiteNav() {return <header><nav className="container nav" aria-label="Main navigation"><Link className="brand" href={routes.home}>make my marriage<span>.</span></Link><Link className="button" href={routes.dashboard}>Wedding dashboard ↗</Link></nav></header>;}
