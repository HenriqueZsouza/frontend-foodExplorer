import { useState, useEffect } from "react"
import { message } from "antd"
import { useParams, Link, useNavigate } from "react-router-dom"
import { RiArrowLeftSLine } from "react-icons/ri"
import { FiMinus, FiPlus } from "react-icons/fi"
import { BsReceipt } from "react-icons/bs"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { ButtonText } from "../../components/ButtonText"
import { Ingredients } from "../../components/Ingredients"
import { Button } from "../../components/Button"

import { api } from "../../services/api"
import { useAuth } from "../../contexts/auth"
import { useCart } from "../../contexts/cart"

import { Container, Content, Ingredient, PurchaseCard } from "./styles.js"

export function Details() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { handleAddDishToCart } = useCart()

  useEffect(() => {
    const fetchDishDetail = async () => {
      const response = await api.get(`/dishes/${id}`)
      setData(response.data)
    }
    fetchDishDetail()
  }, [id])

  const imageURL = data && `${api.defaults.baseURL}/files/${data.image}`

  const increaseQuantity = () => {
    if (quantity >= 20) {
      message.warning("A quantidade máxima é 20 unidades")
      return
    }
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      message.warning("A quantidade mínima é 1 unidade")
      return
    }
    setQuantity(prev => prev - 1)
  }

  const handleBack = () => navigate(-1)

  const renderIngredients = () => (
    <Ingredient>
      {data.ingredients.map(ingredient => (
        <Ingredients key={ingredient.id} ingredient={ingredient.name} />
      ))}
    </Ingredient>
  )

  const renderPurchaseCard = () => {
    if (user.isAdmin) {
      return (
        <PurchaseCard>
          <Link to={`/editdish/${data.id}`}>
            <Button title="Editar prato" icon={BsReceipt} />
          </Link>
        </PurchaseCard>
      )
    }
    return (
      <PurchaseCard>
        <div className="counter">
          <ButtonText icon={FiMinus} onClick={decreaseQuantity} />
          <span>{quantity.toString().padStart(2, "0")}</span>
          <ButtonText icon={FiPlus} onClick={increaseQuantity} />
        </div>
        <Button
          title="Incluir"
          icon={BsReceipt}
          onClick={() => handleAddDishToCart(data, quantity, imageURL)}
          style={{ height: 56, width: 92, padding: "12px 4px" }}
        />
      </PurchaseCard>
    )
  }

  return (
    <Container>
      <Header />
      {data && (
        <Content>
          <Link>
            <ButtonText title="Voltar" icon={RiArrowLeftSLine} onClick={handleBack} />
          </Link>
          <div className="content">
            <div className="dish">
              <img src={imageURL} alt="Prato" />
              <div className="description">
                <h1>{data.title}</h1>
                <h3>{data.description}</h3>
                {renderIngredients()}
                <div className="price">
                  <h4>R$ {data.price}</h4>
                  {renderPurchaseCard()}
                </div>
              </div>
            </div>
          </div>
        </Content>
      )}
      <Footer />
    </Container>
  )
}