import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import artPaintingImg from '../../assets/art_painting.png';
import artPotteryImg from '../../assets/art_pottery.png';
import artisanBlockprintImg from '../../assets/artisan_blockprint.png';
import { useI18n } from '../../context/I18nContext';

import { MOCK_AUCTIONS } from '../../server/mockData';

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export default function AuctionPage({ showToast }) {
  const { t } = useI18n();
  const [auctions, setAuctions] = useState(MOCK_AUCTIONS);

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions(prev => prev.map(auc => ({
        ...auc,
        timeLeft: Math.max(0, auc.timeLeft - 1)
      })));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBid = (id, currentVal) => {
    const raise = Math.floor(currentVal * 0.1); // 10% raise
    setAuctions(prev => prev.map(auc => {
      if (auc.id === id) {
        return { ...auc, currentBid: auc.currentBid + raise, bids: auc.bids + 1 };
      }
      return auc;
    }));
    showToast(`${t('auc.quote2')} You placed a bid of ₹${(currentVal + raise).toLocaleString()}! 💰`);
  };

  return (
    <div className="page-container app-enter" style={{ minHeight: '100vh', paddingBottom: '8rem', position: 'relative', overflow: 'hidden' }}>
      {/* Immersive Video Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            filter: 'brightness(0.4) contrast(1.1)'
          }}
        >
          <source src="/reels/auction.mp4" type="video/mp4" />
        </video>
        {/* Visual Overlay for texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
          backdropFilter: 'blur(2px)'
        }}></div>
      </div>

      <div style={{ 
        color: '#fff', 
        borderRadius: '32px', 
        padding: '2rem 1rem', 
        marginTop: '2rem',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Thematic Hero */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '5rem 1rem', position: 'relative' }}>
          <h1 style={{ fontSize: '5rem', marginBottom: '1rem', fontFamily: 'Fredoka, sans-serif', color: '#fff', textShadow: '0 5px 30px rgba(0,0,0,0.8)' }}>
            {t('auc.title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.4rem', maxWidth: '800px', margin: '0 auto 2.5rem', fontStyle: 'italic', fontWeight: '500', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            {t('auc.quote')} 
            <br/>
            {t('auc.desc1')}
          </p>
          <div style={{ padding: '1.5rem 2rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', background: 'rgba(0,0,0,0.3)', display: 'inline-block', maxWidth: '600px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🎭</span>
            <p style={{ margin: '0 0 0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: '#ffd700', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{t('auc.quote2')}</p>
            <p style={{ margin: 0, fontSize: '1rem', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{t('auc.desc2')}</p>
          </div>
        </div>

        {/* Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {auctions.map(auc => (
            <div key={auc.id} style={{ 
              background: 'rgba(0,0,0,0.5)', 
              borderRadius: '28px', 
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(12px)',
              transition: 'transform 0.3s ease'
            }} className="card-3d-tilt">
              <div style={{ height: '240px', backgroundImage: `url(${auc.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.7) 100%)' }}></div>
                
                {/* Timer Badge */}
                <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: auc.timeLeft < 300 ? '#ff3e3e' : 'rgba(0,0,0,0.7)', padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: '0.6rem', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
                  <span style={{animation: auc.timeLeft < 300 ? 'pulse 1s infinite' : 'none'}}>⏳</span> {auc.timeLeft === 0 ? t('auc.sold') : formatTime(auc.timeLeft)}
                </div>

                <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.5rem' }}>
                  <span style={{ background: 'var(--primary-red)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                    {auc.era}
                  </span>
                </div>
              </div>

              <div style={{ padding: '2.2rem 1.8rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.6rem', fontWeight: 'bold', fontFamily: 'Outfit, sans-serif', color: '#fff', letterSpacing: '0.5px' }}>{auc.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '2.2rem' }}>{t('auc.origin')} <span style={{color: '#fff', fontWeight: '600'}}>{auc.artisan}</span></p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2.5rem', flexGrow: 1 }}>
                  <div style={{ background: 'rgba(255,255,255,0.08)', padding: '1.2rem 1rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1.2px' }}>{t('auc.cbid')}</p>
                    <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', color: '#00ff88', textShadow: '0 0 15px rgba(0,255,136,0.3)' }}>₹{auc.currentBid.toLocaleString()}</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.08)', padding: '1.2rem 1rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.12)', textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1.2px' }}>{t('auc.bmade')}</p>
                    <p style={{ margin: 0, fontSize: '1.6rem', fontWeight: '900', color: '#fff' }}>{auc.bids}</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleBid(auc.id, auc.currentBid)}
                  disabled={auc.timeLeft === 0}
                  style={{ 
                    width: '100%', 
                    padding: '1.3rem', 
                    fontSize: '1.1rem', 
                    background: auc.timeLeft === 0 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, var(--primary-red) 0%, #c01c38 100%)', 
                    color: auc.timeLeft === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    boxShadow: auc.timeLeft === 0 ? 'none' : '0 15px 30px rgba(220, 39, 67, 0.4)',
                    cursor: auc.timeLeft === 0 ? 'not-allowed' : 'pointer',
                    border: 'none',
                    borderRadius: '16px',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  className={auc.timeLeft !== 0 ? 'pulse-hover' : ''}
                >
                  {auc.timeLeft === 0 ? t('auc.sold') : `${t('auc.bid')} ₹${(auc.currentBid + Math.floor(auc.currentBid * 0.1)).toLocaleString()} 🔨`}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
