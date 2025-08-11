import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/authAPI';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication state
const fetchUserProfile = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.success) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
    }
  }, []);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('auth_token');
      if (savedToken) {
        try {
          console.log('Checking authentication with token:', savedToken);
          authAPI.setAuthToken(savedToken); // Set token in API client
          await fetchUserProfile();
        } catch (error) {
          console.error('Auth initialization failed:', error);
          handleLogout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [fetchUserProfile]);

  const handleLoginSuccess = (userData, authToken) => {
    localStorage.setItem('auth_token', authToken);
    authAPI.setAuthToken(authToken);
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    setError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    authAPI.clearAuthToken();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      if (response.success && response.data) {
        handleLoginSuccess(response.data.user, response.data.token);
        return { success: true };
      }
      throw new Error(response.message || 'Login failed');
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };


  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Attempting registration with:', userData);
      const response = await authAPI.register(userData);
      console.log('Registration response:', response);

      if (response.success && response.data) {
        const { user: newUser, access_token } = response.data;
        handleLoginSuccess(newUser, access_token);
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('Attempting logout');
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      handleLogout();
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Updating profile with:', profileData);
      const response = await authAPI.updateProfile(profileData);
      console.log('Profile update response:', response);

      if (response.success) {
        setUser(response.data);
        return { success: true, data: response.data };
      }
      throw new Error(response.message || 'Profile update failed');
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};