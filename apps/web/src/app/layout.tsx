import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title: {default: "Make My Marriage", template: "%s | Make My Marriage"}, description: "A wedding workspace for families and professional planners."};
export default function RootLayout({children}: {children: React.ReactNode}) {return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;}
