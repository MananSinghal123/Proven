import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { NetworkSphere } from '../components/NetworkSphere'

const TICKER_ITEMS = [
  { event: 'MILESTONEUNLOCKED', project: '$NOVA', time: '0.45 AGO' },
  { event: 'NEWPOSITIONCREATED', detail: '0xAA...F20', time: '2.15 AGO' },
  { event: 'MILESTONEUNLOCKED', project: '$DRIFT', time: '4.30 AGO' },
  { event: 'LOCKEXTENDED', project: '$WAVE', time: '8.12 AGO' },
  { event: 'NEWPOSITIONCREATED', detail: '0x3B...E91', time: '12.00 AGO' },
  { event: 'MILESTONEUNLOCKED', project: '$SPARK', time: '15.22 AGO' },
]

export function Home() {
  const [items] = useState([...TICKER_ITEMS, ...TICKER_ITEMS])

  return (
    <div className="relative">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="z-10">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6 text-white">
              The Performance-Vested{' '}
              <span className="text-brand">Liquidity Layer</span>{' '}
              for Unichain.
            </h1>

            <p className="text-white/40 text-lg leading-relaxed max-w-lg mb-10">
              A better place to launch your token. Liquidity secured by milestones, not time — verified autonomously by Reactive Smart Contracts.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/launch">
                <button className="btn-primary text-base px-7 py-3.5 font-semibold">
                  Launch with Proven 🚀
                </button>
              </Link>
              <Link to="/verify">
                <button className="btn-secondary text-base px-7 py-3.5 font-semibold">
                  Verify a Project
                </button>
              </Link>
            </div>
          </div>

          {/* Right column — 3D sphere */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="w-[420px] h-[420px] md:w-[500px] md:h-[500px] relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-brand/[0.04] blur-3xl scale-110" />
              <NetworkSphere />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label: 'Total Value Locked', value: 14.2, prefix: '$', suffix: 'M', decimals: 1 },
            { label: 'Active Vesting Positions', value: 124, prefix: '', suffix: '', decimals: 0 },
            { label: 'Milestones Completed', value: 892, prefix: '', suffix: '', decimals: 0 },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-surface-border bg-surface p-6 text-center hover:border-brand/20 transition-colors duration-300"
            >
              <p className="text-white/30 text-[11px] font-semibold uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="text-3xl md:text-4xl font-extrabold text-white">
                <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LIVE TICKER ═══ */}
      <section className="mt-16 py-4 border-y border-surface-border overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-content gap-6">
            {items.map((item, i) => (
              <div key={i} className="inline-flex items-center gap-2 whitespace-nowrap text-sm">
                <span className="live-dot !w-1.5 !h-1.5" />
                <span className="text-brand font-semibold">{item.event}</span>
                <span className="text-white/50">
                  {item.project ? `FOR ${item.project}` : `BY ${item.detail}`}
                </span>
                <span className="text-white/20">• {item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM SECTION ═══ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — $SQUID Case Study card */}
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-red-500/10 to-transparent" />
            <div className="flex items-start gap-3 mb-6">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-red-400/70 text-xs font-semibold uppercase tracking-wider mb-1">Case Study</p>
                <h3 className="text-2xl font-bold text-white">$SQUID Token</h3>
              </div>
            </div>
            <div className="space-y-4 text-white/50 leading-relaxed text-[15px]">
              <p>
                <span className="text-white/80 font-medium">$2.1M raised in liquidity.</span> Founder drained the LP pool on day 2. Every investor lost everything.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-red-400/60 text-sm">
                  <span className="text-lg">💀</span>
                  <span>40,000+ victims</span>
                </div>
                <div className="flex items-center gap-2 text-red-400/60 text-sm">
                  <span className="text-lg">📉</span>
                  <span>$2.1M lost</span>
                </div>
              </div>
              <a
                href="https://www.bbc.com/news/business-59129466"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-red-400/70 hover:text-red-400 text-sm font-medium mt-2 transition-colors"
              >
                Read more ↗
              </a>
            </div>
          </div>

          {/* Right — Problem explanation */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The Problem with Traditional LP
            </h3>
            <p className="text-white/40 leading-relaxed text-[15px] mb-6">
              Token launches rely on blind trust. Teams can drain liquidity pools at any moment — investors have no protection, no recourse, and no way to verify team intentions on-chain.
            </p>
            <p className="text-white/40 leading-relaxed text-[15px] mb-8">
              Proven locks LP tokens in smart vaults monitored by Reactive Smart Contracts. Liquidity only unlocks when real on-chain milestones — TVL, volume, user growth — are achieved.
            </p>
            {/* Stop the Rugs callout */}
            <div className="rounded-xl border border-brand/20 bg-brand/[0.04] p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-brand">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Stop the Rugs</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  Performance-vested liquidity ensures teams earn access to LP tokens through real metrics — not promises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Three steps to <span className="text-brand">trustless</span> token launches
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Lock',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              desc: 'Teams deposit liquidity into Proven\'s vault with milestone-based unlock conditions.',
              color: 'brand',
            },
            {
              step: '2',
              title: 'Prove',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              desc: 'Reactive Smart Contracts monitor on-chain metrics cross-chain — TVL, volume, user growth.',
              color: 'blue-400',
            },
            {
              step: '3',
              title: 'Unlock',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 019.9-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              desc: 'When milestones are hit, the RSC authorizes unlock. If rug signals fire — locks extend.',
              color: 'brand',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-surface-border bg-surface p-7 hover:border-brand/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                  item.color === 'blue-400'
                    ? 'bg-blue-400/10 text-blue-400'
                    : 'bg-brand/10 text-brand'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <span className="text-white/20 text-xs font-mono">STEP {item.step}</span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
              </div>
              <p className="text-white/40 leading-relaxed text-[15px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="rounded-2xl border border-brand/20 bg-brand/[0.03] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-brand/[0.05] via-transparent to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to build the future of Unichain?
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
              Join the trustless liquidity revolution. Launch with proof, invest with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/launch">
                <button className="btn-primary text-base px-8 py-3.5 font-semibold">
                  Start Building 🚀
                </button>
              </Link>
              <a href="https://docs.reactive.network" target="_blank" rel="noopener noreferrer">
                <button className="btn-secondary text-base px-8 py-3.5 font-semibold">
                  Read the Docs
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Logo + description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <path d="M9 12l2 2 4-4" stroke="#030B06" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-[15px] font-bold text-white">Proven Protocol</span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-sm">
                The performance-vested liquidity layer for Unichain. Built with Reactive Smart Contracts and Uni v4 Hooks.
              </p>
            </div>

            {/* Product links */}
            <div>
              <h4 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Product</h4>
              <ul className="space-y-2.5">
                {['Launch Pool', 'Verify Projects', 'RSC Monitor', 'Documentation'].map((l) => (
                  <li key={l}>
                    <span className="text-white/25 text-sm hover:text-white/50 cursor-pointer transition-colors">{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community links */}
            <div>
              <h4 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">Community</h4>
              <ul className="space-y-2.5">
                {['Twitter', 'Discord', 'GitHub', 'Blog'].map((l) => (
                  <li key={l}>
                    <span className="text-white/25 text-sm hover:text-white/50 cursor-pointer transition-colors">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-surface-border">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/15 text-xs">© 2025 Proven Protocol. All rights reserved.</p>
            <div className="flex gap-5 text-white/15 text-xs">
              <span>Unichain</span>
              <span>·</span>
              <span>Reactive Network</span>
              <span>·</span>
              <span>Uni v4 Hooks</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
