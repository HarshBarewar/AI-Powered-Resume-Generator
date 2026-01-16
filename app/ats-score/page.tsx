"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { AuthenticatedHeader } from "@/components/authenticated-header"
import { AuthenticatedFooter } from "@/components/authenticated-footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Calculator, CheckCircle, AlertCircle } from "lucide-react"
import { getAllResumes, type ResumeData } from "@/lib/resume-storage"
import type { ATSScore } from "@/lib/ats-calculator"

export default function ATSScorePage() {
  const [resumes, setResumes] = useState<ResumeData[]>([])
  const [selectedResumeId, setSelectedResumeId] = useState<string>("")
  const [score, setScore] = useState<ATSScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setResumes(getAllResumes())
    
    // Auto-select resume from URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const resumeId = urlParams.get('resumeId')
    if (resumeId) {
      setSelectedResumeId(resumeId)
    }
  }, [])

  const calculateScore = async () => {
    if (!selectedResumeId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const selectedResume = resumes.find(r => r.id === selectedResumeId)
      if (!selectedResume) throw new Error('Resume not found')
      
      const resumeText = JSON.stringify(selectedResume.data)
      
      const response = await fetch('/api/calculate-ats-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeContent: resumeText })
      })
      
      if (!response.ok) throw new Error('Failed to calculate ATS score')
      
      const data = await response.json()
      setScore(data.atsScore)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">ATS Score Calculator</h1>
            <p className="text-muted-foreground">
              Get AI-powered analysis of your resume's compatibility with Applicant Tracking Systems
            </p>
          </div>

          {/* Resume Selection */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Select Resume to Analyze</h2>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Select value={selectedResumeId} onValueChange={setSelectedResumeId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a resume to analyze" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={calculateScore} 
                disabled={loading || !selectedResumeId}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Calculator className="w-4 h-4" />
                )}
                {loading ? 'Analyzing...' : 'Calculate Score'}
              </Button>
            </div>
          </Card>

          {error && (
            <Card className="p-4 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
              <p className="text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            </Card>
          )}

          {score && (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card className="p-8 text-center">
                <div className={`text-6xl font-bold ${getScoreColor(score.overall)} mb-2`}>
                  {score.overall}
                </div>
                <div className="text-2xl text-muted-foreground mb-4">{getScoreLabel(score.overall)}</div>
                <Progress value={score.overall} className="h-4 max-w-md mx-auto" />
              </Card>

              {/* Breakdown */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Detailed Breakdown</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(score.breakdown).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium">{key}</span>
                        <span className="font-bold">{value}/25</span>
                      </div>
                      <Progress value={(value / 25) * 100} className="h-3" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* AI Recommendations */}
              {score.recommendations.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                    AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    {score.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          )}

          {resumes.length === 0 && (
            <Card className="p-8 text-center">
              <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Resumes Found</h3>
              <p className="text-muted-foreground">
                Create a resume first to calculate its ATS score
              </p>
            </Card>
          )}
        </div>
      </main>
      
      <AuthenticatedFooter />
    </div>
  )
}