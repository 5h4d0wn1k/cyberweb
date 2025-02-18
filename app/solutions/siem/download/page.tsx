"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download,
  Github,
  Terminal,
  Shield,
  Server,
  Database,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function SIEMDownloadPage() {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      window.location.href =
        "https://github.com/shadownik-official/SIEM/releases/latest";
      toast({
        title: "Download Started",
        description: "Your download should begin shortly.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Please try again or contact support.",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Download Shadownik SIEM</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get started with our advanced SIEM platform powered by blockchain
          technology
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Enterprise Edition
            </CardTitle>
            <CardDescription>Full-featured SIEM solution</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Server className="h-4 w-4 text-primary" />
                <span>Advanced threat detection</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                <span>Blockchain verification</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span>Command-line tools</span>
              </li>
            </ul>
            <Button
              className="w-full"
              onClick={handleDownload}
              disabled={downloading}
            >
              <Download className="mr-2 h-4 w-4" />
              {downloading ? "Starting Download..." : "Download Latest Release"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5 text-primary" />
              Source Code
            </CardTitle>
            <CardDescription>Open source version</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span>Build from source</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Community support</span>
              </li>
              <li className="flex items-center gap-2">
                <Server className="h-4 w-4 text-primary" />
                <span>Core features</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" asChild>
              <Link
                href="https://github.com/shadownik-official/SIEM"
                target="_blank"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Docker Image
            </CardTitle>
            <CardDescription>Containerized deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg mb-6 font-mono text-sm">
              docker pull shadownik/siem:latest
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(
                  "docker pull shadownik/siem:latest",
                );
                toast({
                  title: "Copied to clipboard",
                  description: "Docker command copied successfully",
                });
              }}
            >
              <Terminal className="mr-2 h-4 w-4" />
              Copy Docker Command
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Need help with installation or deployment?
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/docs/siem/installation">View Documentation</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
