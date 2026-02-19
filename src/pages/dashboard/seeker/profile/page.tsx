import { useApp } from "@/contexts/app-context";

export default function SeekerProfilePage() {
  const { t } = useApp();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("profile")}</h1>
      <div className="mt-6 max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("fullName")}</label>
            <input
              type="text"
              defaultValue="Abebe Kebede"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("email")}</label>
            <input
              type="email"
              defaultValue="abebe@email.com"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t("location")}</label>
            <input
              type="text"
              defaultValue="Addis Ababa"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="mt-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}


