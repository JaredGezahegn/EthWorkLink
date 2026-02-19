import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";
import { adminCompanies } from "@/lib/data";

export default function AdminCompaniesPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("manageCompanies")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Review and manage company registrations</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("companyName")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Owner</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("status")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("date")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {adminCompanies.map((company) => (
              <tr key={company.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{company.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{company.owner}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={company.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{company.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {company.status === "pending" ? (
                      <>
                        <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">
                          {t("approve")}
                        </button>
                        <button className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10">
                          {t("reject")}
                        </button>
                      </>
                    ) : (
                      <button className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10">
                        {t("suspend")}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


