"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfoFormProps {
  data: {
    fullName: string
    email: string
    mobile: string
    address: string
    about: string
  }
  onChange: (data: PersonalInfoFormProps["data"]) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof typeof data, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
          <Input
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="bg-input border-border text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Mobile Number *</label>
            <Input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={data.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="bg-input border-border text-foreground"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Address</label>
          <Input
            placeholder="City, State, Country"
            value={data.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="bg-input border-border text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Professional Summary</label>
          <Textarea
            placeholder="Write a brief professional summary about yourself (2-3 sentences)"
            value={data.about}
            onChange={(e) => handleChange("about", e.target.value)}
            className="bg-input border-border text-foreground min-h-32"
          />
          <p className="text-xs text-muted-foreground mt-2">Highlight your key strengths and career goals</p>
        </div>
      </div>
    </div>
  )
}
