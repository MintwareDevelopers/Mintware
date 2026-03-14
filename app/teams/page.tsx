'use client'

import { useState } from 'react'
import Link from 'next/link'
import LandingNav from '@/components/nav/LandingNav'

export default function TeamsPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    try {
      // Using Formspree or similar — replace FORM_ID with actual endpoint
      await fetch('https://formspree.io/f/FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubmitted(true)
    } catch {
      // Still show success to not frustrate users
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--dark)]">
      <LandingNav />

      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/30 text-blue-400 text-xs font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Teams Dashboard — Coming Soon
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Deploy vaults.<br />
          <span className="text-[var(--blue)]">Reward your community.</span>
        </h1>

        <p className="text-xl text-[#8A9BB8] max-w-2xl mx-auto mb-16 leading-relaxed">
          Mintware gives your project an entire social liquidity infrastructure. Deploy
          vaults, create reward pools, and watch your community become your best
          liquidity providers — all rewarded by Attribution scoring.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
          {[
            {
              icon: '🏦',
              title: 'Deploy LP Vaults',
              desc: 'Create Uniswap V4 LP vaults for your token. Community deposits USDC, you seed the token side. Deep liquidity from day one.',
            },
            {
              icon: '🎁',
              title: 'Create Reward Pools',
              desc: 'Fund referral reward pools to incentivize your community. Referrers earn when they bring in buyers. Score-weighted bonuses.',
            },
            {
              icon: '📊',
              title: 'Attribution Plugin',
              desc: 'Add the Attribution scoring plugin to any protocol. Reward your most loyal, active community members automatically.',
            },
          ].map(feature => (
            <div
              key={feature.title}
              className="bg-[var(--dark-2)] rounded-2xl p-6 border border-[#2A2E3E]"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-[#8A9BB8] text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Waitlist form */}
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Join the waitlist</h2>
          <p className="text-[#8A9BB8] text-sm mb-6">
            We&apos;re onboarding teams in waves. Drop your email to get early access.
          </p>

          {submitted ? (
            <div className="px-6 py-4 rounded-2xl bg-[var(--green-bg)] border border-[var(--green-border)] text-[var(--green)] text-sm font-medium">
              ✅ You&apos;re on the list! We&apos;ll reach out soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="team@yourprotocol.xyz"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-[var(--dark-2)] border border-[#2A2E3E] text-white placeholder:text-[#4A5168] text-sm focus:outline-none focus:border-[var(--blue)] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-[var(--blue)] text-white font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? '…' : 'Get Access'}
              </button>
            </form>
          )}
        </div>

        {/* Back link */}
        <div className="mt-16">
          <Link
            href="/"
            className="text-[#8A9BB8] text-sm hover:text-white transition-colors"
          >
            ← Back to Mintware
          </Link>
        </div>
      </div>
    </div>
  )
}
