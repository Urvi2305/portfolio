import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const TOKENS = {
  dark: {
    bg: "#0A0A0A",
    surface: "#111111",
    surfaceHover: "#181818",
    border: "#1F1F1F",
    borderAccent: "#2A2A2A",
    text: "#F0EDE8",
    textMuted: "#6B6560",
    textSecondary: "#9E9891",
    accent: "#C9A84C",
    accentDim: "#8B6E2E",
    accentBg: "rgba(201,168,76,0.08)",
  },
  light: {
    bg: "#F5F2ED",
    surface: "#FFFFFF",
    surfaceHover: "#FAF8F5",
    border: "#E5E0D8",
    borderAccent: "#D4CEC5",
    text: "#1A1714",
    textMuted: "#9A938A",
    textSecondary: "#6B6258",
    accent: "#A07830",
    accentDim: "#C49A50",
    accentBg: "rgba(160,120,48,0.08)",
  },
};

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

// ─── Animate-In Wrapper ───────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translateY(28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Portfolio Component ─────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const scrollY = useScrollY();
  const T = dark ? TOKENS.dark : TOKENS.light;

  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: ${T.bg}; color: ${T.text}; transition: background 0.3s, color 0.3s; }
    ::selection { background: ${T.accent}; color: #000; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: ${T.bg}; }
    ::-webkit-scrollbar-thumb { background: ${T.accent}; }
    a { color: inherit; text-decoration: none; }

    .nav-link {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: ${T.textMuted};
      cursor: pointer;
      transition: color 0.2s;
      padding: 4px 0;
      border-bottom: 1px solid transparent;
    }
    .nav-link:hover, .nav-link.active {
      color: ${T.accent};
      border-bottom-color: ${T.accent};
    }

    .tag {
      display: inline-block;
      padding: 3px 10px;
      border: 1px solid ${T.borderAccent};
      border-radius: 2px;
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${T.textSecondary};
      background: ${T.accentBg};
    }
    .tag-accent {
      border-color: ${T.accentDim};
      color: ${T.accent};
    }

    .exp-card {
      border-left: 1px solid ${T.border};
      padding-left: 28px;
      position: relative;
      transition: border-color 0.3s;
    }
    .exp-card::before {
      content: '';
      position: absolute;
      left: -5px; top: 6px;
      width: 9px; height: 9px;
      border-radius: 50%;
      background: ${T.accentDim};
      border: 2px solid ${T.bg};
      transition: background 0.3s;
    }
    .exp-card:hover { border-color: ${T.accentDim}; }
    .exp-card:hover::before { background: ${T.accent}; }

    .skill-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px;
      border: 1px solid ${T.border};
      border-radius: 4px;
      background: ${T.surface};
      font-family: 'DM Mono', monospace;
      font-size: 11.5px;
      color: ${T.textSecondary};
      letter-spacing: 0.04em;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
    }
    .skill-item:hover {
      border-color: ${T.accentDim};
      color: ${T.text};
      background: ${T.surfaceHover};
    }

    .proj-card {
      padding: 28px;
      border: 1px solid ${T.border};
      border-radius: 6px;
      background: ${T.surface};
      transition: border-color 0.25s, transform 0.25s;
    }
    .proj-card:hover {
      border-color: ${T.accentDim};
      transform: translateY(-3px);
    }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 28px;
      background: ${T.accent};
      color: #0A0A0A;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border: none; border-radius: 2px;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.2s;
      font-weight: 500;
    }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 26px;
      background: transparent;
      color: ${T.text};
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border: 1px solid ${T.border};
      border-radius: 2px;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-ghost:hover { border-color: ${T.accent}; color: ${T.accent}; }

    .live-link {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 12px;
      background: ${T.accentBg};
      border: 1px solid ${T.accentDim};
      border-radius: 2px;
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${T.accent};
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
      text-decoration: none;
    }
    .live-link:hover {
      background: rgba(201,168,76,0.16);
      border-color: ${T.accent};
    }

    .contact-input {
      width: 100%;
      padding: 14px 16px;
      background: ${T.surface};
      border: 1px solid ${T.border};
      border-radius: 4px;
      color: ${T.text};
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .contact-input:focus { border-color: ${T.accentDim}; }
    .contact-input::placeholder { color: ${T.textMuted}; }

    .section-label {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${T.accent};
    }

    .divider { height: 1px; background: ${T.border}; }

    /* ── Mobile Nav ── */
    .desktop-nav { display: flex; gap: 32px; align-items: center; }
    .hamburger-btn { display: none; }
    .mobile-menu {
      position: fixed; top: 60px; left: 0; right: 0; z-index: 98;
      background: ${dark ? "rgba(10,10,10,0.97)" : "rgba(245,242,237,0.97)"};
      backdrop-filter: blur(16px);
      border-bottom: 1px solid ${T.border};
      padding: 24px 32px;
      display: flex; flex-direction: column; gap: 24px;
    }
    .mobile-nav-link {
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${T.textMuted};
      cursor: pointer;
      transition: color 0.2s;
      padding: 4px 0;
      border-bottom: 1px solid transparent;
    }
    .mobile-nav-link:hover, .mobile-nav-link.active {
      color: ${T.accent};
      border-bottom-color: ${T.accent};
    }

    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .hamburger-btn { display: flex !important; }
      .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .hero-section { padding: 100px 20px 60px !important; }
      .section-pad { padding: 70px 20px !important; }
      .section-pad-sm { padding: 60px 20px !important; }
      .divider-wrap { padding: 0 20px !important; }
      .stats-grid { grid-template-columns: repeat(3, 1fr) !important; max-width: 100% !important; gap: 0 24px !important; }
      .proj-grid { grid-template-columns: 1fr !important; }
      .award-grid { grid-template-columns: 1fr !important; }
      .contact-cards { flex-direction: column !important; }
      .contact-card { width: 100% !important; }
      .hero-btns { flex-direction: column !important; }
      .hero-btns .btn-primary, .hero-btns .btn-ghost { width: 100%; justify-content: center; }
      .availability-chips { flex-direction: column !important; }
      .availability-chip { width: 100%; justify-content: center; }
      .proj-links { flex-wrap: wrap; }
      nav { padding: 0 20px !important; }
      footer { padding: 20px !important; flex-direction: column; gap: 8px; text-align: center; }
    }

    @media (max-width: 480px) {
      .stats-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      .hero-tags { gap: 6px !important; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    .cursor { display: inline-block; animation: blink 1s step-start infinite; }

    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-2%, -3%); }
      30% { transform: translate(3%, 2%); }
      50% { transform: translate(-1%, 4%); }
      70% { transform: translate(2%, -2%); }
      90% { transform: translate(-3%, 1%); }
    }
    .grain-overlay {
      position: fixed; inset: -200%;
      width: 400%; height: 400%;
      pointer-events: none;
      z-index: 999;
      opacity: ${dark ? 0.022 : 0.012};
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      animation: grain 0.5s steps(1) infinite;
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="grain-overlay" />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 32px", height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrollY > 40 ? (dark ? "rgba(10,10,10,0.92)" : "rgba(245,242,237,0.92)") : "transparent",
          backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
          borderBottom: scrollY > 40 ? `1px solid ${T.border}` : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <div
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.18em", color: T.accent, cursor: "pointer" }}
          onClick={() => scrollTo("hero")}
        >
          US<span style={{ color: T.textMuted }}>_</span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-nav">
          {navItems.map((item) => (
            <span
              key={item}
              className={`nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`}
              onClick={() => scrollTo(item)}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: "none", border: `1px solid ${T.border}`, borderRadius: 2,
              padding: "6px 12px", cursor: "pointer", color: T.textSecondary,
              fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.accentDim; e.currentTarget.style.color = T.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSecondary; }}
          >
            {dark ? "LIGHT" : "DARK"}
          </button>

          {/* Hamburger mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: `1px solid ${T.border}`, borderRadius: 2,
              padding: "6px 10px", cursor: "pointer", color: T.textSecondary,
              fontFamily: "'DM Mono', monospace", fontSize: 16, lineHeight: 1,
              transition: "border-color 0.2s, color 0.2s",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <span
              key={item}
              className={`mobile-nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`}
              onClick={() => scrollTo(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section
        id="hero"
        className="hero-section"
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          justifyContent: "flex-end", padding: "120px 32px 60px",
          maxWidth: 1100, margin: "0 auto", position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: "15%", right: "5%", width: 320, height: 320,
          borderRadius: "50%", background: `radial-gradient(circle, ${T.accentBg} 0%, transparent 70%)`,
          filter: "blur(60px)", pointerEvents: "none",
        }} />

        <Reveal delay={0}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ width: 28, height: 1, background: T.accent }} />
            <span className="section-label">Senior Backend Engineer</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(42px, 7vw, 88px)",
              fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em",
              color: T.text, marginBottom: 8,
            }}
          >
            Urvi S.<br />
            <span style={{ color: T.accent }}>Solanki</span>
            <span className="cursor" style={{ color: T.accentDim, marginLeft: 6 }}>_</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.75, color: T.textSecondary, marginTop: 20, marginBottom: 28 }}>
            Backend engineer with 5+ years designing distributed systems, event-driven pipelines, and scalable REST APIs.
            Currently architecting a UK-based precious metals trading platform serving{" "}
            <span style={{ color: T.text }}>100,000+ users</span>.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="hero-tags" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {["Node.js", "TypeScript", "Distributed Systems", "Kafka", "PostgreSQL", "AWS"].map((s) => (
              <span key={s} className="tag tag-accent">{s}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="availability-chips" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {[
              { label: "✦ Open to Relocate", sub: "US · Europe" },
              { label: "✦ Open to Remote", sub: "Worldwide" },
            ].map(({ label, sub }) => (
              <div
                key={label}
                className="availability-chip"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 16px",
                  border: `1px solid ${T.accentDim}`,
                  borderRadius: 2, background: T.accentBg,
                }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: T.accent, letterSpacing: "0.08em" }}>{label}</span>
                <span style={{ width: 1, height: 12, background: T.accentDim }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textSecondary, letterSpacing: "0.08em" }}>{sub}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Get in Touch →</button>
            <button className="btn-ghost" onClick={() => scrollTo("experience")}>View Experience</button>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={380}>
          <div
            className="stats-grid"
            style={{
              marginTop: 36, paddingTop: 28, borderTop: `1px solid ${T.border}`,
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0 48px", maxWidth: 420,
            }}
          >
            {[["5+", "Years Experience"], ["100K+", "Production Users"], ["6", "Products Shipped"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: T.accent, lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: T.textMuted, marginTop: 6, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ padding: "60px 32px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="about-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}
        >
          <Reveal direction="left">
            <span className="section-label">About</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, marginTop: 16, lineHeight: 1.1, color: T.text }}>
              Architect.<br />Builder.<br />Leader.
            </h2>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["Location", "Ahmedabad, India"],
                ["Email", "urvisolanki2318@gmail.com"],
                ["LinkedIn", "linkedin.com/in/urvi-solanki"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 12, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                  <span style={{ color: T.textMuted, minWidth: 68, textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</span>
                  <span style={{ color: T.textSecondary }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: T.textSecondary, marginBottom: 24 }}>
              I build backend systems that handle real scale and production infrastructure serving hundreds of thousands of users. My work centers on making complex distributed workflows reliable, observable, and fast.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: T.textSecondary, marginBottom: 32 }}>
              Currently leading a team of 10 engineers at Bacancy Technology, owning architecture end-to-end for a UK precious metals trading platform. I care deeply about zero-downtime migrations, event-driven fault tolerance, and pushing query performance to its limits.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Architecture Ownership", "Technical Design Reviews", "Sprint Planning", "Mentoring", "International Clients"].map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div className="divider" />
      </div>

      {/* ── SKILLS ── */}
      <section id="skills" className="section-pad" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <span className="section-label">Technical Skills</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, marginTop: 12, marginBottom: 56, color: T.text }}>
            Stack & Expertise
          </h2>
        </Reveal>

        {[
          { category: "Languages & Runtimes", items: ["Node.js", "TypeScript", "JavaScript", "PHP", "Python"] },
          { category: "Frameworks & ORMs", items: ["Express.js", "Laravel", "Prisma ORM"] },
          { category: "Databases", items: ["PostgreSQL", "MySQL", "Redis"] },
          { category: "Infrastructure & Cloud", items: ["AWS (SES, S3, SNS)", "Kafka", "Docker", "WebSocket"] },
          {
            category: "Architecture",
            items: ["Distributed Systems", "Event-Driven Architecture", "REST APIs", "Real-Time Systems", "Async Processing", "Fault Tolerance"],
          },
          { category: "Observability & Integrations", items: ["DataDog", "OpenAI API", "Deepgram", "Stripe", "Royal Mail API"] },
        ].map((group, gi) => (
          <Reveal key={group.category} delay={gi * 60}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: T.textMuted, marginBottom: 14 }}>
                {group.category}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
                {group.items.map((item) => (
                  <div key={item} className="skill-item">
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.accentDim, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <div className="divider-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div className="divider" />
      </div>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section-pad" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <span className="section-label">Career</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, marginTop: 12, marginBottom: 64, color: T.text }}>
            Experience
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
          {[
            {
              company: "Bacancy Technology",
              role: "Senior Backend Engineer · Project Lead",
              period: "Mar 2025 – Present",
              location: "Ahmedabad",
              highlights: [
                "Owned full backend architecture for a UK-based precious metals trading platform (goldbank.co.uk) serving 100,000+ production users stack selection, API design, and end-to-end delivery.",
                "Achieved 20–40% query latency reduction via indexing, query optimization, and schema restructuring.",
                "Built centralized WebSocket price-streaming service used by 6 internal projects with Redis caching for sub-second responses.",
                "Introduced Kafka-based event streaming for trade workflows enabling reliable async processing.",
                "Executed zero-downtime migration of 100,000+ users, orders, and transactions with no data loss.",
                "Containerized platform using Docker across 3 repositories. Enforced strict TypeScript with Prisma ORM.",
                "Integrated Royal Mail API for physical delivery with a Kafka-backed fallback retry queue.",
                "Led architecture reviews, sprint planning, and mentoring across a 10-engineer team.",
              ],
              stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS"],
            },
            {
              company: "Citrusbug Technolabs",
              role: "Senior Backend Engineer",
              period: "Sept 2022 – Feb 2025",
              location: "Ahmedabad",
              highlights: [
                "Designed and maintained distributed backend services for global products using Node.js and Laravel.",
                "Built real-time voice streaming pipelines using Deepgram and OpenAI integrations.",
                "Integrated Meta, Twitter/X, and Stripe APIs with reliability safeguards.",
                "Introduced DataDog for observability and structured logging.",
                "Implemented unit testing and load testing strategies.",
                "Mentored engineers and established coding standards.",
              ],
              stack: ["Node.js", "Laravel", "Deepgram", "OpenAI", "Stripe", "DataDog"],
            },
            {
              company: "ARK Infosoft",
              role: "Backend Developer · Data Engineer",
              period: "Jun 2021 – Jul 2022",
              location: "Ahmedabad",
              highlights: [
                "Built Python-based ETL pipelines to automate data ingestion, transformation, and loading, improving data availability and reducing manual effort by 60%.",
              ],
              stack: ["Python", "ETL", "Data Pipelines"],
            },
          ].map((exp, i) => (
            <Reveal key={exp.company} delay={i * 80}>
              <div className="exp-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: T.text }}>{exp.role}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: T.accent, marginTop: 4 }}>{exp.company}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textMuted, letterSpacing: "0.1em" }}>{exp.period}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textMuted, marginTop: 3 }}>{exp.location}</div>
                  </div>
                </div>

                <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} style={{ display: "flex", gap: 12, fontSize: 14, lineHeight: 1.7, color: T.textSecondary }}>
                      <span style={{ color: T.accentDim, marginTop: 3, flexShrink: 0 }}>—</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {exp.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div className="divider" />
      </div>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-pad" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <span className="section-label">Work</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, marginTop: 12, marginBottom: 56, color: T.text }}>
            Projects
          </h2>
        </Reveal>

        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[
            {
              name: "Gold-Bank Precious Metals Trading Platform",
              context: "UK's oldest bullion dealer (est. 1986) processing millions in precious metals transactions monthly.",
              sub: "UK-based B2C trading platform · 100,000+ customers",
              period: "May 2025 – Present",
              description:
                "Designed system architecture and APIs end-to-end, leading a 10-engineer team. Migrated 100,000+ users and transactions with zero data loss. Built shared WebSocket + Redis + REST fallback system used by 6 projects. Introduced Kafka event streaming and Dockerized the full service layer. Integrated Royal Mail for physical goods dispatch with a Kafka-backed retry queue.",
              stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "WebSocket", "Prisma", "Docker", "AWS SNS/S3", "Royal Mail API"],
              liveUrl: "https://goldbank.co.uk",
              liveLabel: "goldbank.co.uk ↗",
              liveNote: "Trusted Since 1986 · 100K+ customers",
            },
            {
              name: "Airyis AI-Powered Digital Marketing Platform",
              context: "Multi-channel content publishing platform with AI automation for marketing teams.",
              sub: "Multi-channel content publishing · AI automation",
              period: "2024",
              description:
                "Built backend integrating OpenAI for content generation and multi-channel publishing. Implemented Stripe payments with idempotency and webhook reconciliation. Connected Meta Graph API and Twitter/X API with reliability safeguards.",
              stack: ["Node.js", "TypeScript", "OpenAI", "Stripe", "AWS SNS", "Meta Graph API", "Twitter/X API"],
              liveUrl: null,
              liveLabel: null,
              liveNote: null,
            },
            {
              name: "IM AI Avatar Generator App",
              context: "Consumer mobile app for AI-generated profile pictures live on the App Store.",
              sub: "Async AI image generation · iOS App Store",
              period: "2023 – 2024",
              description:
                "Built an async job queue for Leap AI with back-pressure handling and failure reporting. Designed for scale with graceful degradation under load.",
              stack: ["PHP", "Laravel", "Async Job Queue", "Leap AI"],
              liveUrl: "https://apps.apple.com/us/app/im-ai-avatar-new-profile-pic/id6446428782",
              liveLabel: "App Store ↗",
              liveNote: "Live on iOS · AI Avatar Generator",
            },
          ].map((proj, i) => (
            <Reveal key={proj.name} delay={i * 90}>
              <div className="proj-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Period */}
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
                  {proj.period}
                </div>

                {/* Context line new */}
                <div style={{
                  padding: "8px 12px", marginBottom: 16,
                  background: T.accentBg, borderLeft: `2px solid ${T.accentDim}`,
                  borderRadius: "0 3px 3px 0",
                }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, lineHeight: 1.6, color: T.textSecondary, letterSpacing: "0.03em" }}>
                    {proj.context}
                  </p>
                </div>

                {/* Title */}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: T.text, lineHeight: 1.3, marginBottom: 6 }}>
                  {proj.name}
                </div>

                {/* Sub */}
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.accent, marginBottom: 14 }}>
                  {proj.sub}
                </div>

                {/* Live link new */}
                {proj.liveUrl && (
                  <div className="proj-links" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="live-link"
                    >
                      <span style={{ fontSize: 8 }}>●</span>
                      {proj.liveLabel}
                    </a>
                    {proj.liveNote && (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.textMuted, letterSpacing: "0.06em" }}>
                        {proj.liveNote}
                      </span>
                    )}
                  </div>
                )}

                {/* Description */}
                <p style={{ fontSize: 13.5, lineHeight: 1.75, color: T.textSecondary, marginBottom: 20, flex: 1 }}>
                  {proj.description}
                </p>

                {/* Stack */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {proj.stack.map((s) => <span key={s} className="tag" style={{ fontSize: 9 }}>{s}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div className="divider" />
      </div>

      {/* ── ACHIEVEMENTS ── */}
      <section className="section-pad-sm" style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <span className="section-label">Recognition</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, marginTop: 12, marginBottom: 48, color: T.text }}>
            Awards & Certifications
          </h2>
        </Reveal>
        <div className="award-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { title: "AI Integration Hackathon", org: "Bacancy Technology", when: "March 2023", note: "Led team, owned architecture, shipped production-ready AI integration under tight deadline." },
            { title: "Employee of the Quarter", org: "Citrusbug Technolabs", when: "April 2024", note: "Recognized for technical ownership during concurrent AI integration and platform scaling delivery." },
            { title: "Employee of the Quarter", org: "Bacancy Technology", when: "July 2025", note: "Awarded for on-time delivery, architecture ownership, and raising engineering standards through mentoring." },
            { title: "Spot Award", org: "Bacancy Technology", when: "Nov 2025", note: "Fast, effective problem-solving during complex distributed systems delivery keeping team unblocked." },
          ].map((a, i) => (
            <Reveal key={a.title + a.when} delay={i * 60}>
              <div style={{ padding: "22px 20px", border: `1px solid ${T.border}`, borderRadius: 4, background: T.surface }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                  {a.when} · {a.org}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: T.text, marginBottom: 10 }}>{a.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: T.textSecondary }}>{a.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider-wrap" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div className="divider" />
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ padding: "100px 32px 80px", maxWidth: 760, margin: "0 auto" }}>
        <Reveal>
          <span className="section-label">Contact</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, marginTop: 12, marginBottom: 16, color: T.text }}>
            Let's Build Something
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: T.textSecondary, marginBottom: 24 }}>
            Open to senior engineering roles and technical leadership positions. Based in Ahmedabad actively targeting opportunities in the{" "}
            <span style={{ color: T.text }}>US and Europe</span>, available fully remote or willing to relocate.
          </p>
          <div className="availability-chips" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
            {[
              { text: "✦ Open to Relocate", detail: "US · EU" },
              { text: "✦ Open to Remote", detail: "Worldwide" },
            ].map(({ text, detail }) => (
              <div
                key={text}
                className="availability-chip"
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 16px",
                  border: `1px solid ${T.accentDim}`,
                  borderRadius: 2, background: T.accentBg,
                }}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: T.accent }}>{text}</span>
                <span style={{ width: 1, height: 12, background: T.accentDim }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textSecondary }}>{detail}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="hero-btns" style={{ display: "flex", gap: 14, marginBottom: 40, flexWrap: "wrap" }}>
            <a href="mailto:urvisolanki2318@gmail.com" className="btn-primary">
              urvisolanki2318@gmail.com →
            </a>
            <a href="https://linkedin.com/in/urvi-solanki" target="_blank" rel="noreferrer" className="btn-ghost">
              LinkedIn ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="contact-cards" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[["Phone", "+91 93271 87418"], ["Location", "Ahmedabad, India"], ["Languages", "English · Hindi · Gujarati"]].map(([k, v]) => (
              <div
                key={k}
                className="contact-card"
                style={{ padding: "14px 18px", border: `1px solid ${T.border}`, borderRadius: 4, background: T.surface, flex: 1, minWidth: 140 }}
              >
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>{k}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: T.textSecondary }}>{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "28px 32px", borderTop: `1px solid ${T.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textMuted, letterSpacing: "0.1em" }}>
          URVI S. SOLANKI · SENIOR BACKEND ENGINEER
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textMuted, letterSpacing: "0.1em" }}>
          AHMEDABAD, INDIA
        </span>
      </footer>
    </>
  );
}