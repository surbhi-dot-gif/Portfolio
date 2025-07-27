import React, { createContext, useContext, useState, useEffect } from 'react';
import { profileAPI, settingsAPI } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load profile and settings in parallel
        const [profileData, settingsData] = await Promise.all([
          profileAPI.get(),
          settingsAPI.get()
        ]);
        
        setProfile(profileData);
        setSettings(settingsData);
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load application data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const updateProfile = async (profileData) => {
    try {
      const updatedProfile = await profileAPI.update(profileData);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateSettings = async (settingsData) => {
    try {
      const updatedSettings = await settingsAPI.update(settingsData);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  };

  const value = {
    profile,
    settings,
    loading,
    error,
    updateProfile,
    updateSettings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;