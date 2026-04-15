import React, { useState } from 'react';

const NGOsWidget = () => {
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setShowPartnerForm(false);
      setFormSubmitted(false);
    }, 3000);
  };
  return (
    <div id="ngo-partners" className="ui-widget ui-bottom-card" style={{ padding: '1.5rem', minHeight: 'auto', flexGrow: 1 }}>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Our NGO Partners</h3>
      <div className="ngo-list" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div className="ngo-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div className="ngo-icon orange-icon" style={{ background: '#fdf3e2', color: '#f29c41', borderRadius: '50%', padding: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="currentColor"/></svg>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Dastkar</span>
        </div>
        <div className="ngo-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div className="ngo-icon blue-icon" style={{ background: '#e2f0fd', color: '#4185f2', borderRadius: '50%', padding: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="currentColor"/></svg>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>SEWA</span>
        </div>
        <div className="ngo-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div className="ngo-icon red-icon" style={{ background: '#fde2e6', color: '#dd4b61', borderRadius: '50%', padding: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="currentColor"/></svg>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>CRAFTS<br/>COUNCIL</span>
        </div>
      </div>
      
      {!showPartnerForm ? (
        <button 
          onClick={() => setShowPartnerForm(true)}
          className="btn ui-btn-yellow pulse-hover" 
          style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', background: '#f4c430', color: 'black', fontWeight: 'bold', borderRadius: '2rem' }}>
          Partner With Us
        </button>
      ) : (
        formSubmitted ? (
          <div style={{ padding: '1rem', background: '#e8f5e9', color: '#2e7d32', textAlign: 'center', borderRadius: '1rem', fontWeight: 'bold' }}>
            Thanks for reaching out! We will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '1rem', borderTop: '8px solid #673ab7', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>📝 Partner Application</h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#555', marginBottom: '0.3rem' }}>Organization Name *</label>
              <input required type="text" style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', borderBottom: '2px solid #ccc', outline: 'none' }} placeholder="Your answer" />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#555', marginBottom: '0.3rem' }}>Email Address *</label>
              <input required type="email" style={{ width: '100%', padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px', borderBottom: '2px solid #ccc', outline: 'none' }} placeholder="Your answer" />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowPartnerForm(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: '#673ab7', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '0.5rem 1.2rem', background: '#673ab7', border: 'none', color: '#fff', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
            </div>
          </form>
        )
      )}
    </div>
  );
};

export default NGOsWidget;
