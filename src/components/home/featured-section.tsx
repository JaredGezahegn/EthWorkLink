import { Link } from "@/components/link";
import { MapPin } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { StarRating } from "@/components/star-rating";

export function FeaturedSection() {
  const { t, companies } = useApp();

  // Only show approved companies
  const approvedCompanies = companies.filter(c => c.status === "approved");

  return (
    <section className="bg-muted px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-foreground lg:text-3xl">
          {t("featuredCompanies")}
        </h2>
        {approvedCompanies.length === 0 ? (
          <div className="mt-10 text-center text-muted-foreground">
            <p>No companies available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {approvedCompanies.slice(0, 6).map((company) => (
              <div
                key={company.id}
                className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
                  {company.category}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{company.companyName}</h3>
                <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {company.location}
                </div>
                <div className="mt-2">
                  <StarRating rating={company.rating || 0} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {company.description}
                </p>
                <div className="mt-auto pt-4">
                  <Link
                    href={`/company/${company.id}`}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {t("viewProfile")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
