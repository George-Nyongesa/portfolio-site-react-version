import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  FiLogOut,
  FiEdit,
  FiMessageSquare,
  FiBriefcase,
  FiBook,
  FiFolder,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEye,
  FiTrash2,
  FiCheck,
  FiPlus,
  FiSave,
  FiX,
} from "react-icons/fi";
import "./Admin.css";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, contentRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/content"),
      ]);
      setStats(statsRes.data);
      setContent(contentRes.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/admin/login");
      } else {
        setError("Failed to load dashboard data. Please refresh the page.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const handleSaveHero = async (heroData) => {
    try {
      await api.put("/hero", heroData);
      await fetchDashboardData();
      setEditingItem(null);
    } catch (err) {
      alert("Failed to save hero section");
    }
  };

  const handleSaveAbout = async (aboutData) => {
    try {
      await api.put("/about", aboutData);
      await fetchDashboardData();
      setEditingItem(null);
    } catch (err) {
      alert("Failed to save about section");
    }
  };

  const handleSaveProject = async (projectData) => {
    try {
      if (projectData._id) {
        await api.put(`/projects/${projectData._id}`, projectData);
      } else {
        await api.post("/projects", projectData);
      }
      await fetchDashboardData();
      setShowForm(false);
      setEditingItem(null);
    } catch (err) {
      alert("Failed to save project");
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${id}`);
        await fetchDashboardData();
      } catch (err) {
        alert("Failed to delete project");
      }
    }
  };

  const handleSaveExperience = async (expData) => {
    try {
      if (expData._id) {
        await api.put(`/experience/${expData._id}`, expData);
      } else {
        await api.post("/experience", expData);
      }
      await fetchDashboardData();
      setShowForm(false);
      setEditingItem(null);
    } catch (err) {
      alert("Failed to save experience");
    }
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await api.delete(`/experience/${id}`);
        await fetchDashboardData();
      } catch (err) {
        alert("Failed to delete experience");
      }
    }
  };

  const handleSaveEducation = async (eduData) => {
    try {
      if (eduData._id) {
        await api.put(`/education/${eduData._id}`, eduData);
      } else {
        await api.post("/education", eduData);
      }
      await fetchDashboardData();
      setShowForm(false);
      setEditingItem(null);
    } catch (err) {
      alert("Failed to save education");
    }
  };

  const handleDeleteEducation = async (id) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      try {
        await api.delete(`/education/${id}`);
        await fetchDashboardData();
      } catch (err) {
        alert("Failed to delete education");
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/admin/messages/${id}/read`);
      await fetchDashboardData();
    } catch (err) {
      alert("Failed to mark message as read");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await api.delete(`/contact/${id}`);
        await fetchDashboardData();
      } catch (err) {
        alert("Failed to delete message");
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-error">
        <p>{error}</p>
        <button onClick={fetchDashboardData} className="btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Portfolio Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-outline">
          <FiLogOut /> Logout
        </button>
      </header>

      <div className="admin-sidebar">
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""}>
            <button onClick={() => setActiveTab("dashboard")}>
              <FiEye /> Dashboard
            </button>
          </li>
          <li className={activeTab === "hero" ? "active" : ""}>
            <button onClick={() => setActiveTab("hero")}>
              <FiUser /> Hero Section
            </button>
          </li>
          <li className={activeTab === "about" ? "active" : ""}>
            <button onClick={() => setActiveTab("about")}>
              <FiEdit /> About Section
            </button>
          </li>
          <li className={activeTab === "projects" ? "active" : ""}>
            <button onClick={() => setActiveTab("projects")}>
              <FiFolder /> Projects
            </button>
          </li>
          <li className={activeTab === "experience" ? "active" : ""}>
            <button onClick={() => setActiveTab("experience")}>
              <FiBriefcase /> Experience
            </button>
          </li>
          <li className={activeTab === "education" ? "active" : ""}>
            <button onClick={() => setActiveTab("education")}>
              <FiBook /> Education
            </button>
          </li>
          <li className={activeTab === "messages" ? "active" : ""}>
            <button onClick={() => setActiveTab("messages")}>
              <FiMessageSquare /> Messages ({stats?.unreadMessages || 0})
            </button>
          </li>
        </ul>
      </div>

      <div className="admin-content">
        {activeTab === "dashboard" && (
          <DashboardHome stats={stats} content={content} />
        )}

        {activeTab === "hero" && (
          <HeroEditor
            hero={content?.hero}
            onSave={handleSaveHero}
            onCancel={() => setEditingItem(null)}
          />
        )}

        {activeTab === "about" && (
          <AboutEditor
            about={content?.about}
            onSave={handleSaveAbout}
            onCancel={() => setEditingItem(null)}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsManager
            projects={content?.projects || []}
            onSave={handleSaveProject}
            onDelete={handleDeleteProject}
            showForm={showForm}
            setShowForm={setShowForm}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        {activeTab === "experience" && (
          <ExperienceManager
            experiences={content?.experiences || []}
            onSave={handleSaveExperience}
            onDelete={handleDeleteExperience}
            showForm={showForm}
            setShowForm={setShowForm}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        {activeTab === "education" && (
          <EducationManager
            education={content?.education || []}
            onSave={handleSaveEducation}
            onDelete={handleDeleteEducation}
            showForm={showForm}
            setShowForm={setShowForm}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
          />
        )}

        {activeTab === "messages" && (
          <MessagesManager
            messages={content?.messages || []}
            onMarkRead={handleMarkAsRead}
            onDelete={handleDeleteMessage}
          />
        )}
      </div>
    </div>
  );
}

// Dashboard Home Component
function DashboardHome({ stats, content }) {
  return (
    <div className="dashboard-home">
      <h2>Welcome to your Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <FiFolder className="stat-icon" />
          <div className="stat-info">
            <h3>{stats?.projects || 0}</h3>
            <p>Projects</p>
          </div>
        </div>

        <div className="stat-card">
          <FiBriefcase className="stat-icon" />
          <div className="stat-info">
            <h3>{stats?.experiences || 0}</h3>
            <p>Experiences</p>
          </div>
        </div>

        <div className="stat-card">
          <FiBook className="stat-icon" />
          <div className="stat-info">
            <h3>{stats?.education || 0}</h3>
            <p>Education</p>
          </div>
        </div>

        <div className="stat-card">
          <FiMessageSquare className="stat-icon" />
          <div className="stat-info">
            <h3>{stats?.unreadMessages || 0}</h3>
            <p>Unread Messages</p>
          </div>
        </div>
      </div>

      <div className="recent-messages">
        <h3>Recent Messages</h3>
        {content?.messages?.slice(0, 5).map((msg) => (
          <div key={msg._id} className={`message-item ${!msg.read ? 'unread' : ''}`}>
            <div className="message-header">
              <strong>{msg.name}</strong>
              <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{msg.email}</p>
            <p className="message-preview">{msg.message.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero Editor Component
function HeroEditor({ hero, onSave, onCancel }) {
  const [formData, setFormData] = useState(hero || {
    name: "",
    title: "",
    description: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="editor-form">
      <h2>Edit Hero Section</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FiSave /> Save Changes
          </button>
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            <FiX /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// About Editor Component
function AboutEditor({ about, onSave, onCancel }) {
  const [formData, setFormData] = useState(about || {
    paragraphs: [""],
    loves: [""],
    skills: [{ category: "", items: [""] }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addParagraph = () => {
    setFormData({
      ...formData,
      paragraphs: [...formData.paragraphs, ""],
    });
  };

  const updateParagraph = (index, value) => {
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = value;
    setFormData({ ...formData, paragraphs: newParagraphs });
  };

  const removeParagraph = (index) => {
    const newParagraphs = formData.paragraphs.filter((_, i) => i !== index);
    setFormData({ ...formData, paragraphs: newParagraphs });
  };

  const addLove = () => {
    setFormData({
      ...formData,
      loves: [...formData.loves, ""],
    });
  };

  const updateLove = (index, value) => {
    const newLoves = [...formData.loves];
    newLoves[index] = value;
    setFormData({ ...formData, loves: newLoves });
  };

  const removeLove = (index) => {
    const newLoves = formData.loves.filter((_, i) => i !== index);
    setFormData({ ...formData, loves: newLoves });
  };

  const addSkillCategory = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { category: "", items: [""] }],
    });
  };

  const updateSkillCategory = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkillItem = (categoryIndex) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items.push("");
    setFormData({ ...formData, skills: newSkills });
  };

  const updateSkillItem = (categoryIndex, itemIndex, value) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items[itemIndex] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const removeSkillItem = (categoryIndex, itemIndex) => {
    const newSkills = [...formData.skills];
    newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter(
      (_, i) => i !== itemIndex
    );
    setFormData({ ...formData, skills: newSkills });
  };

  const removeSkillCategory = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <div className="editor-form">
      <h2>Edit About Section</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Paragraphs</h3>
          {formData.paragraphs.map((p, index) => (
            <div key={index} className="array-item">
              <textarea
                value={p}
                onChange={(e) => updateParagraph(index, e.target.value)}
                rows="2"
                placeholder={`Paragraph ${index + 1}`}
              />
              <button
                type="button"
                className="btn-icon"
                onClick={() => removeParagraph(index)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-outline" onClick={addParagraph}>
            <FiPlus /> Add Paragraph
          </button>
        </div>

        <div className="form-section">
          <h3>What I Love</h3>
          {formData.loves.map((love, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={love}
                onChange={(e) => updateLove(index, e.target.value)}
                placeholder={`Item ${index + 1}`}
              />
              <button
                type="button"
                className="btn-icon"
                onClick={() => removeLove(index)}
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-outline" onClick={addLove}>
            <FiPlus /> Add Item
          </button>
        </div>

        <div className="form-section">
          <h3>Skills</h3>
          {formData.skills.map((category, catIndex) => (
            <div key={catIndex} className="skill-category-form">
              <div className="category-header">
                <input
                  type="text"
                  value={category.category}
                  onChange={(e) => updateSkillCategory(catIndex, "category", e.target.value)}
                  placeholder="Category (e.g., Frontend, Backend)"
                />
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => removeSkillCategory(catIndex)}
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <div className="skill-items">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="array-item">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateSkillItem(catIndex, itemIndex, e.target.value)}
                      placeholder="Skill"
                    />
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => removeSkillItem(catIndex, itemIndex)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => addSkillItem(catIndex)}
                >
                  + Add Skill
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-outline" onClick={addSkillCategory}>
            <FiPlus /> Add Skill Category
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FiSave /> Save Changes
          </button>
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            <FiX /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Projects Manager Component
function ProjectsManager({ projects, onSave, onDelete, showForm, setShowForm, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    tech: [""],
    demo: "",
    code: "",
  });

  const handleEdit = (project) => {
    setEditingItem(project);
    setFormData(project);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      tech: [""],
      demo: "",
      code: "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTech = () => {
    setFormData({
      ...formData,
      tech: [...formData.tech, ""],
    });
  };

  const updateTech = (index, value) => {
    const newTech = [...formData.tech];
    newTech[index] = value;
    setFormData({ ...formData, tech: newTech });
  };

  const removeTech = (index) => {
    const newTech = formData.tech.filter((_, i) => i !== index);
    setFormData({ ...formData, tech: newTech });
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Manage Projects</h2>
        <button className="btn btn-primary" onClick={handleNew}>
          <FiPlus /> Add New Project
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingItem ? "Edit Project" : "Add New Project"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Technologies</label>
                {formData.tech.map((tech, index) => (
                  <div key={index} className="array-item">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateTech(index, e.target.value)}
                      placeholder="e.g., React, Node.js"
                    />
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => removeTech(index)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                <button type="button" className="btn-link" onClick={addTech}>
                  + Add Technology
                </button>
              </div>

              <div className="form-group">
                <label>Demo URL</label>
                <input
                  type="url"
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group">
                <label>Code URL</label>
                <input
                  type="url"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave /> {editingItem ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  <FiX /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="items-grid">
        {projects.map((project) => (
          <div key={project._id} className="item-card">
            {project.image && (
              <div className="item-image">
                <img src={project.image} alt={project.name} />
              </div>
            )}
            <div className="item-content">
              <h3>{project.name}</h3>
              <p>{project.description.substring(0, 100)}...</p>
              <div className="item-tech">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
                {project.tech.length > 3 && <span>+{project.tech.length - 3}</span>}
              </div>
              <div className="item-actions">
                <button className="btn-icon" onClick={() => handleEdit(project)}>
                  <FiEdit />
                </button>
                <button className="btn-icon" onClick={() => onDelete(project._id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Experience Manager Component
function ExperienceManager({ experiences, onSave, onDelete, showForm, setShowForm, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    date: "",
    bullets: [""],
    tech: [""],
    icon: "",
  });

  const handleEdit = (exp) => {
    setEditingItem(exp);
    setFormData(exp);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      company: "",
      date: "",
      bullets: [""],
      tech: [""],
      icon: "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addBullet = () => {
    setFormData({
      ...formData,
      bullets: [...formData.bullets, ""],
    });
  };

  const updateBullet = (index, value) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData({ ...formData, bullets: newBullets });
  };

  const removeBullet = (index) => {
    const newBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData({ ...formData, bullets: newBullets });
  };

  const addTech = () => {
    setFormData({
      ...formData,
      tech: [...formData.tech, ""],
    });
  };

  const updateTech = (index, value) => {
    const newTech = [...formData.tech];
    newTech[index] = value;
    setFormData({ ...formData, tech: newTech });
  };

  const removeTech = (index) => {
    const newTech = formData.tech.filter((_, i) => i !== index);
    setFormData({ ...formData, tech: newTech });
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Manage Experience</h2>
        <button className="btn btn-primary" onClick={handleNew}>
          <FiPlus /> Add New Experience
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingItem ? "Edit Experience" : "Add New Experience"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Job Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date Range *</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g., May 2023 - November 2023"
                  required
                />
              </div>

              <div className="form-group">
                <label>Icon Class (optional)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., fas fa-code"
                />
              </div>

              <div className="form-group">
                <label>Bullet Points</label>
                {formData.bullets.map((bullet, index) => (
                  <div key={index} className="array-item">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => updateBullet(index, e.target.value)}
                      placeholder={`Bullet point ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => removeBullet(index)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                <button type="button" className="btn-link" onClick={addBullet}>
                  + Add Bullet Point
                </button>
              </div>

              <div className="form-group">
                <label>Technologies Used</label>
                {formData.tech.map((tech, index) => (
                  <div key={index} className="array-item">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateTech(index, e.target.value)}
                      placeholder="e.g., React, Node.js"
                    />
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => removeTech(index)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                <button type="button" className="btn-link" onClick={addTech}>
                  + Add Technology
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave /> {editingItem ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  <FiX /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="items-grid">
        {experiences.map((exp) => (
          <div key={exp._id} className="item-card">
            <div className="item-content">
              <h3>{exp.title}</h3>
              <p className="item-subtitle">{exp.company}</p>
              <p className="item-date">{exp.date}</p>
              <ul className="item-bullets">
                {exp.bullets.slice(0, 2).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
                {exp.bullets.length > 2 && <li>+{exp.bullets.length - 2} more</li>}
              </ul>
              <div className="item-tech">
                {exp.tech.slice(0, 3).map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
                {exp.tech.length > 3 && <span>+{exp.tech.length - 3}</span>}
              </div>
              <div className="item-actions">
                <button className="btn-icon" onClick={() => handleEdit(exp)}>
                  <FiEdit />
                </button>
                <button className="btn-icon" onClick={() => onDelete(exp._id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Education Manager Component
function EducationManager({ education, onSave, onDelete, showForm, setShowForm, editingItem, setEditingItem }) {
  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    year: "",
    bullets: [""],
  });

  const handleEdit = (edu) => {
    setEditingItem(edu);
    setFormData(edu);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setFormData({
      degree: "",
      school: "",
      year: "",
      bullets: [""],
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addBullet = () => {
    setFormData({
      ...formData,
      bullets: [...formData.bullets, ""],
    });
  };

  const updateBullet = (index, value) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData({ ...formData, bullets: newBullets });
  };

  const removeBullet = (index) => {
    const newBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData({ ...formData, bullets: newBullets });
  };

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Manage Education</h2>
        <button className="btn btn-primary" onClick={handleNew}>
          <FiPlus /> Add New Education
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingItem ? "Edit Education" : "Add New Education"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Degree *</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g., B.S. Computer Science"
                  required
                />
              </div>

              <div className="form-group">
                <label>School/Institution *</label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="e.g., The Catholic University of Eastern Africa"
                  required
                />
              </div>

              <div className="form-group">
                <label>Year/Graduation Date</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="e.g., 2024"
                />
              </div>

              <div className="form-group">
                <label>Bullet Points / Achievements</label>
                {formData.bullets.map((bullet, index) => (
                  <div key={index} className="array-item">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => updateBullet(index, e.target.value)}
                      placeholder={`Bullet point ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="btn-icon"
                      onClick={() => removeBullet(index)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                <button type="button" className="btn-link" onClick={addBullet}>
                  + Add Bullet Point
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave /> {editingItem ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                >
                  <FiX /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="items-grid">
        {education.map((edu) => (
          <div key={edu._id} className="item-card">
            <div className="item-content">
              <h3>{edu.degree}</h3>
              <p className="item-subtitle">{edu.school}</p>
              {edu.year && <p className="item-date">{edu.year}</p>}
              <ul className="item-bullets">
                {edu.bullets.slice(0, 2).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
                {edu.bullets.length > 2 && <li>+{edu.bullets.length - 2} more</li>}
              </ul>
              <div className="item-actions">
                <button className="btn-icon" onClick={() => handleEdit(edu)}>
                  <FiEdit />
                </button>
                <button className="btn-icon" onClick={() => onDelete(edu._id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Messages Manager Component
function MessagesManager({ messages, onMarkRead, onDelete }) {
  const [expandedMessage, setExpandedMessage] = useState(null);

  return (
    <div className="manager-section">
      <div className="section-header">
        <h2>Contact Messages</h2>
      </div>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p className="empty-state">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className={`message-card ${!msg.read ? 'unread' : ''}`}>
              <div className="message-header">
                <div className="message-sender">
                  <strong>{msg.name}</strong>
                  <span className="message-email">{msg.email}</span>
                </div>
                <div className="message-date">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              
              {msg.subject && (
                <div className="message-subject">
                  <strong>Subject:</strong> {msg.subject}
                </div>
              )}
              
              <div className="message-body">
                {expandedMessage === msg._id ? (
                  <p>{msg.message}</p>
                ) : (
                  <p>{msg.message.substring(0, 150)}...</p>
                )}
              </div>
              
              <div className="message-actions">
                <button
                  className="btn-link"
                  onClick={() => setExpandedMessage(
                    expandedMessage === msg._id ? null : msg._id
                  )}
                >
                  {expandedMessage === msg._id ? 'Show Less' : 'Read More'}
                </button>
                
                {!msg.read && (
                  <button
                    className="btn-link"
                    onClick={() => onMarkRead(msg._id)}
                  >
                    <FiCheck /> Mark as Read
                  </button>
                )}
                
                <button
                  className="btn-link text-danger"
                  onClick={() => onDelete(msg._id)}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}