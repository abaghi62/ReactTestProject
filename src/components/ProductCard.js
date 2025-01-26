import React from 'react';

function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick(product.id)}>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductCard;