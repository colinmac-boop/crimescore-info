'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface ZipSearchProps {
  placeholder?: string
  size?: 'default' | 'large'
  initialValue?: string
}

export default function ZipSearch({
  placeholder = 'Enter ZIP code (e.g. 10001)',
  size = 'default',
  initialValue = '',
}: ZipSearchProps) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const zip = value.trim()

    if (!/^\d{5}$/.test(zip)) {
      setError('Please enter a valid 5-digit ZIP code')
      return
    }

    setError('')
    router.push(`/zip/${zip}`)
  }

  const isLarge = size === 'large'

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex gap-2 ${isLarge ? 'flex-col sm:flex-row' : 'flex-row'}`}>
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError('')
            }}
            placeholder={placeholder}
            maxLength={10}
            className={`w-full bg-[#0e0e1c] border ${
              error ? 'border-red-500/60' : 'border-[#1c1c35]'
            } rounded-lg text-[#e2e2f0] placeholder-[#7070a0] outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all ${
              isLarge ? 'px-5 py-4 text-lg' : 'px-4 py-2.5 text-sm'
            }`}
          />
          {error && (
            <p className="mt-1.5 text-xs text-red-400">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className={`bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-lg transition-colors whitespace-nowrap ${
            isLarge ? 'px-8 py-4 text-base' : 'px-5 py-2.5 text-sm'
          }`}
        >
          Look Up Score
        </button>
      </div>
    </form>
  )
}
