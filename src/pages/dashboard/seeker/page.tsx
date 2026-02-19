import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export default function SeekerRequestsPage() {
  const { t, currentUser, getSeekerRequests } = useApp();

  if (!currentUser) return null;

  const requests = getSeekerRequests(currentUser.id);

  const pending = requests.filter((r) => r.status === "pending").length;
  const accepted = requests.filter((r) => r.status === "accepted").length;
  const completed = requests.filter((r) => r.status === "completed").length;

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myServiceRequests")}</h1>

      {/* Status Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/15">
            <Clock className="h-5 w-5 text-warning-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{pending}</div>
            <div className="text-sm text-muted-foreground">{t("pending")}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{accepted}</div>
            <div className="text-sm text-muted-foreground">{t("accepted")}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
            <XCircle className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{completed}</div>
            <div className="text-sm text-muted-foreground">{t("completed")}</div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      {requests.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No service requests yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse services and request help from providers
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 font-medium text-muted-foreground">Service</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("company")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("date")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{req.serviceName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.companyName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={req.status} />
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
