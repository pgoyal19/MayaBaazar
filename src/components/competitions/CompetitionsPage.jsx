import React, { useState } from 'react';
import { MOCK_COMPETITIONS } from '../../server/mockData';
import { useI18n } from '../../context/I18nContext';

export default function CompetitionsPage({ showToast }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState('All');

  const handleApply = (comp) => {
    if (comp.date === 'Closed') {
      showToast('This competition is no longer accepting applications 🚫');
    } else {
      showToast(`Redirecting to official portal for ${comp.title} ✨`);
    }
  };

  const filteredComps = filter === 'All' 
    ? MOCK_COMPETITIONS 
    : MOCK_COMPETITIONS.filter(c => c.tags.includes(filter));

  return (
    <div className="page-container app-enter" style={{ minHeight: '100vh', padding: '4rem 2rem 8rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="hero-title-new" style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'Fredoka, sans-serif' }}>
            <span style={{ color: 'var(--primary-red)' }}>{t('comp.title').split(' ')[0]}</span> {t('comp.title').substring(t('comp.title').indexOf(' '))}
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto' }}>
            {t('comp.sub')}
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
          {['All', 'Government', 'NGO', 'Corporate'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? 'btn btn-primary' : 'btn btn-secondary'} 
              style={{ flexShrink: 0, padding: '0.6rem 1.5rem', borderRadius: '50px' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {filteredComps.map(comp => (
            <div key={comp.id} style={{ 
              background: 'white', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ height: '200px', backgroundImage: `url(${comp.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.95)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', color: comp.date === 'Closed' ? '#888' : 'var(--primary-red)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  {comp.date === 'Closed' ? t('comp.closed') : comp.date}
                </div>
              </div>
              <div style={{ padding: '1.8rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  {comp.tags.map(tag => (
                    <span key={tag} style={{ background: '#f5ece2', color: 'var(--text-dark)', padding: '0.3rem 0.8rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.6rem', fontWeight: 'bold', fontFamily: 'Outfit, sans-serif' }}>{comp.title}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🏛️</span> {comp.org}
                </p>
                
                <div style={{ background: 'var(--bg-color)', padding: '1rem 1.2rem', borderRadius: '12px', marginBottom: '1.8rem', border: '1px solid rgba(234, 211, 196, 0.5)' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>{t('comp.prize')}</p>
                  <p style={{ margin: 0, fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{comp.prize}</p>
                </div>

                <button 
                  onClick={() => handleApply(comp)}
                  className={`btn ${comp.date === 'Closed' ? 'btn-secondary' : 'btn-primary'}`} 
                  style={{ width: '100%', justifyContent: 'center', padding: '1rem', opacity: comp.date === 'Closed' ? 0.7 : 1 }}
                >
                  {comp.date === 'Closed' ? t('comp.closed') : t('comp.apply')}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
