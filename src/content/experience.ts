import type { Job } from "./types";

export const experience: Job[] = [
  {
    id: "bacancy",
    company: "Bacancy Technology",
    role: "Senior Backend Engineer",
    start: "Mar 2025",
    end: "present",
    location: "Ahmedabad",
    domain: "Payments · Inventory Management · Precious Metals Trading (UK client)",
    bullets: [
      "Built payment orchestration services integrating 5+ payment providers using PostgreSQL, Redis, and Kafka reliable transaction processing across multiple channels for a UK precious metals trading platform.",
      "Redesigned real-time pricing distribution using WebSockets and Redis, replacing polling reduced redundant API traffic and improved consistency across concurrent sessions.",
      "Executed a zero-downtime migration of 10,000+ user records, transactions, and inventory data with full production availability.",
      "Improved database performance through indexing, query optimisation, and schema changes cut query latency up to 40%.",
      "Designed a centralised event-driven notification platform for inventory, orders, payments, and onboarding real-time delivery via WebSockets, read/unread state, delivery tracking.",
      "Designed payment orchestration as an admin-configurable system gateway switching with zero engineering intervention, ~70% faster feature change lead time.",
    ],
  },
  {
    id: "citrusbug",
    company: "Citrusbug Technolabs",
    role: "Backend Engineer",
    start: "Sep 2021",
    end: "Mar 2025",
    location: "Ahmedabad",
    domain: "SaaS · AI · Analytics · Marketing Automation (global clients)",
    bullets: [
      "Built 3–5 full backend services using Django and FastAPI across SaaS, AI, and analytics platforms for global clients, alongside Node.js-based systems.",
      "Developed real-time voice processing and AI-automation workflows using Python with Deepgram and OpenAI transcription, summarisation, automation pipelines.",
      "Reduced PostgreSQL query latency by 80%+ through execution-plan analysis, indexing, and query rewriting one of the highest-impact performance gains on the team.",
      "Implemented Redis caching, cutting API response times by 50% for frequently accessed workloads across multiple client platforms.",
      "Implemented event-driven architectures using Apache Kafka for asynchronous processing across marketing and analytics platforms.",
      "Integrated Stripe, Meta, WhatsApp Business API, Twitter/X, and AWS services for secure payments and external platform integrations.",
      "Achieved 85%+ automated test coverage with Jest across critical workflows the standard later adopted across backend teams.",
      "Built asynchronous job processing with retry mechanisms and fault-tolerant patterns, improving reliability across 3+ production platforms.",
    ],
  },
  {
    id: "ark-infosoft",
    company: "ARK Infosoft",
    role: "Data Analyst",
    start: "Jun 2020",
    end: "Jul 2021",
    location: "Ahmedabad",
    domain: "Data & Reporting",
    bullets: [
      "Built Python-based ETL pipelines processing 100K+ records monthly full ownership of ingestion, transformation, loading, and data-integrity validation.",
      "Automated reporting workflows, cutting manual data-processing effort by ~40% across analytics teams.",
    ],
  },
];
