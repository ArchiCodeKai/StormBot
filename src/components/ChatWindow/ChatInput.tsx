// src/components/ChatWindow/ChatInput.tsx
import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  // onSendImage?: (files: File[], desc?: string) => void; // 註解掉
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, /* onSendImage, */ disabled = false }) => {
  const [input, setInput] = useState('');
  // const [imageFiles, setImageFiles] = useState<File[]>([]); // 註解掉
  // const [imagePreviews, setImagePreviews] = useState<string[]>([]); // 註解掉
  const inputRef = useRef<HTMLInputElement>(null);

  // const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif']; // 註解掉

  // 移除所有圖片相關 function
  /*
  const handleFiles = (files: FileList | File[]) => {...}
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {...}
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {...}
  const handleRemoveImage = (idx: number) => {...}
  */

  // 送出
  const handleSend = () => {
    if (disabled) return;
    // if (imageFiles.length > 0 && onSendImage) {
    //   onSendImage(imageFiles, input); // 圖片上傳功能註解
    //   setImageFiles([]);
    //   setImagePreviews([]);
    //   setInput('');
    // } else
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Enter送出
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div
      className="p-3 has-background-white"
      style={{ borderTop: '1px solid #eee', borderRadius: '0 0 20px 20px' }}
    >
      {/* ==== 圖片預覽區塊已註解 ==== */}
      {/*
      {imagePreviews.length > 0 && (
        <div className="mb-2 is-flex is-align-items-center" style={{ gap: 8 }}>
          {imagePreviews.map((src, idx) => (
            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={src}
                alt={`預覽圖片${idx + 1}`}
                style={{ maxWidth: 60, maxHeight: 60, borderRadius: 8, border: '1px solid #eee' }}
              />
              <button
                type="button"
                className="delete is-small"
                onClick={() => handleRemoveImage(idx)}
                style={{ position: 'absolute', top: -8, right: -8, background: '#fff' }}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      )}
      */}
      <div className="field has-addons mb-0">
        {/* ==== 圖片上傳按鈕已註解 ==== */}
        {/*
        <div className="control">
          <label className="button is-light mb-0" style={{ cursor: 'pointer' }}>
            <span className="icon"><i className="fas fa-image" /></span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              multiple
              style={{ display: 'none' }}
              disabled={disabled}
              onChange={handleFileChange}
            />
          </label>
        </div>
        */}
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            // placeholder={imagePreviews.length > 0 ? '附加說明（選填）' : '請輸入訊息…'}
            placeholder="請輸入訊息…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            // onPaste={handlePaste} // 註解掉
            ref={inputRef}
            disabled={disabled}
          />
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link"
            onClick={handleSend}
            disabled={disabled || !input.trim()}
          >
            <span className="icon is-small">
              <i className="fas fa-paper-plane" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
