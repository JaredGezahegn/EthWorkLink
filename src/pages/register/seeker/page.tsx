import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@/components/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useApp } from "@/contexts/app-context";
import { locations } from "@/lib/data";

export default function SeekerRegistrationPage() {
  const { t, registerSeeker, login } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.location) {
      setError("Please select a location");
      return;
    }

    setLoading(true);

    const result = registerSeeker({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      location: formData.location,
    });

    if (result.success) {
      // Auto-login after registration
      const loginResult = login(formData.email, formData.password);
      if (loginResult.success) {
        navigate("/"); // Redirect to home page
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-center text-2xl font-bold text-foreground">
            {t("serviceSeeker")} {t("register")}
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {t("serviceSeekerDesc")}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {error && (
              <div className="rounded-lg bg-destructive/15 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("fullName")}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("fullName")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("email")}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("email")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("password")}</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("password")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("confirmPassword")}</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("confirmPassword")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("location")}</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">{t("locationPlaceholder")}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-secondary py-3 text-sm font-semibold text-secondary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Registering..." : t("registerButton")}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Already have an account? "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t("login")}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}


