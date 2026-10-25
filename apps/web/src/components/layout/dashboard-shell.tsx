import { SiteNav } from "@/components/navigation/site-nav";
import { DashboardNav } from "@/components/navigation/dashboard-nav";
import { SiteFooter } from "@/components/footer/site-footer";
// Presentation only. Express must authorize every real wedding resource.
export function DashboardShell({children}: {children: React.ReactNode}) {return <><SiteNav/><div className="container dashboard-shell"><aside><p className="eyebrow">Your wedding</p><DashboardNav/></aside><main id="main-content" className="dashboard-main">{children}</main></div><SiteFooter/></>;}
