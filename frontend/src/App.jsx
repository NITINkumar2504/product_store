import { Box } from "@chakra-ui/react"
import { Toaster } from "./components/ui/toaster.jsx"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"

function App() {

  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<CreatePage/>} />
        </Routes>
        <Toaster />
      </Box>
    </>
  )
}

export default App
