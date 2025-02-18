import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const solutionsData = {
  "real-time-analytics": {
    title: "Real-time Analytics",
    description: "Advanced threat detection and analysis platform",
    features: [
      {
        title: "Real-time Monitoring",
        icon: Activity,
        description:
          "Continuous monitoring of your security infrastructure with instant insights.",
      },
      {
        title: "Instant Alerts",
        icon: Bell,
        description:
          "Immediate notifications for potential security threats and anomalies.",
      },
      {
        title: "Log Management",
        icon: ScrollText,
        description:
          "Centralized logging system with advanced search and analysis capabilities.",
      },
      {
        title: "Custom Rules Engine",
        icon: Cog,
        description:
          "Create and customize security rules tailored to your organization's needs.",
      },
    ],
  },
  "web3-security": {
    title: "Web3 Integration",
    description: "Blockchain-powered security features",
    features: [
      {
        title: "Immutable Audit Logs",
        icon: Blocks,
        description:
          "Blockchain-based audit trails that cannot be tampered with.",
      },
      {
        title: "Decentralized Storage",
        icon: HardDrive,
        description: "Secure, distributed storage of sensitive security data.",
      },
      {
        title: "Smart Contract Security",
        icon: FileCode,
        description:
          "Advanced analysis and protection for blockchain smart contracts.",
      },
      {
        title: "Blockchain Verification",
        icon: Shield,
        description:
          "Cryptographic verification of security events and transactions.",
      },
    ],
  },
  enterprise: {
    title: "Enterprise Security",
    description: "Complete security management solution",
    features: [
      {
        title: "Role-based Access",
        icon: Users,
        description: "Granular access control and user management system.",
      },
      {
        title: "Global Threat Intel",
        icon: Globe,
        description:
          "Real-time threat intelligence from global security sources.",
      },
      {
        title: "Automated Response",
        icon: Zap,
        description: "Automated incident response and threat mitigation.",
      },
      {
        title: "Compliance Reports",
        icon: ClipboardCheck,
        description: "Automated compliance reporting and documentation.",
      },
    ],
  },
};

export default function SolutionPage({
  params,
}: {
  params: { solution: string };
}) {
  const solution = solutionsData[params.solution as keyof typeof solutionsData];

  if (!solution) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{solution.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {solution.description}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {solution.features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-6 w-6 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/contact">Request Demo</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/pricing">View Pricing</Link>
        </Button>
      </div>
    </div>
  );
}
