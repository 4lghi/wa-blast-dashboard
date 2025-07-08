"use client"

import { CheckCircle, XCircle, Clock, Phone, User } from "lucide-react"
import type { Participant } from "../data/participants"

interface ParticipantListProps {
  participants: Participant[]
  onVerify: (id: number, action: "verify" | "reject") => void
  searchQuery: string
}

const ParticipantList = ({ participants, onVerify, searchQuery }: ParticipantListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="status-icon verified" size={20} />
      case "rejected":
        return <XCircle className="status-icon rejected" size={20} />
      case "pending":
        return <Clock className="status-icon pending" size={20} />
      default:
        return null
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate statistics for current view
  const totalShown = participants.length
  const pendingCount = participants.filter((p) => p.status === "pending").length
  const verifiedCount = participants.filter((p) => p.status === "verified").length
  const rejectedCount = participants.filter((p) => p.status === "rejected").length

  return (
    <div className="participant-list">
      <div className="list-header">
        <h1>Semua Peserta</h1>
        <p>
          {searchQuery
            ? `Menampilkan ${totalShown} peserta untuk "${searchQuery}"`
            : `Kelola status verifikasi ${totalShown} peserta`}
        </p>
        <div className="list-stats">
          <span className="stat-item verified">✓ {verifiedCount} Terverifikasi</span>
          <span className="stat-item pending">⏳ {pendingCount} Pending</span>
          <span className="stat-item rejected">✗ {rejectedCount} Ditolak</span>
        </div>
      </div>

      {participants.length === 0 ? (
        <div className="empty-state">
          <p>{searchQuery ? `Tidak ada peserta dengan nama "${searchQuery}"` : "Belum ada data peserta"}</p>
        </div>
      ) : (
        <div className="participants-table">
          <div className="table-header">
            <div className="header-cell">Peserta</div>
            <div className="header-cell">Kontak</div>
            <div className="header-cell">Respon Chatbot</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Aksi</div>
          </div>

          {participants.map((participant) => (
            <div key={participant.id} className="table-row">
              <div className="cell participant-info">
                <div className="participant-avatar">
                  <User size={20} />
                </div>
                <div>
                  <div className="participant-name">{participant.name}</div>
                  <div className="participant-id">ID: {participant.id}</div>
                </div>
              </div>

              <div className="cell contact-info">
                <div className="phone-number">
                  <Phone size={16} />
                  {participant.phone}
                </div>
                <div className="contacted-time">Dihubungi: {formatDateTime(participant.contacted_at)}</div>
              </div>

              <div className="cell response">
                <div className="response-text">{participant.chatbot_response}</div>
              </div>

              <div className="cell status">
                {getStatusIcon(participant.status)}
                <span className={`status-text ${participant.status}`}>
                  {participant.status === "verified"
                    ? "Terverifikasi"
                    : participant.status === "rejected"
                      ? "Ditolak"
                      : "Pending"}
                </span>
              </div>

              <div className="cell actions">
                {participant.status === "pending" && (
                  <div className="action-buttons">
                    <button className="btn-verify" onClick={() => onVerify(participant.id, "verify")}>
                      Verifikasi
                    </button>
                    <button className="btn-reject" onClick={() => onVerify(participant.id, "reject")}>
                      Tolak
                    </button>
                  </div>
                )}
                {participant.status === "verified" && participant.verified_at && (
                  <span className="verified-time">Diverifikasi: {formatDateTime(participant.verified_at)}</span>
                )}
                {participant.status === "rejected" && <span className="rejected-time">Ditolak</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ParticipantList
