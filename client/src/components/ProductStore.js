import React from 'react';
import './ProductStore.css';

const ProductStore = () => {
  // Sample products data - your friend can replace this
  const products = [
    {
      id: 1,
      name: "Premium Dog Food",
      price: 29.99,
      image: "https://via.placeholder.com/300x200/4CAF50/white?text=Dog+Food",
      description: "Healthy and nutritious dog food for all breeds"
    },
    {
      id: 2, 
      name: "Cat Toy Set",
      price: 15.99,
      image: "https://via.placeholder.com/300x200/2196F3/white?text=Cat+Toys",
      description: "Interactive toys to keep your cat entertained"
    },
    {
      id: 3,
      name: "Pet Grooming Kit",
      price: 34.99,
      image: "https://via.placeholder.com/300x200/FF9800/white?text=Grooming+Kit",
      description: "Complete grooming kit for all your pet's needs"
    }
  ];

  return (
    <div className="product-store">
      <div className="store-header">
        <h1>🛍️ Fursure Pet Store</h1>
        <p>Everything your pet needs, delivered with love</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductStore;