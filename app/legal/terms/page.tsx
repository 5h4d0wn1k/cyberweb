"use client"

import { Shield } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: March 15, 2025</p>
        </div>

        <div className="prose prose-invert mx-auto">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Shadownik's services, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Services</h2>
          <p>
            Shadownik provides cybersecurity services, including but not limited to:
          </p>
          <ul>
            <li>Security Information and Event Management (SIEM)</li>
            <li>Web3 Security Solutions</li>
            <li>Security Training and Education</li>
            <li>Incident Response Services</li>
          </ul>

          <h2>3. User Responsibilities</h2>
          <p>
            You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Ensuring your use of the services complies with all applicable laws</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our services are owned by Shadownik and are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            Shadownik shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our services.
          </p>

          <h2>7. Contact</h2>
          <p>
            For questions about these Terms of Service, please contact us at legal@shadownik.com
          </p>
        </div>
      </div>
    </div>
  )
}