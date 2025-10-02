import React from "react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="circle circle-1" />
      <div className="circle circle-2" />
      <div className="circle circle-3" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Hi, I'm <span>George Nyongesa</span>
            </h1>
            <p>Software Developer | Full-Stack Engineer</p>
            <p>
              Building clean, maintainable solutions with code. Passionate about creating exceptional
              digital experiences and full-stack applications that solve real-world problems.
            </p>
            <div className="hero-buttons">
              <a href="#" className="btn">
                Download Resume
              </a>
              <a href="#projects" className="btn btn-outline">
                View My Work
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img src="/images/george.jpg" alt="George Nyongesa" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
