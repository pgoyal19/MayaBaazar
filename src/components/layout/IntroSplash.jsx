import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../context/I18nContext';

/** Public asset — place file at `public/माया.jpeg` */
const SPLASH_IMAGE_SRC = encodeURI('/माया.jpeg');

export default function IntroSplash({ onComplete }) {
  const { t, i18nReady } = useI18n();
  const [fadeOut, setFadeOut] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const doneTimer = setTimeout(() => {
      if (finished.current) return;
      finished.current = true;
      onComplete();
    }, 4000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`maya-splash-root ${fadeOut ? 'maya-splash-fade-out' : ''}`} aria-hidden={fadeOut} data-no-auth-gate>
      <img src={SPLASH_IMAGE_SRC} alt="" className="maya-splash-image" fetchPriority="high" decoding="async" />
      <div className="maya-splash-scrim" />
      <div className="maya-splash-bottom">
        <div className="maya-splash-slider-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-label={i18nReady ? t('intro.loadingAria') : 'Loading'}>
          <div className="maya-splash-slider-fill" />
        </div>
      </div>
    </div>
  );
}
