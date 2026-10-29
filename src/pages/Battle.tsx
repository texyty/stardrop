import { useState } from 'react'
import { Swords } from 'lucide-react'
import { cases, pickWeighted, rarityRank } from '../data/cases'
import { rarities } from '../data/cases'
import { formatRub } from '../lib/format'
import useStore from '../store/useStore'
import SkinVisual from '../components/SkinVisual'
import { toast } from '../components/Toast'
import type { CaseItem } from '../types'
import './battle.css'

const Battle = () => {
  const { user, balance, addBalance, addItem } = useStore()
  const [caseId, setCaseId] = useState(cases[0].id)
  const [busy, setBusy] = useState(false)
  const [userDrop, setUserDrop] = useState<CaseItem | null>(null)
  const [botDrop, setBotDrop] = useState<CaseItem | null>(null)
  const [result, setResult] = useState('')

  const active = cases.find((c) => c.id === caseId)!

  const start = async () => {
    if (busy) return
    if (balance < active.price) {
      toast('Недостаточно средств. Пополни баланс в демо-режиме.')
      return
    }
    setBusy(true)
    setUserDrop(null)
    setBotDrop(null)
    setResult('Крутим рулетку...')
    addBalance(-active.price)
    const u = pickWeighted(active.items)
    const b = pickWeighted(active.items)
    await new Promise((r) => setTimeout(r, 700))
    setUserDrop(u)
    setResult('Бот открывает кейс...')
    await new Promise((r) => setTimeout(r, 900))
    setBotDrop(b)
    if (u.price > b.price) {
      addItem({ ...u, caseId: active.id })
      addItem({ ...b, caseId: active.id })
      setResult('Победа! Вы забрали оба скина.')
      toast('Победа в кейс-батле!')
    } else if (u.price < b.price) {
      setResult('Поражение. Бот забрал банк.')
    } else {
      addItem({ ...u, caseId: active.id })
      setResult('Ничья — ваш скин остаётся у вас.')
    }
    setBusy(false)
  }

  return (
    <main className="battle">
      <header className="battle__header">
        <div>
          <h1>Кейс-батлы</h1>
          <p>Сразись с ботом. Победитель забирает оба скина, при ничьей остаётся свой.</p>
        </div>
      </header>
      <div className="battle__arena">
        <article className="battle__player">
          <header className="battle__player-header">
            <div className="battle__avatar">
              <span>{(user?.username || 'Гость').slice(0, 1).toUpperCase()}</span>
            </div>
            <div>
              <h3>{user?.username || 'Гость'}</h3>
              <span>Вы</span>
            </div>
          </header>
          <div className="battle__slot">{userDrop ? <SkinVisual item={userDrop} /> : <span>Скин появится здесь</span>}</div>
        </article>
        <div className="battle__vs">
          <Swords size={28} />
          <span>VS</span>
        </div>
        <article className="battle__player">
          <header className="battle__player-header">
            <div className="battle__avatar bot">
              <Swords size={18} />
            </div>
            <div>
              <h3>Starlight Bot</h3>
              <span>Противник</span>
            </div>
          </header>
          <div className="battle__slot">{botDrop ? <SkinVisual item={botDrop} /> : <span>Скин появится здесь</span>}</div>
        </article>
      </div>
      <div className="battle__controls">
        <select value={caseId} onChange={(e) => setCaseId(e.target.value)}>
          {cases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} — {formatRub(c.price)}
            </option>
          ))}
        </select>
        <button onClick={start} disabled={busy}>
          {busy ? 'Батл в процессе...' : 'Начать батл'}
        </button>
        <span className="battle__hint">Списывается стоимость кейса выбранного для батла</span>
      </div>
      {result && <div className="battle__result">{result}</div>}
    </main>
  )
}

export default Battle
