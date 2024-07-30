import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/navigation"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Card } from "../../components/Card"
import background from "../../assets/Mask group.png"
import { api } from '../../services/api'

import { Container, Content, Banner } from "./styles.js"

export function Home() {
  const [dishes, setDishes] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchDishes() {
      const response = await api.get(`/dishes?title=${search}`)
      setDishes(response.data)
    }
    fetchDishes()
  }, [search])

  const renderSwiper = (category, title) => {
    const filteredDishes = dishes.filter(dish => dish.category === category)

    return filteredDishes.length > 0 && (
      <>
        <p>{title}</p>
        <Swiper
          grabCursor={true}
          loop={true}
          loopFillGroupWithBlank={true}
          breakpoints={{
            "@0.00": { slidesPerView: 1, spaceBetween: 10 },
            "@0.75": { slidesPerView: 2, spaceBetween: 20 },
            "@1.00": { slidesPerView: 3, spaceBetween: 40 },
            "@1.20": { slidesPerView: 4, spaceBetween: 160 },
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {filteredDishes.map(dish => (
            <SwiperSlide key={dish.id}>
              <Card data={dish} />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  }

  return (
    <Container>
      <Header search={setSearch} />
      <Content>
        <Banner>
          <img src={background} alt="Imagem de ingredientes" />
          <div className="banner">
            <div className="title">
              <h1>Sabores inigualáveis</h1>
              <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
            </div>
          </div>
        </Banner>
        <div className="cards">
          {renderSwiper("dishes", "Refeições")}
          {renderSwiper("dessert", "Sobremesas")}
          {renderSwiper("drinks", "Bebidas")}
        </div>
      </Content>
      <Footer />
    </Container>
  )
}