import React from 'react';
import { useI18n } from '../../context/I18nContext';

/** Amazon-style strip: delivery + search — Maaya styling */
export default function BuyerMarketplaceStrip({ shopSearch, setShopSearch, onSubmitSearch }) {
  const { t } = useI18n();

  return (
    <section className="buyer-mkt-strip" aria-label={t('buyerStrip.aria')}>
      <div className="buyer-mkt-delivery">
        <span className="buyer-mkt-delivery-icon">📍</span>
        <div>
          <p className="buyer-mkt-delivery-label">{t('buyerStrip.deliverTo')}</p>
          <p className="buyer-mkt-delivery-pin">{t('buyerStrip.pin')}</p>
        </div>
        <span className="buyer-mkt-express-badge">{t('buyerStrip.express')}</span>
      </div>
      <form
        className="buyer-mkt-search"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitSearch?.();
        }}
        role="search"
      >
        <span className="buyer-mkt-search-prefix" aria-hidden>{t('buyerStrip.allCrafts')}</span>
        <input
          type="search"
          className="buyer-mkt-search-input"
          placeholder={t('buyerStrip.searchPlaceholder')}
          value={shopSearch}
          onChange={(e) => setShopSearch(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="buyer-mkt-search-btn ui-btn-red" aria-label={t('buyerStrip.searchAria')}>
          {t('buyerStrip.search')}
        </button>
      </form>
      <div className="buyer-mkt-trust">
        <span>{t('buyerStrip.trust1')}</span>
        <span>{t('buyerStrip.trust2')}</span>
        <span>{t('buyerStrip.trust3')}</span>
      </div>
    </section>
  );
}
