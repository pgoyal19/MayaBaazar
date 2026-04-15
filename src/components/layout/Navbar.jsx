import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import auctionPersonImg from '../../assets/auction_person.png';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

const Navbar = ({ onOpenSearch, onOpenCart, onOpenNotif, cartCount = 0, unreadCount = 0 }) => {
  const { isAuthenticated } = useAuth();
  const { t } = useI18n();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar-new" style={{ position: 'relative', zIndex: 10 }}>
      {mobileMenuOpen && (
        <button
          type="button"
          className="nav-mobile-backdrop"
          data-no-auth-gate
          aria-label={t('nav.closeMenu')}
          onClick={closeMobileMenu}
        />
      )}
      <div className={`nav-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-mobile-drawer-head">
          <span className="nav-mobile-drawer-title">{t('nav.menu')}</span>
          <button type="button" className="nav-mobile-close" data-no-auth-gate onClick={closeMobileMenu} aria-label={t('nav.closeMenu')}>
            ✕
          </button>
        </div>
        <div className="nav-mobile-links">
          <Link to="/" className={location.pathname === '/' ? 'active-link' : ''} onClick={closeMobileMenu}>Home</Link>
          <Link to="/camera" className={location.pathname === '/camera' ? 'active-link' : ''} onClick={closeMobileMenu}>Camera</Link>
          <Link to="/live" className={location.pathname === '/live' ? 'active-link' : ''} onClick={closeMobileMenu}>Live</Link>
          <Link to="/competitions" className={location.pathname === '/competitions' ? 'active-link' : ''} onClick={closeMobileMenu}>Competitions</Link>
          <Link to="/auction" className={location.pathname === '/auction' ? 'active-link' : ''} onClick={closeMobileMenu}>Auction</Link>
          <Link to="/grants" className={location.pathname === '/grants' ? 'active-link' : ''} onClick={closeMobileMenu}>Grants</Link>
          <Link to="/ngos" className={location.pathname === '/ngos' ? 'active-link' : ''} onClick={closeMobileMenu}>NGOs</Link>
        </div>
      </div>

      <button type="button" className="hamburger-icon" data-no-auth-gate onClick={() => setMobileMenuOpen((o) => !o)} aria-expanded={mobileMenuOpen} aria-label={t('nav.openMenu')}>
        ☰
      </button>
      <Link to="/" className="logo-new" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', fontFamily: 'Fredoka, sans-serif' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>माया</span>
        <span style={{ fontSize: '1.8rem', fontWeight: '600', color: 'var(--text-dark)' }}>bazaar</span>
      </Link>

      <div className="nav-center-links">
        <Link to="/" className={location.pathname === '/' ? 'active-link' : ''} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
        <Link to="/camera" className={location.pathname === '/camera' ? 'active-link' : ''} style={{ textDecoration: 'none' }}>Camera</Link>
        <Link to="/live" className={location.pathname === '/live' ? 'active-link' : ''} style={{ textDecoration: 'none' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Live</Link>
        <Link to="/competitions" className={location.pathname === '/competitions' ? 'active-link' : ''} style={{ textDecoration: 'none' }}>Competitions</Link>
        <Link to="/auction" className={location.pathname === '/auction' ? 'active-link' : ''} style={{ textDecoration: 'none' }}>Auction</Link>
        <Link to="/grants" className={location.pathname === '/grants' ? 'active-link' : ''} style={{ textDecoration: 'none' }}>Grants</Link>
        <Link to="/ngos" className={location.pathname === '/ngos' ? 'active-link' : ''} style={{ textDecoration: 'none' }}>NGOs</Link>
      </div>

      <div className="nav-right-actions">
        <div className="lang-search">
          <LanguageSwitcher compact />
          <span className="search-icon scale-hover" onClick={onOpenSearch} style={{ cursor: 'pointer' }}>🔍</span>
        </div>
        
        <button 
          className="icon-btn-new scale-hover" 
          onClick={onOpenCart} 
          style={{ position: 'relative' }}
          aria-label={t('nav.cart') || 'Cart'}
        >
          🛒
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: -5, right: -5, background: 'var(--primary-red)', color: 'white',
              fontSize: '0.65rem', fontWeight: 'bold', width: '16px', height: '16px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', borderRadius: '50%'
            }}>
              {cartCount}
            </span>
          )}
        </button>

        <button 
          className="icon-btn-new scale-hover" 
          onClick={onOpenNotif} 
          style={{ position: 'relative' }}
          aria-label={t('nav.notifications') || 'Notifications'}
        >
          🔔
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: -1, right: -1, background: 'var(--primary-red)', color: 'transparent',
              width: '10px', height: '10px', borderRadius: '50%'
            }} />
          )}
        </button>
        <Link
          to={isAuthenticated ? '/profile' : '/login'}
          className="nav-profile-link"
          title={isAuthenticated ? t('nav.profileTitleSignedIn') : t('nav.profileTitleGuest')}
        >
          <img src={auctionPersonImg} alt="" className="nav-profile-pic scale-hover" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
