import { Container } from "./styles"

export function Button({ icon: Icon, title, backgroundColor, ...rest }) {
  return (
    <Container
      type="button"
      style={{ backgroundColor }}
      {...rest}
    >
      {Icon && <Icon size={21} />}
      {title}
    </Container>
  )
}