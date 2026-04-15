import React from 'react';
import { useLocation } from 'react-router-dom';
import tuktukImg from '../../assets/tuktuk.png';
import { useI18n } from '../../context/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const socialIcons = (
    <div className="social-icons" style={{ display: 'flex', gap: '0.8rem' }}>
      <div style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </div>
      <div style={{ background: '#ff0000', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
      </div>
      <div style={{ background: '#1877f2', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
      </div>
      <div style={{ background: '#ea4355', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
      </div>
    </div>
  );

  if (isHome) {
    return (
      <footer className="footer-new" data-no-auth-gate style={{ position: 'relative', width: '100%', marginTop: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', padding: 0 }}>
        <img src={tuktukImg} alt="Decorative Footer Art" style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', margin: 0 }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '100%',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '2rem 3rem 1.5rem',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
          color: '#fff', zIndex: 2, flexWrap: 'wrap', gap: '1.5rem',
          boxSizing: 'border-box'
        }}>
          <div className="footer-left" style={{ fontSize: '0.95rem', fontWeight: '500', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {t('footer.copyright', { year })}
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '1.8rem', color: '#fff', fontSize: '0.9rem', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>{t('footer.home')}</a>
            <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>{t('footer.about')}</a>
            <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>{t('footer.blog')}</a>
            <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>{t('footer.help')}</a>
            <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>{t('footer.contact')}</a>
            <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>{t('footer.terms')}</a>
          </div>
          {socialIcons}
        </div>
      </footer>
    );
  }

  // Simplified dark footer for subpages
  return (
    <footer className="footer-new" data-no-auth-gate style={{ position: 'relative', overflow: 'hidden', width: '100%', background: '#111', padding: '2.5rem 3rem', borderTop: '1px solid #222', marginTop: 'auto' }}>
      <img className="running-tuktuk" src={tuktukImg} alt="Running Tuktuk" />
      
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1.5rem', margin: '0 auto', maxWidth: '1250px'
      }}>
         <div className="footer-left" style={{ color: '#888', fontSize: '0.95rem', fontWeight: '500' }}>
           {t('footer.copyright', { year })}
         </div>

         <div className="footer-links" style={{ display: 'flex', gap: '2rem', color: '#aaa', fontSize: '0.95rem', fontWeight: '500' }}>
           <a href="#" style={{ textDecoration: 'none', color: '#aaa', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#aaa'}>{t('footer.home')}</a>
           <a href="#" style={{ textDecoration: 'none', color: '#aaa', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#aaa'}>{t('footer.about')}</a>
           <a href="#" style={{ textDecoration: 'none', color: '#aaa', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#aaa'}>{t('footer.blog')}</a>
           <a href="#" style={{ textDecoration: 'none', color: '#aaa', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#aaa'}>{t('footer.help')}</a>
           <a href="#" style={{ textDecoration: 'none', color: '#aaa', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#aaa'}>{t('footer.contact')}</a>
           <a href="#" style={{ textDecoration: 'none', color: '#aaa', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#aaa'}>{t('footer.terms')}</a>
         </div>

         {socialIcons}
      </div>
    </footer>
  );
};

export default Footer;
