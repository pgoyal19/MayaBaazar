import React from 'react';
import artPotteryImg from '../../assets/art_pottery.png';

const LiveAuctionWidget = () => {
  return (
    <div id="auction" className="ui-widget ui-bottom-card ui-dark-widget" style={{ gridColumn: 'span 1' }}>
      <div className="widget-header-flex" style={{ color: 'white', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.4rem' }}>Live Auction</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: '1rem' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, textAlign: 'right' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>02 : 18 : 45</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Ending Soon</div>
        </div>
        
        <img src={artPotteryImg} style={{ width: '150px', height: '180px', objectFit: 'cover', borderRadius: '1rem', border: '5px solid #1a2d42', zIndex: 2, position: 'relative' }} alt="Vintage Brass Diya Stand" />
        
        <div style={{ alignSelf: 'stretch', background: '#23374c', borderRadius: '1rem', padding: '3rem 1rem 1rem', marginTop: '-3rem', zIndex: 1, textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>Vintage Brass<br/>Diya Stand</h4>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '1rem' }}>by Ramesh Ji, Moradabad</div>
          
          <div style={{ fontSize: '0.9rem', opacity: 0.8, display: 'inline-block' }}>Current Bid:</div> <span style={{ fontSize: '1.2rem', fontWeight: 'bold', marginLeft: '5px' }}>₹2,400</span>
          
          <button className="btn ui-btn-red pulse-hover" style={{ width: '100%', marginTop: '1rem', padding: '0.8rem' }}>Place Bid</button>
        </div>
      </div>
      <div className="live-dots" style={{ display: 'flex', justifySelf: 'center', margin: '1rem auto 0', gap: '5px' }}>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'white'}}></span>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></span>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></span>
        <span style={{width: '6px', height:'6px', borderRadius:'50%', background:'rgba(255,255,255,0.3)'}}></span>
      </div>
    </div>
  );
};

export default LiveAuctionWidget;
