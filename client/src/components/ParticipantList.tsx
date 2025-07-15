"use client";

import { CheckCircle, XCircle, Clock } from "lucide-react";
import type { Participant } from "../types/participant";

interface ParticipantListProps {
  participants: Participant[];
  onVerify: (id: string, action: "verify" | "reject") => void;
  searchQuery: string;
}

const ParticipantList = ({
  participants,
  onVerify,
  searchQuery,
}: ParticipantListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="status-icon verified" size={16} />;
      case "rejected":
        return <XCircle className="status-icon rejected" size={16} />;
      case "pending":
        return <Clock className="status-icon pending" size={16} />;
      default:
        return null;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Terverifikasi";
      case "rejected":
        return "Ditolak";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const getSubscriptionText = (status: string) => {
    switch (status) {
      case "subscribe":
        return "Berlangganan";
      case "unsubscribe":
        return "Tidak Berlangganan";
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      case "invalid":
        return "Invalid";
      default:
        return status;
    }
  };

  // Separate participants into pending and completed
  const pendingParticipants = participants.filter(
    (p) => p.status === "pending"
  );
  const completedParticipants = participants.filter(
    (p) => p.status !== "pending"
  );

  const renderTable = (
    participantList: Participant[],
    showActions: boolean,
    startIndex = 0
  ) => (
    <div className="participants-table">
      <div className="table-header">
        <div className="header-cell">No</div>
        <div className="header-cell">Peserta</div>
        <div className="header-cell">Kontak</div>
        <div className="header-cell">Status Langganan</div>
        <div className="header-cell">Status Verifikasi</div>
        {showActions && <div className="header-cell">Aksi</div>}
        <div className="header-cell">Tanggal Verifikasi</div>
      </div>

      {participantList.map((participant, index) => (
        <div key={participant.id} className="table-row">
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

          {/* Kontak Column - No phone icon */}
          <div className="cell contact-cell">
            <div className="phone-number">
              <span>{participant.no_hp}</span>
            </div>
          </div>

          {/* Status Langganan Column */}
          <div className="cell subscription-cell">
            <div className="subscription-badge">
              <span
                className={`subscription-text ${participant.status_langganan}`}
              >
                {getSubscriptionText(participant.status_langganan)}
              </span>
            </div>
          </div>

          {/* Status Verifikasi Column */}
          <div className="cell status-cell">
            <div className="status-container">
              {getStatusIcon(participant.status)}
              <span className={`status-text ${participant.status}`}>
                {getStatusText(participant.status)}
              </span>
            </div>
          </div>

          {/* Aksi Column - Only show for pending */}
          {showActions && (
            <div className="cell action-cell">
              {/* Tampilkan tombol hanya jika belum diverifikasi / ditolak */}
              {!participant.verifiedAt && (
                <div className="action-buttons">
                  <button
                    className="btn-verify"
                    onClick={() => onVerify(participant.id, "verify")}
                  >
                    Verifikasi
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => onVerify(participant.id, "reject")}
                  >
                    Tolak
                  </button>
                </div>
              )}

              {/* Jika sudah diverifikasi / ditolak, tampilkan status */}
              {participant.verifiedAt && (
                <div className="status-completed">
                  <span className="completed-text">Selesai</span>
                </div>
              )}
            </div>
          )}

          {/* Tanggal Verifikasi Column */}
          <div className="cell date-cell">
            {participant.status === "verified" && participant.verifiedAt ? (
              <div className="verification-date">
                <div className="date-label">Diverifikasi:</div>
                <div className="date-value">
                  {formatDateTime(participant.verifiedAt)}
                </div>
              </div>
            ) : participant.status === "rejected" && participant.verifiedAt ? (
              <div className="rejection-date">
                <div className="date-label">Ditolak:</div>
                <div className="date-value rejected">
                  {formatDateTime(participant.verifiedAt)}
                </div>
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
  );

  const renderMobileCards = (
    participantList: Participant[],
    showActions: boolean,
    startIndex = 0
  ) => (
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
            <div className="mobile-participant-number">
              #{startIndex + index + 1}
            </div>
          </div>

          <div className="mobile-card-content">
            <div className="mobile-field">
              <div className="mobile-field-label">Status Langganan</div>
              <div className="mobile-field-value">
                <span
                  className={`subscription-text ${participant.status_langganan}`}
                >
                  {getSubscriptionText(participant.status_langganan)}
                </span>
              </div>
            </div>

            <div className="mobile-field">
              <div className="mobile-field-label">Status Verifikasi</div>
              <div className="mobile-field-value">
                <div className="status-container">
                  {getStatusIcon(participant.status)}
                  <span className={`status-text ${participant.status}`}>
                    {getStatusText(participant.status)}
                  </span>
                </div>
              </div>
            </div>

            {(participant.status === "verified" ||
              participant.status === "rejected") &&
              participant.verifiedAt && (
                
                <div className="mobile-field" style={{ gridColumn: "1 / -1" }}>
                  <div className="mobile-field-label">
                    {participant.status === "verified"
                      ? "Tanggal Verifikasi"
                      : "Tanggal Penolakan"}
                  </div>
                  <div className="mobile-field-value">
                    <span
                      className={
                        participant.status === "rejected" ? "rejected" : ""
                      }
                    >
                      {formatDateTime(participant.verifiedAt)}
                    </span>
                  </div>
                </div>
              )}
          </div>

          {showActions && participant.status === "pending" && (
            <div className="mobile-card-actions">
              <button
                className="btn-verify"
                onClick={() => onVerify(participant.id, "verify")}
              >
                Verifikasi
              </button>
              <button
                className="btn-reject"
                onClick={() => onVerify(participant.id, "reject")}
              >
                Tolak
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );

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
          <p>
            {searchQuery
              ? `Tidak ada peserta dengan nama "${searchQuery}"`
              : "Belum ada data peserta"}
          </p>
        </div>
      ) : (
        <>
          {/* Pending Participants Section */}
          {pendingParticipants.length > 0 && (
            <div className="table-section">
              <div className="section-title">
                <h2>Perlu Tindakan ({pendingParticipants.length})</h2>
                <p>Peserta yang memerlukan verifikasi</p>
              </div>

              {/* Desktop Table */}
              <div className="desktop-table">
                {renderTable(pendingParticipants, true, 0)}
              </div>

              {/* Mobile Cards */}
              <div className="mobile-cards">
                {renderMobileCards(pendingParticipants, true, 0)}
              </div>
            </div>
          )}

          {/* Completed Participants Section */}
          {completedParticipants.length > 0 && (
            <div className="table-section">
              <div className="section-title">
                <h2>Sudah Selesai ({completedParticipants.length})</h2>
                <p>Peserta yang sudah diverifikasi atau ditolak</p>
              </div>

              {/* Desktop Table */}
              <div className="desktop-table">
                {renderTable(completedParticipants, false, 0)}{" "}
                {/* Changed startIndex to 0 */}
              </div>

              {/* Mobile Cards */}
              <div className="mobile-cards">
                {renderMobileCards(completedParticipants, false, 0)}{" "}
                {/* Changed startIndex to 0 */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ParticipantList;
