"use client"

import { useResume, type ResumeTemplate } from "@/contexts/resume-context"
import { RESUME_TEMPLATES } from "@/lib/resume-templates"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export function TemplateSelector() {
  const { customization, setTemplate } = useResume()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Resume Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESUME_TEMPLATES.map((template) => (
          <Card
            key={template.id}
            onClick={() => setTemplate(template.id as ResumeTemplate)}
            className={`p-4 cursor-pointer transition-all border-2 hover:shadow-lg ${
              customization.template === template.id
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-foreground">{template.name}</h4>
              {customization.template === template.id && <Check className="w-5 h-5 text-primary" />}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
            <div className="h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded border flex items-center justify-center text-xs text-muted-foreground">
              Preview
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
