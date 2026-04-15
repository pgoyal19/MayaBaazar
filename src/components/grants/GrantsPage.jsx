import React, { useState } from 'react';
import artPaintingImg from '../../assets/art_painting.png';
import artPotteryImg from '../../assets/art_pottery.png';
import artisanBlockprintImg from '../../assets/artisan_blockprint.png';
import { useI18n } from '../../context/I18nContext';

import { MOCK_GRANTS } from '../../server/mockData';

export default function GrantsPage({ showToast }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState('All');
  
  const handleApply = (grant) => {
    if (grant.deadline === 'Closed') {
      showToast('⚠️ This grant is currently closed for applications.');
      return;
    }
    showToast(`Navigating to official portal for ${grant.type}: ${grant.title} ✨`);
  };

  const filteredGrants = filter === 'All' 
    ? MOCK_GRANTS 
    : MOCK_GRANTS.filter(g => g.type === filter);

  const filters = ['All', 'Fellowship', 'Sponsorship', 'Grant', 'Incubation'];

  return (
    <div className="page-container app-enter" style={{ minHeight: '100vh', padding: '4rem 2rem 8rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', background: 'linear-gradient(135deg, rgba(252, 244, 235, 1) 0%, #ffffff 100%)', padding: '4.5rem 2rem', borderRadius: '32px', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.02), 0 10px 30px rgba(0,0,0,0.04)' }}>
          <h1 style={{ fontSize: '3.8rem', marginBottom: '1.2rem', fontFamily: 'Fredoka, sans-serif', color: 'var(--text-dark)', textShadow: '2px 2px 10px rgba(0,0,0,0.05)' }}>
            {t('grants.title1')} <span style={{ color: 'var(--primary-red)' }}>{t('grants.title2')}</span>
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
            {t('grants.sub')}
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2.5rem', justifyContent: 'center' }}>
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{ 
                flexShrink: 0, 
                padding: '0.8rem 2rem', 
                borderRadius: '50px',
                background: filter === f ? 'var(--primary-red)' : '#fff',
                color: filter === f ? '#fff' : 'var(--text-dark)',
                border: filter === f ? 'none' : '1px solid #ddd',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                boxShadow: filter === f ? '0 10px 20px rgba(235, 77, 100, 0.3)' : '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {filteredGrants.map(grant => (
            <div key={grant.id} style={{ 
              background: '#fff', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 25px 45px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ height: '220px', backgroundImage: `url(${grant.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)' }} />
                
                <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', background: grant.color, color: '#fff', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.5px', textTransform: 'uppercase', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                  {grant.type}
                </div>
              </div>

              <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', fontWeight: 'bold', fontFamily: 'Outfit, sans-serif', color: '#2c3e50', lineHeight: '1.3' }}>{grant.title}</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🏛️</span> 
                  <p style={{ color: '#7f8c8d', fontSize: '0.95rem', margin: 0 }}>{grant.org}</p>
                </div>

                <p style={{ color: '#555', fontSize: '1rem', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.5' }}>
                  {grant.description}
                </p>
                
                <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: '16px', border: '1px solid #e9ecef', marginBottom: '1.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                     <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 'bold' }}>{t('grants.prize')}</span>
                     <span style={{ fontSize: '0.85rem', color: grant.deadline === 'Closed' ? '#e74c3c' : '#27ae60', fontWeight: 'bold', background: grant.deadline === 'Closed' ? '#ffeaea' : '#eafaf1', padding: '0.2rem 0.6rem', borderRadius: '8px' }}>
                       {grant.deadline === 'Closed' ? t('comp.closed') : grant.deadline}
                     </span>
                   </div>
                   <p style={{ margin: 0, fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{grant.amount}</p>
                </div>

                <button 
                  onClick={() => handleApply(grant)}
                  style={{ 
                    width: '100%', 
                    padding: '1.2rem', 
                    fontSize: '1.1rem', 
                    background: grant.deadline === 'Closed' ? '#bdc3c7' : 'var(--primary-red)', 
                    color: '#fff',
                    fontWeight: 'bold',
                    boxShadow: grant.deadline === 'Closed' ? 'none' : '0 10px 20px rgba(235, 77, 100, 0.3)',
                    cursor: grant.deadline === 'Closed' ? 'not-allowed' : 'pointer',
                    border: 'none',
                    borderRadius: '14px',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Outfit, sans-serif'
                  }}
                  onMouseEnter={e => { if(grant.deadline !== 'Closed') e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { if(grant.deadline !== 'Closed') e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {grant.deadline === 'Closed' ? t('comp.closed') : t('grants.apply')}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
