import Link from "next/link";
import { routes } from "@/lib/routes";
export function SiteFooter() {return <footer><div className="container footer-inner"><p>Make My Marriage · A little less chaos. A lot more celebration.</p><Link href={routes.home}>Back to home</Link></div></footer>;}
