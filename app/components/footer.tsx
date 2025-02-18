import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products#siem"
                  className="text-muted-foreground hover:text-primary"
                >
                  SIEM Platform
                </Link>
              </li>
              <li>
                <Link
                  href="/products#threat-hunter"
                  className="text-muted-foreground hover:text-primary"
                >
                  Threat Hunter
                </Link>
              </li>
              <li>
                <Link
                  href="/products#blockchain-guard"
                  className="text-muted-foreground hover:text-primary"
                >
                  Blockchain Guard
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/siem/download"
                  className="text-muted-foreground hover:text-primary"
                >
                  Download Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/solutions/real-time-analytics"
                  className="text-muted-foreground hover:text-primary"
                >
                  Real-time Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/web3-security"
                  className="text-muted-foreground hover:text-primary"
                >
                  Web3 Security
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/enterprise"
                  className="text-muted-foreground hover:text-primary"
                >
                  Enterprise
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-muted-foreground hover:text-primary"
                >
                  View All
                </Link>
              </li>
            </ul>
          </div>

          {/* ... rest of the footer sections */}
        </div>
      </div>
    </footer>
  );
}
