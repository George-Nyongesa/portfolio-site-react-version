import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="social-links">
          <a 
            href="https://www.linkedin.com/in/george-wepukhulu-6803131b1/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin" />
          </a>
          <a 
            href="https://github.com/George-Nyongesa" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
          <a 
            href="https://x.com/Frello254" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter" />
          </a>
        </div>
        <p>© {new Date().getFullYear()} George Nyongesa. All rights reserved.</p>
      </div>
    </footer>
  );
}