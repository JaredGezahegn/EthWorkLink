import { useApp } from "@/contexts/app-context";
import { Users, Building2, Wrench, Briefcase, TrendingUp, TrendingDown } from "lucide-react";

const metrics = [
  { label: "New Users This Month", value: 142, change: "+18%", up: true, icon: Users },
  { label: "New Companies This Month", value: 12, change: "+8%", up: true, icon: Building2 },
  { label: "Services Requested", value: 384, change: "+24%", up: true, icon: Wrench },
  { label: "Job Applications", value: 267, change: "-5%", up: false, icon: Briefcase },
];

const topCategories = [
  { name: "Electrician", count: 89, percentage: 26 },
  { name: "IT Services", count: 76, percentage: 22 },
  { name: "Construction", count: 68, percentage: 20 },
  { name: "Plumbing", count: 52, percentage: 15 },
  { name: "Cleaning", count: 34, percentage: 10 },
  { name: "Tutoring", count: 23, percentage: 7 },
];

const topCities = [
  { name: "Addis Ababa", users: 524 },
  { name: "Dire Dawa", users: 187 },
  { name: "Hawassa", users: 156 },
  { name: "Bahir Dar", users: 132 },
  { name: "Mekelle", users: 98 },
];

export default function AdminReportsPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("reports")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Platform analytics and performance metrics</p>

      {/* Key Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${metric.up ? "text-primary" : "text-destructive"}`}>
                  {metric.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {metric.change}
                </span>
              </div>
              <div className="mt-3 text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Top Categories */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Top Service Categories</h2>
          <div className="mt-4 flex flex-col gap-3">
            {topCategories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{cat.name}</span>
                  <span className="text-muted-foreground">{cat.count} requests ({cat.percentage}%)</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Users by City</h2>
          <div className="mt-4 flex flex-col gap-3">
            {topCities.map((city, i) => (
              <div key={city.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/15 text-xs font-bold text-secondary">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{city.name}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{city.users}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


