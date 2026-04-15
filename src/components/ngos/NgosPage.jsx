import React, { useState } from 'react';
import artPaintingImg from '../../assets/art_painting.png';
import artPotteryImg from '../../assets/art_pottery.png';
import artisanBlockprintImg from '../../assets/artisan_blockprint.png';
import { useI18n } from '../../context/I18nContext';

import { MOCK_NGOS } from '../../server/mockData';

export default function NgosPage({ showToast }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState('All');

  const handleAction = (ngo, action) => {
    showToast(`${action} request for ${ngo.name} initiated. They will contact you shortly! 🙏`);
  };

  const filteredNgos = filter === 'All' 
    ? MOCK_NGOS 
    : MOCK_NGOS.filter(n => n.focus.includes(filter) || n.region.includes(filter));

  return (
    <div className="page-container app-enter" style={{ minHeight: '100vh', padding: '4rem 2rem 8rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', background: 'var(--primary-red)', color: 'white', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '1px' }}>
            {t('ngos.csr')}
          </div>
          <h1 className="hero-title-new" style={{ fontSize: '3.8rem', marginBottom: '1.2rem', fontFamily: 'Fredoka, sans-serif' }}>
            {t('ngos.title1')} <span style={{ color: 'var(--primary-red)' }}>{t('ngos.title2')}</span>
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('ngos.sub')}
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '3rem', justifyContent: 'center' }}>
          {['All', 'Women Empowerment', 'Market Access', 'Skill Development', 'Gujarat'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? 'btn btn-primary' : 'btn btn-secondary'} 
              style={{ flexShrink: 0, padding: '0.7rem 1.6rem', borderRadius: '50px', whiteSpace: 'nowrap', fontWeight: '600', fontSize: '0.95rem' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {filteredNgos.map(ngo => (
            <div key={ngo.id} style={{ 
              background: 'white', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ height: '220px', backgroundImage: `url(${ngo.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)' }} />
                
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.95)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-dark)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  📍 {ngo.region}
                </div>
              </div>

              <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'Outfit, sans-serif', color: 'var(--text-dark)', margin: 0 }}>{ngo.name}</h3>
                </div>
                
                <span style={{ color: 'var(--primary-red)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {ngo.focus}
                </span>

                <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.6' }}>
                  "{ngo.mission}"
                </p>
                
                <div style={{ background: 'var(--bg-color)', padding: '1.2rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-around', marginBottom: '2rem', border: '1px solid rgba(234, 211, 196, 0.4)' }}>
                   <div style={{ textAlign: 'center' }}>
                     <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem' }}>{t('ngos.impact')}</p>
                     <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{ngo.stats.artisans}</p>
                   </div>
                   <div style={{ width: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
                   <div style={{ textAlign: 'center' }}>
                     <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.3rem' }}>{t('ngos.est')}</p>
                     <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{ngo.established}</p>
                   </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => handleAction(ngo, 'Donation')}
                    className="btn btn-primary" 
                    style={{ flex: 1, justifyContent: 'center', padding: '1rem', fontSize: '1.05rem' }}
                  >
                    {t('ngos.donate')}
                  </button>
                  <button 
                    onClick={() => handleAction(ngo, 'Volunteer')}
                    className="btn btn-secondary" 
                    style={{ flex: 1, justifyContent: 'center', whiteSpace: 'nowrap', padding: '1rem', fontSize: '1.05rem' }}
                  >
                    {t('ngos.volunteer')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
