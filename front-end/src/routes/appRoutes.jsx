import { Routes, Route } from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { SignIn } from '../pages/SignIn'
import { Home } from '../pages/Home'
import { Cart } from '../pages/Cart'
import { Orders } from '../pages/Orders'


export function AppRoutes() {

  return (
    <Routes>
      <Route path="/register" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />

    </Routes>
  )
}