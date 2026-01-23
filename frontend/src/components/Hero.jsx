import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/hero") // fetch hero content from backend
      .then(res => setHero(res.data))
      .catch(err => console.error("Failed to fetch hero content:", err));
  }, []);

  if (!hero) return null; // loading state can be added if needed

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
                href={`http://localhost:5000/resume`}
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
