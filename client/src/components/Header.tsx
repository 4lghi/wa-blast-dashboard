"use client"

import { Search, Bell } from "lucide-react"

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  showSearch?: boolean
}

const Header = ({ searchQuery, setSearchQuery, showSearch = true }: HeaderProps) => {
  return (
    <header className="header">
      {showSearch && (
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Cari nama peserta..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="header-actions">
        <button className="header-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
      </div>
    </header>
  )
}

export default Header
