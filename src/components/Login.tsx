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
      // 這裡請根據你後端 API 修改
      const res = await fetch('http://172.29.219.9:5010/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          Username: username,
          Password: password,
          RedirectUri: '/Account/LoginSuccess',
        }),
        credentials: 'include', // 如果你後端用 cookie 登入
      });

      if (res.ok) {
        // 可根據實際情況取 token，這邊假設回傳 json 裡有 token
        // const data = await res.json();
        // localStorage.setItem('token', data.token);
        // 若無 token（只靠 cookie），這行可省略
        onLoginSuccess(); // 跳轉主頁
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
