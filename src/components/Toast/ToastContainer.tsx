import { useContext } from 'react'
import { ToastContext } from './ToastContext'

const typeStyles = {
  success: 'bg-green-600 text-white border-green-700',
  error: 'bg-red-600 text-white border-red-700',
  info: 'bg-[#374151] text-[#f9fafb] border-gray-600',
}

export function ToastContainer() {
  const ctx = useContext(ToastContext)
  if (!ctx) return null
  const { toasts, removeToast } = ctx

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-full flex-col gap-2 p-4 sm:bottom-6 sm:right-6"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex min-w-[280px] max-w-[90vw] items-center justify-between gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 ease-in-out animate-in-slide-up ${typeStyles[t.type]}`}
          role="alert"
        >
          <span className="flex-1 text-sm font-medium">{t.message}</span>
          <button
            type="button"
            onClick={() => removeToast(t.id)}
            className="shrink-0 rounded p-1 opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
