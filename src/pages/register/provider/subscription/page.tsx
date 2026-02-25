import { Link } from "@/components/link";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const { t, currentUser, updateCompanySubscription } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string>("sixMonth");

  // Check if user is logged in as company
  useEffect(() => {
    if (!currentUser || !('companyName' in currentUser)) {
      navigate("/register/provider");
    }
  }, [currentUser, navigate]);

  const handleSelectPlan = (planId: string) => {
    if (!currentUser || !('companyName' in currentUser)) return;

    // Save the subscription plan
    updateCompanySubscription(currentUser.id, planId as "free" | "monthly" | "sixMonth" | "yearly");
    
    // Redirect to dashboard
    navigate("/dashboard/company");
  };

  if (!currentUser || !('companyName' in currentUser)) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {t("chooseYourPlan")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              {t("chooseYourPlanDesc")}
            </p>
          </div>

          {/* Plans Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const isHighlighted = plan.highlighted;
              const isSelected = selectedPlan === plan.id;
              
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative flex cursor-pointer flex-col rounded-2xl p-8 transition-all duration-200 ${
                    isHighlighted
                      ? "bg-primary text-primary-foreground shadow-xl scale-105"
                      : "bg-card border border-border hover:border-primary/30 hover:shadow-lg"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3 right-6">
                      <span className="inline-block rounded-full bg-background px-4 py-1 text-xs font-semibold text-foreground shadow-sm">
                        {t(plan.badge)}
                      </span>
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className={`text-xl font-bold ${isHighlighted ? "text-primary-foreground" : "text-foreground"}`}>
                    {t(plan.nameKey)}
                  </h3>

                  {/* Price */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-extrabold ${isHighlighted ? "text-primary-foreground" : "text-foreground"}`}>
                        {t(plan.priceKey)}
                      </span>
                      <span className={`text-base ${isHighlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {t(plan.periodKey)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mt-3 text-sm ${isHighlighted ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                    {plan.id === "free" && "Get started with basic features"}
                    {plan.id === "monthly" && "Perfect for growing businesses"}
                    {plan.id === "sixMonth" && "Best value for established companies"}
                    {plan.id === "yearly" && "Maximum savings and premium support"}
                  </p>

                  {/* Divider */}
                  <div className={`my-6 h-px ${isHighlighted ? "bg-primary-foreground/20" : "bg-border"}`} />

                  {/* Features */}
                  <ul className="flex flex-1 flex-col gap-3">
                    {plan.features.map((featureKey) => (
                      <li
                        key={featureKey}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isHighlighted
                              ? "text-primary-foreground"
                              : "text-primary"
                          }`}
                        />
                        <span className={isHighlighted ? "text-primary-foreground/95" : "text-foreground"}>
                          {t(featureKey)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPlan(plan.id);
                    }}
                    className={`mt-8 w-full rounded-lg py-3.5 text-sm font-semibold transition-all ${
                      isHighlighted
                        ? "bg-background text-primary hover:bg-background/90 shadow-md"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {plan.id === "free" ? t("getStarted") : t("subscribe")}
                  </button>

                  {/* Selected indicator */}
                  {isSelected && !isHighlighted && (
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Success Badge */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground">
              <Check className="h-4 w-4" />
              {t("registrationComplete")}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


