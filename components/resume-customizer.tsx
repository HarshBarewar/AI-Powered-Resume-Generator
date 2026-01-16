"use client"

import { useResume } from "@/contexts/resume-context"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const FONT_FAMILIES = ["sans", "serif", "mono"] as const
const COLOR_PRESETS = [
  { label: "Black", value: "#000000" },
  { label: "Dark Blue", value: "#1e3a8a" },
  { label: "Navy", value: "#001f3f" },
  { label: "Gray", value: "#4b5563" },
]

export function ResumeCustomizer() {
  const { customization, setHeadingColor, setContentColor, setFontFamily } = useResume()

  return (
    <Card className="p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Customize Resume</h3>

      {/* Font Family Selection */}
      <div className="mb-6">
        <Label className="text-foreground font-medium mb-3 block">Font Family</Label>
        <div className="flex gap-3">
          {FONT_FAMILIES.map((font) => (
            <button
              key={font}
              onClick={() => setFontFamily(font)}
              className={`px-4 py-2 rounded-lg transition-all font-${font} ${
                customization.fontFamily === font
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground border border-border hover:border-primary"
              }`}
            >
              {font.charAt(0).toUpperCase() + font.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Text Color Selection */}
      <div className="mb-6">
        <Label className="text-foreground font-medium mb-3 block">Text Color</Label>
        <div className="flex gap-3 flex-wrap">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setHeadingColor(preset.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                customization.headingColor === preset.value ? "ring-2 ring-primary" : "hover:ring-2 hover:ring-primary/50"
              }`}
            >
              <div className="w-4 h-4 rounded border border-border" style={{ backgroundColor: preset.value }} />
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-3 items-center">
          <Label className="text-foreground">Custom Color:</Label>
          <Input
            type="color"
            value={customization.headingColor}
            onChange={(e) => setHeadingColor(e.target.value)}
            className="w-16 h-10 p-1 border border-border"
          />
          <span className="text-sm text-muted-foreground">{customization.headingColor}</span>
        </div>
      </div>
    </Card>
  )
}
