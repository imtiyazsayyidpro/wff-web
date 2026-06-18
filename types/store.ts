/** Shapes mirrored from wff-backend plan / purchase / bandaid modules. */

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Plan {
  id: number;
  name: string;
  bandAidQuantity: number;
  pricePaise: number;
  currency: string;
}

export type PurchaseStatus = "CREATED" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface Purchase {
  id: number;
  bandAidQuantity: number;
  amountPaise: number;
  currency: string;
  provider: string;
  providerOrderId: string | null;
  providerPaymentId: string | null;
  status: PurchaseStatus;
  planName: string | null;
  invoiceNumber: string | null;
  invoiceId: number | null;
  createdAt: string;
  paidAt: string | null;
  purchasedByUserId: number;
}

/** Result of POST /purchases. With the STUB provider this completes inline. */
export interface CreatePurchaseResult {
  completed: boolean;
  purchaseId: number;
  providerOrderId: string;
  amountPaise: number;
  currency: string;
  plan: { id: number; name: string; bandAidQuantity: number };
  provider: string;
  bandAidBalance?: number;
  invoice?: { id: number; number: string; issuedAt: string };
}

export interface Invoice {
  id: number;
  number: string;
  amountPaise: number;
  currency: string;
  bandAidQuantity: number;
  planName: string | null;
  issuedAt: string;
}

export type BandAidTransactionType =
  | "FREE_GRANT_INITIAL"
  | "FREE_GRANT_FEEDBACK"
  | "PURCHASE"
  | "SESSION_SPEND"
  | "ADJUSTMENT";

export interface BandAidTransaction {
  id: number;
  type: BandAidTransactionType;
  amount: number;
  balanceAfter: number;
  note: string | null;
  createdAt: string;
}
