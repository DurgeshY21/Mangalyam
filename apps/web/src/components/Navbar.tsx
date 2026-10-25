"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiGlobe, FiMenu, FiUser, FiX } from "react-icons/fi";
import { PiCrownSimple } from "react-icons/pi";
import { routes } from "@/lib/routes";
import styles from "./Navbar.module.css";

// Section destinations will be connected as we build the homepage section by section.
const navigation = [
  { label: "Features", href: "/#planning" },
  { label: "Ceremonies", href: "/#ceremonies" },
  { label: "Royal Guild & Vendors", href: "/#vendors" },
  { label: "Stories", href: "/#stories" },
  { label: "Concierge & Pricing", href: "/#pricing" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar} aria-label="Main navigation">
        <Link className={styles.logo} href={routes.home} aria-label="Mangalyam home" onClick={() => setMenuOpen(false)}>
          <Image src="/images/mangalyam-logo.png" alt="Mangalyam — The Royal Nuptial Atelier" width={1200} height={480} preload className={styles.logoImage} />
        </Link>

        <div className={styles.desktopLinks}>
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href} className={`${styles.navLink} ${index === 0 ? styles.featuredLink : ""}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.currencyControl}>
            <FiGlobe aria-hidden="true" />
            <select aria-label="Display currency" defaultValue="INR">
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="GBP">GBP £</option>
              <option value="EUR">EUR €</option>
            </select>
            <FiChevronDown className={styles.currencyChevron} aria-hidden="true" />
          </div>
          <Link className={styles.signIn} href={routes.login}>Sign In</Link>
          <Link className={styles.planningButton} href={routes.signup}>
            <PiCrownSimple aria-hidden="true" />
            <span>Start Free Planning</span>
          </Link>
          <Link className={styles.accountButton} href={routes.login} aria-label="Sign in to your account"><FiUser aria-hidden="true" /></Link>
          <button ref={menuButton} className={styles.menuButton} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>

        {menuOpen && (
          <div className={styles.mobileMenu} id="mobile-navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
            <div className={styles.mobileActions}>
              <Link href={routes.login} onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link className={styles.planningButton} href={routes.signup} onClick={() => setMenuOpen(false)}><PiCrownSimple aria-hidden="true" />Start Free Planning</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
