import React, { useState, useEffect, useRef } from 'react';
import Hero from './Hero';
import CompetitionsWidget from '../widgets/CompetitionsWidget';
import LiveAuctionWidget from '../widgets/LiveAuctionWidget';
import StoriesWidget from '../widgets/StoriesWidget';
import NGOsWidget from '../widgets/NGOsWidget';
import DesiStickers from '../design/DesiStickers';
import { useI18n } from '../../context/I18nContext';

const useScrollReveal = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options || { threshold: 0.15 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [domRef, isVisible];
};

const RevealWrapper = ({ children, animation = "fade-up", delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${animation}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Home = ({ handleLike, showToast }) => {
  const { t } = useI18n();

  return (
    <div style={{ position: 'relative' }}>
      <DesiStickers />
      <Hero />

      <div className="ui-bottom-components" style={{ marginTop: '4rem', position: 'relative', zIndex: 20 }}>
        <RevealWrapper animation="slide-up" delay={50}>
          <CompetitionsWidget />
        </RevealWrapper>

        <RevealWrapper animation="slide-up" delay={150}>
          <LiveAuctionWidget />
        </RevealWrapper>

        <RevealWrapper animation="slide-up" delay={250}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '1.5rem', height: '100%' }}>
            <StoriesWidget />
            <NGOsWidget />
          </div>
        </RevealWrapper>
      </div>
    </div>
  );
};

export default Home;
