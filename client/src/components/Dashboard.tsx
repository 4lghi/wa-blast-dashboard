import { Users, CheckCircle, Clock, AlertCircle } from "lucide-react"
import StatsCard from "./StatsCard"
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
  const subscribed = participants.filter((p) => p.subscription === "active").length
  const unsubscribed = participants.filter((p) => p.subscription === "inactive").length

  // Calculate percentage changes (mock calculation for demo)
  const verificationRate = total > 0 ? Math.round((verified / total) * 100) : 0
  const pendingRate = total > 0 ? Math.round((pending / total) * 100) : 0
  const subscriptionRate = total > 0 ? Math.round((subscribed / total) * 100) : 0

  const stats = [
    {
      title: "Total Peserta",
      value: total.toString(),
      change: `${verificationRate}% terverifikasi`,
      changeType: "positive" as const,
      icon: Users,
      color: "blue",
    },
    {
      title: "Terverifikasi",
      value: verified.toString(),
      change: `${verificationRate}% dari total`,
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Pending",
      value: pending.toString(),
      change: `${pendingRate}% menunggu`,
      changeType: (pending > 0 ? "negative" : "positive") as "positive" | "negative", // ✅ FIX di sini
      icon: Clock,
      color: "orange",
    },
    {
      title: "Ditolak",
      value: rejected.toString(),
      change: `${Math.round((rejected / total) * 100)}% ditolak`,
      changeType: "negative" as const,
      icon: AlertCircle,
      color: "red",
    },
    {
      title: "Berlangganan",
      value: subscribed.toString(),
      change: `${subscriptionRate}% aktif`,
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Tidak Berlangganan",
      value: unsubscribed.toString(),
      change: `${Math.round((unsubscribed / total) * 100)}% tidak aktif`,
      changeType: "negative" as const,
      icon: AlertCircle,
      color: "red",
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor status verifikasi peserta dan aktivitas</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="chart-card">
            <h3>Tren Verifikasi</h3>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {/* Generate bars based on actual data */}
                {[
                  Math.max(20, (verified / total) * 100),
                  Math.max(20, (pending / total) * 100),
                  Math.max(20, (rejected / total) * 100),
                  Math.max(20, verificationRate),
                  Math.max(20, 100 - verificationRate),
                  Math.max(20, pendingRate),
                  Math.max(20, subscriptionRate),
                ].map((height, index) => (
                  <div key={index} className="chart-bar" style={{ height: `${Math.min(height, 100)}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="activity-section">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
