"use client"

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

const questionSchema = z.object({
  type: z.enum(["multiple_choice", "single_choice", "text"]),
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  points: z.number().min(0),
})

const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  timeLimit: z.number().min(0),
  questions: z.array(questionSchema),
})

type QuizFormValues = z.infer<typeof quizSchema>

interface QuizBuilderProps {
  onSave: (quiz: QuizFormValues) => Promise<void>
  initialData?: QuizFormValues
}

export function QuizBuilder({ onSave, initialData }: QuizBuilderProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      timeLimit: 30,
      questions: [
        {
          type: "multiple_choice",
          question: "",
          options: [""],
          correctAnswer: "",
          points: 1,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  })

  const onSubmit = async (values: QuizFormValues) => {
    try {
      setIsSubmitting(true)
      await onSave(values)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Limit (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Questions</h3>
            <Button
              type="button"
              onClick={() =>
                append({
                  type: "multiple_choice",
                  question: "",
                  options: [""],
                  correctAnswer: "",
                  points: 1,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Question {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`questions.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="multiple_choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="single_choice">
                          Single Choice
                        </SelectItem>
                        <SelectItem value="text">Text Answer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`questions.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`questions.${index}.points`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Points</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Quiz"}
        </Button>
      </form>
    </Form>
  )
}