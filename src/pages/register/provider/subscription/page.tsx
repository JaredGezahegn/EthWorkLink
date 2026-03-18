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
  name: string;
  price: string;
  period: string;
  features: TranslationKey[];
  image: string;
  badge?: TranslationKey;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Basic",
    price: "0 Birr",
    period: "for a month!",
    features: ["freeFeature1", "freeFeature2", "freeFeature3", "freeFeature4"],
    image: "/illustrations/plans/free.png",
  },
  {
    id: "monthly",
    name: "Comfort",
    price: "499 Birr",
    period: "Per Month",
    features: ["monthlyFeature1", "monthlyFeature2", "monthlyFeature3", "monthlyFeature4", "monthlyFeature5"],
    image: "/illustrations/plans/monthly.png",
  },
  {
    id: "sixMonth",
    name: "Premium",
    price: "2,499 Birr",
    period: "Per 6 Months",
    badge: "mostPopular",
    highlighted: true,
    features: ["sixMonthFeature1", "sixMonthFeature2", "sixMonthFeature3", "sixMonthFeature4", "sixMonthFeature5", "sixMonthFeature6"],
    image: "/illustrations/plans/sixmonth.png",
  },
  {
    id: "yearly",
    name: "Enterprise",
    price: "3,999 Birr",
    period: "Per Year",
    badge: "bestValue",
    features: ["yearlyFeature1", "yearlyFeature2", "yearlyFeature3", "yearlyFeature4", "yearlyFeature5", "yearlyFeature6", "yearlyFeature7"],
    image: "/illustrations/plans/yearly.png",
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
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navbar />
      <main className="flex-1 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex justify-center">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium shadow-sm text-foreground">
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
                className={`relative flex flex-col pt-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-background border-none shadow-md rounded-[2rem] overflow-hidden ${plan.highlighted ? "ring-2 ring-primary/40 scale-105 sm:scale-100 lg:scale-105 z-10" : ""
                  }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                    <Badge variant={plan.highlighted ? "default" : "secondary"} className="shadow-md font-semibold px-4 py-1.5 text-[10px] uppercase tracking-wider rounded-full">
                      {t(plan.badge)}
                    </Badge>
                  </div>
                )}

                {/* Illustration */}
                <div className="px-6 flex justify-center mt-2 h-48 w-full items-center">
                  <img src={plan.image} alt={plan.id} className="object-contain h-full w-full opacity-95 transition-transform duration-500 hover:scale-110" />
                </div>

                <CardHeader className="text-center pb-2 pt-6">
                  <CardTitle className={`text-xl font-black uppercase tracking-widest ${plan.highlighted ? "text-primary/90" : "text-primary/70"}`}>
                    {plan.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 pb-6 px-6 relative">
                  {/* Price Centered */}
                  <div className="flex flex-col items-center justify-center my-4 group">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold tracking-tighter text-foreground group-hover:text-primary transition-colors">
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">
                      {plan.period}
                    </span>
                  </div>

                  <div className="my-4 mx-8 h-px bg-primary/10 rounded-full" />

                  {/* Features List */}
                  <ul className="flex flex-1 flex-col gap-3 mt-2 px-2">
                    {plan.features.map((featureKey) => (
                      <li key={featureKey} className="flex items-start gap-3 text-[13px] font-medium text-center justify-center">
                        <span className="text-muted-foreground/90 leading-relaxed text-center">
                          {t(featureKey)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-8 pb-10 pt-4 bg-gradient-to-t from-muted/20 to-transparent">
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    variant={plan.highlighted ? "default" : "secondary"}
                    className={`w-full text-[13px] font-bold py-6 shadow-sm hover:shadow-md transition-all rounded-xl tracking-widest uppercase ${plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
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
