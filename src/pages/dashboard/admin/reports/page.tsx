import { useApp } from "@/contexts/app-context";
import { TrendingUp, Users, Building2, Briefcase } from "lucide-react";

export default function AdminReportsPage() {
  const { t, getStats, serviceRequests, jobApplications } = useApp();

  const stats = getStats();
  const totalRequests = serviceRequests.length;
  const totalApplications = jobApplications.length;

  const reportData = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-secondary" },
    { label: "Total Companies", value: stats.totalCompanies, icon: Building2, color: "text-primary" },
    { label: "Total Services", value: stats.totalServices, icon: TrendingUp, color: "text-success" },
    { label: "Total Jobs", value: stats.totalJobs, icon: Briefcase, color: "text-warning" },
    { label: "Service Requests", value: totalRequests, icon: TrendingUp, color: "text-accent" },
    { label: "Job Applications", value: totalApplications, icon: Briefcase, color: "text-info" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("reports")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">System statistics and reports</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{item.value}</p>
                </div>
                <Icon className={`h-10 w-10 ${item.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">Activity Summary</h2>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pending Service Requests</span>
            <span className="font-medium text-foreground">
              {serviceRequests.filter(r => r.status === "pending").length}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completed Service Requests</span>
            <span className="font-medium text-foreground">
              {serviceRequests.filter(r => r.status === "completed").length}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pending Job Applications</span>
            <span className="font-medium text-foreground">
              {jobApplications.filter(a => a.status === "applied").length}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Accepted Job Applications</span>
            <span className="font-medium text-foreground">
              {jobApplications.filter(a => a.status === "accepted").length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
