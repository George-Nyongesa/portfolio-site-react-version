import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Hero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const res = await api.get("/hero");
        setHero(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch hero content:", err);
        setError("Failed to load hero section. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content" style={{ justifyContent: 'center', minHeight: '400px' }}>
            <div className="loading-spinner"></div>
            <p>Loading hero section...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content" style={{ justifyContent: 'center', minHeight: '400px' }}>
            <div className="error-message" style={{ color: '#ef4444', textAlign: 'center' }}>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn"
                style={{ marginTop: '20px' }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (!hero) {
    return (
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content" style={{ justifyContent: 'center', minHeight: '400px' }}>
            <p>No hero content available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="home">
      <div className="circle circle-1" />
      <div className="circle circle-2" />
      <div className="circle circle-3" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Hi, I'm <span>{hero.name}</span>
            </h1>
            <p>{hero.title}</p>
            <p>{hero.description}</p>
            <div className="hero-buttons">
              <a
                href={`${process.env.REACT_APP_API_URL}/resume`}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
              <a href="#projects" className="btn btn-outline">
                View My Work
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img src={hero.image} alt={hero.name} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}