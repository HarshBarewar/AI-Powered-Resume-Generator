"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface EducationEntry {
  institution: string
  degree: string
  field: string
  graduationDate: string
  details: string
}

interface EducationFormProps {
  data: EducationEntry[]
  onChange: (data: EducationEntry[]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    onChange([...data, { institution: "", degree: "", field: "", graduationDate: "", details: "" }])
  }

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Education</h2>
        <Button
          onClick={addEducation}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((entry, index) => (
          <div key={index} className="p-6 border border-border rounded-lg bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Education {index + 1}</h3>
              {data.length > 1 && (
                <button
                  onClick={() => removeEducation(index)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Remove education"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Institution/University *</label>
                <Input
                  placeholder="Stanford University"
                  value={entry.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Degree *</label>
                  <Input
                    placeholder="Bachelor of Science"
                    value={entry.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Field of Study *</label>
                  <Input
                    placeholder="Computer Science"
                    value={entry.field}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Graduation Date</label>
                <Input
                  type="month"
                  value={entry.graduationDate}
                  onChange={(e) => updateEducation(index, "graduationDate", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Additional Details</label>
                <Textarea
                  placeholder="GPA: 3.8, Honors, Relevant coursework, etc."
                  value={entry.details}
                  onChange={(e) => updateEducation(index, "details", e.target.value)}
                  className="bg-input border-border text-foreground min-h-24"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
