import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const res = await api.get("/education");
        setEducation(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch education:", err);
        setError("Failed to load education. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <section id="education">
        <div className="container">
          <h2>Education</h2>
          <div className="loading-spinner"></div>
          <p style={{ textAlign: 'center' }}>Loading education...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="education">
        <div className="container">
          <h2>Education</h2>
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

  if (education.length === 0) {
    return (
      <section id="education">
        <div className="container">
          <h2>Education</h2>
          <p style={{ textAlign: 'center' }}>No education information available.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="education">
      <div className="container">
        <h2>Education</h2>
        {education.map((edu, i) => (
          <div key={edu._id || i} className="education-card">
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