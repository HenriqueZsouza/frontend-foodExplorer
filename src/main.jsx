import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes/index.jsx'

import { AuthProvider } from './contexts/auth.jsx'
import { CartProvider } from './contexts/cart.jsx'
import { FavoritesProvider } from './contexts/favorites.jsx'

import darkTheme from './styles/theme.js'
import GlobalStyles from './styles/global.js'

import { ThemeProvider } from 'styled-components'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)