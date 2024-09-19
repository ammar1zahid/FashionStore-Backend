import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Topbar from "./components/topBar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import UserList from "./pages/userlist/Userlist";
import User from "./pages/userPage/user";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productlist/Productlist";
import Product from "./pages/productPage/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import "./app.css";
import { RootState } from "./redux/store";

function App() {
  
  // Get the current user's admin status from the Redux store
  const currentUser = useSelector((state : RootState) => state.user.currentUser);
  const isAdmin = currentUser?.isAdmin;
  

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />

        {/* Private Routes for Admins */}
        {isAdmin && (
          <>
            <Route
              path="*"
              element={
                <>
                  <Topbar />
                  <div className="container">
                    <Sidebar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/users" element={<UserList />} />
                      <Route path="/user/:id" element={<User />} />
                      <Route path="/newUser" element={<NewUser />} />
                      <Route path="/products" element={<ProductList />} />
                      <Route path="/product/:id" element={<Product />} />
                      <Route path="/newproduct" element={<NewProduct />} />
                    </Routes>
                  </div>
                </>
              }
            />
          </>
        )}

        {/* If not admin or not logged in, redirect to login */}
        {!isAdmin && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
