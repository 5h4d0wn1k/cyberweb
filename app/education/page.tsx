<h3 className="text-2xl font-bold gradient-text">{session.user.profile.points}</h3>
                <p className="text-muted-foreground">Total Points</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold gradient-text">{session.user.profile.rank}</h3>
                <p className="text-muted-foreground">Current Rank</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold gradient-text">0%</h3>
                <p className="text-muted-foreground">Course Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Learning Paths</h2>
          <Tabs defaultValue="offensive" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-4">
              <TabsTrigger value="offensive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shield className="mr-2 h-4 w-4" />
                Offensive Security
              </TabsTrigger>
              <TabsTrigger value="defensive" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Lock className="mr-2 h-4 w-4" />
                Defensive Security
              </TabsTrigger>
              <TabsTrigger value="web3" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Code className="mr-2 h-4 w-4" />
                Web3 Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="offensive" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Terminal className="h-5 w-5 mr-2 text-primary" />
                      Web Penetration Testing
                    </CardTitle>
                    <Progress value={33} className="h-2" />
                    <CardDescription>33% Complete</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        OWASP Top 10
                      </li>
                      <li className="flex items-center text-sm">
                        <Server className="h-4 w-4 mr-2 text-primary" />
                        Web App Architecture
                      </li>
                      <li className="flex items-center text-sm">
                        <Code className="h-4 w-4 mr-2 text-primary" />
                        Exploitation Techniques
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/web-penetration-testing">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Network className="h-5 w-5 mr-2 text-primary" />
                      Network Penetration
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Server className="h-4 w-4 mr-2 text-primary" />
                        Network Fundamentals
                      </li>
                      <li className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        Attack Methodologies
                      </li>
                      <li className="flex items-center text-sm">
                        <Lock className="h-4 w-4 mr-2 text-primary" />
                        Post Exploitation
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/network-penetration">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      Reverse Engineering
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Cpu className="h-4 w-4 mr-2 text-primary" />
                        Assembly Basics
                      </li>
                      <li className="flex items-center text-sm">
                        <Code className="h-4 w-4 mr-2 text-primary" />
                        Binary Analysis
                      </li>
                      <li className="flex items-center text-sm">
                        <Terminal className="h-4 w-4 mr-2 text-primary" />
                        Malware Analysis
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/reverse-engineering">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="defensive" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Incident Response
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Threat Detection
                      </li>
                      <li className="flex items-center text-sm">
                        <Server className="h-4 w-4 mr-2 text-primary" />
                        Incident Analysis
                      </li>
                      <li className="flex items-center text-sm">
                        <Code className="h-4 w-4 mr-2 text-primary" />
                        Response Strategies
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/incident-response">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-primary" />
                      Security Operations
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        SIEM Management
                      </li>
                      <li className="flex items-center text-sm">
                        <Terminal className="h-4 w-4 mr-2 text-primary" />
                        Log Analysis
                      </li>
                      <li className="flex items-center text-sm">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Threat Hunting
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/security-operations">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Network className="h-5 w-5 mr-2 text-primary" />
                      Network Defense
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Lock className="h-4 w-4 mr-2 text-primary" />
                        Network Security
                      </li>
                      <li className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        Firewall Management
                      </li>
                      <li className="flex items-center text-sm">
                        <Server className="h-4 w-4 mr-2 text-primary" />
                        IDS/IPS Systems
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/network-defense">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="web3" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 mr-2 text-primary" />
                      Smart Contract Security
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Terminal className="h-4 w-4 mr-2 text-primary" />
                        Solidity Basics
                      </li>
                      <li className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        Common Vulnerabilities
                      </li>
                      <li className="flex items-center text-sm">
                        <Code className="h-4 w-4 mr-2 text-primary" />
                        Auditing Techniques
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/smart-contract-security">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-primary" />
                      DeFi Security
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Lock className="h-4 w-4 mr-2 text-primary" />
                        DeFi Protocols
                      </li>
                      <li className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        Attack Vectors
                      </li>
                      <li className="flex items-center text-sm">
                        <Code className="h-4 w-4 mr-2 text-primary" />
                        Security Best Practices
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/defi-security">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      Blockchain Security
                    </CardTitle>
                    <Progress value={0} className="h-2" />
                    <CardDescription>Not Started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center text-sm">
                        <Network className="h-4 w-4 mr-2 text-primary" />
                        Consensus Mechanisms
                      </li>
                      <li className="flex items-center text-sm">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        Network Security
                      </li>
                      <li className="flex items-center text-sm">
                        <Lock className="h-4 w-4 mr-2 text-primary" />
                        Cryptography
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/education/courses/blockchain-security">
                        Start Path
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect rounded-xl p-8">
            <Terminal className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Labs</h3>
            <p className="text-muted-foreground">
              Practice in real-world environments with our browser-based virtual labs
            </p>
          </div>
          
          <div className="glass-effect rounded-xl p-8">
            <Target className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Guided Challenges</h3>
            <p className="text-muted-foreground">
              Progress through increasingly difficult challenges to test your skills
            </p>
          </div>
          
          <div className="glass-effect rounded-xl p-8">
            <Award className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Certifications</h3>
            <p className="text-muted-foreground">
              Earn industry-recognized certifications as you complete learning paths
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-2xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Ready to Start Your Security Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of security professionals and begin your learning journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link href="/auth/register">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <Link href="/pricing">View Enterprise Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}