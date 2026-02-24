import { useApp } from "@/contexts/app-context";
import { Wrench, Briefcase, Inbox, Star } from "lucide-react";
import { Link } from "@/components/link";

export default function CompanyOverviewPage() {
  const { t, currentUser, services, jobs, getCompanyRequests, getCompanyReviews } = useApp();

  if (!currentUser) return null;

  // Calculate real stats
  const myServicesCount = services.filter(s => s.companyId === currentUser.id).length;
  const myJobsCount = jobs.filter(j => j.companyId === currentUser.id).length;
  const requestsCount = getCompanyRequests(currentUser.id).length;
  const reviewsCount = getCompanyReviews(currentUser.id).length;

  const stats = [
    { 
      key: "myServices" as const, 
      value: myServicesCount, 
      icon: Wrench, 
      color: "bg-primary/15 text-primary",
      href: "/dashboard/company/services"
    },
    { 
      key: "myJobs" as const, 
      value: myJobsCount, 
      icon: Briefcase, 
      color: "bg-secondary/15 text-secondary",
      href: "/dashboard/company/jobs"
    },
    { 
      key: "serviceRequests" as const, 
      value: requestsCount, 
      icon: Inbox, 
      color: "bg-warning/15 text-warning-foreground",
      href: "/dashboard/company/requests"
    },
    { 
      key: "reviews" as const, 
      value: reviewsCount, 
      icon: Star, 
      color: "bg-accent text-accent-foreground",
      href: `/company/${currentUser.id}#reviews`
    },
  ];

  const companyName = "companyName" in currentUser ? currentUser.companyName : "Company";

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("dashboardOverview")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Welcome back, {companyName}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={stat.key} 
              href={stat.href}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/50 group"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.color} group-hover:scale-110 transition-transform`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{t(stat.key)}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


