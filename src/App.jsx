import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./CartContext.js";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import CartDisplay from "./pages/CartDisplay";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/catalog" element={<Catalog />}></Route>
          <Route path="/catalog/:id" element={<Product />}></Route>
          <Route path="/cart" element={<CartDisplay />}></Route>
          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
