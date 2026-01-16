import { FileText } from "lucide-react"

interface LogoProps {
  className?: string
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
        <FileText className="w-6 h-6 text-primary" />
      </div>
    </div>
  )
}
