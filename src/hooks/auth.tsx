import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { login } from "../services/authService";
import type { AuthenticatedUser } from "../services/authService";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: AuthenticatedUser | null;
  isAuthorized: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  async function signIn(credentials: SignInCredentials) {
    const authenticatedUser = await login(credentials);
    setUser(authenticatedUser);
  }

  function signOut() {
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthorized: Boolean(user),
      signIn,
      signOut,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
}
