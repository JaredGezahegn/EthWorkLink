import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";

export default function CompanyRequestsPage() {
  const { t, currentUser, getCompanyRequests, updateRequestStatus } = useApp();

  if (!currentUser) return null;

  const requests = getCompanyRequests(currentUser.id);

  const handleAccept = (id: string) => {
    updateRequestStatus(id, "accepted");
  };

  const handleReject = (id: string) => {
    if (confirm("Are you sure you want to reject this request?")) {
      updateRequestStatus(id, "rejected");
    }
  };

  const handleComplete = (id: string) => {
    updateRequestStatus(id, "completed");
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("serviceRequests")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {requests.length} request{requests.length !== 1 ? 's' : ''}
      </p>

      {requests.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No service requests yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            When seekers request your services, they will appear here
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 font-medium text-muted-foreground">Seeker</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Service</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("date")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("status")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{req.seekerName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.serviceName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-4 py-3">
                    {req.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {req.status === "accepted" && (
                      <button
                        onClick={() => handleComplete(req.id)}
                        className="rounded-md bg-success px-3 py-1 text-xs font-medium text-success-foreground hover:opacity-90"
                      >
                        Mark Complete
                      </button>
                    )}
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
