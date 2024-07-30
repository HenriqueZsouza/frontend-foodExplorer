import { useEffect } from 'react'
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { api } from '../../services/api'
import { useAuth } from "../../contexts/auth"
import { useCart } from '../../contexts/cart'
import { Container, Content, Table } from "./styles.js"

export function Orders() {
  const { user } = useAuth()
  const { orders, setOrders } = useCart()

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get("/orders")
      setOrders(response.data)
    }

    fetchOrders()
  }, [])

  async function handleOrderStatus(order, event) {
    const statusSelected = event.target.value

    const cart = {
      id: order.id,
      orderStatus: statusSelected,
    }

    await api.put("/orders", cart)
    location.reload()
  }

  function formatDate(date) {
    const dateFormatted = new Date(date)

    const monthFormatted = (dateFormatted.getMonth() + 1).toString().padStart(2, '0')
    const minutesFormatted = dateFormatted.getMinutes().toString().padStart(2, '0')

    return `${dateFormatted.getDate()}/${monthFormatted} às ${dateFormatted.getHours() - 3}h${minutesFormatted}`
  }

  const renderOrderRows = (orders, isAdmin) => {
    return orders.map(order => (
      <tr key={order.id}>
        <td>
          {isAdmin ? (
            <select defaultValue={order.orderStatus} onChange={event => handleOrderStatus(order, event)}>
              <option value="🟡 Pendente">🟡 Pendente</option>
              <option value="🟠 Preparando">🟠 Preparando</option>
              <option value="🟢 Entregue">🟢 Entregue</option>
              <option value="🔴 Cancelado">🔴 Cancelado</option>
            </select>
          ) : (
            order.orderStatus
          )}
        </td>
        <td>0000{order.id}</td>
        <td>
          {order.items.map(item => (
            <span key={item.title}>{item.quantity} x {item.title}, {" "}</span>
          ))}
        </td>
        <td>{formatDate(order.created_at)}</td>
      </tr>
    ))
  }

  return (
    <Container>
      <Header />
      <Content>
        <h1>Pedidos</h1>

        <Table>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Código</th>
                <th>Detalhamento</th>
                <th>Data e hora</th>
              </tr>
            </thead>

            {orders.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="4">
                    <div className="zeroOrders">
                      <p>Não existem pedidos cadastrados ainda!</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="order">
                {renderOrderRows(orders, user.isAdmin)}
              </tbody>
            )}
          </table>
        </Table>
      </Content>
      <Footer />
    </Container>
  )
}