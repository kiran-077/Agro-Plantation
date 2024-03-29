import {Routes,Route,Navigate}from "react-router-dom"
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import ProductDetails from '../pages/ProductDetails'
import Shop from '../pages/Shop'
import Signup from '../pages/Signup'
import ProtectedRoute from "./ProtectedRoute"
import Dashboard from "../admin/Dashboard"
import AddProduct from "../admin/AddProduct"
import AllProdcut from "../admin/AllProdcut"
import Users from "../admin/Users"
import Orders from "../admin/Orders"


const Routers = () => {
  return ( 
  <Routes>
    <Route path="/" element={<Navigate to="home"/>} />
    <Route path="home" element={<Home/>}/>
    <Route path="cart" element={<Cart/>}/>
    
    <Route path="login" element={<Login/>}/>
    <Route path="shop/:id" element={<ProductDetails/>}/>
    <Route path="shop" element={<Shop/>}/>
    <Route path="signup" element={<Signup/>}/>

    <Route path="/*" element={<ProtectedRoute/>}>

      <Route path="checkout" element={<Checkout/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      
      <Route path="dashboard/all-products" element={<AllProdcut/>}/>
      
      <Route path="dashboard/add-product" element={<AddProduct/>}/>
      <Route path="dashboard/users" element={<Users/>}/>
      <Route path="dashboard/orders" element={<Orders/>}/>
      
     

    </Route>
  

      {/* <Route path="checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/> */}
      
    
  </Routes>
  );
}

export default Routers