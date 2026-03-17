import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";

export default function AdminCompaniesPage() {
  const { t, companies, approveCompany, suspendCompany } = useApp();

  const handleApprove = (companyId: string) => {
    approveCompany(companyId);
  };

  const handleReject = (companyId: string) => {
    if (confirm("Are you sure you want to reject this company?")) {
      // In a real app, you'd have a reject function
      console.log("Reject company:", companyId);
    }
  };

  const handleSuspend = (companyId: string) => {
    if (confirm("Are you sure you want to suspend this company?")) {
      suspendCompany(companyId);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("manageCompanies")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Review and manage company registrations</p>

      {companies.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No companies yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Companies will appear here as they register
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Company Name</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Owner</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("location")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("status")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{company.companyName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{company.ownerName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{company.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{company.location}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={company.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {company.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleApprove(company.id)}
                            className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(company.id)}
                            className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleSuspend(company.id)}
                          className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
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
