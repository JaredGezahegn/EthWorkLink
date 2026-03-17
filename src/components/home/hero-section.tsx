import { Search, MapPin } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { locations } from "@/lib/data";
import { AnimatedBackground } from "./animated-background";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HeroSection() {
  const { t } = useApp();

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
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full border-0 bg-card pl-10 pr-4 shadow-lg"
            />
          </div>
          <div className="sm:w-48">
            <Select>
              <SelectTrigger className="w-full border-0 bg-card shadow-lg">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder={t("locationPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="shadow-lg">
            {t("search")}
          </Button>
        </div>
      </div>
    </section>
  );
}

