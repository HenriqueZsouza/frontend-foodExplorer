import { Container, Content, Logo } from './styles'
import logo_gray from '../../assets/logo_gray.svg'

export const Footer = () => {
  return (
    <Container>
      <Content>
        <Logo>
          <div className="logo">
            <img src={logo_gray} alt="logo" />
            <span>food explorer</span>
          </div>
        </Logo>
        <p>
          © 2024 - Todos os direitos reservados.
        </p>
      </Content>
    </Container>
  )
}