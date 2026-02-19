import { Link } from "@/components/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";
import { locations } from "@/lib/data";

export default function SeekerRegistrationPage() {
  const { t } = useLanguage();

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

          <form className="mt-8 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("fullName")}</label>
              <input
                type="text"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("fullName")}
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
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("confirmPassword")}</label>
              <input
                type="password"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("confirmPassword")}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t("location")}</label>
              <select className="w-full appearance-none rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">{t("locationPlaceholder")}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-lg bg-secondary py-3 text-sm font-semibold text-secondary-foreground hover:opacity-90"
            >
              {t("registerButton")}
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


