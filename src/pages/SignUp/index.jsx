import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { message } from "antd"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import { api } from "../../services/api"

import { Container, Form, Logo } from "./styles"

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  function handleSignUp() {
    if (!name || !email || !password) {
      return (
        message.warning("Preencha todos os campos!")
      )
    }

    setLoading(true)

    api.post("/users", { name, email, password })
      .then(() => {
        message.success("Usuário cadastrado com sucesso!")
        navigate(-1)
        setLoading(false)
      })
      .catch(error => {
        if (error.response) {
          message.warning("Não foi possível cadastrar!")
        } else {
          console.error(error.response.data.message)
        }
        setLoading(false)
      })
  }

  return (
    <Container>

      <Logo>
        <div className="logo">
          <svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0635 0.306641L25.7096 7.60782V22.2102L13.0635 29.5114L0.417527 22.2102V7.60782L13.0635 0.306641Z" fill="#065E7C" />
          </svg>
          <h1>Food Explorer</h1>
        </div>
      </Logo>

      <Form>
        <h2>Crie sua conta</h2>

        <div className="inputs">
          <p>Seu nome</p>
          <Input
            placeholder="Exemplo: João da Silva"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="inputs">
          <p>Email</p>
          <Input
            placeholder="Exemplo: exemplo@exemplo.com"
            type="text"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="inputs">
          <p>Senha</p>
          <Input
            placeholder="No mínimo 6 caracteres"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <Button
          title={loading ? "Cadastrando" : "Criar conta"}
          onClick={handleSignUp}
          disabled={loading}
        />

        <Link onClick={handleBack}>
          Já tenho uma conta
        </Link>

      </Form>
    </Container>
  )
}
