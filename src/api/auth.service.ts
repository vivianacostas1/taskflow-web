import api from './axios';
import type { AuthPayload, LoginCredentials, RegisterData } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthPayload> {
    const response = await api.post('/auth/login', credentials);
    return response.data; // 👈 backend ya devuelve { token, user }
  },

  async register(payload: RegisterData): Promise<AuthPayload> {
    const response = await api.post('/auth/register', payload);
    return response.data; // 👈 igual aquí
  },
};