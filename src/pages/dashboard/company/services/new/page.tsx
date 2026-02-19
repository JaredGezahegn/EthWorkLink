import { useLanguage } from "@/lib/language-context";

export default function NewServicePage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("postNewService")}</h1>
      <form className="mt-6 max-w-md flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Service Title</label>
          <input
            type="text"
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Residential Wiring"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
          <select className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            <option>Electrician</option>
            <option>Plumbing</option>
            <option>Construction</option>
            <option>IT Services</option>
            <option>Cleaning</option>
            <option>Tutoring</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("description")}</label>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Describe the service you offer..."
          />
        </div>
        <button
          type="button"
          className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          {t("addService")}
        </button>
      </form>
    </div>
  );
}


