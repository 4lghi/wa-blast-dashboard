"use client";

import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ParticipantList from "./components/ParticipantList";
import {
  getParticipants,
  updateParticipantStatus,
} from "./services/participants";
import type { Participant } from "./types/participant";
import "./App.css";

type ActivePage = "dashboard" | "participants";

export interface Activity {
  id: string;
  type: "verified" | "rejected";
  message: string;
  timestamp: string;
  participantName: string;
}

function App() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);

  // 🔹 Ambil data awal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParticipants();
        setParticipants(data);
      } catch (err) {
        console.error("Gagal ambil peserta", err);
      }
    };

    fetchData();

    // 🔴 Inisialisasi SSE
    // 🔴 Ambil dari .env
    const baseURL = import.meta.env.VITE_URL_NETWORK || import.meta.env.VITE_URL_LOCAL;
    console.log("SSE baseURL:", baseURL);
    const eventSource = new EventSource(`${baseURL}/events`);

    eventSource.onmessage = (event) => {
      try {
        const { type, payload } = JSON.parse(event.data);

        if (type === "nasabah-updated") {
          setParticipants((prev) =>
            prev.map((p) => (p.id === payload.id ? payload : p))
          );
        }

        if (type === "nasabah-created") {
          setParticipants((prev) => [payload, ...prev]);
        }
      } catch (e) {
        console.error("SSE parsing error:", e);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // 🔹 Tambah aktivitas ke list
  const addActivity = (
    type: "verified" | "rejected",
    participantName: string
  ) => {
    const newActivity: Activity = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      message:
        type === "verified"
          ? `${participantName} telah diverifikasi`
          : `${participantName} ditolak verifikasinya`,
      timestamp: new Date().toISOString(),
      participantName,
    };

    setActivities((prev) => [newActivity, ...prev].slice(0, 10));
  };

  // 🔹 Saat klik verifikasi/tolak
  const handleVerify = async (id: string, action: "verify" | "reject") => {
    try {
      await updateParticipantStatus(id, action);

      const participant = participants.find((p) => p.id === id);
      if (participant) {
        addActivity(
          action === "verify" ? "verified" : "rejected",
          participant.nama
        );
      }

      // ❌ Jangan ubah participants manual — biar SSE yg update
    } catch (err) {
      console.error("Gagal update status", err);
    }
  };

  const filteredParticipants = participants.filter((participant) =>
    participant.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard participants={participants} activities={activities} />
        );
      case "participants":
        return (
          <ParticipantList
            participants={filteredParticipants}
            onVerify={handleVerify}
            searchQuery={searchQuery}
          />
        );
      default:
        return null;
    }
  };

  const showSearch = activePage === "participants";

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div
        className={`main-content ${
          sidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSearch={showSearch}
        />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
