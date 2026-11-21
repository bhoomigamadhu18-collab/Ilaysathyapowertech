import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_SITE_CONFIG, SiteConfig } from '../data/siteConfig';

const STORAGE_KEY = 'ilaysathya_site_config_v1';

interface SiteConfigContextValue {
  config: SiteConfig;
  updateConfig: (next: SiteConfig) => void;
  resetConfig: () => void;
  isManagerOpen: boolean;
  setManagerOpen: (open: boolean) => void;
}

const SiteConfigContext = createContext<SiteConfigContextValue | null>(null);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SiteConfig>;
        return { ...DEFAULT_SITE_CONFIG, ...parsed };
      }
    } catch {
      // Fallback safely to defaults if storage is unavailable or corrupted
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [isManagerOpen, setManagerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage quota errors for large custom image uploads
    }
  }, [config]);

  const updateConfig = (next: SiteConfig) => {
    setConfig(next);
  };

  const resetConfig = () => {
    setConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isManagerOpen,
        setManagerOpen,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export function useSiteConfig(): SiteConfigContextValue {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error('useSiteConfig must be used inside SiteConfigProvider');
  }
  return ctx;
}
