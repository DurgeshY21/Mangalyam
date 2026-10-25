import Link from "next/link";
import { routes } from "@/lib/routes";

export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav aria-label="Sidebar navigation">
        <Link href={routes.home}>Home</Link>
        <Link href={routes.login}>Login</Link>
        <Link href={routes.signup}>Signup</Link>
      </nav>
    </aside>
  );
}
