"use client"

import { Shield, Code, Lock, Users, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">About Shadownik</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leading the future of cybersecurity with advanced Web3 technology and comprehensive security solutions
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Shadownik, we're committed to revolutionizing cybersecurity through innovative technology and comprehensive education. Our mission is to empower organizations and individuals with the knowledge and tools they need to protect their digital assets in an increasingly complex threat landscape.
            </p>
            <Button asChild>
              <Link href="/contact">
                Get in Touch
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-effect p-6 rounded-xl">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Protection</h3>
              <p className="text-muted-foreground">Advanced security solutions for modern threats</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Code className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">Cutting-edge Web3 security technology</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Lock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Trust</h3>
              <p className="text-muted-foreground">Building secure digital foundations</p>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">Fostering security awareness</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold gradient-text">500+</div>
            <div className="text-muted-foreground">Enterprise Clients</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold gradient-text">10k+</div>
            <div className="text-muted-foreground">Security Professionals</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold gradient-text">99.9%</div>
            <div className="text-muted-foreground">Threat Detection</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold gradient-text">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-xl p-8">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in everything we do, from our cutting-edge security solutions to our world-class training programs.
              </p>
            </div>
            <div className="glass-effect rounded-xl p-8">
              <Lock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of integrity and transparency in all our operations and client relationships.
              </p>
            </div>
            <div className="glass-effect rounded-xl p-8">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously innovate and adapt to stay ahead of emerging threats and provide cutting-edge security solutions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the leading organizations that trust Shadownik for their security needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Us
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/education">
                View Training Programs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}