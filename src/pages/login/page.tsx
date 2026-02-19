import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@/components/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useApp } from "@/contexts/app-context";
import { DebugAccounts } from "@/components/debug-accounts";

export default function LoginPage() {
  const { t, login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = login(email, password);
    
    if (result.success && result.role) {
      // Redirect based on role
      switch (result.role) {
        case "seeker":
          navigate("/"); // Redirect seeker to home page
          break;
        case "company":
          navigate("/dashboard/company");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
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
        <div className="mx-auto w-full max-w-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{t("loginTitle")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("loginSubtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {error && (
              <div className="rounded-lg bg-destructive/15 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("email")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("password")}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("password")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Logging in..." : t("loginButton")}
            </button>

            {/* Test accounts hint */}
            <div className="rounded-lg bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
              <p className="font-semibold mb-1">Test Accounts:</p>
              <p>Seeker: seeker@test.com / seeker123</p>
              <p>Company: company@test.com / company123</p>
              <p>Admin: admin@ethioworklink.com / admin123</p>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              {t("register")}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
      <DebugAccounts />
    </div>
  );
}


