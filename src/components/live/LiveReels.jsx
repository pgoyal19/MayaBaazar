import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_REELS } from '../../server/mockData';

/**
 * MP4 files you place in `public/reels/` — order matches rows in `MOCK_REELS` (mockData.js).
 * Rename this list to match your real filenames (e.g. 'pottery-demo.mp4').
 */
const PUBLIC_REEL_FILENAMES = [
  'bag.mp4',
  'jhumka.mp4',
  'jutti.mp4',
  'kurta.mp4',
  'saree.mp4',
  'bangles.mp4',
];

function buildPublicReelSrc(filename) {
  if (!filename?.trim()) return '';
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}reels/${encodeURIComponent(filename)}`;
}

function LiveReels({ onAddToCart, showToast }) {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(() => ({}));

  const setVideoRef = useCallback((el, index) => {
    videoRefs.current[index] = el;
  }, []);

  const [reels, setReels] = useState(() =>
    MOCK_REELS.map((reel, index) => ({
      ...reel,
      videoUrl: buildPublicReelSrc(PUBLIC_REEL_FILENAMES[index]) || reel.videoUrl,
    }))
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.index);
          const video = videoRefs.current[idx];
          if (!video) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            video.play().catch(() => {});
            setActiveIndex(idx);
          } else {
            video.pause();
          }
        });
      },
      { root, threshold: [0.45, 0.55, 0.65] }
    );

    const slides = root.querySelectorAll('[data-reel-slide]');
    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [reels.length]);

  const toggleLike = (reel) => {
    setLiked((prev) => {
      const next = { ...prev, [reel.id]: !prev[reel.id] };
      if (!prev[reel.id]) showToast(`You loved ${reel.artisan}'s story ❤️`);
      return next;
    });
  };

  const deleteReel = (id) => {
    // Remove from mock data
    const idx = MOCK_REELS.findIndex((r) => r.id === id);
    if (idx !== -1) MOCK_REELS.splice(idx, 1);
    
    // Update local state
    setReels((prev) => prev.filter((r) => r.id !== id));
    showToast('Reel deleted 🗑️');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard! ✨');
    } else {
      showToast('Clipboard not supported here ↗');
    }
  };

  const handleComment = (id) => {
    const comment = window.prompt("Add your comment:");
    if (comment && comment.trim() !== '') {
      setReels(prev => prev.map(r => r.id === id ? { ...r, comments: r.comments + 1 } : r));
      showToast('Comment posted! 💬');
    }
  };

  const handleShop = (reel) => {
    if (reel.product && onAddToCart) {
      onAddToCart(reel.product);
      showToast(`${reel.product.title} added to your cart 🛒`);
    } else {
      showToast(`${reel.product?.title || 'Item'} clicked, but cart not configured.`);
    }
  };

  const playHindiAudio = (text) => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech not supported in this browser.');
      return;
    }
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95; // Slightly slower for better dictation
    window.speechSynthesis.speak(utterance);
    showToast('Playing Hindi Audio Track 🎙️🇮🇳');
  };

  return (
    <div className="live-reels-outer">
      <header className="live-reels-header">
        <div>
          <h1 className="live-reels-title">Artisan Reels</h1>
          <p className="live-reels-tagline">We don&apos;t sell products—we sell stories.</p>
        </div>
        <Link to="/" className="live-reels-back ui-btn-white" style={{ textDecoration: 'none', padding: '0.65rem 1.2rem' }}>
          ← Home
        </Link>
      </header>

      <div className="live-reels-viewport" ref={containerRef}>
        {reels.map((reel, index) => (
          <article
            key={reel.id}
            className="live-reel-slide"
            data-reel-slide
            data-index={index}
          >
            <div className="live-reel-media" onClick={() => setIsMuted(m => !m)} style={{ cursor: 'pointer' }}>
              {reel.videoUrl ? (
                <video
                  ref={(el) => setVideoRef(el, index)}
                  src={reel.videoUrl}
                  poster={reel.poster}
                  className="live-reel-video"
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img src={reel.poster} alt="" className="live-reel-video" style={{ objectFit: 'cover' }} />
              )}
              <div className="live-reel-gradient" aria-hidden />
              
              {/* Audio Toggle Indicator */}
              {reel.videoUrl && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.4rem 0.6rem', borderRadius: '50px', color: '#fff', fontSize: '0.85rem', zIndex: 5, pointerEvents: 'none' }}>
                  {isMuted ? '🔇 Muted' : '🔊 Sound On'}
                </div>
              )}
            </div>

            <div className="live-reel-progress" aria-hidden>
              {reels.map((r, i) => (
                <span
                  key={r.id}
                  className={`live-reel-progress-seg ${i === activeIndex ? 'active' : ''} ${i < activeIndex ? 'seen' : ''}`}
                />
              ))}
            </div>

            <div className="live-reel-actions">
              <button
                type="button"
                className="live-reel-action-btn"
                onClick={() => toggleLike(reel)}
                aria-label={liked[reel.id] ? 'Unlike' : 'Like'}
              >
                <span className={liked[reel.id] ? 'live-heart on' : 'live-heart'}>♥</span>
                <span className="live-reel-action-label">{reel.likes + (liked[reel.id] ? 1 : 0)}</span>
              </button>
              <button
                type="button"
                className="live-reel-action-btn"
                onClick={() => handleComment(reel.id)}
                aria-label="Comment"
              >
                <span className="live-reel-icon">💬</span>
                <span className="live-reel-action-label">{reel.comments}</span>
              </button>
              <button
                type="button"
                className="live-reel-action-btn"
                onClick={handleShare}
                aria-label="Share"
              >
                <span className="live-reel-icon">↗</span>
                <span className="live-reel-action-label">Share</span>
              </button>
              {reel.storyHi && (
                <button
                  type="button"
                  className="live-reel-action-btn"
                  onClick={() => playHindiAudio(reel.storyHi)}
                  aria-label="Listen in Hindi"
                >
                  <span className="live-reel-icon">🎙️</span>
                  <span className="live-reel-action-label">Hindi</span>
                </button>
              )}
              {reel.product && (
                <button
                  type="button"
                  className="live-reel-action-btn live-reel-shop-ring"
                  onClick={() => handleShop(reel)}
                  aria-label="Shop this product"
                >
                  <span className="live-reel-bag">🛍</span>
                  <span className="live-reel-action-label">Shop</span>
                </button>
              )}
              {reel.artisan === 'You' && (
                <button
                  type="button"
                  className="live-reel-action-btn"
                  onClick={() => deleteReel(reel.id)}
                  aria-label="Delete Reel"
                  style={{ color: '#ff4d4f' }}
                >
                  <span className="live-reel-icon">🗑️</span>
                  <span className="live-reel-action-label" style={{ color: '#ff4d4f' }}>Delete</span>
                </button>
              )}
            </div>

            <div className="live-reel-caption-block">
              <div className="live-reel-artisan-row">
                <img src={reel.artisanAvatar} alt="" className="live-reel-avatar" width={44} height={44} />
                <div>
                  <p className="live-reel-artisan-name">{reel.artisan}</p>
                  <p className="live-reel-craft">{reel.craft}</p>
                </div>
                <span className="live-reel-live-pill">LIVE STORY</span>
              </div>
              <p className="live-reel-story">{reel.story}</p>
              {reel.product && (
                <div className="live-reel-product-chip">
                  <img src={reel.product.img} alt="" width={48} height={48} className="live-reel-product-thumb" />
                  <div className="live-reel-product-meta">
                    <span className="live-reel-product-name">{reel.product.title}</span>
                    <span className="live-reel-product-price">₹{reel.product.price}</span>
                  </div>
                  <button type="button" className="live-reel-cta" onClick={() => handleShop(reel)}>
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="live-reels-footnote">
        Artisans explain their craft on camera; you bring the piece home when the story speaks to you.
      </p>
    </div>
  );
}

export default LiveReels;
