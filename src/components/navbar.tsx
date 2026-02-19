import { Link } from "@/components/link";
import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { language, toggleLanguage, t, currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const getDashboardLink = () => {
    if (!currentUser) return "/";
    if ("role" in currentUser) {
      switch (currentUser.role) {
        case "seeker":
          return "/dashboard/seeker";
        case "admin":
          return "/dashboard/admin";
        default:
          return "/";
      }
    }
    return "/dashboard/company";
  };

  const getUserName = () => {
    if (!currentUser) return "";
    if ("role" in currentUser) {
      return currentUser.name;
    }
    return currentUser.companyName;
  };

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

          {currentUser ? (
            // Logged in - show profile dropdown
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                <User className="h-4 w-4" />
                <span>{getUserName()}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                  <div className="p-2">
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <LogOut className="h-4 w-4" />
                      {t("logout")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Not logged in - show login/register
            <>
              <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary">
                {t("login")}
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                {t("register")}
              </Link>
            </>
          )}

          <button
            onClick={toggleLanguage}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
          >
            {language === "en" ? "EN | አማ" : "አማ | EN"}
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

            {currentUser ? (
              <>
                <div className="border-t border-border pt-3">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">
                    {getUserName()}
                  </p>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="mt-2 flex w-full items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("logout")}
                  </button>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}

            <button
              onClick={toggleLanguage}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              {language === "en" ? "EN | አማ" : "አማ | EN"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
