import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";

export default function SeekerApplicationsPage() {
  const { t, currentUser, getSeekerApplications } = useApp();

  if (!currentUser) return null;

  const applications = getSeekerApplications(currentUser.id);

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myJobApplications")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {applications.length} application{applications.length !== 1 ? 's' : ''}
      </p>

      {applications.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No job applications yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse job listings and apply to positions that interest you
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 font-medium text-muted-foreground">Job</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("company")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("date")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{app.jobTitle}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.companyId}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
