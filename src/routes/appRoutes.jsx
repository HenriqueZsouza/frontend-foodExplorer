import { Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { Cart } from '../pages/Cart'
import { Orders } from '../pages/Orders'
import { CreateDish } from '../pages/CreateDish'
import { EditDish } from '../pages/EditDish'
import { Details } from '../pages/Details'

export function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createdish" element={<CreateDish />} />
      <Route path="/editdish/:id" element={<EditDish />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  )
}