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

  //para editar
  patchCourses: async (id, data) => {
    const response = (await api.patch(`/courses/${id}/`, data));
    return response.data;
  },

  //delete
  deleteCourses: async (id) => {
    const response = await api.delete(`/courses/${id}/`);
    return response.data;
  },
};