import Link from 'next/link'
import LandingNav from '@/components/nav/LandingNav'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/60 to-white" />
        <div className="relative max-w-4xl mx-auto px-6 py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[var(--blue)] text-xs font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue)]" />
            Built on Uniswap V4
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--ink)] leading-tight mb-6">
            Social liquidity.<br />
            <span className="text-[var(--blue)]">Shared rewards.</span>
          </h1>

          <p className="text-xl text-[var(--ink-2)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Mintware deploys social LP vaults where community members deposit USDC,
            teams seed the token side, and Attribution scoring weights how fees,
            MEV capture, and rewards are distributed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="px-8 py-4 rounded-2xl bg-[var(--blue)] text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              For People →
            </Link>
            <Link
              href="/teams"
              className="px-8 py-4 rounded-2xl border-2 border-[var(--border-strong)] text-[var(--ink)] font-semibold text-lg hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
            >
              For Teams
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { label: 'Total Value Locked', value: '$2.4M' },
              { label: 'Active Wallets', value: '8,400+' },
              { label: 'Avg APR', value: '24.8%' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-bold text-[var(--ink)]"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--ink-3)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--ink)] mb-4">How it works</h2>
            <p className="text-[var(--ink-2)] text-lg">Three steps to earning together</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Deposit USDC',
                desc: 'Community members deposit USDC into social LP vaults. No token research required — just contribute liquidity.',
                icon: '💰',
              },
              {
                step: '02',
                title: 'Teams seed the token',
                desc: 'Project teams seed the paired token side of the vault. Together, you create deep, sustainable liquidity.',
                icon: '🤝',
              },
              {
                step: '03',
                title: 'Attribution distributes rewards',
                desc: 'Your Attribution score determines your share of fees, MEV capture, and reward pools. Higher score = more rewards.',
                icon: '📊',
              },
            ].map(card => (
              <div
                key={card.step}
                className="bg-[var(--surface)] rounded-2xl p-8 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-6">
                  {card.icon}
                </div>
                <div
                  className="text-xs text-[var(--blue)] font-medium mb-2"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {card.step}
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{card.title}</h3>
                <p className="text-[var(--ink-2)] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution section — dark */}
      <section className="py-24 bg-[var(--dark)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/30 text-blue-400 text-xs font-semibold mb-6">
                Powered by Attribution
              </div>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Your score determines<br />
                <span className="text-[var(--blue)]">your rewards</span>
              </h2>
              <p className="text-[#8A9BB8] text-lg leading-relaxed mb-8">
                Attribution is a scoring protocol that measures your on-chain behavior
                across five dimensions. Your score weights every distribution — the higher
                your score, the larger your share.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'LP Behavior', score: 91 },
                  { label: 'DeFi Competence', score: 85 },
                  { label: 'Wallet Longevity', score: 78 },
                  { label: 'Network & Referral', score: 64 },
                  { label: 'Mintware Native', score: 72 },
                ].map(dim => (
                  <div key={dim.label} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white font-medium">{dim.label}</span>
                        <span
                          className="text-sm text-[var(--blue)]"
                          style={{ fontFamily: 'DM Mono, monospace' }}
                        >
                          {dim.score}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--dark-3)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--blue)] rounded-full"
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score visual */}
            <div className="flex justify-center">
              <div className="bg-[var(--dark-2)] rounded-3xl p-10 border border-[#2A2E3E] text-center w-full max-w-sm">
                <div
                  className="text-7xl font-bold text-white mb-2"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  82
                </div>
                <div className="text-[var(--blue)] font-semibold mb-1">Builder Tier</div>
                <div className="text-[#8A9BB8] text-sm mb-8">Top 5% of wallets</div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Score boost', value: '+18%' },
                    { label: 'Fee weight', value: '1.18×' },
                    { label: 'MEV share', value: '1.18×' },
                    { label: 'Pool bonus', value: '+18%' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-[var(--dark-3)] rounded-xl p-4 text-left">
                      <div className="text-[#8A9BB8] text-xs mb-1">{stat.label}</div>
                      <div
                        className="text-white font-bold"
                        style={{ fontFamily: 'DM Mono, monospace' }}
                      >
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--ink)] mb-4">Two ways to participate</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* People card — dark */}
            <div className="bg-[var(--dark)] rounded-3xl p-10">
              <div className="w-12 h-12 rounded-xl bg-[var(--blue)] flex items-center justify-center text-xl mb-6">
                👤
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">For People</h3>
              <p className="text-[#8A9BB8] text-lg mb-8 leading-relaxed">
                Deposit USDC into social vaults, earn yield weighted by your Attribution
                score, and grow your on-chain reputation.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Deposit USDC, earn fees + MEV',
                  'Score drives your reward share',
                  'Explore any wallet profile',
                  'Refer friends, earn from their activity',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[#B0BBD4]">
                    <span className="w-5 h-5 rounded-full bg-[var(--blue)] flex items-center justify-center text-white text-xs flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--blue)] text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Open App →
              </Link>
            </div>

            {/* Teams card — light */}
            <div className="bg-white rounded-3xl p-10 border-2 border-[var(--border-strong)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xl mb-6">
                🏗️
              </div>
              <h3 className="text-3xl font-bold text-[var(--ink)] mb-4">For Teams</h3>
              <p className="text-[var(--ink-2)] text-lg mb-8 leading-relaxed">
                Deploy vaults, seed the token side, create reward pools, and grow
                your community with attribution-weighted distributions.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Deploy social LP vaults on Uniswap V4',
                  'Community provides the USDC side',
                  'Create referral reward pools',
                  'Attribution plugin for any protocol',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[var(--ink-2)]">
                    <span className="w-5 h-5 rounded-full bg-[var(--surface)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--blue)] text-xs flex-shrink-0">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/teams"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--ink)] text-[var(--ink)] font-semibold hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
              >
                Get Early Access →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--blue)] flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-bold text-[var(--ink)]" style={{ fontFamily: 'Georgia, serif' }}>
              Mintware
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/app" className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
              App
            </Link>
            <Link href="/app/vaults" className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
              Vaults
            </Link>
            <Link href="/app/leaderboard" className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
              Leaderboard
            </Link>
            <Link href="/teams" className="text-sm text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors">
              For Teams
            </Link>
          </div>

          <p className="text-sm text-[var(--ink-3)]">
            © 2025 Mintware. Built on Uniswap V4.
          </p>
        </div>
      </footer>
    </div>
  )
}
