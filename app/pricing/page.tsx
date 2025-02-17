"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">Enterprise Plans</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible security solutions tailored to your organization's needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Standard Plan */}
          <div className="glass-effect rounded-xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">Standard</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">$999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Up to 100 users</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Basic SIEM features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>8/5 Support</span>
              </li>
            </ul>
            <Button className="w-full" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>

          {/* Professional Plan */}
          <div className="glass-effect rounded-xl p-8 border-primary/50 border-2">
            <div className="text-center mb-6">
              <div className="text-primary mb-2">Most Popular</div>
              <h3 className="text-2xl font-bold">Professional</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">$2,499</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Up to 500 users</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Advanced SIEM features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>24/7 Support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Security training</span>
              </li>
            </ul>
            <Button className="w-full" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-effect rounded-xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Unlimited users</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Custom SIEM solution</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>24/7 Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Dedicated security team</span>
              </li>
            </ul>
            <Button className="w-full" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">What's included in the SIEM solution?</h3>
              <p className="text-muted-foreground">Our SIEM solution includes real-time monitoring, threat detection, log management, and automated incident response capabilities.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I upgrade my plan later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade your plan at any time. Our team will help ensure a smooth transition.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you offer custom solutions?</h3>
              <p className="text-muted-foreground">Yes, our Enterprise plan can be fully customized to meet your organization's specific security needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}