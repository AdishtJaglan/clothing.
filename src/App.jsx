import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
        <Route path="/catalog/:id" element={<Product />}></Route>
        <Route path="*" element={<Navigate to="/home" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
