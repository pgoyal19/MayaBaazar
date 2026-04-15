import React from 'react';

const DesiStickers = () => {
  const stickers = [
    { text: 'uff kalesh', style: 'outline-style', top: '12%', left: '8%', rotate: '-15deg', delay: '0s' },
    { text: 'shaam ki chai ☕', style: 'solid', top: '18%', right: '10%', rotate: '12deg', delay: '0.5s' },
    { text: 'pani puri is art', style: 'solid', top: '35%', left: '5%', rotate: '-5deg', delay: '1s', color: '#ffb300' },
    { text: 'patakha 💥', style: 'outline-style', top: '45%', right: '8%', rotate: '20deg', delay: '1.2s' },
    { text: 'log kya kahenge?', style: 'solid', top: '65%', left: '12%', rotate: '-10deg', delay: '0.8s', color: '#3f51b5' },
    { text: 'nazaakat ✨', style: 'outline-style', top: '75%', right: '15%', rotate: '5deg', delay: '2s' },
    { text: 'bburi nazar vale tera muu kala 🧿', style: 'solid', top: '85%', left: '40%', rotate: '-3deg', delay: '1.5s', color: '#2a2527' },
    { text: 'sometimes "sajna sawarna" doesn\'t need a sajna', style: 'solid', top: '25%', left: '35%', rotate: '8deg', delay: '2.5s', fontSize: '1.2rem' },
    { text: 'jutti speaks louder than words', style: 'solid', top: '55%', left: '42%', rotate: '-8deg', delay: '0.3s', color: '#8e44ad' },
    { text: 'desi munda 😎', style: 'outline-style', top: '5%', left: '50%', rotate: '10deg', delay: '1.8s' },
    { text: 'Bade bade deshon mein aisi choti choti baatein hoti rehti hain', style: 'outline-style', top: '92%', left: '10%', rotate: '-5deg', delay: '3s', fontSize: '1.4rem' }
  ];

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden', zIndex: 10 }}>
      {stickers.map((s, idx) => (
        <div 
          key={idx}
          className={`desi-sticker ${s.style}`}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            color: s.style === 'solid' ? '#fff' : 'var(--text-dark)',
            backgroundColor: s.style === 'solid' ? (s.color || 'var(--primary-red)') : 'transparent',
            '--rotateZ': s.rotate,
            animationDelay: s.delay,
            fontSize: s.fontSize || (s.style === 'outline-style' ? '2.2rem' : '1.6rem')
          }}
        >
          {s.text}
        </div>
      ))}
    </div>
  );
};

export default DesiStickers;
