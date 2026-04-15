import React, { useState, useEffect, useCallback } from 'react';
import IntroSplash from './components/layout/IntroSplash';
import GlobalSearch from './components/layout/GlobalSearch';
import CartModal from './components/layout/CartModal';
import NotificationModal from './components/layout/NotificationModal';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';
import { useI18n } from './context/I18nContext';
import LanguageBanner from './components/i18n/LanguageBanner';
import { MOCK_NOTIFICATIONS } from './server/mockData';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import LiveReels from './components/live/LiveReels';
import AuthPage from './components/auth/AuthPage';
import ProfilePage from './components/profile/ProfilePage';
import BuyerCameraPage from './components/buyer/BuyerCameraPage';
import AuthClickGuard from './components/auth/AuthClickGuard';
import AuthGateModal from './components/auth/AuthGateModal';
import CompetitionsPage from './components/competitions/CompetitionsPage';
import AuctionPage from './components/auction/AuctionPage';
import GrantsPage from './components/grants/GrantsPage';
import NgosPage from './components/ngos/NgosPage';
import CategoriesPage from './components/shop/CategoriesPage';

// Settings
import startBgImg from './assets/start.png';

function App() {
  const { t } = useI18n();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    if (showSplash) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  const [toastMessage, setToastMessage] = useState(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const handleAddToCart = useCallback((product) => {
    setCart((prev) => prev.some(i => i.id === product.id) ? prev : [...prev, product]);
  }, []);

  const handleSaveForLater = useCallback((product) => {
    setSavedItems((prev) => prev.some(i => i.id === product.id) ? prev : [...prev, product]);
  }, []);

  const moveToSaved = useCallback((product) => {
    setCart((prev) => prev.filter((i) => i.id !== product.id));
    setSavedItems((prev) => prev.some((i) => i.id === product.id) ? prev : [...prev, product]);
  }, []);

  const moveToCart = useCallback((product) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== product.id));
    setCart((prev) => prev.some((i) => i.id === product.id) ? prev : [...prev, product]);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLike = () => {
    showToast(`You liked this! ❤️`);
  };

  return (
    <>
      {showSplash && <IntroSplash onComplete={handleSplashComplete} />}
    <div className="app-container app-enter">
      {toastMessage && <div className="toast-notification slide-up-anim z-50">{toastMessage}</div>}
      <LanguageBanner appVisible={!showSplash} />
      <AuthClickGuard />
      <AuthGateModal showToast={showToast} />

      <div className="global-top-art-bg" style={{ 
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100vw', height: '850px',
        backgroundImage: `url(${startBgImg})`, backgroundSize: 'cover', backgroundPosition: 'top center',
        zIndex: -1, borderBottomLeftRadius: '3rem', borderBottomRightRadius: '3rem'
      }}></div>

      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotif={() => setIsNotifOpen(true)}
        cartCount={cart.length}
        unreadCount={MOCK_NOTIFICATIONS.filter(n => n.unread).length}
      />
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} showToast={showToast} />
      <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} notifications={MOCK_NOTIFICATIONS} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} clearCart={() => setCart([])} showToast={showToast} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Routes>
          <Route path="/" element={<Home
            handleLike={handleLike}
            showToast={showToast}
          />} />
          <Route path="/live" element={<LiveReels showToast={showToast} onAddToCart={handleAddToCart} />} />
          <Route path="/shop" element={<CategoriesPage showToast={showToast} cart={cart} savedItems={savedItems} onAddToCart={handleAddToCart} onSave={handleSaveForLater} />} />
          <Route path="/login" element={<AuthPage showToast={showToast} />} />
          <Route path="/profile" element={<ProfilePage showToast={showToast} cart={cart} savedItems={savedItems} moveToSaved={moveToSaved} moveToCart={moveToCart} />} />
          <Route path="/camera" element={<BuyerCameraPage showToast={showToast} />} />
          <Route path="/competitions" element={<CompetitionsPage showToast={showToast} />} />
          <Route path="/auction" element={<AuctionPage showToast={showToast} />} />
          <Route path="/grants" element={<GrantsPage showToast={showToast} />} />
          <Route path="/ngos" element={<NgosPage showToast={showToast} />} />
        </Routes>
      </div>

      <Footer />

      <div className="mobile-bottom-nav">
        <Link to="/" className={`mob-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="mob-nav-icon">🏠</span><span>{t('mob.home')}</span>
        </Link>
        <Link to="/live" className={`mob-nav-item ${location.pathname === '/live' ? 'active' : ''}`}>
          <span className="mob-nav-icon">🔴</span><span>{t('mob.live')}</span>
        </Link>
        <Link to="/camera" className={`mob-nav-item ${location.pathname === '/camera' ? 'active' : ''}`}>
          <span className="mob-nav-icon">📷</span><span>{t('mob.camera')}</span>
        </Link>
        <Link to="/profile" className={`mob-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <span className="mob-nav-icon">👤</span><span>{t('mob.profile')}</span>
        </Link>
      </div>

    </div>
    </>
  );
}

export default App;
