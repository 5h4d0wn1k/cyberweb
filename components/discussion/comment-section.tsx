"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: string
  content: string
  user: {
    name: string
    image: string
  }
  createdAt: string
}

interface CommentSectionProps {
  challengeId: string
}

export function CommentSection({ challengeId }: CommentSectionProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!session?.user || !newComment.trim()) return

    try {
      setIsSubmitting(true)
      const { data, error } = await supabase
        .from('challenge_comments')
        .insert({
          challenge_id: challengeId,
          user_id: session.user.id,
          content: newComment.trim()
        })
        .select('*, user:users_profiles(username, avatar_url)')
        .single()

      if (error) throw error

      setComments((prev) => [data, ...prev])
      setNewComment("")
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {session && (
        <div className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar>
              <AvatarImage src={comment.user.image} alt={comment.user.name} />
              <AvatarFallback>
                {comment.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{comment.user.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}