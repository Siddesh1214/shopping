import React from 'react'
import { useSelector } from 'react-redux'

function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <h1>toal {getTotal}</h1>
  )
}

export default Checkout