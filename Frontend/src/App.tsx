import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from './config/wagmi.ts'
import { Navbar } from './components/Navbar.tsx'
import { Home } from './pages/Home.tsx'
import { LaunchPool } from './pages/LaunchPool.tsx'
import { InvestorDashboard } from './pages/InvestorDashboard.tsx'
import { RSCActivityMonitor } from './pages/RSCActivityMonitor.tsx'
function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/launch" element={<LaunchPool />} />
              <Route path="/verify" element={<InvestorDashboard />} />
              <Route path="/verify/:address" element={<InvestorDashboard />} />
              <Route path="/monitor" element={<RSCActivityMonitor />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WagmiConfig>
  )
}

export default App
