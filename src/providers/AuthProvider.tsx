import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { createUsersApi } from "../services/apiClient";
import type { AuthResponse, User } from "../types/api";
import { parseUser } from "../utils/apiGuards";

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
        const usersApi = createUsersApi(token);
        const response = await usersApi.usersControllerGetCurrentUserRaw();
        const profilePayload: unknown = await response.raw.json();
        const profile = parseUser(profilePayload);
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
    const usersApi = createUsersApi(token);
    const response = await usersApi.usersControllerGetCurrentUserRaw();
    const profilePayload: unknown = await response.raw.json();
    const profile = parseUser(profilePayload);
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
