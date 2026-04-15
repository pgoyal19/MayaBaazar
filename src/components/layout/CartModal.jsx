import React, { useState } from 'react';

const CartModal = ({ isOpen, onClose, cart, clearCart, showToast }) => {
  const [step, setStep] = useState('cart'); // cart, address, payment, success
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', zip: '' });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const resetAndClose = () => {
    setStep('cart');
    onClose();
  };

  const processPayment = () => {
    if (!card.number || !card.expiry || !card.cvv) {
      if (showToast) showToast('Please enter complete mock card details.');
      return;
    }
    setStep('success');
    if (showToast) showToast('Payment processing... Success! 🎉');
  };

  const completeOrder = () => {
    clearCart();
    resetAndClose();
  };

  const renderCartStep = () => (
    <>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-dark)' }}>Your Cart ({cart.length})</h2>
        <button onClick={resetAndClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#999', marginTop: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <p>Your cart is empty.</p>
            <p style={{ fontSize: '0.9rem' }}>Discover unique artisan pieces on Live Reels!</p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map((item, idx) => (
              <li key={`${item.id}-${idx}`} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f5f5f5' }}>
                <img src={item.img} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{item.title}</div>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>By {item.artisan}</div>
                  <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>₹{item.price}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button 
            onClick={() => setStep('address')}
            style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Add Address ➔
          </button>
        </div>
      )}
    </>
  );

  const renderAddressStep = () => (
    <>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => setStep('cart')} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#666' }}>←</button>
        <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-dark)' }}>Delivery Details</h2>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <label>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>Full Name</div>
          <input type="text" value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="John Doe" />
        </label>
        <label>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>Phone Number</div>
          <input type="tel" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="+91 98765 43210" />
        </label>
        <label>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>Street Address</div>
          <input type="text" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="Flat / House No. / Area" />
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>City</div>
            <input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="Mumbai" />
          </label>
          <label style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>PIN Code</div>
            <input type="text" value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="400001" />
          </label>
        </div>
      </div>
      <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
        <button 
          onClick={() => {
            if (!address.name || !address.line1) return showToast?.("Please complete delivery details.");
            setStep('payment');
          }}
          style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--text-dark)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Continue to Payment ➔
        </button>
      </div>
    </>
  );

  const renderPaymentStep = () => (
    <>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => setStep('address')} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#666' }}>←</button>
        <h2 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-dark)' }}>Secure Payment</h2>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#666' }}>Order Total</span>
            <strong style={{ fontSize: '1.1rem' }}>₹{total}</strong>
          </div>
        </div>

        <h3 style={{ margin: '1rem 0 0.5rem', fontSize: '1rem' }}>Mock Credit/Debit Card</h3>
        <label>
          <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>Card Number</div>
          <input type="text" maxLength={19} value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px', letterSpacing: '2px' }} placeholder="0000 0000 0000 0000" />
        </label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>Expiry</div>
            <input type="text" maxLength={5} value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="MM/YY" />
          </label>
          <label style={{ flex: 1 }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold', color: '#555' }}>CVV</div>
            <input type="password" maxLength={3} value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '6px' }} placeholder="***" />
          </label>
        </div>
      </div>
      <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
        <button 
          onClick={processPayment}
          style={{ width: '100%', padding: '1rem', backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Pay ₹{total}
        </button>
      </div>
    </>
  );

  const renderSuccessStep = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'scaleIn 0.4s ease-out' }}>🛍️</div>
      <h2 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Payment Successful!</h2>
      <p style={{ color: '#666', lineHeight: 1.5, marginBottom: '2rem' }}>
        Thank you for supporting Maaya Bazaar artisans. Your order <strong>#{Math.floor(100000 + Math.random() * 900000)}</strong> has been placed.
      </p>
      <button 
        onClick={completeOrder}
        style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--text-dark)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Close & Continue Browsing
      </button>
    </div>
  );

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)', zIndex: 10000, display: 'flex', justifyContent: 'flex-end' }} onClick={resetAndClose}>
      
      <div 
        style={{ background: '#fff', width: '100%', maxWidth: '420px', height: '100%', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.3s forwards' }}
        onClick={e => e.stopPropagation()}
      >
        {step === 'cart' && renderCartStep()}
        {step === 'address' && renderAddressStep()}
        {step === 'payment' && renderPaymentStep()}
        {step === 'success' && renderSuccessStep()}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CartModal;
