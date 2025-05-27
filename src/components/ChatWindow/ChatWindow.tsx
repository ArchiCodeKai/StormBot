import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import * as chatApi from '../../services/chatApi'; // ← 依你的目錄修正

type Message = chatApi.Message;

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', from: 'ai', type: 'text', text: '您好，請問需要什麼協助？' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 1. 傳送文字訊息
  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: `${Date.now()}_user`, from: 'user', type: 'text', text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      // 模擬 API 回傳
      const reply = await chatApi.sendMessage(text, localStorage.getItem('token') || '');
      setMessages(prev => [...prev, reply]);
    } catch (e) {
      setError('伺服器連線失敗，請稍後再試');
    }
    setLoading(false);
  };

  // 2. 傳送多圖（group bubble）及附加文字
  const handleSendImage = async (files: File[], desc?: string) => {
    if (loading) return;
    setMessages(prev => [
      ...prev,
      {
        id: `${Date.now()}_group`,
        from: 'user',
        type: 'group',
        images: files.map(file => URL.createObjectURL(file)),
        text: desc,
      }
    ]);
    setLoading(true);
    setError(null);

    try {
      // 模擬 API 回傳
      const replies = await chatApi.uploadImages(files, desc || '', localStorage.getItem('token') || '');
      setMessages(prev => [...prev, ...replies]);
    } catch (e) {
      setError('伺服器連線失敗，請稍後再試');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',       // 填滿父層
        minHeight: 0,
      }}
    >
      <ChatHeader />
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          minHeight: 0,
          padding: '0.75rem', // bulma .px-3 .py-2 約等於 12px
        }}
        className="glass-card"
      >
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            from={msg.from}
            type={msg.type}
            text={msg.text}
            images={msg.images}
            imageUrl={msg.imageUrl}
          />
        ))}
        {loading && <div className="has-text-centered has-text-grey-light">AI回覆中...</div>}
        {error && <div className="notification is-danger is-light">{error}</div>}
        <div ref={bottomRef} />
      </div>
      <ChatInput onSend={handleSend} onSendImage={handleSendImage} disabled={loading} />
    </div>
  );
};

export default ChatWindow;
