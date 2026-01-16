export type ResumeData = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  data: {
    personal: {
      fullName: string
      email: string
      mobile: string
      address: string
      about: string
    }
    experience: Array<{
      company: string
      position: string
      startDate: string
      endDate: string
      description: string
    }>
    education: Array<{
      institution: string
      degree: string
      field: string
      graduationDate: string
      details: string
    }>
    skills: Array<{
      category: string
      skills: string
    }>
    projects: Array<{
      title: string
      description: string
      technologies: string
      link: string
    }>
    certifications: Array<{
      name: string
      issuer: string
      date: string
      credentialId: string
    }>
    achievements: Array<{
      title: string
      description: string
    }>
  }
}

const STORAGE_KEY = "resumes_data"

export function getAllResumes(): ResumeData[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error("Error reading resumes:", error)
    return []
  }
}

export function saveResume(formData: ResumeData["data"], title?: string): ResumeData {
  const resumes = getAllResumes()
  const newResume: ResumeData = {
    id: Date.now().toString(),
    title: title || `Resume - ${new Date().toLocaleDateString()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: formData,
  }
  resumes.push(newResume)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
  return newResume
}

export function updateResume(id: string, formData: ResumeData["data"], title?: string): ResumeData | null {
  const resumes = getAllResumes()
  const index = resumes.findIndex((r) => r.id === id)
  if (index === -1) return null

  resumes[index] = {
    ...resumes[index],
    title: title || resumes[index].title,
    updatedAt: new Date().toISOString(),
    data: formData,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
  return resumes[index]
}

export function deleteResume(id: string): boolean {
  const resumes = getAllResumes()
  const filtered = resumes.filter((r) => r.id !== id)
  if (filtered.length === resumes.length) return false
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  return true
}

export function getResumeById(id: string): ResumeData | null {
  const resumes = getAllResumes()
  return resumes.find((r) => r.id === id) || null
}
