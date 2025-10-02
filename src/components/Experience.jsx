import React from "react";

const EXPERIENCES = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    date: "2023 - Present | Nairobi, Kenya",
    bullets: [
      "Built responsive business websites for various clients using modern frameworks",
      "Developed full-stack applications with Flask and Next.js",
      "Managed SQL and NoSQL databases for web applications",
      "Delivered custom solutions tailored to client requirements",
    ],
    tech: ["Next.js", "Flask", "MySQL", "MongoDB", "JavaScript", "Python"],
    icon: "fas fa-laptop-code",
  },
  {
    title: "ICT Assistant",
    company: "Tips Technologies",
    date: "May 2023 - Nov 2023 | Nairobi, Kenya",
    bullets: [
      "Maintained computer systems and network infrastructure",
      "Provided technical support to staff and resolved IT issues",
      "Handled system backups and data management procedures",
      "Installed and configured network equipment and software",
    ],
    tech: ["Windows", "Linux", "Network Administration", "System Maintenance"],
    icon: "fas fa-tools",
  },
  {
    title: "IT Intern",
    company: "Ministry of Agriculture",
    date: "May 2022 - Aug 2022 | Nairobi, Kenya",
    bullets: [
      "Developed custom WordPress themes for departmental websites",
      "Repaired and maintained ICT equipment and hardware",
      "Supported LAN setup and network configuration",
      "Assisted in digital transformation initiatives",
    ],
    tech: ["WordPress", "PHP", "HTML", "CSS"],
    icon: "fas fa-server",
  },
  {
    title: "Data Analyst",
    company: "Revenues Holding Ltd",
    date: "Mar 2021 - Apr 2022 | Nairobi, Kenya",
    bullets: [
      "Analyzed large datasets to extract meaningful business insights",
      "Built interactive dashboards for data visualization",
      "Performed data quality checks and validation procedures",
      "Generated reports for management decision-making",
    ],
    tech: ["Python", "Excel", "Data Analysis", "SQL"],
    icon: "fas fa-chart-line",
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <h2>Work Experience</h2>
        <p>My journey in software development, from internships to various roles, building impactful solutions.</p>

        <div className="experience-grid">
          {EXPERIENCES.map((exp) => (
            <div key={exp.title} className="experience-card">
              <div className="experience-icon">
                <i className={exp.icon} />
              </div>
              <div className="experience-details">
                <h3>{exp.title}</h3>
                <div className="experience-company">{exp.company}</div>
                <div className="experience-date">{exp.date}</div>
                <div className="experience-description">
                  <ul>
                    {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
                <div className="experience-tech">
                  {exp.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
