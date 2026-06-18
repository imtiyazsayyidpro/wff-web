import { apiClient } from "@/lib/api/client";
import type { MemoriesPage, Memory } from "@/types/memory";

/** Personal memories (under /memories). */
export const memoryApi = {
  list(page = 1) {
    return apiClient.get<MemoriesPage>(`/memories?page=${page}`);
  },

  create(content: string) {
    return apiClient.post<Memory>("/memories", { content });
  },

  update(id: number, content: string) {
    return apiClient.put<Memory>(`/memories/${id}`, { content });
  },

  remove(id: number) {
    return apiClient.delete<null>(`/memories/${id}`);
  },
};
