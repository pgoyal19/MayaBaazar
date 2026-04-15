import React from 'react';

const ArtisanStoryModal = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="auth-gate-overlay" onClick={onClose} style={{ zIndex: 14000, padding: '2rem 1rem' }}>
      <div 
        className="auth-gate-modal" 
        onClick={e => e.stopPropagation()} 
        style={{ 
          maxWidth: '600px', 
          width: '100%', 
          maxHeight: '85vh', 
          overflowY: 'auto',
          padding: '2rem'
        }}
      >
        <button className="auth-gate-close" onClick={onClose}>✕</button>
        
        {/* Header section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <img 
            src={story.img} 
            alt={story.title} 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              border: '3px solid var(--primary-red)'
            }} 
          />
          <div>
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '2rem', fontFamily: 'Fredoka, sans-serif' }}>
              {story.title}
            </h2>
            <div style={{ color: 'var(--primary-red)', fontWeight: 'bold', fontSize: '1.1rem' }}>
              {story.subtitle}
            </div>
          </div>
        </div>

        {/* Bio section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '2px solid rgba(234, 211, 196, 0.5)', paddingBottom: '0.5rem' }}>
            About My Craft
          </h3>
          <p style={{ lineHeight: '1.7', color: 'var(--text-light)', fontSize: '1.05rem' }}>
            {story.bio}
          </p>
        </div>

        {/* Gallery section */}
        <div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>
            My Masterpieces
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '1rem'
          }}>
            {story.gallery && story.gallery.map((imgUrl, idx) => (
              <div 
                key={idx} 
                className="card-3d-tilt"
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  aspectRatio: '1/1',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <img 
                  src={imgUrl} 
                  alt={`Masterpiece ${idx + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanStoryModal;
