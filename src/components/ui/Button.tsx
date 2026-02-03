import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#22c55e] hover:bg-[#16a34a] active:scale-[0.98] text-white border-0',
  secondary: 'bg-white hover:bg-gray-100 active:scale-[0.98] text-gray-800 border border-gray-300',
  danger: 'bg-[#ef4444] hover:bg-red-600 active:scale-[0.98] text-white border-0',
  ghost: 'bg-transparent hover:bg-gray-100 active:scale-[0.98] text-gray-700 border border-gray-300',
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out disabled:opacity-50 disabled:pointer-events-none disabled:transform-none ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
