import type { ReactNode } from "react";

const stroke = "currentColor";

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-[var(--faf-green)] shadow-sm backdrop-blur-sm"
      aria-hidden
    >
      {children}
    </span>
  );
}

export function HeroFeatureIcon({ index }: { index: number }) {
  switch (index % 4) {
    case 0:
      return (
        <IconWrap>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 22V11"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path
              d="M12 11c-4-3-9-3.5-9 1 0 3.5 4 6.5 9 4"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11c4-3 9-3.5 9 1 0 3.5-4 6.5-9 4"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconWrap>
      );
    case 1:
      return (
        <IconWrap>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 7h16v10H4V7z"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path
              d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 17v2a2 2 0 002 2h4a2 2 0 002-2v-2"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path d="M9 11h6M9 14h4" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </IconWrap>
      );
    case 2:
      return (
        <IconWrap>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M7 4h10v16H7V4z"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <path
              d="M7 8h10M7 12h6"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path
              d="M10 17l2 2 4-4"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconWrap>
      );
    default:
      return (
        <IconWrap>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.75" />
            <path
              d="M3 12h18M12 3a15 15 0 000 18M12 3a15 15 0 010 18"
              stroke={stroke}
              strokeWidth="1.75"
            />
            <path
              d="M12 12c2-3 5-4 8-4"
              stroke={stroke}
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </IconWrap>
      );
  }
}
