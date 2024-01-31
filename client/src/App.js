import { useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
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
        <Route element={<AuthLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
