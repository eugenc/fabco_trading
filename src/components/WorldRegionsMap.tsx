/**
 * Decorative SVG — abstract trade network / regions (not a geographic map).
 */
export function WorldRegionsMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 960 360"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="wm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a6b44" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1a3a52" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <rect width="960" height="360" rx="16" fill="url(#wm-grad)" />
      {/* Simplified “globe” arc */}
      <ellipse
        cx="480"
        cy="200"
        rx="380"
        ry="140"
        stroke="#1a6b44"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      {/* Trade lanes */}
      <path
        d="M180 120 Q 380 80 520 130 T 780 150"
        stroke="#1a3a52"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeDasharray="6 8"
      />
      <path
        d="M200 220 Q 420 260 640 200 T 820 180"
        stroke="#b8952e"
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="4 10"
      />
      {/* Hubs — approximate positions for narrative only */}
      {[
        [200, 115, "CA"],
        [175, 165, "US"],
        [470, 105, "EU"],
        [530, 118, "EE"],
        [590, 175, "ME"],
        [720, 150, "AS"],
        [240, 255, "LATAM"],
      ].map(([cx, cy, code]) => (
        <g key={code}>
          <circle
            cx={cx}
            cy={cy}
            r="10"
            fill="#ffffff"
            stroke="#1a6b44"
            strokeWidth="2"
            opacity="0.95"
          />
          <text
            x={cx}
            y={Number(cy) + 4}
            textAnchor="middle"
            fill="#14231a"
            fontSize="10"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            {code}
          </text>
        </g>
      ))}
    </svg>
  );
}
