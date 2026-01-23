require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// ----------------------------
// Middleware
// ----------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // if you want to serve static images like /images/george.jpg

// ----------------------------
// Health Check
// ----------------------------
app.get("/", (req, res) => {
  res.send("Portfolio backend is running 🚀");
});

// ----------------------------
// Contact Form Endpoint
// ----------------------------
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact form submission from ${name}`,
      text: message,
    });

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// ----------------------------
// Hero Section
// ----------------------------
app.get("/hero", (req, res) => {
  res.json({
    name: "George Nyongesa",
    title: "Software Developer | Full-Stack Engineer",
    description:
      "Building clean, maintainable solutions with code. Passionate about creating exceptional digital experiences.",
    image: "/images/george.jpg",
  });
});

// ----------------------------
// About Section
// ----------------------------
app.get("/about", (req, res) => {
  res.json({
    paragraphs: [
      "Enthusiastic Software Developer with hands-on experience in full-stack web development, skilled in modern technologies and passionate about building clean, maintainable solutions.",
      "Started my journey in computer science at The Catholic University of Eastern Africa, where I discovered my passion for creating digital solutions that solve real-world problems.",
      "Over the years, I've worked with various organizations, developing full-stack applications and providing technical solutions.",
    ],
    loves: [
      "Building user-centric applications",
      "Solving complex technical challenges",
      "Learning new technologies",
      "Creating maintainable, scalable code",
      "Mentoring and knowledge sharing",
    ],
    skills: [
      {
        category: "Languages",
        items: [
          "HTML",
          "CSS",
          "JavaScript",
          "TypeScript",
          "Python",
          "PHP",
          "Java",
          "C#",
        ],
      },
      {
        category: "Frameworks & Libraries",
        items: [
          "React",
          "Next.js",
          "Express",
          "Flask",
          "Bootstrap",
          "Tailwind css",
          "Node.js",
          "Django",
        ],
      },
      {
        category: "Databases",
        items: ["MySQL", "MongoDB", "PostgreSQL", "Firebase Firestore"],
      },
      { category: "Tools", items: ["Git", "Postman", "Notion", "VS Code"] },
      {
        category: "ML & AI",
        items: [
          "TensorFlow",
          "Scikit-learn",
          "Data Analysis",
          "Machine Learning",
        ],
      },
    ],
  });
});

// ----------------------------
// Experience Section
// ----------------------------
const EXPERIENCES = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    date: "2018 - Present | Nairobi, Kenya",
    bullets: [
      "Designed and developed responsive websites and web applications for individuals, startups, and small businesses",
      "Delivered full-stack solutions using Flask and Next.js, integrating both SQL and NoSQL databases",
      "Customized websites based on client requirements, ensuring optimal performance, usability, and scalability",
      "Managed hosting, deployment, and maintenance for client projects on platforms such as Vercel and Render",
      "Continuously upgraded skills in modern web technologies to meet evolving client and market demands",
    ],
    tech: [
      "Next.js",
      "Django",
      "Node.js",
      "Express.js",
      "MySQL",
      "MongoDB",
      "JavaScript",
      "Python",
    ],
    icon: "fas fa-laptop-code",
  },
  {
    title: "ICT Assistant",
    company: "Tipis Technologies",
    date: "May 2023 - Nov 2023 | Ongata Rongai, Kenya",
    bullets: [
      "Maintained computer systems and network infrastructure",
      "Provided technical support to staff and resolved IT issues",
      "Handled system backups and data management procedures",
      "Installed and configured network equipment and software",
    ],
    tech: ["Windows", "Linux", "Network Administration", "System Maintenance"],
    icon: "fas fa-tools",
  },
  {
    title: "ICT Attachee",
    company:
      "Ministry of Agriculture and Livestock Development - State Department of Livestock",
    date: "May 2022 - Aug 2022 | Nairobi, Kenya",
    bullets: [
      "Developed custom WordPress themes for departmental websites",
      "Repaired and maintained ICT equipment and hardware",
      "Supported LAN setup and network configuration",
      "Assisted in digital transformation initiatives",
    ],
    tech: ["WordPress", "PHP", "HTML", "CSS"],
    icon: "fas fa-server",
  },
  {
    title: "Data Entry & Analysis Assistant",
    company: "Reveries Holding Ltd",
    date: "Mar 2021 - Apr 2022 | Remote",
    bullets: [
      "Collected and compiled data from business websites and reputable public sources",
      "Entered, cleaned, and organized datasets in Excel for analysis and reporting",
      "Performed data validation to ensure accuracy and consistency across records",
      "Supported the analytics team in preparing datasets for dashboards and management reports",
    ],
    tech: ["Python", "Excel", "Data Analysis", "SQL"],
    icon: "fas fa-chart-line",
  },
];
app.get("/experience", (req, res) => res.json(EXPERIENCES));

// ----------------------------
// Education Section
// ----------------------------
const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "The Catholic University of Eastern Africa",
    year: "Awarded in 2025 | Nairobi, Kenya",
    bullets: [
      "Acquired in-depth knowledge of algorithms, data structures, and software design principles for building efficient systems",
      "Specialized in software engineering and full-stack web development, with proficiency in JavaScript, Python, Node.js, Django, and SQL",
      "Developed and deployed multiple web-based applications demonstrating problem-solving, teamwork, and agile development practices",
      "Completed a final-year research project on web system development, focusing on performance optimization, scheduling, and resource management",
      "Strengthened expertise in database design, API development, and version control through practical coursework and freelancing experience",
    ],
  },
];
app.get("/education", (req, res) => res.json(EDUCATION));

// ----------------------------
// Projects Section
// ----------------------------
const PROJECTS = [
  {
    name: "Personal Portfolio Website",
    description:
      "A responsive and interactive portfolio website built with React to showcase my projects, skills, and experience. Features include smooth animations, a dynamic project gallery, and a contact form integrated with a custom Node.js backend.",
    image: "images/portfolio.png",
    tech: ["React", "Node.js", "Express", "Axios"],
    demo: "https://george-nyongesa.netlify.app",
    code: "https://github.com/George-Nyongesa/portfolio-site-react-version",
  },

  {
    name: "AI-Powered Book Exchange System",
    description:
      "An intelligent book exchange platform that uses AI-based recommendations to match users with relevant books. Features include user authentication, book listing, search, and smart matching based on user preferences.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    tech: ["HTML", "CSS", "JavaScript", "Python", "MySQL", "TensorFlow Recommenders"],
    demo: "https://your-book-exchange-demo-link.com",
    code: "https://github.com/George-Nyongesa/Book-exchange-system",
  },

  {
    name: "Weather Forecast Application",
    description:
      "A modern weather application that fetches real-time weather data from a public API. Displays current conditions, forecasts, and location-based weather with a clean, responsive UI.",
    image:
      "images/weather.png",
    tech: ["React", "OpenWeather API", "JavaScript", "CSS"],
    demo: "https://weathrixweather.netlify.app/", 
    code: "https://github.com/George-Nyongesa/weather-app-26", 
  },
];

app.get("/projects", (req, res) => res.json(PROJECTS));

// ----------------------------
// Resume Download
// ----------------------------
app.get("/resume", (req, res) => {
  const resumePath = path.join(__dirname, "resume.pdf");
  res.download(resumePath, "George_Nyongesa_Resume.pdf", (err) => {
    if (err) {
      console.error("Failed to download resume:", err);
      res.status(500).send("Failed to download resume");
    }
  });
});

// ----------------------------
// Start Server
// ----------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
