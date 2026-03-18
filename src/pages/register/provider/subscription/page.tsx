import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useApp } from "@/contexts/app-context";
import type { TranslationKey } from "@/lib/translations";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex justify-center">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium shadow-sm">
              <Check className="mr-2 h-4 w-4 text-primary" />
              {t("registrationComplete")}
            </Badge>
          </div>
          
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-foreground lg:text-5xl">
            {t("chooseYourPlan")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-muted-foreground lg:text-lg">
            {t("chooseYourPlanDesc")}
          </p>

          {/* Plans Grid */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  plan.highlighted
                    ? "border-primary shadow-lg ring-2 ring-primary/20 scale-105 sm:scale-100 lg:scale-105 z-10"
                    : "border-border shadow-sm hover:border-primary/50"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant={plan.highlighted ? "default" : "secondary"} className="shadow-md font-semibold px-3 py-1 text-xs uppercase tracking-wider">
                      {t(plan.badge)}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4 pt-8">
                  <CardTitle className={`text-2xl font-bold ${plan.highlighted ? "text-primary" : "text-foreground"}`}>
                    {t(plan.nameKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 pb-6 px-6">
                  <div className="mb-6 flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-extrabold tracking-tight text-foreground">
                      {t(plan.priceKey)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground ml-1">
                      {t(plan.periodKey)}
                    </span>
                  </div>
                  
                  <div className="my-6 h-px w-full bg-border/60" />

                  <ul className="flex flex-1 flex-col gap-4">
                    {plan.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-start gap-3 text-sm">
                        <div className={`rounded-full p-1 mt-0.5 ${plan.highlighted ? "bg-primary/10" : "bg-muted"}`}>
                          <Check className={`h-3.5 w-3.5 shrink-0 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">
                          {t(featureKey)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="px-6 pb-8 pt-2">
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    variant={plan.highlighted ? "default" : "outline"}
                    className="w-full text-base font-semibold py-6 shadow-sm hover:shadow-md transition-shadow"
                    size="lg"
                  >
                    {plan.id === "free" ? t("getStarted") : t("subscribe")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
