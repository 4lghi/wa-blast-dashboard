import { Clock, CheckCircle, XCircle, Phone } from "lucide-react"
import type { Activity } from "../App"

interface RecentActivityProps {
  activities: Activity[]
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) {
      return "Baru saja"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} jam yang lalu`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} hari yang lalu`
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "verified":
        return CheckCircle
      case "rejected":
        return XCircle
      case "contacted":
        return Phone
      default:
        return Clock
    }
  }

  const getIconClass = (type: string) => {
    switch (type) {
      case "verified":
        return "verified"
      case "rejected":
        return "rejected"
      case "contacted":
        return "contacted"
      default:
        return "pending"
    }
  }

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Aktivitas Terbaru</h3>
        <span className="activity-count-badge">{activities.length}</span>
      </div>

      <div className="activity-list-container">
        <div className="activity-list scrollable">
          {activities.length === 0 ? (
            <div className="no-activity">
              <p>Belum ada aktivitas</p>
            </div>
          ) : (
            activities.map((activity) => {
              const Icon = getIcon(activity.type)
              return (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${getIconClass(activity.type)}`}>
                    <Icon size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-message">{activity.message}</div>
                    <div className="activity-time">{formatTimeAgo(activity.timestamp)}</div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {activities.length > 0 && (
          <div className="activity-scroll-indicator">
            <div className="scroll-hint">
              <span>Scroll untuk melihat lebih banyak</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentActivity
