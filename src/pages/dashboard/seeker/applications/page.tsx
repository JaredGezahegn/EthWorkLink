import { useLanguage } from "@/lib/language-context";
import { StatusBadge } from "@/components/status-badge";
import { seekerApplications } from "@/lib/data";

export default function SeekerApplicationsPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myJobApplications")}</h1>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("jobs")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("company")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("date")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {seekerApplications.map((app) => (
              <tr key={app.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{app.job}</td>
                <td className="px-4 py-3 text-muted-foreground">{app.company}</td>
                <td className="px-4 py-3 text-muted-foreground">{app.date}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={app.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


