import { CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react"
import VerificationPieChart from "./VerificationPieChart"
import SubscriptionPieChart from "./SubscriptionPieChart"
import RecentActivity from "./RecentActivity"
import type { Participant } from "../data/participants"
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
  const subscribed = participants.filter((p) => p.subscription === "active" || p.subscription === "subscribe").length
  const unsubscribed = participants.filter((p) => p.subscription === "unsubscribe").length
  const inactive = participants.filter((p) => p.subscription === "inactive").length

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

      {/* Top Row - Progress Verifikasi */}
      <div className="top-widgets-row">
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
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring-background"
                    stroke="#f1f5f9"
                    strokeWidth="8"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                  />
                  <circle
                    className="progress-ring-progress"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    strokeDasharray={`${(completionRate / 100) * 326.73} 326.73`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
              </div>
            </div>
            <div className="verification-stats">
              <div className="stat-row">
                <div className="stat-item verified">
                  <div className="stat-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{verified}</span>
                    <span className="stat-label">Terverifikasi</span>
                    <span className="stat-percentage">{verificationRate}%</span>
                  </div>
                </div>
                <div className="stat-item pending">
                  <div className="stat-icon">
                    <Clock size={20} />
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

        {/* Activity Chart */}
        <div className="widget activity-widget">
          <div className="widget-header">
            <h3>Tren Verifikasi</h3>
            <span className="activity-percentage">{verificationRate}%</span>
          </div>
          <div className="activity-chart">
            <div className="chart-bars">
              {[
                Math.max(20, (verified / total) * 100),
                Math.max(20, (pending / total) * 100),
                Math.max(20, (rejected / total) * 100),
                Math.max(20, verificationRate),
                Math.max(20, 100 - verificationRate),
                Math.max(20, (pending / total) * 100),
                Math.max(20, (subscribed / total) * 100),
              ].map((height, index) => (
                <div key={index} className="chart-bar" style={{ height: `${Math.min(height, 100)}%` }} />
              ))}
            </div>
            <div className="chart-labels">
              <span>VER</span>
              <span>PEN</span>
              <span>REJ</span>
              <span>TOT</span>
              <span>REM</span>
              <span>REV</span>
              <span>SUB</span>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot verified"></div>
              <span>Verified</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot pending"></div>
              <span>Pending</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot rejected"></div>
              <span>Rejected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row - Metrics Cards */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Total Peserta</span>
            <TrendingUp className="trend-icon positive" size={16} />
          </div>
          <div className="metric-value">{total}</div>
          <div className="metric-trend">
            <div className="trend-line positive">
              <svg viewBox="0 0 100 20" className="trend-svg">
                <polyline points="0,15 20,12 40,8 60,10 80,5 100,3" fill="none" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Total Verifikasi</span>
            <TrendingUp className="trend-icon positive" size={16} />
          </div>
          <div className="metric-value">{verified}</div>
          <div className="metric-trend">
            <div className="trend-line positive">
              <svg viewBox="0 0 100 20" className="trend-svg">
                <polyline points="0,8 20,6 40,4 60,7 80,2 100,1" fill="none" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Pending Review</span>
            <TrendingDown className="trend-icon negative" size={16} />
          </div>
          <div className="metric-value">{pending}</div>
          <div className="metric-trend">
            <div className="trend-line negative">
              <svg viewBox="0 0 100 20" className="trend-svg">
                <polyline points="0,5 20,8 40,12 60,10 80,15 100,17" fill="none" stroke="#ef4444" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Status Overview and Charts */}
      <div className="bottom-row">
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
                <div className="status-progress verified" style={{ width: `${(verified / total) * 100}%` }} />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Pending</span>
                <span className="status-amount">{pending} Peserta</span>
              </div>
              <div className="status-bar">
                <div className="status-progress pending" style={{ width: `${(pending / total) * 100}%` }} />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Ditolak</span>
                <span className="status-amount">{rejected} Peserta</span>
              </div>
              <div className="status-bar">
                <div className="status-progress rejected" style={{ width: `${(rejected / total) * 100}%` }} />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Berlangganan</span>
                <span className="status-amount">{subscribed} Peserta</span>
              </div>
              <div className="status-bar">
                <div className="status-progress subscribed" style={{ width: `${(subscribed / total) * 100}%` }} />
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

        {/* Recent Activity */}
        <div className="section activity-section">
          <RecentActivity activities={activities} />
        </div>
      </div>

      {/* New Row - Subscription Status */}
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
                <div className="status-progress subscribed" style={{ width: `${(subscribed / total) * 100}%` }} />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Tidak Berlangganan</span>
                <span className="status-amount">{unsubscribed} Peserta</span>
              </div>
              <div className="status-bar">
                <div className="status-progress unsubscribed" style={{ width: `${(unsubscribed / total) * 100}%` }} />
              </div>
            </div>

            <div className="status-item">
              <div className="status-info">
                <span className="status-label">Tidak Aktif</span>
                <span className="status-amount">{inactive} Peserta</span>
              </div>
              <div className="status-bar">
                <div className="status-progress inactive" style={{ width: `${(inactive / total) * 100}%` }} />
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
      </div>
    </div>
  )
}

export default Dashboard
