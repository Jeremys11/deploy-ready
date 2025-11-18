import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { Users, LayoutDashboard, FileText, Settings } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">A</span>
                </div>
                <div>
                  <h1 className="text-lg font-semibold leading-none">Aetna Outreach Tracker</h1>
                  <p className="text-xs text-muted-foreground">Care Management System</p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center gap-1">
                <NavLink
                  to="/"
                  end
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  activeClassName="bg-muted text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/members"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  activeClassName="bg-muted text-foreground"
                >
                  <Users className="h-4 w-4" />
                  Members
                </NavLink>
                <NavLink
                  to="/reports"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  activeClassName="bg-muted text-foreground"
                >
                  <FileText className="h-4 w-4" />
                  Reports
                </NavLink>
                <NavLink
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  activeClassName="bg-muted text-foreground"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </NavLink>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Outreach Worker</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                SJ
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
