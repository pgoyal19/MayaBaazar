import React from 'react';
import { useNavigate } from 'react-router-dom';
import artisanBlockprintImg from '../../assets/artisan_blockprint.png';

const LiveNowWidget = () => {
  const navigate = useNavigate();

  return (
    <div className="live-now-widget hover-glow float-anim" id="live" onClick={() => navigate('/live')} style={{ cursor: 'pointer' }}>
      <div className="live-badge-top">🔴 LIVE NOW</div>
      <img src={artisanBlockprintImg} alt="Live stream" className="live-widget-img" />
      <div className="live-viewer-count">👁️ 2.4K</div>
      <div className="live-widget-info">
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Madhubani Painting</h4>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>by Suman Devi</p>
        </div>
        <button className="btn ui-btn-red shift-hover" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', borderRadius: '1.5rem' }} onClick={(e) => { e.stopPropagation(); navigate('/live'); }}>Join Live</button>
      </div>
      <div className="live-dots" style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '10px' }}>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'var(--primary-red)'}}></span>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'#ccc'}}></span>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'#ccc'}}></span>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'#ccc'}}></span>
      </div>
    </div>
  );
};

export default LiveNowWidget;
