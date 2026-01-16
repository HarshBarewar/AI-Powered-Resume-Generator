"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, AlertCircle, CheckCircle, Info } from "lucide-react"
import { useResume } from "@/contexts/resume-context"
import type { AISuggestion } from "@/lib/ai-services"

export function AISuggestionsList() {
  const { resume } = useResume()
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSuggestions = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Get resume data from context or create sample data
      const resumeText = resume ? JSON.stringify(resume) : `
        John Doe
        Software Engineer
        
        Experience:
        - Worked at tech company
        - Developed applications
        - Collaborated with team
        
        Skills:
        - JavaScript, React, Node.js
        - Problem solving
        - Communication
        
        Education:
        - Bachelor's in Computer Science
      `
      
      console.log('Sending resume for analysis...')
      
      const response = await fetch('/api/suggest-resume-improvements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeContent: resumeText })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate suggestions')
      }
      
      const data = await response.json()
      console.log('Received suggestions:', data)
      
      setSuggestions(data.suggestions || [])
    } catch (err) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />
      default: return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Suggestions
        </h2>
        <Button 
          onClick={generateSuggestions} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loading ? 'Analyzing...' : 'Get AI Suggestions'}
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

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Found {suggestions.length} suggestions to improve your resume
          </p>
          
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getPriorityIcon(suggestion.priority)}
                  <Badge variant={getPriorityColor(suggestion.priority) as any}>
                    {suggestion.priority.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">{suggestion.section}</Badge>
                </div>
                <Badge variant="secondary">{suggestion.type}</Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Current:</h4>
                  <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800 p-2 rounded">
                    {suggestion.original}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Suggested:</h4>
                  <p className="text-sm text-foreground bg-green-50 dark:bg-green-950 p-2 rounded border border-green-200 dark:border-green-800">
                    {suggestion.suggested}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Why:</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {!loading && suggestions.length === 0 && !error && (
        <Card className="p-8 text-center">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready for AI Analysis</h3>
          <p className="text-muted-foreground mb-4">
            Click "Get AI Suggestions" to analyze your resume with Hugging Face and OpenRouter AI
          </p>
        </Card>
      )}
    </div>
  )
}
