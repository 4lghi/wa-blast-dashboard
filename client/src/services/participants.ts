import api from "../lib/axios"
import type { Participant } from "../types/participant"

export const getParticipants = async (): Promise<Participant[]> => {
  const res = await api.get<Participant[]>("/participants")
  return res.data
}

export const updateParticipantStatus = async (
  id: number,
  action: "verify" | "reject"
): Promise<void> => {
  await api.patch(`/participants/${id}`, { action })
}
