import { Link, NavLink } from 'react-router-dom'
import { Package, Swords, Boxes, LogIn, Sparkles, Wallet, Menu, X } from 'lucide-react'
import { useState } from 'react'
import useStore from '../store/useStore'
import { formatRub } from '../lib/format'
import './header.css'

const Header = () => {
  const [open, setOpen] = useState(false)
  const user = useStore((state) => state.user)
  const balance = useStore((state) => state.balance)

  const links = [
    { to: '/', label: 'Главная', icon: Sparkles },
    { to: '/cases', label: 'Кейсы', icon: Package },
    { to: '/battle', label: 'Кейс-батлы', icon: Swords },
    { to: '/inventory', label: 'Инвентарь', icon: Boxes }
  ]

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-badge">
            <Sparkles size={18} />
          </span>
          <span className="header__logo-text">Starlight</span>
        </Link>
        <nav className={`header__nav ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `header__link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <link.icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <Link to="/inventory" className="header__balance">
            <Wallet size={18} />
            <span>{formatRub(balance)}</span>
          </Link>
          {user ? (
            <Link to="/inventory" className="header__user">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="header__user-avatar header__user-avatar-img" referrerPolicy="no-referrer" />
              ) : (
                <span className="header__user-avatar">{user.username.slice(0, 1).toUpperCase()}</span>
              )}
              <span className="header__user-name">{user.username}</span>
            </Link>
          ) : (
            <button className="header__login" onClick={() => { window.location.href = '/api/auth/steam' }}>
              <LogIn size={18} />
              <span>Войти</span>
            </button>
          )}
          <button className="header__menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
