import { Leaf } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-brand-footer text-sidebar-foreground mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-white">FarmAdvisor</span>
            </div>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              Your intelligent farming companion for smarter, sustainable
              agriculture.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>
                <a href="/crops" className="hover:text-white transition-colors">
                  Crop Management
                </a>
              </li>
              <li>
                <a href="/pests" className="hover:text-white transition-colors">
                  Pest Alerts
                </a>
              </li>
              <li>
                <a
                  href="/calendar"
                  className="hover:text-white transition-colors"
                >
                  Crop Calendar
                </a>
              </li>
              <li>
                <a
                  href="/advisor"
                  className="hover:text-white transition-colors"
                >
                  AI Advisor
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>
                <a
                  href="/farmlog"
                  className="hover:text-white transition-colors"
                >
                  Farm Log
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="hover:text-white transition-colors"
                >
                  Farm Settings
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/70">
              <li>
                <span>Agricultural Extension Service</span>
              </li>
              <li>
                <span>Local Farming Community</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-sidebar-foreground/60">
            © {year}. Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green-tint hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-sidebar-foreground/40">
            Empowering farmers with smart technology
          </p>
        </div>
      </div>
    </footer>
  );
}
