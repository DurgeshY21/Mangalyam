import { SiteNav } from "@/components/navigation/site-nav";
import { SiteFooter } from "@/components/footer/site-footer";
export default function Layout({children}: {children: React.ReactNode}) { return <><SiteNav/><main id="main-content">{children}</main><SiteFooter/></>; }
