import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  addProduct,
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} from '../redux/slices/cartSlice';
import ProductCard from '../components/ProductCard'; 
import apiCall from '../services/apiCall';

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === Number(id));

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiCall(`https://fakestoreapi.com/products/${id}`, 'GET');
        setProduct(data.data);

        const similarRes = await apiCall(`https://fakestoreapi.com/products/category/${data.data.category}`, 'GET');
        const filtered = similarRes.data.filter(p => p.id !== Number(id));
        setSimilarProducts(filtered);
      } catch (err) {
        setError('Failed to fetch product details');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.title} className="w-full max-h-[400px] object-contain rounded-lg shadow-md" />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-green-600 font-semibold mb-2">₹{product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>

          <div className="mt-4">
            {cartItem ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrement}
                  className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{cartItem.quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="bg-green-500 text-white px-3 py-1 cursor-pointer rounded"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-700"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
