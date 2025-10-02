import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Toggle body no-scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  // Scroll listener to set scrolled and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = Array.from(document.querySelectorAll("section"));
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      let current = activeSection;

      sections.forEach((section) => {
        const top = section.offsetTop - headerHeight - 60; // slightly earlier
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          current = section.getAttribute("id") || current;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <header style={{ boxShadow: scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none" }}>
      <div className="container">
        <nav>
          <div className="logo">
            George<span>.</span>
          </div>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? "active" : ""}
                  onClick={() => setMenuOpen(false)} // close mobile menu when clicked
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              {/* Prevent default until a real CV link is available */}
              <a
                href="/"
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                }}
              >
                Download CV
              </a>
            </li>
          </ul>

          <div className="menu-btn" onClick={() => setMenuOpen((s) => !s)}>
            ☰
          </div>
        </nav>
      </div>
    </header>
  );
}
