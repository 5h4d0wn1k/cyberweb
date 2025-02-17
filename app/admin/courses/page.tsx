"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CourseDialog } from "@/components/admin/course-dialog";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/lib/supabase";
import type { Course } from "@/components/admin/course-dialog";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Tables["courses"]["Row"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined,
  );
  const [showCourseDialog, setShowCourseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const loadCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCourses(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void loadCourses();
  }, [loadCourses]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("courses").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Course deleted successfully",
      });

      void loadCourses();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
    setShowDeleteDialog(false);
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button
          onClick={() => {
            setSelectedCourse(undefined);
            setShowCourseDialog(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <Badge
                    variant={course.is_published ? "default" : "secondary"}
                  >
                    {course.is_published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell>{course.points}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/admin/courses/${course.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedCourse({
                        ...course,
                        image_url: course.image_url || undefined,
                      });
                      setShowCourseDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedCourse({
                        ...course,
                        image_url: course.image_url || undefined,
                      });
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CourseDialog
        open={showCourseDialog}
        onOpenChange={setShowCourseDialog}
        course={selectedCourse}
        onSave={() => void loadCourses()}
      />

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => void handleDelete(selectedCourse?.id ?? "")}
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone."
      />
    </div>
  );
}
