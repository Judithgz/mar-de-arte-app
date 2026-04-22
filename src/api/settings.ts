import axios from 'axios';

const API = 'https://mar-de-arte-api.onrender.com/api';
const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export interface Settings {
  heroVideoUrl: string | null;
}

export async function getSettings(): Promise<Settings> {
  const { data } = await axios.get(`${API}/settings`);
  return data;
}

export async function uploadHeroVideo(file: File, token: string): Promise<Settings> {
  const formData = new FormData();
  formData.append('video', file);
  const { data } = await axios.post(`${API}/settings/hero-video`, formData, {
    headers: auth(token),
  });
  return data;
}

export async function deleteHeroVideo(token: string): Promise<Settings> {
  const { data } = await axios.delete(`${API}/settings/hero-video`, { headers: auth(token) });
  return data;
}
