"use client"

import { Users, BarChart3, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

interface SidebarProps {
  activePage: string
  setActivePage: (page: "dashboard" | "participants") => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const Sidebar = ({ activePage, setActivePage, collapsed, setCollapsed }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Auto-collapse sidebar on tablet
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setCollapsed(true)
      }

      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [setCollapsed])

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "participants", label: "Participants", icon: Users },
  ]

  const handleToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setCollapsed(!collapsed)
    }
  }

  const handleMenuClick = (pageId: string) => {
    setActivePage(pageId as any)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && mobileOpen) {
        const sidebar = document.querySelector(".sidebar")
        const menuButton = document.querySelector(".mobile-menu-button")

        if (
          sidebar &&
          menuButton &&
          !sidebar.contains(event.target as Node) &&
          !menuButton.contains(event.target as Node)
        ) {
          setMobileOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, mobileOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button className="mobile-menu-button" onClick={handleToggle} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      <div className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          {!isMobile && (
            <button className="collapse-btn" onClick={handleToggle} aria-label="Toggle sidebar">
              <Menu size={20} />
            </button>
          )}
          {(!collapsed || isMobile) && (
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
                onClick={() => handleMenuClick(item.id)}
                title={collapsed && !isMobile ? item.label : ""}
                aria-label={item.label}
              >
                <Icon size={20} />
                {(!collapsed || isMobile) && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
