import { apiClient } from "@/lib/api/client";
import type {
  BandAidTransaction,
  CreatePurchaseResult,
  Invoice,
  Pagination,
  Plan,
  Purchase,
} from "@/types/store";

/** Plans, purchases, invoices, and the band-aid ledger. */
export const billingApi = {
  listPlans() {
    return apiClient.get<Plan[]>("/plans");
  },

  createPurchase(planId: number) {
    return apiClient.post<CreatePurchaseResult>("/purchases", { planId });
  },

  listPurchases(page = 1) {
    return apiClient.get<{ purchases: Purchase[]; pagination: Pagination }>(
      `/purchases?page=${page}`,
    );
  },

  getInvoice(purchaseId: number) {
    return apiClient.get<Invoice>(`/purchases/${purchaseId}/invoice`);
  },

  listTransactions(page = 1) {
    return apiClient.get<{ transactions: BandAidTransaction[]; pagination: Pagination }>(
      `/bandaids/transactions?page=${page}`,
    );
  },
};
