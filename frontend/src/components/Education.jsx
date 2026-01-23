import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/education")
      .then(res => setEducation(res.data))
      .catch(err => console.error("Failed to fetch education:", err));
  }, []);

  return (
    <section id="education">
      <div className="container">
        <h2>Education</h2>
        {education.map((edu, i) => (
          <div key={i} className="education-card">
            <h3>{edu.degree}</h3>
            <div className="education-institution">{edu.school}</div>
            <div className="education-date">{edu.year}</div>
            <ul>
              {edu.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
