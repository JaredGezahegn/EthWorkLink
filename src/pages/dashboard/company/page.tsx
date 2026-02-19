import { useLanguage } from "@/lib/language-context";
import { Wrench, Briefcase, Inbox, Star } from "lucide-react";

const stats = [
  { key: "myServices" as const, value: 3, icon: Wrench, color: "bg-primary/15 text-primary" },
  { key: "myJobs" as const, value: 2, icon: Briefcase, color: "bg-secondary/15 text-secondary" },
  { key: "serviceRequests" as const, value: 3, icon: Inbox, color: "bg-warning/15 text-warning-foreground" },
  { key: "reviews" as const, value: 4, icon: Star, color: "bg-accent text-accent-foreground" },
];

export default function CompanyOverviewPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("dashboardOverview")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back, Ethio Electric Solutions</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.key} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{t(stat.key)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


