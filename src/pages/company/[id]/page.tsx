import { useParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarRating } from "@/components/star-rating";
import { useLanguage } from "@/lib/language-context";
import { featuredCompanies } from "@/lib/data";
import { MapPin, Briefcase, Star, Banknote } from "lucide-react";

export default function CompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const company = featuredCompanies.find((c) => c.id === Number(id));

  if (!company) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Company not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-gradient-to-r from-sidebar to-primary/80 px-4 py-12 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-medium uppercase tracking-wide text-sidebar-foreground/70">
              {company.category}
            </div>
            <h1 className="mt-1 text-2xl font-bold text-sidebar-foreground lg:text-3xl">
              {company.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-sidebar-foreground/80">
                <MapPin className="h-4 w-4" />
                {company.location}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-sidebar-foreground/80">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {company.rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <section>
                <h2 className="text-lg font-semibold text-foreground">{t("description")}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{company.description}</p>
              </section>

              {/* Services Offered */}
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">{t("servicesOffered")}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {company.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {/* Job Posts */}
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">{t("activeJobPosts")}</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {company.jobPosts.map((job, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium text-foreground">{job.title}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Banknote className="h-3.5 w-3.5" />
                          {job.salary}
                        </div>
                      </div>
                      <button className="rounded-lg bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground hover:opacity-90">
                        {t("applyButton")}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">{t("reviews")}</h2>
                <div className="mt-3 flex flex-col gap-3">
                  {company.reviews.map((review, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{review.user}</span>
                        <StarRating rating={review.rating} size={14} />
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{company.name}</h3>
                <div className="mt-3">
                  <StarRating rating={company.rating} />
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </div>
                <button className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  {t("recruitButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
