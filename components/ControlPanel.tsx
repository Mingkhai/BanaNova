
import React from 'react';
import { EditMode } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';

interface ControlPanelProps {
    editMode: EditMode;
    onModeChange: (mode: EditMode) => void;
    prompt: string;
    onPromptChange: (prompt: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isGenerateDisabled: boolean;
}

const EditModeButton: React.FC<{
    label: string;
    mode: EditMode;
    currentMode: EditMode;
    onClick: (mode: EditMode) => void;
}> = ({ label, mode, currentMode, onClick }) => {
    const isActive = mode === currentMode;
    return (
        <button
            onClick={() => onClick(mode)}
            className={`px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium rounded-lg md:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center ${
                isActive
                    ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xl animate-bounce-in'
                    : 'bg-dark-surface text-dark-text-secondary hover:bg-gradient-to-r hover:from-brand-accent hover:to-brand-fun hover:text-white border border-dark-border'
            }`}
        >
            {label}
        </button>
    );
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
    editMode,
    onModeChange,
    prompt,
    onPromptChange,
    onGenerate,
    isLoading,
    isGenerateDisabled,
}) => {
    const { t } = useLocalization();
    const editModes = Object.values(EditMode);

    return (
        <div className="bg-gradient-to-br from-dark-surface to-dark-bg rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-dark-border shadow-2xl space-y-6 md:space-y-8 lg:sticky lg:top-24 backdrop-blur-sm">
            <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-white flex items-center gap-2">
                    🎨 {t('controlPanelModeTitle')}
                </h2>
                <div className={`grid gap-2 ${editModes.length > 10 ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3' : editModes.length > 6 ? 'grid-cols-2 md:grid-cols-2' : 'grid-cols-2'}`}>
                    {editModes.map((mode) => (
                        <EditModeButton
                            key={mode}
                            label={t(`editMode.${mode}`)}
                            mode={mode}
                            currentMode={editMode}
                            onClick={onModeChange}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-white flex items-center gap-2">
                    💬 {t('controlPanelPromptTitle')}
                </h2>
                <textarea
                    value={prompt}
                    onChange={(e) => onPromptChange(e.target.value)}
                    rows={4}
                    className="w-full bg-dark-bg border-2 border-dark-border rounded-lg md:rounded-xl p-3 md:p-4 text-xs md:text-sm focus:ring-4 focus:ring-brand-primary/30 focus:border-brand-primary transition-all duration-300 placeholder-dark-text-secondary resize-none"
                    placeholder={t('controlPanelPlaceholder')}
                />
            </div>
            
            <button
                onClick={onGenerate}
                disabled={isLoading || isGenerateDisabled}
                className="w-full flex items-center justify-center bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg animate-glow text-sm md:text-base"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('controlPanelGenerating')} ✨
                    </>
                ) : (
                    <>
                        🚀 {t('controlPanelGenerate')}
                    </>
                )}
            </button>
            {isGenerateDisabled && !isLoading && (
                <p className="text-center text-sm text-dark-text-secondary mt-4 bg-dark-surface/50 rounded-lg p-3 border border-dark-border">
                    ⚠️ {t('controlPanelDisabledTooltip')}
                </p>
            )}
        </div>
    );
};
