import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface VerificationData {
  name: string
  value: number
  color: string
}

interface VerificationPieChartProps {
  data: VerificationData[]
  total: number
  compact?: boolean
}

const VerificationPieChart = ({ data, total, compact = false }: VerificationPieChartProps) => {
  // Filter out data with 0 values
  const filteredData = data.filter((item) => item.value > 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const percentage = total > 0 ? Math.round((data.value / total) * 100) : 0
      return (
        <div className="pie-tooltip">
          <p className="tooltip-label">{data.name}</p>
          <p className="tooltip-value">
            {data.value} peserta ({percentage}%)
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }: any) => {
    if (!payload || !Array.isArray(payload)) {
      return null
    }

    return (
      <div className={`pie-legend ${compact ? "compact" : ""}`}>
        {payload.map((entry: any, index: number) => {
          const percentage = total > 0 ? Math.round((entry.payload.value / total) * 100) : 0
          return (
            <div key={index} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: entry.color }} />
              <span className="legend-text">
                {entry.value}: {entry.payload.value} ({percentage}%)
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  if (total === 0) {
    return (
      <div className={`pie-chart-container ${compact ? "compact" : ""}`}>
        <div className="empty-chart">
          <p>Belum ada data untuk ditampilkan</p>
        </div>
      </div>
    )
  }

  const chartHeight = compact ? 180 : 280

  return (
    <div className={`pie-chart-container ${compact ? "compact" : ""}`}>
      <div className="pie-chart-wrapper">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={compact ? 40 : 60}
              outerRadius={compact ? 70 : 100}
              paddingAngle={2}
              dataKey="value"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {compact && (
        <div className="compact-chart-summary">
          <div className="compact-summary-item">
            <span className="compact-summary-label">Total:</span>
            <span className="compact-summary-value">{total}</span>
          </div>
          <div className="compact-summary-item">
            <span className="compact-summary-label">Verifikasi:</span>
            <span className="compact-summary-value">
              {total > 0 ? Math.round(((data.find((d) => d.name === "Terverifikasi")?.value || 0) / total) * 100) : 0}%
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationPieChart
