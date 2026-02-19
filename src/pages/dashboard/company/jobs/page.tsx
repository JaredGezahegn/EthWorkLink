import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";
import { companyJobApplicants } from "@/lib/data";
import { Pencil, Trash2 } from "lucide-react";

const myJobs = [
  { id: 1, title: "Senior Electrician", salary: "15,000 ETB/month", applicants: 2, status: "active" },
  { id: 2, title: "Electrical Apprentice", salary: "8,000 ETB/month", applicants: 1, status: "active" },
];

export default function CompanyJobsPage() {
  const { t } = useApp();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myJobs")}</h1>
        <a
          href="/dashboard/company/jobs/new"
          className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
        >
          {t("addJob")}
        </a>
      </div>

      {/* Job Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {myJobs.map((job) => (
          <div key={job.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
            <p className="mt-1 text-sm text-primary font-medium">{job.salary}</p>
            <p className="mt-1 text-xs text-muted-foreground">{job.applicants} applicant(s)</p>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                <Pencil className="h-3 w-3" />
                {t("edit")}
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3 w-3" />
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Applicants Table */}
      <h2 className="mt-10 text-lg font-semibold text-foreground">Job Applicants</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 font-medium text-muted-foreground">Applicant</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Job</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("date")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("status")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {companyJobApplicants.map((app) => (
              <tr key={app.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{app.applicant}</td>
                <td className="px-4 py-3 text-muted-foreground">{app.job}</td>
                <td className="px-4 py-3 text-muted-foreground">{app.date}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-4 py-3">
                  {app.status === "pending" && (
                    <div className="flex gap-2">
                      <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">
                        {t("accept")}
                      </button>
                      <button className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10">
                        {t("reject")}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


