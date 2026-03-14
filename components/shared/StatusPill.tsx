type Status = 'active' | 'hot' | 'new' | 'inactive' | 'pending'

const STATUS_CONFIG: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
  active: { label: 'Active', bg: 'bg-[var(--green-bg)]', text: 'text-[var(--green)]', dot: 'bg-[var(--green)]' },
  hot: { label: '🔥 Hot', bg: 'bg-orange-50', text: 'text-orange-600', dot: 'bg-orange-500' },
  new: { label: 'New', bg: 'bg-blue-50', text: 'text-[var(--blue)]', dot: 'bg-[var(--blue)]' },
  inactive: { label: 'Inactive', bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' },
  pending: { label: 'Pending', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
}

interface StatusPillProps {
  status: Status
  size?: 'sm' | 'md'
}

export default function StatusPill({ status, size = 'sm' }: StatusPillProps) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.active
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${cfg.bg} ${cfg.text} ${padding}`}>
      {status !== 'hot' && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
      {cfg.label}
    </span>
  )
}
