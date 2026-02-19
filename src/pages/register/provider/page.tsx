import { Link } from "@/components/link";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { locations, serviceCategories } from "@/lib/data";
import type { TranslationKey } from "@/lib/translations";

export default function ProviderRegistrationPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register/provider/subscription");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-center text-2xl font-bold text-foreground">
            {t("serviceProvider")} {t("register")}
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {t("serviceProviderDesc")}
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("companyName")}</label>
              <input
                type="text"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("companyName")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("ownerName")}</label>
              <input
                type="text"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("ownerName")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("email")}</label>
              <input
                type="email"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("email")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("password")}</label>
              <input
                type="password"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("password")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("serviceCategory")}</label>
              <div className="flex flex-wrap gap-2 rounded-lg border border-input bg-card p-3">
                {serviceCategories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
                  >
                    <input type="checkbox" className="sr-only" />
                    {t(cat.label as TranslationKey)}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("companyLocation")}</label>
              <select className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">{t("locationPlaceholder")}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("companyDescription")}</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("companyDescription")}
              />
            </div>
            <button
              type="button"
              onClick={handleRegister}
              className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {t("registerCompany")}
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


