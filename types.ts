
export enum EditMode {
    RemoveObject = "RemoveObject",
    AddObject = "AddObject",
    ChangeBackground = "ChangeBackground",
    ChangeOutfit = "ChangeOutfit",
    CombineImages = "CombineImages",
    // Trang điểm ảo
    NaturalMakeup = "NaturalMakeup",
    GlamourMakeup = "GlamourMakeup",
    // Kiểu tóc & màu tóc
    WavyHair = "WavyHair",
    BobHaircut = "BobHaircut",
    // Phụ kiện & thời trang
    AddAccessories = "AddAccessories",
    WeddingDress = "WeddingDress",
    // Phong cách hình ảnh
    AnimeStyle = "AnimeStyle",
    CinematicFilter = "CinematicFilter",
    // Body & dáng chụp
    ConfidentPose = "ConfidentPose",
    ModelPose = "ModelPose",
    // Ảnh nghệ thuật
    NeonEffects = "NeonEffects",
    WatercolorStyle = "WatercolorStyle",
    // Chế độ nam - nữ
    MaleStyle = "MaleStyle",
    AoDaiStyle = "AoDaiStyle",
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
