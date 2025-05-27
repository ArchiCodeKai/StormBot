// src/services/chatApi.ts

// 型別定義
export type Message = {
  id: string;
  from: 'ai' | 'user';
  type: 'text' | 'image' | 'file' | 'group';
  text?: string;
  images?: string[];
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
};

// 1. 送出訊息
export async function sendMessage(text: string, token: string): Promise<Message> {
  // 假資料 (mock)
  await new Promise(r => setTimeout(r, 1000)); // 模擬延遲
  return {
    id: `${Date.now()}_ai`,
    from: 'ai',
    type: 'text',
    text: `[AI回覆] 你說：「${text}」`,
  };
}

// 2. 上傳圖片訊息
export async function uploadImages(files: File[], desc: string, token: string): Promise<Message[]> {
  await new Promise(r => setTimeout(r, 1200));
  return [
    {
      id: `${Date.now()}_ai_group`,
      from: 'ai',
      type: 'group',
      images: files.map(file => URL.createObjectURL(file)),
      text: '[AI] 圖片已收到！' + (desc ? ` 說明: ${desc}` : ''),
    }
  ];
}
