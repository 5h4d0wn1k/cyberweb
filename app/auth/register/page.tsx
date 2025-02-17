"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { createClient } from '@supabase/supabase-js';
import { signIn } from 'next-auth/react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('users_profiles')
        .insert([{ username, password }]);

      if (error) {
        throw error;
      } else {
        const result = await signIn('credentials', {
          redirect: false,
          username,
          password
        });
        if (result?.error) {
          throw new Error(result.error);
        } else {
          toast({
            title: "Account created",
            description: "Please check your email to verify your account",
          })
          router.push("/auth/login")
        }
      }
    } catch (error) {
      console.error('Registration failed:', error)
      if (error instanceof Error) {
        setError(error.message || "Failed to create account. Please try again.")
      } else {
        setError("Failed to create account. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">Join our security community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="username"
              placeholder="Username"
              required
              minLength={3}
              maxLength={20}
              pattern="^[a-zA-Z0-9_-]+$"
              title="Username can only contain letters, numbers, underscores, and hyphens"
              className="w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full"
            />
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}