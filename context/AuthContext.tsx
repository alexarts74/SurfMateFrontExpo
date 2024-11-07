import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (userData: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signUp = async (userData: any) => {
    try {
      const response = await fetch(
        "http://172.20.10.9:3000/api/users/sign_up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userData }),
      });

      const data = await response.json();

      if (data.authentication_token) {
        // Stockage du token Devise
        await AsyncStorage.setItem("authToken", data.authentication_token);
        setUser(data.user);
        setIsAuthenticated(true);
        router.replace("/(tabs)");
      } else {
        throw new Error(data.errors?.join(", ") || "Erreur d'inscription");
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://172.20.10.9:3000/api/users/log_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email, password }
        }),
      });

      const data = await response.json();

      if (data.authentication_token) {
        await AsyncStorage.setItem("authToken", data.authentication_token);
        setUser(data.user);
        setIsAuthenticated(true);
        router.replace("/(tabs)");
      } else {
        throw new Error("Identifiants invalides");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      // Appel à votre endpoint de déconnexion
      await fetch("http://172.20.10.9:3000/api/users/log_out", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      await AsyncStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/(auth)");
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
