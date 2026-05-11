import { api } from '@/lib/api';

export const courseService = {
  getCourses: async () => {
    const response = await api.get('/courses/');
    return response.data.results || response.data;
  },

  createCourses: async (data) => {
    const response = await api.post('/courses/', data);
    return response.data;
  },
};