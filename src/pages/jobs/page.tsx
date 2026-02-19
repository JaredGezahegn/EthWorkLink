import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useApp } from "@/contexts/app-context";
import { jobListings } from "@/lib/data";
import { MapPin, Building2, Banknote } from "lucide-react";

export default function JobsPage() {
  const { t } = useApp();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{t("jobs")}</h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-secondary">
                  {job.category}
                </div>
                <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
                <div className="mt-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <Banknote className="h-3.5 w-3.5" />
                    {job.salary}
                  </div>
                </div>
                <div className="mt-auto pt-4">
                  <button className="w-full rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90">
                    {t("applyButton")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


