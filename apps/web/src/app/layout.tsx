import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/AppLayout";
export const metadata: Metadata = {
  title: { default: "Make My Marriage", template: "%s | Make My Marriage" },
  description: "A wedding workspace for families and professional planners.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-pt-[100px] motion-safe:scroll-smooth max-[540px]:scroll-pt-[88px]">
      {/* Grammarly can inject body attributes before hydration; keep suppression scoped here. */}
      <body suppressHydrationWarning className="m-0 flex min-h-screen flex-col bg-canvas font-sans text-[#302b27] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-gold [&_a:focus-visible]:outline-offset-4">
        <a className="absolute -top-20 left-5 z-50 bg-white p-3 focus:top-2.5" href="#main-content">
          Skip to content
        </a>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
