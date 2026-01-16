"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

interface ProjectEntry {
  title: string
  description: string
  technologies: string
  link: string
}

interface ProjectsFormProps {
  data: ProjectEntry[]
  onChange: (data: ProjectEntry[]) => void
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const addProject = () => {
    onChange([...data, { title: "", description: "", technologies: "", link: "" }])
  }

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateProject = (index: number, field: keyof ProjectEntry, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        <Button
          onClick={addProject}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((entry, index) => (
          <div key={index} className="p-6 border border-border rounded-lg bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Project {index + 1}</h3>
              {data.length > 1 && (
                <button
                  onClick={() => removeProject(index)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Remove project"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Title *</label>
                <Input
                  placeholder="E-commerce Platform"
                  value={entry.title}
                  onChange={(e) => updateProject(index, "title", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <Textarea
                  placeholder="Describe the project, its purpose, and your role in it"
                  value={entry.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  className="bg-input border-border text-foreground min-h-28"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Technologies Used</label>
                <Input
                  placeholder="React, Node.js, MongoDB, AWS (comma-separated)"
                  value={entry.technologies}
                  onChange={(e) => updateProject(index, "technologies", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Project Link</label>
                <Input
                  type="url"
                  placeholder="https://github.com/yourname/project"
                  value={entry.link}
                  onChange={(e) => updateProject(index, "link", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
