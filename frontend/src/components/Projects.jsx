import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects");
        setProjects(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn">
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <p>No projects available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <div key={p._id || p.name} className="card project-card">
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