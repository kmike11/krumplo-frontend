import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getCurrentUser } from "../services/api";
import type { AuthResponse, User } from "../types/api";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
  refresh: () => Promise<void>;
  setUser: (user: User) => void;
}

const STORAGE_KEY = "workboard_token";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY)
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const profile = await getCurrentUser(token);
        if (!cancelled) {
          setUser(profile);
        }
      } catch {
        if (!cancelled) {
          localStorage.removeItem(STORAGE_KEY);
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleLogin = (auth: AuthResponse) => {
    setToken(auth.accessToken);
    localStorage.setItem(STORAGE_KEY, auth.accessToken);
    setUser(auth.user);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const refresh = async () => {
    if (!token) {
      return;
    }
    const profile = await getCurrentUser(token);
    setUser(profile);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login: handleLogin,
      logout: handleLogout,
      refresh,
      setUser
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
