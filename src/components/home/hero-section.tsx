import { Search, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { locations } from "@/lib/data";
import { AnimatedBackground } from "./animated-background";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden px-4 py-20 lg:py-28">
      {/* Animated background with blue collar work photos */}
      <AnimatedBackground />
      
      <div className="relative mx-auto max-w-4xl text-center z-10">
        <h1 className="text-balance text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
          {t("heroTitle")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-white/90 drop-shadow-md lg:text-lg">
          {t("heroSubtitle")}
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full rounded-lg border-0 bg-card py-3 pl-10 pr-4 text-sm text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="relative sm:w-48">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              className="w-full appearance-none rounded-lg border-0 bg-card py-3 pl-10 pr-8 text-sm text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue=""
            >
              <option value="" disabled>
                {t("locationPlaceholder")}
              </option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:opacity-90">
            {t("search")}
          </button>
        </div>
      </div>
    </section>
  );
}
