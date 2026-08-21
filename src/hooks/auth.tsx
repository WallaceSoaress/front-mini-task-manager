import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getCurrentUser, login, logout } from "../services/authService";
import type { AuthenticatedUser } from "../services/authService";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: AuthenticatedUser | null;
  isAuthorized: boolean;
  isLoadingAuth: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      try {
        const authenticatedUser = await getCurrentUser();
        if (isMounted) {
          setUser(authenticatedUser);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingAuth(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  async function signIn(credentials: SignInCredentials) {
    const authenticatedUser = await login(credentials);
    setUser(authenticatedUser);
  }

  async function signOut() {
    try {
      await logout();
    } finally {
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthorized: Boolean(user),
      isLoadingAuth,
      signIn,
      signOut,
    }),
    [isLoadingAuth, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
}
