"use client"

import { CalendarDays, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Security Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Latest insights and updates from our security experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <Card className="col-span-full lg:col-span-2 card-hover">
            <CardHeader>
              <CardTitle className="text-2xl">Understanding Web3 Security Challenges</CardTitle>
              <CardDescription className="flex items-center space-x-4">
                <span className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  March 15, 2025
                </span>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  John Smith
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                An in-depth look at the security challenges facing Web3 applications and how to address them effectively.
              </p>
              <Button variant="outline" asChild>
                <Link href="/blog/web3-security-challenges">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Regular Articles */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>SIEM Best Practices</CardTitle>
              <CardDescription className="flex items-center space-x-4">
                <span className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  March 10, 2025
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Essential best practices for implementing and managing SIEM solutions.
              </p>
              <Button variant="outline" asChild>
                <Link href="/blog/siem-best-practices">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Incident Response Planning</CardTitle>
              <CardDescription className="flex items-center space-x-4">
                <span className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  March 5, 2025
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                How to create and maintain an effective incident response plan.
              </p>
              <Button variant="outline" asChild>
                <Link href="/blog/incident-response-planning">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}