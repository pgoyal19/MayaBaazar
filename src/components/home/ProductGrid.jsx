import React from 'react';

const ProductGrid = ({ filteredProducts, handleLike, handleAddToCart }) => {
  return (
    <div className="ui-shop-section">
      <h2 className="section-title-new">Shop by Art Form</h2>
      <div className="ui-products-grid">
        {filteredProducts.map((item, idx) => (
          <div className="ui-product-card group" key={item.id} style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="img-container">
              <img src={item.img} alt={item.title} className="ui-pro-img zoom-img" />
              <button className="like-btn click-bounce" onClick={() => handleLike(item)}>♡</button>
            </div>
            <div className="ui-pro-info">
              <h3>{item.title}</h3>
              <p>by {item.artisan}</p>
              {(item.rating != null || item.express) && (
                <div className="ui-pro-meta-row">
                  {item.rating != null && (
                    <span className="ui-pro-rating">
                      ★ {item.rating.toFixed(1)}
                      {item.reviewCount != null && <span className="ui-pro-reviews">({item.reviewCount})</span>}
                    </span>
                  )}
                  {item.express && <span className="ui-pro-express">Maaya Express</span>}
                </div>
              )}
              <div className="ui-pro-bottom">
                <span className="ui-price">₹{item.price.toLocaleString()}</span>
                <button className="ui-cart-add click-bounce" onClick={() => handleAddToCart(item)}>🛒</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
