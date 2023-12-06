import { Routes, Route } from "react-router-dom"
import { SignUp } from "../pages/SignUp"

export function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />

    </Routes>
  )
}