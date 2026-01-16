"use client"

import { TemplateSelector } from "@/components/template-selector"
import { ColorFontCustomizer } from "@/components/color-font-customizer"

export function ResumeCustomizer() {
  return (
    <div className="space-y-8">
      <TemplateSelector />
      <ColorFontCustomizer />
    </div>
  )
}