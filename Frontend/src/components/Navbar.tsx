import { Link, useLocation } from 'react-router-dom'
import { ConnectWallet } from './ConnectWallet'

export function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Home' },
    { path: '/launch', label: 'Launch Pool' },
    { path: '/verify', label: 'Dashboard' },
    { path: '/monitor', label: 'Monitor' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand/[0.06]" style={{ background: 'rgba(3,11,6,0.92)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center shadow-neon-green group-hover:shadow-neon-green-lg transition-shadow duration-500">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M9 12l2 2 4-4" stroke="#030B06" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[15px] font-bold tracking-tight text-white">Proven Protocol</span>
        </Link>

        {/* Center Nav */}
        <div className="flex items-center gap-1">
          {links.map(({ path, label }) => {
            const isActive = location.pathname === path ||
              (path !== '/' && location.pathname.startsWith(path))
            return (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Wallet */}
        <ConnectWallet />
      </div>
    </nav>
  )
}
