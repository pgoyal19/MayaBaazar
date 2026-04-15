import React from 'react';
import { Link } from 'react-router-dom';

const NotificationModal = ({ isOpen, onClose, notifications }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }} 
        onClick={onClose} 
      />
      <div 
        style={{
          position: 'absolute',
          top: '60px',
          right: '1rem', // aligns with the nav icons roughly
          width: '380px',
          maxHeight: '80vh',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideDownFromTop 0.25s ease-out forwards',
          border: '1px solid #eaeaea'
        }}
      >
        <div style={{ padding: '1.2rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-dark)', fontWeight: 'bold' }}>Notifications</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary-red)', cursor: 'pointer', fontWeight: 'bold' }} onClick={onClose}>Mark all as read</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {notifications && notifications.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {notifications.map((notif) => (
                <li key={notif.id} style={{
                  padding: '1.2rem',
                  borderBottom: '1px solid #f5f5f5',
                  backgroundColor: notif.unread ? '#fff9f9' : '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-dark)', fontSize: '0.95rem' }}>
                      {notif.unread && <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--primary-red)', borderRadius: '50%', marginRight: '8px', transform: 'translateY(-1px)' }} />}
                      {notif.title}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#999', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{notif.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.4 }}>{notif.message}</p>
                </li>
              ))}
            </ul>
          ) : (
             <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#999' }}>
               <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
               <p style={{ margin: 0 }}>You're all caught up!</p>
             </div>
          )}
        </div>

        <div style={{ padding: '1rem', borderTop: '1px solid #f0f0f0', textAlign: 'center', backgroundColor: '#fafafa' }}>
          <Link to="/profile" onClick={onClose} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 'bold' }}>
            View Notification Settings
          </Link>
        </div>

        <style>{`
          @keyframes slideDownFromTop {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
};

export default NotificationModal;
