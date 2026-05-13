# Implementaciones

## Métodos HTTP
Se implementaron los siguientes métodos en el courses.services
- patch
- get
- delete
- post
  
Usamos PATCH en vez de PUT, porque no necesitabamos que reemplazara todos los campos, sino solo el específico que el cliente quisiera

## Dependencias
- BACKEND: Se uso **Django Rest Framework** para poder hacer las validaciones que se ven visualizadas en el serializer
- FRONTEND:
  - **react-hook-form** -> para manejar el estado del formulario
  - **hookform/resolvers/zod** -> validar nuevamente los campos, así que si hay un error no se lo mandará al backend
  - **shadcn** -> los componentes que nos fueron facilitados
