import {
  Shield,
  BookOpen,
  Code,
  Lock,
  Cpu,
  ArrowRight,
  Globe,
  Users,
  Zap,
  BarChart,
  Network,
  Database,
  AlertCircle,
  Eye,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoDialog } from "@/components/demo-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 hero-animate overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary">
              Web3-Powered Security Solutions
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Next-Gen Security
            <br />
            Intelligence Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive cybersecurity solutions with advanced SIEM
            capabilities, powered by Web3 technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DemoDialog />
            <Button
              size="lg"
              variant="outline"
              className="text-lg glass-effect"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="glass-effect rounded-lg p-6">
              <div className="text-3xl font-bold gradient-text">1M+</div>
              <div className="text-muted-foreground">Events Monitored</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <div className="text-3xl font-bold gradient-text">99.9%</div>
              <div className="text-muted-foreground">Threat Detection</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <div className="text-3xl font-bold gradient-text">500+</div>
              <div className="text-muted-foreground">Enterprise Clients</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-muted-foreground">Active Monitoring</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">View Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/solutions">Explore Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SIEM Product Section */}
      <section className="py-24 px-4 bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              Advanced SIEM Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Next-generation security information and event management powered
              by blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <BarChart className="h-12 w-12 mb-4 text-primary animate-float" />
                <CardTitle className="text-2xl">Real-time Analytics</CardTitle>
                <CardDescription className="text-base">
                  Advanced threat detection and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <Eye className="h-4 w-4 mr-2 text-primary" />
                    Real-time Monitoring
                  </li>
                  <li className="flex items-center text-sm">
                    <AlertCircle className="h-4 w-4 mr-2 text-primary" />
                    Instant Alerts
                  </li>
                  <li className="flex items-center text-sm">
                    <Database className="h-4 w-4 mr-2 text-primary" />
                    Log Management
                  </li>
                  <li className="flex items-center text-sm">
                    <Terminal className="h-4 w-4 mr-2 text-primary" />
                    Custom Rules Engine
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <Network className="h-12 w-12 mb-4 text-primary animate-float" />
                <CardTitle className="text-2xl">Web3 Integration</CardTitle>
                <CardDescription className="text-base">
                  Blockchain-powered security features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <Lock className="h-4 w-4 mr-2 text-primary" />
                    Immutable Audit Logs
                  </li>
                  <li className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    Decentralized Storage
                  </li>
                  <li className="flex items-center text-sm">
                    <Code className="h-4 w-4 mr-2 text-primary" />
                    Smart Contract Security
                  </li>
                  <li className="flex items-center text-sm">
                    <Cpu className="h-4 w-4 mr-2 text-primary" />
                    Blockchain Verification
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Explore Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <Shield className="h-12 w-12 mb-4 text-primary animate-float" />
                <CardTitle className="text-2xl">Enterprise Security</CardTitle>
                <CardDescription className="text-base">
                  Complete security management solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Role-based Access
                  </li>
                  <li className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    Global Threat Intel
                  </li>
                  <li className="flex items-center text-sm">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Automated Response
                  </li>
                  <li className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    Compliance Reports
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  View Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* SIEM Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <div className="glass-effect rounded-xl p-8 card-hover">
              <Eye className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Threat Detection</h3>
              <p className="text-muted-foreground">
                Advanced AI-powered threat detection with real-time monitoring
                and analysis
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 card-hover">
              <AlertCircle className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Incident Response</h3>
              <p className="text-muted-foreground">
                Automated incident response with customizable playbooks and
                workflows
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 card-hover">
              <Database className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Log Management</h3>
              <p className="text-muted-foreground">
                Centralized log collection and analysis with blockchain
                verification
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 card-hover">
              <Terminal className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Rules</h3>
              <p className="text-muted-foreground">
                Flexible rule engine for creating custom detection and response
                rules
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 card-hover">
              <Network className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Network Monitoring</h3>
              <p className="text-muted-foreground">
                Complete network visibility with deep packet inspection
              </p>
            </div>

            <div className="glass-effect rounded-xl p-8 card-hover">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compliance</h3>
              <p className="text-muted-foreground">
                Built-in compliance reporting for major regulatory frameworks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
              Comprehensive Security Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end cybersecurity solutions for modern enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-hover">
              <CardHeader>
                <Shield className="h-12 w-12 mb-4 text-primary animate-float" />
                <CardTitle className="text-2xl">Security Audits</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive security assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <Lock className="h-4 w-4 mr-2 text-primary" />
                    Infrastructure Assessment
                  </li>
                  <li className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    Vulnerability Scanning
                  </li>
                  <li className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    Penetration Testing
                  </li>
                  <li className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Risk Analysis
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <Code className="h-12 w-12 mb-4 text-primary animate-float" />
                <CardTitle className="text-2xl">Web3 Security</CardTitle>
                <CardDescription className="text-base">
                  Blockchain and smart contract security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
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
                  <li className="flex items-center text-sm">
                    <Zap className="h-4 w-4 mr-2 text-primary" />
                    Crypto Asset Security
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <BookOpen className="h-12 w-12 mb-4 text-primary animate-float" />
                <CardTitle className="text-2xl">Training & Education</CardTitle>
                <CardDescription className="text-base">
                  Security awareness and certification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Security Awareness
                  </li>
                  <li className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    Certification Programs
                  </li>
                  <li className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-primary" />
                    Workshops & Seminars
                  </li>
                  <li className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    Custom Training
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="glass-effect rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ready to Transform Your Security?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the next generation of cybersecurity with our SIEM
              platform and comprehensive services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link href="/contact">
                  Schedule a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
