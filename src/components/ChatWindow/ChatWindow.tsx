import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import type { Message } from '../../services/chatApi';   // <--- 只引入 type
import { sendMessage as sendChatMessage } from '../../services/chatApi'; // <--- 引入 function


const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      name: 'AI',
      role: 'ai', // 後端可能回傳 'assistant'，但假資料可用 'ai'
      content: '您好，請問需要什麼協助？',
      sentAt: new Date().toISOString(),
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 自動滾到底部
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 傳送訊息
  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: `${Date.now()}_user`,
      name: '你',
      role: 'user',
      content: text,
      sentAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const replies = await sendChatMessage(text);
      setMessages(prev => [...prev, ...replies]);
    } catch (e) {
      setError(e instanceof Error ? e.message : '伺服器連線失敗，請稍後再試');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatHeader />
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            from={msg.role === 'user' ? 'user' : 'ai'}
            type="text"
            text={msg.content}
            // 你也可以傳 images、imageUrl 如果有
          />
        ))}
        {loading && <div>AI回覆中...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
};

export default ChatWindow;
