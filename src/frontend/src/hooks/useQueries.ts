import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Crop, FarmLog, Pest, Profile, Question } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllCrops() {
  const { actor, isFetching } = useActor();
  return useQuery<Crop[]>({
    queryKey: ["crops"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCrops();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchCrops(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Crop[]>({
    queryKey: ["crops", "search", keyword],
    queryFn: async () => {
      if (!actor) return [];
      if (!keyword.trim()) return actor.getAllCrops();
      return actor.searchCrops(keyword);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPests() {
  const { actor, isFetching } = useActor();
  return useQuery<Pest[]>({
    queryKey: ["pests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchPests(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Pest[]>({
    queryKey: ["pests", "search", keyword],
    queryFn: async () => {
      if (!actor) return [];
      if (!keyword.trim()) return actor.getAllPests();
      return actor.searchPests(keyword);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFarmLogs() {
  const { actor, isFetching } = useActor();
  return useQuery<FarmLog[]>({
    queryKey: ["farmLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyFarmLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFarmLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      date: string;
      note: string;
      crop: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFarmLog({
        date: params.date,
        note: params.note,
        crop: params.crop,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farmLogs"] });
    },
  });
}

export function useSearchQuestions(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["questions", "search", keyword],
    queryFn: async () => {
      if (!actor || !keyword.trim()) return [];
      return actor.searchQuestions(keyword);
    },
    enabled: !!actor && !isFetching && keyword.trim().length > 0,
  });
}

export function useGetCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Profile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
