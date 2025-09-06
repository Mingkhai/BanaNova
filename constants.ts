
import { EditMode } from './types';

type Locale = 'en' | 'vi';

// A mode can have a simple string or an object with single/multi prompts.
type PromptTemplate = string | { single: string; multi: string };

export const PROMPT_TEMPLATES: Record<Locale, Record<EditMode, PromptTemplate>> = {
    en: {
        [EditMode.RemoveObject]: "Remove the {object} from the image. For example: 'remove the red car'. Plausibly fill the space with surrounding context, preserving lighting and textures.",
        [EditMode.AddObject]: {
            single: "Add a {object} to the image, matching the scene's perspective and lighting. For example: 'add a leather handbag on the table'.",
            multi: "Take the primary object from the reference image(s) and add it to the base image (the first image). Describe where it should go. For example: 'place the lamp from the second image onto the table in the first image'."
        },
        [EditMode.ChangeBackground]: "Replace the background with a {new background}, for example: 'a clean studio seamless #D9D9D9 background' or 'a sunny beach'. Retain subject edges and hair details.",
        [EditMode.ChangeOutfit]: {
            single: "Change the subject's outfit to {style}, {fabric}, {color}. For example: 'a navy wool suit, matte texture'. Maintain the subject’s body/pose and create realistic tailoring.",
            multi: "Apply the outfit from the reference image(s) to the person in the base image (the first image). Maintain the person's pose and identity."
        },
        [EditMode.CombineImages]: "Combine the uploaded images. Describe how they should be blended, for example: 'place the person from the first image into the park scene from the second image, standing near the bench'."
    },
    vi: {
        [EditMode.RemoveObject]: "Xóa {vật thể} khỏi hình ảnh. Ví dụ: 'xóa chiếc xe hơi màu đỏ'. Lấp đầy không gian một cách hợp lý với bối cảnh xung quanh, giữ nguyên ánh sáng và kết cấu.",
        [EditMode.AddObject]: {
            single: "Thêm một {vật thể} vào hình ảnh, phù hợp với phối cảnh và ánh sáng của cảnh. Ví dụ: 'thêm một chiếc túi xách da trên bàn'.",
            multi: "Lấy vật thể chính từ (các) ảnh tham chiếu và thêm nó vào ảnh gốc (ảnh đầu tiên). Mô tả vị trí cần đặt. Ví dụ: 'đặt chiếc đèn từ ảnh thứ hai lên bàn trong ảnh đầu tiên'."
        },
        [EditMode.ChangeBackground]: "Thay thế nền bằng {nền mới}, ví dụ: 'nền studio màu xám trơn #D9D9D9' hoặc 'một bãi biển đầy nắng'. Giữ lại các chi tiết viền và tóc của chủ thể.",
        [EditMode.ChangeOutfit]: {
            single: "Thay đổi trang phục của chủ thể thành {kiểu dáng}, {chất liệu}, {màu sắc}. Ví dụ: 'một bộ vest len màu xanh navy, chất liệu mờ'. Giữ nguyên tư thế/cơ thể của chủ thể và tạo ra đường may chân thực.",
            multi: "Áp dụng trang phục từ (các) ảnh tham chiếu cho người trong ảnh gốc (ảnh đầu tiên). Giữ nguyên tư thế và danh tính của người đó."
        },
        [EditMode.CombineImages]: "Kết hợp các hình ảnh đã tải lên. Mô tả cách chúng nên được trộn lẫn, ví dụ: 'đặt người từ hình ảnh đầu tiên vào khung cảnh công viên từ hình ảnh thứ hai, đứng gần băng ghế'."
    }
};
