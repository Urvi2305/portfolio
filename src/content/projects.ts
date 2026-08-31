import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "precious-metals-trading-platform",
    name: "Precious Metals Trading Platform",
    company: "Bacancy Technology",
    period: "Mar 2025 - Present",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Kafka", "WebSockets", "AWS"],
    summary:
      "A UK-based precious metals trading platform, order management, live pricing, semantic product search, and multi-gateway payments running as one production system.",
    bullets: [
      "Built a schema-flexible admin system letting the client define custom fields, column types, and dropdown configurations without code changes, cutting engineering requests for routine configuration by ~60%.",
      "Implemented a live metals-pricing service backed by Redis caching and WebSocket distribution, supporting real-time, poll-free price updates across concurrent sessions.",
      "Built the product-search mechanism using Pinecone vector search over product embeddings, matching on meaning rather than exact keywords for more relevant, typo-tolerant results.",
    ],
    diagrams: ["payment-orchestration", "pricing-broadcast"],
  },
  {
    slug: "airyis-ai-marketing-automation",
    name: "Airyis AI Marketing Automation Platform",
    company: "Citrusbug Technolabs",
    period: "Feb 2024 - Mar 2025",
    stack: ["Python", "FastAPI", "Kafka", "AWS SES", "Facebook", "WhatsApp", "Twitter APIs"],
    summary:
      "A unified dispatch layer that fans a single campaign event out across email, Facebook, WhatsApp, and Twitter.",
    bullets: [
      "Built Kafka-based campaign event pipelines processing multi-channel campaigns from one unified dispatch layer cut campaign setup time by ~50%.",
      "Solved organisation email authentication with a custom AWS SES DKIM integration and secure token-based verification flow.",
    ],
    diagrams: ["kafka-dispatch"],
  },
  {
    slug: "multisports-booking-system",
    name: "Multisports Booking System",
    company: "Citrusbug Technolabs",
    period: "Dec 2022 - Oct 2023",
    stack: ["Python", "FastAPI", "Kafka", "AWS SES", "SQS", "Stripe"],
    summary:
      "Backend for a multi-sport booking platform court bookings, memberships, event registration, and daily scheduling for padel, tennis, and more.",
    bullets: [
      "Developed backend services supporting court bookings, membership management, event registrations, and daily game scheduling.",
      "Integrated Stripe for membership renewals, split payments among players, and secure transaction processing.",
      "Dispatched real-time booking notifications to every player on a reservation via AWS SQS, alongside per-player split-payment collection through Stripe.",
    ],
    diagrams: ["booking-split-payment"],
  },
];
