export interface Service {
  id: number;
  name: string;
  description: string;
  isMain: boolean;
  images: string[];
}

export interface QuoteForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface Quote extends QuoteForm {
  id: number;
  serviceId: number;
  serviceName: string;
  createdAt: string;
}