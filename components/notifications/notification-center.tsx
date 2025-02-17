"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  type: "achievement" | "comment" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string
}

export function NotificationCenter() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!session?.user) return

    // Load initial notifications
    const loadNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(50)

        if (error) throw error

        setNotifications(data)
        setUnreadCount(data.filter(n => !n.read).length)
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
    }

    void loadNotifications()

    // Subscribe to real-time notifications
    const channel = supabase
      .channel(`notifications:${session.user.id}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${session.user.id}`
      }, (payload) => {
        const newNotification = payload.new as Notification
        setNotifications(prev => [newNotification, ...prev])
        setUnreadCount(prev => prev + 1)
        
        toast({
          title: newNotification.title,
          description: newNotification.message,
        })
      })
      .subscribe()

    return () => {
      void channel.unsubscribe()
    }
  }, [session, toast])

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)

      if (error) throw error

      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      )
      setUnreadCount(prev => prev - 1)
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', session?.user.id)
        .eq('read', false)

      if (error) throw error

      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      )
      setUnreadCount(0)
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex justify-between items-center">
          <SheetTitle>Notifications</SheetTitle>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No notifications yet
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  notification.read ? "bg-muted" : "bg-primary/5"
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}