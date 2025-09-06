
import { GoogleGenAI, Modality, Part } from "@google/genai";
import { GeminiPart } from '../types';

const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });

    return {
        inlineData: {
            data: await base64EncodedDataPromise,
            mimeType: file.type,
        },
    };
};

export const editImageWithGemini = async (
    images: File[], 
    prompt: string, 
    apiKey: string,
): Promise<GeminiPart[]> => {
    try {
    
        const ai = new GoogleGenAI({ apiKey });
        const imageParts = await Promise.all(images.map(fileToGenerativePart));
        const textPart = { text: prompt };

        const parts: Part[] = [...imageParts, textPart];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: parts,
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        if (response.candidates && response.candidates.length > 0) {
             const content = response.candidates[0].content;
             if (content.parts && content.parts.length > 0) {
                 return content.parts as GeminiPart[];
             }
        }
        
        throw new Error("No content generated. The model may have refused the request due to safety policies.");

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            // Check for common API key errors
            if (error.message.includes('API key not valid')) {
                throw new Error('Your API key is not valid. Please check it and try again.');
            }
             if (error.message.includes('quota')) {
                throw new Error('You have exceeded your API quota. Please check your Google AI Studio account.');
            }
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
};