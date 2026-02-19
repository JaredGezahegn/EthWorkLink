import { useApp } from "@/contexts/app-context";
import { Users, Building2, Wrench, Briefcase } from "lucide-react";

export default function AdminOverviewPage() {
  const { t, getStats, companies, approveCompany, users } = useApp();

  const stats = getStats();
  const pendingCompanies = companies.filter(c => c.status === "pending");
  const recentUsers = users.filter(u => u.role !== "admin").slice(-3).reverse();

  const handleApprove = (companyId: string) => {
    approveCompany(companyId);
  };

  const handleReject = (companyId: string) => {
    if (confirm("Are you sure you want to reject this company?")) {
      // In a real app, you'd have a reject function
      console.log("Reject company:", companyId);
    }
  };

  const statsData = [
    { key: "totalUsers", value: stats.totalUsers, icon: Users, color: "bg-secondary/15 text-secondary" },
    { key: "totalCompanies", value: stats.totalCompanies, icon: Building2, color: "bg-primary/15 text-primary" },
    { key: "totalServices", value: stats.totalServices, icon: Wrench, color: "bg-accent text-accent-foreground" },
    { key: "totalJobs", value: stats.totalJobs, icon: Briefcase, color: "bg-warning/15 text-warning-foreground" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("dashboardOverview")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back, Admin</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.key} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground capitalize">{stat.key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Pending Company Approvals</h2>
          {pendingCompanies.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No pending approvals</p>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {pendingCompanies.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{c.companyName}</div>
                    <div className="text-xs text-muted-foreground">{c.ownerName}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(c.id)}
                      className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(c.id)}
                      className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Recent Registrations</h2>
          {recentUsers.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No recent registrations</p>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{u.name}</div>
                    <div className="text-xs text-muted-foreground">{u.email}</div>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary capitalize">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
