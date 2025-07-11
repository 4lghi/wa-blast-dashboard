export interface Participant {
  idTable: number // ini untuk keperluan internal, bisa diabaikan jika tidak perlu
  id: string
  nama: string
  no_hp: string
  status: string
  status_langganan: string
  nik: string
  no_kpj: string
  updatedAt: string // karena DateTime dari Prisma dikirim sebagai string via API
  userId: string
  isActive: boolean
  verifiedAt?: string | null // nullable karena belum tentu sudah diverifikasi
  user?: {
    id: string
    // Tambahkan field dari tabel `users` jika perlu
  }
}

// export interface Participant {
//   id: number
//   name: string
//   phone: string
//   status: "pending" | "verified" | "rejected"
//   chatbot_response: string
//   contacted_at: string
//   verified_at: string | null
//   created_at: string
//   subscription: "subscribe" | "unsubscribe" | "inactive" | "active"
// }