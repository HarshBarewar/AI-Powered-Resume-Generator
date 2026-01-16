"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { Plus, FileText, Download, Sparkles, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { ResumeCard } from "@/components/resume/resume-card"
import { getAllResumes, deleteResume, type ResumeData } from "@/lib/resume-storage"
import { AuthenticatedFooter } from "@/components/authenticated-footer"
import { ThemeToggle } from "@/components/theme-toggle"

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const router = useRouter()
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const savedResumes = getAllResumes()
    setResumes(savedResumes)
    setIsLoading(false)
  }, [])

  const handleNewResume = () => {
    router.push("/resume/create")
  }

  const handleDeleteResume = (id: string) => {
    if (deleteResume(id)) {
      setResumes(resumes.filter((r) => r.id !== id))
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-2xl font-bold text-foreground">ResumeAI</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/ai-suggestions")}
              variant="outline"
              className="text-foreground border-border hover:bg-muted bg-transparent flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              AI Optimizer
            </Button>
            <ThemeToggle />
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-foreground border-border hover:bg-muted bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">My Resumes</h2>
          <p className="text-muted-foreground text-lg">Manage and customize your professional resumes</p>
        </div>

        {/* Create New Resume Button */}
        <div className="mb-12">
          <Button
            onClick={handleNewResume}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-12 px-6 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Resume
          </Button>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <Card className="col-span-full flex items-center justify-center py-16 border border-border">
              <p className="text-muted-foreground">Loading resumes...</p>
            </Card>
          ) : resumes.length === 0 ? (
            <Card className="col-span-full flex flex-col items-center justify-center py-16 border border-border text-center">
              <FileText className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first resume to get started with AI-powered enhancements
              </p>
              <Button
                onClick={handleNewResume}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create First Resume
              </Button>
            </Card>
          ) : (
            resumes.map((resume) => <ResumeCard key={resume.id} resume={resume} onDelete={handleDeleteResume} />)
          )}
        </div>

        {/* Features Section */}
        {resumes.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border border-border hover:shadow-lg transition-shadow">
              <Sparkles className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">AI-Powered Content</h3>
              <p className="text-sm text-muted-foreground">
                Get intelligent suggestions to enhance your resume with compelling bullet points
              </p>
            </Card>

            <Card className="p-6 border border-border hover:shadow-lg transition-shadow">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Multiple Templates</h3>
              <p className="text-sm text-muted-foreground">
                Choose from professionally designed templates to match your style
              </p>
            </Card>

            <Card className="p-6 border border-border hover:shadow-lg transition-shadow">
              <Download className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Easy Export</h3>
              <p className="text-sm text-muted-foreground">
                Download your resume as PDF or other formats for immediate use
              </p>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <AuthenticatedFooter />
    </main>
  )
}
