import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CrimeScore — Crime Intelligence for Every US ZIP Code',
  description:
    "Real crime scores and percentile rankings for 41,700+ US ZIP codes. Powered by SpotCrime's 60M crime incident dataset.",
  metadataBase: new URL('https://crimescore.info'),
  openGraph: {
    title: 'CrimeScore — Crime Intelligence for Every US ZIP Code',
    description: "Real crime scores and percentile rankings for 41,700+ US ZIP codes.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#07070f] text-[#e2e2f0] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
