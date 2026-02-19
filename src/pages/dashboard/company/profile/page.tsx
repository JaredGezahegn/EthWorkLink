import { useLanguage } from "@/lib/language-context";
import { locations } from "@/lib/data";

export default function CompanyProfileSettingsPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("companyProfileSettings")}</h1>
      <form className="mt-6 max-w-md flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("companyName")}</label>
          <input
            type="text"
            defaultValue="Ethio Electric Solutions"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("ownerName")}</label>
          <input
            type="text"
            defaultValue="Tekle Hailu"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("email")}</label>
          <input
            type="email"
            defaultValue="info@ethioelectric.com"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("companyLocation")}</label>
          <select
            defaultValue="Addis Ababa"
            className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("companyDescription")}</label>
          <textarea
            rows={4}
            defaultValue="Leading electrical services provider in Ethiopia with over 10 years of experience in residential and commercial electrical installations."
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button
          type="button"
          className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}


