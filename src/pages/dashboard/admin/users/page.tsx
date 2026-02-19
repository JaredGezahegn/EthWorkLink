import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";
import { adminUsers } from "@/lib/data";

export default function AdminUsersPage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("manageUsers")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">View and manage all registered users</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("name")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("email")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("status")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("date")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={user.role} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {user.status === "active" ? (
                      <button className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10">
                        {t("suspend")}
                      </button>
                    ) : (
                      <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">
                        Activate
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


