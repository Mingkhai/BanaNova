
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { MultiImageUploader } from './components/MultiImageUploader';
import { ControlPanel } from './components/ControlPanel';
import { ResultView } from './components/ResultView';
import { editImageWithGemini } from './services/geminiService';
import { EditMode, GeminiPart } from './types';
import { PROMPT_TEMPLATES } from './constants';
import { useLocalization } from './contexts/LocalizationContext';
import { useApiKey } from './contexts/ApiKeyContext';
import { ApiKeyManager } from './components/ApiKeyManager';

const App: React.FC = () => {
    const { locale } = useLocalization();
    const { apiKey } = useApiKey();
    const [sourceImages, setSourceImages] = useState<File[]>([]);
    const [sourceImageUrls, setSourceImageUrls] = useState<string[]>([]);
    const [editMode, setEditMode] = useState<EditMode>(EditMode.RemoveObject);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<GeminiPart[] | null>(null);

    useEffect(() => {
        // This effect updates the prompt based on the selected mode and number of images.
        const templates = PROMPT_TEMPLATES[locale];
        const modeTemplate = templates[editMode];

        let newPrompt = '';
        if (typeof modeTemplate === 'string') {
            newPrompt = modeTemplate;
        } else {
            // It's an object with single/multi templates
            newPrompt = sourceImages.length > 1 ? modeTemplate.multi : modeTemplate.single;
        }
        setPrompt(newPrompt);
        
    }, [locale, editMode, sourceImages.length]);
    
    const handleImageUpload = (files: FileList) => {
        const newImages = Array.from(files);
        setSourceImages(prev => [...prev, ...newImages]);
        
        const newUrls = newImages.map(file => URL.createObjectURL(file));
        setSourceImageUrls(prev => [...prev, ...newUrls]);

        setResult(null);
        setError(null);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        // Revoke the object URL to prevent memory leaks
        URL.revokeObjectURL(sourceImageUrls[indexToRemove]);

        setSourceImages(prev => prev.filter((_, index) => index !== indexToRemove));
        setSourceImageUrls(prev => prev.filter((_, index) => index !== indexToRemove));
    };
    
    const handleModeChange = (mode: EditMode) => {
        setEditMode(mode);
    };

    const handleGenerate = useCallback(async () => {
        if (!apiKey) {
            setError("API Key is not set.");
            return;
        }
        if (sourceImages.length === 0) {
            setError("Please upload at least one source image.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const resultParts = await editImageWithGemini(sourceImages, prompt, apiKey);
            setResult(resultParts);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [sourceImages, prompt, apiKey]);

    if (!apiKey) {
        return <ApiKeyManager />;
    }

    return (
        <div className="min-h-screen bg-dark-bg text-dark-text-primary font-sans">
            <Header />
            <main className="container mx-auto p-6 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Image Editor and Result */}
                    <div className="lg:col-span-2 space-y-8">
                        <MultiImageUploader 
                            onImageUpload={handleImageUpload} 
                            onImageRemove={handleRemoveImage}
                            imageUrls={sourceImageUrls}
                        />
                        <ResultView resultParts={result} isLoading={isLoading} error={error} />
                    </div>

                    {/* Right Column: Controls */}
                    <div className="lg:col-span-1">
                        <ControlPanel
                            editMode={editMode}
                            onModeChange={handleModeChange}
                            prompt={prompt}
                            onPromptChange={setPrompt}
                            onGenerate={handleGenerate}
                            isLoading={isLoading}
                            isGenerateDisabled={sourceImages.length === 0}
                        />
                    </div>
                </div>
            </main>
            <footer className="bg-dark-surface/50 border-t border-dark-border py-6 mt-12">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <p className="text-dark-text-secondary text-sm">
                        Design by <span className="text-brand-primary font-semibold">Knice</span> 2025
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;