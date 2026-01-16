"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getAllResumes, getResumeById, type ResumeData } from "@/lib/resume-storage"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { AISuggestionsList } from "@/components/ai/ai-suggestions-list"
import { AuthenticatedFooter } from "@/components/authenticated-footer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AISuggestionsPage() {
  const router = useRouter()
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [selectedResumeId, setSelectedResumeId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const allResumes = getAllResumes()
    setResumes(allResumes)
    if (allResumes.length > 0) {
      setSelectedResumeId(allResumes[0].id)
    }
  }, [])

  const selectedResume = selectedResumeId ? getResumeById(selectedResumeId) : null

  const formatResumeContent = (resume: ResumeData): string => {
    const { data } = resume
    const lines = []

    lines.push(`RESUME: ${resume.title}`)
    lines.push("")

    lines.push("PERSONAL INFORMATION")
    lines.push(`Name: ${data.personal.fullName}`)
    lines.push(`Email: ${data.personal.email}`)
    lines.push(`Phone: ${data.personal.mobile}`)
    lines.push(`Address: ${data.personal.address}`)
    lines.push(`About: ${data.personal.about}`)
    lines.push("")

    if (data.experience.length > 0) {
      lines.push("EXPERIENCE")
      data.experience.forEach((exp) => {
        lines.push(`${exp.position} at ${exp.company}`)
        lines.push(`${exp.startDate} - ${exp.endDate}`)
        lines.push(`${exp.description}`)
        lines.push("")
      })
    }

    if (data.education.length > 0) {
      lines.push("EDUCATION")
      data.education.forEach((edu) => {
        lines.push(`${edu.degree} in ${edu.field}`)
        lines.push(`${edu.institution} - ${edu.graduationDate}`)
        lines.push(`${edu.details}`)
        lines.push("")
      })
    }

    if (data.skills.length > 0) {
      lines.push("SKILLS")
      data.skills.forEach((skill) => {
        lines.push(`${skill.category}: ${skill.skills}`)
      })
      lines.push("")
    }

    if (data.projects.length > 0) {
      lines.push("PROJECTS")
      data.projects.forEach((proj) => {
        lines.push(`${proj.title}`)
        lines.push(`${proj.description}`)
        lines.push(`Technologies: ${proj.technologies}`)
        lines.push("")
      })
    }

    if (data.certifications.length > 0) {
      lines.push("CERTIFICATIONS")
      data.certifications.forEach((cert) => {
        lines.push(`${cert.name} - ${cert.issuer} (${cert.date})`)
      })
      lines.push("")
    }

    if (data.achievements.length > 0) {
      lines.push("ACHIEVEMENTS")
      data.achievements.forEach((ach) => {
        lines.push(`${ach.title}: ${ach.description}`)
      })
    }

    return lines.join("\n")
  }

  const handleAnalyze = async () => {
    if (!selectedResume) return
    setLoading(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Resume Optimizer</h1>
                <p className="text-sm text-muted-foreground">Get ATS-friendly suggestions for your resume</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Powered by AI</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Resume Selection */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Select Resume</h2>

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-left text-sm font-medium text-foreground hover:bg-muted/80 transition flex items-center justify-between"
                >
                  <span className="truncate">{selectedResume ? selectedResume.title : "No resumes"}</span>
                  {showDropdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
                    {resumes.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">No resumes found</div>
                    ) : (
                      resumes.map((resume) => (
                        <button
                          key={resume.id}
                          onClick={() => {
                            setSelectedResumeId(resume.id)
                            setShowDropdown(false)
                          }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-muted border-b border-border last:border-b-0 transition ${
                            selectedResumeId === resume.id
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {resume.title}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {selectedResume && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(selectedResume.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              <Button
                onClick={handleAnalyze}
                disabled={!selectedResume || loading}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? "Analyzing..." : "Analyze with AI"}
              </Button>
            </Card>
          </div>

          {/* Main Content - Suggestions */}
          <div className="lg:col-span-2">
            {selectedResume ? (
              <AISuggestionsList resume={selectedResume} resumeContent={formatResumeContent(selectedResume)} />
            ) : (
              <Card className="p-12 text-center border border-border">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Resume Selected</h3>
                <p className="text-muted-foreground">Select a resume from the sidebar to get AI-powered suggestions</p>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <AuthenticatedFooter />
    </div>
  )
}
