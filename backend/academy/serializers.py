from rest_framework import serializers
from .models import Student, Instructor, Vehicle, Course, Enrollment, Lesson

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class StudentPictureSerializer(serializers.ModelSerializer):
    def validate_profile_picture(self, value):
        # TODO(actividad): Implementar validaciones de archivo (tamano y tipo MIME).
        if not value.content_type.startswitch('image/'):
            raise serializers.ValidationError("El archivo debe ser una imagen") #raise lanza una excepción
            
        # Ejemplo: permitir image/jpeg e image/png y limitar a 2MB.
        if value.size > 2*1024*1024:
            raise serializers.ValidationError("Imagen muy pesada, por favor que no supere los 2MB")
        return value

    class Meta:
        model = Student
        fields = ['profile_picture']

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'
