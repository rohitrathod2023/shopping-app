import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import ProductListingPage from "./pages/ProductListingPage"
import CartPage from "./pages/CartPage"
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="">
      <Navbar/>
      <CartProvider>
      <Routes>
        <Route path="/" element={<ProductListingPage/>}/>
        <Route path="/cart" element={<CartPage/>} />
      </Routes>
      </CartProvider>

    </div>
  )
}

export default App
