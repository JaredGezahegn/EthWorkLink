import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
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
  badge?: TranslationKey;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    nameKey: "freePlan",
    priceKey: "freePlanPrice",
    periodKey: "forever",
    features: ["freeFeature1", "freeFeature2", "freeFeature3", "freeFeature4"],
  },
  {
    id: "monthly",
    nameKey: "monthlyPlan",
    priceKey: "monthlyPlanPrice",
    periodKey: "perMonth",
    features: ["monthlyFeature1", "monthlyFeature2", "monthlyFeature3", "monthlyFeature4", "monthlyFeature5"],
  },
  {
    id: "sixMonth",
    nameKey: "sixMonthPlan",
    priceKey: "sixMonthPlanPrice",
    periodKey: "perSixMonths",
    badge: "mostPopular",
    highlighted: true,
    features: ["sixMonthFeature1", "sixMonthFeature2", "sixMonthFeature3", "sixMonthFeature4", "sixMonthFeature5", "sixMonthFeature6"],
  },
  {
    id: "yearly",
    nameKey: "yearlyPlan",
    priceKey: "yearlyPlanPrice",
    periodKey: "perYear",
    badge: "bestValue",
    features: ["yearlyFeature1", "yearlyFeature2", "yearlyFeature3", "yearlyFeature4", "yearlyFeature5", "yearlyFeature6", "yearlyFeature7"],
  },
];

export default function SubscriptionPage() {
  const { t, currentUser, updateCompanySubscription } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !('companyName' in currentUser)) {
      navigate("/register/provider");
    }
  }, [currentUser, navigate]);

  const handleSelectPlan = (planId: string) => {
    if (!currentUser || !('companyName' in currentUser)) return;
    updateCompanySubscription(currentUser.id, planId as "free" | "monthly" | "sixMonth" | "yearly");
    navigate("/"); // Redirect to homepage after plan selection
  };

  if (!currentUser || !('companyName' in currentUser)) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Check className="h-4 w-4" />
              {t("registrationComplete")}
            </span>
          </div>
          
          <h1 className="text-center text-2xl font-bold text-foreground lg:text-4xl">
            {t("chooseYourPlan")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground lg:text-base">
            {t("chooseYourPlanDesc")}
          </p>

          {/* Plans Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-xl p-6 transition-shadow ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground shadow-xl"
                    : "border border-border bg-card shadow-sm hover:shadow-md"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                      {t(plan.badge)}
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className={`text-lg font-bold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                  {t(plan.nameKey)}
                </h3>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                    {t(plan.priceKey)}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {t(plan.periodKey)}
                  </span>
                </div>

                {/* Divider */}
                <div className={`my-6 h-px ${plan.highlighted ? "bg-primary-foreground/20" : "bg-border"}`} />

                {/* Features */}
                <ul className="mb-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((featureKey) => (
                    <li key={featureKey} className="flex items-start gap-2 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                      <span className={plan.highlighted ? "text-primary-foreground/95" : "text-foreground"}>
                        {t(featureKey)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full rounded-lg py-2.5 text-sm font-semibold transition-opacity ${
                    plan.highlighted
                      ? "bg-background text-primary hover:opacity-90"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {plan.id === "free" ? t("getStarted") : t("subscribe")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
