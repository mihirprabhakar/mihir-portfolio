import { useState, useEffect } from "react";
import "./App.css";

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

const SKILLS = {
  Languages: ["JavaScript (ES6+)", "C", "C++", "Java", "Python"],
  Frontend: ["React.js", "React Router", "Context API", "HTML5", "CSS3", "Vite"],
  Backend: ["Node.js", "Express.js", "REST APIs", "EJS", "MVC Architecture"],
  Database: ["MongoDB", "Mongoose", "MySQL", "Aggregation Pipelines"],
  Security: ["JWT", "bcrypt", "RBAC", "Middleware Design"],
  "Tools & Others": ["Git", "GitHub", "Postman", "Figma", "VS Code", "Google Colab", "Multer", "Tesseract.js"],
  "CS Fundamentals": ["DSA", "OOPs", "DBMS", "Operating Systems", "Computer Networks"],
};

const PROJECTS = [
  {
    title: "OCR-Based Document Management System",
    subtitle: "Role-Based Access Control & ERP Integration",
    desc: "A full-stack MERN application that automates document scanning, OCR-based data extraction, and ERP/SAP integration with enterprise-grade role-based access control.",
    bullets: [
      "Built OCR data extraction from invoices, gate entries & purchase orders using Tesseract.js",
      "Designed RBAC with 7 granular permissions enforced via custom Express middleware at both API & UI level",
      "Engineered 3-strategy intelligent field extraction engine with OCR post-processing for real-world scanned documents",
      "Implemented JWT auth with bcrypt & Super Admin protection preventing privilege escalation",
      "Built end-to-end scan workflow: Upload → OCR → Extraction → Verification → SAP Push with history & JSON export",
      "Created analytics dashboard using MongoDB aggregation pipelines ($lookup, $group, $unwind)",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tesseract.js", "JWT", "bcrypt", "Multer", "pdf-to-img"],
    date: "April 2026 – June 2026",
    tag: "MERN · Enterprise",
    github: "https://github.com/mihirprabhakar/ocr-project",
  },
  {
    title: "E-commerce Monolithic Web Application",
    subtitle: "Full-Stack Platform with Multi-Role Access",
    desc: "A full-stack e-commerce platform built with MERN stack following a monolithic architecture with role-based access control and JWT authentication.",
    bullets: [
      "Built 18 REST API endpoints across 6 modules with MVC architecture and clean separation of concerns",
      "Implemented JWT authentication and RBAC for admin, vendor and customer roles",
      "Built complete CRUD modules for users, products & categories with validation, pagination, search & soft delete",
      "Integrated Multer for file upload with memory buffer storage",
      "Developed React.js frontend with Vite, 18 configured routes and 14 reusable UI components",
      "Tested 34+ API scenarios in Postman covering authentication, authorization and data validation",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "bcryptjs", "Multer", "Vite", "React Router DOM"],
    date: "June 2026 – Aug 2026",
    tag: "MERN · E-commerce",
    github: "https://github.com/mihirprabhakar/e-commerce-project-",
  },
  {
    title: "Color Matching Grid Game",
    subtitle: "Interactive Browser Game",
    desc: "An interactive browser game where players clear adjacent color blocks with gravity mechanics, undo feature, and countdown timer.",
    bullets: [
      "Built using HTML, CSS, and JavaScript with gravity simulation and adjacent block clearing logic",
      "Implemented undo functionality and countdown timer for gameplay challenge",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    date: "May 2024",
    tag: "Frontend · Game",
    github: "https://github.com/mihirprabhakar/Color-matching-Grid-Game",
  },
];

const EDUCATION = [
  {
    institution: "Dronacharya Group of Institutions",
    degree: "B.Tech Computer Science & Engineering",
    period: "2023 – 2027",
    detail: "Currently in 3rd year · CGPA: 8.0",
  },
  {
    institution: "The Adarsh School",
    degree: "Class 12 — Science (PCM)",
    period: "2022 – 2023",
    detail: "88% — Strong analytical & problem-solving skills",
  },
  {
    institution: "The Adarsh School",
    degree: "Class 10",
    period: "2020 – 2021",
    detail: "84% — Consistent academic performance",
  },
];

export default function App() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [typed, setTyped] = useState("");

  const roles = ["Full Stack Developer", "MERN Stack Developer", "DSA Enthusiast", "Backend Engineer"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), 80);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(r => (r + 1) % roles.length);
    }
    setTyped(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (section) => {
    setActive(section);
    setMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFormStatus("");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_emwuqmd",
          template_id: "template_eczxova",
          user_id: "bDzKjU5FvK9rkOGxc",
          template_params: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
    setSending(false);
  };

  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">
          <span className="brand-dot">&lt;</span>MP<span className="brand-dot">/&gt;</span>
        </div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(link => (
            <button key={link} className={`nav-link ${active === link ? "nav-active" : ""}`} onClick={() => handleNav(link)}>
              {link}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(m => !m)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="About" className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-content reveal">
          <p className="hero-eyebrow">👋 Hello, I'm</p>
          <h1 className="hero-name">Mihir Prabhakar</h1>
          <div className="hero-role">
            <span className="typed-text">{typed}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-bio">
            3rd-year B.Tech CSE student at Dronacharya Group of Institutions, passionate about building
            scalable full-stack applications. Proficient in MERN stack, DSA, and system design.
            Solved <span className="highlight">330+ DSA problems</span> on LeetCode & GeeksForGeeks.
          </p>
          <div className="hero-actions">
            <a href="https://www.linkedin.com/in/mihir-prabhakar-952869291/" target="_blank" rel="noreferrer" className="btn btn-primary">LinkedIn</a>
            <a href="https://github.com/mihirprabhakar" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
            <button className="btn btn-ghost" onClick={() => handleNav("Contact")}>Hire Me</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">330+</span><span className="stat-label">DSA Problems</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">2</span><span className="stat-label">MERN Projects</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">8.0</span><span className="stat-label">CGPA</span></div>
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="code-card">
            <div className="code-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="code-filename">mihir.js</span>
            </div>
            <pre className="code-body">{`const mihir = {
  role: "Full Stack Developer",
  stack: ["React", "Node", 
          "Express", "MongoDB"],
  dsa: "330+ problems solved",
  focus: "Building scalable
          web applications",
  status: "Open to opportunities"
};`}</pre>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="Skills" className="section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-eyebrow">What I work with</span>
            <h2 className="section-title">Technical Skills</h2>
          </div>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} className="skill-card reveal">
                <h3 className="skill-cat">{cat}</h3>
                <div className="skill-tags">
                  {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="dsa-banner reveal">
            <div className="dsa-icon">🧠</div>
            <div>
              <p className="dsa-title">Data Structures & Algorithms</p>
              <p className="dsa-sub">Solved <strong>330+ problems</strong> across LeetCode & GeeksForGeeks — Arrays, Trees, Graphs, DP, Recursion & more</p>
            </div>
            <div className="dsa-links">
              <a href="https://leetcode.com/u/mihirprabhakar/" target="_blank" rel="noreferrer" className="dsa-link">LeetCode ↗</a>
              <a href="https://www.geeksforgeeks.org/profile/mihirprabhakar" target="_blank" rel="noreferrer" className="dsa-link">GFG ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="Projects" className="section section-alt">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-eyebrow">What I've built</span>
            <h2 className="section-title">Projects</h2>
          </div>
          <div className="projects-list">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card reveal">
                <div className="project-top">
                  <div>
                    <span className="project-tag">{p.tag}</span>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-subtitle">{p.subtitle}</p>
                  </div>
                  <span className="project-date">{p.date}</span>
                </div>
                <p className="project-desc">{p.desc}</p>
                <ul className="project-bullets">
                  {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="project-footer">
                  <div className="project-stack">
                    {p.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
                  </div>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-link">View on GitHub ↗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="Experience" className="section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-eyebrow">Where I've worked</span>
            <h2 className="section-title">Experience</h2>
          </div>
          <div className="timeline reveal">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="tl-header">
                  <div>
                    <h3 className="tl-role">Full Stack Developer Intern</h3>
                    <p className="tl-company">Internship Program</p>
                  </div>
                  <span className="tl-period">June 2026 – August 2026</span>
                </div>
                <ul className="tl-bullets">
                  <li>Developed a monolithic e-commerce web application with Node.js REST API backend and React.js frontend</li>
                  <li>Implemented JWT authentication and role-based access control for admin, vendor and customer roles</li>
                  <li>Built complete CRUD APIs for users, products & categories with validation, pagination, search and soft delete</li>
                  <li>Developed React.js frontend with Vite, configured 18 routes and created 14 reusable UI components</li>
                  <li>Tested 34+ API scenarios in Postman covering authentication, authorization and data validation</li>
                </ul>
                <div className="tl-stack">
                  {["React.js", "Node.js", "Express.js", "MongoDB", "JWT"].map(t => (
                    <span key={t} className="stack-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="Education" className="section section-alt">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-eyebrow">My academic background</span>
            <h2 className="section-title">Education</h2>
          </div>
          <div className="edu-grid">
            {EDUCATION.map((e, i) => (
              <div key={i} className="edu-card reveal">
                <div className="edu-icon">{i === 0 ? "🎓" : "📚"}</div>
                <div>
                  <h3 className="edu-degree">{e.degree}</h3>
                  <p className="edu-inst">{e.institution}</p>
                  <p className="edu-detail">{e.detail}</p>
                </div>
                <span className="edu-period">{e.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" className="section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-eyebrow">Let's work together</span>
            <h2 className="section-title">Get In Touch</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <p className="contact-intro">I'm currently open to internship opportunities and full-time roles. Whether you have a project in mind or just want to connect — my inbox is always open!</p>
              <div className="contact-links">
                <a href="mailto:mihirprabhakar6@gmail.com" className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>mihirprabhakar6@gmail.com</span>
                </a>
                <a href="tel:+919811186847" className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>+91-9811186847</span>
                </a>
                <a href="https://www.linkedin.com/in/mihir-prabhakar-952869291/" target="_blank" rel="noreferrer" className="contact-item">
                  <span className="contact-icon">💼</span>
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://github.com/mihirprabhakar" target="_blank" rel="noreferrer" className="contact-item">
                  <span className="contact-icon">🐙</span>
                  <span>github.com/mihirprabhakar</span>
                </a>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about the opportunity..."
                  value={formData.message}
                  onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>
              {formStatus === "success" && <p className="form-success">✅ Message sent! I'll get back to you soon.</p>}
              {formStatus === "error" && <p className="form-error">❌ Something went wrong. Please email me directly.</p>}
              <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Designed & Built by <span className="highlight">Mihir Prabhakar</span> · 2026</p>
        <p className="footer-sub">B.Tech CSE · Full Stack Developer · MERN Stack</p>
      </footer>
    </div>
  );
}