import React from 'react';
import classNames from 'classnames';

interface MessageBubbleProps {
  from: 'ai' | 'user';
  type: 'text' | 'image' | 'file' | 'group';
  text?: string;
  images?: string[];
  imageUrl?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  from,
  type,
  text,
  images,
  imageUrl,
}) => {
  const isUser = from === 'user';

  return (
    <div
      className={classNames(
        'mb-2 is-flex',
        { 'is-justify-content-flex-end': isUser, 'is-justify-content-flex-start': !isUser }
      )}
    >
      <div
        className={classNames(
          isUser ? 'message-bubble-user' : 'message-bubble-ai',
          'p-3',
          'message-bubble'
        )}
        style={{
          maxWidth: '75%',
          wordBreak: 'break-word',
          whiteSpace: 'pre-line',
          
        }}
      >
        {/* 多圖 group bubble */}
        {(type === 'group' && images?.length) && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: text ? 8 : 0
          }}>
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`上傳圖片${idx + 1}`}
                style={{
                  width: 90,
                  height: 90,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: '1px solid #eee'
                }}
              />
            ))}
          </div>
        )}
        {/* 單圖（兼容舊資料） */}
        {type === 'image' && imageUrl && (
          <img
            src={imageUrl}
            alt="圖片訊息"
            style={{
              width: 90,
              height: 90,
              objectFit: 'cover',
              borderRadius: 8,
              border: '1px solid #eee',
              display: 'block',
              marginBottom: text ? 8 : 0
            }}
          />
        )}
        {/* 文字訊息 */}
        {(type === 'text' && text) ||
          (type === 'group' && text && <div style={{ marginTop: 6 }}>{text}</div>)}
      </div>
    </div>
  );
};

export default MessageBubble;
