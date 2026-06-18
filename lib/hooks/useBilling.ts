"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { billingApi } from "@/lib/api/endpoints/billing";
import { queryKeys } from "@/lib/api/queryKeys";
import { useAuth } from "@/providers/AuthProvider";

/** Available band-aid plans. */
export function usePlans() {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.plans,
    queryFn: () => billingApi.listPlans(),
    enabled: isAuthenticated,
    staleTime: 5 * 60_000,
  });
}

/** Buy a plan. With the STUB provider this completes inline (credits the pool,
 *  issues an invoice). Refreshes balance, purchases, and the ledger. */
export function useCreatePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (planId: number) => billingApi.createPurchase(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partnership });
      queryClient.invalidateQueries({ queryKey: queryKeys.purchases });
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
    },
  });
}

export function usePurchases(page = 1) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [...queryKeys.purchases, page],
    queryFn: () => billingApi.listPurchases(page),
    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
  });
}

export function useInvoice(purchaseId: number | null) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: purchaseId ? queryKeys.invoice(purchaseId) : ["invoice", "none"],
    queryFn: () => billingApi.getInvoice(purchaseId!),
    enabled: isAuthenticated && Boolean(purchaseId),
  });
}

export function useBandAidTransactions(page = 1) {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [...queryKeys.transactions, page],
    queryFn: () => billingApi.listTransactions(page),
    enabled: isAuthenticated,
    placeholderData: keepPreviousData,
  });
}
