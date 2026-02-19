import { useParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarRating } from "@/components/star-rating";
import { useApp } from "@/contexts/app-context";
import { MapPin, Briefcase, Star, Banknote, Image as ImageIcon } from "lucide-react";

export default function CompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t, companies, services, jobs, currentUser, createServiceRequest, applyForJob } = useApp();
  const company = companies.find((c) => c.id === id);

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

  // Get company's services and jobs
  const companyServices = services.filter(s => s.companyId === company.id);
  const companyJobs = jobs.filter(j => j.companyId === company.id);

  const handleRecruit = () => {
    if (!currentUser) {
      alert("Please login to request services");
      return;
    }

    if ("companyName" in currentUser) {
      alert("Companies cannot request services");
      return;
    }

    if (companyServices.length === 0) {
      alert("This company has no services available yet");
      return;
    }

    // Create request for the first service (or you could show a modal to select)
    const service = companyServices[0];
    createServiceRequest({
      serviceId: service.id,
      serviceName: service.title,
      seekerId: currentUser.id,
      seekerName: currentUser.name,
      companyId: company.id,
      companyName: company.companyName,
    });

    alert("Service request sent successfully!");
  };

  const handleApplyJob = (job: typeof companyJobs[0]) => {
    if (!currentUser) {
      alert("Please login to apply for jobs");
      return;
    }

    if ("companyName" in currentUser) {
      alert("Companies cannot apply for jobs");
      return;
    }

    applyForJob({
      jobId: job.id,
      jobTitle: job.title,
      seekerId: currentUser.id,
      seekerName: currentUser.name,
      seekerEmail: currentUser.email,
      companyId: job.companyId,
    });

    alert("Application submitted successfully!");
  };

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
              {company.companyName}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm text-sidebar-foreground/80">
                <MapPin className="h-4 w-4" />
                {company.location}
              </div>
              {company.rating && (
                <div className="flex items-center gap-1.5 text-sm text-sidebar-foreground/80">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  {company.rating.toFixed(1)}
                </div>
              )}
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

              {/* Portfolio / Services */}
              {companyServices.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground">Portfolio</h2>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {companyServices.map((service) => (
                      <div key={service.id} className="rounded-lg border border-border bg-card overflow-hidden">
                        {service.photos && service.photos.length > 0 ? (
                          <img
                            src={service.photos[0]}
                            alt={service.title}
                            className="h-40 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-40 items-center justify-center bg-muted">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="text-xs font-medium uppercase tracking-wide text-primary">
                            {service.category}
                          </div>
                          <h3 className="mt-1 text-sm font-semibold text-foreground">{service.title}</h3>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {service.description}
                          </p>
                          {service.rating !== undefined && service.rating > 0 && (
                            <div className="mt-2">
                              <StarRating rating={service.rating} size={12} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Job Posts */}
              {companyJobs.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground">{t("activeJobPosts")}</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {companyJobs.map((job) => (
                      <div
                        key={job.id}
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
                        <button
                          onClick={() => handleApplyJob(job)}
                          className="rounded-lg bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground hover:opacity-90"
                        >
                          {t("applyButton")}
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Reviews */}
              {companyServices.some(s => s.reviews && s.reviews.length > 0) && (
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-foreground">{t("reviews")}</h2>
                  <div className="mt-3 flex flex-col gap-3">
                    {companyServices.flatMap(s => s.reviews || []).map((review) => (
                      <div key={review.id} className="rounded-lg border border-border bg-card p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">{review.userName}</span>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{company.companyName}</h3>
                {company.rating && (
                  <div className="mt-3">
                    <StarRating rating={company.rating} />
                  </div>
                )}
                <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {company.location}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Owner:</span> {company.ownerName}
                </div>
                <button
                  onClick={handleRecruit}
                  className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
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
