// "use client"

// import { useEffect, useState } from "react"
// import Sidebar from "./components/Sidebar"
// import Header from "./components/Header"
// import Dashboard from "./components/Dashboard"
// import ParticipantList from "./components/ParticipantList"
// import { getParticipants, updateParticipantStatus } from "./services/participants"
// import type { Participant } from "./types/participant"
// import "./App.css"

// type ActivePage = "dashboard" | "participants"

// export interface Activity {
//   id: string
//   type: "verified" | "rejected" | "contacted"
//   message: string
//   timestamp: string
//   participantName: string
// }

// function App() {
//   const [activePage, setActivePage] = useState<ActivePage>("dashboard")
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
//   const [participants, setParticipants] = useState<Participant[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activities, setActivities] = useState<Activity[]>([])

//   // Fetch data dari backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getParticipants()
//         setParticipants(data)
//       } catch (err) {
//         console.error("Gagal mengambil partisipan", err)
//       }
//     }

//     fetchData()
//   }, [])

//   const addActivity = (type: "verified" | "rejected", participantName: string) => {
//     const newActivity: Activity = {
//       id: `${Date.now()}-${Math.random()}`,
//       type,
//       message:
//         type === "verified" ? `${participantName} telah diverifikasi` : `${participantName} ditolak verifikasinya`,
//       timestamp: new Date().toISOString(),
//       participantName,
//     }

//     setActivities((prev) => [newActivity, ...prev].slice(0, 10)) // Keep only last 10 activities
//   }

//   const handleVerify = async (id: number, action: "verify" | "reject") => {
//     try {
//       await updateParticipantStatus(id, action)

//       setParticipants((prev) =>
//         prev.map((p) =>
//           p.id === id
//             ? {
//                 ...p,
//                 status: action === "verify" ? "verified" : "rejected",
//                 verified_at: new Date().toISOString(),
//               }
//             : p,
//         ),
//       )

//       const participant = participants.find((p) => p.id === id)
//       if (participant) {
//         addActivity(action === "verify" ? "verified" : "rejected", participant.name)
//       }
//     } catch (err) {
//       console.error("Gagal memperbarui status partisipan", err)
//     }
//   }

//   const filteredParticipants = participants.filter((participant) =>
//     participant.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const renderContent = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <Dashboard participants={participants} activities={activities} />
//       case "participants":
//         return (
//           <ParticipantList
//             participants={filteredParticipants}
//             onVerify={handleVerify}
//             searchQuery={searchQuery}
//           />
//         )
//       default:
//         return <Dashboard participants={participants} activities={activities} />
//     }
//   }

//   const showSearch = activePage === "participants"

//   return (
//     <div className="app">
//       <Sidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//         collapsed={sidebarCollapsed}
//         setCollapsed={setSidebarCollapsed}
//       />
//       <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
//         <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={showSearch} />
//         <div className="content">{renderContent()}</div>
//       </div>
//     </div>
//   )
// }

// export default App





//yang work
// "use client"

// import { useState } from "react"
// import Sidebar from "./components/Sidebar"
// import Header from "./components/Header"
// import Dashboard from "./components/Dashboard"
// import ParticipantList from "./components/ParticipantList"
// import { dummyParticipants, type Participant } from "./data/participants"
// import "./App.css"

// type ActivePage = "dashboard" | "participants"

// export interface Activity {
//   id: string
//   type: "verified" | "rejected" | "contacted"
//   message: string
//   timestamp: string
//   participantName: string
// }

// function App() {
//   const [activePage, setActivePage] = useState<ActivePage>("dashboard")
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
//   const [participants, setParticipants] = useState<Participant[]>(dummyParticipants)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activities, setActivities] = useState<Activity[]>([
//     // Initial activities based on existing data
//     {
//       id: "init-1",
//       type: "verified",
//       message: "Siti Nurhaliza has been verified",
//       timestamp: "2024-01-08T11:20:00Z",
//       participantName: "Siti Nurhaliza",
//     },
//     {
//       id: "init-2",
//       type: "verified",
//       message: "Dedi Kurniawan has been verified",
//       timestamp: "2024-01-08T10:45:00Z",
//       participantName: "Dedi Kurniawan",
//     },
//     {
//       id: "init-3",
//       type: "rejected",
//       message: "Budi Santoso verification was rejected",
//       timestamp: "2024-01-08T10:30:00Z",
//       participantName: "Budi Santoso",
//     },
//   ])

//   // Filter participants based on search query
//   const filteredParticipants = participants.filter((participant) =>
//     participant.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const addActivity = (type: "verified" | "rejected", participantName: string) => {
//     const newActivity: Activity = {
//       id: `${Date.now()}-${Math.random()}`,
//       type,
//       message:
//         type === "verified" ? `${participantName} has been verified` : `${participantName} verification was rejected`,
//       timestamp: new Date().toISOString(),
//       participantName,
//     }

//     setActivities((prev) => [newActivity, ...prev].slice(0, 10)) // Keep only last 10 activities
//   }

//   const handleVerify = (id: number, action: "verify" | "reject") => {
//     const participant = participants.find((p) => p.idTable === id)
//     if (!participant) return

//     setParticipants((prev) =>
//       prev.map((p) =>
//         p.idTable === id
//           ? {
//               ...p,
//               status: action === "verify" ? "verified" : "rejected",
//               verified_at: new Date().toISOString(), // Set date for both verify and reject
//             }
//           : p,
//       ),
//     )

//     // Add activity to history
//     addActivity(action === "verify" ? "verified" : "rejected", participant.name)
//   }

//   const renderContent = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <Dashboard participants={participants} activities={activities} />
//       case "participants":
//         return <ParticipantList participants={filteredParticipants} onVerify={handleVerify} searchQuery={searchQuery} />
//       default:
//         return <Dashboard participants={participants} activities={activities} />
//     }
//   }

//   // Determine if search should be shown based on active page
//   const showSearch = activePage === "participants"

//   return (
//     <div className="app">
//       <Sidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//         collapsed={sidebarCollapsed}
//         setCollapsed={setSidebarCollapsed}
//       />
//       <div className={`main-content ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
//         <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={showSearch} />
//         <div className="content">{renderContent()}</div>
//       </div>
//     </div>
//   )
// }

// export default App
