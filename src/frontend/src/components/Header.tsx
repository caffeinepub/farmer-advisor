import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Leaf,
  LogIn,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerProfile } from "../hooks/useQueries";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/crops", label: "Crops" },
  { to: "/pests", label: "Pests & Diseases" },
  { to: "/calendar", label: "Crop Calendar" },
  { to: "/farmlog", label: "Farm Log" },
  { to: "/soil-snap", label: "Soil Snap" },
  { to: "/advisor", label: "Advisor Chat" },
];

export function Header() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const { data: profile } = useGetCallerProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isLoggingIn = loginStatus === "logging-in";
  const isLoggedIn = !!identity;

  const farmName = profile?.farmName || "My Farm";
  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal ? `${principal.slice(0, 5)}...` : "";

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-xs">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">
            FarmAdvisor
          </span>
        </Link>

        {/* Nav links */}
        <nav
          className="hidden lg:flex items-center gap-1 flex-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.to ||
              (link.to !== "/" && currentPath.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right section */}
        <div className="ml-auto flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                aria-label="Notifications"
                data-ocid="header.button"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Link to="/settings">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  aria-label="Settings"
                  data-ocid="header.button"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted transition-colors"
                    data-ocid="header.dropdown_menu"
                  >
                    <Avatar className="w-7 h-7">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                        {farmName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-xs font-semibold text-foreground leading-none">
                        {farmName}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {shortPrincipal}
                      </p>
                    </div>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2"
                      data-ocid="header.link"
                    >
                      <User className="w-3.5 h-3.5" />
                      Farm Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => clear()}
                    className="text-destructive focus:text-destructive"
                    data-ocid="header.button"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="bg-primary text-primary-foreground hover:bg-brand-green-light"
              data-ocid="header.primary_button"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
