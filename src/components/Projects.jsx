import React from "react";

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboards.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application built with Next.js and Supabase. Real-time updates, team collaboration, and project tracking.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool using OpenAI APIs. Features include text generation, image creation, and content optimization.",
    image: "https://images.unsplash.com/photo-1589254066213-a0c9dc853511?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tech: ["React", "OpenAI API", "Python", "FastAPI"],
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ backgroundColor: "#f0f4ff" }}>
      <div className="container">
        <h2>Featured Projects</h2>
        <p>Here are some of my recent projects that showcase my skills and passion for development.</p>

        <div className="project-grid">
          {PROJECTS.map((p) => (
            <div key={p.title} className="card project-card">
              <div
                className="project-image"
                style={{ backgroundImage: `url('${p.image}')` }}
                aria-hidden
              />
              <div className="project-content">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                <a href="#" className="btn">Code</a>
                <a href="#" className="btn btn-outline">Live Demo</a>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: 50 }}>Other Notable Projects</h3>

        <div className="project-grid" style={{ marginTop: 20 }}>
          {/* Example repeated content */}
          <div className="card project-card">
            <div className="project-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }} />
            <div className="project-content">
              <h3>Real-time Chat App</h3>
              <p>A modern chat application with real-time messaging, file sharing and video calls. Built with Socket.io and WebRTC.</p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Socket.io</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">WebRTC</span>
              </div>
            </div>
          </div>

          <div className="card project-card">
            <div className="project-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }} />
            <div className="project-content">
              <h3>Portfolio Analytics</h3>
              <p>A comprehensive analytics dashboard for portfolio tracking with interactive charts and real-time data visualization.</p>
              <div className="project-tech">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">D3.js</span>
                <span className="tech-tag">MongoDB</span>
              </div>
            </div>
          </div>

          <div className="card project-card">
            <div className="project-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }} />
            <div className="project-content">
              <h3>Mobile Fitness App</h3>
              <p>A cross-platform fitness tracking app with workout plans, progress tracking, and social features for fitness enthusiasts.</p>
              <div className="project-tech">
                <span className="tech-tag">React Native</span>
                <span className="tech-tag">Firebase</span>
                <span className="tech-tag">Redux</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
