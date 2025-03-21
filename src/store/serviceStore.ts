// src/store/serviceStore.ts
import { create } from 'zustand';
import api from '../services/api';
import { useAuthStore } from './auth.store';

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  points: number;
}

interface ServiceStore {
  services: Service[];
  categories: { id: string; name: string }[];
  loading: boolean;
  error: string;
  fetchServices: () => Promise<void>;
}

export const useServiceStore = create<ServiceStore>((set, _get) => ({
  services: [],
  categories: [],
  loading: true,
  error: '',
  fetchServices: async () => {
    try {
      const token = useAuthStore.getState().token;
      const response = await api.get<Service[]>('/api/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const servicesData = response.data;

      // Guardar servicios en localStorage con clave "services"
      localStorage.setItem('services', JSON.stringify(servicesData));

      // Extraer categorías únicas a partir de los servicios
      const uniqueCategories = Array.from(
        new Set(servicesData.map(service => service.category))
      ).map((category) => ({ id: category, name: category }));

      // Armar el array final de categorías (incluyendo la opción "Todos")
      const finalCategories = [{ id: 'all', name: 'Todos' }, ...uniqueCategories];
      // Guardar categorías en localStorage con clave "serviceCategories"
      localStorage.setItem('serviceCategories', JSON.stringify(finalCategories));

      set({
        services: servicesData,
        categories: finalCategories,
        loading: false,
        error: '',
      });
    } catch (error) {
      console.error('Error fetching services:', error);
      set({
        error: 'Error al cargar los servicios. Inténtalo de nuevo más tarde.',
        loading: false,
      });
    }
  },
}));