import { Plus, Trash2, Wallet } from 'lucide-react'
import useStore from '../store/useStore'
import { formatRub } from '../lib/format'
import { rarities } from '../data/cases'
import SkinVisual from '../components/SkinVisual'
import { toast } from '../components/Toast'
import './inventory.css'

const Inventory = () => {
  const { inventory, balance, addBalance, removeItem, setInventory } = useStore()
  const total = inventory.reduce((sum, item) => sum + (item.price || 0), 0)

  const sell = (uid: string, price: number) => {
    const amount = Math.round(price * 0.9)
    removeItem(uid)
    addBalance(amount)
    toast(`Продано за ${formatRub(amount)}`)
  }

  const sellAll = () => {
    if (inventory.length === 0) {
      toast('Инвентарь уже пуст')
      return
    }
    const amount = Math.round(total * 0.9)
    setInventory([])
    addBalance(amount)
    toast(`Продано ${inventory.length} предметов за ${formatRub(amount)}`)
  }

  const topup = () => {
    addBalance(1000)
    toast('Демо-баланс пополнен на 1 000 ₽')
  }

  return (
    <main className="inventory">
      <header className="inventory__header">
        <div>
          <h1>Инвентарь</h1>
          <p>Все скины, полученные при открытии кейсов</p>
        </div>
        <div className="inventory__actions">
          <button onClick={topup}>
            <Plus size={18} />
            +1 000 ₽ демо
          </button>
          <button onClick={sellAll}>
            <Trash2 size={18} />
            Продать всё
          </button>
        </div>
      </header>
      <div className="inventory__stats">
        <article>
          <div className="inventory__stat-icon">
            <Wallet size={18} />
          </div>
          <div>
            <span>Баланс</span>
            <strong>{formatRub(balance)}</strong>
          </div>
        </article>
        <article>
          <span>Предметов</span>
          <strong>{inventory.length}</strong>
        </article>
        <article>
          <span>Стоимость коллекции</span>
          <strong>{formatRub(total)}</strong>
        </article>
      </div>
      {inventory.length === 0 ? (
        <div className="inventory__empty">
          <h2>Пока пусто</h2>
          <p>Открой первый кейс, чтобы получить скин</p>
        </div>
      ) : (
        <div className="grid grid--inventory">
          {inventory.map((item) => (
            <article className="inventory__item" key={item.uid}>
              <SkinVisual item={item} />
              <div className="inventory__item-meta">
                <span className="inventory__item-price">{formatRub(item.price)}</span>
                <span className="inventory__item-badge" style={{ borderColor: rarities[item.rarity].color }}>
                  <span style={{ background: rarities[item.rarity].color }} />
                  {rarities[item.rarity].label}
                </span>
              </div>
              <button onClick={() => sell(item.uid, item.price)}>Продать за {formatRub(Math.round(item.price * 0.9))}</button>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default Inventory
