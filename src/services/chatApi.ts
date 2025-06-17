// src/services/chatApi.ts

export type Message = {
  id: string;
  from: 'ai' | 'user';
  type: 'text' | 'image';
  text?: string;
  imageUrl?: string; // 後端回傳的圖片網址
};

// 發送文字訊息給機器人
export async function sendMessage(text: string, token: string): Promise<Message> {
  const res = await fetch('http://後端IP:Port/api/Chat/SendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ input: text }) // 根據你後端 DTO 改參數
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error('401');
    throw new Error('Server Error');
  }
  return await res.json();
}
