import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Notfound from "./components/Notfound/Notfound";
import Wishlist from "./components/Wishlist/Wishlist";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Address from "./components/Address/Address";
import Forgetpassword from "./components/Forgetpassword/Forgetpassword";

import { Toaster } from "react-hot-toast";
import WishListContextProvider from "./Context/WishListContext";
import SetNewPassword from "./components/SetNewPassword/SetNewPassword";
import Verifycode from "./components/Verifycode/Verifycode";

let routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgetpassword", element: <Forgetpassword /> },
      { path: "verifycode", element: <Verifycode /> },
      { path: "setnewpassword", element: <SetNewPassword /> },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/allorders",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <WishListContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </UserContextProvider>
          <Toaster />
        </CartContextProvider>
      </WishListContextProvider>
    </>
  );
}

export default App;
