import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import auctionPersonImg from '../../assets/auction_person.png';

function formatJoined(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '—';
  }
}

function ProfilePage({ cart = [], savedItems = [], moveToSaved, moveToCart, showToast }) {
  const { user, logout, isAuthenticated, authReady } = useAuth();
  const navigate = useNavigate();

  if (!authReady) {
    return (
      <div className="profile-page">
        <p className="profile-empty" style={{ textAlign: 'center', padding: '3rem' }}>Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/profile' } }} />;
  }

  const handleLogout = async () => {
    await logout();
    showToast('Signed out. See you soon! 👋');
    navigate('/');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="profile-page">
      <div className="profile-hero-card">
        <div className="profile-avatar-wrap">
          <img src={auctionPersonImg} alt="" className="profile-avatar" width={96} height={96} />
        </div>
        <div className="profile-hero-text">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-meta">Member since {formatJoined(user.joinedAt)}</p>
        </div>
        <button type="button" className="profile-logout-btn" onClick={handleLogout}>
          Sign out
        </button>
      </div>

      <div className="profile-grid">
        <section className="profile-panel">
          <h2 className="profile-panel-title">Your cart</h2>
          {cart.length === 0 ? (
            <p className="profile-empty">Your cart is empty. Discover pieces on the home feed.</p>
          ) : (
            <>
              <ul className="profile-cart-list">
                {cart.map((item, i) => (
                  <li key={`cart-${item.id}-${i}`} className="profile-cart-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img src={item.img} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                      <div>
                        <span className="profile-cart-title" style={{ display: 'block' }}>{item.title}</span>
                        <span className="profile-cart-price">₹{item.price}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => moveToSaved(item)}
                      style={{ background: 'none', border: '1px solid #ddd', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}
                      className="shift-hover"
                    >
                      Save for later
                    </button>
                  </li>
                ))}
              </ul>
              <p className="profile-cart-total">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </p>
              <Link to="/shop" className="profile-cta-link ui-btn-red" style={{ textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', marginTop: '1rem' }}>
                Continue to checkout (demo)
              </Link>
            </>
          )}
        </section>

        <section className="profile-panel">
          <h2 className="profile-panel-title">Saved for later</h2>
          {savedItems.length === 0 ? (
            <p className="profile-empty">You haven't saved any items yet. <Link to="/shop" style={{ color: 'var(--primary-red)' }}>Start exploring</Link></p>
          ) : (
            <ul className="profile-cart-list">
              {savedItems.map((item, i) => (
                <li key={`saved-${item.id}-${i}`} className="profile-cart-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={item.img} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', opacity: 0.8 }} />
                    <div>
                      <span className="profile-cart-title" style={{ display: 'block' }}>{item.title}</span>
                      <span className="profile-cart-price">₹{item.price}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => moveToCart(item)}
                    style={{ background: 'var(--text-dark)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer' }}
                    className="shift-hover"
                  >
                    Move to Cart ➔
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="profile-actions-row">
        <Link to="/" className="ui-btn-white profile-footer-btn" style={{ textDecoration: 'none' }}>Browse home</Link>
        <button
          type="button"
          className="profile-text-btn"
          onClick={async () => {
            await logout();
            showToast('Signed out. You can sign in with another account.');
            navigate('/login', { replace: true });
          }}
        >
          Use another account
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
