import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarRating } from "@/components/star-rating";
import { useLanguage } from "@/lib/language-context";
import { serviceListings, locations } from "@/lib/data";
import { MapPin, Building2 } from "lucide-react";

const categories = ["All", "Electrician", "Plumbing", "Construction", "IT Services", "Cleaning", "Tutoring"];

export default function ServicesPage() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [minRating, setMinRating] = useState(0);

  const filtered = serviceListings.filter((s) => {
    if (category !== "All" && s.category !== category) return false;
    if (location !== "All" && s.location !== location) return false;
    if (s.rating < minRating) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{t("services")}</h1>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            {/* Sidebar Filters */}
            <aside className="shrink-0 lg:w-60">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{t("filterByCategory")}</h3>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="All">{t("allCategories")}</option>
                      {categories.slice(1).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{t("filterByLocation")}</h3>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="All">{t("allLocations")}</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{t("filterByRating")}</h3>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value={0}>{t("anyRating")}</option>
                      <option value={4}>{"4+ Stars"}</option>
                      <option value={4.5}>{"4.5+ Stars"}</option>
                    </select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Service Cards */}
            <div className="flex-1">
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
                      {service.category}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {service.company}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {service.location}
                    </div>
                    <div className="mt-2">
                      <StarRating rating={service.rating} size={14} />
                    </div>
                    <div className="mt-auto pt-4">
                      <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                        {t("recruitService")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  No services found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


