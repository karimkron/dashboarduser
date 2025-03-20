import api from './api';

export interface BookingData {
  serviceId: string;
  date: string;
  time: string;
  barberId?: string;
}

export const bookingService = {
  async getAppointments() {
    const response = await api.get('/appointments');
    return response.data;
  },

  async createAppointment(data: BookingData) {
    const response = await api.post('/appointments', data);
    return response.data;
  },

  async cancelAppointment(appointmentId: string) {
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response.data;
  },

  async rescheduleAppointment(appointmentId: string, data: BookingData) {
    const response = await api.put(`/appointments/${appointmentId}`, data);
    return response.data;
  },

  async getAvailableSlots(date: string) {
    const response = await api.get(`/appointments/available-slots`, {
      params: { date }
    });
    return response.data;
  }
};