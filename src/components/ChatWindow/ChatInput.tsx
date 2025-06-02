import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  onSendImage?: (files: File[], desc?: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onSendImage, disabled = false }) => {
  const [input, setInput] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null); //Enter之後自動focus

  // 支援 jpg, png, gif
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  // 多圖處理
  const handleFiles = (files: FileList | File[]) => {
    let filesArr = Array.from(files).filter(file =>
      ACCEPTED_TYPES.includes(file.type)
    );

    if (imageFiles.length + filesArr.length > 5) {
      alert('一次最多只能上傳 5 張圖片');
      filesArr = filesArr.slice(0, 5 - imageFiles.length);
    }

    setImageFiles(prev => [...prev, ...filesArr]);
    setImagePreviews(prev => [
      ...prev,
      ...filesArr.map(file => URL.createObjectURL(file))
    ]);
  };

  // 檔案 input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = '';
  };

  // 支援貼圖（多張）
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const files: File[] = [];
    for (let i = 0; i < e.clipboardData.items.length; i++) {
      const item = e.clipboardData.items[i];
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length) handleFiles(files);
    e.preventDefault();
  };

  // 移除某一張
  const handleRemoveImage = (idx: number) => {
    setImageFiles(files => files.filter((_, i) => i !== idx));
    setImagePreviews(previews => previews.filter((_, i) => i !== idx));
  };

  // 送出
  const handleSend = () => {
    if (disabled) return;
    if (imageFiles.length > 0 && onSendImage) {
      onSendImage(imageFiles, input); // 多圖+文字
      setImageFiles([]);
      setImagePreviews([]);
      setInput('');
    } else if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
    // 修正：一定要 setTimeout，才能保證 focus
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Enter送出
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="p-3 has-background-white" style={{ borderTop: '1px solid #eee', borderRadius: '0 0 20px 20px' }}>
      {/* 多圖預覽區 */}
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
      <div className="field has-addons mb-0">
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
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder={imagePreviews.length > 0 ? '附加說明（選填）' : '請輸入訊息…'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            ref={inputRef}
          />
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link"
            onClick={handleSend}
            disabled={disabled || (!input.trim() && imageFiles.length === 0)}
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
