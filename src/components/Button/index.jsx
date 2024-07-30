import { Container } from "./styles"

export function Button({ icon: Icon, title, backgroundColor, width, ...rest }) {
  return (
    <Container
      type="button"
      style={{ backgroundColor, width }}
      {...rest}
    >
      {Icon && <Icon size={21} />}
      {title}
    </Container>
  )
}