"use client"

import { Code, Shield, Lock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Web3SecurityPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Web3 Security</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security solutions for blockchain and smart contract applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Smart Contract Security</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our team of experts conducts thorough audits of smart contracts to identify vulnerabilities and ensure secure implementation.
            </p>
            <Button asChild>
              <Link href="/contact">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect p-6 rounded-xl">
              <Code className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Contract Audits</h3>
              <p className="text-muted-foreground">Comprehensive code review</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">DeFi Security</h3>
              <p className="text-muted-foreground">Protocol security assessment</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Lock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Blockchain Security</h3>
              <p className="text-muted-foreground">Network security analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}