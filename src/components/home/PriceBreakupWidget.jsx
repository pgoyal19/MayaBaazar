import React from 'react';

const PriceBreakupWidget = ({ artisanEarns, platformFee, delivery, total }) => {
  return (
    <div className="ui-price-breakup-section">
      <div className="ui-widget ui-price-breakup widget-float" style={{ padding: '1.5rem', minWidth: '280px', borderRadius: '2rem' }}>
        <div className="ui-price-header" style={{ borderBottom: 'none' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#333' }}>Price Breakup</h3>
          <span className="info-icon" style={{ opacity: 0.5 }}>ⓘ</span>
        </div>

        <div className="ui-price-row" style={{ borderTop: 'none', paddingTop: '0.5rem' }}>
          <span style={{ color: '#555' }}>Artisan earns</span>
          <span className="bold-val">₹{artisanEarns.toLocaleString()}</span>
        </div>
        <div className="ui-price-row">
          <span style={{ color: '#555' }}>Platform fee</span>
          <span className="bold-val">₹{platformFee.toLocaleString()}</span>
        </div>
        <div className="ui-price-row dark-border" style={{ paddingBottom: '1rem' }}>
          <span style={{ color: '#555' }}>Delivery</span>
          <span className="bold-val">₹{delivery.toLocaleString()}</span>
        </div>

        <div className="ui-price-total" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1rem', color: '#775841', fontSize: '0.95rem', fontWeight: 'bold' }}>
          You support the artisan directly 💛
        </div>
      </div>
    </div>
  );
};

export default PriceBreakupWidget;
