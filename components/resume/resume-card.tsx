"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trash2, Edit2, Download, Zap, Calculator } from "lucide-react"
import type { ResumeData } from "@/lib/resume-storage"
import Link from "next/link"
import { useState } from "react"
import { exportResumeToPDF } from "@/lib/pdf-export"
import { useRouter } from "next/navigation"

interface ResumeCardProps {
  resume: ResumeData
  onDelete: (id: string) => void
}

export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const [isExporting, setIsExporting] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this resume?")) {
      onDelete(resume.id)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      exportResumeToPDF(resume.data, resume.title)
    } catch (error) {
      console.error("Error exporting resume:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="border border-border hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg">{resume.title}</h3>
            <p className="text-sm text-muted-foreground">{resume.data.personal.fullName || "Unnamed Resume"}</p>
          </div>
        </div>

        <div className="space-y-1 mb-6 text-sm text-muted-foreground">
          <p>Created: {new Date(resume.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Link href={`/resume/edit/${resume.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted bg-transparent flex items-center gap-2 text-xs"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => router.push("/ai-suggestions")}
            variant="outline"
            className="w-full border-border text-primary hover:bg-primary/10 bg-transparent flex items-center gap-2 text-xs"
          >
            <Zap className="w-3 h-3" />
            Optimize
          </Button>
          <Button
            onClick={() => router.push(`/ats-score?resumeId=${resume.id}`)}
            variant="outline"
            className="w-full border-border text-blue-600 hover:bg-blue-50 bg-transparent flex items-center gap-2 text-xs"
          >
            <Calculator className="w-3 h-3" />
            ATS Score
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted bg-transparent flex items-center gap-2 text-xs"
          >
            <Download className="w-3 h-3" />
            {isExporting ? "Export..." : "Export"}
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full border-border text-destructive hover:bg-destructive/10 bg-transparent flex items-center gap-2 text-xs"
          onClick={handleDelete}
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </Button>
      </div>
    </Card>
  )
}
