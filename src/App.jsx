import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Navbar from './components/Navbar.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from './redux/slices/profileSlice.js';
import ProductPage from './pages/ProductPage.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';




function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      dispatch(setUser(JSON.parse(storedUser)));
      dispatch(setToken(JSON.parse(storedToken)));
    }
  }, [dispatch]);
  return (
    <>
      <Navbar></Navbar>
      <div className='pt-10'>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/products" element={<Products />} />


          <Route path="cart" element={user ? <Cart /> : <Navigate to='/login' />} />
            



          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to='/login' />} />


        </Routes>
      </div>
    </>
  )
}

export default App