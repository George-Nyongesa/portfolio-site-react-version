import React, { useEffect, useState } from "react";
import axios from "axios";

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/about") // fetch about content from backend
      .then(res => setAbout(res.data))
      .catch(err => console.error("Failed to fetch about content:", err));
  }, []);

  if (!about) return null; // can show a loading state

  return (
    <section id="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <h3>What I Love</h3>
            <ul>
              {about.loves.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Technical Skills</h3>
            {about.skills.map((cat, i) => (
              <div key={i} className="skill-category">
                <h4>{cat.category}</h4>
                <div className="skills-grid">
                  {cat.items.map((skill) => (
                    <span key={skill} className="skill-item">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
