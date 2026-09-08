'use client'

interface ScoreGaugeProps {
  percentile: number
  size?: number
}

export default function ScoreGauge({ percentile, size = 280 }: ScoreGaugeProps) {
  // Semicircle arc from 180° to 0° (left to right)
  // percentile 0 → left (180°), percentile 100 → right (0°)
  const cx = size / 2
  const cy = size / 2
  const r = (size / 2) * 0.75
  const strokeWidth = size * 0.07

  // Arc path helper: returns SVG arc path string
  function arcPath(startDeg: number, endDeg: number) {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const sx = cx + r * Math.cos(toRad(startDeg))
    const sy = cy + r * Math.sin(toRad(startDeg))
    const ex = cx + r * Math.cos(toRad(endDeg))
    const ey = cy + r * Math.sin(toRad(endDeg))
    const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`
  }

  // Colored arc segments (left=180° to right=0°, going clockwise through bottom: 180→270→360/0)
  // We use: 180→225→270→315→360 for segments
  // Segments: low(0-25%), below_avg(25-50%), above_avg(50-75%), high(75-90%), very_high(90-99%), extreme(99-100%)
  // Map percentile 0→100 to degrees 180→0 (going through 270/bottom, i.e. counterclockwise)
  // Actually, SVG arcs going from 180° to 0° going counterclockwise (the upper semicircle)
  // Let's use the top semicircle: start at 180° (left), end at 0° (right), sweep through top (upper half)
  // sweep-flag=0 means counterclockwise... let me think again.

  // Standard approach for a gauge:
  // - Left end = 180° (9 o'clock position)  
  // - Right end = 0° (3 o'clock position)
  // - We go through the TOP of the circle (through 270° which is 12 o'clock in standard math coords)
  // In SVG coords (y down), 270° standard = top of circle
  // Arc from 180° to 0° through top (counterclockwise in SVG) → large-arc=1, sweep=0

  // Percentile 0 = 180° left, percentile 100 = 360°(=0°) right
  // degree = 180 + (percentile/100) * 180
  const pctToDeg = (pct: number) => 180 + (pct / 100) * 180

  // Segments with colors
  const segments = [
    { from: 0, to: 25, color: '#22c55e' },
    { from: 25, to: 50, color: '#84cc16' },
    { from: 50, to: 75, color: '#eab308' },
    { from: 75, to: 90, color: '#f97316' },
    { from: 90, to: 99, color: '#ef4444' },
    { from: 99, to: 100, color: '#b91c1c' },
  ]

  // Needle angle
  const needleDeg = pctToDeg(Math.min(99.9, Math.max(0.1, percentile)))
  const needleRad = (needleDeg * Math.PI) / 180
  const needleLen = r * 0.85
  const needleX = cx + needleLen * Math.cos(needleRad)
  const needleY = cy + needleLen * Math.sin(needleRad)

  // Text
  const displayPct = percentile.toFixed(1)

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size / 2 + 40}
        viewBox={`0 0 ${size} ${size / 2 + 40}`}
        aria-label={`Crime percentile gauge: ${displayPct}th percentile`}
      >
        {/* Background track */}
        <path
          d={arcPath(180, 360)}
          fill="none"
          stroke="#1c1c35"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Colored segments */}
        {segments.map((seg) => (
          <path
            key={seg.from}
            d={arcPath(pctToDeg(seg.from), pctToDeg(seg.to))}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            opacity={0.85}
          />
        ))}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#e2e2f0"
          strokeWidth={size * 0.018}
          strokeLinecap="round"
        />
        {/* Needle base dot */}
        <circle cx={cx} cy={cy} r={size * 0.035} fill="#e2e2f0" />

        {/* Center text */}
        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fill="#e2e2f0"
          fontSize={size * 0.12}
          fontWeight="700"
          fontFamily="var(--font-geist-sans, Arial, sans-serif)"
        >
          {displayPct}th
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill="#7070a0"
          fontSize={size * 0.055}
          fontFamily="var(--font-geist-sans, Arial, sans-serif)"
        >
          crime percentile
        </text>

        {/* Labels */}
        <text x={12} y={cy / 2 + 20} fill="#7070a0" fontSize={size * 0.045} fontFamily="var(--font-geist-sans, Arial, sans-serif)">Safe</text>
        <text x={size - 40} y={cy / 2 + 20} fill="#7070a0" fontSize={size * 0.045} fontFamily="var(--font-geist-sans, Arial, sans-serif)">Extreme</text>
      </svg>
    </div>
  )
}
