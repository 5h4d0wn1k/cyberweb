"use client"

import { BookOpen, Shield, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TrainingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Security Training</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security training programs for organizations and individuals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Expert-Led Training</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our training programs are designed and delivered by industry experts to help your team develop essential security skills.
            </p>
            <Button asChild>
              <Link href="/education">
                View Courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect p-6 rounded-xl">
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Training Programs</h3>
              <p className="text-muted-foreground">Structured learning paths</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Security Awareness</h3>
              <p className="text-muted-foreground">Employee education</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Workshops</h3>
              <p className="text-muted-foreground">Interactive sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}