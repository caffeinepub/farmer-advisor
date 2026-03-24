import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  MapPin,
  Save,
  Settings as SettingsIcon,
  Tractor,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerProfile, useSaveProfile } from "../hooks/useQueries";

export function Settings() {
  const { identity, login } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const { data: profile, isLoading } = useGetCallerProfile();
  const { mutate: saveProfile, isPending } = useSaveProfile();

  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (profile) {
      setFarmName(profile.farmName || "");
      setLocation(profile.location || "");
    }
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(
      { farmName: farmName.trim(), location: location.trim() },
      {
        onSuccess: () => toast.success("Farm settings saved!"),
        onError: () => toast.error("Failed to save settings."),
      },
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Farm Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Configure your farm profile and preferences.
        </p>
      </div>

      <div className="max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Tractor className="w-4 h-4 text-primary" />
                Farm Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoggedIn ? (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to manage your farm settings.
                  </p>
                  <Button
                    onClick={() => login()}
                    className="bg-primary text-primary-foreground"
                    data-ocid="settings.primary_button"
                  >
                    Sign In
                  </Button>
                </div>
              ) : isLoading ? (
                <div className="space-y-3" data-ocid="settings.loading_state">
                  <div className="h-9 bg-muted rounded-lg animate-pulse" />
                  <div className="h-9 bg-muted rounded-lg animate-pulse" />
                </div>
              ) : (
                <form
                  onSubmit={handleSave}
                  className="space-y-4"
                  data-ocid="settings.panel"
                >
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="farm-name"
                      className="text-xs font-medium flex items-center gap-1.5"
                    >
                      <Tractor className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                      Farm Name
                    </Label>
                    <Input
                      id="farm-name"
                      placeholder="e.g. Green Valley Farm"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      data-ocid="settings.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="farm-location"
                      className="text-xs font-medium flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                      Location
                    </Label>
                    <Input
                      id="farm-location"
                      placeholder="e.g. Napa Valley, CA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      data-ocid="settings.input"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground"
                    disabled={isPending}
                    data-ocid="settings.save_button"
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {isPending ? "Saving..." : "Save Settings"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
