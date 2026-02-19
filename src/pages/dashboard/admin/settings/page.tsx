import { useState, FormEvent } from "react";
import { useApp } from "@/contexts/app-context";

export default function AdminSettingsPage() {
  const { t } = useApp();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "EthioWorkLink",
    supportEmail: "support@ethioworklink.com",
    maintenanceMode: false,
    allowRegistrations: true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would save settings
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("systemSettings")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Configure system-wide settings</p>

      {success && (
        <div className="mt-4 rounded-lg bg-success/15 px-4 py-3 text-sm text-success">
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-md flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Site Name</label>
          <input
            type="text"
            value={formData.siteName}
            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Support Email</label>
          <input
            type="email"
            value={formData.supportEmail}
            onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="maintenance"
            checked={formData.maintenanceMode}
            onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
            className="h-4 w-4 rounded border-input"
          />
          <label htmlFor="maintenance" className="text-sm font-medium text-foreground">
            Maintenance Mode
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="registrations"
            checked={formData.allowRegistrations}
            onChange={(e) => setFormData({ ...formData, allowRegistrations: e.target.checked })}
            className="h-4 w-4 rounded border-input"
          />
          <label htmlFor="registrations" className="text-sm font-medium text-foreground">
            Allow New Registrations
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
