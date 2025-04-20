import React, { useEffect, useState } from 'react';
import apiCall from '../services/apiCall';
import ProductCard from '../components/ProductCard';

function Category() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiCall('https://fakestoreapi.com/products/categories', 'GET');
      setCategories(data.data);
    } catch (err) {
      console.log("Error in fetching categories",err)
      setError('Failed to load categories');
    }
  };
  const fetchAllProducts = async () => {
    try {
      const data = await apiCall('https://fakestoreapi.com/products/', 'GET');
      setProducts(data.data);
    } catch (err) {
      setError('Failed to fetch produts');
      console.log("Error in fetching produts",err)

    }
  };



  const fetchProductsByCategory = async (category) => {
    setSelected(category);
    setLoading(true);
    setError('');
    try {
      const data = await apiCall(`https://fakestoreapi.com/products/category/${category}`, 'GET');
      setProducts(data.data);

    } catch (err) {
      setError('Failed to fetch produts');
      console.log("Error in fetching produts",err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Categories</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}


      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => {
            fetchAllProducts();
            setSelected('all');
          }}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selected === 'all' || selected === ''
              ? 'bg-blue-600 text-white'
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
            }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => fetchProductsByCategory(category)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${selected === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
              }`}
          >
            {category}
          </button>
        ))}
      </div>


      {loading && <p className="text-center">Loading products...</p>}

      {!loading && products.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
