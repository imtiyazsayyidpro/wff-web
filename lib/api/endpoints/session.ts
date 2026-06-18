import { apiClient } from "@/lib/api/client";
import type { Session, SessionMessage, SendMessageResult } from "@/types/session";

/** Counseling-session endpoints. */
export const sessionApi = {
  /** The caller's current live/pending session, or null. */
  async getCurrent(): Promise<Session | null> {
    const data = await apiClient.get<{ session: Session | null }>("/sessions/current");
    return data.session;
  },

  /** Past + present sessions for the partnership. */
  async list(): Promise<Session[]> {
    const data = await apiClient.get<{ sessions: Session[] }>("/sessions");
    return data.sessions;
  },

  get(id: number) {
    return apiClient.get<Session>(`/sessions/${id}`);
  },

  initiate() {
    return apiClient.post<Session>("/sessions/initiate");
  },

  accept(id: number) {
    return apiClient.post<Session>(`/sessions/${id}/accept`);
  },

  decline(id: number) {
    return apiClient.post<null>(`/sessions/${id}/decline`);
  },

  cancel(id: number) {
    return apiClient.post<null>(`/sessions/${id}/cancel`);
  },

  pause(id: number) {
    return apiClient.post<Session>(`/sessions/${id}/pause`);
  },

  resume(id: number) {
    return apiClient.post<Session>(`/sessions/${id}/resume`);
  },

  close(id: number) {
    return apiClient.post<Session>(`/sessions/${id}/close`);
  },

  /** Start a fresh session that carries the closed one's summary forward. */
  continue(id: number) {
    return apiClient.post<Session>(`/sessions/${id}/continue`);
  },

  async listMessages(id: number): Promise<SessionMessage[]> {
    const data = await apiClient.get<{ messages: SessionMessage[] }>(`/sessions/${id}/messages`);
    return data.messages;
  },

  sendMessage(id: number, content: string) {
    return apiClient.post<SendMessageResult>(`/sessions/${id}/messages`, { content });
  },
};
