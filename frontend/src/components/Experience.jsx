import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/experience")
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Failed to fetch experiences:", err));
  }, []);

  return (
    <section id="experience">
      <div className="container">
        <h2>Work Experience</h2>
        <div className="experience-grid">
          {experiences.map(exp => (
            <div key={exp.title} className="experience-card">
              <div className="experience-icon">
                <i className={exp.icon} />
              </div>
              <div className="experience-details">
                <h3>{exp.title}</h3>
                <div className="experience-company">{exp.company}</div>
                <div className="experience-date">{exp.date}</div>
                <ul>
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <div className="experience-tech">
                  {exp.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
