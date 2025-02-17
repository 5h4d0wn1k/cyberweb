"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { RecentActivity } from "@/components/admin/recent-activity"
import { Shield, Users, AlertTriangle, Activity } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalChallenges: number
  activeUsers: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalChallenges: 0,
    activeUsers: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const [
          { count: usersCount },
          { count: coursesCount },
          { count: challengesCount },
          { count: activeCount }
        ] = await Promise.all([
          supabase.from('users_profiles').select('*', { count: 'exact', head: true }),
          supabase.from('courses').select('*', { count: 'exact', head: true }),
          supabase.from('challenges').select('*', { count: 'exact', head: true }),
          supabase.from('users_profiles')
            .select('*', { count: 'exact', head: true })
            .gte('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        ])

        setStats({
          totalUsers: usersCount || 0,
          totalCourses: coursesCount || 0,
          totalChallenges: challengesCount || 0,
          activeUsers: activeCount || 0
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadStats()
  }, [])

  if (isLoading) {
    return <div className="p-8">Loading dashboard data...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active in last 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              Training paths available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Challenges</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalChallenges}</div>
            <p className="text-xs text-muted-foreground">
              Active learning exercises
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}