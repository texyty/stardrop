import { useMemo, useRef, useState } from 'react'
import { Lock, Sparkles } from 'lucide-react'
import { cases, getCaseById, pickWeighted, rarityRank } from '../data/cases'
import { rarities } from '../data/cases'
import { formatRub } from '../lib/format'
import useStore from '../store/useStore'
import RouletteStrip from '../components/RouletteStrip'
import SkinVisual from '../components/SkinVisual'
import { toast } from '../components/Toast'
import type { CaseItem } from '../types'
import './cases.css'

type Filter = 'all' | 'budget' | 'mid' | 'premium' | 'knives'

const getCategory = (id: string, price: number) => {
  if (id === 'knife') return 'knives'
  if (price < 150) return 'budget'
  if (price >= 600) return 'premium'
  return 'mid'
}

const Cases = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [spinning, setSpinning] = useState(false)
  const [drop, setDrop] = useState<(CaseItem & { uid: string }) | null>(null)
  const [rouletteItems, setRouletteItems] = useState<CaseItem[]>([])
  const stripRef = useRef<HTMLDivElement>(null)
  const { balance, addBalance, addItem } = useStore()

  const activeCase = useMemo(() => (activeId ? getCaseById(activeId) : null), [activeId])
  const filtered = useMemo(() => cases.filter((c) => filter === 'all' || getCategory(c.id, c.price) === filter), [filter])

  const openCase = (id: string) => {
    if (spinning) return
    setActiveId(id)
    setDrop(null)
    const c = getCaseById(id)
    if (c) {
      setRouletteItems(Array.from({ length: 52 }, () => pickWeighted(c.items)))
    } else {
      setRouletteItems([])
    }
  }

  const close = () => {
    if (spinning) return
    setActiveId(null)
    setDrop(null)
    setRouletteItems([])
  }

  const spin = async () => {
    if (!activeCase || spinning) return
    if (balance < activeCase.price) {
      toast('Недостаточно средств. Пополни баланс в демо-режиме.')
      return
    }
    setSpinning(true)
    setDrop(null)
    addBalance(-activeCase.price)

    const strip = stripRef.current
    if (!strip) return
    const winner = pickWeighted(activeCase.items)
    const sequence: CaseItem[] = Array.from({ length: 52 }, () => pickWeighted(activeCase.items))
    sequence[44] = winner
    setRouletteItems(sequence)

    requestAnimationFrame(() => {
      strip.style.transition = 'none'
      strip.style.transform = 'translateX(0)'
      void strip.offsetWidth
      const target = strip.children[44] as HTMLElement | undefined
      if (!target) return
      const container = strip.parentElement as HTMLElement | undefined
      if (!container) return
      const jitter = (Math.random() - 0.5) * target.offsetWidth * 0.4
      const offset = target.offsetLeft + target.offsetWidth / 2 - container.clientWidth / 2 + jitter
      strip.style.transition = 'transform 5.2s cubic-bezier(.12,.72,.14,1)'
      strip.style.transform = `translateX(${-offset}px)`
    })

    await new Promise((r) => setTimeout(r, 5450))
    const entry = addItem({ ...winner, caseId: activeCase.id })
    setDrop({ ...winner, uid: entry.uid })
    setSpinning(false)
  }

  const sellDrop = () => {
    if (!drop) return
    const amount = Math.round(drop.price * 0.9)
    useStore.getState().removeItem(drop.uid)
    useStore.getState().addBalance(amount)
    toast(`Продано за ${formatRub(amount)}`)
    setDrop(null)
  }

  const filters: Array<{ id: Filter; label: string }> = [
    { id: 'all', label: 'Все' },
    { id: 'budget', label: 'Бюджет' },
    { id: 'mid', label: 'Средние' },
    { id: 'premium', label: 'Премиум' },
    { id: 'knives', label: 'Ножи' }
  ]

  return (
    <main className="cases">
      <header className="cases__header">
        <div>
          <h1>Кейсы</h1>
          <p>Выбери кейс, запусти рулетку и забери скин в инвентарь</p>
        </div>
        <div className="cases__filters">
          {filters.map((f) => (
            <button key={f.id} className={`cases__filter ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </header>
      <div className="grid grid--cases">
        {filtered.map((c) => {
          const dots = Array.from(new Set(c.items.map((i) => i.rarity))).sort((a, b) => rarityRank[a] - rarityRank[b])
          return (
            <article className="case-card" key={c.id} onClick={() => openCase(c.id)}>
              <div className="case-card__cover" style={{ background: c.cover }}>
                <span className="case-card__tag">{c.tag}</span>
                <Sparkles size={56} />
                <div className="case-card__glow" />
              </div>
              <div className="case-card__body">
                <div className="case-card__header">
                  <h3>{c.name}</h3>
                  <span className="case-card__price">{formatRub(c.price)}</span>
                </div>
                <div className="case-card__meta">
                  <div className="case-card__dots">
                    {dots.map((r) => (
                      <span key={r} style={{ background: rarities[r].color }} />
                    ))}
                  </div>
                  <span className="case-card__count">{c.items.length} предметов</span>
                </div>
                <button className="case-card__cta">
                  Открыть за {formatRub(c.price)}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      {activeCase && (
        <div className="modal">
          <div className="modal__backdrop" onClick={close} />
          <div className="modal__card">
            <header className="modal__header">
              <div className="modal__title">
                <div className="modal__cover" style={{ background: activeCase.cover }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h2>{activeCase.name}</h2>
                  <p>{activeCase.items.length} предметов · честный взвешенный дроп</p>
                </div>
              </div>
              <button className="modal__close" onClick={close} disabled={spinning}>
                <Lock size={18} />
              </button>
            </header>
            <RouletteStrip ref={stripRef} items={rouletteItems.length ? rouletteItems : activeCase.items} />
            <div className="modal__actions">
              <button className="modal__spin" onClick={spin} disabled={spinning}>
                {spinning ? 'Крутим...' : `Открыть за ${formatRub(activeCase.price)}`}
              </button>
              <span className="modal__hint">Демо-режим. Баланс спишется из хранилища</span>
            </div>
            {drop && (
              <div className="drop">
                <SkinVisual item={drop} />
                <div className="drop__info">
                  <h3>
                    {drop.weapon} | {drop.name}
                  </h3>
                  <span className="drop__badge" style={{ borderColor: rarities[drop.rarity].color }}>
                    <span style={{ background: rarities[drop.rarity].color }} />
                    {rarities[drop.rarity].label}
                  </span>
                </div>
                <div className="drop__price">{formatRub(drop.price)}</div>
                <div className="drop__actions">
                  <button onClick={sellDrop}>Продать за {formatRub(Math.round(drop.price * 0.9))}</button>
                  <button onClick={() => setDrop(null)}>Забрать в инвентарь</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default Cases
