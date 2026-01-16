import type { ResumeData } from "./resume-storage"

export function exportResumeToPDF(data: ResumeData["data"], title: string) {
  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    console.error("Unable to open print window")
    return
  }

  // Build HTML content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            background: white;
          }
          
          .container {
            max-width: 8.5in;
            height: 11in;
            margin: 0 auto;
            background: white;
            padding: 40px;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }
          
          .header h1 {
            font-size: 28px;
            color: #1e40af;
            margin-bottom: 8px;
          }
          
          .contact-info {
            font-size: 12px;
            color: #666;
          }
          
          .section {
            margin-bottom: 20px;
          }
          
          .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #1e40af;
            border-bottom: 1px solid #ddd;
            padding-bottom: 8px;
            margin-bottom: 12px;
            text-transform: uppercase;
          }
          
          .entry {
            margin-bottom: 12px;
            font-size: 12px;
          }
          
          .entry-title {
            font-weight: bold;
            color: #000;
          }
          
          .entry-subtitle {
            color: #666;
            font-style: italic;
          }
          
          .entry-description {
            color: #444;
            margin-top: 4px;
            white-space: pre-wrap;
          }
          
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          
          .skill-badge {
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
          }
          
          @media print {
            body {
              padding: 0;
            }
            .container {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${data.personal.fullName || "Resume"}</h1>
            <div class="contact-info">
              ${data.personal.email ? `<span>${data.personal.email}</span> | ` : ""}
              ${data.personal.mobile ? `<span>${data.personal.mobile}</span> | ` : ""}
              ${data.personal.address ? `<span>${data.personal.address}</span>` : ""}
            </div>
          </div>
          
          ${
            data.personal.about
              ? `
            <div class="section">
              <div class="section-title">Professional Summary</div>
              <div class="entry-description">${data.personal.about}</div>
            </div>
          `
              : ""
          }
          
          ${
            data.experience.length > 0 && data.experience[0].company
              ? `
            <div class="section">
              <div class="section-title">Work Experience</div>
              ${data.experience
                .map(
                  (exp) => `
                <div class="entry">
                  <div class="entry-title">${exp.position}</div>
                  <div class="entry-subtitle">${exp.company}${exp.startDate ? ` • ${exp.startDate}` : ""}${exp.endDate ? ` - ${exp.endDate}` : ""}</div>
                  ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          ${
            data.education.length > 0 && data.education[0].institution
              ? `
            <div class="section">
              <div class="section-title">Education</div>
              ${data.education
                .map(
                  (edu) => `
                <div class="entry">
                  <div class="entry-title">${edu.degree}${edu.field ? ` in ${edu.field}` : ""}</div>
                  <div class="entry-subtitle">${edu.institution}${edu.graduationDate ? ` • ${edu.graduationDate}` : ""}</div>
                  ${edu.details ? `<div class="entry-description">${edu.details}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          ${
            data.skills.length > 0 && data.skills[0].skills
              ? `
            <div class="section">
              <div class="section-title">Skills</div>
              ${data.skills
                .map(
                  (skill) => `
                <div class="entry">
                  ${skill.category ? `<div class="entry-subtitle">${skill.category}</div>` : ""}
                  <div class="skills-container">
                    ${skill.skills
                      .split(",")
                      .map((s) => `<span class="skill-badge">${s.trim()}</span>`)
                      .join("")}
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          ${
            data.projects.length > 0 && data.projects[0].title
              ? `
            <div class="section">
              <div class="section-title">Projects</div>
              ${data.projects
                .map(
                  (proj) => `
                <div class="entry">
                  <div class="entry-title">${proj.title}</div>
                  ${proj.technologies ? `<div class="entry-subtitle">Technologies: ${proj.technologies}</div>` : ""}
                  ${proj.description ? `<div class="entry-description">${proj.description}</div>` : ""}
                  ${proj.link ? `<div class="entry-subtitle"><a href="${proj.link}">${proj.link}</a></div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          ${
            data.certifications.length > 0 && data.certifications[0].name
              ? `
            <div class="section">
              <div class="section-title">Certifications</div>
              ${data.certifications
                .map(
                  (cert) => `
                <div class="entry">
                  <div class="entry-title">${cert.name}</div>
                  <div class="entry-subtitle">${cert.issuer}${cert.date ? ` • ${cert.date}` : ""}</div>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
          
          ${
            data.achievements.length > 0 && data.achievements[0].title
              ? `
            <div class="section">
              <div class="section-title">Achievements</div>
              ${data.achievements
                .map(
                  (ach) => `
                <div class="entry">
                  <div class="entry-title">${ach.title}</div>
                  ${ach.description ? `<div class="entry-description">${ach.description}</div>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()

  printWindow.onload = () => {
    printWindow.print()
  }
}
