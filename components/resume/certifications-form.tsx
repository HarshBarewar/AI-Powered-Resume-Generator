"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"

interface CertificationEntry {
  name: string
  issuer: string
  date: string
  credentialId: string
}

interface CertificationsFormProps {
  data: CertificationEntry[]
  onChange: (data: CertificationEntry[]) => void
}

export function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    onChange([...data, { name: "", issuer: "", date: "", credentialId: "" }])
  }

  const removeCertification = (index: number) => {
    onChange(data.filter((_, i) => i !== index))
  }

  const updateCertification = (index: number, field: keyof CertificationEntry, value: string) => {
    const updated = [...data]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Certifications</h2>
        <Button
          onClick={addCertification}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((entry, index) => (
          <div key={index} className="p-6 border border-border rounded-lg bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Certification {index + 1}</h3>
              {data.length > 1 && (
                <button
                  onClick={() => removeCertification(index)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                  aria-label="Remove certification"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Certification Name *</label>
                <Input
                  placeholder="AWS Certified Solutions Architect"
                  value={entry.name}
                  onChange={(e) => updateCertification(index, "name", e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Issuer *</label>
                  <Input
                    placeholder="Amazon Web Services"
                    value={entry.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Issue Date</label>
                  <Input
                    type="month"
                    value={entry.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Credential ID</label>
                <Input
                  placeholder="Optional: credential verification ID or URL"
                  value={entry.credentialId}
                  onChange={(e) => updateCertification(index, "credentialId", e.target.value)}
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
