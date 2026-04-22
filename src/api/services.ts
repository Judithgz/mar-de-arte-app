import axios from 'axios';
import type { Service } from '../types';

const API = 'https://mar-de-arte-api.onrender.com/api';

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export async function getServices(): Promise<Service[]> {
  const { data } = await axios.get(`${API}/services`);
  return data;
}

export async function createService(payload: Omit<Service, 'id' | 'images'>, token: string): Promise<Service> {
  const { data } = await axios.post(`${API}/services`, payload, { headers: auth(token) });
  return data;
}

export async function deleteService(id: number, token: string) {
  await axios.delete(`${API}/services/${id}`, { headers: auth(token) });
}

export async function uploadImage(serviceId: number, file: File, token: string): Promise<Service> {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await axios.post(`${API}/services/${serviceId}/images`, formData, {
    headers: auth(token),
  });
  return data;
}

export async function deleteImage(serviceId: number, index: number, token: string): Promise<Service> {
  const { data } = await axios.delete(`${API}/services/${serviceId}/images/${index}`, { headers: auth(token) });
  return data;
}
