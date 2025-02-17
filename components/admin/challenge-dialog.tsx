"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import type { Tables } from "@/lib/supabase"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Difficulty is required",
  }),
  points: z.number().min(0, "Points must be 0 or greater").max(1000, "Points must be less than 1000"),
  flag: z.string().min(1, "Flag is required").max(200, "Flag must be less than 200 characters"),
  hints: z.array(z.string()).optional(),
  order_index: z.number().min(0, "Order must be 0 or greater"),
})

type FormValues = z.infer<typeof formSchema>

interface ChallengeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  moduleId: string
  challenge?: Tables["challenges"]["Row"] | null
  onSave: () => void
  totalChallenges: number
}

export function ChallengeDialog({
  open,
  onOpenChange,
  moduleId,
  challenge,
  onSave,
  totalChallenges,
}: ChallengeDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: challenge ? {
      ...challenge,
      hints: challenge.hints ?? [],
    } : {
      title: "",
      description: "",
      difficulty: "Beginner",
      points: 0,
      flag: "",
      hints: [],
      order_index: totalChallenges,
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true)
      const { error } = challenge
        ? await supabase
            .from("challenges")
            .update(values)
            .eq("id", challenge.id)
        : await supabase
            .from("challenges")
            .insert({
              ...values,
              module_id: moduleId,
            })

      if (error) throw error

      toast({
        title: "Success",
        description: `Challenge ${challenge ? "updated" : "created"} successfully`,
      })
      
      onSave()
      onOpenChange(false)
    } catch (error) {
      console.error('Challenge save error:', error);
      toast({
        title: "Error",
        description: `Failed to ${challenge ? "update" : "create"} challenge`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {challenge ? "Edit Challenge" : "Create Challenge"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Challenge title" {...field} />
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
                    <Textarea
                      placeholder="Challenge description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="points"
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
            <FormField
              control={form.control}
              name="flag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag</FormLabel>
                  <FormControl>
                    <Input placeholder="flag{...}" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order_index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
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
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}