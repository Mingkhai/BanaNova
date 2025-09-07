
import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { ExportFormat, AspectRatio } from '../types';

interface ExportControlsProps {
    format: ExportFormat;
    onFormatChange: (format: ExportFormat) => void;
    aspectRatio: AspectRatio;
    onAspectRatioChange: (ratio: AspectRatio) => void;
    onDownload: () => void;
}

const OptionButton: React.FC<{
    label: string;
    onClick: () => void;
    isActive: boolean;
}> = ({ label, onClick, isActive }) => (
    <button
        onClick={onClick}
        className={`px-2 md:px-3 py-1 md:py-1.5 text-xs font-semibold rounded-md transition-colors ${
            isActive ? 'bg-brand-primary text-white' : 'bg-dark-border text-dark-text-secondary hover:bg-slate-600'
        }`}
    >
        {label}
    </button>
);

export const ExportControls: React.FC<ExportControlsProps> = ({
    format,
    onFormatChange,
    aspectRatio,
    onAspectRatioChange,
    onDownload,
}) => {
    const { t } = useLocalization();
    const aspectRatios: AspectRatio[] = ['original', '1:1', '4:5', '16:9'];
    const formats: ExportFormat[] = ['png', 'jpeg'];
    
    const aspectRatioLabels: Record<AspectRatio, string> = {
        'original': t('aspectRatios.original'),
        '1:1': t('aspectRatios.square'),
        '4:5': t('aspectRatios.portrait'),
        '16:9': t('aspectRatios.widescreen'),
    }

    return (
        <div className="border-t border-dark-border pt-3 md:pt-4 mt-3 md:mt-4 space-y-3 md:space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-center text-dark-text-primary">{t('exportTitle')}</h3>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
                {/* Format Controls */}
                <div className="space-y-2">
                    <label className="block text-xs md:text-sm font-medium text-dark-text-secondary">{t('exportFormat')}</label>
                    <div className="flex items-center space-x-1 md:space-x-2 bg-dark-bg p-1 rounded-lg">
                        {formats.map(f => (
                             <OptionButton
                                key={f}
                                label={f.toUpperCase()}
                                onClick={() => onFormatChange(f)}
                                isActive={format === f}
                            />
                        ))}
                    </div>
                </div>
                {/* Aspect Ratio Controls */}
                <div className="space-y-2">
                     <label className="block text-xs md:text-sm font-medium text-dark-text-secondary">{t('exportAspectRatio')}</label>
                     <div className="flex flex-wrap gap-1 md:gap-2 bg-dark-bg p-1 rounded-lg">
                        {aspectRatios.map(ar => (
                             <OptionButton
                                key={ar}
                                label={aspectRatioLabels[ar]}
                                onClick={() => onAspectRatioChange(ar)}
                                isActive={aspectRatio === ar}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <button
                onClick={onDownload}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 md:py-3 px-3 md:px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base"
            >
                {t('downloadButton')}
            </button>
        </div>
    );
};
