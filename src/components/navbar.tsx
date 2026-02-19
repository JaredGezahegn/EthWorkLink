import { Link } from "@/components/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Ethio-Work</span>
          <span className="text-xl font-bold text-secondary">Link</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary">
            {t("home")}
          </Link>
          <Link href="/services" className="text-sm font-medium text-foreground hover:text-primary">
            {t("services")}
          </Link>
          <Link href="/jobs" className="text-sm font-medium text-foreground hover:text-primary">
            {t("jobs")}
          </Link>
          <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary">
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {t("register")}
          </Link>
          <button
            onClick={toggleLang}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
          >
            {lang === "en" ? "EN | አማ" : "አማ | EN"}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {open && (
        <div className="border-t border-border bg-card px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground">
              {t("home")}
            </Link>
            <Link href="/services" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground">
              {t("services")}
            </Link>
            <Link href="/jobs" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground">
              {t("jobs")}
            </Link>
            <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-foreground">
              {t("login")}
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              {t("register")}
            </Link>
            <button
              onClick={toggleLang}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              {lang === "en" ? "EN | አማ" : "አማ | EN"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
