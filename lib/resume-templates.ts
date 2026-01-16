export interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview: string
  styles: {
    container: string
    header: string
    section: string
    title: string
    content: string
  }
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean design with accent colors and modern typography',
    preview: '/templates/modern-preview.png',
    styles: {
      container: 'max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg',
      header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8',
      section: 'p-6 border-l-4 border-blue-500 mb-6',
      title: 'text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4',
      content: 'text-gray-700 dark:text-gray-300 leading-relaxed'
    }
  },
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional layout perfect for corporate environments',
    preview: '/templates/classic-preview.png',
    styles: {
      container: 'max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-300',
      header: 'border-b-2 border-gray-800 p-6 text-center',
      section: 'p-6 border-b border-gray-200 dark:border-gray-700',
      title: 'text-xl font-serif text-gray-800 dark:text-gray-200 mb-3 uppercase tracking-wide',
      content: 'text-gray-600 dark:text-gray-400 font-serif'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant with plenty of white space',
    preview: '/templates/minimal-preview.png',
    styles: {
      container: 'max-w-3xl mx-auto bg-white dark:bg-gray-900',
      header: 'p-8 text-center border-b border-gray-100 dark:border-gray-800',
      section: 'p-6 mb-8',
      title: 'text-lg font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wider',
      content: 'text-gray-600 dark:text-gray-400 font-light leading-loose'
    }
  },
  {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Bold and colorful for creative professionals',
    preview: '/templates/creative-preview.png',
    styles: {
      container: 'max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800',
      header: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8 rounded-t-lg',
      section: 'p-6 bg-white dark:bg-gray-800 m-4 rounded-lg shadow-md',
      title: 'text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4',
      content: 'text-gray-700 dark:text-gray-300'
    }
  },
  {
    id: 'tech',
    name: 'Tech Professional',
    description: 'Modern tech-focused design with code-like elements',
    preview: '/templates/tech-preview.png',
    styles: {
      container: 'max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900 font-mono',
      header: 'bg-gray-900 dark:bg-black text-green-400 p-6 font-mono',
      section: 'p-6 bg-white dark:bg-gray-800 m-4 border-l-4 border-green-500',
      title: 'text-lg font-mono text-green-600 dark:text-green-400 mb-3',
      content: 'text-gray-700 dark:text-gray-300 font-mono text-sm'
    }
  },
  {
    id: 'executive',
    name: 'Executive Premium',
    description: 'Sophisticated design for senior-level positions',
    preview: '/templates/executive-preview.png',
    styles: {
      container: 'max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl',
      header: 'bg-gray-900 dark:bg-black text-white p-10',
      section: 'p-8 border-b border-gray-200 dark:border-gray-700',
      title: 'text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight',
      content: 'text-gray-700 dark:text-gray-300 text-lg leading-relaxed'
    }
  }
]

export function getTemplateById(id: string): ResumeTemplate | undefined {
  return RESUME_TEMPLATES.find(template => template.id === id)
}

export function getTemplateStyles(templateId: string) {
  const template = getTemplateById(templateId)
  return template?.styles || RESUME_TEMPLATES[0].styles
}