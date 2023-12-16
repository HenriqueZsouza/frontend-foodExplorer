import { Routes, Route } from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { SignIn } from '../pages/SignIn'
import { Home } from '../pages/Home'
import { Cart } from '../pages/Cart'

export function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />



    </Routes>
  )
}