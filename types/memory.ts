import type { Pagination } from "@/types/store";

export type MemorySource = "USER" | "AI";

/** A personal note the counselor loads at the start of each session. */
export interface Memory {
  id: number;
  content: string;
  source: MemorySource;
  createdAt: string;
  updatedAt: string;
}

export interface MemoriesPage {
  memories: Memory[];
  pagination: Pagination;
}
