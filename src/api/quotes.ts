import axios from 'axios';

const API = 'https://mar-de-arte-api.onrender.com/api';

export interface QuotePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  serviceId: number;
  serviceName: string;
}

export async function sendQuote(payload: QuotePayload) {
  const { data } = await axios.post(`${API}/quotes`, payload);
  return data;
}

export async function getQuotes() {
  const { data } = await axios.get(`${API}/quotes`);
  return data;
}
