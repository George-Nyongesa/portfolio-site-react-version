import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <div key={p.name} className="card project-card">
              <div
                className="project-image"
                style={{ backgroundImage: `url('${p.image}')` }}
              />
              <div className="project-content">
                <h3>{p.name}</h3>
                <p>{p.description}</p>

                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={p.demo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-outline ${!p.demo ? "btn-disabled" : ""}`}
                    onClick={(e) => {
                      if (!p.demo) e.preventDefault();
                    }}
                  >
                    Live Demo
                  </a>

                  <a
                    href={p.code || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${!p.code ? "btn-disabled" : ""}`}
                    onClick={(e) => {
                      if (!p.code) e.preventDefault();
                    }}
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
