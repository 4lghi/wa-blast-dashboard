// "use client"

// import { useEffect, useState } from "react"
// import ParticipantList from "../components/ParticipantList"
// import { getParticipants } from "../services/participants"
// import type { Participant } from "../types/participant"

// const ParticipantsPage = () => {
//   const [participants, setParticipants] = useState<Participant[]>([])
//   const [searchQuery, setSearchQuery] = useState("")

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getParticipants()
//         setParticipants(data)
//       } catch (error) {
//         console.error("Gagal mengambil data partisipan", error)
//       }
//     }

//     fetchData()
//   }, [])

//   const handleVerify = (id: number, action: "verify" | "reject") => {
//     // logika PATCH ke backend (bisa ditambahkan nanti)
//     console.log(`Verifikasi ID ${id} sebagai ${action}`)
//   }

//   // Filter by search
//   const filteredParticipants = participants.filter((p) =>
//     p.nama.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Daftar Partisipan</h2>

//       <input
//         type="text"
//         placeholder="Cari nama..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="border px-3 py-1 mb-4 rounded w-full max-w-md"
//       />

//       <ParticipantList
//         participants={filteredParticipants}
//         onVerify={handleVerify}
//         searchQuery={searchQuery}
//       />
//     </div>
//   )
// }

// export default ParticipantsPage
