import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight, Sprout } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllCrops } from "../hooks/useQueries";

const MONTH_NAMES = [
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

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function CropCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { data: crops = [] } = useGetAllCrops();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Build events: distribute crops across days deterministically
  const events: Record<
    number,
    { crop: string; type: "Planting" | "Harvest" }[]
  > = {};
  crops.forEach((crop, i) => {
    const plantDay = ((i * 7) % daysInMonth) + 1;
    const harvestDay = Math.min(
      plantDay + (Number(crop.daysToHarvest) % 28),
      daysInMonth,
    );
    if (!events[plantDay]) events[plantDay] = [];
    events[plantDay].push({ crop: crop.name, type: "Planting" });
    if (harvestDay !== plantDay) {
      if (!events[harvestDay]) events[harvestDay] = [];
      events[harvestDay].push({ crop: crop.name, type: "Harvest" });
    }
  });

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const allEvents = Object.entries(events)
    .flatMap(([day, evts]) =>
      evts.map((e) => ({ ...e, day: Number.parseInt(day) })),
    )
    .sort((a, b) => a.day - b.day)
    .slice(0, 8);

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Crop Calendar</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Plan and track planting and harvest schedules throughout the year.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevMonth}
                  data-ocid="calendar.pagination_prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-semibold text-foreground">
                  {MONTH_NAMES[month]} {year}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextMonth}
                  data-ocid="calendar.pagination_next"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-semibold text-muted-foreground py-2"
                  >
                    {d}
                  </div>
                ))}
                {/* Empty cells */}
                {Array.from(
                  { length: firstDay },
                  (_, i) => `empty-${firstDay}-${i}`,
                ).map((k) => (
                  <div key={k} />
                ))}
                {/* Days */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const dayEvents = events[day] || [];
                  const isToday =
                    year === today.getFullYear() &&
                    month === today.getMonth() &&
                    day === today.getDate();
                  return (
                    <div
                      key={day}
                      className={`relative min-h-[52px] p-1 rounded-lg border text-xs transition-colors ${
                        isToday
                          ? "bg-primary/10 border-primary/40"
                          : dayEvents.length > 0
                            ? "bg-accent/40 border-accent"
                            : "border-transparent hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`font-semibold ${
                          isToday ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {day}
                      </span>
                      <div className="mt-0.5 space-y-0.5">
                        {dayEvents.slice(0, 2).map((e) => (
                          <div
                            key={e.crop + e.type}
                            className={`text-[9px] px-1 rounded truncate ${
                              e.type === "Planting"
                                ? "bg-primary/20 text-primary"
                                : "bg-brand-warning/20 text-brand-warning"
                            }`}
                          >
                            {e.crop.slice(0, 6)}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-primary/20 inline-block" />
                  Planting
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-brand-warning/20 inline-block" />
                  Harvest
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-primary/10 border border-primary/40 inline-block" />
                  Today
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Events sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sprout className="w-4 h-4 text-primary" />
                Events This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allEvents.length === 0 ? (
                <div
                  className="text-center py-8"
                  data-ocid="calendar.empty_state"
                >
                  <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    No events this month.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {allEvents.map((e, i) => (
                    <div
                      key={e.crop + String(e.day) + e.type}
                      className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                      data-ocid={`calendar.item.${i + 1}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          e.type === "Planting"
                            ? "bg-primary/15"
                            : "bg-brand-warning/15"
                        }`}
                      >
                        <Sprout
                          className={`w-4 h-4 ${
                            e.type === "Planting"
                              ? "text-primary"
                              : "text-brand-warning"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {e.crop}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Day {e.day}
                        </p>
                      </div>
                      <Badge
                        className={`text-[10px] border shrink-0 ${
                          e.type === "Planting"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }`}
                      >
                        {e.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
