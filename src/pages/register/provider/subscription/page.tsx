import { Link } from "@/components/link";
import { useState } from "react";
import { Check, Zap, Crown, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useApp } from "@/contexts/app-context";
import type { TranslationKey } from "@/lib/translations";

interface Plan {
  id: string;
  nameKey: TranslationKey;
  priceKey: TranslationKey;
  periodKey: TranslationKey;
  features: TranslationKey[];
  icon: React.ReactNode;
  badge?: TranslationKey;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    nameKey: "freePlan",
    priceKey: "freePlanPrice",
    periodKey: "forever",
    icon: <Zap className="h-6 w-6" />,
    features: [
      "freeFeature1",
      "freeFeature2",
      "freeFeature3",
      "freeFeature4",
    ],
  },
  {
    id: "monthly",
    nameKey: "monthlyPlan",
    priceKey: "monthlyPlanPrice",
    periodKey: "perMonth",
    icon: <Sparkles className="h-6 w-6" />,
    features: [
      "monthlyFeature1",
      "monthlyFeature2",
      "monthlyFeature3",
      "monthlyFeature4",
      "monthlyFeature5",
    ],
  },
  {
    id: "sixMonth",
    nameKey: "sixMonthPlan",
    priceKey: "sixMonthPlanPrice",
    periodKey: "perSixMonths",
    icon: <Crown className="h-6 w-6" />,
    badge: "mostPopular",
    highlighted: true,
    features: [
      "sixMonthFeature1",
      "sixMonthFeature2",
      "sixMonthFeature3",
      "sixMonthFeature4",
      "sixMonthFeature5",
      "sixMonthFeature6",
    ],
  },
  {
    id: "yearly",
    nameKey: "yearlyPlan",
    priceKey: "yearlyPlanPrice",
    periodKey: "perYear",
    icon: <Crown className="h-6 w-6" />,
    badge: "bestValue",
    features: [
      "yearlyFeature1",
      "yearlyFeature2",
      "yearlyFeature3",
      "yearlyFeature4",
      "yearlyFeature5",
      "yearlyFeature6",
      "yearlyFeature7",
    ],
  },
];

export default function SubscriptionPage() {
  const { t } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<string>("sixMonth");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-4 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Check className="h-4 w-4" />
              {t("registrationComplete")}
            </span>
          </div>
          <h1 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            {t("chooseYourPlan")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            {t("chooseYourPlanDesc")}
          </p>

          {/* Plans Grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative flex cursor-pointer flex-col rounded-xl border-2 bg-card p-6 transition-all ${
                    plan.highlighted
                      ? isSelected
                        ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                        : "border-primary/40 shadow-md"
                      : isSelected
                        ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                        : "border-border hover:border-primary/30"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          plan.badge === "mostPopular"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {t(plan.badge)}
                      </span>
                    </div>
                  )}

                  {/* Icon + Plan Name */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isSelected || plan.highlighted
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {t(plan.nameKey)}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-foreground">
                      {t(plan.priceKey)}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      {t(plan.periodKey)}
                    </span>
                    {plan.id === "sixMonth" && (
                      <span className="ml-2 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                        {t("savePercent")}
                      </span>
                    )}
                    {plan.id === "yearly" && (
                      <span className="ml-2 rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                        {t("savePercentYearly")}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="mb-8 flex flex-1 flex-col gap-3">
                    {plan.features.map((featureKey) => (
                      <li
                        key={featureKey}
                        className="flex items-start gap-2 text-sm text-card-foreground"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isSelected || plan.highlighted
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        {t(featureKey)}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/dashboard/company"
                    className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : plan.highlighted
                          ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {plan.id === "free" ? t("getStarted") : t("subscribe")}
                  </Link>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute -top-1 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Skip link */}
          <div className="mt-8 text-center">
            <Link
              href="/dashboard/company"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {t("skipForNow")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


