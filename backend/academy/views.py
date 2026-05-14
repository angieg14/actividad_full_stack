from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson
from .serializers import (
    StudentSerializer,
    StudentPictureSerializer,
    InstructorSerializer,
    VehicleSerializer,
    CourseSerializer,
    EnrollmentSerializer,
    LessonSerializer,
)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    search_fields = ["first_name", "last_name", "email"]
    ordering_fields = ["created_at", "first_name", "last_name"]

    # @action: decorador de DRF para crear una ruta especial (upload.picture en este caso)
    @action(
        detail=True,
        methods=["post"],
        url_path="upload-picture",
        parser_classes=[MultiPartParser, FormParser],
    )  # parser_classes es para que Django sepa que va a recibir una imagen y no texto
    def upload_picture(self, request, pk=None):
        student = self.get_object()

        # TODO(actividad): Validar que exista `profile_picture` en request.FILES.
        # TODO(actividad): Validar tipo/tamano basico del archivo antes de guardar.
        # TODO(actividad): Usar StudentPictureSerializer para persistir la imagen.
        # TODO(actividad): Retornar StudentSerializer(student, context={"request": request}).data
        #                  cuando la subida sea exitosa.

        # acá ya está validando si existe el archivo
        incoming_file = request.FILES.get("profile_picture")
        if not incoming_file:
            return Response(
                {"detail": "Debes enviar el archivo profile_picture."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # validar tipo/tamaño antes de guardar
        if not incoming_file.content_type.startswitch(
            "image/"
        ):  # saber que tipo de archivo es
            return Response(
                {"detail": "El archivo debe ser una imagen"},
                status=status.HTTP_400_BAD_REQUEST,  # error del cliente
            )

        # valida que no pese mas de 2mb
        if incoming_file.size > 2 * 1024 * 1024:
            return Response(
                {"detail": "La imagen es muy pesada (máximo 2MB)"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # uso del StudentPictureSerializer
        serializer = StudentPictureSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            return Response(
                StudentSerializer(student, context={"request": request}).data,
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {
                "detail": (
                    "TODO_ACTIVIDAD: completa la logica de guardado en "
                    "academy.views.StudentViewSet.upload_picture"
                )
            },
            status=status.HTTP_501_NOT_IMPLEMENTED,
        )


class InstructorViewSet(viewsets.ModelViewSet):
    pass


class VehicleViewSet(viewsets.ModelViewSet):
    pass


class CourseViewSet(viewsets.ModelViewSet):
    pass


class EnrollmentViewSet(viewsets.ModelViewSet):
    pass


class LessonViewSet(viewsets.ModelViewSet):
    pass
