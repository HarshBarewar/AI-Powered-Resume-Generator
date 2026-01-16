import { Github, Linkedin, ExternalLink } from "lucide-react"
import Image from "next/image"

export function AuthenticatedFooter() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-8">
          {/* Profile Image */}
         
          
          {/* Developer Info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Developed by</p>
            <h3 className="font-semibold text-foreground text-lg">Harsh Barewar</h3>
            <p className="text-sm text-muted-foreground">AIML Engineer • RCOEM, Nagpur</p>
            
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <a 
                href="https://harsh-barewar-portfolio.vercel.app/" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
                aria-label="Portfolio"
              >
                <ExternalLink className="w-4 h-4" />
                Portfolio
              </a>
              <a 
                href="www.linkedin.com/in/harshbarewar" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/HarshBarewar" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}