import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Shadownik</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Leading provider of cybersecurity solutions and education.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services/security-audit">Security Audits</Link></li>
              <li><Link href="/services/web3-security">Web3 Security</Link></li>
              <li><Link href="/services/incident-response">Incident Response</Link></li>
              <li><Link href="/services/training">Training</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/security">Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shadownik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}