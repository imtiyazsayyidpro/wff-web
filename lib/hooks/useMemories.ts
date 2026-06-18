"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { memoryApi } from "@/lib/api/endpoints/memory";
import { queryKeys } from "@/lib/api/queryKeys";
import { useAuth } from "@/providers/AuthProvider";

export function useMemories(page = 1) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [...queryKeys.memories, page],
    queryFn: () => memoryApi.list(page),
    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useCreateMemory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => memoryApi.create(content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.memories }),
  });
}

export function useUpdateMemory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; content: string }) =>
      memoryApi.update(vars.id, vars.content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.memories }),
  });
}

export function useDeleteMemory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => memoryApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.memories }),
  });
}
