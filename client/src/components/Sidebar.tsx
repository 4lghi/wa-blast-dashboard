"use client"

import { Users, BarChart3, Menu } from "lucide-react"

interface SidebarProps {
  activePage: string
  setActivePage: (page: "dashboard" | "participants") => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const Sidebar = ({ activePage, setActivePage, collapsed, setCollapsed }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "participants", label: "Participants", icon: Users },
  ]

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>
        {!collapsed && (
          <div className="logo">
            <div className="logo-icon">
              <img src="/logo_bpjsnaker.png" alt="BPJAMSOSTEK Logo" className="logo-image" />
            </div>
            <span>Dashboard BPJAMSOSTEK</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id as any)}
              title={collapsed ? item.label : ""}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
