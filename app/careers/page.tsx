"use client"

import { Briefcase, Shield, Code, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of cybersecurity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Join Shadownik?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're building cutting-edge security solutions and we need talented individuals to join our mission.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Innovative Technology</h3>
                  <p className="text-muted-foreground">Work with cutting-edge security tools and technologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Great Team</h3>
                  <p className="text-muted-foreground">Collaborate with talented and passionate security experts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Code className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Continuous Learning</h3>
                  <p className="text-muted-foreground">Regular training and certification opportunities</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Open Positions</h3>
            <div className="glass-effect p-6 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold">Security Engineer</h4>
                  <p className="text-muted-foreground mb-4">Full-time · Remote</p>
                </div>
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <Button asChild>
                <Link href="/contact">
                  Apply Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold">Blockchain Security Analyst</h4>
                  <p className="text-muted-foreground mb-4">Full-time · Remote</p>
                </div>
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <Button asChild>
                <Link href="/contact">
                  Apply Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}