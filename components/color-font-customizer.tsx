"use client"

import { useResume } from "@/contexts/resume-context"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Type } from "lucide-react"

const PROFESSIONAL_COLORS = [
  { name: "Dark Gray", value: "#1f2937" },
  { name: "Navy Blue", value: "#1e3a8a" },
  { name: "Forest Green", value: "#166534" },
  { name: "Burgundy", value: "#7c2d12" },
  { name: "Deep Purple", value: "#581c87" },
  { name: "Charcoal", value: "#374151" },
  { name: "Teal", value: "#0f766e" },
  { name: "Slate", value: "#475569" }
]

const CONTENT_COLORS = [
  { name: "Medium Gray", value: "#374151" },
  { name: "Dark Slate", value: "#475569" },
  { name: "Charcoal", value: "#4b5563" },
  { name: "Steel Gray", value: "#6b7280" },
  { name: "Cool Gray", value: "#64748b" },
  { name: "Warm Gray", value: "#78716c" },
  { name: "Neutral Gray", value: "#71717a" },
  { name: "Stone", value: "#57534e" }
]

const PROFESSIONAL_FONTS = [
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "Lato, sans-serif" },
  { name: "Source Sans Pro", value: "'Source Sans Pro', sans-serif" },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
  { name: "Poppins", value: "Poppins, sans-serif" },
  { name: "Nunito Sans", value: "'Nunito Sans', sans-serif" },
  { name: "Work Sans", value: "'Work Sans', sans-serif" },
  { name: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif" }
]

export function ColorFontCustomizer() {
  const { customization, setHeadingColor, setContentColor, setFontFamily } = useResume()

  if (!customization) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Palette className="w-5 h-5" />
        Colors & Typography
      </h3>

      {/* Heading Color */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Heading Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {PROFESSIONAL_COLORS.map((color) => (
            <Button
              key={color.value}
              variant="outline"
              size="sm"
              onClick={() => setHeadingColor(color.value)}
              className={`h-12 flex flex-col items-center gap-1 ${
                customization.headingColor === color.value ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div 
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-xs">{color.name}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Content Color */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Content Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {CONTENT_COLORS.map((color) => (
            <Button
              key={color.value}
              variant="outline"
              size="sm"
              onClick={() => setContentColor(color.value)}
              className={`h-12 flex flex-col items-center gap-1 ${
                customization.contentColor === color.value ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div 
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-xs">{color.name}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Font Family */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Type className="w-4 h-4" />
          Font Family
        </Label>
        <Select value={customization.fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {PROFESSIONAL_FONTS.find(f => f.value === customization.fontFamily)?.name || "Select font family"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {PROFESSIONAL_FONTS.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Preview */}
      <Card className="p-4">
        <Label className="text-sm font-medium mb-3 block">Preview</Label>
        <div 
          className="space-y-2"
          style={{ fontFamily: customization.fontFamily }}
        >
          <h4 
            className="text-lg font-bold"
            style={{ color: customization.headingColor }}
          >
            Section Heading
          </h4>
          <p 
            className="text-sm"
            style={{ color: customization.contentColor }}
          >
            This is how your resume content will look with the selected colors and font.
          </p>
        </div>
      </Card>
    </div>
  )
}