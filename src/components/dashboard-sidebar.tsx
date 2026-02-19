import { Link } from "@/components/link";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  title: string;
  items: SidebarItem[];
  accentColor?: string;
}

export function DashboardSidebar({ title, items, accentColor = "bg-primary" }: DashboardSidebarProps) {
  const { pathname } = useLocation();

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
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
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
        <div className="flex items-center justify-around py-2">
          {items.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-1 text-xs",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="truncate">{item.label.split(" ").slice(0, 2).join(" ")}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
