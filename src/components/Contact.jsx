import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) next.email = "Please enter a valid email address";
    if (!form.message.trim()) next.message = "Please enter your message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Thank you for your message, " + form.name + "! I will get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p>Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.</p>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat about technology and development.</p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-envelope" /></div>
                <div><h4>Email</h4><p>georgenyongesa254@gmail.com</p></div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-phone" /></div>
                <div><h4>Phone</h4><p>+254 799952841</p></div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><i className="fas fa-map-marker-alt" /></div>
                <div><h4>Location</h4><p>Nairobi, Kenya</p></div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form id="contactForm" onSubmit={handleSubmit} noValidate>
              <div className={`form-group ${errors.name ? "error" : ""}`}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className={`form-group ${errors.email ? "error" : ""}`}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" />
              </div>

              <div className={`form-group ${errors.message ? "error" : ""}`}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." />
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>

              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
