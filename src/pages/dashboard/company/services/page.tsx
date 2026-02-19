import { useApp } from "@/contexts/app-context";
import { Pencil, Trash2 } from "lucide-react";

const services = [
  { id: 1, title: "Residential Wiring", category: "Electrician", status: "active" },
  { id: 2, title: "Solar Panel Installation", category: "Electrician", status: "active" },
  { id: 3, title: "Electrical Repair", category: "Electrician", status: "active" },
];

export default function CompanyServicesPage() {
  const { t } = useApp();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("myServices")}</h1>
        <a
          href="/dashboard/company/services/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {t("addService")}
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">{service.category}</div>
            <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                <Pencil className="h-3 w-3" />
                {t("edit")}
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10">
                <Trash2 className="h-3 w-3" />
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


