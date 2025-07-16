"use client"

import { CheckCircle, XCircle, Clock, Users, AlertCircle, History, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import type { Participant } from "../types/participant"
import { useState } from "react"

interface ParticipantListProps {
  participants: Participant[]
  onVerify: (id: string, action: "verify" | "reject") => void
  searchQuery: string
}

const ParticipantList = ({ participants, onVerify, searchQuery }: ParticipantListProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

  const sortParticipantsByDate = (participantList: Participant[], order: "asc" | "desc" | null) => {
    // Default sort by updatedAt descending if no specific sort order is active
    if (!order) {
      return [...participantList].sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime()
        const dateB = new Date(b.updatedAt).getTime()
        return dateB - dateA // Descending by updatedAt
      })
    }

    return [...participantList].sort((a, b) => {
      const dateA = a.verifiedAt ? new Date(a.verifiedAt).getTime() : null
      const dateB = b.verifiedAt ? new Date(b.verifiedAt).getTime() : null

      // Handle nulls: nulls always go to the end
      if (dateA === null && dateB === null) return 0
      if (dateA === null) return 1 // a is null, b is not, a goes after b
      if (dateB === null) return -1 // b is null, a is not, b goes after a

      // Compare actual dates
      if (order === "asc") {
        return dateA - dateB
      } else {
        // order === "desc"
        return dateB - dateA
      }
    })
  }

  const handleSortToggle = () => {
    if (sortOrder === null) {
      setSortOrder("desc") // Terbaru dulu
    } else if (sortOrder === "desc") {
      setSortOrder("asc") // Terlama dulu
    } else {
      setSortOrder(null) // Reset ke urutan default (berdasarkan updatedAt)
    }
  }

  const getSortIcon = () => {
    if (sortOrder === "desc") return <ArrowDown size={14} />
    if (sortOrder === "asc") return <ArrowUp size={14} />
    return <ArrowUpDown size={14} />
  }

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
        return status
    }
  }

  // Separate participants into pending and completed
  const pendingParticipants = participants.filter((p) => p.status === "pending")
  const completedParticipantsUnsorted = participants.filter((p) => p.status !== "pending")
  const completedParticipants = sortParticipantsByDate(completedParticipantsUnsorted, sortOrder)
  const verifiedCount = completedParticipants.filter((p) => p.status === "verified").length
  const rejectedCount = completedParticipants.filter((p) => p.status === "rejected").length

  // Render table for pending participants (without date column)
  const renderPendingTable = (participantList: Participant[], startIndex = 0) => (
    <div className="participants-table pending-table">
      <div className="table-header pending-header">
        <div className="header-cell">No</div>
        <div className="header-cell">Peserta</div>
        <div className="header-cell">Kontak</div>
        <div className="header-cell">Status Langganan</div>
        <div className="header-cell">Status Verifikasi</div>
        <div className="header-cell">Nama Pengirim</div>
        <div className="header-cell">Aksi</div>
      </div>

      {participantList.map((participant, index) => (
        <div key={participant.id} className="table-row pending-row">
          {/* Nomor Column */}
          <div className="cell number-cell">
            <div className="participant-number">{startIndex + index + 1}</div>
          </div>

          {/* Peserta Column */}
          <div className="cell participant-cell">
            <div className="participant-info">
              <div className="participant-name">{participant.nama}</div>
            </div>
          </div>

          {/* Kontak Column */}
          <div className="cell contact-cell">
            <div className="phone-number">
              <span>{participant.no_hp}</span>
            </div>
          </div>

          {/* Status Langganan Column */}
          <div className="cell subscription-cell">
            <div className="subscription-badge">
              <span className={`subscription-text ${participant.status_langganan}`}>
                {getSubscriptionText(participant.status_langganan)}
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

          {/* Nama Pengirim Column */}
          <div className="cell sender-cell">
            <div className="sender-info">
              <span className="sender-name">{participant.user?.name || "-"}</span>
            </div>
          </div>

          {/* Aksi Column */}
          <div className="cell action-cell">
            <div className="action-buttons">
              <button className="btn-verify" onClick={() => onVerify(participant.id, "verify")}>
                Verifikasi
              </button>
              <button className="btn-reject" onClick={() => onVerify(participant.id, "reject")}>
                Tolak
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // Render table for completed participants (with date column)
  const renderCompletedTable = (participantList: Participant[], startIndex = 0) => (
    <div className="participants-table completed-table">
      <div className="table-header completed-header">
        <div className="header-cell">No</div>
        <div className="header-cell">Peserta</div>
        <div className="header-cell">Kontak</div>
        <div className="header-cell">Status Langganan</div>
        <div className="header-cell">Status Verifikasi</div>
        <div className="header-cell">Nama Pengirim</div>
        <div className="header-cell sortable-header" onClick={handleSortToggle}>
          <span>Tanggal Verifikasi</span>
          {getSortIcon()}
        </div>
      </div>

      {participantList.map((participant, index) => (
        <div key={participant.id} className="table-row completed-row">
          {/* Nomor Column */}
          <div className="cell number-cell">
            <div className="participant-number">{startIndex + index + 1}</div>
          </div>

          {/* Peserta Column */}
          <div className="cell participant-cell">
            <div className="participant-info">
              <div className="participant-name">{participant.nama}</div>
            </div>
          </div>

          {/* Kontak Column */}
          <div className="cell contact-cell">
            <div className="phone-number">
              <span>{participant.no_hp}</span>
            </div>
          </div>

          {/* Status Langganan Column */}
          <div className="cell subscription-cell">
            <div className="subscription-badge">
              <span className={`subscription-text ${participant.status_langganan}`}>
                {getSubscriptionText(participant.status_langganan)}
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

          {/* Nama Pengirim Column */}
          <div className="cell sender-cell">
            <div className="sender-info">
              <span className="sender-name">{participant.user?.name || "-"}</span>
            </div>
          </div>

          {/* Tanggal Verifikasi Column */}
          <div className="cell date-cell">
            {participant.status === "verified" && participant.verifiedAt ? (
              <div className="verification-date">
                <div className="date-label">Diverifikasi:</div>
                <div className="date-value">{formatDateTime(participant.verifiedAt)}</div>
              </div>
            ) : participant.status === "rejected" && participant.verifiedAt ? (
              <div className="rejection-date">
                <div className="date-label">Ditolak:</div>
                <div className="date-value">{formatDateTime(participant.verifiedAt)}</div>
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
  )

  const renderMobileCards = (participantList: Participant[], showActions: boolean, startIndex = 0) => (
    <>
      {participantList.map((participant, index) => (
        <div key={`mobile-${participant.id}`} className="mobile-card">
          <div className="mobile-card-header">
            <div className="mobile-participant-info">
              <div className="mobile-participant-name">{participant.nama}</div>
              <div className="mobile-phone">
                <span>{participant.no_hp}</span>
              </div>
            </div>
            <div className="mobile-participant-number">#{startIndex + index + 1}</div>
          </div>

          <div className="mobile-card-content">
            <div className="mobile-field">
              <div className="mobile-field-label">Status Langganan</div>
              <div className="mobile-field-value">
                <span className={`subscription-text ${participant.status_langganan}`}>
                  {getSubscriptionText(participant.status_langganan)}
                </span>
              </div>
            </div>

            <div className="mobile-field">
              <div className="mobile-field-label">Status Verifikasi</div>
              <div className="mobile-field-value">
                <div className="status-container">
                  {getStatusIcon(participant.status)}
                  <span className={`status-text ${participant.status}`}>{getStatusText(participant.status)}</span>
                </div>
              </div>
            </div>

            <div className="mobile-field">
              <div className="mobile-field-label">Nama Pengirim</div>
              <div className="mobile-field-value">
                <span className="sender-name">{participant.user?.name || "-"}</span>
              </div>
            </div>

            {/* Only show date field for completed participants */}
            {!showActions &&
              (participant.status === "verified" || participant.status === "rejected") &&
              participant.verifiedAt && (
                <div className="mobile-field" style={{ gridColumn: "1 / -1" }}>
                  <div className="mobile-field-label">
                    {participant.status === "verified" ? "Tanggal Verifikasi" : "Tanggal Penolakan"}
                  </div>
                  <div className="mobile-field-value">
                    <span className={participant.status === "rejected" ? "rejected" : ""}>
                      {formatDateTime(participant.verifiedAt)}
                    </span>
                  </div>
                </div>
              )}
          </div>

          {showActions && participant.status === "pending" && (
            <div className="mobile-card-actions">
              <button className="btn-verify" onClick={() => onVerify(participant.id, "verify")}>
                Verifikasi
              </button>
              <button className="btn-reject" onClick={() => onVerify(participant.id, "reject")}>
                Tolak
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  )

  return (
    <div className="participant-list">
      {/* Stylish Header */}
      <div className="stylish-header">
        <div className="header-content">
          <div className="header-icon">
            <Users size={32} />
          </div>
          <div className="header-text">
            <h1>Manajemen Peserta</h1>
            <div className="header-stats">
              <span className="total-badge">{participants.length} Total</span>
              {searchQuery && <span className="search-badge">Pencarian: "{searchQuery}"</span>}
            </div>
          </div>
        </div>
      </div>

      {participants.length === 0 ? (
        <div className="empty-state">
          <Users size={48} className="empty-icon" />
          <p>{searchQuery ? `Tidak ditemukan "${searchQuery}"` : "Belum ada peserta terdaftar"}</p>
        </div>
      ) : (
        <>
          {/* Pending Participants Section */}
          {pendingParticipants.length > 0 && (
            <div className="table-section">
              <div className="stylish-section-title pending">
                <div className="section-icon">
                  <AlertCircle size={24} />
                </div>
                <div className="section-info">
                  <h2>Menunggu Verifikasi</h2>
                  <div className="section-badges">
                    <span className="count-badge pending">{pendingParticipants.length}</span>
                    <span className="action-badge">Perlu Tindakan</span>
                  </div>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="desktop-table">{renderPendingTable(pendingParticipants, 0)}</div>

              {/* Mobile Cards */}
              <div className="mobile-cards">{renderMobileCards(pendingParticipants, true, 0)}</div>
            </div>
          )}

          {/* Completed Participants Section */}
          {completedParticipants.length > 0 && (
            <div className="table-section">
              <div className="stylish-section-title completed">
                <div className="section-icon">
                  <History size={24} />
                </div>
                <div className="section-info">
                  <h2>Riwayat Verifikasi</h2>
                  <div className="section-badges">
                    <span className="count-badge completed">{completedParticipants.length}</span>
                    <span className="verified-badge">{verifiedCount} Terverifikasi</span>
                    <span className="rejected-badge">{rejectedCount} Ditolak</span>
                  </div>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="desktop-table">{renderCompletedTable(completedParticipants, 0)}</div>

              {/* Mobile Cards */}
              <div className="mobile-cards">{renderMobileCards(completedParticipants, false, 0)}</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ParticipantList
