import React, { useEffect, useState } from 'react';
import './ProductStore.css';

const ProductStore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/foods");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food data:", error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading foods...</h2>;
  }

  return (
    <div className="product-store">
      <div className="store-header">
        <h1>🛍️ Fursure Pet Store</h1>
        <p>Everything your pet needs, delivered with love</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="product-image" 
            />

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>

              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <button className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStore;
