// src/services/authApi.ts
export async function login(username: string, password: string): Promise<string> {
  const res = await fetch('http://127.0.0.1:5010/api/AccountApi/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('帳號或密碼錯誤');
  const data = await res.json();
  // 儲存 token
  localStorage.setItem('token', data.token);
  return data.token;
}
