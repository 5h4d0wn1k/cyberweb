"use client"

import { Shield, Search, FileCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SecurityAuditPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Security Audits</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security assessments to identify and mitigate vulnerabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We conduct thorough security assessments using industry-leading methodologies and tools to identify potential vulnerabilities in your systems.
            </p>
            <Button asChild>
              <Link href="/contact">
                Schedule an Audit
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect p-6 rounded-xl">
              <Search className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Vulnerability Assessment</h3>
              <p className="text-muted-foreground">Comprehensive scanning and analysis</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Penetration Testing</h3>
              <p className="text-muted-foreground">Simulated cyber attacks</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <FileCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Compliance Checks</h3>
              <p className="text-muted-foreground">Regulatory compliance verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}