'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/developers', label: 'Developers' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#07070f]/95 backdrop-blur border-b border-[#1c1c35]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
            CS
          </div>
          <span className="font-semibold text-[#e2e2f0] tracking-tight group-hover:text-white transition-colors">
            CrimeScore
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pathname === href
                  ? 'text-white bg-white/10'
                  : 'text-[#7070a0] hover:text-[#e2e2f0] hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/developers"
            className="ml-3 px-4 py-1.5 text-sm rounded-md bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-colors"
          >
            Get API Access
          </Link>
        </nav>
      </div>
    </header>
  )
}
