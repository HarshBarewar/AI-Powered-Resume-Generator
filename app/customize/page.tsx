"use client"

import { Header } from "@/components/header"
import { ResumeCustomizer } from "@/components/resume-customizer-new"
import { ResumePreview } from "@/components/resume-preview"

export const dynamic = 'force-dynamic'

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customization Panel */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Customize Resume</h1>
            <ResumeCustomizer />
          </div>
          
          {/* Preview Panel */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Preview</h2>
            <ResumePreview />
          </div>
        </div>
      </main>
    </div>
  )
}