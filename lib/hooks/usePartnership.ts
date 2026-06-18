"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { partnershipApi } from "@/lib/api/endpoints/partnership";
import { queryKeys } from "@/lib/api/queryKeys";
import { useAuth } from "@/providers/AuthProvider";

/** The caller's active partnership (null when unpartnered). */
export function usePartnership() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.partnership,
    queryFn: () => partnershipApi.getMine(),
    enabled: isAuthenticated,
  });
}

export function useIncomingRequests() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.incomingRequests,
    queryFn: () => partnershipApi.listIncoming(),
    enabled: isAuthenticated,
  });
}

export function useSentRequests() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.sentRequests,
    queryFn: () => partnershipApi.listSent(),
    enabled: isAuthenticated,
  });
}

export function useInvitePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => partnershipApi.invite(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentRequests });
    },
  });
}

export function useAcceptRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => partnershipApi.accept(id),
    onSuccess: (partnership) => {
      queryClient.setQueryData(queryKeys.partnership, partnership);
      queryClient.invalidateQueries({ queryKey: queryKeys.incomingRequests });
      queryClient.invalidateQueries({ queryKey: queryKeys.sentRequests });
    },
  });
}

export function useDeclineRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => partnershipApi.decline(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.incomingRequests });
    },
  });
}

export function useCancelRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => partnershipApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sentRequests });
    },
  });
}

export function useDissolvePartnership() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => partnershipApi.dissolve(),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.partnership, null);
      queryClient.invalidateQueries({ queryKey: queryKeys.currentSession });
    },
  });
}
