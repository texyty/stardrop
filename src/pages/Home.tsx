import { Link } from 'react-router-dom'
import { ArrowRight, Package, ShieldCheck, Sparkles, Swords, Zap } from 'lucide-react'
import { cases } from '../data/cases'
import CaseCard from '../components/CaseCard'
import './home.css'

const Home = () => {
  const featured = ['neon', 'dragon', 'elite', 'knife'].map((id) => cases.find((c) => c.id === id)).filter(Boolean) as typeof cases

  return (
    <main className="home">
      <section className="hero">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <Sparkles size={16} />
            <span>Демо-платформа для открытия кейсов</span>
          </div>
          <h1>
            Открывай кейсы и
            <span className="hero__accent">лови редкие дропы</span>
          </h1>
          <p>
            Шесть уникальных кейсов, честный взвешенный рандом, кейс-баттлы против бота и продуманный инвентарь. Всё в
            демо-режиме, без реальных платежей.
          </p>
          <div className="hero__actions">
            <Link to="/cases" className="hero__cta primary">
              <Package size={18} />
              Открыть кейс
            </Link>
            <Link to="/battle" className="hero__cta ghost">
              <Swords size={18} />
              Кейс-батлы
            </Link>
          </div>
          <div className="hero__stats">
            <div>
              <strong>6</strong>
              <span>кейсов на выбор</span>
            </div>
            <div>
              <strong>48</strong>
              <span>предметов в пулах</span>
            </div>
            <div>
              <strong>10000 ₽</strong>
              <span>стартового демо-баланса</span>
            </div>
          </div>
        </div>
        <div className="hero__orb" />
      </section>

      <section className="section">
        <header className="section__header">
          <div>
            <h2>Популярные кейсы</h2>
            <p>От бюджетных до самых желанных ножевых кейсов</p>
          </div>
          <Link to="/cases" className="section__link">
            Все кейсы
            <ArrowRight size={18} />
          </Link>
        </header>
        <div className="grid grid--cases">
          {featured.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      </section>

      <section className="section">
        <header className="section__header">
          <div>
            <h2>Почему Starlight</h2>
            <p>Продуманный UX для комфортного открытия</p>
          </div>
        </header>
        <div className="grid grid--features">
          <article className="feature">
            <div className="feature__icon">
              <Zap size={22} />
            </div>
            <h3>Честный рандом</h3>
            <p>Взвешенный алгоритм с прозрачными шансами для каждого предмета в кейсе.</p>
          </article>
          <article className="feature">
            <div className="feature__icon">
              <Swords size={22} />
            </div>
            <h3>Кейс-баттлы</h3>
            <p>Сразись с ботом и забери оба скина в случае победы. Ничья оставляет скин у тебя.</p>
          </article>
          <article className="feature">
            <div className="feature__icon">
              <ShieldCheck size={22} />
            </div>
            <h3>Демо-режим</h3>
            <p>Весь функционал доступен бесплатно. Баланс, инвентарь и продажи работают локально в браузере.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Home
