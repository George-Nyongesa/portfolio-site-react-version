import React from "react";

export default function Education() {
  return (
    <section id="education" style={{ backgroundColor: "#f0f4ff" }}>
      <div className="container">
        <h2>Education</h2>
        <p>Academic foundation and continuous learning in computer science and software development.</p>

        <div className="education-card">
          <div className="education-details">
            <h3>Bachelor of Science in Computer Science</h3>
            <div className="education-institution">The Catholic University of Eastern Africa</div>
            <div className="education-date">Awarded in 2025 | Nairobi, Kenya</div>
            <div className="experience-description">
              <ul>
                <li>Comprehensive study of computer science fundamentals and modern technologies</li>
                <li>Focus on software engineering, algorithms, and data structures</li>
                <li>Practical experience in full-stack web development</li>
                <li>Strong foundation in programming languages and database management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
