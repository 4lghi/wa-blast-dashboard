// Dummy data structure that matches what would come from Neon database
// This structure is simple and easy to replace with real database queries

export interface Participant {
  id: number
  name: string
  phone: string
  status: "pending" | "verified" | "rejected"
  chatbot_response: string
  contacted_at: string
  verified_at: string | null
  created_at: string
}

// Simple dummy data - easy to replace with database queries
export const dummyParticipants: Participant[] = [
  {
    id: 1,
    name: "Ahmad Rizki",
    phone: "+6281234567890",
    status: "pending",
    chatbot_response: "Ya, saya tertarik untuk mengikuti program ini",
    contacted_at: "2024-01-08T10:30:00Z",
    verified_at: null,
    created_at: "2024-01-08T10:30:00Z",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    phone: "+6281234567891",
    status: "verified",
    chatbot_response: "Saya siap mengikuti seluruh rangkaian kegiatan",
    contacted_at: "2024-01-08T09:15:00Z",
    verified_at: "2024-01-08T11:20:00Z",
    created_at: "2024-01-08T09:15:00Z",
  },
  {
    id: 3,
    name: "Budi Santoso",
    phone: "+6281234567892",
    status: "rejected",
    chatbot_response: "Maaf, saya tidak bisa mengikuti karena ada kesibukan lain",
    contacted_at: "2024-01-08T08:45:00Z",
    verified_at: null,
    created_at: "2024-01-08T08:45:00Z",
  },
  {
    id: 4,
    name: "Maya Sari",
    phone: "+6281234567893",
    status: "pending",
    chatbot_response: "Bisa tolong jelaskan lebih detail tentang programnya?",
    contacted_at: "2024-01-08T12:00:00Z",
    verified_at: null,
    created_at: "2024-01-08T12:00:00Z",
  },
  {
    id: 5,
    name: "Dedi Kurniawan",
    phone: "+6281234567894",
    status: "verified",
    chatbot_response: "Saya sudah siap dan menunggu informasi selanjutnya",
    contacted_at: "2024-01-08T07:30:00Z",
    verified_at: "2024-01-08T10:45:00Z",
    created_at: "2024-01-08T07:30:00Z",
  },
  {
    id: 6,
    name: "Rina Wati",
    phone: "+6281234567895",
    status: "pending",
    chatbot_response: "Apakah ada biaya yang harus dibayar?",
    contacted_at: "2024-01-08T13:15:00Z",
    verified_at: null,
    created_at: "2024-01-08T13:15:00Z",
  },
  {
    id: 7,
    name: "Andi Pratama",
    phone: "+6281234567896",
    status: "verified",
    chatbot_response: "Terima kasih atas informasinya, saya akan ikut",
    contacted_at: "2024-01-08T06:20:00Z",
    verified_at: "2024-01-08T09:30:00Z",
    created_at: "2024-01-08T06:20:00Z",
  },
  {
    id: 8,
    name: "Lina Marlina",
    phone: "+6281234567897",
    status: "rejected",
    chatbot_response: "Saya sudah terdaftar di program serupa",
    contacted_at: "2024-01-08T14:00:00Z",
    verified_at: null,
    created_at: "2024-01-08T14:00:00Z",
  },
  {
    id: 9,
    name: "Hendra Wijaya",
    phone: "+6281234567898",
    status: "pending",
    chatbot_response: "Saya tertarik, tapi perlu konfirmasi jadwal dulu",
    contacted_at: "2024-01-08T15:30:00Z",
    verified_at: null,
    created_at: "2024-01-08T15:30:00Z",
  },
  {
    id: 10,
    name: "Dewi Sartika",
    phone: "+6281234567899",
    status: "verified",
    chatbot_response: "Saya siap mengikuti program ini dengan komitmen penuh",
    contacted_at: "2024-01-08T05:45:00Z",
    verified_at: "2024-01-08T08:15:00Z",
    created_at: "2024-01-08T05:45:00Z",
  },
]

// Helper functions for statistics (easy to replace with database aggregations)
export const getParticipantStats = () => {
  const total = dummyParticipants.length
  const verified = dummyParticipants.filter((p) => p.status === "verified").length
  const pending = dummyParticipants.filter((p) => p.status === "pending").length
  const rejected = dummyParticipants.filter((p) => p.status === "rejected").length

  return { total, verified, pending, rejected }
}

export const getRecentActivity = () => {
  return dummyParticipants
    .sort((a, b) => new Date(b.contacted_at).getTime() - new Date(a.contacted_at).getTime())
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      type: p.status,
      message:
        p.status === "verified"
          ? `${p.name} telah diverifikasi`
          : p.status === "rejected"
            ? `${p.name} ditolak verifikasinya`
            : `${p.name} menunggu verifikasi`,
      time: formatTimeAgo(p.contacted_at),
    }))
}

// Simple time formatting function
const formatTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} jam yang lalu`
  } else {
    return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`
  }
}
