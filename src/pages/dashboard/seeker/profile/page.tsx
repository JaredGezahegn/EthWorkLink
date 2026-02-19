import { useState, FormEvent } from "react";
import { useApp } from "@/contexts/app-context";
import { locations } from "@/lib/data";

export default function SeekerProfilePage() {
  const { t, currentUser } = useApp();
  const [success, setSuccess] = useState(false);

  if (!currentUser || "companyName" in currentUser) return null;

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    location: currentUser.location || "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user in context
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("profile")}</h1>
      
      {success && (
        <div className="mt-4 rounded-lg bg-success/15 px-4 py-3 text-sm text-success">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-md flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("fullName")}</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("email")}</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("location")}</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
