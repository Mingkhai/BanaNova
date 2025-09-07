import React, { useState, useCallback } from 'react';
import { GeminiPart, ExportFormat, AspectRatio } from '../types';
import { Loader } from './Loader';
import { ExportControls } from './ExportControls';
import { useLocalization } from '../contexts/LocalizationContext';

interface ResultViewProps {
    resultParts: GeminiPart[] | null;
    isLoading: boolean;
    error: string | null;
}

export const ResultView: React.FC<ResultViewProps> = ({ resultParts, isLoading, error }) => {
    const { t } = useLocalization();
    const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('original');

    const imagePart = resultParts?.find(part => part.inlineData);
    const textParts = resultParts?.filter(part => part.text).map(part => part.text);

    const imageUrl = imagePart?.inlineData 
        ? `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
        : null;

    const handleDownload = useCallback(() => {
        if (!imageUrl) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;

        img.onload = () => {
            // 1. Create a canvas element to draw the image on
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                console.error("Could not get canvas context for download.");
                return;
            }

            const originalWidth = img.width;
            const originalHeight = img.height;
            
            // 2. Calculate cropping dimensions for the selected aspect ratio
            let targetWidth = originalWidth;
            let targetHeight = originalHeight;
            let sx = 0, sy = 0, sWidth = originalWidth, sHeight = originalHeight;

            if (aspectRatio !== 'original') {
                const ratioMapping: { [key in AspectRatio]?: number } = {
                    '1:1': 1,
                    '4:5': 4 / 5,
                    '16:9': 16 / 9,
                };
                const targetRatio = ratioMapping[aspectRatio]!;
                const originalRatio = originalWidth / originalHeight;

                // Determine crop area by comparing original and target ratios
                if (originalRatio > targetRatio) {
                    // Image is wider than target: crop the sides
                    sHeight = originalHeight;
                    sWidth = sHeight * targetRatio;
                    sx = (originalWidth - sWidth) / 2;
                } else {
                    // Image is taller than target: crop the top and bottom
                    sWidth = originalWidth;
                    sHeight = sWidth / targetRatio;
                    sy = (originalHeight - sHeight) / 2;
                }
                targetWidth = sWidth;
                targetHeight = sHeight;
            }

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // 3. Draw the (potentially cropped) image onto the canvas
            ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

            // 4. Convert canvas to the desired image format (PNG/JPG)
            const mimeType = exportFormat === 'png' ? 'image/png' : 'image/jpeg';
            const dataUrl = canvas.toDataURL(mimeType, 0.95);

            // 5. Create a temporary link element and trigger the download
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `ai-studio-result-${new Date().getTime()}.${exportFormat}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        img.onerror = () => {
             console.error("Failed to load image for download.");
        }
    }, [imageUrl, exportFormat, aspectRatio]);


    return (
        <div className="bg-gradient-to-br from-dark-surface to-dark-bg rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-dark-border shadow-2xl min-h-[300px] md:min-h-[400px] flex flex-col justify-center items-center">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 text-white flex items-center gap-2 self-start">
                ✨ {t('resultTitle')}
            </h2>
            <div className="w-full flex-grow flex flex-col items-center justify-center">
                {isLoading && <Loader />}

                {error && !isLoading && (
                    <div className="text-center text-red-400 px-4">
                        <p className="font-semibold text-sm md:text-base">{t('resultErrorTitle')}</p>
                        <p className="text-xs md:text-sm mt-2">{error}</p>
                    </div>
                )}
                
                {!isLoading && !error && !resultParts && (
                    <div className="text-center text-dark-text-secondary px-4">
                        <p className="text-sm md:text-base">{t('resultPlaceholder')}</p>
                        <p className="text-xs md:text-sm mt-2">{t('resultPlaceholderSubtext')}</p>
                    </div>
                )}
                
                {!isLoading && resultParts && (
                     <div className="space-y-3 md:space-y-4 w-full">
                        {imageUrl && (
                            <img 
                                src={imageUrl} 
                                alt="Generated result" 
                                className="mx-auto max-h-64 md:max-h-80 lg:max-h-96 rounded-md object-contain w-full" 
                            />
                        )}
                        {textParts && textParts.length > 0 && (
                             <div className="bg-dark-bg p-3 md:p-4 rounded-md border border-dark-border">
                                <p className="text-xs md:text-sm text-dark-text-secondary">{textParts.join('\n')}</p>
                            </div>
                        )}
                        {imageUrl && (
                            <ExportControls 
                                format={exportFormat}
                                onFormatChange={setExportFormat}
                                aspectRatio={aspectRatio}
                                onAspectRatioChange={setAspectRatio}
                                onDownload={handleDownload}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};