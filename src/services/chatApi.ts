// src/services/chatApi.ts

export type Message = {
  id: number | string;
  name: string;     // 來自後端
  role: 'user' | 'assistant' | 'ai';
  content: string;
  sentAt: string;
  goodResponse?: number;
  badResponse?: number;
};

// 送出訊息
export async function sendMessage(text: string): Promise<Message[]> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('尚未登入，請先登入');

  const res = await fetch('http://127.0.0.1:5010/api/ChatApi/SendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ message: text, mode: "chat" }),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error('請重新登入');
    throw new Error('伺服器錯誤');
  }

  const data = await res.json();
  if (Array.isArray(data)) return data;
  throw new Error('資料格式錯誤');
}
