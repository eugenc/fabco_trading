import type { ReactNode } from "react";

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--faf-green)]/35 bg-[var(--faf-green)]/10 text-[var(--faf-green)]"
      aria-hidden
    >
      {children}
    </span>
  );
}

/* Index-based icons aligned with `about.whyBullets` order. */
export function AboutWhyReasonIcon({ index }: { index: number }) {
  const c = "currentColor";

  switch (index) {
    case 0:
      return (
        <IconBox>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M15 18H9" stroke={c} strokeWidth="1.75" strokeLinecap="round" />
            <path
              d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="17" cy="18" r="2" stroke={c} strokeWidth="1.75" />
            <circle cx="7" cy="18" r="2" stroke={c} strokeWidth="1.75" />
          </svg>
        </IconBox>
      );
    case 1:
      return (
        <IconBox>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9 9h6M9 13h4" stroke={c} strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </IconBox>
      );
    case 2:
      return (
        <IconBox>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83l-8.59-3.91Z"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12h.05l9.52 4.34a2 2 0 0 0 1.66 0l9.52-4.34"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17h.05l9.52 4.34a2 2 0 0 0 1.66 0l9.52-4.34"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconBox>
      );
    case 3:
      return (
        <IconBox>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="7" r="4" stroke={c} strokeWidth="1.75" />
            <path
              d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
              stroke={c}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconBox>
      );
    default:
      return (
        <IconBox>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.75" />
            <path d="M12 8v4l3 2" stroke={c} strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </IconBox>
      );
  }
}
