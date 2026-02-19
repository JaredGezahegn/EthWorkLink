import { useApp } from "@/contexts/app-context";

export function DebugAccounts() {
  const { users, companies } = useApp();

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm rounded-lg border border-border bg-card p-4 shadow-lg text-xs">
      <h3 className="font-bold mb-2">Debug: Loaded Accounts</h3>
      
      <div className="mb-2">
        <p className="font-semibold">Users ({users.length}):</p>
        {users.map(u => (
          <p key={u.id} className="text-muted-foreground">
            {u.email} ({u.role})
          </p>
        ))}
      </div>
      
      <div>
        <p className="font-semibold">Companies ({companies.length}):</p>
        {companies.map(c => (
          <p key={c.id} className="text-muted-foreground">
            {c.email} ({c.status})
          </p>
        ))}
      </div>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="mt-2 w-full rounded bg-destructive px-2 py-1 text-destructive-foreground text-xs"
      >
        Clear localStorage & Reload
      </button>
    </div>
  );
}
