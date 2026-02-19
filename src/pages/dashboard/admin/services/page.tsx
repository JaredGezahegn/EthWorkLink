import { useApp } from "@/contexts/app-context";

export default function AdminServicesPage() {
  const { t, services, deleteService } = useApp();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("manageServices")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">View and manage all services</p>

      {services.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground">No services yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Services will appear here as companies post them
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Service</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("company")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("location")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">{t("rating")}</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{service.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{service.companyName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{service.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{service.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {service.rating ? `${service.rating.toFixed(1)} ★` : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="rounded-md border border-destructive/30 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
