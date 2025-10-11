import React from "react";

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div>
            <p>
              Enthusiastic Software Developer with hands-on experience in full-stack web development,
              skilled in modern technologies and passionate about building clean, maintainable solutions.
            </p>

            <h3>My Journey</h3>
            <p>
              Started my journey in computer science at The Catholic University of Eastern Africa, where I
              discovered my passion for creating digital solutions that solve real-world problems.
            </p>
            <p>Over the years, I've worked with various organizations, developing full-stack applications and providing technical solutions.</p>

            <h3>What I Love</h3>
            <ul>
              <li>Building user-centric applications</li>
              <li>Solving complex technical challenges</li>
              <li>Learning new technologies</li>
              <li>Creating maintainable, scalable code</li>
              <li>Mentoring and knowledge sharing</li>
            </ul>
          </div>

          <div>
            <h3>Technical Skills</h3>

            <div className="skill-category">
              <h4>Languages</h4>
              <div className="skills-grid">
                {["HTML", "CSS", "JavaScript", "TypeScript", "Python", "PHP", "Java", "C#"].map((s) => (
                  <span key={s} className="skill-item">{s}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>Frameworks & Libraries</h4>
              <div className="skills-grid">
                {["React", "Next.js", "Express", "Flask", "Bootstrap", "Tailwind css", "Node.js", "Django"].map((s) => (
                  <span key={s} className="skill-item">{s}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>Databases</h4>
              <div className="skills-grid">
                {["MySQL", "MongoDB", "PostgreSQL", "Firebase Firestore"].map((s) => (
                  <span key={s} className="skill-item">{s}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>Tools</h4>
              <div className="skills-grid">
                {["Git", "Postman", "Notion", "VS Code"].map((s) => (
                  <span key={s} className="skill-item">{s}</span>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h4>ML & AI</h4>
              <div className="skills-grid">
                {["TensorFlow", "Sickit-learn", "Data Analysis", "Machine Learning"].map((s) => (
                  <span key={s} className="skill-item">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
