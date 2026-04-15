import { useState, useEffect, useRef } from "react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
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

// ─── Global Spacing System ──────────────────────────────────────────────────────
const SP = {
  sectionV: "88px",
  sectionH: "32px",
  sectionHMobile: "20px",
  sectionVMobile: "64px",
  maxW: "1100px",
  maxWNarrow: "900px",
  headingSize: "44px",
  headingMt: "12px",
  headingMb: "56px",
  cardPad: "28px",
  cardGap: "20px",
  dividerPad: "0 32px",
};

function Section({ id, children, narrow = false, className = "", extraStyle = {} }) {
  return (
    <section
      id={id}
      className={`section-pad${className ? ` ${className}` : ""}`}
      style={{
        padding: `${SP.sectionV} ${SP.sectionH}`,
        maxWidth: narrow ? SP.maxWNarrow : SP.maxW,
        margin: "0 auto",
        ...extraStyle,
      }}
    >
      {children}
    </section>
  );
}

function SectionHeading({ label, title, mb = SP.headingMb }) {
  return (
    <>
      <span className="section-label">{label}</span>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: SP.headingSize,
          fontWeight: 700,
          marginTop: SP.headingMt,
          marginBottom: mb,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
    </>
  );
}

function Divider({ maxW = SP.maxW }) {
  return (
    <div className="divider-wrap" style={{ maxWidth: maxW, margin: "0 auto", padding: SP.dividerPad }}>
      <div className="divider" />
    </div>
  );
}

// ─── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
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

// ─── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(28px)", left: "translateX(-28px)", right: "translateX(28px)", none: "none" };
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

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ proj, T }) {
  return (
    <div className="proj-card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.textMuted, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {proj.period}
        </div>
        {proj.liveUrl && (
          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="live-link">
            <span style={{ fontSize: 8 }}>●</span>
            {proj.liveLabel}
          </a>
        )}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: T.text, lineHeight: 1.3, marginBottom: 6 }}>
        {proj.name}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.accent, letterSpacing: "0.06em", marginBottom: 20 }}>
        {proj.sub}
      </div>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 20 }}>
        {proj.highlights.map((h, i) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, lineHeight: 1.65, color: T.textSecondary }}>
            <span style={{ color: T.accentDim, flexShrink: 0, marginTop: 2 }}>—</span>
            {h}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {proj.stack.map((s) => (
          <span key={s} className="tag" style={{ fontSize: 9 }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Portfolio ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const scrollY = useScrollY();
  const T = dark ? TOKENS.dark : TOKENS.light;

  const navItems = ["About", "Skills", "Experience", "Projects", "Contact"];

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY]);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ─── Global CSS ─────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; background: ${T.bg}; color: ${T.text}; transition: background 0.3s, color 0.3s; }
    h2 { color: ${T.text}; }
    ::selection { background: ${T.accent}; color: #000; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: ${T.bg}; }
    ::-webkit-scrollbar-thumb { background: ${T.accent}; }
    a { color: inherit; text-decoration: none; }

    .nav-link {
      font-family: 'DM Mono', monospace; font-size: 11px;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: ${T.textMuted}; cursor: pointer;
      transition: color 0.2s; padding: 4px 0;
      border-bottom: 1px solid transparent;
    }
    .nav-link:hover, .nav-link.active { color: ${T.accent}; border-bottom-color: ${T.accent}; }

    .tag {
      display: inline-block; padding: 3px 10px;
      border: 1px solid ${T.borderAccent}; border-radius: 2px;
      font-family: 'DM Mono', monospace; font-size: 10px;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: ${T.textSecondary}; background: ${T.accentBg};
    }
    .tag-accent { border-color: ${T.accentDim}; color: ${T.accent}; }

    .exp-card {
      border-left: 1px solid ${T.border}; padding-left: 28px;
      position: relative; transition: border-color 0.3s;
    }
    .exp-card::before {
      content: ''; position: absolute; left: -5px; top: 6px;
      width: 9px; height: 9px; border-radius: 50%;
      background: ${T.accentDim}; border: 2px solid ${T.bg}; transition: background 0.3s;
    }
    .exp-card:hover { border-color: ${T.accentDim}; }
    .exp-card:hover::before { background: ${T.accent}; }

    .skill-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px; border: 1px solid ${T.border};
      border-radius: 4px; background: ${T.surface};
      font-family: 'DM Mono', monospace; font-size: 11.5px;
      color: ${T.textSecondary}; letter-spacing: 0.04em;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
    }
    .skill-item:hover { border-color: ${T.accentDim}; color: ${T.text}; background: ${T.surfaceHover}; }

    .proj-card {
      padding: ${SP.cardPad}; border: 1px solid ${T.border};
      border-radius: 6px; background: ${T.surface};
      transition: border-color 0.25s, transform 0.25s;
    }
    .proj-card:hover { border-color: ${T.accentDim}; transform: translateY(-3px); }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 28px; background: ${T.accent}; color: #0A0A0A;
      font-family: 'DM Mono', monospace; font-size: 11px;
      letter-spacing: 0.14em; text-transform: uppercase;
      border: none; border-radius: 2px; cursor: pointer;
      transition: opacity 0.2s, transform 0.2s; font-weight: 500;
    }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 26px; background: transparent; color: ${T.text};
      font-family: 'DM Mono', monospace; font-size: 11px;
      letter-spacing: 0.14em; text-transform: uppercase;
      border: 1px solid ${T.border}; border-radius: 2px; cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .btn-ghost:hover { border-color: ${T.accent}; color: ${T.accent}; }

    .live-link {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 5px 10px; background: ${T.accentBg};
      border: 1px solid ${T.accentDim}; border-radius: 2px;
      font-family: 'DM Mono', monospace; font-size: 10px;
      letter-spacing: 0.1em; text-transform: uppercase; color: ${T.accent};
      cursor: pointer; transition: background 0.2s, border-color 0.2s; text-decoration: none;
    }
    .live-link:hover { background: rgba(201,168,76,0.16); border-color: ${T.accent}; }

    .section-label {
      font-family: 'DM Mono', monospace; font-size: 10px;
      letter-spacing: 0.2em; text-transform: uppercase; color: ${T.accent};
      display: block;
    }

    .divider { height: 1px; background: ${T.border}; }

    .desktop-nav { display: flex; gap: 32px; align-items: center; }
    .hamburger-btn { display: none; }
    .mobile-menu {
      position: fixed; top: 60px; left: 0; right: 0; z-index: 98;
      background: ${dark ? "rgba(10,10,10,0.97)" : "rgba(245,242,237,0.97)"};
      backdrop-filter: blur(16px); border-bottom: 1px solid ${T.border};
      padding: 24px 32px; display: flex; flex-direction: column; gap: 24px;
    }
    .mobile-nav-link {
      font-family: 'DM Mono', monospace; font-size: 13px;
      letter-spacing: 0.14em; text-transform: uppercase; color: ${T.textMuted};
      cursor: pointer; transition: color 0.2s; padding: 4px 0;
      border-bottom: 1px solid transparent;
    }
    .mobile-nav-link:hover, .mobile-nav-link.active { color: ${T.accent}; border-bottom-color: ${T.accent}; }

    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .hamburger-btn { display: flex !important; }
      .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
      .section-pad { padding: ${SP.sectionVMobile} ${SP.sectionHMobile} !important; }
      .divider-wrap { padding: 0 ${SP.sectionHMobile} !important; }
      .stats-grid { grid-template-columns: repeat(3, 1fr) !important; max-width: 100% !important; gap: 0 24px !important; }
      .proj-grid { grid-template-columns: 1fr !important; }
      .award-grid { grid-template-columns: 1fr !important; }
      .contact-cards { flex-direction: column !important; }
      .contact-card { width: 100% !important; }
      .hero-btns { flex-direction: column !important; }
      .hero-btns .btn-primary, .hero-btns .btn-ghost { width: 100%; justify-content: center; }
      .availability-chips { flex-direction: column !important; }
      .availability-chip { width: 100%; justify-content: center; }
      nav { padding: 0 ${SP.sectionHMobile} !important; }
      footer { padding: 20px !important; flex-direction: column; gap: 8px; text-align: center; }
    }
    @media (max-width: 480px) {
      .stats-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      .hero-tags { gap: 6px !important; }
    }

    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    .cursor { display: inline-block; animation: blink 1s step-start infinite; }

    @keyframes grain {
      0%, 100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); }
      30% { transform: translate(3%,2%); } 50% { transform: translate(-1%,4%); }
      70% { transform: translate(2%,-2%); } 90% { transform: translate(-3%,1%); }
    }
    .grain-overlay {
      position: fixed; inset: -200%; width: 400%; height: 400%;
      pointer-events: none; z-index: 999; opacity: ${dark ? 0.022 : 0.012};
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      animation: grain 0.5s steps(1) infinite;
    }
  `;

  // ─── Data ──────────────────────────────────────────────────────────────────
  const projects = [
    {
      name: "Gold-Bank Precious Metals Trading Platform",
      sub: "UK-based B2C · 100,000+ customers · Est. 1986",
      period: "May 2025 - Present",
      liveUrl: "https://goldbank.co.uk",
      liveLabel: "goldbank.co.uk ↗",
      highlights: [
        "Resolved a live production failure where 6 systems were independently hitting a pricing API every 3 seconds, causing service disruption during active transactions.",
        "Built a centralized WebSocket streaming service with Redis fallback consistent real-time pricing across all systems, one upstream dependency.",
        "Zero-downtime migration of 100,000+ users, orders, and transactions. Introduced Kafka event streaming and Dockerized across 3 repos.",
      ],
      stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "WebSocket", "Prisma", "Docker", "AWS", "Royal Mail API"],
    },
    {
      name: "Airyis AI-Powered Marketing Platform",
      sub: "Multi-channel content publishing · AI automation",
      period: "2024",
      liveUrl: null,
      liveLabel: null,
      highlights: [
        "Designed backend and REST APIs for an AI marketing platform that publishes content across multiple channels simultaneously.",
        "Integrated OpenAI for automated content generation; connected Meta, Twitter/X, and Stripe with idempotency and duplicate-prevention on every payment flow.",
        "Built AWS SNS-driven async notification pipelines with retry logic across all revenue-critical integrations.",
      ],
      stack: ["Node.js", "TypeScript", "OpenAI", "Stripe", "AWS SNS", "Meta Graph API", "Twitter/X API"],
    },
    {
      name: "IM AI Avatar Generator App",
      sub: "Async AI image generation · Live on iOS App Store",
      period: "2023 - 2024",
      liveUrl: "https://apps.apple.com/us/app/im-ai-avatar-new-profile-pic/id6446428782",
      liveLabel: "App Store ↗",
      highlights: [
        "Built backend infrastructure for an AI-powered mobile avatar app async job queue for Leap AI with backpressure handling so the system stays stable under concurrent load.",
        "Output validation and automated failure reporting pipelines for every generation job.",
      ],
      stack: ["PHP", "Laravel", "Async Job Queue", "Leap AI"],
    },
  ];

  const experiences = [
    {
      company: "Bacancy Technology",
      role: "Senior Backend Engineer · Project Lead",
      period: "Mar 2025 - Present",
      location: "Ahmedabad · Team of 10",
      highlights: [
        "Owned backend architecture for a UK precious metals trading platform serving 100K+ users selected the stack, designed all APIs, led delivery end-to-end.",
        "Resolved critical production failure: 6 systems independently hitting a pricing API every 3 seconds. Built centralized WebSocket + Redis service one upstream call, consistent data everywhere.",
        "Achieved 20-40% query latency reduction via indexing, N+1 elimination, and schema restructuring on the live production system.",
        "Executed zero-downtime migration of 100,000+ users, orders, and transactions with no data loss.",
        "Introduced Kafka-based event streaming, containerized platform with Docker across 3 repos, enforced strict TypeScript with Prisma ORM.",
        "Integrated Royal Mail API for physical goods dispatch with a Kafka-backed retry queue on API failure.",
        "Led architecture reviews, sprint planning, and mentoring across 10 engineers.",
      ],
      stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS"],
    },
    {
      company: "Citrusbug Technolabs",
      role: "Senior Backend Engineer",
      period: "Sept 2022 - Feb 2025",
      location: "Ahmedabad",
      highlights: [
        "Designed and maintained distributed backend services for global high-traffic products using Node.js and Laravel.",
        "Built real-time voice streaming pipelines with Deepgram and LLM workflow automation with OpenAI.",
        "Integrated Meta, Twitter/X, and Stripe APIs with structured failure handling and retry logic.",
        "Introduced DataDog for observability; implemented unit testing (PHPUnit, Jest) and load testing.",
        "Mentored junior engineers and established coding standards across the team.",
      ],
      stack: ["Node.js", "Laravel", "Deepgram", "OpenAI", "Stripe", "DataDog"],
    },
    {
      company: "ARK Infosoft",
      role: "Data Analyst",
      period: "Jun 2021 - Jul 2022",
      location: "Ahmedabad",
      highlights: [
        "Built Python-based ETL pipelines to automate data ingestion, transformation, and loading reducing manual effort by 60% (previously done by hand-scraping).",
      ],
      stack: ["Python", "ETL", "Data Pipelines"],
    },
  ];

  const awards = [
    { title: "AI Integration Hackathon 1st Place", org: "Bacancy Technology", when: "March 2023", note: "Led team, owned architecture, shipped production-ready AI integration under tight deadline." },
    { title: "Employee of the Quarter", org: "Citrusbug Technolabs", when: "April 2024", note: "Recognized for technical ownership during concurrent AI integration and platform scaling delivery." },
    { title: "Employee of the Quarter", org: "Bacancy Technology", when: "July 2025", note: "Awarded for on-time delivery, architecture ownership, and raising engineering standards through mentoring." },
    { title: "Spot Award", org: "Bacancy Technology", when: "Nov 2025", note: "Fast, effective problem-solving during complex distributed systems delivery keeping team unblocked." },
  ];

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="grain-overlay" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: `0 ${SP.sectionH}`, height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 40 ? (dark ? "rgba(10,10,10,0.92)" : "rgba(245,242,237,0.92)") : "transparent",
        backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
        borderBottom: scrollY > 40 ? `1px solid ${T.border}` : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.18em", color: T.accent, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          US<span style={{ color: T.textMuted }}>_</span>
        </div>
        <div className="desktop-nav">
          {navItems.map((item) => (
            <span key={item} className={`nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`} onClick={() => scrollTo(item)}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setDark(!dark)}
            style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 2, padding: "6px 12px", cursor: "pointer", color: T.textSecondary, fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.accentDim; e.currentTarget.style.color = T.accent; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSecondary; }}
          >
            {dark ? "LIGHT" : "DARK"}
          </button>
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 2, padding: "6px 10px", cursor: "pointer", color: T.textSecondary, fontFamily: "'DM Mono', monospace", fontSize: 16, lineHeight: 1, transition: "border-color 0.2s, color 0.2s" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <span key={item} className={`mobile-nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`} onClick={() => scrollTo(item)}>{item}</span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="hero-section" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "12px 32px 60px", maxWidth: SP.maxW, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: "15%", right: "5%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, ${T.accentBg} 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
        <Reveal delay={0}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ width: 28, height: 1, background: T.accent }} />
            <span className="section-label" style={{ display: "inline" }}>Senior Backend Engineer</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: T.text, marginBottom: 8 }}>
            Urvi 
            <span style={{ color: T.accent }}> Solanki</span>
            <span className="cursor" style={{ color: T.accentDim, marginLeft: 6 }}>_</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ maxWidth: 560, fontSize: 16, lineHeight: 1.75, color: T.textSecondary, marginTop: 20, marginBottom: 28 }}>
            Backend engineer specializing in scaling and stabilizing production systems under real-world load. Built a centralized pricing infrastructure that resolved a live failure across 6 systems and now serves{" "}
            <span style={{ color: T.text }}>100K+ users</span>.
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
            {[{ label: "✦ Open to Relocate", sub: "US · Europe" }, { label: "✦ Open to Remote", sub: "Worldwide" }].map(({ label, sub }) => (
              <div key={label} className="availability-chip" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", border: `1px solid ${T.accentDim}`, borderRadius: 2, background: T.accentBg }}>
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
        <Reveal delay={380}>
          <div className="stats-grid" style={{ marginTop: 36, paddingTop: 28, borderTop: `1px solid ${T.border}`, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 48px", maxWidth: 420 }}>
            {[["40%", "Latency Reduction"], ["100K+", "Users Served"], ["6→1", "API Consolidation"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: T.accent, lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: T.textMuted, marginTop: 6, textTransform: "uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          <Reveal direction="left">
            <span className="section-label">About</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: SP.headingSize, fontWeight: 700, marginTop: SP.headingMt, lineHeight: 1.15, color: T.text }}>
              Building systems with clarity and long-term reliability.
            </h2>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Location", "Ahmedabad, India"], ["Email", "urvisolanki2318@gmail.com"], ["LinkedIn", "linkedin.com/in/urvi-solanki-a59386247"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 12, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                  <span style={{ color: T.textMuted, minWidth: 68, textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</span>
                  <span style={{ color: T.textSecondary }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: T.textSecondary, marginBottom: 24 }}>
              I prefer working on systems where there's time to understand the problem deeply before building. Good engineering starts with clarity understanding the domain, the data, and how everything connects before writing a line of code.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: T.textSecondary, marginBottom: 32 }}>
              I've worked on systems where poor architecture created real production risks especially in pricing and payments where mistakes directly impact the business. Instead of temporary fixes, I find the root cause and design for long-term stability.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Architecture Ownership", "Technical Design Reviews", "Sprint Planning", "Mentoring", "International Clients"].map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Divider />

      {/* SKILLS */}
      <Section id="skills">
        <Reveal>
          <SectionHeading label="Technical Skills" title="Stack & Expertise" />
        </Reveal>
        {[
          { category: "Languages & Runtimes", items: ["Node.js", "TypeScript", "JavaScript", "PHP", "Python"] },
          { category: "Frameworks & ORMs", items: ["Express.js", "Laravel", "Prisma ORM"] },
          { category: "Databases", items: ["PostgreSQL", "MySQL", "Redis"] },
          { category: "Infrastructure & Cloud", items: ["AWS (SES, S3, SNS)", "Kafka", "Docker", "WebSocket"] },
          { category: "Architecture", items: ["Distributed Systems", "Event-Driven Architecture", "REST APIs", "Real-Time Systems", "Async Processing", "Fault Tolerance"] },
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
      </Section>

      <Divider />

      {/* EXPERIENCE */}
      <Section id="experience">
        <Reveal>
          <SectionHeading label="Career" title="Experience" mb="64px" />
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 52 }}>
          {experiences.map((exp, i) => (
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
      </Section>

      <Divider />

      {/* PROJECTS */}
      <Section id="projects">
        <Reveal>
          <SectionHeading label="Work" title="Projects" />
        </Reveal>
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: SP.cardGap }}>
          {projects.map((proj, i) => (
            <Reveal key={proj.name} delay={i * 90}>
              <ProjectCard proj={proj} T={T} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Divider />

      {/* AWARDS */}
      <Section id="awards">
        <Reveal>
          <SectionHeading label="Recognition" title="Awards & Certifications" />
        </Reveal>
        <div className="award-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: SP.cardGap }}>
          {awards.map((a, i) => (
            <Reveal key={a.title + a.when} delay={i * 60}>
              <div style={{ padding: SP.cardPad, border: `1px solid ${T.border}`, borderRadius: 4, background: T.surface, height: "100%" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
                  {a.when} · {a.org}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: T.text, marginBottom: 10 }}>{a.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: T.textSecondary }}>{a.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ─── FIX: Dividers and sections below now use the same maxW as all other sections ─── */}
      <Divider />

      {/* HOW I WORK */}
      <Section id="how-i-work">
        <Reveal>
          <SectionHeading label="Approach" title="How I Work" mb="24px" />
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: T.textSecondary, marginBottom: 18 }}>
            I focus on building backend systems that stay reliable under real-world conditions especially where downtime, data consistency, or performance directly impact the business.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: T.textSecondary, marginBottom: 18 }}>
            I spend time understanding problems properly before writing code, which helps avoid short-term fixes and leads to more stable, maintainable systems.
          </p>
          <p style={{ fontSize: 15.5, lineHeight: 1.85, color: T.textSecondary }}>
            I work best in environments where there's ownership, room to improve systems, and a focus on doing things right rather than rushing incomplete solutions.
          </p>
        </Reveal>
      </Section>

      <Divider />

      {/* WHAT I FIX */}
      <Section id="what-i-fix">
        <Reveal>
          <SectionHeading label="Strength" title="What I Fix" mb="24px" />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Systems breaking under real-time load",
              "Poorly designed databases causing performance bottlenecks",
              "Over-dependence on third-party APIs with no fallback",
              "Tightly coupled legacy codebases with no scalability path",
              "Inconsistent data flows across distributed systems",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 14, fontSize: 15.5, lineHeight: 1.7, color: T.textSecondary }}>
                <span style={{ color: T.accentDim, flexShrink: 0, marginTop: 3 }}>—</span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* CONTACT */}
      <Section id="contact">
        <Reveal>
          <SectionHeading label="Contact" title="Currently Open to Roles" mb="16px" />
          <p style={{ fontSize: 15, lineHeight: 1.8, color: T.textSecondary, marginBottom: 24 }}>
            Looking for senior engineering roles where I can own architecture, solve real problems, and work with a team that values doing things properly. Based in Ahmedabad open to remote or relocation to the{" "}
            <span style={{ color: T.text }}>US or Europe</span>.
          </p>
          <div className="availability-chips" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            {[{ text: "✦ Open to Relocate", detail: "US · EU" }, { text: "✦ Open to Remote", detail: "Worldwide" }].map(({ text, detail }) => (
              <div key={text} className="availability-chip" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", border: `1px solid ${T.accentDim}`, borderRadius: 2, background: T.accentBg }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: T.accent }}>{text}</span>
                <span style={{ width: 1, height: 12, background: T.accentDim }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textSecondary }}>{detail}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="hero-btns" style={{ display: "flex", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
            <a href="mailto:urvisolanki2318@gmail.com" className="btn-primary">urvisolanki2318@gmail.com →</a>
            <a href="https://www.linkedin.com/in/urvi-solanki-a59386247/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn ↗</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="contact-cards" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[["Phone", "+91 93271 87418"], ["Location", "Ahmedabad, India"], ["Languages", "English · Hindi · Gujarati"]].map(([k, v]) => (
              <div key={k} className="contact-card" style={{ padding: "14px 18px", border: `1px solid ${T.border}`, borderRadius: 4, background: T.surface, flex: 1, minWidth: 140 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: T.textMuted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>{k}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: T.textSecondary }}>{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 32px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textMuted, letterSpacing: "0.1em" }}>URVI S. SOLANKI · SENIOR BACKEND ENGINEER</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: T.textMuted, letterSpacing: "0.1em" }}>AHMEDABAD, INDIA</span>
      </footer>
    </>
  );
}