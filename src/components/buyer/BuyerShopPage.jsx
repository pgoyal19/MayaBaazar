import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BuyerMarketplaceStrip from './BuyerMarketplaceStrip';
import ProductGrid from '../home/ProductGrid';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
];

export default function BuyerShopPage({
  products,
  shopSearch,
  setShopSearch,
  handleAddToCart,
  handleLike,
  showToast,
}) {
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    const q = shopSearch.trim().toLowerCase();
    let list = !q
      ? [...products]
      : products.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.artisan.toLowerCase().includes(q)
        );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, shopSearch, sort]);

  return (
    <div className="buyer-shop-page">
      <header className="buyer-shop-hero">
        <h1 className="buyer-shop-title">Handmade store</h1>
        <p className="buyer-shop-sub">Amazon-style browsing — Maaya Bazaar colours, artisans first.</p>
        <div className="buyer-shop-links">
          <Link to="/camera" className="ui-btn-red" style={{ textDecoration: 'none', padding: '0.65rem 1.2rem' }}>
            📷 Photo & video
          </Link>
          <Link to="/live" className="ui-btn-white" style={{ textDecoration: 'none', padding: '0.65rem 1.2rem' }}>
            Watch reels
          </Link>
        </div>
      </header>

      <BuyerMarketplaceStrip
        shopSearch={shopSearch}
        setShopSearch={setShopSearch}
        onSubmitSearch={() => showToast?.(`Showing ${filtered.length} results`)}
      />

      <div className="buyer-shop-toolbar">
        <p className="buyer-shop-results">
          <strong>{filtered.length}</strong> products
        </p>
        <label className="buyer-shop-sort">
          <span>Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="buyer-shop-select">
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No products match your search. Try another keyword.</div>
      ) : (
        <ProductGrid filteredProducts={filtered} handleLike={handleLike} handleAddToCart={handleAddToCart} />
      )}
    </div>
  );
}
