import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "@fontsource-variable/playfair-display/wght.css";
import { WeddingDashboard } from "./WeddingDashboard";

export const metadata: Metadata = { title: "Wedding Dashboard" };

export default function DashboardPage() {
  return <WeddingDashboard />;
}
