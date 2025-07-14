import api from "../lib/axios"
import type { Participant } from "../types/participant"

export const getParticipants = async (): Promise<Participant[]> => {
  const res = await api.get<Participant[]>("/api/nasabah")
  return res.data
}

export const updateParticipantStatus = async (
  id: string,
  action: "verify" | "reject"
): Promise<void> => {
  await api.patch(`/api/nasabah/${id}`, { action })
}
