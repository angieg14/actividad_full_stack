import { api } from '@/lib/api';

export const studentsService = { //objeto con todas las funciones de listar, crear, etc...
  getStudents: async () => {
    const response = await api.get('/students/');
    return response.data.results || response.data;
  },

  createStudent: async (data) => {
    const response = await api.post('/students/', data);
    return response.data;
  },

  uploadPicture: async (studentId, file) => { //recibe id de estudiante y archivo
    if (!studentId || !file) {
      throw new Error('Faltan datos para subir la imagen.');
    }
    
    const formData = new FormData();

    // TODO(actividad): Agregar el archivo en FormData con la clave correcta
    // Ejemplo esperado: formData.append('profile_picture', file)
    formData.append('profile_picture', file);

    // TODO(actividad): Consumir el action endpoint del backend
    // Endpoint esperado: /students/:id/upload-picture/
    // Debes enviar multipart/form-data y retornar response.data
    const response = await api.post(`/students/${studentId}/upload-picture/`, formData, {
      headers: {
        // Le indicamos al servidor que estamos enviando un archivo
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;

    throw new Error('TODO_ACTIVIDAD: Implementa uploadPicture en students.service.js');
  },
};
