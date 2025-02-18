"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lock, Search, Zap, Download } from "lucide-react";

const products = [
  {
    id: "siem",
    title: "Advanced SIEM Platform",
    description:
      "Next-generation security information and event management powered by blockchain",
    icon: Shield,
    features: [
      "Real-time threat detection",
      "Blockchain-based verification",
      "Automated incident response",
      "Advanced analytics dashboard",
    ],
    downloadLink: "/solutions/siem/download",
    learnMoreLink: "/solutions/siem",
  },
  {
    id: "threat-hunter",
    title: "Threat Hunter Pro",
    description:
      "Advanced threat hunting and vulnerability assessment platform",
    icon: Search,
    features: [
      "Automated vulnerability scanning",
      "Zero-day threat detection",
      "Custom rule creation",
      "Integration with SIEM",
    ],
    learnMoreLink: "/solutions/real-time-analytics",
  },
  {
    id: "blockchain-guard",
    title: "Blockchain Guard",
    description: "Comprehensive Web3 and smart contract security solution",
    icon: Lock,
    features: [
      "Smart contract auditing",
      "Real-time blockchain monitoring",
      "DeFi protection",
      "Cross-chain security",
    ],
    learnMoreLink: "/solutions/web3-security",
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Cybersecurity Products</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Industry-leading security solutions powered by advanced technology and
          blockchain integration
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#products">View Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Request Demo</Link>
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div id="products" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{product.title}</CardTitle>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-2 mb-6 flex-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <Button asChild className="w-full">
                    <Link href={product.learnMoreLink}>Learn More</Link>
                  </Button>
                  {product.downloadLink && (
                    <Button asChild variant="outline" className="w-full">
                      <Link href={product.downloadLink}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enterprise Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Looking for customized security solutions for your organization?
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Contact Sales</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/solutions/enterprise">Enterprise Features</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
