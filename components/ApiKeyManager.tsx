
import React, { useState } from 'react';
import { useApiKey } from '../contexts/ApiKeyContext';
import { useLocalization } from '../contexts/LocalizationContext';

const KeyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
);

export const ApiKeyManager: React.FC = () => {
    const { apiKey, setApiKey } = useApiKey();
    const { t } = useLocalization();
    const [keyInput, setKeyInput] = useState(apiKey || '');

    const handleSave = () => {
        if (keyInput.trim()) {
            setApiKey(keyInput.trim());
        }
    };

    const handleClear = () => {
        setApiKey(null);
        setKeyInput('');
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gradient-to-br from-dark-surface to-dark-bg rounded-2xl border border-dark-border shadow-2xl p-8 space-y-6 animate-bounce-in">
                <div className="text-center">
                    <KeyIcon className="w-16 h-16 mx-auto text-brand-secondary mb-4" />
                    <h1 className="text-3xl font-bold text-dark-text-primary">{t('apiKeyManager.title')}</h1>
                    <p className="text-dark-text-secondary mt-2">{t('apiKeyManager.subtitle')}</p>
                    <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-brand-primary hover:underline mt-2 inline-block"
                    >
                        {t('apiKeyManager.link')}
                    </a>
                </div>
                
                <div className="space-y-2">
                    <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder={t('apiKeyManager.placeholder')}
                        className="w-full bg-dark-bg border-2 border-dark-border rounded-xl p-4 text-sm focus:ring-4 focus:ring-brand-primary/30 focus:border-brand-primary transition-all duration-300 placeholder-dark-text-secondary"
                    />
                    <button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 animate-glow"
                    >
                        {t('apiKeyManager.saveButton')}
                    </button>
                </div>

                {apiKey && (
                     <button
                        onClick={handleClear}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        {t('apiKeyManager.clearButton')}
                    </button>
                )}

                <div className="flex items-start space-x-3 bg-dark-bg/50 border border-dark-border rounded-lg p-3">
                    <InfoIcon className="w-5 h-5 text-dark-text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-dark-text-secondary">
                        {t('apiKeyManager.notice')}
                    </p>
                </div>
            </div>
        </div>
    );
};
