"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

interface SkillEntry {
  category: string
  skills: string
}

interface SkillsFormProps {
  data: SkillEntry[]
  onChange: (data: SkillEntry[]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const addSkill = () => {
    onChange([...data, { category: "", skills: "" }])
  }

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateSkill = (index: number, field: keyof SkillEntry, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Skills</h2>
        <Button
          onClick={addSkill}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <div className="space-y-5">
        {data.map((entry, index) => (
          <div key={index} className="p-6 border border-border rounded-lg bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Skill Category {index + 1}</h3>
              {data.length > 1 && (
                <button
                  onClick={() => removeSkill(index)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Remove skill category"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category Name *</label>
                <Input
                  placeholder="e.g., Programming Languages, Tools, Frameworks"
                  value={entry.category}
                  onChange={(e) => updateSkill(index, "category", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Skills (comma-separated) *</label>
                <Input
                  placeholder="e.g., JavaScript, React, Python, Node.js, AWS"
                  value={entry.skills}
                  onChange={(e) => updateSkill(index, "skills", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-2">Separate each skill with a comma</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
