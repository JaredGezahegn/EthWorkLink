import { useLanguage } from "@/lib/language-context";

export default function AdminSettingsPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("systemSettings")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Configure platform settings and preferences</p>

      <div className="mt-6 flex flex-col gap-6">
        {/* General Settings */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">General Settings</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Platform Name</label>
              <input
                type="text"
                defaultValue="Ethio-Work Link"
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Support Email</label>
              <input
                type="email"
                defaultValue="support@ethioworklink.com"
                className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Default Language</label>
              <select className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="en">English</option>
                <option value="am">Amharic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground">Notification Settings</h2>
          <div className="mt-4 flex flex-col gap-4">
            {[
              { label: "Email notifications for new registrations", defaultChecked: true },
              { label: "Email notifications for company approvals", defaultChecked: true },
              { label: "Weekly analytics digest", defaultChecked: false },
            ].map((setting, i) => (
              <label key={i} className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm text-foreground">{setting.label}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    defaultChecked={setting.defaultChecked}
                    className="peer sr-only"
                  />
                  <div className="h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-primary" />
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl border border-destructive/30 bg-card p-6 shadow-sm">
          <h2 className="text-base font-semibold text-destructive">Danger Zone</h2>
          <p className="mt-1 text-sm text-muted-foreground">These actions are irreversible. Please proceed with caution.</p>
          <div className="mt-4 flex gap-3">
            <button className="rounded-md border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
              Reset All Data
            </button>
            <button className="rounded-md border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
              Export Database
            </button>
          </div>
        </div>

        <button className="self-start rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Save Settings
        </button>
      </div>
    </div>
  );
}


