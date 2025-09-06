
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface ApiKeyContextType {
    apiKey: string | null;
    setApiKey: (key: string | null) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

const API_KEY_STORAGE_KEY = 'gemini-api-key';

export const ApiKeyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [apiKey, setApiKey] = useState<string | null>(() => {
        try {
            return localStorage.getItem(API_KEY_STORAGE_KEY);
        } catch (error) {
            console.error("Could not read API key from localStorage", error);
            return null;
        }
    });

    useEffect(() => {
        try {
            if (apiKey) {
                localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
            } else {
                localStorage.removeItem(API_KEY_STORAGE_KEY);
            }
        } catch (error) {
            console.error("Could not save API key to localStorage", error);
        }
    }, [apiKey]);

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKey = (): ApiKeyContextType => {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error('useApiKey must be used within an ApiKeyProvider');
    }
    return context;
};
