"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { getResumeById, updateResume } from "@/lib/resume-storage"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { ChevronLeft, Save } from "lucide-react"
import { PersonalInfoForm } from "@/components/resume/personal-info-form"
import { ExperienceForm } from "@/components/resume/experience-form"
import { EducationForm } from "@/components/resume/education-form"
import { SkillsForm } from "@/components/resume/skills-form"
import { ProjectsForm } from "@/components/resume/projects-form"
import { CertificationsForm } from "@/components/resume/certifications-form"
import { AchievementsForm } from "@/components/resume/achievements-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { TemplateSelector } from "@/components/template-selector"
import { ResumeCustomizer } from "@/components/resume-customizer"

type FormTab =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "achievements"
  | "customize"

export default function EditResumePage() {
  const router = useRouter()
  const params = useParams()
  const resumeId = params.id as string

  const [activeTab, setActiveTab] = useState<FormTab>("personal")
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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

  useEffect(() => {
    const resume = getResumeById(resumeId)
    if (resume) {
      setResumeTitle(resume.title)
      setFormData(resume.data)
      setIsLoading(false)
    } else {
      router.push("/dashboard")
    }
  }, [resumeId, router])

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
      const title = resumeTitle.trim() || resumeTitle
      updateResume(resumeId, formData, title)
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

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading resume...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-3">
              <Logo />
              <div>
                <h1 className="text-xl font-bold text-foreground">Edit Resume</h1>
                <p className="text-sm text-muted-foreground">Update your professional resume</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
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
                  <ResumeCustomizer />
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
