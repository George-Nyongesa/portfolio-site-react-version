import React, { useState } from "react";
import api from "../services/api";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Form validation
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email))
      next.email = "Please enter a valid email address";
    if (!form.message.trim()) next.message = "Please enter your message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setSuccessMsg("");
    setSubmitError("");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setSuccessMsg("");
    setSubmitError("");

    try {
      const res = await api.post("/contact", form);
      if (res.data.success) {
        setSuccessMsg("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitError("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmitError(
        err.response?.data?.error || 
        "Failed to send message. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p>
          Ready to start your next project? Let's discuss how we can work together to bring your ideas to life.
        </p>

        <div className="contact-container">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat about technology and development.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><FiMail size={24} /></div>
                <div>
                  <h4>Email</h4>
                  <p>georgenyongesa254@gmail.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FiPhone size={24} /></div>
                <div>
                  <h4>Phone</h4>
                  <p>+254 799952841</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FiMapPin size={24} /></div>
                <div>
                  <h4>Location</h4>
                  <p>Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>
              <div className={`form-group ${errors.name ? "error" : ""}`}>
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={loading}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className={`form-group ${errors.email ? "error" : ""}`}>
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={loading}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  disabled={loading}
                />
              </div>

              <div className={`form-group ${errors.message ? "error" : ""}`}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  disabled={loading}
                />
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>

              {submitError && <div className="error-message">{submitError}</div>}
              {successMsg && <div className="success-message">{successMsg}</div>}

              <button 
                type="submit" 
                className="btn" 
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner-small"></span>
                    Sending...
                  </>
                ) : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}