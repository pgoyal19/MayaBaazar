import React, { useEffect, useRef } from 'react';

/**
 * Google Identity Services button. Set VITE_GOOGLE_CLIENT_ID (same as server GOOGLE_CLIENT_ID).
 */
export default function GoogleSignInButton({ onCredential, disabled }) {
  const ref = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !ref.current || disabled) return;

    let cancelled = false;
    let intervalId;

    const mount = () => {
      if (cancelled || !window.google?.accounts?.id || !ref.current) return;
      ref.current.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (resp) => {
          if (resp?.credential) onCredential(resp.credential);
        },
      });
      window.google.accounts.id.renderButton(ref.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: Math.min(380, ref.current.parentElement?.clientWidth || 320),
      });
    };

    intervalId = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(intervalId);
        mount();
      }
    }, 80);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [clientId, onCredential, disabled]);

  if (!clientId) {
    return (
      <p className="auth-google-missing">
        For Google sign-in, add <code>VITE_GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_ID</code> (same web client ID) to your{' '}
        <code>.env</code> and restart the dev server.
      </p>
    );
  }

  return <div ref={ref} className="google-signin-wrap" />;
}
