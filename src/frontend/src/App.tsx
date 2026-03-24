import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AdvisorPage } from "./pages/AdvisorPage";
import { CropCalendar } from "./pages/CropCalendar";
import { Crops } from "./pages/Crops";
import { Dashboard } from "./pages/Dashboard";
import { FarmLog } from "./pages/FarmLog";
import { PestsDiseases } from "./pages/PestsDiseases";
import { Settings } from "./pages/Settings";
import { SoilSnap } from "./pages/SoilSnap";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});
const cropsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crops",
  component: Crops,
});
const pestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pests",
  component: PestsDiseases,
});
const calendarRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calendar",
  component: CropCalendar,
});
const farmlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/farmlog",
  component: FarmLog,
});
const advisorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advisor",
  component: AdvisorPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
});
const soilSnapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/soil-snap",
  component: SoilSnap,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  cropsRoute,
  pestsRoute,
  calendarRoute,
  farmlogRoute,
  advisorRoute,
  settingsRoute,
  soilSnapRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
