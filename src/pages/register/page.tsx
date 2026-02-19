import { Link } from "@/components/link";
import { UserSearch, Building2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/lib/language-context";

export default function RegisterTypePage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="text-center text-2xl font-bold text-foreground lg:text-3xl">
            {t("registerAs")}
          </h1>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Link
              href="/register/seeker"
              className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-card p-8 shadow-sm transition-all hover:border-secondary hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                <UserSearch className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground group-hover:text-secondary">
                {t("serviceSeeker")}
              </h2>
              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                {t("serviceSeekerDesc")}
              </p>
            </Link>
            <Link
              href="/register/provider"
              className="group flex flex-col items-center gap-4 rounded-xl border-2 border-border bg-card p-8 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
                {t("serviceProvider")}
              </h2>
              <p className="text-center text-sm text-muted-foreground leading-relaxed">
                {t("serviceProviderDesc")}
              </p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


