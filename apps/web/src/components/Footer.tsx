import Link from "next/link";
import { routes } from "@/lib/routes";

export function Footer() {
  return <footer><div className="container footer-inner"><p>Make My Marriage</p><Link href={routes.home}>Back to home</Link></div></footer>;
}
