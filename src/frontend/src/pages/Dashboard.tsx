import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bug,
  CheckSquare,
  Cloud,
  Droplets,
  Leaf,
  Sprout,
  Square,
  Sun,
  TrendingUp,
  Wind,
} from "lucide-react";
import { motion } from "motion/react";
import { AdvisorChat } from "../components/AdvisorChat";
import { useGetAllCrops, useGetAllPests } from "../hooks/useQueries";

const QUICK_TASKS = [
  { id: 1, label: "Water tomatoes", done: false },
  { id: 2, label: "Check for aphids", done: true },
  { id: 3, label: "Fertilize corn", done: false },
  { id: 4, label: "Prune pepper plants", done: false },
];

const SOIL = [
  { label: "Nitrogen", value: 45, status: "Low", color: "soil-bar-low" },
  { label: "Phosphorus", value: 72, status: "Good", color: "soil-bar-good" },
  { label: "Potassium", value: 88, status: "Good", color: "soil-bar-good" },
];

const FEATURED_TIP = {
  title: "Companion Planting Boost",
  body: "Plant basil near tomatoes to repel aphids and whiteflies naturally. This also improves tomato flavor and yield by up to 20%.",
  tag: "Soil & Growth",
};

export function Dashboard() {
  const { data: crops = [] } = useGetAllCrops();
  const { data: pests = [] } = useGetAllPests();

  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Build simple calendar events from crops
  const calendarEvents = crops.slice(0, 4).map((crop, i) => ({
    crop: crop.name,
    type: i % 2 === 0 ? "Planting" : "Harvest",
    day: 5 + i * 6,
  }));

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src="/assets/generated/farm-hero.dim_1400x400.jpg"
          alt="Farm field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-green-tint font-semibold text-sm uppercase tracking-widest mb-2">
              FarmAdvisor Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
              Welcome to FarmAdvisor
            </h1>
            <p className="text-white/80 text-base max-w-md">
              Your smart farming companion — monitor crops, track pests, and get
              AI-powered advice.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8 space-y-6">
        {/* Row 1: Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-card border-border hover:shadow-card-hover transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-brand-alert" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-foreground">
                    {pests.length || 3}
                  </span>
                  <Badge className="mb-1 bg-destructive/10 text-destructive border-destructive/20 border">
                    {pests.length > 2 ? "High" : "Medium"} Priority
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Active pest and disease alerts
                </p>
                <Link to="/pests">
                  <Button
                    variant="link"
                    size="sm"
                    className="px-0 h-auto text-primary text-xs mt-2"
                    data-ocid="dashboard.link"
                  >
                    View all alerts →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="shadow-card border-border hover:shadow-card-hover transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Sun className="w-4 h-4 text-brand-warning" />
                  Today's Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    24°C
                  </span>
                  <span className="text-muted-foreground mb-1">Sunny</span>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" /> 65%
                    humidity
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Wind className="w-3.5 h-3.5 text-sky-400" /> 12 km/h wind
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Cloud className="w-3.5 h-3.5" /> UV Index: 6 — Moderate
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-card border-border hover:shadow-card-hover transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-primary" />
                  Quick Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {QUICK_TASKS.slice(0, 3).map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      {task.done ? (
                        <CheckSquare className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      <span
                        className={
                          task.done
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }
                      >
                        {task.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  {QUICK_TASKS.filter((t) => t.done).length}/
                  {QUICK_TASKS.length} completed
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Row 2: Advisor teaser + Chat panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Advisor teaser */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="shadow-card border-border h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-foreground">
                      AI Chat Advisor
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Get instant farming answers
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Ask FarmAdvisor anything — from best planting times to pest
                  treatments. Powered by agricultural knowledge, available 24/7.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    "Crop care tips",
                    "Pest control",
                    "Soil testing",
                    "Harvest timing",
                  ].map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground bg-accent/40 rounded-md px-2 py-1.5"
                    >
                      <Leaf className="w-3 h-3 text-primary" />
                      {s}
                    </div>
                  ))}
                </div>
                <Link to="/advisor">
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    size="sm"
                    data-ocid="dashboard.primary_button"
                  >
                    Open Full Advisor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat panel */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AdvisorChat compact />
          </motion.div>
        </div>

        {/* Row 3: Crop Calendar + Soil Health */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Crop Calendar */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-card border-border">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Crop Calendar — {monthNames[today.getMonth()]}{" "}
                  {today.getFullYear()}
                </CardTitle>
                <Link to="/calendar">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary text-xs h-7"
                    data-ocid="dashboard.link"
                  >
                    Full calendar →
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (d) => (
                      <div
                        key={d}
                        className="text-center text-xs font-medium text-muted-foreground py-1"
                      >
                        {d}
                      </div>
                    ),
                  )}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    const event = calendarEvents.find((e) => e.day === day);
                    const isToday = day === today.getDate();
                    return (
                      <div
                        key={day}
                        className={`relative text-center text-xs py-1.5 rounded-md transition-colors cursor-default ${
                          isToday
                            ? "bg-primary text-primary-foreground font-bold"
                            : event
                              ? "bg-accent/60 text-accent-foreground font-medium"
                              : "text-muted-foreground hover:bg-muted"
                        }`}
                        title={
                          event ? `${event.crop} - ${event.type}` : undefined
                        }
                      >
                        {day}
                        {event && !isToday && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                        )}
                      </div>
                    );
                  })}
                </div>
                {calendarEvents.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      Upcoming events:
                    </p>
                    {calendarEvents.slice(0, 3).map((e) => (
                      <div
                        key={e.crop}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Badge
                          variant="outline"
                          className="text-primary border-primary/30 text-[10px] px-1.5 py-0"
                        >
                          {e.type}
                        </Badge>
                        <span className="text-foreground">{e.crop}</span>
                        <span className="text-muted-foreground ml-auto">
                          Day {e.day}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Soil Health */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="shadow-card border-border h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-primary" />
                  Soil Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SOIL.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-foreground">
                        {s.label}
                      </span>
                      <Badge
                        className={`text-[10px] px-1.5 py-0 ${
                          s.status === "Low"
                            ? "bg-destructive/10 text-destructive border-destructive/20 border"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        {s.status}
                      </Badge>
                    </div>
                    <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full ${s.color}`}
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {s.value}% level
                    </p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-1">
                  Last tested: {today.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Row 4: Pest Alerts + Featured Tip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pest Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-card border-border">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Bug className="w-4 h-4 text-brand-alert" />
                  Pest &amp; Disease Alerts
                </CardTitle>
                <Link to="/pests">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary text-xs h-7"
                    data-ocid="dashboard.link"
                  >
                    View all →
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {pests.length > 0 ? (
                  <div className="space-y-2">
                    {pests.slice(0, 3).map((p, i) => (
                      <div
                        key={p.name}
                        className="flex items-start gap-3 p-2 rounded-lg bg-muted/50"
                        data-ocid={`pest.item.${i + 1}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Bug className="w-4 h-4 text-destructive" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {p.affectedCrops}
                          </p>
                        </div>
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20 border text-[10px] shrink-0">
                          Alert
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {[
                      { name: "Aphid Infestation", crops: "Tomatoes, Peppers" },
                      { name: "Powdery Mildew", crops: "Cucumbers, Squash" },
                      { name: "Corn Earworm", crops: "Sweet Corn" },
                    ].map((p, idx) => (
                      <div
                        key={p.name}
                        className="flex items-start gap-3 p-2 rounded-lg bg-muted/50"
                        data-ocid={`pest.item.${idx + 1}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <Bug className="w-4 h-4 text-destructive" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.crops}
                          </p>
                        </div>
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20 border text-[10px] shrink-0">
                          Alert
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Tip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="shadow-card border-border bg-gradient-to-br from-accent/30 to-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Featured Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 border text-xs">
                  {FEATURED_TIP.tag}
                </Badge>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {FEATURED_TIP.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {FEATURED_TIP.body}
                </p>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">Pro Tip:</span>{" "}
                    Start companion planting at the beginning of the season for
                    best results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
