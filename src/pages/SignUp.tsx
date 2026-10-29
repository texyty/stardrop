import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'
import { toast } from '../components/Toast'
import './auth.css'

const SignUp = () => {
  const navigate = useNavigate()
  const { register } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (username.trim().length < 3) {
      setError('Никнейм должен быть не короче 3 символов')
      return
    }
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов')
      return
    }
    if (password !== confirm) {
      setError('Пароли не совпадают')
      return
    }
    const ok = register(username, password)
    if (!ok) {
      setError('Аккаунт с таким никнеймом уже существует')
      return
    }
    toast(`Добро пожаловать, ${username.trim()}!`)
    navigate('/inventory')
  }

  return (
    <main className="auth">
      <div className="auth__card">
        <header className="auth__header">
          <h1>Создать аккаунт</h1>
          <p>Регистрация занимает секунду</p>
        </header>
        <form onSubmit={submit} className="auth__form">
          {error && <div className="auth__error">{error}</div>}
          <label className="auth__field">
            <span>Никнейм</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="starlight_player" />
          </label>
          <label className="auth__field">
            <span>Пароль</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Минимум 6 символов" />
          </label>
          <label className="auth__field">
            <span>Повторите пароль</span>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
          </label>
          <button type="submit" className="auth__submit">
            Зарегистрироваться
          </button>
        </form>
        <footer className="auth__footer">
          <span>Уже есть аккаунт?</span>
          <Link to="/signin">Войти</Link>
        </footer>
      </div>
    </main>
  )
}

export default SignUp
