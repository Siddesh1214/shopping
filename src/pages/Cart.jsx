import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeProduct,
  clearCart,
} from "../redux/slices/cartSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createOrder } from "../services/order";
import toast from "react-hot-toast";



const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  // console.log('user is  ', user);
  // console.log('cartItems is  ', cartItems);

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const handleCheckoutFn = async () => {
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    const orderData = {
      items: cartItems,
      totalAmount: getTotal(),
      shippingAddress: address
    };

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: orderData.totalAmount * 100,
      currency: "INR",
      name: "Shopping Store",
      description: "Purcahsing Items",
      handler: async function (response) {
        try {
          const orderRes = await createOrder(user.uid, cartItems, getTotal(), address,response.razorpay_payment_id);
          setAddress('');
          console.log('order response ', orderRes)
          toast.success('Payment is Sccessful, Order Placed')
          dispatch(clearCart());
          navigate('/orders');
          
        } catch (error) {
          toast.error("Failed to store order. Please try again.");
          console.error(error);
        }
      },
      prefill: {
        name: 'customer',
        email: user?.email
      },
      theme: {
        color: "#6bcdfe",
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-600 underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex gap-4 items-center">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-semibold">₹{(item.quantity * item.price).toFixed(2)}</span>
                <button
                  onClick={() => dispatch(removeProduct(item.id))}
                  className="text-red-500 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-14 justify-between">
            <div>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="text-right mt-6">
              <h2 className="text-xl font-bold">Total: ₹{getTotal()}</h2>
              <button onClick={()=>handleCheckoutFn()} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartPage;
