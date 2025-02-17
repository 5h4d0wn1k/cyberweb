"use client"

import { Shield, Code, Lock, Network, Database, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cybersecurity solutions powered by cutting-edge technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="card-hover">
            <CardHeader>
              <Shield className="h-12 w-12 mb-4 text-primary animate-float" />
              <CardTitle className="text-2xl">Security Audits</CardTitle>
              <CardDescription>
                Comprehensive security assessments and penetration testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm">
                  <Lock className="h-4 w-4 mr-2 text-primary" />
                  Infrastructure Assessment
                </li>
                <li className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  Vulnerability Scanning
                </li>
                <li className="flex items-center text-sm">
                  <Network className="h-4 w-4 mr-2 text-primary" />
                  Penetration Testing
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/contact">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <Code className="h-12 w-12 mb-4 text-primary animate-float" />
              <CardTitle className="text-2xl">Web3 Security</CardTitle>
              <CardDescription>
                Blockchain and smart contract security solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm">
                  <Code className="h-4 w-4 mr-2 text-primary" />
                  Smart Contract Audits
                </li>
                <li className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  DeFi Security
                </li>
                <li className="flex items-center text-sm">
                  <Lock className="h-4 w-4 mr-2 text-primary" />
                  Blockchain Protection
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/contact">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <Database className="h-12 w-12 mb-4 text-primary animate-float" />
              <CardTitle className="text-2xl">SIEM Solutions</CardTitle>
              <CardDescription>
                Advanced security information and event management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  Real-time Monitoring
                </li>
                <li className="flex items-center text-sm">
                  <Network className="h-4 w-4 mr-2 text-primary" />
                  Threat Detection
                </li>
                <li className="flex items-center text-sm">
                  <Lock className="h-4 w-4 mr-2 text-primary" />
                  Incident Response
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link href="/contact">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your security needs and get a customized solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Sales
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}