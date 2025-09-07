
import React, { useCallback, useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

interface MultiImageUploaderProps {
    imageUrls: string[];
    onImageUpload: (files: FileList) => void;
    onImageRemove: (index: number) => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75c0-1.104.896-2 2-2h14c1.104 0 2 .896 2 2v10.5c0 1.104-.896 2-2 2H5c-1.104 0-2-.896-2-2z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
);


export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({ 
    imageUrls, 
    onImageUpload, 
    onImageRemove 
}) => {
    const { t } = useLocalization();
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            onImageUpload(files);
        }
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        handleFileChange(event.dataTransfer.files);
    }, [onImageUpload]);

    const handleDragEvents = (event: React.DragEvent<HTMLDivElement>, entering: boolean) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(entering);
    };
    
    return (
        <div className="bg-gradient-to-br from-dark-surface to-dark-bg rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-dark-border shadow-2xl">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-white flex items-center gap-2">
                📸 {t('uploaderTitle')}
            </h2>
            <div
                className={`relative group border-4 border-dashed rounded-xl md:rounded-2xl p-4 md:p-6 text-center transition-all duration-300 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center ${isDragging ? 'border-brand-primary bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 scale-105' : 'border-dark-border hover:border-brand-accent hover:bg-gradient-to-br hover:from-brand-accent/10 hover:to-brand-fun/10'}`}
                onDrop={handleDrop}
                onDragOver={(e) => handleDragEvents(e, true)}
                onDragEnter={(e) => handleDragEvents(e, true)}
                onDragLeave={(e) => handleDragEvents(e, false)}
            >
                <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                    {imageUrls.map((url, index) => (
                        <div key={index} className="relative group aspect-square">
                            <img src={url} alt={`upload-preview-${index}`} className="w-full h-full object-cover rounded-md" />
                            {index === 0 && imageUrls.length > 1 && (
                                <div className="absolute top-1 left-1 bg-brand-primary text-white text-[8px] md:text-[10px] font-bold px-1 md:px-2 py-0.5 rounded shadow-md">
                                    {t('uploaderBaseImage')}
                                </div>
                            )}
                            <button
                                onClick={() => onImageRemove(index)}
                                className="absolute -top-1 md:-top-2 -right-1 md:-right-2 bg-red-600 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation"
                                aria-label={`Remove image ${index + 1}`}
                            >
                                <CloseIcon className="w-3 md:w-4 h-3 md:h-4" />
                            </button>
                        </div>
                    ))}
                    
                    <label htmlFor="file-upload" className={`aspect-square flex flex-col items-center justify-center space-y-1 md:space-y-2 text-dark-text-secondary border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-brand-primary' : 'border-dark-border hover:border-brand-secondary hover:bg-dark-bg'}`}>
                        <UploadIcon className="w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10" />
                        <p className="font-bold text-sm md:text-base lg:text-lg text-white text-center px-1">{t('uploaderPrompt')}</p>
                        <p className="text-xs md:text-sm text-dark-text-secondary mt-1 md:mt-2 text-center px-1">{t('uploaderOr')}</p>
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files)}
                        accept="image/png, image/jpeg, image/webp"
                        multiple
                    />
                </div>
            </div>
        </div>
    );
};