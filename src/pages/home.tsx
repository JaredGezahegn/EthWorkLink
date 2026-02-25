import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { Footer } from "@/components/footer";
import { useApp } from "@/contexts/app-context";
import { Link } from "@/components/link";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, LayoutDashboard, Wrench, PlusCircle, Inbox, Briefcase, Settings } from "lucide-react";

export default function HomePage() {
  const { currentUser, getCompanyRequests } = useApp();
  const { pathname } = useLocation();
  
  // Check if user is a company
  const isCompany = currentUser && 'companyName' in currentUser;
  
  // Get unread requests count
  const unreadRequestsCount = isCompany && currentUser 
    ? getCompanyRequests(currentUser.id).filter(r => r.read === false).length 
    : 0;

  // Company navigation items
  const companyNavItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Dashboard", href: "/dashboard/company", icon: LayoutDashboard },
    { label: "Post", href: "/dashboard/company/services/new", icon: PlusCircle, isPost: true },
    { label: "Services", href: "/dashboard/company/services", icon: Wrench },
    { label: "Requests", href: "/dashboard/company/requests", icon: Inbox, badge: unreadRequestsCount },
    { label: "Jobs", href: "/dashboard/company/jobs", icon: Briefcase },
    { label: "Profile", href: "/dashboard/company/profile", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
      </main>
      <Footer />
      
      {/* Mobile Bottom Nav for Company Users */}
      {isCompany && (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card lg:hidden">
          <div className="flex items-center gap-1 overflow-x-auto px-2 py-2 scrollbar-hide">
            {companyNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex shrink-0 flex-col items-center gap-0.5 px-3 py-1 text-xs relative",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "relative flex items-center justify-center",
                    item.isPost && "h-10 w-10 rounded-full bg-primary text-primary-foreground -mt-4 shadow-lg"
                  )}>
                    <Icon className="h-5 w-5" />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "truncate max-w-[60px]",
                    item.isPost && "mt-1"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}


