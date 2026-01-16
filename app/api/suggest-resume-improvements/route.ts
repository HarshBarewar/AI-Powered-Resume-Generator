import { NextRequest, NextResponse } from 'next/server'
import { getCombinedAISuggestions } from '@/lib/ai-services'

export async function POST(req: NextRequest) {
  try {
    const { resumeContent } = await req.json()
    
    if (!resumeContent) {
      return NextResponse.json({ error: 'Resume content is required' }, { status: 400 })
    }

    console.log('Analyzing resume content:', resumeContent.substring(0, 100) + '...')
    
    const suggestions = await getCombinedAISuggestions(resumeContent)
    
    console.log('Generated suggestions:', suggestions.length)
    
    return NextResponse.json({ 
      suggestions,
      message: `Generated ${suggestions.length} AI-powered suggestions for your resume`
    })
  } catch (error) {
    console.error('AI suggestion error:', error)
    return NextResponse.json(
      { error: 'Failed to generate suggestions. Please check your API keys.' }, 
      { status: 500 }
    )
  }
}
