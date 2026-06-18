import { apiClient } from "@/lib/api/client";
import type { ConnectionRequest, Partnership } from "@/types/partnership";
import type { CounselorAvatar } from "@/types/session";

/** Partnership + connection-request endpoints. */
export const partnershipApi = {
  /** The caller's active partnership, or null when unpartnered. */
  async getMine(): Promise<Partnership | null> {
    const data = await apiClient.get<{ partnership: Partnership | null }>("/partnerships/me");
    return data.partnership;
  },

  invite(email: string) {
    return apiClient.post<ConnectionRequest>("/partnerships/invite", { email });
  },

  listIncoming() {
    return apiClient.get<ConnectionRequest[]>("/partnerships/requests");
  },

  listSent() {
    return apiClient.get<ConnectionRequest[]>("/partnerships/requests/sent");
  },

  accept(id: number) {
    return apiClient.post<Partnership>(`/partnerships/requests/${id}/accept`);
  },

  decline(id: number) {
    return apiClient.post<null>(`/partnerships/requests/${id}/decline`);
  },

  cancel(id: number) {
    return apiClient.post<null>(`/partnerships/requests/${id}/cancel`);
  },

  dissolve() {
    return apiClient.post<null>("/partnerships/dissolve");
  },

  listAvatars() {
    return apiClient.get<CounselorAvatar[]>("/partnerships/avatars");
  },

  setAvatar(avatarId: number) {
    return apiClient.put<Partnership>("/partnerships/avatar", { avatarId });
  },
};
