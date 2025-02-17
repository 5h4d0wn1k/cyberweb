"use client"

import { Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 15, 2025</p>
        </div>

        <div className="prose prose-invert mx-auto">
          <h2>Introduction</h2>
          <p>
            At Shadownik, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Usage data and analytics</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process your transactions</li>
            <li>Send you technical notices and updates</li>
            <li>Respond to your comments and questions</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Law enforcement when required by law</li>
            <li>Other parties with your consent</li>
          </ul>

          <h2>Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@shadownik.com
          </p>
        </div>
      </div>
    </div>
  )
}