"use client"

import { useResume } from "@/contexts/resume-context"
import { Card } from "@/components/ui/card"

export function ResumePreview() {
  const { customization } = useResume()

  if (!customization) {
    return <div>Loading...</div>
  }

  return (
    <Card className="p-8 bg-white min-h-[800px]" style={{ fontFamily: customization.fontFamily }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-6">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: customization.headingColor }}
          >
            John Doe
          </h1>
          <p 
            className="text-lg"
            style={{ color: customization.contentColor }}
          >
            Software Engineer
          </p>
          <p 
            className="text-sm mt-2"
            style={{ color: customization.contentColor }}
          >
            john.doe@email.com | (555) 123-4567 | LinkedIn: /in/johndoe
          </p>
        </div>

        {/* Professional Summary */}
        <div>
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ color: customization.headingColor }}
          >
            Professional Summary
          </h2>
          <p 
            className="text-sm leading-relaxed"
            style={{ color: customization.contentColor }}
          >
            Experienced software engineer with 5+ years developing scalable web applications. 
            Proficient in React, Node.js, and cloud technologies. Led teams of 3-5 developers 
            and delivered projects 20% ahead of schedule.
          </p>
        </div>

        {/* Experience */}
        <div>
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ color: customization.headingColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            <div>
              <h3 
                className="font-semibold"
                style={{ color: customization.headingColor }}
              >
                Senior Software Engineer
              </h3>
              <p 
                className="text-sm font-medium"
                style={{ color: customization.contentColor }}
              >
                Tech Company Inc. | 2021 - Present
              </p>
              <ul 
                className="text-sm mt-2 space-y-1 list-disc list-inside"
                style={{ color: customization.contentColor }}
              >
                <li>Developed and maintained React applications serving 100K+ users</li>
                <li>Improved application performance by 40% through code optimization</li>
                <li>Mentored junior developers and conducted code reviews</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ color: customization.headingColor }}
          >
            Skills
          </h2>
          <div 
            className="text-sm"
            style={{ color: customization.contentColor }}
          >
            <p><strong>Programming:</strong> JavaScript, TypeScript, Python, Java</p>
            <p><strong>Frontend:</strong> React, Vue.js, HTML5, CSS3, Tailwind CSS</p>
            <p><strong>Backend:</strong> Node.js, Express, Django, REST APIs</p>
            <p><strong>Database:</strong> PostgreSQL, MongoDB, Redis</p>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 
            className="text-xl font-semibold mb-3"
            style={{ color: customization.headingColor }}
          >
            Education
          </h2>
          <div>
            <h3 
              className="font-semibold"
              style={{ color: customization.headingColor }}
            >
              Bachelor of Science in Computer Science
            </h3>
            <p 
              className="text-sm"
              style={{ color: customization.contentColor }}
            >
              University of Technology | 2015 - 2019
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}