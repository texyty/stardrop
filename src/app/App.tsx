import { Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Cases from '../pages/Cases'
import Battle from '../pages/Battle'
import Inventory from '../pages/Inventory'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Toast from '../components/Toast'

const App = () => {
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
