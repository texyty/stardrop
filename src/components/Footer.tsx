import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-badge">
              <Sparkles size={18} />
            </span>
            <span>Starlight</span>
          </div>
          <p>Демо-платформа для открытия кейсов CS2. Все средства и предметы вымышлены.</p>
          <span className="footer__copy">© 2026 Starlight Cases</span>
        </div>
        <div className="footer__group">
          <h4>Платформа</h4>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/cases">Кейсы</Link></li>
            <li><Link to="/battle">Кейс-батлы</Link></li>
            <li><Link to="/inventory">Инвентарь</Link></li>
          </ul>
        </div>
        <div className="footer__group">
          <h4>Аккаунт</h4>
          <ul>
            <li><Link to="/signin">Вход</Link></li>
            <li><Link to="/signup">Регистрация</Link></li>
          </ul>
        </div>
        <div className="footer__group">
          <h4>Информация</h4>
          <ul>
            <li><a href="#">Правила</a></li>
            <li><a href="#">Конфиденциальность</a></li>
            <li><a href="#">Поддержка</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
