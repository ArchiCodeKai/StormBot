import { useEffect, useState, useRef } from "react";

const text = "災情預警應變決策支援系統";

// 每個字獨立速度延遲
const getTypingDelays = (str: string) => {
  // 你可以調整這個陣列或邏輯
  return str.split("").map((_, i) => {
    if (i === 6 || i === 12) return 370;   // 比如「應變」、「決策」後稍微停頓
    if (i % 2 === 0) return 130 + Math.random() * 30;
    return 220 + Math.random() * 80;
  });
};

const Title: React.FC = () => {
  const [typed, setTyped] = useState("");
  const [finished, setFinished] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  // 打字動畫主體
  const startTyping = () => {
    setTyped("");
    setFinished(false);
    const delays = getTypingDelays(text);

    let i = 0;
    function typeNext() {
      setTyped(text.slice(0, i + 1));
      i++;
      if (i < text.length) {
        timeouts.current.push(setTimeout(typeNext, delays[i]));
      } else {
        setFinished(true);
      }
    }
    timeouts.current.push(setTimeout(typeNext, delays[0]));
  };

  useEffect(() => {
    startTyping();
    // 每10秒自動重新動畫
    const interval = setInterval(() => {
      startTyping();
    }, 10000);

    return () => {
      // 清掉所有 setTimeout
      timeouts.current.forEach(clearTimeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <span
      className="title is-8 has-text-white"
      style={{
        marginLeft: "10px",
        lineHeight: "1.22",
        paddingTop: 2,
        fontWeight: 700,
        fontSize: "2.25rem",
        letterSpacing: "5px",
        display: "inline-flex",
        alignItems: "center",
        textShadow: "0 4px 14px #01356633",
      }}
    >
      <span>{typed}</span>
      {/* 打字未結束時顯示游標 */}
      {!finished && (
        <span
          style={{
            display: "inline-block",
            width: "1ch",
            color: "#fff",
            marginLeft: "1.5px",
            fontWeight: 700,
            animation: "blink-cursor 1.1s steps(1) infinite",
            userSelect: "none",
          }}
        >
          |
        </span>
      )}
      <style>{`
        @keyframes blink-cursor {
          0%, 48% { opacity: 1; }
          52%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export default Title;
