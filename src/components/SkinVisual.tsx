import type { CaseItem } from '../types'
import { rarities } from '../data/cases'
import { hexToRgba } from '../lib/utils'

interface Props {
  item: CaseItem
  compact?: boolean
}

const SkinVisual = ({ item, compact }: Props) => {
  const rarity = item.rarity
  const meta = rarities[rarity]
  const bg = `radial-gradient(circle at 80% 20%, ${hexToRgba(meta.color, 0.32)}, transparent 55%), linear-gradient(145deg, ${hexToRgba(meta.color, 0.38)}, rgba(12, 12, 18, 0.95))`

  return (
    <div
      className={`skin-visual ${compact ? 'compact' : ''}`}
      style={{
        ['--skin-color' as string]: meta.color,
        background: bg
      }}
    >
      <span className="skin-visual__weapon">{item.weapon}</span>
      <span className="skin-visual__name">{item.name}</span>
      <span className="skin-visual__glow" />
    </div>
  )
}

export default SkinVisual
