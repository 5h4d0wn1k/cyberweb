"use client"

import { Shield, Lock, FileCheck, Bell } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Security Policy</h1>
          <p className="text-muted-foreground">Last updated: March 15, 2025</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            <div className="glass-effect rounded-xl p-8">
              <Lock className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>End-to-end encryption for all data in transit</li>
                <li>Regular security audits and penetration testing</li>
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Regular backup procedures</li>
              </ul>
            </div>

            <div className="glass-effect rounded-xl p-8">
              <FileCheck className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">Compliance</h2>
              <p className="text-muted-foreground">
                Our security practices comply with major security standards:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>ISO 27001 certified</li>
                <li>GDPR compliant</li>
                <li>SOC 2 Type II certified</li>
                <li>HIPAA compliant</li>
              </ul>
            </div>

            <div className="glass-effect rounded-xl p-8">
              <Bell className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">Incident Response</h2>
              <p className="text-muted-foreground">
                Our incident response procedures include:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>24/7 security monitoring</li>
                <li>Automated threat detection</li>
                <li>Rapid response team</li>
                <li>Regular incident response drills</li>
              </ul>
            </div>

            <div className="glass-effect rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Reporting Security Issues</h2>
              <p className="text-muted-foreground">
                If you discover a security vulnerability, please report it to:
              </p>
              <p className="mt-4 font-mono bg-muted p-2 rounded">
                security@shadownik.com
              </p>
              <p className="mt-4 text-muted-foreground">
                We appreciate your help in keeping our platform secure and will respond to all legitimate reports within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}