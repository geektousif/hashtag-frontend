import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AdminHome from "./pages/admin/Home";

import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/admin/Products";
import MultipleImages from "./pages/admin/MultipleImages";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productPage/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />

        {/* TODO: PROTECT ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <AdminHome />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/products/:id/images"
          element={
            <ProtectedRoutes>
              <MultipleImages />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
