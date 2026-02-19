import { useLanguage } from "@/lib/language-context";
import { StarRating } from "@/components/star-rating";
import { serviceListings } from "@/lib/data";

export default function AdminServicesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("manageServices")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">Monitor all listed services on the platform</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-semibold text-foreground">Service</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("company")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("location")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("rating")}</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {serviceListings.map((service) => (
              <tr key={service.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{service.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{service.company}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {service.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{service.location}</td>
                <td className="px-4 py-3">
                  <StarRating rating={service.rating} size={14} />
                </td>
                <td className="px-4 py-3">
                  <button className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


