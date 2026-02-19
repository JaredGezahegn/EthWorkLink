import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";
import { Link } from "@/components/link";
import { Trash2 } from "lucide-react";

export default function CompanyJobsPage() {
  const { t, currentUser, jobs, deleteJob, getCompanyApplications, updateApplicationStatus } = useApp();

  if (!currentUser) return null;

  const companyJobs = jobs.filter(j => j.companyId === currentUser.id);
  const applications = getCompanyApplications(currentUser.id);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      deleteJob(id);
    }
  };

  const handleAcceptApplication = (id: string) => {
    updateApplicationStatus(id, "accepted");
  };

  const handleRejectApplication = (id: string) => {
    if (confirm("Are you sure you want to reject this application?")) {
      updateApplicationStatus(id, "rejected");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myJobs")}</h1>
        <Link
          href="/dashboard/company/jobs/new"
          className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
        >
          Post New Job
        </Link>
      </div>

      {/* Job Cards */}
      {companyJobs.length === 0 ? (
        <div className="mt-6 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No job postings yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Start hiring by posting your first job
          </p>
          <Link
            href="/dashboard/company/jobs/new"
            className="mt-4 inline-block rounded-lg bg-secondary px-6 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
          >
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {companyJobs.map((job) => {
            const jobApplicants = applications.filter(a => a.jobId === job.id);
            return (
              <div key={job.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
                <p className="mt-1 text-sm text-primary font-medium">{job.salary}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {jobApplicants.length} applicant{jobApplicants.length !== 1 ? 's' : ''}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Applicants Table */}
      {applications.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-semibold text-foreground">Job Applicants</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 font-medium text-muted-foreground">Applicant</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Job</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">{t("date")}</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">{t("status")}</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{app.seekerName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.seekerEmail}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.jobTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3">
                      {app.status === "applied" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptApplication(app.id)}
                            className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectApplication(app.id)}
                            className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
