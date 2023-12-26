import { Routes, Route } from 'react-router-dom'
import { SignUp } from '../pages/SignUp'
import { SignIn } from '../pages/SignIn'
import { Home } from '../pages/Home'
import { Cart } from '../pages/Cart'
import { Orders } from '../pages/Orders'
import { Profile } from '../pages/Profile'
import { CreateDish } from '../pages/CreateDish'

export function AppRoutes() {

  return (
    <Routes>
      <Route path="/registrar" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/pedidos" element={<Orders />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/criarprato" element={<CreateDish />} />

    </Routes>
  )
}