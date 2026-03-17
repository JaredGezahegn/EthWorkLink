import { useApp } from "@/contexts/app-context";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, toggleLanguage } = useApp();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-xs font-semibold"
    >
      {language === "en" ? "EN | አማ" : "አማ | EN"}
    </Button>
  );
}
