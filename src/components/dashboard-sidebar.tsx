import { Link } from "@/components/link";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { type LucideIcon, Home } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

interface DashboardSidebarProps {
  title: string;
  items: SidebarItem[];
  accentColor?: string;
}

export function DashboardSidebar({ title, items, accentColor = "bg-primary" }: DashboardSidebarProps) {
  const { pathname } = useLocation();

  // Extract post items and regular items
  const postServiceItem = items.find(item => item.href.includes('/services/new'));
  const regularItems = items.filter(item => !item.href.includes('/services/new') && !item.href.includes('/jobs/new'));

  // Mobile navigation: Home, Dashboard, Post (3rd), Services, Requests, Jobs, Profile
  const mobileItems = [
    { label: "Home", href: "/", icon: Home },
    regularItems[0], // Dashboard
    ...(postServiceItem ? [postServiceItem] : []), // Post (3rd position)
    regularItems[1], // Services
    regularItems[2], // Requests
    regularItems[3], // Jobs
    regularItems[4], // Profile
  ].filter(Boolean);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <div className="flex h-full flex-col">
          <div className={cn("px-6 py-5", accentColor)}>
            <h2 className="text-lg font-bold text-sidebar-primary-foreground">{title}</h2>
          </div>
          <nav className="flex-1 px-3 py-4">
            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors relative",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-bold text-destructive-foreground">
                          {item.badge > 99 ? '99+' : item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card lg:hidden">
        <div className="flex items-center gap-1 overflow-x-auto px-2 py-2 scrollbar-hide snap-x snap-mandatory">
          {mobileItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isPostAction = item.href.includes('/new');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-0.5 py-1 text-xs relative snap-start",
                  "w-[calc(20%-0.25rem)]", // 5 items visible (20% each with gap)
                  "px-2",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "relative flex items-center justify-center",
                  isPostAction && "h-10 w-10 rounded-full bg-primary text-primary-foreground -mt-4 shadow-lg"
                )}>
                  <Icon className="h-5 w-5" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "truncate max-w-[60px] text-center",
                  isPostAction && "mt-1"
                )}>
                  {item.label.split(" ").slice(0, 2).join(" ")}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
