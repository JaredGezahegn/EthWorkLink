import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/app-context";
import { locations } from "@/lib/data";

export default function NewJobPage() {
  const { t, addJob, currentUser } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      setError("You must be logged in");
      return;
    }

    const companyName = "companyName" in currentUser ? currentUser.companyName : "Unknown";

    addJob({
      title: formData.title,
      companyId: currentUser.id,
      companyName,
      location: formData.location,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements || undefined,
    });

    setSuccess(true);
    setTimeout(() => {
      navigate("/dashboard/company/jobs");
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-foreground lg:text-2xl">{t("postNewJob")}</h1>
      
      {success && (
        <div className="mt-4 rounded-lg bg-success/15 px-4 py-3 text-sm text-success">
          Job posted successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 max-w-md flex flex-col gap-4">
        {error && (
          <div className="rounded-lg bg-destructive/15 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Job Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. Senior Electrician"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("location")} *</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Salary *</label>
          <input
            type="text"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            required
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g. 15,000 ETB/month"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t("description")} *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Describe the job role and responsibilities..."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Requirements (Optional)</label>
          <textarea
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="List required qualifications and experience..."
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground hover:opacity-90"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
