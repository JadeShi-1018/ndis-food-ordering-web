"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  email: string | null;
  setAuth: (token: string | null, email: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  email: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const setAuth = (newToken: string | null, newEmail: string | null) => {
    setToken(newToken);
    setEmail(newEmail);
  };

  return (
    <AuthContext.Provider value={{ token, email, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);