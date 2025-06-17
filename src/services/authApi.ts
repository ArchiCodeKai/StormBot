// src/services/authApi.ts

// 登入（回傳 token）
export async function login(username: string, password: string): Promise<string> {
  const res = await fetch('http://後端IP:Port/Account/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      Username: username,
      Password: password,
      RedirectUri: '/Account/LoginSuccess',
    }),
    credentials: 'include', // 如果有 cookie
  });

  if (!res.ok) throw new Error('帳號或密碼錯誤');
  // 若後端有回傳 token
  // const data = await res.json();
  // return data.token;
  // 若沒回傳 token，這裡不用 return
  return '';
}
