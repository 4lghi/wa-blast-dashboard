import { CheckCircle, Clock } from "lucide-react"
import VerificationPieChart from "./VerificationPieChart"
import SubscriptionPieChart from "./SubscriptionPieChart"
import RecentActivity from "./RecentActivity"
import type { Participant } from "../types/participant"
import type { Activity } from "../App"

interface DashboardProps {
  participants: Participant[]
  activities: Activity[]
}

const Dashboard = ({ participants, activities }: DashboardProps) => {
  // Calculate real-time statistics
  const total = participants.length
  const verified = participants.filter((p) => p.status === "verified").length
  const pending = participants.filter((p) => p.status === "pending").length
  const rejected = participants.filter((p) => p.status === "rejected").length
  const subscribed = participants.filter(
    (p) => p.status_langganan === "active" || p.status_langganan === "subscribe",
  ).length
  const unsubscribed = participants.filter((p) => p.status_langganan === "unsubscribe").length
  const inactive = participants.filter((p) => p.status_langganan === "inactive").length

  // Calculate percentage changes
  const verificationRate = total > 0 ? Math.round((verified / total) * 100) : 0
  const pendingRate = total > 0 ? Math.round((pending / total) * 100) : 0
  const completionRate = total > 0 ? Math.round(((verified + rejected) / total) * 100) : 0

  // Prepare data for pie charts
  const verificationData = [
    { name: "Terverifikasi", value: verified, color: "#10b981" },
    { name: "Pending", value: pending, color: "#f59e0b" },
    { name: "Ditolak", value: rejected, color: "#ef4444" },
  ]

  const subscriptionData = [
    { name: "Berlangganan", value: subscribed, color: "#10b981" },
    { name: "Tidak Berlangganan", value: unsubscribed, color: "#ef4444" },
    { name: "Tidak Aktif", value: inactive, color: "#6b7280" },
  ]

  return (
    <div className="modern-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor status verifikasi peserta dan aktivitas</p>
      </div>

      {/* Top Row - Progress Verifikasi (Full Width) */}
      <div className="top-widget-row">
        {/* Enhanced Verification Progress */}
        <div className="widget verification-widget enhanced">
          <div className="widget-header">
            <h3>Progress Verifikasi</h3>
            <span className="widget-subtitle">OVERVIEW REAL-TIME</span>
          </div>
          <div className="verification-content">
            <div className="circular-progress-enhanced">
              <div className="progress-circle-large">
                <div className="progress-inner-large">
                  <div className="progress-percentage">{completionRate}%</div>
                  <div className="progress-label">Selesai</div>
                </div>
                <svg className="progress-ring" width="160" height="160">
                  <circle
                    className="progress-ring-background"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="progress-ring-progress"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                    strokeDasharray={`${(completionRate / 100) * 439.82} 439.82`}
                    transform="rotate(-90 80 80)"
                  />
                </svg>
              </div>
            </div>
            <div className="verification-stats">
              <div className="stat-row">
                <div className="stat-item verified">
                  <div className="stat-icon">
                    <CheckCircle size={24} />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{verified}</span>
                    <span className="stat-label">Terverifikasi</span>
                    <span className="stat-percentage">{verificationRate}%</span>
                  </div>
                </div>
                <div className="stat-item pending">
                  <div className="stat-icon">
                    <Clock size={24} />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{pending}</span>
                    <span className="stat-label">Pending</span>
                    <span className="stat-percentage">{pendingRate}%</span>
                  </div>
                </div>
              </div>
              <div className="verification-summary">
                <div className="summary-item">
                  <span className="summary-label">Total Peserta:</span>
                  <span className="summary-value">{total}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Perlu Review:</span>
                  <span className="summary-value">{pending}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Ditolak:</span>
                  <span className="summary-value rejected">{rejected}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Row - Status Overview and Charts */}
      <div className="main-row">
        {/* Status Overview */}
        <div className="section status-overview">
          <div className="section-header">
            <h3>Status Overview</h3>
            <span className="status-total">{total} Total</span>
          </div>
          <div className="status-list">
            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Terverifikasi</span>
                <span className="status-amount">{verified} Peserta</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-progress verified"
                  style={{ width: `${total > 0 ? (verified / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Pending</span>
                <span className="status-amount">{pending} Peserta</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-progress pending"
                  style={{ width: `${total > 0 ? (pending / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Ditolak</span>
                <span className="status-amount">{rejected} Peserta</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-progress rejected"
                  style={{ width: `${total > 0 ? (rejected / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Berlangganan</span>
                <span className="status-amount">{subscribed} Peserta</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-progress subscribed"
                  style={{ width: `${total > 0 ? (subscribed / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Pie Chart */}
        <div className="section chart-section">
          <div className="section-header">
            <h3>Status Verifikasi</h3>
            <span className="chart-total">{total}</span>
          </div>
          <VerificationPieChart data={verificationData} total={total} compact={false} />
        </div>
      </div>

      {/* Subscription Row */}
      <div className="subscription-row">
        {/* Status Berlangganan */}
        <div className="section subscription-overview">
          <div className="section-header">
            <h3>Status Berlangganan</h3>
            <span className="status-total">{total} Total</span>
          </div>
          <div className="status-list">
            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Berlangganan</span>
                <span className="status-amount">{subscribed} Peserta</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-progress subscribed"
                  style={{ width: `${total > 0 ? (subscribed / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Tidak Berlangganan</span>
                <span className="status-amount">{unsubscribed} Peserta</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-progress unsubscribed"
                  style={{ width: `${total > 0 ? (unsubscribed / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Tidak Aktif</span>
                <span className="status-amount">{inactive} Peserta</span>
              </div>
              <div className="status-bar">
                <div
                  className="status-progress inactive"
                  style={{ width: `${total > 0 ? (inactive / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Pie Chart */}
        <div className="section chart-section">
          <div className="section-header">
            <h3>Status Langganan</h3>
            <span className="chart-total">{total}</span>
          </div>
          <SubscriptionPieChart data={subscriptionData} total={total} compact={false} />
        </div>

        {/* Recent Activity - Moved here */}
        <div className="section activity-section">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
