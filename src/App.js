import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewBanner from "./pages/newBanner/NewBanner";
import ProductList from "./pages/productList/ProductList";
import BannerList from "./pages/bannerList/BannerList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Banner from "./pages/banner/Banner";
import FeedBackList from "./pages/feedbackList/feedbackList"
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";
import Sales from "./pages/Sales/Sales";

function App() {

  const admin = useSelector((state) => state.user?.currentUser);
  
  return (
    <Router>
      {admin && (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newBanner" element={<NewBanner />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newProduct" element={<NewProduct />} />
              <Route path="/banners" element={<BannerList />} />
              <Route path="/banners/:bannerId" element={<Banner />} />
              <Route path="/feedbacks" element={<FeedBackList />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/:orderId" element={<Order />} />
              <Route path="/sales" element={<Sales />} />
            </Routes>
          </div>
        </>
      )}
      {!admin && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
