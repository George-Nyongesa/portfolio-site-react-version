import React from "react";

const EXPERIENCES = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    date: "2018 - Present | Nairobi, Kenya",
    bullets: [
      "Designed and developed responsive websites and web applications for individuals, startups, and small businesses",
      "Delivered full-stack solutions using Flask and Next.js, integrating both SQL and NoSQL databases",
      "Customized websites based on client requirements, ensuring optimal performance, usability, and scalability",
      "Managed hosting, deployment, and maintenance for client projects on platforms such as Vercel and Render",
      "Continuously upgraded skills in modern web technologies to meet evolving client and market demands",
    ],
    tech: ["Next.js", "Django", "Node.js", "Express.js", "MySQL", "MongoDB", "JavaScript", "Python"],
    icon: "fas fa-laptop-code",
  },
  {
    title: "ICT Assistant",
    company: "Tipis Technologies",
    date: "May 2023 - Nov 2023 | Ongata Rongai, Kenya",
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
    title: "ICT Attachee",
    company: "Ministry of Agriculture and Livstock Development - State Department of Livestock",
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
    title: "Data Entry & Analysis Assistant",
    company: "Reveries Holding Ltd",
    date: "Mar 2021 - Apr 2022 | Remote",
    bullets: [
      "Collected and compiled data from business websites and reputable public sources",
      "Entered, cleaned, and organized datasets in Excel for analysis and reporting",
      "Performed data validation to ensure accuracy and consistency across records",
      "Supported the analytics team in preparing datasets for dashboards and management reports",
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
