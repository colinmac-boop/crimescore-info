import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1c35] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                CS
              </div>
              <span className="font-semibold text-[#e2e2f0]">CrimeScore</span>
            </div>
            <p className="text-sm text-[#7070a0]">Powered by SpotCrime</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-[#7070a0]">
            <div className="flex flex-col gap-2">
              <span className="text-[#e2e2f0] font-medium text-xs uppercase tracking-wider">Product</span>
              <Link href="/developers" className="hover:text-[#e2e2f0] transition-colors">Developers</Link>
              <Link href="/about" className="hover:text-[#e2e2f0] transition-colors">About</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[#e2e2f0] font-medium text-xs uppercase tracking-wider">Resources</span>
              <a href="https://mcp.crimescore.info/" target="_blank" rel="noopener noreferrer" className="hover:text-[#e2e2f0] transition-colors">MCP Console</a>
              <a href="https://spotcrime.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e2e2f0] transition-colors">SpotCrime.com</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#1c1c35] flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#7070a0]">
          <p>Data updated monthly · ~41,700 US ZIP codes covered</p>
          <p>© {new Date().getFullYear()} CrimeScore · SpotCrime, Inc.</p>
        </div>
      </div>
    </footer>
  )
}
