// hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const register = async (data: any) => {
    console.log('🔵 Registering with data:', data); // Debug
    const response = await authAPI.register(data);
    
    console.log('🟢 Register response:', response); // Debug
    
    if (response.success && response.data) {
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return { success: true };
    }
    
    return { success: false, error: response.error };
  };

  const login = async (credentials: any) => {
    const response = await authAPI.login(credentials);
    
    if (response.success && response.data) {
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return { success: true };
    }
    
    return { success: false, error: response.error };
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    router.push('/');
  };

  return {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
