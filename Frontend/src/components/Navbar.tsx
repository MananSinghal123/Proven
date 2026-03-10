import { Link, useLocation } from 'react-router-dom'
import { ConnectWallet } from './ConnectWallet'
import { useThemeStore } from '../store/themeStore'
import { Sun, Moon } from 'lucide-react'

export function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { dark, toggle } = useThemeStore()

  const links = [
    { path: '/', label: 'HOME' },
    { path: '/launch', label: 'LAUNCH' },
    { path: '/verify', label: 'DASHBOARD' },
    { path: '/monitor', label: 'MONITOR' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-[#0A0A0A] border-b-4 border-black dark:border-white z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-[#DFFF00] border-2 border-black dark:border-white" />
          <span className="text-3xl font-black uppercase tracking-tighter">Proven</span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-2 font-bold tracking-tight">
          {links.map(({ path, label }) => {
            const isActive =
              location.pathname === path ||
              (path !== '/' && location.pathname.startsWith(path))
            return (
              <Link
                key={path}
                to={path}
                className={`px-3 py-1.5 border-2 transition-colors ${
                  isActive
                    ? 'bg-black text-[#DFFF00] border-black dark:bg-white dark:text-black dark:border-white'
                    : 'border-transparent hover:bg-black hover:text-[#DFFF00] hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggle}
            className="w-10 h-10 border-4 border-black dark:border-white flex items-center justify-center bg-white dark:bg-[#0A0A0A] hover:bg-[#DFFF00] dark:hover:bg-[#DFFF00] dark:hover:text-black transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="w-4 h-4 stroke-[2.5]" /> : <Moon className="w-4 h-4 stroke-[2.5]" />}
          </button>

          {isHome ? (
            <Link
              to="/launch"
              className="bg-[#DFFF00] font-bold uppercase border-4 border-black px-6 py-2 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
            >
              Launch App
            </Link>
          ) : (
            <ConnectWallet />
          )}
        </div>
      </div>
    </nav>
  )
}
