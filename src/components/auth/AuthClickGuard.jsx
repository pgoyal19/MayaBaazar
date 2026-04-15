import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Guests: intercepts most button clicks and in-app links to open the auth gate (login / sign up + buyer / seller on sign up).
 */
export default function AuthClickGuard() {
  const { isAuthenticated, authReady, openAuthGate } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!authReady || isAuthenticated) return;

    const allowedPath = (href) => {
      if (!href || href === '#' || href.startsWith('#')) return true;
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return true;
      const path = href.split('?')[0];
      return path === '/' || path === '/login';
    };

    const handler = (e) => {
      if (location.pathname === '/login') return;
      const node = e.target;
      if (!node || !node.closest) return;
      if (node.closest('[data-no-auth-gate]')) return;

      const tag = node.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'OPTION') return;
      if (node.closest('input, textarea, select')) return;

      const anchor = node.closest('a[href]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (allowedPath(href)) return;
        e.preventDefault();
        e.stopPropagation();
        const path = href.split('?')[0];
        openAuthGate({ pendingPath: path });
        return;
      }

      const btn = node.closest('button');
      if (btn) {
        if (btn.type === 'file' || btn.getAttribute('aria-label') === 'Close') return;
        if (btn.closest('[data-no-auth-gate]')) return;
        e.preventDefault();
        e.stopPropagation();
        const targetPath = btn.getAttribute('data-auth-target') || location.pathname;
        openAuthGate({ pendingPath: targetPath });
      }
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [authReady, isAuthenticated, openAuthGate, location.pathname]);

  return null;
}
