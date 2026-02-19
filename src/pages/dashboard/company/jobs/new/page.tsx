import { useLanguage } from "@/lib/language-context";
import { locations } from "@/lib/data";

export default function NewJobPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("postNewJob")}</h1>
      <form className="mt-6 max-w-md flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Job Title</label>
          <input
            type="text"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Senior Electrician"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("location")}</label>
          <select className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("salary")}</label>
          <input
            type="text"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. 15,000 ETB/month"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("description")}</label>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Describe the job role and requirements..."
          />
        </div>
        <button
          type="button"
          className="mt-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground hover:opacity-90"
        >
          {t("addJob")}
        </button>
      </form>
    </div>
  );
}


