import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StarRating } from "@/components/star-rating";
import { useApp } from "@/contexts/app-context";
import { locations } from "@/lib/data";
import { MapPin, Building2 } from "lucide-react";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const categories = ["All", "Electrician", "Plumbing", "Construction", "Cleaning", "Welding", "Carpentry"];

export default function ServicesPage() {
  const { t, services, currentUser, createServiceRequest } = useApp();
  const [searchParams] = useSearchParams();
  
  // Get category from URL query parameter and capitalize it
  const urlCategory = searchParams.get("category");
  const initialCategory = urlCategory 
    ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1)
    : "All";
  
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [requestDescription, setRequestDescription] = useState("");

  // Update category when URL changes
  useEffect(() => {
    if (urlCategory) {
      const formattedCategory = urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1);
      if (categories.includes(formattedCategory)) {
        setCategory(formattedCategory);
      }
    }
  }, [urlCategory]);

  const filtered = services.filter((s) => {
    if (category !== "All" && s.category !== category) return false;
    if (location !== "All" && s.location !== location) return false;
    if (s.rating && s.rating < minRating) return false;
    return true;
  });

  const handleOpenRequestModal = (service: typeof services[0]) => {
    if (!currentUser) {
      toast.error("Please login to request services");
      return;
    }

    if ("companyName" in currentUser) {
      toast.error("Companies cannot request services");
      return;
    }

    setSelectedService(service);
    setShowRequestModal(true);
  };

  const handleSubmitRequest = () => {
    if (!currentUser || !selectedService) return;
    if ("companyName" in currentUser) return;

    if (requestDescription.trim().length < 10) {
      toast.warning("Please describe your requirements (minimum 10 characters)");
      return;
    }

    createServiceRequest({
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      seekerId: currentUser.id,
      seekerName: currentUser.name,
      companyId: selectedService.companyId,
      companyName: selectedService.companyName,
      description: requestDescription.trim(),
    });

    toast.success("Service request sent successfully!");
    setShowRequestModal(false);
    setRequestDescription("");
    setSelectedService(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{t("services")}</h1>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            {/* Sidebar Filters */}
            <aside className="shrink-0 lg:w-60">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{t("filterByCategory")}</h3>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("allCategories")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">{t("allCategories")}</SelectItem>
                        {categories.slice(1).map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{t("filterByLocation")}</h3>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("allLocations")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">{t("allLocations")}</SelectItem>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{t("filterByRating")}</h3>
                    <Select value={String(minRating)} onValueChange={(v) => setMinRating(Number(v))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("anyRating")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">{t("anyRating")}</SelectItem>
                        <SelectItem value="4">{"4+ Stars"}</SelectItem>
                        <SelectItem value="4.5">{"4.5+ Stars"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </aside>

            {/* Service Cards */}
            <div className="flex-1">
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <Link
                      href={`/services?category=${service.category.toLowerCase()}`}
                      className="mb-1 inline-block text-xs font-medium uppercase tracking-wide text-primary hover:underline"
                    >
                      {service.category}
                    </Link>
                    <h3 className="text-base font-semibold text-foreground">{service.title}</h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      {service.companyName}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {service.location}
                    </div>
                    <div className="mt-2">
                      <StarRating rating={service.rating || 0} size={14} />
                    </div>
                    {service.photos && service.photos.length > 0 && (
                      <div className="mt-3">
                        <img
                          src={service.photos[0]}
                          alt={service.title}
                          className="h-32 w-full rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-auto pt-4">
                      <Button
                        onClick={() => handleOpenRequestModal(service)}
                        className="w-full"
                        size="sm"
                      >
                        {t("recruitButton")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  {t("noServicesFound")}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Service Request Modal */}
      {showRequestModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground">Request Service</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {selectedService.title} - {selectedService.companyName}
            </p>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Describe Your Requirements *
              </label>
              <textarea
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                rows={5}
                placeholder="Please describe what you need, when you need it, and any specific requirements..."
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Minimum 10 characters ({requestDescription.length}/10)
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestDescription("");
                  setSelectedService(null);
                }}
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleSubmitRequest}
                disabled={requestDescription.trim().length < 10}
                className="flex-1"
              >
                {t("sendRequest")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
