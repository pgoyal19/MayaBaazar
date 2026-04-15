import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

async function fetchJson(path, options = {}) {
  const { headers: hdr = {}, ...rest } = options;
  const headers = { ...hdr };
  if (rest.body != null && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(apiUrl(path), {
    credentials: 'include',
    headers,
    ...rest,
  });
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || 'Invalid response' };
  }
  return { res, data };
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [authGateOpen, setAuthGateOpen] = useState(false);
  const [authGatePath, setAuthGatePath] = useState(null);

  const refreshUser = useCallback(async () => {
    try {
      const { res, data } = await fetchJson('/api/auth/me', { method: 'GET' });
      if (res.ok && data && Object.hasOwn(data, 'user')) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refreshUser();
      if (!cancelled) setAuthReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  const openAuthGate = useCallback((opts = {}) => {
    setAuthGatePath(opts.pendingPath || null);
    setAuthGateOpen(true);
  }, []);

  const closeAuthGate = useCallback(() => {
    setAuthGateOpen(false);
    setAuthGatePath(null);
  }, []);

  const login = useCallback(async (email, password) => {
    // Mock auth for prototype
    const isSeller = email.toLowerCase().includes('seller');
    const mockUser = { id: `user-${Date.now()}`, name: isSeller ? 'Seller Demo' : 'Buyer Demo', role: isSeller ? 'seller' : 'buyer', email };
    setUser(mockUser);
    return { ok: true, user: mockUser };
  }, []);

  const register = useCallback(async (name, email, password, role) => {
    const mockUser = { id: `user-${Date.now()}`, name: name.trim() || 'Demo User', role: role === 'seller' ? 'seller' : 'buyer', email: email.trim() };
    setUser(mockUser);
    return { ok: true, user: mockUser };
  }, []);

  const loginWithGoogle = useCallback(async (credential, role = 'buyer') => {
    const mockUser = { id: `user-${Date.now()}`, name: 'Google User', role: role === 'seller' ? 'seller' : 'buyer', email: 'google@mock.com' };
    setUser(mockUser);
    return { ok: true, user: mockUser };
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetchJson('/api/auth/logout', { method: 'POST' });
    } catch {
      /* still clear client */
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      authReady,
      login,
      register,
      loginWithGoogle,
      logout,
      refreshUser,
      isAuthenticated: !!user,
      authGateOpen,
      authGatePath,
      openAuthGate,
      closeAuthGate,
    }),
    [
      user, 
      authReady, 
      login, 
      register, 
      loginWithGoogle, 
      logout, 
      refreshUser, 
      authGateOpen, 
      authGatePath, 
      openAuthGate, 
      closeAuthGate
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- standard context hook export
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
