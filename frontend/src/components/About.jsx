import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await api.get("/about");
        setAbout(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch about content:", err);
        setError("Failed to load about section. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section id="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="loading-spinner"></div>
          <p>Loading about section...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about">
        <div className="container">
          <h2>About Me</h2>
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

  if (!about) {
    return (
      <section id="about">
        <div className="container">
          <h2>About Me</h2>
          <p>No about content available.</p>
        </div>
      </section>
    );
  }

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