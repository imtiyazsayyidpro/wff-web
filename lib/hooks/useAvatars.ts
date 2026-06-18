"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { partnershipApi } from "@/lib/api/endpoints/partnership";
import { queryKeys } from "@/lib/api/queryKeys";
import { useAuth } from "@/providers/AuthProvider";

/** The selectable counselor avatars. */
export function useCounselorAvatars() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.avatars,
    queryFn: () => partnershipApi.listAvatars(),
    enabled: isAuthenticated,
    staleTime: 5 * 60_000,
  });
}

/** Set the partnership's counselor avatar. */
export function useSetAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (avatarId: number) => partnershipApi.setAvatar(avatarId),
    onSuccess: (partnership) => {
      queryClient.setQueryData(queryKeys.partnership, partnership);
    },
  });
}
