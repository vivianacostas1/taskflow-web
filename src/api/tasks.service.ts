import api from './axios';
import type {
  ApiResponse,
  Task,
  CreateTaskData,
  UpdateTaskData,
} from '../types';

// Función auxiliar para obtener el token del almacenamiento de forma segura
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const tasksService = {
  async getByProject(projectId: string): Promise<Task[]> {
    const res = await api.get<ApiResponse<Task[]>>(`/tasks/project/${projectId}`, getAuthHeaders());
    return res.data.data;
  },

  async create(data: CreateTaskData): Promise<Task> {
    // Forzamos el envío de las cabeceras de autorización en el tercer parámetro
    const res = await api.post<ApiResponse<Task>>('/tasks', data, getAuthHeaders());
    return res.data.data;
  },

  async update(id: string, data: UpdateTaskData): Promise<Task> {
    // Forzamos el envío de las cabeceras de autorización al actualizar (Paso 5, 6 y 8)
    const res = await api.put<ApiResponse<Task>>(`/tasks/${id}`, data, getAuthHeaders());
    return res.data.data;
  },

  async remove(id: string): Promise<void> {
    // 🛠️ CORREGIDO: Estaba incompleto. Ahora ejecuta el DELETE correctamente con el token (Paso 7)
    await api.delete<ApiResponse<void>>(`/tasks/${id}`, getAuthHeaders());
  },
};