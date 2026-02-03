import { useContext } from 'react'
import { ToastContext } from '@/components/Toast/ToastContext'

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    return {
      success: () => {},
      error: () => {},
      info: () => {},
    }
  }
  const { addToast } = ctx
  return {
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
  }
}
