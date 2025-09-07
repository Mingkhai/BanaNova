
import React from 'react';
import { useApiKey } from '../contexts/ApiKeyContext';
import { useLocalization, Locale } from '../contexts/LocalizationContext';
import logoImg from '/logo.png';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.184c0-1.664.6-3.183 1.6-4.316zM12.75 8.636a.75.75 0 011.06 0l1.875 1.876a.75.75 0 010 1.06l-1.875 1.875a.75.75 0 11-1.06-1.06L13.94 12l-1.19-1.19a.75.75 0 010-1.061z" clipRule="evenodd" />
        <path d="M3 10.875A6.75 6.75 0 019.75 4.125a.75.75 0 011.5 0c.512 1.024.962 2.086 1.345 3.182a.75.75 0 01-.81.974c-.26.033-.52.053-.785.064A6.75 6.75 0 013 10.875z" />
    </svg>
);

const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale } = useLocalization();

    const switchLanguage = (lang: Locale) => {
        setLocale(lang);
    };

    return (
        <div className="flex items-center space-x-1 md:space-x-2 bg-dark-surface/80 p-1 rounded-full border border-dark-border backdrop-blur-sm">
            <button
                onClick={() => switchLanguage('en')}
                className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                    locale === 'en' 
                        ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg' 
                        : 'text-dark-text-secondary hover:bg-dark-surface hover:text-white'
                }`}
                aria-pressed={locale === 'en'}
            >
                🇺🇸 EN
            </button>
             <div className="w-px h-4 md:h-6 bg-dark-border"></div>
            <button
                onClick={() => switchLanguage('vi')}
                className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                    locale === 'vi' 
                        ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg' 
                        : 'text-dark-text-secondary hover:bg-dark-surface hover:text-white'
                }`}
                aria-pressed={locale === 'vi'}
            >
                🇻🇳 VI
            </button>
        </div>
    );
};

export const Header: React.FC = () => {
    const { t } = useLocalization();
    const { setApiKey } = useApiKey();
    const handleChangeApiKey = () => {
        setApiKey(null);
    };
    return (
        <header className="bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-500 backdrop-blur-lg border-b border-dark-border sticky top-0 z-10 shadow-lg">
            <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
                {/* Mobile Layout */}
                <div className="flex flex-col space-y-3 md:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src={logoImg} alt="BanaNoVa Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-xl shadow-lg bg-white/80 p-2" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
                                    BanaNoVa
                                </h1>
                                <p className="text-xs md:text-sm text-dark-text-secondary">{t('headerSubtitle')}</p>
                            </div>
                        </div>
                        <LanguageSwitcher />
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleChangeApiKey}
                            className="px-3 py-2 text-xs font-semibold rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                        >
                            {t('logoutButton') || 'Change API Key'}
                        </button>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img src={logoImg} alt="BanaNoVa Logo" className="w-16 h-16 rounded-xl shadow-lg bg-white/80 p-2" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                                BanaNoVa
                            </h1>
                            <p className="text-sm text-dark-text-secondary">{t('headerSubtitle')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <button
                            onClick={handleChangeApiKey}
                            className="ml-4 px-4 py-2 text-sm font-semibold rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300"
                        >
                            {t('logoutButton') || 'Change API Key'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};