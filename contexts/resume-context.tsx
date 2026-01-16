"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type ResumeTemplate = "modern" | "classic" | "minimal" | "creative" | "tech" | "executive"

interface ResumeCustomization {
  template: ResumeTemplate
  headingColor: string
  contentColor: string
  fontFamily: string
}

interface ResumeContextType {
  customization: ResumeCustomization
  resume: any
  setTemplate: (template: ResumeTemplate) => void
  setHeadingColor: (color: string) => void
  setContentColor: (color: string) => void
  setFontFamily: (font: string) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

const DEFAULT_CUSTOMIZATION: ResumeCustomization = {
  template: "modern",
  headingColor: "#1f2937",
  contentColor: "#374151",
  fontFamily: "Inter, sans-serif",
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [customization, setCustomization] = useState<ResumeCustomization>(DEFAULT_CUSTOMIZATION)
  const [resume, setResume] = useState({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCustomization = localStorage.getItem("resumeCustomization")
    if (savedCustomization) {
      try {
        setCustomization(JSON.parse(savedCustomization))
      } catch (e) {
        setCustomization(DEFAULT_CUSTOMIZATION)
      }
    }
  }, [])

  const setTemplate = (template: ResumeTemplate) => {
    const newCustomization = { ...customization, template }
    setCustomization(newCustomization)
    localStorage.setItem("resumeCustomization", JSON.stringify(newCustomization))
  }

  const setHeadingColor = (color: string) => {
    const newCustomization = { ...customization, headingColor: color }
    setCustomization(newCustomization)
    localStorage.setItem("resumeCustomization", JSON.stringify(newCustomization))
  }

  const setContentColor = (color: string) => {
    const newCustomization = { ...customization, contentColor: color }
    setCustomization(newCustomization)
    localStorage.setItem("resumeCustomization", JSON.stringify(newCustomization))
  }

  const setFontFamily = (font: string) => {
    const newCustomization = { ...customization, fontFamily: font }
    setCustomization(newCustomization)
    localStorage.setItem("resumeCustomization", JSON.stringify(newCustomization))
  }

  if (!mounted) return <>{children}</>

  return (
    <ResumeContext.Provider value={{ customization, resume, setTemplate, setHeadingColor, setContentColor, setFontFamily }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResume must be used within ResumeProvider")
  }
  return context
}
