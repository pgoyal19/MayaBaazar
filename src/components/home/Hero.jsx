import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiveNowWidget from './LiveNowWidget';
import { useI18n } from '../../context/I18nContext';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const descLines = t('hero.desc').split('\n');

  return (
    <div className="hero-new relative-hero" style={{ background: 'transparent', boxShadow: 'none' }}>
      <div className="hero-content-new" style={{ position: 'relative', zIndex: 10, padding: '2rem', borderRadius: '2rem' }}>
        <h1 className="hero-title-new">{t('hero.title1')}<br />{t('hero.title2')}</h1>
        <p className="hero-desc-new">
          {descLines.map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </p>
        <div className="hero-buttons-new">
          <button className="btn ui-btn-red pulse-hover" onClick={() => navigate('/live')}>
            <span style={{ fontSize: '1.2rem', marginRight: '5px' }}>▶</span> {t('hero.watchLive')}
          </button>
          <button className="btn ui-btn-white shift-hover" onClick={() => navigate('/shop')}>{t('hero.exploreProducts')}</button>
        </div>
        <div className="hero-tags-new">
          <div className="hero-tag-item"><span className="tag-icon">📦</span> {t('hero.tagDirect')}</div>
          <div className="hero-tag-item"><span className="tag-icon">🔒</span> {t('hero.tagPricing')}</div>
          <div className="hero-tag-item"><span className="tag-icon">🎥</span> {t('hero.tagStories')}</div>
          <div className="hero-tag-item"><span className="tag-icon">🌐</span> {t('hero.tagLang')}</div>
        </div>
      </div>
      <LiveNowWidget />
    </div>
  );
};

export default Hero;
