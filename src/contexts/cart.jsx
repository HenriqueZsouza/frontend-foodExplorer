import { createContext, useContext, useState, useEffect } from 'react'
import { message } from 'antd'

export const CartContext = createContext()

function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem(`foodexplorer:cart`)) || [])

  const [orders, setOrders] = useState([])

  function handleAddDishToCart(data, quantity, image) {

    try {
      const { id, title, price } = data
      const priceFormatted = quantity * Number(price.replace(',', '.'))

      const order = { id, title, price: priceFormatted, image, quantity }

      const orderExists = cart.some((userOrder) => userOrder.title === order.title)
      if (orderExists) {
        return message.warning("Esse item já está no pedido")
      }

      setCart(prevState => [...prevState, order])
    } catch (error) {
      if (error.response) {
        message.warning(error.response.data.message)
      } else {
        message.warning("Não foi possível adicionar o item ao pedido")
      }
    }

    message.success("Item adicionado ao pedido")
  }

  function handleRemoveDishFromCart(deleted) {
    setCart(prevState => prevState.filter(item => item.id !== deleted))
  }

  const total = cart.reduce((value, item) => {
    return value + item.price
  }, 0)

  async function handleResetCart() {
    localStorage.removeItem(`foodexplorer:cart`)
    setCart([])
  }

  useEffect(() => {
    localStorage.setItem(`foodexplorer:cart`, JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext.Provider value={{
      cart,
      handleAddDishToCart,
      handleRemoveDishFromCart,
      total: String(total.toFixed(2)).replace('.', ','),
      orders,
      setOrders,
      handleResetCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  return context
}

export { CartProvider, useCart }
