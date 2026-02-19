import { Zap, Droplets, HardHat, Monitor, Sparkles, GraduationCap } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { serviceCategories } from "@/lib/data";
import type { TranslationKey } from "@/lib/translations";

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Droplets,
  HardHat,
  Monitor,
  Sparkles,
  GraduationCap,
};

export function CategoriesSection() {
  const { t } = useApp();

  return (
    <section className="px-4 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-foreground lg:text-3xl">
          {t("serviceCategories")}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {serviceCategories.map((cat) => {
            const Icon = iconMap[cat.icon];
            return (
              <div
                key={cat.id}
                className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-center text-sm font-medium text-foreground group-hover:text-primary">
                  {t(cat.label as TranslationKey)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
