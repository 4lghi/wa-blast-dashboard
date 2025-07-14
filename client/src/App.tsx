"use client"

import { useEffect, useState } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import ParticipantList from "./components/ParticipantList"
import { getParticipants, updateParticipantStatus } from "./services/participants"
import type { Participant } from "./types/participant"
import "./App.css"

type ActivePage = "dashboard" | "participants"

export interface Activity {
  id: string
  type: "verified" | "rejected"
  message: string
  timestamp: string
  participantName: string
}

function App() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activities, setActivities] = useState<Activity[]>([])

  // Fetch participants from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParticipants()
         console.log("PARTICIPANTS FROM BACKEND:", data) // Cek apakah ini array kosong?
        setParticipants(data)
      } catch (err) {
        console.error("Gagal mengambil partisipan", err)
      }
    }

    fetchData()
  }, [])

  const addActivity = (type: "verified" | "rejected", participantName: string) => {
    const newActivity: Activity = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message:
        type === "verified"
          ? `${participantName} telah diverifikasi`
          : `${participantName} ditolak verifikasinya`,
      timestamp: new Date().toISOString(),
      participantName,
    }

    setActivities((prev) => [newActivity, ...prev].slice(0, 10)) // Simpan max 10 terakhir
  }

  const handleVerify = async (id: string, action: "verify" | "reject") => {
    try {
      await updateParticipantStatus(id, action)

      setParticipants((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status: action === "verify" ? "verified" : "rejected",
                verifiedAt: new Date().toISOString(),
              }
            : p,
        ),
      )

      const participant = participants.find((p) => p.id === id)
      if (participant) {
        addActivity(action === "verify" ? "verified" : "rejected", participant.nama)
      }
    } catch (err) {
      console.error("Gagal memperbarui status partisipan", err)
    }
  }

  const filteredParticipants = participants.filter((participant) =>
    participant.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard participants={participants} activities={activities} />
      case "participants":
        return (
          <ParticipantList
            participants={filteredParticipants}
            onVerify={handleVerify}
            searchQuery={searchQuery}
          />
        )
      default:
        return 
        // <Dashboard participants={participants} activities={activities} />
    }
  }

  const showSearch = activePage === "participants"

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={showSearch} />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  )
}

export default App
