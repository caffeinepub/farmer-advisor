import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Bug, Leaf, Search, Syringe } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSearchPests } from "../hooks/useQueries";

const SEVERITY_MAP = [
  { label: "Critical", className: "bg-red-100 text-red-800 border-red-200" },
  {
    label: "High",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    label: "Medium",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  { label: "Low", className: "bg-green-100 text-green-800 border-green-200" },
];

function getSeverity(index: number) {
  return SEVERITY_MAP[index % SEVERITY_MAP.length];
}

export function PestsDiseases() {
  const [search, setSearch] = useState("");
  const { data: pests = [], isLoading } = useSearchPests(search);

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Bug className="w-5 h-5 text-brand-alert" />
          <h1 className="text-2xl font-bold text-foreground">
            Pests &amp; Diseases
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Monitor active pest alerts and disease outbreaks affecting your crops.
        </p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search pests or diseases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="pests.search_input"
        />
      </div>

      {isLoading && (
        <div className="space-y-3" data-ocid="pests.loading_state">
          {Array.from({ length: 4 }, (_, i) => i).map((i) => (
            <Card key={`sk-${i}`} className="shadow-card">
              <CardContent className="pt-5">
                <Skeleton className="h-5 w-48 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && pests.length === 0 && (
        <div className="text-center py-16" data-ocid="pests.empty_state">
          <Bug className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No pests found{search ? ` for "${search}"` : ""}.
          </p>
        </div>
      )}

      {!isLoading && pests.length > 0 && (
        <div className="space-y-3">
          {pests.map((pest, i) => {
            const severity = getSeverity(i);
            return (
              <motion.div
                key={pest.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`pests.item.${i + 1}`}
              >
                <Card className="shadow-card hover:shadow-card-hover transition-shadow border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                          <Bug className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-semibold text-foreground">
                            {pest.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Affects: {pest.affectedCrops}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`text-xs border shrink-0 ${severity.className}`}
                      >
                        {severity.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <AlertTriangle className="w-4 h-4 text-brand-warning shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">
                            Symptoms
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {pest.symptoms}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Syringe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">
                            Treatment
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {pest.treatment}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Leaf className="w-3.5 h-3.5 text-primary" />
                      <span>Affected crops: {pest.affectedCrops}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
