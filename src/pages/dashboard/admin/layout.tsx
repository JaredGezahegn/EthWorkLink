import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { useApp } from "@/contexts/app-context";
import { LayoutDashboard, Users, Building2, Wrench, Briefcase, BarChart3, Settings } from "lucide-react";
import { Link } from "@/components/link";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { language, toggleLanguage, t } = useApp();

  const items = [
    { label: t("dashboardOverview"), href: "/dashboard/admin", icon: LayoutDashboard },
    { label: t("manageUsers"), href: "/dashboard/admin/users", icon: Users },
    { label: t("manageCompanies"), href: "/dashboard/admin/companies", icon: Building2 },
    { label: t("manageServices"), href: "/dashboard/admin/services", icon: Wrench },
    { label: t("manageJobs"), href: "/dashboard/admin/jobs", icon: Briefcase },
    { label: t("reports"), href: "/dashboard/admin/reports", icon: BarChart3 },
    { label: t("systemSettings"), href: "/dashboard/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">Ethio-Work</span>
          <span className="text-lg font-bold text-secondary">Link</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-semibold text-destructive">Admin</span>
          <button
            onClick={toggleLanguage}
            className="rounded-md border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted"
          >
            {language === "en" ? "EN | አማ" : "አማ | EN"}
          </button>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Logout
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <DashboardSidebar title="Admin Panel" items={items} accentColor="bg-sidebar" />
        <main className="flex-1 overflow-auto p-4 pb-20 lg:p-8 lg:pb-8">{children}</main>
      </div>
    </div>
  );
}


