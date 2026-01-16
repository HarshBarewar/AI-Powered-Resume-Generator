"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Calculator, CheckCircle, AlertCircle } from "lucide-react"
import { useResume } from "@/contexts/resume-context"
import type { ATSScore } from "@/lib/ats-calculator"

export function ATSScoreCalculator() {
  const { resume } = useResume()
  const [score, setScore] = useState<ATSScore | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateScore = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const resumeText = resume ? JSON.stringify(resume) : `
        John Doe
        Software Engineer
        john.doe@email.com | (555) 123-4567
        
        Experience:
        - Worked at tech company
        - Developed applications
        
        Skills:
        - JavaScript, React
        
        Education:
        - Bachelor's in Computer Science
      `
      
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calculator className="w-6 h-6 text-primary" />
          ATS Score Calculator
        </h2>
        <Button 
          onClick={calculateScore} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Calculator className="w-4 h-4" />
          )}
          {loading ? 'Calculating...' : 'Calculate ATS Score'}
        </Button>
      </div>

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
          <Card className="p-6">
            <div className="text-center mb-4">
              <div className={`text-4xl font-bold ${getScoreColor(score.overall)}`}>
                {score.overall}/100
              </div>
              <p className="text-lg text-muted-foreground">{getScoreLabel(score.overall)}</p>
            </div>
            <Progress value={score.overall} className="h-3" />
          </Card>

          {/* Breakdown */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(score.breakdown).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize font-medium">{key}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(value / 25) * 100} className="w-24 h-2" />
                    <span className="text-sm font-medium w-12">{value}/25</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendations */}
          {score.recommendations.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {score.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
      
      {!loading && !score && !error && (
        <Card className="p-8 text-center">
          <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">ATS Score Analysis</h3>
          <p className="text-muted-foreground mb-4">
            Get a detailed analysis of how well your resume performs with Applicant Tracking Systems
          </p>
        </Card>
      )}
    </div>
  )
}