import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsReceipt } from 'react-icons/bs'
import { message } from 'antd'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { OrderCard } from '../../components/OrderCard'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { PageError } from '../../components/PageError'

import { api } from '../../services/api'
import { useAuth } from '../../contexts/auth'
import { useCart } from '../../contexts/cart'

import logoPix from '../../assets/pix.svg'
import cardImg from '../../assets/CreditCard.svg'
import qrCode from '../../assets/qrcode.svg'
import cartImg from '../../assets/cart.svg'
import clock from '../../assets/clock.svg'
import checkCircle from '../../assets/CheckCircle.svg'

import { Container, Content, PaymentCard } from './styles.js'

export function Cart() {
  const { user } = useAuth()
  const { cart, total, handleResetCart } = useCart()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [status, setStatus] = useState('cart')
  const [num, setNum] = useState('')
  const [cvc, setCvc] = useState('')
  const [disabledButton, setDisabledButton] = useState(false)

  const isPix = paymentMethod === 'pix'
  const isCredit = paymentMethod === 'creditCard'

  const handleCreatedCart = cart => ({
    orderStatus: '🔴 Pendente',
    paymentMethod: isPix ? 'pix' : 'creditCard',
    totalPrice: total,
    cart: cart.map(item => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
    })),
  })

  const validatePayment = () => {
    if (cart.length < 1) {
      navigate(-1)
      message.warning('Seu pedido está vazio!')
      return false
    }
    if (!isPix && num.length < 16) {
      message.warning('Número de cartão incorreto!')
      return false
    }
    if (!isPix && !date) {
      message.warning('Validade do cartão incorreta!')
      return false
    }
    if (!isPix && cvc.length < 3) {
      message.warning('CVC do cartão incorreto!')
      return false
    }
    return true
  }

  const handleFinishPayment = async cart => {
    if (!validatePayment()) return

    setLoading(true)
    const newCart = handleCreatedCart(cart)

    try {
      await api.post('/orders', newCart)
      disableButton()
      setTimeout(() => {
        message.success('Pedido cadastrado com sucesso!')
        navigate(-1)
        handleResetCart()
      }, 7000)
    } catch (error) {
      message.warning(error.response?.data?.message || 'Não foi possível cadastrar pedido')
    } finally {
      setLoading(false)
    }
  }

  const handleNumChange = event => setNum(event.target.value.slice(0, 16))
  const handleCvcChange = event => setCvc(event.target.value.slice(0, 3))

  const handlePaymentSelect = method => {
    setPaymentMethod(method)
    setStatus('payment')
  }

  const disableButton = () => {
    setDisabledButton(true)
    setStatus('clock')
    setTimeout(() => setStatus('approved'), 4000)
  }

  const renderPaymentBody = () => {
    switch (status) {
      case 'cart':
        return (
          <div className="cart">
            <img src={cartImg} alt="Imagem do pedido de compras" />
            <p>Selecione uma forma de pagamento acima!</p>
          </div>
        )
      case 'payment':
        return isPix ? (
          <div id="paymentPix">
            <div className="qr">
              <img src={qrCode} alt="Imagem do QRCode" />
            </div>
            <Button
              title={loading ? 'Finalizando pagamento' : 'Finalizar pagamento'}
              disabled={loading}
              icon={BsReceipt}
              style={{ height: 56 }}
              className="finishPaymentButton"
              onClick={() => handleFinishPayment(cart)}
            />
          </div>
        ) : (
          <div className="paymentCredit">
            <div className="inputs">
              <p>Número do Cartão</p>
              <Input
                placeholder="0000 0000 0000 0000"
                type="number"
                id="num"
                name="num"
                value={num}
                onChange={handleNumChange}
              />
            </div>
            <div className="validTo">
              <div>
                <p>Validade</p>
                <Input placeholder="MM/AA" type="text" id="date" name="date" maxLength="5" />
              </div>
              <div>
                <p>CVC</p>
                <Input
                  placeholder="***"
                  type="number"
                  id="cvc"
                  name="cvc"
                  value={cvc}
                  onChange={handleCvcChange}
                />
              </div>
            </div>
            <Button
              title={loading ? 'Finalizando pagamento' : 'Finalizar pagamento'}
              disabled={loading}
              icon={BsReceipt}
              style={{ height: 56 }}
              className="finishPaymentButton"
              onClick={() => handleFinishPayment(cart)}
            />
          </div>
        )
      case 'clock':
        return (
          <div className="clock">
            <img src={clock} alt="Imagem do QRCode" />
            <p>Aguarde: Estamos processando o seu pagamento</p>
          </div>
        )
      case 'approved':
        return (
          <div className="approved">
            <img src={checkCircle} alt="Imagem de pagamento aprovado" />
            <p>Oba! Pagamento aprovado! Em breve faremos a entrega!</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Container>
      <Header />
      {user.isAdmin ? (
        <PageError />
      ) : (
        <Content>
          <div className="card-wrapper">
            <div className="order-wrapper">
              <h2>Meu pedido</h2>
              <div className="details">
                {cart.map(item => (
                  <OrderCard key={String(item.id)} data={item} />
                ))}
              </div>
              <div className="total">
                <p>
                  Total: R$<span>{total}</span>
                </p>
              </div>
            </div>
            <PaymentCard>
              <div className="paymentHeader">
                <h2>Pagamento</h2>
                <div className="buttons">
                  <button
                    className={isPix ? 'active' : ''}
                    disabled={disabledButton}
                    onClick={() => handlePaymentSelect('pix')}
                  >
                    <img src={logoPix} alt="Logo Pix" />
                    PIX
                  </button>
                  <button
                    className={isCredit ? 'active' : ''}
                    disabled={disabledButton}
                    onClick={() => handlePaymentSelect('creditCard')}
                  >
                    <img src={cardImg} alt="Logo Cartão de Crédito" />
                    Crédito
                  </button>
                </div>
              </div>
              <div className="paymentBody">{renderPaymentBody()}</div>
            </PaymentCard>
          </div>
        </Content>
      )}
      <Footer />
    </Container>
  )
}