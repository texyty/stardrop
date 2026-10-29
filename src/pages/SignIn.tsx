import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import useStore from '../store/useStore'
import { toast } from '../components/Toast'
import './auth.css'

const FAIL_REASONS: Record<string, string> = {
  failed: 'Steam-авторизация не прошла. Попробуй ещё раз.'
}

const SignIn = () => {
  const navigate = useNavigate()
  const { authenticate } = useStore()
  const [searchParams] = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const steamError = searchParams.get('steam')

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
    const user = authenticate(username, password)
    if (!user) {
      setError('Неверный никнейм или пароль')
      return
    }
    toast(`С возвращением, ${user.username}!`)
    navigate('/inventory')
  }

  return (
    <main className="auth">
      <div className="auth__card">
        <header className="auth__header">
          <h1>С возвращением</h1>
          <p>Войдите, чтобы продолжить сбор коллекции</p>
        </header>
        <form onSubmit={submit} className="auth__form">
          {error && <div className="auth__error">{error}</div>}
          <label className="auth__field">
            <span>Никнейм</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="starlight_player" />
          </label>
          <label className="auth__field">
            <span>Пароль</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>
          <button type="submit" className="auth__submit">
            Войти
          </button>
        </form>
        <div className="auth__divider">
          <span>или войти через</span>
        </div>
        <a className="auth__steam" href="/api/auth/steam">
          <span className="auth__steam-icon">S</span>
          <span>Войти через Steam</span>
        </a>
        {steamError && FAIL_REASONS[steamError] && <div className="auth__error" style={{ marginTop: 14 }}>{FAIL_REASONS[steamError]}</div>}
        <footer className="auth__footer">
          <span>Нет аккаунта?</span>
          <Link to="/signup">Создать</Link>
        </footer>
      </div>
    </main>
  )
}

export default SignIn
