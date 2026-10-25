import Link from "next/link";
import { routes } from "@/lib/routes";

export function Navbar() {
  return (
    <header>
      <nav className="container nav" aria-label="Main navigation">
        <Link className="brand" href={routes.home}>make my marriage<span>.</span></Link>
        <div className="auth-links">
          <Link href={routes.login}>Login</Link>
          <Link className="button" href={routes.signup}>Signup</Link>
        </div>
      </nav>
    </header>
  );
}
