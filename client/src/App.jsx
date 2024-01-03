import { Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import Header from "../components/header"
import Update from "../pages/update"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/restaurants/:id/update" element={<Update />} />
        <Route exact path="/restaurants/:id" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
