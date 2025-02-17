import { ContactForm } from "@/components/contact-form"
import { Shield, Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team for any inquiries about our services or to discuss your security needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contact@shadownik.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>123 Security Street, Cyber City, CC 12345</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Office Hours</h2>
              <div className="space-y-2">
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p>Saturday - Sunday: Closed</p>
                <p className="text-primary">24/7 Emergency Support Available</p>
              </div>
            </div>

            <div className="p-6 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Security First</h3>
              </div>
              <p className="text-muted-foreground">
                Your security is our top priority. All communications are encrypted and handled with the utmost confidentiality.
              </p>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}