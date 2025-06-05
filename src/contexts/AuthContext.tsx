
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  category: 'student' | 'working' | 'non-working' | 'entrepreneur';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, category: User['category']) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('budgetbuddy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your Django backend
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'Sarah Johnson',
        email: email,
        category: 'working'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('budgetbuddy_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, category: User['category']): Promise<boolean> => {
    // Mock registration - in real app, this would call your Django backend
    if (name && email && password) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        category
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('budgetbuddy_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('budgetbuddy_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};
