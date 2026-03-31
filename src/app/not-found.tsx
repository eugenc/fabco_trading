import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-lg font-semibold text-[var(--faf-ink)]">Page not found</p>
      <Link
        href="/en"
        className="mt-4 text-sm font-medium text-[var(--faf-brand)] underline"
      >
        Home
      </Link>
    </div>
  );
}
