import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../server/mockData';

const CategoriesPage = ({ onAddToCart, onSave, savedItems = [], cart = [], showToast }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const handleAdd = (product) => {
    if (onAddToCart) onAddToCart(product);
    if (showToast) showToast(`${product.title} added to cart! 🛒`);
  };

  const handleSave = (product) => {
    if (onSave) onSave(product);
    if (showToast) showToast(`${product.title} saved for later! 💾`);
  };

  const isSaved = (product) => savedItems.some(i => i.id === product.id);
  const inCart = (product) => cart.some(i => i.id === product.id);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', marginTop: '80px', minHeight: '80vh' }}>
      <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.8rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Browse Categories</h1>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>Discover unique artisan pieces from every corner of India.</p>
      </header>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`ui-btn-white shift-hover`}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '50px',
              fontWeight: 'bold',
              backgroundColor: activeCategory === cat ? 'var(--primary-red)' : '#fff',
              color: activeCategory === cat ? '#fff' : 'var(--text-dark)',
              border: `1px solid ${activeCategory === cat ? 'var(--primary-red)' : '#ddd'}`
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '2.5rem'
      }}>
        {filteredProducts.map(product => (
          <div className="card-3d-wrap" key={product.id}>
            <div style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              height: '100%'
            }}
            className="card-3d-tilt"
            >
            <div style={{ height: '300px', position: 'relative' }}>
              <img src={product.img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#fff', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {product.category}
              </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', color: 'var(--text-dark)' }}>{product.title}</h3>
              <p style={{ margin: '0 0 1.2rem', color: '#888', fontSize: '0.9rem' }}>By {product.artisan}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>₹{product.price}</span>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleSave(product)}
                    disabled={isSaved(product)}
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      border: '1px solid #ddd', background: isSaved(product) ? '#f0f0f0' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: isSaved(product) ? 'default' : 'pointer', fontSize: '1.2rem'
                    }}
                    title="Save for later"
                  >
                    {isSaved(product) ? '💾' : '🔖'}
                  </button>
                  <button 
                    onClick={() => handleAdd(product)}
                    style={{
                      padding: '0 1.2rem', height: '40px', borderRadius: '8px',
                      border: 'none', background: 'var(--text-dark)', color: '#fff',
                      fontWeight: 'bold', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.5rem' 
                    }}
                    className="shift-hover"
                  >
                    <span>{inCart(product) ? 'In Cart' : 'Buy'}</span> 🛒
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
