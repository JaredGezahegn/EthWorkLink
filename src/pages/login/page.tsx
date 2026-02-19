import { Link } from "@/components/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";

export default function LoginPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{t("loginTitle")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("loginSubtitle")}</p>
          </div>

          <form className="mt-8 flex flex-col gap-4">
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

            {/* Quick role navigation for demo */}
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/dashboard/seeker"
                className="w-full rounded-lg bg-secondary py-3 text-center text-sm font-semibold text-secondary-foreground hover:opacity-90"
              >
                {"Login as Service Seeker"}
              </Link>
              <Link
                href="/dashboard/company"
                className="w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                {"Login as Company"}
              </Link>
              <Link
                href="/dashboard/admin"
                className="w-full rounded-lg border border-border bg-card py-3 text-center text-sm font-semibold text-foreground hover:bg-muted"
              >
                {"Login as Admin"}
              </Link>
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
    </div>
  );
}


