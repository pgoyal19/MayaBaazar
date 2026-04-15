import React from 'react';
import { MOCK_COMPETITIONS } from '../../server/mockData';

const CompetitionsWidget = () => {
  return (
    <div id="competitions" className="ui-widget ui-bottom-card" style={{ gridColumn: 'span 1', backgroundColor: '#fdf5ea' }}>
      <div className="widget-header-flex">
        <h3 style={{ fontSize: '1.4rem', lineHeight: '1.3' }}>National Competitions<br />& Opportunities</h3>
        <span className="view-all-link">View All →</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {MOCK_COMPETITIONS.map(comp => (
          <div key={comp.id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', padding: '0.8rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <img src={comp.img} alt={comp.title} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '0.8rem', marginBottom: '0.5rem' }} />
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem', lineHeight: '1.2', marginBottom: '4px' }}>{comp.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>{comp.date}</div>
            <button className="btn-mini-apply" style={{ width: '100%', background: comp.btnColor, padding: '0.4rem' }}>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsWidget;
