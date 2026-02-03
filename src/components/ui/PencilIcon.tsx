/**
 * Edit icon matching reference: small light-gray square with upward-pointing arrow.
 * Used next to Qty and Selling Price in the SKU table.
 */
export function PencilIcon({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-400 bg-gray-100 text-gray-500 ${className}`}
      title="Edit"
      aria-hidden
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </span>
  )
}
