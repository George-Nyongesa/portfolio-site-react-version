import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const res = await api.get("/experience");
        setExperiences(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
        setError("Failed to load experiences. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience">
        <div className="container">
          <h2>Work Experience</h2>
          <div className="loading-spinner"></div>
          <p style={{ textAlign: 'center' }}>Loading experiences...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience">
        <div className="container">
          <h2>Work Experience</h2>
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

  if (experiences.length === 0) {
    return (
      <section id="experience">
        <div className="container">
          <h2>Work Experience</h2>
          <p style={{ textAlign: 'center' }}>No experience information available.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience">
      <div className="container">
        <h2>Work Experience</h2>
        <div className="experience-grid">
          {experiences.map((exp) => (
            <div key={exp._id || exp.title} className="experience-card">
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