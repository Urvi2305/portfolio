import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    category: "Primary languages & frameworks",
    items: ["Python", "Django", "FastAPI", "Flask"],
  },
  {
    category: "Secondary languages & frameworks",
    items: ["Node.js", "TypeScript", "Express.js", "NestJS", "JavaScript ES6+", "PHP", "Laravel"],
  },
  {
    category: "Databases & caching",
    items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Query optimisation", "Zero-downtime migrations"],
  },
  {
    category: "Infrastructure & DevOps",
    items: ["Apache Kafka", "AWS (S3, SNS, SES, SQS, Lambda)", "Docker", "GitHub Actions", "WebSocket", "REST API design"],
  },
  {
    category: "System design",
    items: [
      "Distributed systems",
      "Microservices architecture",
      "Event-driven design",
      "Pub/sub patterns",
      "Payment integration",
      "API performance optimisation",
    ],
  },
  {
    category: "AI & search integrations",
    items: ["OpenAI", "Deepgram", "Pinecone (vector search)", "Embeddings"],
  },
  {
    category: "Testing",
    items: ["Jest, 85%+ automated coverage"],
  },
];
