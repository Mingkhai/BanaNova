
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
        [EditMode.CombineImages]: "Combine the uploaded images. Describe how they should be blended, for example: 'place the person from the first image into the park scene from the second image, standing near the bench'.",
        
        // Trang điểm ảo
        [EditMode.NaturalMakeup]: "Apply natural makeup with light foundation, soft pink blush, glossy pink lips, subtle eyeliner and well-shaped eyebrows. Keep the overall look natural and fresh.",
        [EditMode.GlamourMakeup]: "Change lipstick color to bold red, add smoky eye shadow, enhance eyelashes for a glamorous look. Create dramatic and elegant makeup style.",
        
        // Kiểu tóc & màu tóc
        [EditMode.WavyHair]: "Transform hairstyle to wavy medium-length hair with pastel pink color. Make the hair look natural and flowing.",
        [EditMode.BobHaircut]: "Short bob haircut with natural dark brown color, smooth and shiny. Create a modern and stylish look.",
        
        // Phụ kiện & thời trang
        [EditMode.AddAccessories]: "Add elegant pearl earrings and a silver necklace, keep them realistic and matching the outfit. Enhance the overall sophisticated look.",
        [EditMode.WeddingDress]: "Replace outfit with a modern white wedding dress, detailed lace and flowing fabric. Create an elegant and romantic bridal look.",
        
        // Phong cách hình ảnh
        [EditMode.AnimeStyle]: "Convert photo into anime style with bright colors, big expressive eyes, and smooth shading. Maintain the character's identity while applying anime aesthetics.",
        [EditMode.CinematicFilter]: "Apply cinematic filter with warm tones, soft depth of field, and dramatic lighting. Create a professional movie-like atmosphere.",
        
        // Body & dáng chụp
        [EditMode.ConfidentPose]: "Adjust body posture to a confident standing pose, one hand on hip, elegant and natural. Maintain the person's identity and clothing.",
        [EditMode.ModelPose]: "Pose like a fashion magazine model, sitting casually with legs crossed, stylish look. Create a professional modeling appearance.",
        
        // Ảnh nghệ thuật
        [EditMode.NeonEffects]: "Add glowing neon light effects in the background, with bokeh and soft colorful flares. Create an artistic and vibrant atmosphere.",
        [EditMode.WatercolorStyle]: "Transform image into watercolor painting style with soft pastel tones. Maintain the subject while applying artistic watercolor effects.",
        
        // Chế độ nam - nữ
        [EditMode.MaleStyle]: "Add short styled haircut, light beard, and a black tuxedo. Create a sophisticated and masculine appearance.",
        [EditMode.AoDaiStyle]: "Change outfit to traditional Vietnamese Ao Dai in red silk with floral embroidery. Maintain elegant posture and cultural authenticity."
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
        [EditMode.CombineImages]: "Kết hợp các hình ảnh đã tải lên. Mô tả cách chúng nên được trộn lẫn, ví dụ: 'đặt người từ hình ảnh đầu tiên vào khung cảnh công viên từ hình ảnh thứ hai, đứng gần băng ghế'.",
        
        // Trang điểm ảo
        [EditMode.NaturalMakeup]: "Trang điểm tự nhiên với nền nhẹ, má hồng mềm mại, son bóng hồng, eyeliner mảnh và lông mày gọn gàng. Giữ vẻ ngoài tự nhiên và tươi tắn.",
        [EditMode.GlamourMakeup]: "Thay đổi màu son thành đỏ đậm, thêm phấn mắt khói, làm dày mi cho vẻ ngoài quyến rũ. Tạo phong cách trang điểm kịch tính và thanh lịch.",
        
        // Kiểu tóc & màu tóc
        [EditMode.WavyHair]: "Đổi kiểu tóc thành tóc xoăn gợn sóng ngang vai với màu hồng pastel. Làm cho tóc trông tự nhiên và bay bổng.",
        [EditMode.BobHaircut]: "Tóc bob ngắn với màu nâu tự nhiên, mượt mà và bóng. Tạo vẻ ngoài hiện đại và phong cách.",
        
        // Phụ kiện & thời trang
        [EditMode.AddAccessories]: "Thêm bông tai ngọc trai thanh lịch và vòng cổ bạc, giữ chúng chân thực và phù hợp với trang phục. Nâng cao vẻ ngoài tinh tế tổng thể.",
        [EditMode.WeddingDress]: "Thay thế trang phục bằng váy cưới trắng hiện đại, có ren chi tiết và vải bay bổng. Tạo vẻ ngoài cô dâu thanh lịch và lãng mạn.",
        
        // Phong cách hình ảnh
        [EditMode.AnimeStyle]: "Chuyển ảnh sang phong cách anime với màu sắc tươi sáng, đôi mắt to biểu cảm và shading mượt mà. Giữ danh tính nhân vật trong khi áp dụng thẩm mỹ anime.",
        [EditMode.CinematicFilter]: "Áp dụng bộ lọc điện ảnh với tông màu ấm, độ sâu trường mềm mại và ánh sáng kịch tính. Tạo bầu không khí chuyên nghiệp như phim.",
        
        // Body & dáng chụp
        [EditMode.ConfidentPose]: "Điều chỉnh tư thế cơ thể thành dáng đứng tự tin, một tay chống hông, thanh lịch và tự nhiên. Giữ nguyên danh tính và trang phục của người đó.",
        [EditMode.ModelPose]: "Tạo dáng như người mẫu tạp chí thời trang, ngồi thoải mái với chân bắt chéo, vẻ ngoài phong cách. Tạo diện mạo người mẫu chuyên nghiệp.",
        
        // Ảnh nghệ thuật
        [EditMode.NeonEffects]: "Thêm hiệu ứng ánh sáng neon phát sáng ở phông nền, với bokeh và những tia sáng màu mềm mại. Tạo bầu không khí nghệ thuật và sống động.",
        [EditMode.WatercolorStyle]: "Chuyển ảnh thành phong cách tranh màu nước với tông màu pastel mềm mại. Giữ nguyên chủ thể trong khi áp dụng hiệu ứng màu nước nghệ thuật.",
        
        // Chế độ nam - nữ
        [EditMode.MaleStyle]: "Thêm kiểu tóc ngắn gọn gàng, râu nhẹ và vest tuxedo đen. Tạo vẻ ngoài tinh tế và nam tính.",
        [EditMode.AoDaiStyle]: "Thay đổi trang phục thành áo dài truyền thống Việt Nam bằng lụa đỏ với thêu hoa. Giữ tư thế thanh lịch và tính xác thực văn hóa."
    }
};
