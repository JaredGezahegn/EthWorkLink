import { useApp } from "@/contexts/app-context";
import { Link } from "@/components/link";
import { Trash2, Image as ImageIcon } from "lucide-react";

export default function CompanyServicesPage() {
  const { services, currentUser, deleteService } = useApp();

  // Filter services for current company
  const companyServices = services.filter(s => s.companyId === currentUser?.id);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio item?")) {
      deleteService(id);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground lg:text-2xl">My Portfolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {companyServices.length} completed project{companyServices.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/dashboard/company/services/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Add New Project
        </Link>
      </div>

      {companyServices.length === 0 ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-border bg-muted/50 p-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">No projects yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Start building your portfolio by adding your completed work
          </p>
          <Link
            href="/dashboard/company/services/new"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Add Your First Project
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companyServices.map((service) => (
            <div key={service.id} className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Photo Preview */}
              {service.photos && service.photos.length > 0 && (
                <div className="relative h-48 bg-muted">
                  <img
                    src={service.photos[0]}
                    alt={service.title}
                    className="h-full w-full object-cover"
                  />
                  {service.photos.length > 1 && (
                    <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
                      +{service.photos.length - 1} more
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-4">
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
                  {service.category}
                </div>
                <h3 className="text-base font-semibold text-foreground line-clamp-2">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {service.description}
                </p>
                
                {service.rating !== undefined && service.rating > 0 && (
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <span className="text-warning">★</span>
                    <span className="font-medium text-foreground">{service.rating.toFixed(1)}</span>
                    {service.reviews && service.reviews.length > 0 && (
                      <span className="text-muted-foreground">
                        ({service.reviews.length} review{service.reviews.length !== 1 ? 's' : ''})
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


