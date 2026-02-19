import { useApp } from "@/contexts/app-context";
import { Users, Building2, Wrench, Briefcase } from "lucide-react";

const stats = [
  { key: "totalUsers" as const, value: 1248, icon: Users, color: "bg-secondary/15 text-secondary" },
  { key: "totalCompanies" as const, value: 86, icon: Building2, color: "bg-primary/15 text-primary" },
  { key: "activeServices" as const, value: 342, icon: Wrench, color: "bg-accent text-accent-foreground" },
  { key: "activeJobs" as const, value: 158, icon: Briefcase, color: "bg-warning/15 text-warning-foreground" },
];

export default function AdminOverviewPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("dashboardOverview")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back, Admin</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.key} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{t(stat.key)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Pending Company Approvals</h2>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { name: "New Plumbing Co.", owner: "Bereket Teshome" },
              { name: "QuickFix Services", owner: "Almaz Gebru" },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.owner}</div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">
                    {t("approve")}
                  </button>
                  <button className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10">
                    {t("reject")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Recent Registrations</h2>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { name: "Daniel Girma", type: "Seeker", date: "Feb 15" },
              { name: "QuickFix Services", type: "Company", date: "Feb 16" },
              { name: "Sara Mengistu", type: "Seeker", date: "Feb 14" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${r.type === "Company" ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"}`}>
                  {r.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


