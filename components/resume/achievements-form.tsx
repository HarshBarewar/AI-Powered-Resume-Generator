"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface AchievementEntry {
  title: string
  description: string
}

interface AchievementsFormProps {
  data: AchievementEntry[]
  onChange: (data: AchievementEntry[]) => void
}

export function AchievementsForm({ data, onChange }: AchievementsFormProps) {
  const addAchievement = () => {
    onChange([...data, { title: "", description: "" }])
  }

  const removeAchievement = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateAchievement = (index: number, field: keyof AchievementEntry, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
        <Button
          onClick={addAchievement}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Achievement
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((entry, index) => (
          <div key={index} className="p-6 border border-border rounded-lg bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Achievement {index + 1}</h3>
              {data.length > 1 && (
                <button
                  onClick={() => removeAchievement(index)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Remove achievement"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Achievement Title *</label>
                <Input
                  placeholder="Employee of the Year 2023"
                  value={entry.title}
                  onChange={(e) => updateAchievement(index, "title", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <Textarea
                  placeholder="Describe the achievement, impact, and recognition"
                  value={entry.description}
                  onChange={(e) => updateAchievement(index, "description", e.target.value)}
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
