import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  addProduct,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} from '../redux/slices/cartSlice';
import { Navigate, useNavigate } from 'react-router-dom';


function ProductCard({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user || Object.keys(user).length === 0) {
      toast.error('Please log in or register to add items to the cart.');
      return;
    }
    dispatch(addProduct(product));
    toast.success(`${product.title} added to cart`);
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    if (cartItem.quantity === 1) {
      dispatch(removeProduct(product.id));
      toast.success(`${product.title} removed from cart`);
    } else {
      dispatch(decrementQuantity(product.id));
    }
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  }
  return (
    <div className="bg-white shadow rounded-lg p-4 border flex flex-col" >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-3"
      />
      <h2 className="text-md font-semibold">{product.title}</h2>
      <p className="text-sm text-gray-600">{product.description.slice(0, 80)}...</p>
      <span className="text-green-600 font-bold mt-2">₹{product.price}</span>

      <div className="mt-4 flex flex-col gap-4">
        {cartItem ? (
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleDecrement}
              className="bg-red-500 text-white px-3 py-1 rounded  cursor-pointer"
            >
              -
            </button>
            <span className="font-medium">{cartItem.quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-green-500 text-white px-3 py-1 rounded  cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        )}
        <button
        onClick={() => handleClick(product.id)}
        className="w-full bg-gray-200 text-black py-2 rounded  cursor-pointer hover:bg-gray-300 transition"
      >
        View Product
      </button>
      </div>
    </div>
  );
}

export default ProductCard;
