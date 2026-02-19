import { useApp } from "@/contexts/app-context";
import { StatusBadge } from "@/components/status-badge";

export default function AdminUsersPage() {
  const { t, users, suspendUser } = useApp();

  const seekers = users.filter(u => u.role === "seeker");

  const handleSuspend = (userId: string) => {
    if (confirm("Are you sure you want to suspend this user?")) {
      suspendUser(userId);
    }
  };

  const handleActivate = (userId: string) => {
    // In a real app, you'd have an activate function
    console.log("Activate user:", userId);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("manageUsers")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">View and manage all registered users</p>

      {seekers.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No users yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Users will appear here as they register
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("email")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("location")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("status")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {seekers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.role} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{user.location || "N/A"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={user.suspended ? "suspended" : "active"} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {!user.suspended ? (
                        <button
                          onClick={() => handleSuspend(user.id)}
                          className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(user.id)}
                          className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90"
                        >
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
      )}
    </div>
  );
}
