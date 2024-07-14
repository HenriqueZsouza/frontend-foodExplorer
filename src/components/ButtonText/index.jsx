import { Container } from './styles'

export const ButtonText = ({ icon: Icon, title, ...rest }) => {
  return (
    <Container
      type="button"
      {...rest}
    >
      {Icon && <Icon size={34} />}
      {title}
    </Container>
  )
}