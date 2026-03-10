import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { LaunchPool } from './pages/LaunchPool';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { RSCActivityMonitor } from './pages/RSCActivityMonitor';
function App() {
    return (_jsx(WagmiConfig, { config: wagmiConfig, children: _jsx(Router, { children: _jsxs("div", { className: "min-h-screen", children: [_jsx(Navbar, {}), _jsx("main", { className: "pt-20", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/launch", element: _jsx(LaunchPool, {}) }), _jsx(Route, { path: "/verify", element: _jsx(InvestorDashboard, {}) }), _jsx(Route, { path: "/verify/:address", element: _jsx(InvestorDashboard, {}) }), _jsx(Route, { path: "/monitor", element: _jsx(RSCActivityMonitor, {}) })] }) })] }) }) }));
}
export default App;
