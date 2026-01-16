"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { PersonalInfoForm } from "@/components/resume/personal-info-form"
import { ExperienceForm } from "@/components/resume/experience-form"
import { EducationForm } from "@/components/resume/education-form"
import { SkillsForm } from "@/components/resume/skills-form"
import { ProjectsForm } from "@/components/resume/projects-form"
import { CertificationsForm } from "@/components/resume/certifications-form"
import { AchievementsForm } from "@/components/resume/achievements-form"
import { ChevronLeft, Save } from "lucide-react"
import { saveResume } from "@/lib/resume-storage"
import { ThemeToggle } from "@/components/theme-toggle"
import { TemplateSelector } from "@/components/template-selector"
import { useResume } from "@/contexts/resume-context"
import { ColorFontCustomizer } from "@/components/color-font-customizer"
import { AuthenticatedHeader } from "@/components/authenticated-header"

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

type FormTab =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "customize"

export default function CreateResumePage() {
  const router = useRouter()
  const { customization } = useResume()
  const [activeTab, setActiveTab] = useState<FormTab>("personal")
  const [isSaving, setIsSaving] = useState(false)
  const [resumeTitle, setResumeTitle] = useState("")

  const [formData, setFormData] = useState({
    personal: {
      fullName: "",
      email: "",
      mobile: "",
      address: "",
      about: "",
    },
    experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    education: [{ institution: "", degree: "", field: "", graduationDate: "", details: "" }],
    skills: [{ category: "", skills: "" }],
    projects: [{ title: "", description: "", technologies: "", link: "" }],
    certifications: [{ name: "", issuer: "", date: "", credentialId: "" }],
    achievements: [{ title: "", description: "" }],
  })

  const tabs: { id: FormTab; label: string; icon: string }[] = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "📁" },
    { id: "certifications", label: "Certifications", icon: "🏆" },
    { id: "achievements", label: "Achievements", icon: "⭐" },
    { id: "customize", label: "Customize", icon: "🎨" },
  ]

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const title =
        resumeTitle.trim() ||
        (formData.personal.fullName
          ? `${formData.personal.fullName}'s Resume`
          : `Resume - ${new Date().toLocaleDateString()}`)
      
      // Get customization settings from context
      
      // Save resume data with customization
      const resumeWithCustomization = {
        ...formData,
        customization
      }
      
      saveResume(resumeWithCustomization, title)
      setTimeout(() => {
        setIsSaving(false)
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      console.error("Error saving resume:", error)
      setIsSaving(false)
    }
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <AuthenticatedHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Save Button */}
        <div className="mb-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Resume"}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4 border border-border sticky top-24">
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">Resume Title</label>
                <input
                  type="text"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="My Resume"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <h3 className="font-semibold text-foreground mb-4">Sections</h3>
              <nav className="flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <Card className="p-8 border border-border">
              {activeTab === "personal" && (
                <PersonalInfoForm
                  data={formData.personal}
                  onChange={(data) => setFormData({ ...formData, personal: data })}
                />
              )}

              {activeTab === "experience" && (
                <ExperienceForm
                  data={formData.experience}
                  onChange={(data) => setFormData({ ...formData, experience: data })}
                />
              )}

              {activeTab === "education" && (
                <EducationForm
                  data={formData.education}
                  onChange={(data) => setFormData({ ...formData, education: data })}
                />
              )}

              {activeTab === "skills" && (
                <SkillsForm data={formData.skills} onChange={(data) => setFormData({ ...formData, skills: data })} />
              )}

              {activeTab === "projects" && (
                <ProjectsForm
                  data={formData.projects}
                  onChange={(data) => setFormData({ ...formData, projects: data })}
                />
              )}

              {activeTab === "certifications" && (
                <CertificationsForm
                  data={formData.certifications}
                  onChange={(data) => setFormData({ ...formData, certifications: data })}
                />
              )}

              {activeTab === "achievements" && (
                <AchievementsForm
                  data={formData.achievements}
                  onChange={(data) => setFormData({ ...formData, achievements: data })}
                />
              )}

              {activeTab === "customize" && (
                <div className="space-y-8">
                  <TemplateSelector />
                  <ColorFontCustomizer />
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
