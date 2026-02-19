import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useApp } from "@/contexts/app-context";
import { MapPin, Building2, Banknote } from "lucide-react";

export default function JobsPage() {
  const { t, jobs, currentUser, applyForJob } = useApp();

  const handleApply = (job: typeof jobs[0]) => {
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
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{t("jobs")}</h1>

          {jobs.length === 0 ? (
            <div className="mt-10 text-center text-muted-foreground">
              <p>No job postings available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-foreground">{job.title}</h3>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {job.companyName}
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
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => handleApply(job)}
                      className="w-full rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:opacity-90"
                    >
                      {t("applyButton")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


