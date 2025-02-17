"use client"

import { AlertTriangle, Shield, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function IncidentResponsePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Incident Response</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            24/7 emergency response and recovery services for cyber security incidents
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Rapid Response Team</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our expert incident response team is available 24/7 to help you manage and recover from security incidents.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Team
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect p-6 rounded-xl">
              <AlertTriangle className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Incident Detection</h3>
              <p className="text-muted-foreground">Real-time threat monitoring</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Rapid Response</h3>
              <p className="text-muted-foreground">Immediate action plans</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}