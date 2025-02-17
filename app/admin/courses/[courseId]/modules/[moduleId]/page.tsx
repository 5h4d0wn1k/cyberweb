"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChallengeDialog } from "@/components/admin/challenge-dialog"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import type { Tables } from "@/lib/supabase"

export default function ModulePage() {
  const params = useParams<{ courseId: string; moduleId: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const [module, setModule] = useState<Tables["modules"]["Row"] | null>(null)
  const [challenges, setChallenges] = useState<Tables["challenges"]["Row"][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedChallenge, setSelectedChallenge] = useState<Tables["challenges"]["Row"] | null>(null)
  const [showChallengeDialog, setShowChallengeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const loadModule = useCallback(async () => {
    try {
      if (!params) throw new Error("Params not found")
      setIsLoading(true)
      const { data: moduleData, error: moduleError } = await supabase
        .from("modules")
        .select("*")
        .eq("id", params.moduleId)
        .single()

      if (moduleError) throw moduleError
      setModule(moduleData)

      const { data: challengesData, error: challengesError } = await supabase
        .from("challenges")
        .select("*")
        .eq("module_id", params.moduleId)
        .order("order_index")

      if (challengesError) throw challengesError
      setChallenges(challengesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load module data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [params, toast])

  useEffect(() => {
    if (params?.moduleId) {
      void loadModule()
    }
  }, [params?.moduleId, loadModule])

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("challenges")
        .delete()
        .eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Challenge deleted successfully",
      })

      void loadModule()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete challenge",
        variant: "destructive",
      })
    }
    setShowDeleteDialog(false)
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!module) {
    return <div className="p-8">Module not found</div>
  }

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          className="mr-4"
          onClick={() => {
            if (params) {
              router.push(`/admin/courses/${params.courseId}`)
            }
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{module.title}</h1>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <Badge>Points: {module.points}</Badge>
        </div>
        <Button
          onClick={() => {
            setSelectedChallenge(null)
            setShowChallengeDialog(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Challenge
        </Button>
      </div>

      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardHeader className="grid md:grid-cols-[1fr_100px]">
              <div>
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </div>
              <div className="flex items-start justify-end md:justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedChallenge(challenge)
                    setShowChallengeDialog(true)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedChallenge(challenge)
                    setShowDeleteDialog(true)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={
                    challenge.difficulty === "Beginner"
                      ? "default"
                      : challenge.difficulty === "Intermediate"
                      ? "outline"
                      : "destructive"
                  }
                >
                  {challenge.difficulty}
                </Badge>
                <Badge variant="outline">Points: {challenge.points}</Badge>
                {challenge.hints && challenge.hints.length > 0 && (
                  <Badge variant="secondary">{challenge.hints.length} Hints</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ChallengeDialog
        open={showChallengeDialog}
        onOpenChange={setShowChallengeDialog}
        moduleId={module.id}
        challenge={selectedChallenge}
        onSave={() => void loadModule()}
        totalChallenges={challenges.length}
      />

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={() => void handleDelete(selectedChallenge?.id ?? "")}
        title="Delete Challenge"
        description="Are you sure you want to delete this challenge? This action cannot be undone."
      />
    </div>
  )
}