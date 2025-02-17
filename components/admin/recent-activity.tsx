"use client"

import { useEffect, useState } from "react"
import { Shield, AlertTriangle, Info } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"

interface Activity {
  id: string
  type: "submission" | "achievement" | "registration"
  message: string
  time: string
  icon: typeof Shield
  severity: "high" | "info" | "low"
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadActivities() {
      try {
        const [
          { data: submissions },
          { data: achievements },
          { data: registrations }
        ] = await Promise.all([
          supabase
            .from('submissions')
            .select('*, challenge:challenges(title), user:users_profiles(username)')
            .order('created_at', { ascending: false })
            .limit(5),
          supabase
            .from('user_achievements')
            .select('*, achievement:achievements(title), user:users_profiles(username)')
            .order('earned_at', { ascending: false })
            .limit(5),
          supabase
            .from('users_profiles')
            .select('username, created_at')
            .order('created_at', { ascending: false })
            .limit(5)
        ])

        const formattedActivities: Activity[] = [
          ...(submissions?.map(s => ({
            id: s.id,
            type: "submission" as const,
            message: `${s.user?.username} submitted ${s.is_correct ? 'correct' : 'incorrect'} solution for ${s.challenge?.title}`,
            time: formatDistanceToNow(new Date(s.created_at), { addSuffix: true }),
            icon: s.is_correct ? Shield : AlertTriangle,
            severity: s.is_correct ? "info" : "high"
          })) || []),
          ...(achievements?.map(a => ({
            id: a.id,
            type: "achievement" as const,
            message: `${a.user?.username} earned achievement: ${a.achievement?.title}`,
            time: formatDistanceToNow(new Date(a.earned_at), { addSuffix: true }),
            icon: Shield,
            severity: "info"
          })) || []),
          ...(registrations?.map(r => ({
            id: r.username,
            type: "registration" as const,
            message: `New user registered: ${r.username}`,
            time: formatDistanceToNow(new Date(r.created_at), { addSuffix: true }),
            icon: Info,
            severity: "low"
          })) || [])
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, 10)

        setActivities(formattedActivities)
      } catch (error) {
        console.error('Failed to load activities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadActivities()

    // Set up real-time subscriptions
    const submissionsSubscription = supabase
      .channel('submissions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, () => {
        void loadActivities()
      })
      .subscribe()

    const achievementsSubscription = supabase
      .channel('achievements')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_achievements' }, () => {
        void loadActivities()
      })
      .subscribe()

    return () => {
      void submissionsSubscription.unsubscribe()
      void achievementsSubscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return <div>Loading activities...</div>
  }

  return (
    <div className="space-y-8">
      {activities.map((activity) => {
        const Icon = activity.icon
        return (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`p-2 rounded-full bg-primary/10`}>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}