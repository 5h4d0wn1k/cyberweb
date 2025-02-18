import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Shield,
  Bell,
  ScrollText,
  Cog,
  Blocks,
  HardDrive,
  FileCode,
  Users,
  Globe,
  Zap,
  ClipboardCheck,
} from "lucide-react";

const solutions = [
  {
    title: "Real-time Analytics",
    description: "Advanced threat detection and analysis platform",
    features: [
      { name: "Real-time Monitoring", icon: Activity },
      { name: "Instant Alerts", icon: Bell },
      { name: "Log Management", icon: ScrollText },
      { name: "Custom Rules Engine", icon: Cog },
    ],
    link: "/solutions/real-time-analytics",
  },
  {
    title: "Web3 Integration",
    description: "Blockchain-powered security features",
    features: [
      { name: "Immutable Audit Logs", icon: Blocks },
      { name: "Decentralized Storage", icon: HardDrive },
      { name: "Smart Contract Security", icon: FileCode },
      { name: "Blockchain Verification", icon: Shield },
    ],
    link: "/solutions/web3-security",
  },
  {
    title: "Enterprise Security",
    description: "Complete security management solution",
    features: [
      { name: "Role-based Access", icon: Users },
      { name: "Global Threat Intel", icon: Globe },
      { name: "Automated Response", icon: Zap },
      { name: "Compliance Reports", icon: ClipboardCheck },
    ],
    link: "/solutions/enterprise",
  },
];

export default function SolutionsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Security Solutions</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive security solutions for modern challenges
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution) => (
          <Card key={solution.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{solution.title}</CardTitle>
              <CardDescription>{solution.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {solution.features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.name}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href={solution.link}>Learn More</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`${solution.link}/features`}>
                    Explore Features
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/contact">Schedule a Demo</Link>
        </Button>
      </div>
    </div>
  );
}
