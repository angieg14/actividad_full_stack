"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; //maneja el formulario
import { zodResolver } from "@hookform/resolvers/zod"; //se encarga de que los datos sean válidos antes de mandarlos a Django
import * as z from "zod";
import { courseService } from "@/services/courses.service";

// componenetes visuales de shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Car, CheckCircle2 } from "lucide-react";
import { Ca } from "zod/v4/locales";


//acá estoy haciendo las validaciones
const courseSchema = z.object({
  name: z.string().min(1, "Ingresa el nombre del curso"),
  description: z.string().min(1, "Ingresa el nombre del curso"),
  duration_hours: z.coerce.number().int().positive("Las horas deben ser mayor a cero"),
  price: z.coerce.number().min(0, "Escribe el precio"), //coerce es para lo tome como numero y no texto  
  level: z.enum(["basic", "Basic", "intermediate", "Intermediate", "advanced", "Advanced"], "Nivel de curso no válido")

});

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register, //conecta los inputs con React Hook Forms
    handleSubmit, //la función que envuelve el envío
    reset, //limpia el formulario dsp de guardarlo  
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(courseSchema),
  });

  const loadCourse = async () => {
    try {
      setIsLoading(true);
      const data = await coursesService.getCourses();
      setCourses(data);
    } catch (err) {
      setError("Error al cargar los cursos. Verifica la conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourse();
  }, []);

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");
      await courseService.createCourses(data);
      setSuccess("Curso creado exitosamente");
      reset();
      loadCourse();
    } catch (err) {
      setError("Error al crear el curso");
    }
  };

  return (

    <div className="space-y-6">
      <CardHeader>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
          <p className="text-gray-500 mt-2">Registro de cursos</p>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardContent>
              <CardTitle>Registrar nuevo</CardTitle>
              <CardDescription>Añade el nuevo curso</CardDescription>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4">
                  <Label htmlFor="name">Nombre
                  </Label>
                  <Input id="name" {...register("name")}></Input>
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="my-4">
                  <Label htmlFor="description">Descripción</Label>
                  <Input id="description" {...register("description")}></Input>
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="my-4">
                  <Label htmlFor="duration_hours">Duración de horas</Label>
                  <Input id="duration_hours" {...register("duration_hours")}></Input>
                  {errors.duration_hours && (
                    <p className="text-sm text-red-500">{errors.duration_hours.message}</p>
                  )}
                </div>

                <div className="my-4">
                  <Label htmlFor="price">Precio</Label>
                  <Input id="price" {...register("price ")}></Input>
                  {errors.price && (
                    <p className="text-sm text-red-500">{errors.price.message}</p>
                  )}
                </div>

                <div className="my-4">
                  <Label htmlFor="level">Nivel del curso (basic, intermediate, advanced)</Label>
                  <Input id="level" {...register("level")}></Input>
                  {errors.level && (
                    <p className="text-sm text-red-500">{errors.level.message}</p>
                  )}
                </div>

                <div className="my-4">
                  <Label htmlFor="is_active">Estado activo/inactivo</Label>
                  <Input id="is_active" type="checkbox"></Input>

                </div>

                {/* type es para que el formu se envié automaticamente */}
                {/* disabled es para que no pueda oprimir el boton muchas veces y crear muchas veces el mismo ususario */}
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Curso"}
                  GUARDAR CURSO
                </Button>

                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mt-4 border-green-500 text-green-700">
                    <CheckCircle2 className="h-4 w-4" color="green" />
                    <AlertTitle>Éxito</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
              </form>

            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Listado de Cursos</CardTitle>
            </CardHeader>

            <div>
              <Table>

              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )

}

