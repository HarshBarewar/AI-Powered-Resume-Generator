"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, FileText, Zap, Shield } from "lucide-react"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showAuth, setShowAuth] = useState(false)

  if (showAuth) {
    return (
      <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex bg-primary text-primary-foreground flex-col justify-between p-12">
          <Logo />
          <div>
            <h2 className="text-4xl font-bold mb-4">ResumeAI</h2>
            <p className="text-lg opacity-90">
              Create professional resumes with AI-powered content enhancement using Hugging Face and OpenRouter APIs.
            </p>
          </div>
          <p className="text-sm opacity-75">© 2025 ResumeAI. All rights reserved.</p>
        </div>

        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="md:hidden mb-8 text-center">
              <Logo className="mb-4" />
              <h2 className="text-3xl font-bold text-primary">ResumeAI</h2>
            </div>

            {isLogin ? (
              <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
            )}
            
            <Button 
              variant="ghost" 
              onClick={() => setShowAuth(false)}
              className="w-full mt-4"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            AI-Powered Resume Generator
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create professional resumes with AI suggestions from Hugging Face and OpenRouter. 
            Choose from multiple templates with light/dark mode support.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => setShowAuth(true)}>
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
            <p className="text-muted-foreground">
              Get intelligent recommendations from Hugging Face and OpenRouter APIs to improve your resume content.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multiple Templates</h3>
            <p className="text-muted-foreground">
              Choose from 6 professional templates: Modern, Classic, Minimal, Creative, Tech, and Executive.
            </p>
          </Card>
          
          <Card className="p-6 text-center">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Light & Dark Mode</h3>
            <p className="text-muted-foreground">
              Seamless theme switching with system preference detection for optimal user experience.
            </p>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Powered by Advanced AI</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Card className="p-4">
              <p className="font-semibold">Hugging Face API</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">OpenRouter API</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">React.js</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">Next.js</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">Tailwind CSS</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
