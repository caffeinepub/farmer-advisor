import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Calendar, Loader2, Plus, Sprout } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAddFarmLog, useGetFarmLogs } from "../hooks/useQueries";

export function FarmLog() {
  const { identity, login } = useInternetIdentity();
  const isLoggedIn = !!identity;

  const { data: logs = [], isLoading } = useGetFarmLogs();
  const { mutate: addLog, isPending } = useAddFarmLog();

  const [crop, setCrop] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop.trim() || !note.trim()) return;
    addLog(
      { crop: crop.trim(), note: note.trim(), date },
      {
        onSuccess: () => {
          toast.success("Log entry added!");
          setCrop("");
          setNote("");
          setDate(new Date().toISOString().split("T")[0]);
        },
        onError: () => toast.error("Failed to add log entry."),
      },
    );
  };

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Farm Log</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Record daily activities and observations from your farm.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Entry Form */}
        <div className="lg:col-span-1">
          <Card className="shadow-card border-border sticky top-20">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" />
                New Log Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoggedIn ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to add farm log entries.
                  </p>
                  <Button
                    onClick={() => login()}
                    className="bg-primary text-primary-foreground"
                    data-ocid="farmlog.primary_button"
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-ocid="farmlog.panel"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="log-crop" className="text-xs font-medium">
                      Crop Name
                    </Label>
                    <Input
                      id="log-crop"
                      placeholder="e.g. Tomatoes"
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      required
                      data-ocid="farmlog.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="log-date" className="text-xs font-medium">
                      Date
                    </Label>
                    <Input
                      id="log-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      data-ocid="farmlog.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="log-note" className="text-xs font-medium">
                      Note
                    </Label>
                    <Textarea
                      id="log-note"
                      placeholder="Describe what you observed or did..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      required
                      data-ocid="farmlog.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground"
                    disabled={isPending}
                    data-ocid="farmlog.submit_button"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    {isPending ? "Adding..." : "Add Entry"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Log List */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">
            All Entries ({logs.length})
          </h2>

          {isLoading && (
            <div className="space-y-3" data-ocid="farmlog.loading_state">
              {Array.from({ length: 3 }, (_, i) => i).map((i) => (
                <Card key={`sk-${i}`} className="shadow-card">
                  <CardContent className="pt-4">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && sortedLogs.length === 0 && (
            <div
              className="text-center py-16 bg-card rounded-xl border border-border shadow-card"
              data-ocid="farmlog.empty_state"
            >
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">
                No log entries yet.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isLoggedIn
                  ? "Add your first entry using the form."
                  : "Sign in to view your farm logs."}
              </p>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {sortedLogs.map((log, i) => (
                <motion.div
                  key={`${log.date}-${log.crop}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: i * 0.04 }}
                  data-ocid={`farmlog.item.${i + 1}`}
                >
                  <Card className="shadow-card border-border hover:shadow-card-hover transition-shadow">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Sprout className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground">
                              {log.crop}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {log.note}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(log.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
