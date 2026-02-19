import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";
import { companyServiceRequests } from "@/lib/data";

export default function CompanyRequestsPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("serviceRequests")}</h1>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 font-medium text-muted-foreground">Seeker</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("services")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("date")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("status")}</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {companyServiceRequests.map((req) => (
              <tr key={req.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{req.seeker}</td>
                <td className="px-4 py-3 text-muted-foreground">{req.service}</td>
                <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3">
                  {req.status === "pending" && (
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


