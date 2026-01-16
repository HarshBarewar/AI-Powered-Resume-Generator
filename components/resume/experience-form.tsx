"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface ExperienceEntry {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceFormProps {
  data: ExperienceEntry[]
  onChange: (data: ExperienceEntry[]) => void
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    onChange([...data, { company: "", position: "", startDate: "", endDate: "", description: "" }])
  }

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: keyof ExperienceEntry, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Work Experience</h2>
        <Button
          onClick={addExperience}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((entry, index) => (
          <div key={index} className="p-6 border border-border rounded-lg bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Experience {index + 1}</h3>
              {data.length > 1 && (
                <button
                  onClick={() => removeExperience(index)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Remove experience"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                  <Input
                    placeholder="Acme Corp"
                    value={entry.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Job Title *</label>
                  <Input
                    placeholder="Senior Software Engineer"
                    value={entry.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                  <Input
                    type="month"
                    value={entry.startDate}
                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                  <Input
                    type="month"
                    value={entry.endDate}
                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description & Achievements</label>
                <Textarea
                  placeholder="Describe your responsibilities and key achievements (use bullet points)"
                  value={entry.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  className="bg-input border-border text-foreground min-h-28"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use bullet points like: • Managed team of 5 engineers
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
