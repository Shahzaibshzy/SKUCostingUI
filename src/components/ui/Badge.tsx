type Status = 'Active' | 'Inactive'

interface BadgeProps {
  status: Status
}

const statusClasses: Record<Status, string> = {
  Active: 'bg-green-200 text-green-800',
  Inactive: 'bg-red-200 text-red-800',
}

export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium transition-colors duration-200 ease-in-out ${statusClasses[status]}`}
    >
      {status}
    </span>
  )
}
