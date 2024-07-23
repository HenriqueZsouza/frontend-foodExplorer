import { Link } from "react-router-dom"
import { BsReceipt } from 'react-icons/bs'
import { FiSearch, FiLogOut, FiUser, FiShoppingBag, FiHeart, FiPlus } from 'react-icons/fi'

import { Button } from '../Button'
import { useCart } from '../../contexts/cart'
import { useAuth } from '../../contexts/auth'
import logo from '../../assets/logo.svg'
import { Container, Content, Logo, Search, Logout, ButtonStyle, ButtonMenu, Profile } from "./styles"

export function Header({ search }) {
  const { user } = useAuth()
  const { signOut } = useAuth()

  const { cart, orders } = useCart()

  function mobileMenu() {
    document.getElementById('hamburger').classList.toggle('active')
    document.getElementById('nav-menu').classList.toggle('active')
  }

  return (
    <Container>
      <Content>
        <Logo>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
              <h1>food explorer</h1>
            </Link>
          </div>
        </Logo>

        <div className="hamburger" id="hamburger" onClick={mobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="nav-menu" id="nav-menu">
          <Search>
            <label>
              <FiSearch size={24} />
              <input
                type="text"
                placeholder="Busque pelas opções de pratos"
                onChange={e => { search(e.target.value) }}
              />
            </label>
          </Search>

          {user.isAdmin ?
            <>
              <Link to="/createdish">
                <Button
                  title="Criar novo Prato"
                  icon={FiPlus}
                />
              </Link>

              <Link to="/orders">
                <ButtonStyle
                  type='button'
                >
                  <BsReceipt size={24} />
                  Pedidos <span>({cart.length})</span>
                </ButtonStyle>
              </Link>
            </>
            : <>
              <Link to="/cart">
                <ButtonStyle
                  type='button'
                >
                  <BsReceipt size={24} />
                  Pedidos <span>({cart.length})</span>
                </ButtonStyle>
              </Link>
            </>}

          <Logout to="/" onClick={signOut}>
            <FiLogOut />
          </Logout>
        </div>

      </Content>
    </Container>
  )
}