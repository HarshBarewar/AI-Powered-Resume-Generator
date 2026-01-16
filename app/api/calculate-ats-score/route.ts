import { NextRequest, NextResponse } from 'next/server'
import { calculateATSScoreWithAI } from '@/lib/ats-calculator'

export async function POST(req: NextRequest) {
  try {
    const { resumeContent } = await req.json()
    
    if (!resumeContent) {
      return NextResponse.json({ error: 'Resume content is required' }, { status: 400 })
    }

    const atsScore = await calculateATSScoreWithAI(resumeContent)
    
    return NextResponse.json({ atsScore })
  } catch (error) {
    console.error('ATS calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate ATS score' }, 
      { status: 500 }
    )
  }
}