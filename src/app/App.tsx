import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Cases from '../pages/Cases'
import Battle from '../pages/Battle'
import Inventory from '../pages/Inventory'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Toast, { toast } from '../components/Toast'
import useStore from '../store/useStore'

const App = () => {
  const navigate = useNavigate()
  const setUser = useStore((state) => state.setUser)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const session = params.get('session')
    if (!session) return

    params.delete('session')
    const cleanSearch = params.toString()
    window.history.replaceState({}, '', window.location.pathname + (cleanSearch ? `?${cleanSearch}` : ''))

    fetch(`/api/auth/verify?session=${encodeURIComponent(session)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (data?.profile) {
          setUser(data.profile)
          toast(`Привет, ${data.profile.username}!`)
          navigate('/inventory', { replace: true })
        }
      })
      .catch(() => toast('Steam-сессия недействительна'))
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
      <Toast />
    </>
  )
}

export default App
