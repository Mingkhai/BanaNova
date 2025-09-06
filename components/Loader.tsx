
import React, { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';


export const Loader: React.FC = () => {
    const { t } = useLocalization();
    const messages: string[] = t('loaderMessages');
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        setMessage(messages[0] || ''); 

        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = messages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [messages]);

    return (
        <div className="flex flex-col items-center space-y-6 text-white">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-t-transparent border-brand-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-t-transparent border-brand-secondary rounded-full animate-spin animation-delay-300"></div>
                <div className="absolute inset-2 w-16 h-16 border-4 border-t-transparent border-brand-accent rounded-full animate-spin animation-delay-600"></div>
            </div>
            <div className="text-center">
                <p className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                    {t('loaderGenerating')} ✨
                </p>
                <p className="text-sm text-dark-text-secondary mt-2">{message}</p>
            </div>
        </div>
    );
};