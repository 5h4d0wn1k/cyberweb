"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { supabase } from "@/lib/supabase"
import { format, subDays, eachDayOfInterval } from "date-fns"

interface ChartData {
  name: string
  value: number
}

export function Overview() {
  const [data, setData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const endDate = new Date()
        const startDate = subDays(endDate, 7)
        
        const { data: submissions } = await supabase
          .from('submissions')
          .select('created_at')
          .gte('created_at', startDate.toISOString())
          .lte('created_at', endDate.toISOString())

        // Create a map of dates and submission counts
        const submissionsByDate = (submissions || []).reduce((acc, { created_at }) => {
          const date = format(new Date(created_at), 'MMM dd')
          acc[date] = (acc[date] || 0) + 1
          return acc
        }, {} as Record<string, number>)

        // Create data points for each day in the range
        const chartData = eachDayOfInterval({ start: startDate, end: endDate })
          .map(date => ({
            name: format(date, 'MMM dd'),
            value: submissionsByDate[format(date, 'MMM dd')] || 0
          }))

        setData(chartData)
      } catch (error) {
        console.error('Failed to load chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void loadData()
  }, [])

  if (isLoading) {
    return <div>Loading chart data...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}