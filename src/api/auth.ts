import axios from 'axios';

const API = 'http://localhost:3001/api';

export async function login(username: string, password: string): Promise<string> {
  console.log('axios POST a:', `${API}/auth/login`);
  const { data } = await axios.post(`${API}/auth/login`, { username, password });
  console.log('respuesta axios:', data);
  return data.token;
}

export async function logout(token: string) {
  await axios.post(`${API}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
