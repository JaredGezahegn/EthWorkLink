import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { useLanguage } from "@/lib/language-context";
import { FileText, Briefcase, User, Star } from "lucide-react";
import { Link } from "@/components/link";

export default function SeekerDashboardLayout({ children }: { children: React.ReactNode }) {
  const { lang, toggleLang, t } = useLanguage();

  const items = [
    { label: t("myServiceRequests"), href: "/dashboard/seeker", icon: FileText },
    { label: t("myJobApplications"), href: "/dashboard/seeker/applications", icon: Briefcase },
    { label: t("profile"), href: "/dashboard/seeker/profile", icon: User },
    { label: t("myReviews"), href: "/dashboard/seeker/reviews", icon: Star },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">Ethio-Work</span>
          <span className="text-lg font-bold text-secondary">Link</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="rounded-md border border-border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted"
          >
            {lang === "en" ? "EN | አማ" : "አማ | EN"}
          </button>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Logout
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <DashboardSidebar title={t("serviceSeeker")} items={items} accentColor="bg-secondary" />
        <main className="flex-1 overflow-auto p-4 pb-20 lg:p-8 lg:pb-8">{children}</main>
      </div>
    </div>
  );
}


