import { useState } from "react"
import { Link } from "react-router-dom"
import { BsReceipt } from 'react-icons/bs'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { CiEdit } from "react-icons/ci"
import { message } from "antd"

import { Button } from '../Button'
import { ButtonText } from "../ButtonText"

import { useAuth } from "../../contexts/auth"
import { useCart } from '../../contexts/cart'

import { api } from '../../services/api'

import imagePlaceholder from '../../assets/image-not-found-icon.svg'

import { Container, Content, PurchaseCard } from './styles.js'

export function Card({ data, ...rest }) {
  const { user } = useAuth()

  const imageURL = data.image ? `${api.defaults.baseURL}/files/${data.image}` : imagePlaceholder

  const { handleAddDishToCart } = useCart()

  const [quantity, setQuantity] = useState(1)

  const increase = () => {
    if (quantity > 19) {
      message.warning("A quantidade máxima é 20 unidades")
      return
    }
    setQuantity(count => count + 1)
  }

  const decrease = () => {
    if (quantity < 2) {
      message.warning("A quantidade mínima é 1 unidade")
      return
    }
    setQuantity(count => count - 1)
  }

  return (
    <Container {...rest}>
      {user.isAdmin ?

        <Content>
          <div className="container">
            <img src={imageURL} alt="Imagem do prato" />
            <Link to={`/details/${data.id}`}>
              <h3 className="product-title">{data.title}{' >'}</h3>
            </Link>
            <p className="description">{data.description}</p>
            <h1 className="price">R$ {data.price}</h1>
            <Link to={`/editDish/${data.id}`}>
              <Button
                title="Editar prato"
                icon={CiEdit}
              />
            </Link>
          </div>
        </Content>

        :

        <Content>
          <div className="container">
            <img src={imageURL} alt="Imagem do prato" />
            <Link to={`/details/${data.id}`}>
              <h3 className="product-title">{data.title}{' >'} </h3>
            </Link>
            <p className="description">{data.description}</p>
            <h1 className="price">R$ {data.price}</h1>

            <PurchaseCard>
              <div className="counter">
                <ButtonText
                  icon={FiMinus}
                  onClick={decrease}
                />
                <span>{quantity.toString().padStart(2, '0')}</span>
                <ButtonText
                  icon={FiPlus}
                  onClick={increase}
                />
              </div>

              <Button
                title="incluir"
                icon={BsReceipt}
                onClick={() => handleAddDishToCart(data, quantity, imageURL)}
                style={{ height: 56, width: 92, padding: '12px 4px' }}
              />
            </PurchaseCard>
          </div>
        </Content>
      }
    </Container>
  )
}