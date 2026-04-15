import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import {
  MOCK_COMPETITIONS,
  MOCK_GRANTS,
  MOCK_NGOS,
  MOCK_AUCTIONS
} from '../../server/mockData';

const GlobalSearch = ({ isOpen, onClose, showToast }) => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle keyboard shortcut (CMD/CTRL + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // The navbar should ideally handle this to toggle, 
        // but if it's open, pressing again shouldn't necessarily close it.
        // We'll let the Navbar handle the global shortcut, this just prevents default if it's already open.
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = [];

    // Search Competitions
    MOCK_COMPETITIONS.forEach(c => {
      if (c.title.toLowerCase().includes(q) || c.org.toLowerCase().includes(q)) {
        matches.push({ type: 'Competitions', title: c.title, sub: c.org, route: '/competitions' });
      }
    });

    // Search Grants
    MOCK_GRANTS.forEach(g => {
      if (g.title.toLowerCase().includes(q) || g.org.toLowerCase().includes(q) || g.type.toLowerCase().includes(q)) {
        matches.push({ type: 'Grants', title: g.title, sub: g.type, route: '/grants' });
      }
    });

    // Search NGOs
    MOCK_NGOS.forEach(n => {
      if (n.name.toLowerCase().includes(q) || n.mission.toLowerCase().includes(q) || n.focus.toLowerCase().includes(q)) {
        matches.push({ type: 'NGOs', title: n.name, sub: n.focus, route: '/ngos' });
      }
    });

    // Search Auctions
    MOCK_AUCTIONS.forEach(a => {
      if (a.title.toLowerCase().includes(q) || a.era.toLowerCase().includes(q) || a.artisan.toLowerCase().includes(q)) {
        matches.push({ type: 'Auctions', title: a.title, sub: `By ${a.artisan}`, route: '/auction' });
      }
    });

    setResults(matches);
  }, [query]);

  const handleSelect = (res) => {
    onClose();
    navigate(res.route);
    if (showToast) {
      showToast(`Navigated to ${res.title}`);
    } else {
      // Fallback if showToast isn't passed down easily
      console.log(`Navigated to ${res.title}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '10vh'
    }} onClick={onClose}>
      
      <div 
        style={{
          background: '#fff',
          width: '90%',
          maxWidth: '650px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '1rem 1.5rem' }}>
          <span style={{ fontSize: '1.4rem', marginRight: '1rem', color: '#888' }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search artisans, grants, NGOs, competitions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.2rem',
              color: 'var(--text-dark)',
              backgroundColor: 'transparent'
            }}
          />
          <span style={{ fontSize: '0.8rem', color: '#999', background: '#f5f5f5', padding: '0.3rem 0.5rem', borderRadius: '4px', marginLeft: '1rem' }}>ESC</span>
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {query.trim() !== '' && results.length === 0 && (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#999' }}>
              No results found for "{query}". Try checking your spelling or using broader terms.
            </div>
          )}

          {results.length > 0 && (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {/* Grouping results can be done visually or just mapping */}
              {results.map((r, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleSelect(r)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid #f9f9f9',
                      padding: '1rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fcf8f5'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <div style={{
                      background: 'var(--primary-red)',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      marginRight: '1rem',
                      minWidth: '85px',
                      textAlign: 'center'
                    }}>
                      {r.type}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '1.05rem', color: 'var(--text-dark)' }}>{r.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>{r.sub}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {query.trim() === '' && (
            <div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#999', width: '100%', marginBottom: '0.5rem' }}>SUGGESTED SEARCHES</span>
              {['Fellowships', 'Textiles', 'Government Grants', 'Gujarat', 'Pottery'].map(s => (
                <button 
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{ background: '#f5f5f5', border: 'none', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-dark)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GlobalSearch;
