import { BrowserRouter } from "react-router-dom"
import { useAuth } from "../contexts/auth"

import { AppRoutes } from "./appRoutes"
import { AuthRoutes } from "./auth.routes"

export const Routes = () => {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  )
}