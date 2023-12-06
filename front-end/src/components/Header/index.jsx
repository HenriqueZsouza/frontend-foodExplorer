import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'

import { FiSearch, FiLogOut, FiUser, FiShoppingBag, FiHeart } from 'react-icons/fi'
import { BsReceipt } from 'react-icons/bs'

import { Container, Content, Logo, Search, Logout, Button, ButtonMenu, Profile } from './styles'

export const Header = () => {
  return (
    <Container>
      <Content>
        <Logo>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <h1>food explorer</h1>
            </Link>
          </div>
        </Logo>

        <div className="hamburger" id="hamburger">
          {/* // onClick={mobileMenu}> */}
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
              // onChange={e => { search(e.target.value) }}
              />
            </label>
          </Search>

          {
            user.isAdmin ?

              <Link to="/orders">
                <Button
                  type='button'
                >
                  <BsReceipt size={24} />
                  Ver pedidos <span>({orders.length})</span>
                </Button>
              </Link>

              :

              <Link to="/cart">
                <Button
                  type='button'
                >
                  <BsReceipt size={24} />
                  Carrinho <span>({cart.length})</span>
                </Button>
              </Link>
          }

          {
            user.isAdmin ?

              <Link to="/profile">
                <Profile>
                  <FiUser />
                </Profile>
              </Link>

              :

              <Profile onClick={userMenu}>
                <FiUser />
                <div className="user-menu" id="user-menu">
                  <Link to="/orders">
                    <ButtonMenu>
                      <FiShoppingBag size={24} />
                      Meus Pedidos
                    </ButtonMenu>
                  </Link>

                  <Link to="/">
                    <ButtonMenu onClick={favoritesFilter}>
                      <FiHeart size={24} />
                      Meus Favoritos
                    </ButtonMenu>
                  </Link>

                  <Link to="/profile">
                    <ButtonMenu>
                      <FiUser size={24} />
                      Meu Perfil
                    </ButtonMenu>
                  </Link>
                </div>
              </Profile>
          }

          <Logout to="/" onClick={signOut}>
            <FiLogOut />
          </Logout>
        </div>

      </Content>
    </Container >
  )
}
