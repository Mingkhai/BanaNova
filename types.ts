
export enum EditMode {
    RemoveObject = "RemoveObject",
    AddObject = "AddObject",
    ChangeBackground = "ChangeBackground",
    ChangeOutfit = "ChangeOutfit",
    CombineImages = "CombineImages",
}

export interface GeminiPart {
    text?: string;
    inlineData?: {
        mimeType: string;
        data: string;
    };
}

export type ExportFormat = 'png' | 'jpeg';

export type AspectRatio = 'original' | '1:1' | '4:5' | '16:9';
