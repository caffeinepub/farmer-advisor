import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Droplets, Leaf, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSearchCrops } from "../hooks/useQueries";

const SEASON_COLORS: Record<string, string> = {
  Spring: "bg-green-100 text-green-800 border-green-200",
  Summer: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Fall: "bg-orange-100 text-orange-800 border-orange-200",
  Winter: "bg-blue-100 text-blue-800 border-blue-200",
  "Year-round": "bg-purple-100 text-purple-800 border-purple-200",
};

export function Crops() {
  const [search, setSearch] = useState("");
  const { data: crops = [], isLoading } = useSearchCrops(search);

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Leaf className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Crop Management
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Browse and manage your crops with detailed growing information.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search crops..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          data-ocid="crops.search_input"
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="crops.loading_state"
        >
          {Array.from({ length: 6 }, (_, i) => i).map((i) => (
            <Card key={`sk-${i}`} className="shadow-card">
              <CardContent className="pt-5">
                <Skeleton className="h-5 w-32 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && crops.length === 0 && (
        <div className="text-center py-16" data-ocid="crops.empty_state">
          <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            No crops found{search ? ` for "${search}"` : ""}.
          </p>
        </div>
      )}

      {/* Crops Grid */}
      {!isLoading && crops.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {crops.map((crop, i) => (
            <motion.div
              key={crop.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              data-ocid={`crops.item.${i + 1}`}
            >
              <Card className="shadow-card hover:shadow-card-hover transition-shadow border-border h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold text-foreground">
                      {crop.name}
                    </CardTitle>
                    <Badge
                      className={`text-xs border shrink-0 ${
                        SEASON_COLORS[crop.season] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {crop.season}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {crop.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Droplets className="w-3.5 h-3.5 text-blue-400" />
                      <span className="truncate">{crop.watering}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{Number(crop.daysToHarvest)}d harvest</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground col-span-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Spacing: {crop.spacing}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
