"use client"

import { CheckCircle, XCircle, Clock, Phone } from "lucide-react"
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
        return <CheckCircle className="status-icon verified" size={16} />
      case "rejected":
        return <XCircle className="status-icon rejected" size={16} />
      case "pending":
        return <Clock className="status-icon pending" size={16} />
      default:
        return null
    }
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Terverifikasi"
      case "rejected":
        return "Ditolak"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  const getSubscriptionText = (status: string) => {
    switch (status) {
      case "subscribe":
        return "Berlangganan"
      case "unsubscribe":
        return "Tidak Berlangganan"
      case "active":
        return "Aktif"
      case "inactive":
        return "Tidak Aktif"
      case "invalid":
        return "Invalid"
      default:
        return status // Show the actual status value for debugging
    }
  }

  return (
    <div className="participant-list">
      <div className="list-header">
        <h1>Semua Peserta</h1>
        <p>
          {searchQuery
            ? `Menampilkan ${participants.length} peserta untuk "${searchQuery}"`
            : `Kelola status verifikasi ${participants.length} peserta`}
        </p>
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
            <div className="header-cell">Status Langganan</div>
            <div className="header-cell">Status Verifikasi</div>
            <div className="header-cell">Aksi</div>
            <div className="header-cell">Tanggal Verifikasi</div>
          </div>

          {participants.map((participant) => (
            <div key={participant.id} className="table-row">
              {/* Peserta Column */}
              <div className="cell participant-cell">
                <div className="participant-name">{participant.name}</div>
              </div>

              {/* Kontak Column */}
              <div className="cell contact-cell">
                <div className="phone-number">
                  <Phone size={16} />
                  <span>{participant.phone}</span>
                </div>
              </div>

              {/* Status Langganan Column - Read only from database */}
              <div className="cell subscription-cell">
                <div className="subscription-badge">
                  <span className={`subscription-text ${participant.subscription}`}>
                    {getSubscriptionText(participant.subscription)}
                  </span>
                </div>
              </div>

              {/* Status Verifikasi Column */}
              <div className="cell status-cell">
                <div className="status-container">
                  {getStatusIcon(participant.status)}
                  <span className={`status-text ${participant.status}`}>{getStatusText(participant.status)}</span>
                </div>
              </div>

              {/* Aksi Column */}
              <div className="cell action-cell">
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
                {participant.status !== "pending" && (
                  <div className="status-completed">
                    <span className="completed-text">Selesai</span>
                  </div>
                )}
              </div>

              {/* Tanggal Verifikasi Column */}
              <div className="cell date-cell">
                {participant.status === "verified" && participant.verified_at ? (
                  <div className="verification-date">
                    <div className="date-label">Diverifikasi:</div>
                    <div className="date-value">{formatDateTime(participant.verified_at)}</div>
                  </div>
                ) : participant.status === "rejected" && participant.verified_at ? (
                  <div className="rejection-date">
                    <div className="date-label">Ditolak:</div>
                    <div className="date-value rejected">{formatDateTime(participant.verified_at)}</div>
                  </div>
                ) : (
                  <div className="pending-date">
                    <span className="pending-label">-</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ParticipantList
