// src/components/Login.tsx
import React, { useState } from 'react';

const Login: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      // 用 application/json 格式呼叫
      const res = await fetch('http://127.0.0.1:5010/api/AccountApi/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Username: username,
          Password: password,
          RedirectUri: '/Account/LoginSuccess',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem('token', data.token);  // <--- 儲存 token
          onLoginSuccess(); // 通知 App 已登入
        } else {
          setError('帳號或密碼錯誤');
        }
      } else {
        setError('帳號或密碼錯誤');
      }
    } catch (err) {
      setError('登入失敗，請稍後再試');
    }
  };

  return (
    <div className="section is-flex is-justify-content-center is-align-items-center" style={{ minHeight: '100vh', background: '#e8f3fa' }}>
      <form className="box" style={{ minWidth: 320 }} onSubmit={handleLogin}>
        <h2 className="title is-4 has-text-centered mb-4">使用者登入</h2>
        <div className="field">
          <label className="label">帳號</label>
          <div className="control">
            <input className="input" value={username} onChange={e => setUsername(e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </div>
        {error && <div className="notification is-danger is-light">{error}</div>}
        <div className="field">
          <button className="button is-link is-fullwidth" type="submit">登入</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
