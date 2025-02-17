"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Edit, Trash2, ArrowLeft, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModuleDialog } from "@/components/admin/module-dialog";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/lib/supabase";

export default function CoursePage() {
  const params = useParams<{ courseId: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const [course, setCourse] = useState<Tables["courses"]["Row"] | null>(null);
  const [modules, setModules] = useState<Tables["modules"]["Row"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<
    Tables["modules"]["Row"] | null
  >(null);
  const [showModuleDialog, setShowModuleDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const loadCourse = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", params.courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      const { data: modulesData, error: modulesError } = await supabase
        .from("modules")
        .select("*")
        .eq("course_id", params.courseId)
        .order("order_index");

      if (modulesError) throw modulesError;
      setModules(modulesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load course data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [params.courseId, toast]);

  useEffect(() => {
    if (params.courseId) {
      void loadCourse();
    }
  }, [params.courseId, loadCourse]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("modules").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Module deleted successfully",
      });

      void loadCourse();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete module",
        variant: "destructive",
      });
    }
    setShowDeleteDialog(false);
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!course) {
    return <div className="p-8">Course not found</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          className="mr-4"
          onClick={() => router.push("/admin/courses")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="space-x-2">
          <Badge>{course.category}</Badge>
          <Badge
            variant={
              course.difficulty === "Beginner"
                ? "default"
                : course.difficulty === "Intermediate"
                  ? "secondary"
                  : "destructive"
            }
          >
            {course.difficulty}
          </Badge>
          <Badge variant={course.is_published ? "default" : "secondary"}>
            {course.is_published ? "Published" : "Draft"}
          </Badge>
        </div>
        <Button
          onClick={() => {
            setSelectedModule(null);
            setShowModuleDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <div className="grid gap-4">
        {modules.map((module) => (
          <Card key={module.id} className="relative">
            <CardHeader className="grid md:grid-cols-[1fr_100px]">
              <div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
              <div className="flex items-start justify-end md:justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedModule(module);
                    setShowModuleDialog(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedModule(module);
                    setShowDeleteDialog(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="cursor-move">
                  <GripVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Order: {module.order_index}</span>
                <span>Points: {module.points}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ModuleDialog
        open={showModuleDialog}
        onOpenChange={setShowModuleDialog}
        courseId={course.id}
        module={selectedModule}
        onSave={() => void loadCourse()}
        totalModules={modules.length}
      />

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => void handleDelete(selectedModule?.id ?? "")}
        title="Delete Module"
        description="Are you sure you want to delete this module? This action cannot be undone and will also delete all associated challenges."
      />
    </div>
  );
}
