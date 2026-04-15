import React from 'react';
import { Link } from 'react-router-dom';

export default function SellerDashboard() {
  return (
    <div className="seller-shell">
      <header className="seller-page-head">
        <div>
          <h1 className="seller-page-title">Seller hub</h1>
          <p className="seller-page-sub">Manage reels, uploads, and how buyers discover your craft.</p>
        </div>
        <Link to="/" className="ui-btn-white" style={{ textDecoration: 'none', padding: '0.55rem 1rem' }}>
          ← Shopping site
        </Link>
      </header>

      <div className="seller-dash-grid">
        <Link to="/seller/reels" className="seller-dash-card hover-super">
          <span className="seller-dash-icon">🎬</span>
          <h2>Reels & camera</h2>
          <p>Upload photos and videos, record clips, and build your live story feed.</p>
        </Link>
        <div className="seller-dash-card seller-dash-card-muted">
          <span className="seller-dash-icon">📦</span>
          <h2>Orders</h2>
          <p>Coming soon — link your payouts and shipping labels here.</p>
        </div>
        <div className="seller-dash-card seller-dash-card-muted">
          <span className="seller-dash-icon">📊</span>
          <h2>Insights</h2>
          <p>Views, cart adds, and reel completion — on the roadmap.</p>
        </div>
      </div>
    </div>
  );
}
