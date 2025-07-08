import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: LucideIcon
  color: string
}

const StatsCard = ({ title, value, change, changeType, icon: Icon, color }: StatsCardProps) => {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-icon">
        <Icon size={24} />
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <div className="stats-value">{value}</div>
        <div className={`stats-change ${changeType}`}>{change} from last month</div>
      </div>
    </div>
  )
}

export default StatsCard
