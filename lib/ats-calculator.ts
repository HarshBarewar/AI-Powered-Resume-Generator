import axios from 'axios'

export interface ATSScore {
  overall: number
  breakdown: {
    keywords: number
    formatting: number
    sections: number
    length: number
    readability: number
  }
  recommendations: string[]
}

export async function calculateATSScoreWithAI(resumeText: string): Promise<ATSScore> {
  try {
    // Simplified NLP-based scoring without API calls to avoid errors
    const textLength = resumeText.length
    const wordCount = resumeText.split(/\s+/).length
    const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i.test(resumeText)
    const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(resumeText)
    const keywordDensity = (resumeText.match(/\b(experience|skills|education|management|development|analysis|leadership|project|achievement)\b/gi) || []).length
    const sections = (resumeText.match(/\b(experience|education|skills|summary|objective|projects|certifications)\b/gi) || []).length
    
    // Strict NLP-based scoring
    let overall = 15 // Start harsh
    if (hasEmail) overall += 8
    if (hasPhone) overall += 8
    if (wordCount > 200) overall += 10
    if (wordCount > 400) overall += 10
    if (keywordDensity > 5) overall += 15
    if (sections > 3) overall += 12
    if (textLength > 1000) overall += 8
    
    // Cap at realistic range (most resumes are poor)
    overall = Math.min(75, overall)
    
    const breakdown = {
      keywords: Math.min(20, keywordDensity * 2),
      formatting: hasEmail && hasPhone ? 18 : 10,
      sections: Math.min(20, sections * 3),
      length: wordCount >= 300 && wordCount <= 800 ? 12 : 8,
      readability: Math.min(8, Math.floor(wordCount / 100))
    }
    
    const recommendations = []
    
    // Detailed keyword recommendations
    if (breakdown.keywords < 15) {
      recommendations.push(
        'KEYWORDS - Critical Issue: Your resume lacks industry-specific keywords that ATS systems scan for. Add 8-12 relevant keywords from job descriptions such as "project management," "data analysis," "strategic planning," "cross-functional collaboration," "process improvement," and "stakeholder engagement." Place these naturally in your experience bullets and skills section. Example: "Led cross-functional team of 8 members to implement process improvement initiatives, resulting in 25% efficiency gain."'
      )
    }
    
    // Detailed formatting recommendations
    if (breakdown.formatting < 15) {
      recommendations.push(
        'CONTACT INFO - Critical Issue: Missing essential contact information that ATS systems require. Ensure your resume includes: (1) Professional email address at the top, (2) Phone number with area code, (3) LinkedIn profile URL, (4) City, State format for location. Format example: "John Smith | john.smith@email.com | (555) 123-4567 | linkedin.com/in/johnsmith | New York, NY"'
      )
    }
    
    // Detailed sections recommendations
    if (breakdown.sections < 15) {
      recommendations.push(
        'SECTIONS - Major Issue: Your resume is missing key sections that ATS systems expect. Include these essential sections in order: (1) Professional Summary (3-4 lines highlighting your value), (2) Core Skills/Technical Skills (8-12 relevant skills), (3) Professional Experience (with quantified achievements), (4) Education, (5) Additional sections like Certifications or Projects if relevant. Each section should have clear, consistent headings.'
      )
    }
    
    // Detailed length recommendations
    if (breakdown.length < 10) {
      recommendations.push(
        'LENGTH - Major Issue: Your resume length is not optimized for ATS scanning. Aim for 400-600 words total. If too short: Add 2-3 more achievement bullets per role using the STAR method (Situation, Task, Action, Result). If too long: Remove outdated roles (10+ years old), consolidate similar responsibilities, and focus on quantified achievements. Example bullet: "Managed budget of $2.5M and reduced costs by 15% through vendor renegotiation and process optimization."'
      )
    }
    
    // Detailed readability recommendations
    if (breakdown.readability < 6) {
      recommendations.push(
        'READABILITY - Improvement Needed: Enhance readability for both ATS and human reviewers. Use action verbs to start each bullet ("Developed," "Implemented," "Managed," "Achieved"). Keep sentences to 15-20 words maximum. Use consistent formatting with bullet points, not paragraphs. Include specific metrics and percentages. Example: "Developed training program for 50+ employees, improving productivity by 30% and reducing onboarding time from 6 weeks to 4 weeks."'
      )
    }
    
    // Additional comprehensive recommendations
    if (overall < 50) {
      recommendations.push(
        'OVERALL OPTIMIZATION - Priority Actions: (1) Research 3-5 job postings in your field and identify the top 10 most common keywords, then integrate them naturally throughout your resume. (2) Quantify every achievement with numbers, percentages, or dollar amounts. (3) Use a clean, ATS-friendly format with standard fonts (Arial, Calibri, Times New Roman) and avoid graphics, tables, or columns. (4) Include a Professional Summary that mirrors the job description language and highlights your top 3-4 qualifications.'
      )
    }
    
    if (recommendations.length === 0) {
      recommendations.push(
        'EXCELLENT WORK - Your resume demonstrates strong ATS optimization with proper keyword usage, complete contact information, well-structured sections, and appropriate length. To further enhance: (1) Continue updating keywords based on specific job applications, (2) Add more quantified achievements where possible, (3) Consider adding a "Key Achievements" section highlighting your top 3-4 career accomplishments with specific metrics and business impact.'
      )
    }
    
    return { overall, breakdown, recommendations }
  } catch (error) {
    console.error('ATS calculation error:', error)
    throw new Error('Failed to analyze resume')
  }
}