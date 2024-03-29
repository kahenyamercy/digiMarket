import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import CategoryShop from "./pages/CategoryShop";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
function App() {
  const { userInfo } = useSelector((state) => state.user);

  const AuthLayout = () => {
    if (userInfo) {
      return <Outlet />;
    } else {
      return <Navigate to={"/login"} replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shop/products/:id' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/' element={<Home />} />
          <Route path='/shop/category/:id' element={<CategoryShop />} />
        <Route element={<AuthLayout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders/:id' element={<Order />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
