import { useCallback, useMemo, useRef, useState } from 'react';

export type DemoUser = { email: string } | null;

export type UseDemoAuthReturn = {
  user: DemoUser;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

/**
 * A small demo auth hook that simulates an async login using setTimeout.
 *
 * Accepted credentials (for demo):
 *  - email: test@example.com
 *  - password: password123
 */
export function useDemoAuth(): UseDemoAuthReturn {
  const [user, setUser] = useState<DemoUser>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    setError('');
    setLoading(true);
    clearTimer();

    await new Promise<void>(resolve => {
      timerRef.current = setTimeout(() => {
        // Simple demo check
        const ok = email.toLowerCase() === 'test@example.com' && password === 'password123';
        if (ok) {
          setUser({ email });
          setError('');
        } else {
          setUser(null);
          setError('Invalid email or password');
        }
        setLoading(false);
        resolve();
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    clearTimer();
    setUser(null);
    setError('');
    setLoading(false);
  }, []);

  const isAuthenticated = useMemo(() => !!user, [user]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signIn,
    logout,
  };
}

export default useDemoAuth;
