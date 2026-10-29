import { Link } from 'react-router-dom'
import { ArrowRight, Package } from 'lucide-react'
import type { Case } from '../types'
import { rarities } from '../data/cases'
import { formatRub } from '../lib/format'
import './case-card.css'

interface Props {
  caseItem: Case
}

const CaseCard = ({ caseItem }: Props) => {
  const uniqueRarities = Array.from(new Set(caseItem.items.map((item) => item.rarity)))

  return (
    <article className="case-card">
      <div className="case-card__cover" style={{ background: caseItem.cover }}>
        <span className="case-card__tag">{caseItem.tag}</span>
        <Package size={56} />
        <div className="case-card__glow" />
      </div>
      <div className="case-card__body">
        <div className="case-card__header">
          <h3>{caseItem.name}</h3>
          <span className="case-card__price">{formatRub(caseItem.price)}</span>
        </div>
        <div className="case-card__meta">
          <div className="case-card__dots">
            {uniqueRarities.map((rarity) => (
              <span key={rarity} style={{ background: rarities[rarity].color }} />
            ))}
          </div>
          <span className="case-card__count">{caseItem.items.length} предметов</span>
        </div>
        <Link to="/cases" className="case-card__cta">
          Открыть
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  )
}

export default CaseCard
