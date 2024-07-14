import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes/index.jsx'

import { AuthProvider } from './contexts/auth.jsx'
import { CartProvider } from './contexts/cart.jsx'
import { FavoritesProvider } from './contexts/favorites.jsx'

import "./styles/global"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Routes />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)